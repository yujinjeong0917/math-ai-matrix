---
slug: slow-feature-analysis
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: Slow Feature Analysis: 느림 목적함수의 일반화 고유값문제 환원
hook: 센서로 들어오는 원시 신호는 빠르게 요동치지만, 그 신호가 나타내는 "의미"(예: 물체의 위치)는 보통 천천히 변합니다.
related: 판별분석(LDA)
---

## 기본설명
시계열 $x(t)\in\mathbb{R}^d$가 평균 0이라 하고 $C=\langle x(t)x(t)^T\rangle_t$, $\dot C=\langle \dot x(t)\dot x(t)^T\rangle_t$ (여기서 $\dot x(t)=x(t+1)-x(t)$)라 하자. 선형특징 $y(t)=w^Tx(t)$에 대해 단위분산 제약 $w^TCw=1$ 하에서 시간적 변화율의 분산 $\langle \dot y(t)^2\rangle_t=w^T\dot Cw$를 최소화하는 $w$는 일반화 고유값문제 $\dot Cw=\lambda Cw$의 최소 고유값에 대응하는 고유벡터이며, 서로 다른 고유값에 대응하는 고유벡터들은 $w_i^TCw_j=0$을 만족해 자동으로 비상관 제약도 충족한다.

## 문제
라그랑지안은 $L(w,\lambda)=w^T\dot Cw-\lambda(w^TCw-1)$이다. $w$에 대해 미분하여 0으로 놓으면 $2\dot Cw-2\lambda Cw=$==빈칸== 이다.

## 해설
정류점(임계점) 조건은 그래디언트가 0이 되는 것이므로 우변은 0이에요.

**정답: $0$**

## 예시
$C=\begin{pmatrix}2&0\\0&1\end{pmatrix}$, $\dot C=\begin{pmatrix}1&0\\0&4\end{pmatrix}$인 경우를 봅니다. 두 좌표가 이미 비상관이라 가정한 것입니다.

일반화 고유값문제 $\dot Cw=\lambda Cw$는 대각행렬끼리라 좌표축 방향이 그대로 고유벡터입니다. $w=(1,0)$ 방향은 $\lambda=\dot C_{11}/C_{11}=1/2$, $w=(0,1)$ 방향은 $\lambda=\dot C_{22}/C_{22}=4$입니다. 단위분산 제약을 맞추기 위해 $w_1=(1,0)/\sqrt2$로 정규화하면 $w_1^TCw_1=1$이고 실제 느림 값 $w_1^T\dot Cw_1=1/2$로 고유값과 일치합니다. 두 번째 좌표는 분산이 더 작은데도($1<2$) 변화율은 더 커서($4>1$) 상대적으로 훨씬 빠른 성분이며, 실제로 SFA는 이 좌표를 제쳐두고 첫 번째 좌표를 가장 느린 특징으로 선택합니다.
