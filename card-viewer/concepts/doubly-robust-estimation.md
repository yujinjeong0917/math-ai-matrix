---
slug: doubly-robust-estimation
theme: CAUSAL
domainLabel: 인과추론
subLabel: 식별과 추정
title: 이중강건추정(Doubly Robust / AIPW)
hook: 역확률가중(IPW)은 성향점수모형이 틀리면 무너지고, 회귀보정(outcome regression)은 결과모형이 틀리면 무너져요.
related: 
---

## 기본설명
무교란성 $(Y_0,Y_1)\perp T\mid X$ 와 양성성 $0&lt;e(X)&lt;1$ 하에서, 증강역확률가중함수 $\varphi(W;e,\mu_0,\mu_1) := \mu_1(X)-\mu_0(X)+\dfrac{T(Y-\mu_1(X))}{e(X)}-\dfrac{(1-T)(Y-\mu_0(X))}{1-e(X)}$ 에 대해 $E[\varphi]=\mathrm{ATE}$ 가 성립하며, 이 등식은 (a) $e$가 참 성향점수이고 $\mu_0,\mu_1$은 임의(틀려도 됨)이거나, (b) $\mu_0,\mu_1$이 참 결과모형이고 $e$는 임의(단 $0&lt;e&lt;1$)인 두 경우 중 하나만 성립해도 유지된다 (이중강건성).

## 문제
먼저 경우 (a): 성향점수는 참값 $e^*$를 쓰고 결과모형 $\tilde\mu_1$은 틀려도 된다고 하자. $T=1$일 때만 $Y=Y_1$이 관측되므로 $TY=TY_1$이고, 무교란성 $T\perp Y_1\mid X$에 의해 $E[T\mid X]=e^*(X)$와 $E[Y_1\mid X]=\mu_1^*(X)$가 서로 독립적으로 곱해진다. 이를 이용하면 $E\big[T(Y-\tilde\mu_1(X))\mid X\big] = E[TY_1\mid X]-\tilde\mu_1(X)E[T\mid X] = $==빈칸== 이다.

## 해설
$E[TY_1\mid X]=E[T\mid X]E[Y_1\mid X]=e^*(X)\mu_1^*(X)$ (무교란성으로 $T$와 $Y_1$이 $X$ 조건부로 독립). 여기서 $\tilde\mu_1(X)E[T\mid X]=\tilde\mu_1(X)e^*(X)$를 빼면 $e^*(X)\mu_1^*(X)-\tilde\mu_1(X)e^*(X)=e^*(X)(\mu_1^*(X)-\tilde\mu_1(X))$가 남아요.

**정답: $e^*(X)\big(\mu_1^*(X)-\tilde\mu_1(X)\big)$**

## 예시
이중강건성이 실제로 어떻게 작동하는지, 처치군 항 하나만 떼어서 숫자로 확인해봅니다.

공변량 $X\in\{0,1\}$이 각각 확률 $0.5$로 나오고, 참 결과함수는 $\mu_1^*(X)=2+X$, 참 성향점수는 $e^*(0)=0.5,\ e^*(1)=0.7$이라 합시다. 그러면 참값은 $E[Y_1]=E[\mu_1^*(X)]=0.5\times2+0.5\times3=2.5$ 입니다.

**경우 1: 성향점수는 맞고 결과모형은 틀림.** 분석가가 결과모형을 상수 $\tilde\mu_1(X)=3$ (틀림)으로 잘못 적합했지만 참 성향점수 $e^*$는 그대로 썼다고 합시다.
$$E\big[\tilde\mu_1(X)\big]+E\Big[\tfrac{T(Y-\tilde\mu_1(X))}{e^*(X)}\Big]=3+E\big[\mu_1^*(X)-3\big]=3+(2.5-3)=2.5$$
결과모형이 틀렸는데도 $2.5$가 정확히 나옵니다.

**경우 2: 결과모형은 맞고 성향점수는 틀림.** 이번엔 $\mu_1^*(X)=2+X$는 맞게 썼지만 성향점수를 상수 $\tilde e(X)=0.9$ (틀림, 다만 $(0,1)$ 안에는 있음)로 잘못 썼다고 합시다.
$$E\big[\mu_1^*(X)\big]+E\Big[\tfrac{T(Y-\mu_1^*(X))}{\tilde e(X)}\Big]=2.5+E\Big[\tfrac{0}{\tilde e(X)}\Big]=2.5+0=2.5$$
여기서도 $2.5$가 정확히 나옵니다. 성향점수가 틀렸는데도 결과모형이 맞으면 잔차 $T(Y-\mu_1^*(X))$의 조건부기댓값 자체가 $0$이라 성향점수 값이 무엇이든 영향을 안 줍니다. 아래 증명은 이 두 경우가 우연이 아니라 항상 성립하는 대수적 사실임을 보입니다.
