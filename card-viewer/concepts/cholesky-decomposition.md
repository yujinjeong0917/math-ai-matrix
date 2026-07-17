---
slug: cholesky-decomposition
theme: NUM2
domainLabel: 수치해석 심화
subLabel: 직접법
title: 촐레스키분해와 상관된 표본 생성
hook: 다변량 정규분포 $N(\mu,\Sigma)$에서 표본을 뽑고 싶다면, 표준정규 난수는 쉽게 만들 수 있지만 성분끼리 상관된 표본은 그렇지 않습니다.
related: 
---

## 기본설명
대칭 양의정부호 행렬 $\Sigma\in\mathbb{R}^{n\times n}$에 대해 대각성분이 양수인 하삼각행렬 $L$이 유일하게 존재하여 $\Sigma=LL^T$이다. 이때 $z\sim N(0,I_n)$이면 $x=\mu+Lz$는 $N(\mu,\Sigma)$를 따른다.

## 문제
직접 계산하면 $\Sigma$에서 첫 열의 외적을 뺀 $(2,2)$블록은 $\Sigma_{22} - $==빈칸== 이다. 이를 $S$라 부른다(슈어보수).

## 해설
$L$의 첫 열이 만드는 외적의 $(2,2)$블록이 $vv^T/\sigma_{11}$이므로 이를 빼서 남는 것이 슈어보수다.

**정답: $\dfrac{vv^T}{\sigma_{11}}$**

## 예시
두 변수의 공분산행렬이 다음과 같다고 합시다.
$$\Sigma=\begin{pmatrix}4&2\\2&5\end{pmatrix}$$
$L=\begin{pmatrix}l_{11}&0\\l_{21}&l_{22}\end{pmatrix}$이라 두고 $LL^T=\Sigma$를 성분별로 풀어봅니다. $(1,1)$성분: $l_{11}^2=4$이므로 $l_{11}=2$. $(2,1)$성분: $l_{21}l_{11}=2$이므로 $l_{21}=1$. $(2,2)$성분: $l_{21}^2+l_{22}^2=5$이므로 $l_{22}^2=5-1=4$, $l_{22}=2$.
$$L=\begin{pmatrix}2&0\\1&2\end{pmatrix}$$
검산하면 $LL^T=\begin{pmatrix}2&0\\1&2\end{pmatrix}\begin{pmatrix}2&1\\0&2\end{pmatrix}=\begin{pmatrix}4&2\\2&5\end{pmatrix}=\Sigma$로 정확히 일치합니다. 표준정규 표본 $z=(1,0)$을 뽑았다면 $x=Lz=(2,1)$이 되고, $z=(0,1)$이라면 $x=(0,2)$가 됩니다. $z$의 두 성분은 서로 독립이었지만 $x=Lz$의 두 성분은 공분산 $2$만큼 얽히게 됩니다.
