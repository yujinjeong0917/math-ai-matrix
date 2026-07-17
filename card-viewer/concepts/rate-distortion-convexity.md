---
slug: rate-distortion-convexity
theme: INFO2
domainLabel: 정보이론 심화
subLabel: 레이트-왜곡 · 채널용량
title: 레이트-왜곡 함수의 볼록성
related: 
---

## 도입
손실압축에서는 원본을 조금 뭉개는 대신 비트를 아끼죠. 그런데 "허용 왜곡을 얼마나 늘리면 비트가 얼마나 줄어드나"를 그래프로 그리면 항상 특정한 모양이 나옵니다. 왜곡을 조금씩 늘려갈 때 비트가 줄어드는 속도가 점점 느려지는 모양, 즉 볼록함수 모양이에요. 이게 우연이 아니라 정보량의 구조에서 나오는 필연이라는 걸 보이려고 합니다.

## 명제
레이트-왜곡함수 $R(D) = \min_{p(\hat x|x):\, E[d(X,\hat X)]\le D} I(X;\hat X)$ 는 $D$에 대한 볼록함수다. 즉 임의의 $D_1, D_2$와 $\lambda\in[0,1]$에 대해 $R(\lambda D_1+(1-\lambda)D_2) \le \lambda R(D_1) + (1-\lambda) R(D_2)$ 가 성립한다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="190" x2="430" y2="190" class="dg-line" stroke-width="1"/>
<line x1="50" y1="190" x2="50" y2="20" class="dg-line" stroke-width="1"/>
<text x="430" y="205" font-size="11" text-anchor="end">D</text>
<text x="30" y="20" font-size="11">R(D)</text>
<path d="M90,50 Q230,110 380,160" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="110" cy="63" r="4" class="dg-accent"/>
<text x="95" y="50" font-size="10">R(D₁)=0.531</text>
<circle cx="330" cy="150" r="4" class="dg-accent"/>
<text x="300" y="170" font-size="10">R(D₂)=0.119</text>
<line x1="110" y1="63" x2="330" y2="150" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="220" cy="106" r="3.5" class="dg-stroke-accent" fill="none" stroke-width="1.5"/>
<text x="228" y="100" font-size="10" class="dg-dim">현의 값 0.325</text>
<circle cx="220" cy="128" r="3.5" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<text x="228" y="140" font-size="10">R(D)=0.278</text>
<line x1="220" y1="106" x2="220" y2="128" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
</svg>

_곡선이 현보다 아래에 있어 R(D)가 볼록함수임을 보인다._

## 문제
이 $p_\lambda$가 만드는 기대왜곡은 $\mathbb E_\lambda[d(X,\hat X)] = \lambda\,\mathbb E_1[d(X,\hat X)] + (1-\lambda)\,\mathbb E_2[d(X,\hat X)]$ 인데, $d(x,\hat x)$가 $p(\hat x|x)$에 대해 선형인 기댓값이기 때문이다. 두 항이 각각 $D_1, D_2$였으므로 이는 $($==빈칸==$)$ 와 같다.

## 해설
기대왜곡은 확률분포에 대해 선형인 범함수라서, 두 분포를 $\lambda:(1-\lambda)$ 비율로 섞으면 왜곡값도 정확히 같은 비율로 섞여요. 그래서 $p_\lambda$는 왜곡 한계 $D_\lambda$를 정확히 만족하는 후보가 됩니다.

**정답: $\lambda D_1 + (1-\lambda) D_2 = D_\lambda$**

## 예시
추상적 정의에 들어가기 전에 가장 단순한 소스로 감을 잡아봅니다. $X\sim \text{Bernoulli}(1/2)$이고 해밍 왜곡을 쓰면 레이트-왜곡함수는 닫힌 형태로 $R(D) = 1 - H_b(D)$ ($0\le D\le 1/2$, $H_b$는 이진 엔트로피함수)로 알려져 있습니다.

왜곡 한계를 $D_1=0.1$, $D_2=0.3$으로 잡으면 $R(0.1)=1-H_b(0.1)\approx 0.531$, $R(0.3)=1-H_b(0.3)\approx 0.119$ 비트입니다. 그 중간인 $D=0.2$에서는 $R(0.2)=1-H_b(0.2)\approx 0.278$ 비트입니다.
$$\frac{R(0.1)+R(0.3)}{2} \approx 0.325 \;\ge\; R(0.2) \approx 0.278$$
직선으로 이은 값($0.325$)이 실제 곡선 값($0.278$)보다 크죠. 곡선이 현(chord) 아래에 있다는 것, 이게 바로 볼록성입니다. 아래 증명은 이 성질이 임의의 소스와 왜곡함수에서 항상 성립함을 보입니다.
