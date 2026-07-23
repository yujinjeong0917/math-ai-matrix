---
slug: sgd-robbins-monro
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: SGD의 확률적 수렴 조건: Robbins-Monro 조건
related: 경사하강법의 O(1/k) 수렴률
---

## 도입
확률적 경사하강법(SGD)은 매 스텝마다 잡음 섞인 그래디언트를 쓰기 때문에, 학습률을 어떻게 줄여나가느냐가 수렴 여부를 결정해요. 학습률을 너무 천천히 줄이면 잡음이 절대 가라앉지 않고, 너무 빨리 줄이면 최적점까지 도달하기도 전에 스텝이 멈춰버려요. 이 두 위험을 정확히 갈라주는 조건이 Robbins-Monro(1951) 조건입니다.

**명제(논증).** $x_{t+1}=x_t-\eta_t g_t$ 에서 $g_t$가 $\mathbb{E}[g_t\mid x_t]=\nabla f(x_t)$(불편추정)이고 $\mathbb{E}\|g_t-\nabla f(x_t)\|^2\le\sigma^2$(유계분산)를 만족하며 $f$가 $L$-매끄럽다고 하자. 이때 SGD가 $\nabla f(x_t)\to0$ 로 (기댓값 의미에서) 수렴하려면 학습률이 $$\sum_{t=1}^\infty \eta_t=\infty,\qquad \sum_{t=1}^\infty \eta_t^2<\infty$$ 를 만족해야 한다(Robbins-Monro 조건).

## 명제



## 문제
$L$-매끄러움에서 나오는 하강 보조정리를 $y=x_{t+1}$에 적용하고 $x_t$가 주어졌을 때의 조건부기댓값을 취하면(불편성 때문에 1차항은 $-\eta_t\|\nabla f(x_t)\|^2$로 정리되고, $\mathbb{E}\|g_t\|^2$의 상한을 $(\star)$라 하면) $$\mathbb{E}[f(x_{t+1})\mid x_t]\ \le\ f(x_t)-\eta_t\|\nabla f(x_t)\|^2+\frac{L\eta_t^2}{2}\big(\star\big)$$ 를 얻는데, 여기서 $(\star)=$==빈칸== 이다.

## 해설
$\mathbb{E}\|g_t\|^2=\|\mathbb{E}[g_t]\|^2+\mathrm{Var}(g_t)=\|\nabla f(x_t)\|^2+\mathbb{E}\|\xi_t\|^2\le\|\nabla f(x_t)\|^2+\sigma^2$가 돼요.

**정답: $\sigma^2+\|\nabla f(x_t)\|^2$**

## 예시
조건을 만족하는 학습률과 그렇지 않은 학습률을 숫자로 비교해봅시다.

$\eta_t=1/t$(조화수열)라면 $\sum_{t=1}^{10000}\frac1t\approx 9.79$로 계속 커지고(발산, $\ln n$ 속도), $\sum_{t=1}^{10000}\frac1{t^2}\approx1.6448$ 로 $\pi^2/6\approx1.6449$에 매우 가까워 수렴합니다. 두 조건을 모두 만족합니다.

$\eta_t=c$(상수)라면 $\sum\eta_t=\infty$는 만족하지만 $\sum\eta_t^2=\infty c^2$로 발산해 두 번째 조건을 어깁니다. 실제로 상수 학습률 SGD는 최적점 근방에서 잡음 때문에 영원히 진동하며 정확히 수렴하지 않는 것으로 알려져 있습니다.

$\eta_t=1/t^{2}$처럼 너무 빨리 줄이면 $\sum\eta_t^2<\infty$는 만족하지만 $\sum\eta_t=\sum1/t^2\approx1.6449<\infty$로 첫 번째 조건을 어깁니다. 총 이동거리 자체가 유한해 시작점에서 너무 멀리 있는 최적점에는 도달조차 못 할 수 있습니다.
