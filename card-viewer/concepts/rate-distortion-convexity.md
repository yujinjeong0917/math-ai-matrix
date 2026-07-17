---
slug: rate-distortion-convexity
theme: INFO2
domainLabel: 정보이론 심화
subLabel: 레이트-왜곡 · 채널용량
title: 레이트-왜곡 함수의 볼록성
hook: 손실압축에서는 원본을 조금 뭉개는 대신 비트를 아끼죠.
related: 
---

## 기본설명
레이트-왜곡함수 $R(D) = \min_{p(\hat x|x):\, E[d(X,\hat X)]\le D} I(X;\hat X)$ 는 $D$에 대한 볼록함수다. 즉 임의의 $D_1, D_2$와 $\lambda\in[0,1]$에 대해 $R(\lambda D_1+(1-\lambda)D_2) \le \lambda R(D_1) + (1-\lambda) R(D_2)$ 가 성립한다.

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
