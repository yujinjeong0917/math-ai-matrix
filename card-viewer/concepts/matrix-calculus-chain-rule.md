---
slug: matrix-calculus-chain-rule
theme: LINALG2
domainLabel: 선형대수 심화
subLabel: 행렬미적분 · 텐서
title: 행렬미적분의 연쇄법칙: 그래디언트의 전치 야코비안 전파
hook: 신경망은 여러 층을 통과하는 함수 합성이에요.
---

## 기본설명
$W\in\mathbb{R}^{m\times n}$, $x\in\mathbb{R}^n$, $y=Wx\in\mathbb{R}^m$이고 $z=f(y)$가 스칼라값을 내는 함수라 하자. 그래디언트를 열벡터로 표기할 때 $\dfrac{\partial z}{\partial x} = W^T\dfrac{\partial z}{\partial y}$ 가 성립한다.

## 문제
$z$가 $y_1,\ldots,y_m$이라는 $m$개의 경로를 거쳐 $x_j$에 의존하므로, 다변수 함수의 연쇄법칙에 따르면 $z$를 $x_j$ 하나로 미분한 값은 각 경로의 기여를 모두 더한 것과 같다: $\dfrac{\partial z}{\partial x_j} = $==빈칸== 이다.

## 해설
$z$가 $y_1,\ldots,y_m$이라는 여러 중간변수를 거쳐서 $x_j$ 하나에 의존할 때, 다변수 연쇄법칙은 각 중간변수를 통과하는 경로의 기여 $\frac{\partial z}{\partial y_i}\frac{\partial y_i}{\partial x_j}$를 전부 더하라고 말해줘요.

**정답: $\sum_{i=1}^m \dfrac{\partial z}{\partial y_i}\dfrac{\partial y_i}{\partial x_j}$**

## 예시
추상적인 지표(인덱스) 계산에 들어가기 전에 작은 행렬 하나로 직접 확인해보면 명제가 말하는 바가 분명해집니다.

$W=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, $x=(1,1)^T$이라 하고 $y=Wx$를 계산하면 $y=(1\times1+2\times1,\ 3\times1+4\times1)^T=(3,7)^T$입니다.

$z=f(y)=y_1^2+y_2^2$ 이라 두면 $\dfrac{\partial z}{\partial y}=(2y_1,\,2y_2)^T=(6,14)^T$입니다.

이제 $z$를 아예 $x$만의 함수로 풀어써서 직접 미분해봅니다. $y_1=x_1+2x_2$, $y_2=3x_1+4x_2$이므로 $z=(x_1+2x_2)^2+(3x_1+4x_2)^2$이고, 이를 그대로 미분하면 $\dfrac{\partial z}{\partial x_1}=2y_1+6y_2=2(3)+6(7)=48$, $\dfrac{\partial z}{\partial x_2}=4y_1+8y_2=4(3)+8(7)=68$입니다.

명제가 말하는 $W^T\dfrac{\partial z}{\partial y}$도 계산해봅니다. $W^T=\begin{pmatrix}1&3\\2&4\end{pmatrix}$이므로 $W^T(6,14)^T=(1\times6+3\times14,\ 2\times6+4\times14)^T=(48,68)^T$입니다. 직접 미분한 결과와 정확히 일치합니다.
