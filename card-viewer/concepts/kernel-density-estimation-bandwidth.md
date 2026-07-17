---
slug: kernel-density-estimation-bandwidth
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: 커널밀도추정: 대역폭의 편향-분산 트레이드오프
hook: 커널밀도추정(KDE)은 각 데이터점 위에 작은 커널(보통 종 모양 곡선)을 얹어 더한 뒤 평균을 내서 밀도를 추정합니다.
related: 차원의 저주(KNN)
---

## 기본설명
$X_1,\dots,X_n\stackrel{iid}{\sim}p$이고 대칭 커널 $K$($\int K=1,\ \int uK(u)du=0,\ \sigma_K^2=\int u^2K(u)du<\infty$)를 써서 $\hat p_h(x)=\frac{1}{nh}\sum_{i=1}^n K\!\big(\frac{x-X_i}{h}\big)$로 추정하면, $p$가 $x$ 근방에서 두 번 미분가능할 때 $\mathrm{Bias}[\hat p_h(x)]\approx \frac{h^2}{2}\sigma_K^2p''(x)$이고 $\mathrm{Var}[\hat p_h(x)]\approx \frac{p(x)R(K)}{nh}$($R(K)=\int K(u)^2du$)이며, 이로부터 평균제곱오차를 최소화하는 최적 대역폭은 $h^*=O(n^{-1/5})$이다.

## 문제
$p(x-hu)$를 $h$에 대해 2차까지 테일러 전개하면 $p(x-hu)\approx p(x)-hu\,p'(x)+\frac{h^2u^2}{2}p''(x)$이다. 이를 대입해 항별로 적분하면, $\int K(u)du=1,\ \int uK(u)du=0,\ \int u^2K(u)du=\sigma_K^2$이므로 $E[\hat p_h(x)]\approx p(x)+$ $==빈칸==$이다.

## 해설
1차항은 대칭커널 조건 $\int uK(u)du=0$ 때문에 사라지고, 2차항의 계수 $\int u^2K(u)du=\sigma_K^2$만 남아요. 이것이 바로 편향이에요.

**정답: $\frac{h^2}{2}\sigma_K^2p''(x)$**

## 예시
가우시안 커널($\sigma_K^2=1$, $R(K)=\frac{1}{2\sqrt\pi}\approx0.2821$)로 표준정규분포 $p=\mathcal N(0,1)$을 $n=100$개 표본으로 추정한다고 합시다. $x=0$에서 $p(0)\approx0.3989$, $p''(0)=(0^2-1)p(0)\approx-0.3989$입니다.

대역폭을 너무 작게($h=0.1$, 과소평활) 잡으면 $\mathrm{Bias}\approx-0.0020$(무시할 만큼 작음)인 반면 $\mathrm{Var}\approx0.01125$로 커서 $\mathrm{MSE}\approx0.01126$이 분산 위주로 결정됩니다. 반대로 너무 크게($h=1.0$, 과대평활) 잡으면 $\mathrm{Bias}\approx-0.1995$, $\mathrm{Bias}^2\approx0.0398$인데 $\mathrm{Var}\approx0.00113$으로 작아 $\mathrm{MSE}\approx0.0409$가 편향 위주로 결정됩니다.

이 둘 사이 최적값 $h^*\approx0.371$에서는 $\mathrm{Bias}^2\approx0.00076$, $\mathrm{Var}\approx0.00303$로 $\mathrm{MSE}\approx0.00379$까지 떨어져, 양끝 대역폭보다 훨씬 낮은 오차를 냅니다. 편향과 분산이 서로 반대 방향으로 움직이다가 중간 지점에서 총오차가 최소가 되는 트레이드오프가 숫자로 확인됩니다.
