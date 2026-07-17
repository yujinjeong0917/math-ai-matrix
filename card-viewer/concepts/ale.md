---
slug: ale
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 의존도 시각화
title: ALE: 상관관계 있는 특징에서도 안전하게 의존도 보기
related: PDP · ICE plot
---

## 도입
관심 특징의 범위를 여러 구간 $[z_{k-1}, z_k]$로 나눈다. 각 구간에서는 실제로 그 구간에 속하는 값을 가진 샘플들만 골라 그 샘플 각각에 대해 특징값을 구간의 아래끝과 위끝으로 바꿨을 때 예측이 얼마나 달라지는지를 구하고 평균한다.

$\Delta_k = \dfrac{1}{n_k}\displaystyle\sum_{i:\, x_S^{(i)} \in [z_{k-1},z_k]} \Big[\hat f\big(z_k, x_C^{(i)}\big) - \hat f\big(z_{k-1}, x_C^{(i)}\big)\Big]$

이 국소 차분들을 순서대로 누적하면 ALE 곡선이 된다.

$ALE(z_m) = \displaystyle\sum_{k=1}^{m} \Delta_k$

PDP와 다른 점은 두 가지다. 하나는 각 구간에서 실제로 그 구간에 속하는 샘플의 다른 특징값만 사용하므로 현실에 없는 조합을 만들지 않는다는 점이고 다른 하나는 절대 예측값이 아니라 구간을 넘어갈 때의 차이만 본다는 점이다. 상관된 특징이 있어도 국소 구간 안에서는 관심 특징의 변화가 다른 특징에 주는 간섭이 작다고 볼 수 있어서 차이값이 상관관계에 덜 흔들린다. 실제 구현에서는 곡선 전체를 데이터 분포 기준 평균이 0이 되도록 이동시켜서 절대적인 높이가 아니라 모양만 비교하도록 다듬는 경우가 많다.

## 명제


## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<line x1="80" y1="40" x2="80" y2="220" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="220" y1="40" x2="220" y2="220" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="340" y1="40" x2="340" y2="220" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="460" y1="40" x2="460" y2="220" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<text x="150" y="55" font-size="12" text-anchor="middle">Δ1=3.0</text>
<text x="280" y="55" font-size="12" text-anchor="middle">Δ2=4.5</text>
<text x="400" y="55" font-size="12" text-anchor="middle">Δ3=2.0</text>
<line x1="60" y1="220" x2="520" y2="220" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="60" y1="220" x2="60" y2="70" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="20" y="60" font-size="12">누적 ALE</text>
<text x="500" y="242" font-size="12" text-anchor="middle">평수</text>
<path d="M80,220 L220,178 L340,115 L460,87" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="80" cy="220" r="4" class="dg-accent" stroke="none"/>
<circle cx="220" cy="178" r="4" class="dg-accent" stroke="none"/>
<circle cx="340" cy="115" r="4" class="dg-accent" stroke="none"/>
<circle cx="460" cy="87" r="4" class="dg-accent" stroke="none"/>
<text x="80" y="235" font-size="11" text-anchor="middle">10평</text>
<text x="220" y="235" font-size="11" text-anchor="middle">20평</text>
<text x="340" y="235" font-size="11" text-anchor="middle">30평</text>
<text x="460" y="235" font-size="11" text-anchor="middle">40평</text>
</svg>

_구간별로 실제 데이터에서 관찰된 예측 변화량(Δ)만 누적해 곡선을 만든다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
PDP는 평수를 20평으로 바꿔치기할 때 다른 특징은 원래 값 그대로 둔 채 억지로 조합을 만든다. 평수와 방 개수가 서로 강하게 연관돼 있다면 이렇게 만들어진 조합 중에는 현실에 없는 조합도 섞여 들어간다. 20평인데 방이 6개인 집은 실제로 거의 없는데 PDP는 이런 조합에 대한 예측도 평균에 끼워 넣는다. ALE는 이 문제를 피하려고 각 구간 근처의 좁은 범위 안에서만, 그것도 실제로 그 구간에 속하는 진짜 데이터에 대해서만 예측 변화를 측정한다.

그리고 ALE는 절대적인 예측값이 아니라 구간을 이동할 때 예측이 얼마나 변했는지 그 변화량만 하나씩 쌓아 올린다. 다른 특징의 값은 건드리지 않고 관심 특징만 살짝 움직였을 때의 순수한 효과에 더 가깝다.


## 예시
평수를 $[10,20)$, $[20,30)$, $[30,40)$ 세 구간으로 나누고 각 구간에 실제로 속하는 집들만 골라 구간의 아래끝과 위끝 사이 예측 차이를 평균 냈더니 $\Delta_1=3.0$, $\Delta_2=4.5$, $\Delta_3=2.0$(단위 천만원)이 나왔다고 하자. 누적하면 20평 지점에서 ALE는 $3.0$, 30평 지점에서는 $3.0+4.5=7.5$, 40평 지점에서는 $7.5+2.0=9.5$가 된다. 평수와 방 개수가 상관돼 있어도 각 구간의 차분은 그 구간에 실제로 존재하는 조합만 사용했으므로 왜곡이 적다.
