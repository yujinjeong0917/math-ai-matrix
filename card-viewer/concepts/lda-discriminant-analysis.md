---
slug: lda-discriminant-analysis
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 판별분석(LDA): 베이즈 결정경계와 Fisher 판별비의 일치
hook: 두 집단을 가장 잘 가르는 방향을 찾고 싶습니다.
related: 주성분분석(PCA) · Slow Feature Analysis
---

## 기본설명
(1) 두 클래스 $y\in\{1,2\}$의 조건부분포가 공통 공분산 $\Sigma$를 갖는 가우시안 $p(x\mid y=k)=N(x;\mu_k,\Sigma)$이고 사전확률이 $\pi_k$일 때, 베이즈 결정규칙의 경계 $\{x: P(y=1\mid x)=P(y=2\mid x)\}$는 $x$에 대한 선형방정식 $w^Tx+b=0$이며 $w=\Sigma^{-1}(\mu_1-\mu_2)$이다. (2) 클래스간 산포행렬 $S_B$와 클래스내 산포행렬 $S_W$에 대해 Fisher 비 $J(w)=\dfrac{w^TS_Bw}{w^TS_Ww}$를 최대화하는 $w$는 일반화 고유값문제 $S_Bw=\lambda S_Ww$의 (최대 고유값에 대응하는) 고유벡터이며, 두 클래스의 경우 이는 (1)의 $\Sigma^{-1}(\mu_1-\mu_2)$ 방향과 일치한다.

## 문제
가우시안 로그밀도는 $\log p(x\mid \mu_k,\Sigma)=-\frac12(x-\mu_k)^T\Sigma^{-1}(x-\mu_k)+C$ (상수 $C$는 $\mu_k$에 무관)이므로 $\delta(x)=\log\frac{\pi_1}{\pi_2}-\frac12$==빈칸== 이다.

## 해설
두 클래스의 이차형식 차이를 그대로 적은 거예요. 이 안에서 $x^T\Sigma^{-1}x$ 항이 서로 상쇄되어 결국 $x$에 대해 선형인 식만 남게 돼요.

**정답: $\left[(x-\mu_1)^T\Sigma^{-1}(x-\mu_1)-(x-\mu_2)^T\Sigma^{-1}(x-\mu_2)\right]$**

## 예시
추상적 유도 전에 구체적인 숫자로 명제 (1)을 확인해봅니다.

두 클래스의 평균이 $\mu_1=(3,1)$, $\mu_2=(1,2)$이고 공통 공분산이 $\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, 사전확률이 같다고 합시다($\pi_1=\pi_2$).
$$\Sigma^{-1}=\frac{1}{3}\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$$
따라서 $w=\Sigma^{-1}(\mu_1-\mu_2)=\Sigma^{-1}(2,-1)^T=(5/3,\,-4/3)$이고, $\mu_1^T\Sigma^{-1}\mu_1=14/3$, $\mu_2^T\Sigma^{-1}\mu_2=2$이므로 $b=-\frac12(14/3-2)=-4/3$입니다. 양변에 3을 곱하면 결정경계는 $5x_1-4x_2-4=0$, 즉 $x$에 대한 선형방정식임을 직접 확인할 수 있습니다.
