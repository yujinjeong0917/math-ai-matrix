---
slug: straight-through-gumbel-softmax
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: Gumbel-Softmax: 이산 샘플링을 미분 가능하게 흉내내기
related: 연속 잠재변수의 재매개변수화와의 대조 · 베르누이 마스크를 이용한 또다른 확률적 학습 기법 · 이산 확률변수 그래디언트의 또다른 접근인 점수함수 추정량
---

## 도입
reparameterization-trick에서는 연속인 가우시안 잠재변수 $z=\mu_\phi+\sigma_\phi\odot\varepsilon$처럼 무작위성과 파라미터를 깔끔히 분리해 그래디언트를 정확히 계산했습니다. 그런데 잠재변수가 $K$개 범주 중 하나를 고르는 이산 변수라면 사정이 다릅니다. 확률 $\pi_1,\dots,\pi_K$을 갖는 카테고리 변수를 정확히 표집하는 Gumbel-max 트릭은 $\arg\max_i(\log\pi_i+g_i)$($g_i$는 독립인 Gumbel(0,1) 잡음)로 주어지는데, 이 $\arg\max$ 연산 자체가 파라미터에 대해 미분할 수 없는 계단형 함수입니다. Gumbel-softmax는 이 $\arg\max$를 온도 $\tau$를 가진 소프트맥스로 완화해 미분 가능하게 만듭니다. 이 완화가 왜 $\tau\to0$에서 정확히 원래의 이산 표본으로 되돌아가는지 확인합니다.

## 명제
$z_i=\log\pi_i+g_i$이고 $i^*=\arg\max_i z_i$(유일하다고 가정)일 때 $y_i(\tau)=\dfrac{e^{z_i/\tau}}{\sum_j e^{z_j/\tau}}$는 $\tau\to0^+$에서 $y_{i^*}(\tau)\to1$이고 $i\ne i^*$인 나머지는 $y_i(\tau)\to0$으로 수렴한다. 즉 $y(\tau)$는 Gumbel-max 표본의 원핫 벡터로 정확히 수렴한다.

## 그림
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
<polygon points="150,40 90,160 210,160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="143" y="30" font-size="12">e1</text>
<text x="62" y="175" font-size="12">e2</text>
<text x="205" y="175" font-size="12">e3</text>
<circle cx="118" cy="114" r="6" class="dg-dim"/>
<text x="128" y="105" font-size="11" class="dg-dim">y(τ=1)</text>
<text x="95" y="195" font-size="12">τ = 1 (완만한 분포)</text>
<line x1="228" y1="108" x2="288" y2="108" class="dg-stroke-accent" stroke-width="2"/>
<path d="M280,101 L290,108 L280,115" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="222" y="96" font-size="11">τ 하강</text>
<polygon points="410,40 350,160 470,160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="403" y="30" font-size="12">e1</text>
<text x="322" y="175" font-size="12">e2</text>
<text x="465" y="175" font-size="12">e3</text>
<circle cx="351" cy="158" r="4" class="dg-accent"/>
<circle cx="351" cy="158" r="9" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="360" y="145" font-size="11">y(τ=0.1)</text>
<text x="355" y="195" font-size="12">τ = 0.1 (원핫에 근접)</text>
</svg>

_온도 τ가 낮아질수록 심플렉스 내부의 소프트맥스 출력점이 원-핫 꼭짓점(e2)으로 모인다._

## 문제
$z_i=\log\pi_i+g_i$라 쓰고 유일한 최댓값 인덱스를 $i^*=\arg\max_i z_i$라 하자(연속분포에서 뽑은 잡음이라 두 인덱스가 정확히 같은 값을 가질 확률은 0이므로 유일성은 항상 보장된다). Gumbel-softmax 완화는 $y_i(\tau)=\dfrac{e^{z_i/\tau}}{\sum_j e^{z_j/\tau}}$로 정의된다. 소프트맥스는 모든 지수에 같은 상수를 빼도 값이 변하지 않는다는 성질이 있으므로, 분자 분모를 공통으로 $e^{z_{i^*}/\tau}$로 나누어도 $y_i(\tau)$의 값은 그대로다. 이렇게 나누면 $y_i(\tau) = $==빈칸== 이다.

## 해설
분자와 분모를 공통 인자 $e^{z_{i^*}/\tau}$로 나누면 지수 부분이 $z_i/\tau-z_{i^*}/\tau=(z_i-z_{i^*})/\tau$로 바뀐다. 소프트맥스는 이런 이동에 불변이므로 값은 원래와 정확히 같다.

**정답: $\dfrac{e^{(z_i-z_{i^*})/\tau}}{\sum_j e^{(z_j-z_{i^*})/\tau}}$**

## 예시
증명에 들어가기 전에 $K=3$개 범주에서 실제 숫자로 Gumbel-softmax가 온도에 따라 어떻게 달라지는지 봅니다. 로그는 자연로그를 씁니다.

범주확률이 $\pi=(0.6,0.3,0.1)$이라 하고, 한 번 뽑은 Gumbel 잡음이 $g_1=0.10$, $g_2=1.20$, $g_3=-0.30$이라 하겠습니다.

먼저 $z_i=\log\pi_i+g_i$를 계산합니다.
$$z_1=\log0.6+0.10\approx-0.5108+0.10=-0.4108$$
$$z_2=\log0.3+1.20\approx-1.2040+1.20=-0.0040$$
$$z_3=\log0.1-0.30\approx-2.3026-0.30=-2.6026$$
$z_2\approx-0.0040$이 가장 크므로 Gumbel-max 표본은 $i^*=2$입니다. 원래 확률은 $\pi_1=0.6$이 가장 컸지만 이번에 뽑힌 잡음 때문에 실제 표본은 두 번째 범주가 됩니다. 이것이 Gumbel-max가 정확한 표집이 되는 이유이기도 합니다.

**온도 $\tau=1$인 경우.** $z_i$ 그대로 소프트맥스를 취합니다.
$$y(1)\approx\left(\frac{0.663}{1.733},\ \frac{0.996}{1.733},\ \frac{0.074}{1.733}\right)\approx(0.383,\ 0.575,\ 0.043)$$
**온도 $\tau=0.1$로 낮춘 경우.** $z_i/\tau=10z_i$로 값이 훨씬 벌어집니다.
$$y(0.1)\approx\left(\frac{0.0164}{0.9772},\ \frac{0.9608}{0.9772},\ \frac{0.0000}{0.9772}\right)\approx(0.017,\ 0.983,\ 0.000)$$
온도를 낮추자 두 번째 성분의 비중이 $0.575$에서 $0.983$으로 크게 올라가 원핫 벡터 $(0,1,0)$에 훨씬 가까워졌습니다. 이 원핫 벡터는 정확히 Gumbel-max로 뽑았던 표본 $i^*=2$와 일치합니다.

아래 증명은 이 수렴이 이 특정 숫자에서만 벌어지는 우연이 아니라 $\tau\to0$인 극한에서 항상 정확히 성립하는 사실임을 보입니다.
