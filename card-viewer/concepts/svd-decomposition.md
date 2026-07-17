---
slug: svd-decomposition
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 특이값분해(SVD): 임의의 행렬을 세 변환으로
hook: 대칭행렬만 대각화할 수 있다는 사실은 아쉽습니다.
related: 고유값분해(대칭행렬) · 무어-펜로즈 유사역행렬 · 에카르트-영 정리
---

## 기본설명
임의의 행렬 $A\in\mathbb{R}^{m\times n}$에 대해 직교행렬 $U\in\mathbb{R}^{m\times m}$, $V\in\mathbb{R}^{n\times n}$와 대각성분이 $\sigma_1\ge\sigma_2\ge\cdots\ge0$인 대각행렬 $\Sigma\in\mathbb{R}^{m\times n}$이 존재하여 $A=U\Sigma V^T$로 쓸 수 있다. 이 분해는 $A$가 정사각행렬이거나 대칭일 필요가 전혀 없다는 점에서, 대칭행렬에서만 정의되는 고유대각화(eigen-diagonalization)와 근본적으로 다르다.

## 문제
스펙트럴 정리에 의해 $A^TA$는 정규직교 고유벡터 기저 $v_1,\dots,v_n$과 고유값 $\lambda_1\ge\cdots\ge\lambda_n\ge0$을 가진다. 특이값을 $\sigma_i=$==빈칸== 로 정의한다.

## 해설
특이값은 관례적으로 음이 아닌 값으로 정의하는데, $\lambda_i\ge0$이므로 제곱근을 취하면 됩니다.

**정답: $\sqrt{\lambda_i}$**

## 예시
추상적인 구성 논증에 들어가기 전에 2×2 행렬 하나로 SVD를 직접 손으로 계산해 봅니다.

$$A=\begin{pmatrix}2&2\\-1&1\end{pmatrix}$$

먼저 $A^TA$를 계산합니다.
$$A^TA=\begin{pmatrix}2&-1\\2&1\end{pmatrix}\begin{pmatrix}2&2\\-1&1\end{pmatrix}=\begin{pmatrix}5&3\\3&5\end{pmatrix}$$
이 대칭행렬의 고유값은 8과 2이고, 각각의 고유벡터는 $v_1=(1,1)/\sqrt2$, $v_2=(1,-1)/\sqrt2$입니다. 따라서 특이값은 $\sigma_1=\sqrt8=2\sqrt2$, $\sigma_2=\sqrt2$입니다. $u_i=Av_i/\sigma_i$로 계산하면 $u_1=(1,0)$, $u_2=(0,-1)$을 얻고, 실제로 $$U\Sigma V^T=\begin{pmatrix}1&0\\0&-1\end{pmatrix}\begin{pmatrix}2\sqrt2&0\\0&\sqrt2\end{pmatrix}\begin{pmatrix}1/\sqrt2&1/\sqrt2\\1/\sqrt2&-1/\sqrt2\end{pmatrix}=\begin{pmatrix}2&2\\-1&1\end{pmatrix}=A$$가 성립함을 확인할 수 있습니다.
