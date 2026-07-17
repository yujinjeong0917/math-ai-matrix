---
slug: qr-decomposition
theme: NUM2
domainLabel: 수치해석 심화
subLabel: 직접법
title: QR분해와 최소제곱: 정규방정식 없이 풀기
hook: 관측이 많고 미지수가 적은 과결정계 $Ax=b$($A\in\mathbb{R}^{m\times n}$, $m>n$)는 보통 정확히 풀 수 없어서 잔차 $\|Ax-b\|$를 최소화하는 $x$를 찾습니다.
related: 그람-슈미트 정규직교화
---

## 기본설명
열이 일차독립인 $A\in\mathbb{R}^{m\times n}$($m\ge n$)은 $A=QR$로 분해된다. 여기서 $Q\in\mathbb{R}^{m\times n}$은 정규직교열을 갖고 $R\in\mathbb{R}^{n\times n}$은 대각성분이 양수인 상삼각행렬이다. 이때 최소제곱해는 $Rx=Q^Tb$를 풀어 얻어진다.

## 문제
$Q$의 열들이 span하는 공간과 수직인 방향들을 추가로 뽑아 $Q_\perp\in\mathbb{R}^{m\times(m-n)}$을 만들면 $\hat Q=[Q\ Q_\perp]\in\mathbb{R}^{m\times m}$은 정사각 직교행렬이다. 직교행렬을 곱해도 노름은 변하지 않으므로 임의의 벡터 $v$에 대해 $\|\hat Q^Tv\|=$==빈칸== 이다. 따라서 $\|Ax-b\|=\|\hat Q^T(Ax-b)\|$이다.

## 해설
직교행렬은 노름을 보존하는 선형변환이므로 $\hat Q^Tv$의 노름은 원래 $v$의 노름과 같다.

**정답: $\|v\|$**

## 예시
세 점 $(0,1),(1,2),(2,0)$에 직선 $y=x_1+x_2t$를 최소제곱으로 맞춰봅니다. 설계행렬과 목표벡터는 다음과 같습니다.
$$A=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix},\qquad b=\begin{pmatrix}1\\2\\0\end{pmatrix}$$
그람-슈미트로 $A$의 열을 정규직교화합니다. $u_1=(1,1,1)$, $\|u_1\|=\sqrt3$이므로 $q_1=(1,1,1)/\sqrt3$. 둘째 열 $a_2=(0,1,2)$에서 $q_1$ 방향 성분을 빼면 $a_2-(a_2\cdot q_1)q_1=(0,1,2)-1\cdot(1,1,1)=(-1,0,1)$이고 그 노름은 $\sqrt2$이므로 $q_2=(-1,0,1)/\sqrt2$.
$$Q=\begin{pmatrix}1/\sqrt3&-1/\sqrt2\\1/\sqrt3&0\\1/\sqrt3&1/\sqrt2\end{pmatrix},\qquad R=\begin{pmatrix}\sqrt3&\sqrt3\\0&\sqrt2\end{pmatrix}$$
$Q^Tb$를 계산하면 $q_1\cdot b=(1+2+0)/\sqrt3=\sqrt3$, $q_2\cdot b=(-1+0+0)/\sqrt2=-1/\sqrt2$입니다. $Rx=Q^Tb$, 즉 $\sqrt2x_2=-1/\sqrt2$에서 $x_2=-1/2$, $\sqrt3x_1+\sqrt3x_2=\sqrt3$에서 $x_1+x_2=1$이므로 $x_1=3/2$. 정규방정식 $A^TAx=A^Tb$로 직접 확인해도 $\begin{pmatrix}3&3\\3&5\end{pmatrix}x=\begin{pmatrix}3\\2\end{pmatrix}$이고 같은 해 $x=(3/2,-1/2)$를 줍니다.
