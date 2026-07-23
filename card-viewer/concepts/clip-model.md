---
slug: clip-model
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: 멀티모달 아키텍처
title: CLIP: 이미지와 텍스트를 한 공간에 정렬하기
related: VLM 이미지 토큰화 · 크로스모달 어텐션
---

## 도입
CLIP은 이미지 인코더 $f_I$와 텍스트 인코더 $f_T$를 동시에 학습시킨다. 이미지 인코더는 ResNet이나 ViT를, 텍스트 인코더는 Transformer를 쓰고 각각의 출력을 정규화해서 $I_e=f_I(\text{image})/\|f_I(\text{image})\|$, $T_e=f_T(\text{text})/\|f_T(\text{text})\|$로 만든다. 정규화 덕분에 벡터의 방향만 의미를 갖고 두 벡터 사이의 코사인유사도로 관련도를 잴 수 있다.

학습에는 배치 안의 $N$개 이미지 텍스트 쌍을 이용한 대조학습 손실을 쓴다. 같은 인덱스의 이미지와 텍스트는 정답 쌍이고 나머지 조합은 전부 오답으로 취급해서 $L=-\dfrac1N\sum_i\log\dfrac{\exp(I_e^i\cdot T_e^i/\tau)}{\sum_j\exp(I_e^i\cdot T_e^j/\tau)}$ 형태의 손실을 이미지에서 텍스트로 보는 방향과 텍스트에서 이미지로 보는 방향 양쪽으로 계산해서 평균한다. $\tau$는 유사도의 뾰족한 정도를 조절하는 학습되는 온도 파라미터다.

이렇게 학습된 CLIP은 정답 라벨을 미리 정해두지 않은 채로도 어떤 이미지가 주어진 여러 문장 후보 중 어느 것과 가장 잘 맞는지를 바로 판단할 수 있다. 그래서 별도의 미세조정 없이 다양한 분류 문제에 그대로 적용하는 제로샷 분류가 가능해졌고 이후 텍스트투이미지 생성 모델의 텍스트 조건화나 여러 VLM의 이미지 인코더로도 널리 재사용된다.

## 명제


## 그림
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="150" height="50" rx="8" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
      <text x="35" y="50" font-size="12">이미지 인코더</text>
      <rect x="20" y="140" width="150" height="50" rx="8" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
      <text x="35" y="170" font-size="12">텍스트 인코더</text>
      <line x1="170" y1="45" x2="270" y2="95" class="dg-line" stroke-width="1.5" />
      <line x1="170" y1="165" x2="270" y2="115" class="dg-line" stroke-width="1.5" />
      <rect x="270" y="70" width="260" height="80" rx="8" fill="none" class="dg-stroke-accent" stroke-width="2" />
      <text x="285" y="90" class="dg-dim" font-size="11">공유 임베딩 공간</text>
      <line x1="300" y1="100" x2="500" y2="130" class="dg-stroke-accent" stroke-width="2" />
      <circle cx="300" cy="100" r="5" class="dg-accent" />
      <circle cx="500" cy="130" r="5" class="dg-accent" />
      <text x="380" y="145" class="dg-dim" font-size="11">유사도 최대화</text>
    </svg>

_이미지와 텍스트 인코더가 같은 공간으로 사영되어 정답 쌍끼리만 유사도가 높아지는 구조입니다._

## 문제
먼저 $N=2$인 경우를 생각하자. 배치 안에서 이미지 $i$에 대해 정답 텍스트와의 유사도를 $s_+=I_e^i\cdot T_e^i$, 오답 텍스트와의 유사도를 $s_-=I_e^i\cdot T_e^j$라 하면 그 이미지의 손실은 $L_i=-\log\dfrac{\exp(s_+/\tau)}{\exp(s_+/\tau)+\exp(s_-/\tau)}$이다. 분자와 분모를 $\exp(s_+/\tau)$로 나누면 분모는 $1+\exp(r)$ 꼴이 되는데, 여기서 $r=$==빈칸== 이다.

## 해설
분모의 $\exp(s_-/\tau)$를 $\exp(s_+/\tau)$로 나누면 같은 밑의 지수끼리 빼는 셈이 되어 $(s_--s_+)/\tau$가 남기 때문이에요.

**정답: $(s_- - s_+)/\tau$**

## 예시
이미지 임베딩과 두 문장 후보 임베딩이 있다고 하자. 정답 문장과의 코사인유사도는 $0.31$, 오답 문장과의 코사인유사도는 $0.05$다.

온도 $\tau=0.07$을 적용해 소프트맥스를 취하면 $\exp(0.31/0.07)\approx83.8$, $\exp(0.05/0.07)\approx2.04$가 되어 정답 문장이 거의 $\dfrac{83.8}{83.8+2.04}\approx97.6\%$의 확률을 가져간다. 유사도의 작은 차이가 온도로 나누어 지수함수를 거치면서 크게 벌어지는 것을 볼 수 있다.
