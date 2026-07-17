---
slug: trace-det-eigenvalue-relations
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 대각합·행렬식과 고유값의 합·곱 관계
hook: 행렬의 대각합과 행렬식은 각각 원소들을 단순히 더하고 곱한 것처럼 보이지만, 사실은 고유값들의 합과 곱이라는 훨씬 깊은 의미를 담고 있습니다.
related: 
---

## 기본설명
$A\in\mathbb{R}^{n\times n}$의 고유값을(복소수를 포함해 중복도까지 세어) $\lambda_1,\dots,\lambda_n$이라 하면 $\operatorname{tr}(A)=\sum_{i=1}^n\lambda_i$이고 $\det(A)=\prod_{i=1}^n\lambda_i$이다. 또한 곱 $ABC$가 정의되는 정사각행렬 $A,B,C$에 대해 대각합은 순환에 대해 불변이다: $\operatorname{tr}(ABC)=\operatorname{tr}(BCA)=\operatorname{tr}(CAB)$.

## 문제
$\prod_{i=1}^n(\lambda-\lambda_i)$를 전개했을 때 $\lambda^{n-1}$의 계수를 구해보자. $\lambda^{n-1}$이 나오려면 $n-1$개의 인수에서 $\lambda$를, 나머지 1개의 인수에서 $-\lambda_i$를 뽑아야 한다. 이를 가능한 모든 $i$에 대해 더하면 $\lambda^{n-1}$의 계수는 $-$==빈칸== 이다.

## 해설
뽑을 수 있는 $-\lambda_i$가 하나씩인 경우를 $i$에 대해 모두 더하면 이 합이 되고, 계수는 여기에 음수부호가 붙은 것입니다.

**정답: $\sum_{i=1}^n \lambda_i$**

## 예시
$A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$이라 하면 $\operatorname{tr}(A)=4+3=7$, $\det(A)=4\cdot3-1\cdot2=10$입니다. 특성방정식 $\lambda^2-7\lambda+10=0$을 풀면 $\lambda=5,2$이고, 실제로 $5+2=7=\operatorname{tr}(A)$, $5\times2=10=\det(A)$로 명제와 정확히 일치합니다.

순환성도 확인해봅니다. $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, $B=\begin{pmatrix}0&1\\1&0\end{pmatrix}$, $C=\begin{pmatrix}2&0\\1&1\end{pmatrix}$이라 하면 세 곱 $ABC$, $BCA$, $CAB$를 각각 계산했을 때 $\operatorname{tr}(ABC)=\operatorname{tr}(BCA)=\operatorname{tr}(CAB)=8$로 세 값이 모두 같습니다.
