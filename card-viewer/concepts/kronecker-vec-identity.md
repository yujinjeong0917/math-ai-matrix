---
slug: kronecker-vec-identity
theme: LINALG2
domainLabel: 선형대수 심화
subLabel: 행렬미적분 · 텐서
title: 크로네커 곱과 벡터화(vec) 항등식
hook: 행렬 하나를 통째로 다루는 대신 길게 편 벡터로 바꿔서 다루고 싶을 때가 있어요.
related: 
---

## 기본설명
$A\in\mathbb{R}^{m\times n}$, $X\in\mathbb{R}^{n\times p}$, $B\in\mathbb{R}^{p\times q}$라 하자. $\mathrm{vec}(\cdot)$이 행렬의 열을 위에서부터 차례로 쌓아 하나의 열벡터로 만드는 연산이라 할 때, $\mathrm{vec}(AXB) = (B^T\otimes A)\,\mathrm{vec}(X)$ 가 성립한다.

## 문제
$Y=AXB$의 $j$번째 열은 오른쪽에서 표준기저벡터 $e_j$를 곱해 뽑아낼 수 있다: $y_j:=Ye_j = AXBe_j = AX b_j$ (여기서 $b_j:=Be_j$는 $B$의 $j$번째 열이다). $X$의 $k$번째 열을 $x_k$라 쓰면, 행렬-벡터 곱 $Xb_j$는 $X$의 열들을 $b_j$의 성분으로 가중합한 것이므로 $Xb_j = $==빈칸== 이다.

## 해설
$Xb_j$는 $X$의 각 열 $x_k$를 $b_j$의 $k$번째 성분 $B_{kj}$만큼 가중해서 더한 것과 같아요. 행렬과 벡터를 곱할 때 결과가 그 행렬의 열들의 가중합으로 나온다는 가장 기본적인 성질이에요.

**정답: $\sum_{k=1}^p B_{kj}x_k$**

## 예시
추상적인 블록행렬 계산 전에 작은 숫자로 먼저 확인해봅니다.

$A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, $X=\begin{pmatrix}1&0\\0&1\end{pmatrix}$, $B=\begin{pmatrix}5&6\\7&8\end{pmatrix}$ 이라 하자. 먼저 $AXB=AB$를 직접 계산하면 다음과 같습니다.
$$AXB=\begin{pmatrix}1&2\\3&4\end{pmatrix}\begin{pmatrix}5&6\\7&8\end{pmatrix}=\begin{pmatrix}19&22\\43&50\end{pmatrix}$$
열을 위에서부터 순서대로 쌓으면 $\mathrm{vec}(AXB)=(19,\,43,\,22,\,50)^T$입니다.

이제 명제의 우변을 계산해봅니다. $B^T=\begin{pmatrix}5&7\\6&8\end{pmatrix}$이므로 크로네커 곱은 다음과 같습니다.
$$B^T\otimes A=\begin{pmatrix}5A&7A\\6A&8A\end{pmatrix}=\begin{pmatrix}5&10&7&14\\15&20&21&28\\6&12&8&16\\18&24&24&32\end{pmatrix}$$
$X=I_2$이므로 $\mathrm{vec}(X)=(1,0,0,1)^T$입니다. 이 벡터를 곱하면 행렬의 $1$열과 $4$열을 그대로 더한 것과 같으므로 $(5,15,6,18)^T+(14,28,16,32)^T=(19,43,22,50)^T$를 얻습니다. $\mathrm{vec}(AXB)$와 정확히 일치합니다.
