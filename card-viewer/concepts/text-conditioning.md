---
slug: text-conditioning
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: Diffusion 아키텍처
title: 텍스트 조건화: 크로스어텐션으로 프롬프트 주입하기
related: U-Net · 크로스모달 어텐션
---

## 도입
텍스트 조건화는 U-Net의 각 블록 사이에 크로스어텐션 층을 끼워 넣는 방식으로 구현된다. 이때 질의 $Q$는 현재 이미지 특징에서, 키 $K$와 값 $V$는 텍스트 인코더가 만든 단어별 임베딩 $\tau(y)$에서 만들어진다. 즉 $Q=W_Q\phi(z_t)$, $K=W_K\tau(y)$, $V=W_V\tau(y)$이고 어텐션은 $\mathrm{Attention}(Q,K,V)=\mathrm{softmax}(QK^T/\sqrt{d})V$로 계산된다.

이 계산의 결과로 이미지 특징의 각 위치가 자신과 가장 관련 있는 단어들의 값 벡터를 가중합해서 가져온다. 그림 왼쪽 위 영역은 프롬프트 속 특정 물체를 가리키는 단어에, 배경에 해당하는 영역은 배경을 묘사하는 단어에 더 큰 가중치를 주는 식으로 자연스럽게 역할이 나뉜다.

텍스트 인코더로는 CLIP의 텍스트 인코더나 T5 같은 대형 언어모델이 흔히 쓰인다. 크로스어텐션 층은 U-Net의 여러 해상도 단계에 반복해서 삽입되기 때문에 거친 구조부터 세밀한 디테일까지 여러 수준에서 텍스트 조건을 반영할 수 있다.

## 명제


## 그림
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
<text x="15" y="22" font-size="12">이미지 특징 (질의 Q)</text>
<text x="410" y="22" font-size="12">텍스트 토큰 (키/값 K,V)</text>
<circle cx="80" cy="80" r="12" class="dg-accent"/>
<text x="45" y="85" font-size="12">Q1</text>
<circle cx="80" cy="180" r="12" class="dg-accent"/>
<text x="45" y="185" font-size="12">Q2</text>
<circle cx="520" cy="50" r="12" class="dg-dim"/>
<text x="540" y="55" font-size="12">K1,V1</text>
<circle cx="520" cy="140" r="12" class="dg-dim"/>
<text x="540" y="145" font-size="12">K2,V2</text>
<circle cx="520" cy="230" r="12" class="dg-dim"/>
<text x="540" y="235" font-size="12">K3,V3</text>
<line x1="92" y1="80" x2="508" y2="50" class="dg-stroke-accent" stroke-width="2"/>
<line x1="92" y1="80" x2="508" y2="140" class="dg-line" stroke-width="1"/>
<line x1="92" y1="80" x2="508" y2="230" class="dg-stroke-accent" stroke-width="2"/>
<line x1="92" y1="180" x2="508" y2="50" class="dg-line" stroke-width="1"/>
<line x1="92" y1="180" x2="508" y2="140" class="dg-stroke-accent" stroke-width="2"/>
<line x1="92" y1="180" x2="508" y2="230" class="dg-stroke-accent" stroke-width="2"/>
<text x="290" y="60" font-size="12">0.40</text>
<text x="290" y="115" font-size="12">0.20</text>
<text x="290" y="160" font-size="12">0.40</text>
</svg>

_굵은 선일수록 크로스어텐션 가중치가 큰 연결이며 이미지 위치마다 주목하는 텍스트 토큰이 다릅니다._

## 문제
먼저 각 키에 대한 내적을 다시 계산한다. $K_2=(0,1)$이므로 $Q_1(\lambda)\cdot K_2=(\lambda,0)\cdot(0,1)=0$은 $\lambda$ 값과 무관하게 항상 $0$이다. $K_3=(1,1)$에 대해서는 $Q_1(\lambda)\cdot K_3=(\lambda,0)\cdot(1,1)=$==빈칸== 이며, 내적을 좌표별로 곱해 더하는 같은 방식을 $K_1=(1,0)$에 적용해도 정확히 같은 식이 나온다.

## 해설
(λ,0)과 (1,1)의 내적은 λ×1 + 0×1 = λ로 계산되기 때문이에요.

**정답: $\lambda$**

## 예시
이미지 쪽 특징 두 위치를 질의로 문장 속 텍스트 토큰 세 개를 키와 값으로 둔 작은 크로스어텐션을 직접 계산해본다. 차원은 $2$로 둔다.

질의는 이미지 위치 1의 $Q_1=(1, 0)$과 이미지 위치 2의 $Q_2=(0, 1)$이다. 텍스트 토큰 세 개의 키는 $K_1=(1, 0)$ $K_2=(0, 1)$ $K_3=(1, 1)$이고 그에 대응하는 값은 $V_1=(2, 0)$ $V_2=(0, 2)$ $V_3=(1, 1)$이다.

먼저 이미지 위치 1의 질의 $Q_1$에 대한 내적 점수를 구한다.
$$Q_1\cdot K_1=1 \quad Q_1\cdot K_2=0 \quad Q_1\cdot K_3=1$$
차원이 $2$이므로 $\sqrt{2}\approx1.4142$로 나누면 점수는 각각 $0.7071$ $0$ $0.7071$이 된다. 소프트맥스를 적용하면 다음과 같다.
$$e^{0.7071}\approx2.028 \quad e^{0}=1 \quad \text{sum} = 2.028+1+2.028=5.056$$
$$w_1\approx0.401 \quad w_2\approx0.198 \quad w_3\approx0.401$$
이 가중치로 값을 가중합하면 이미지 위치 1의 출력을 얻는다.
$$0.401\times(2,0)+0.198\times(0,2)+0.401\times(1,1)\approx(1.203,\ 0.797)$$
이미지 위치 2의 질의 $Q_2$도 같은 방식으로 계산한다.
$$Q_2\cdot K_1=0 \quad Q_2\cdot K_2=1 \quad Q_2\cdot K_3=1$$
점수는 $0$ $0.7071$ $0.7071$이고 소프트맥스 가중치는 $0.198$ $0.401$ $0.401$이 된다.
$$0.198\times(2,0)+0.401\times(0,2)+0.401\times(1,1)\approx(0.797,\ 1.203)$$
두 결과를 비교하면 이미지 위치 1은 토큰 1과 토큰 3에 더 큰 가중치를 주고 이미지 위치 2는 토큰 2와 토큰 3에 더 큰 가중치를 준다. 같은 텍스트 토큰들이라도 이미지 속 위치가 다르면 서로 다른 단어에 더 집중한다는 것이 숫자로 확인된다.
