---
slug: state-feature-representation
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 상태 특징벡터와 선형 가치함수 근사의 최소제곱 구조
hook: 강화학습에서 상태를 하나하나 표로 저장하면 상태 수가 조금만 많아져도 감당할 수 없습니다.
related: 
---

## 기본설명
상태-목표값 쌍 $(s_i,y_i)$, $i=1,\dots,n$이 주어졌을 때 $V(s)=\phi(s)^T\theta$로 오차제곱합 $J(\theta)=\sum_i(\phi(s_i)^T\theta-y_i)^2$을 최소화하는 $\theta$는 $\theta=(\Phi^T\Phi)^{-1}\Phi^Ty$이다. 단 $\Phi$는 $i$번째 행이 $\phi(s_i)^T$인 행렬이다.

## 문제
오차를 하나의 수식으로 정의해야 한다. 각 상태에서 근사값 $\phi(s_i)^T\theta$와 실제 목표값 $y_i$의 차이를 제곱해서 전부 더한 값을 오차로 삼는다. $i$번째 행이 $\phi(s_i)^T$인 특징행렬 $\Phi\in\mathbb{R}^{n\times d}$를 도입하면 이 합은 행렬 형태로 깔끔하게 묶인다. $J(\theta) = \sum_{i=1}^n(\phi(s_i)^T\theta-y_i)^2 = $==빈칸== 이다.

## 해설
$\Phi\theta$의 $i$번째 성분은 정의상 $\phi(s_i)^T\theta$이므로 $\Phi\theta-y$의 $i$번째 성분은 $\phi(s_i)^T\theta-y_i$다. 이 벡터의 각 성분을 제곱해서 더한 것이 노름의 제곱이므로 두 식은 정확히 같다.

**정답: $\|\Phi\theta-y\|^2$**

## 예시
특징벡터로 상태를 표현하는 문제가 정말 최소제곱 문제와 같은지 상태 두 개짜리 작은 예로 확인해봅니다.

상태 $s_1$의 특징을 $\phi(s_1)=(1,0)$, 상태 $s_2$의 특징을 $\phi(s_2)=(1,1)$이라 하고 목표값을 $y_1=3$, $y_2=5$라 합니다.
$$\Phi=\begin{pmatrix}1&0\\1&1\end{pmatrix},\quad y=\begin{pmatrix}3\\5\end{pmatrix}$$
$\Phi^T\Phi=\begin{pmatrix}2&1\\1&1\end{pmatrix}$이고 행렬식은 $2\times1-1\times1=1$이라 가역입니다. $\Phi^Ty=(8,5)$이고 역행렬을 곱하면 다음과 같습니다.
$$\theta=(\Phi^T\Phi)^{-1}\Phi^Ty=\begin{pmatrix}3\\2\end{pmatrix}$$
확인해보면 $V(s_1)=\phi(s_1)^T\theta=1\times3+0\times2=3$, $V(s_2)=\phi(s_2)^T\theta=1\times3+1\times2=5$로 두 목표값을 정확히 맞춥니다. 상태가 두 개, 파라미터도 두 개라 오차 없이 딱 맞아떨어진 경우입니다.

아래 증명은 이런 계산이 특징함수 $\phi$를 무엇으로 고르든, 상태와 목표값이 몇 개든 항상 정규방정식과 같은 형태로 정리됨을 보입니다.
