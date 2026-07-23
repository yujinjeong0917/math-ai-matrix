---
slug: cross-modal-attention
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: 멀티모달 아키텍처
title: 크로스모달 어텐션: 서로 다른 모달리티를 잇는 다리
related: CLIP · 텍스트 조건화
---

## 도입
셀프어텐션에서는 질의 $Q$, 키 $K$, 값 $V$가 모두 같은 시퀀스에서 나온다. 크로스모달 어텐션은 이 셋 중 질의는 한 모달리티에서, 키와 값은 다른 모달리티에서 가져온다. 계산 자체는 $\mathrm{Attention}(Q,K,V)=\mathrm{softmax}(QK^T/\sqrt{d_k})V$로 셀프어텐션과 동일하다.

이 구조는 이미 여러 곳에서 쓰이고 있다. 디퓨전 모델의 텍스트 조건화에서는 이미지 특징이 질의를, 텍스트 임베딩이 키와 값을 맡는다. Flamingo 같은 VLM에서는 텍스트 토큰이 질의가 되어 이미지 특징을 키와 값으로 참고하는 게이트가 달린 크로스어텐션층을 언어모델 블록 사이사이에 끼워 넣는다.

크로스모달 어텐션이 유용한 이유는 두 모달리티의 시퀀스 길이나 내부 구조가 서로 달라도 상관없다는 점이다. 이미지 패치가 몇 개든 문장의 단어가 몇 개든 어텐션 가중치 행렬의 크기만 그에 맞게 정해지면 되기 때문에 모달리티마다 자연스러운 표현 형태를 그대로 유지하면서도 서로 정보를 주고받을 수 있다.

## 명제


## 그림
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="24" text-anchor="middle" font-size="13">단방향 크로스어텐션</text>
<circle cx="60" cy="90" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="60" cy="170" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="60" y="94" text-anchor="middle" font-size="12">A1</text>
<text x="60" y="174" text-anchor="middle" font-size="12">A2</text>
<text x="15" y="205" font-size="12">오디오 Q</text>
<rect x="235" y="55" width="30" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<rect x="235" y="105" width="30" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<rect x="235" y="155" width="30" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="250" y="75" text-anchor="middle" font-size="12">I1</text>
<text x="250" y="125" text-anchor="middle" font-size="12">I2</text>
<text x="250" y="175" text-anchor="middle" font-size="12">I3</text>
<text x="200" y="205" font-size="12">이미지 K,V</text>
<line x1="235" y1="70" x2="74" y2="88" class="dg-line" stroke-width="1" />
<line x1="235" y1="120" x2="74" y2="92" class="dg-line" stroke-width="1" />
<line x1="235" y1="170" x2="74" y2="98" class="dg-line" stroke-width="1" />
<line x1="235" y1="70" x2="74" y2="168" class="dg-line" stroke-width="1" />
<line x1="235" y1="120" x2="74" y2="172" class="dg-line" stroke-width="1" />
<line x1="235" y1="170" x2="74" y2="176" class="dg-line" stroke-width="1" />
<text x="470" y="24" text-anchor="middle" font-size="13">양방향 크로스어텐션</text>
<circle cx="380" cy="90" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="380" cy="170" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="380" y="94" text-anchor="middle" font-size="12">A1</text>
<text x="380" y="174" text-anchor="middle" font-size="12">A2</text>
<rect x="555" y="55" width="30" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<rect x="555" y="105" width="30" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<rect x="555" y="155" width="30" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="570" y="75" text-anchor="middle" font-size="12">I1</text>
<text x="570" y="125" text-anchor="middle" font-size="12">I2</text>
<text x="570" y="175" text-anchor="middle" font-size="12">I3</text>
<line x1="394" y1="88" x2="555" y2="70" class="dg-line" stroke-width="1" />
<line x1="394" y1="92" x2="555" y2="170" class="dg-line" stroke-width="1" />
<path d="M555,120 Q470,150 394,98" fill="none" class="dg-stroke-accent" stroke-width="1.5" />
<path d="M555,70 Q470,40 394,88" fill="none" class="dg-stroke-accent" stroke-width="1.5" />
<path d="M555,170 Q470,200 394,172" fill="none" class="dg-stroke-accent" stroke-width="1.5" />
</svg>

_왼쪽은 오디오가 이미지만 참조하는 단방향 구조이고 오른쪽은 두 모달리티가 서로를 참조하는 양방향 구조입니다._

## 문제
$Q_3=Q_1+Q_2=[1,1]$이라 하자. 이 새로운 질의의 점수는 $Q_3\cdot K_1=1\times1+1\times0=1$, $Q_3\cdot K_2=1\times0+1\times1=1$이고 $Q_3\cdot K_3=1\times1+1\times1=$==빈칸==이다.

## 해설
$Q_3=[1,1]$과 $K_3=[1,1]$의 내적은 각 성분을 곱해 더한 $1\times1+1\times1=2$이기 때문이에요.

**정답: $2$**

## 예시
오디오 특징 두 개를 질의로 이미지 영역 임베딩 세 개를 키와 값으로 쓰는 크로스어텐션을 생각해보자. 차원은 $d_k=2$이고 질의는 $Q_1=[1,0]$, $Q_2=[0,1]$이다. 키는 $K_1=[1,0]$, $K_2=[0,1]$, $K_3=[1,1]$이고 값은 $V_1=[1,0]$, $V_2=[0,2]$, $V_3=[1,1]$이다.

$Q_1$의 점수는 $Q_1\cdot K_1=1$, $Q_1\cdot K_2=0$, $Q_1\cdot K_3=1$이다. $\sqrt{d_k}=\sqrt2\approx1.414$로 나누면 각각 약 $0.707$, $0$, $0.707$이 된다. 소프트맥스를 취하면 $e^{0.707}\approx2.028$이고 $e^{0}=1$이므로 가중치는 각각 약 $0.401$, $0.198$, $0.401$이다.

이 가중치로 값을 결합하면 $Q_1$의 출력은 $0.401V_1+0.198V_2+0.401V_3\approx[0.802,\,0.797]$이다. $K_1$과 $K_3$에 실린 이미지 영역이 거의 같은 비중으로 가장 크게 반영된 것을 볼 수 있다.

$Q_2$의 점수는 $Q_2\cdot K_1=0$, $Q_2\cdot K_2=1$, $Q_2\cdot K_3=1$이고 나누면 $0$, $0.707$, $0.707$이 되어 가중치는 이번에는 약 $0.198$, $0.401$, $0.401$로 바뀐다. 출력은 $0.198V_1+0.401V_2+0.401V_3\approx[0.599,\,1.203]$이 되어 $Q_1$과는 다른 이미지 영역 조합에 주의를 기울이게 된다. 같은 이미지 영역 세 개라도 오디오 질의가 무엇이냐에 따라 서로 다른 조합으로 참고한다는 것을 보여준다.
