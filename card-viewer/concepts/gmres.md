---
slug: gmres
theme: NUM2
domainLabel: 수치해석 심화
subLabel: 반복법
title: GMRES: 비대칭 시스템에서 잔차 노름 최소화
hook: CG는 대칭성 덕분에 작동합니다: $A$-켤레 방향 사이의 짧은 재귀관계도, 잔차의 직교성도 모두 $A=A^T$라는 사실에 기대고 있습니다.
related: 
---

## 기본설명
$A\in\mathbb{R}^{n\times n}$이 (반드시 대칭일 필요는 없는) 가역행렬이고 $r_0=b-Ax_0$라 하자. Krylov 부분공간 $\mathcal{K}_k(A,r_0)=\mathrm{span}\{r_0,Ar_0,\dots,A^{k-1}r_0\}$ 위에서 GMRES는 $x_k=x_0+z$, $z\in\mathcal{K}_k(A,r_0)$ 중 잔차의 2-노름 $\|b-Ax_k\|_2$를 최소화하는 $x_k$를 계산한다. 이때 잔차 노름은 반복이 진행될수록 단조 비증가하며, 늦어도 $n$번째 반복에서 $\|b-Ax_n\|_2=0$이 된다.

## 문제
GMRES가 대신 세우는 원리는 잔차 자체를 최소화하는 것이다. $k$번째 Krylov 부분공간 $\mathcal{K}_k(A,r_0)=\mathrm{span}\{r_0,Ar_0,\dots,A^{k-1}r_0\}$ 위에서, $x_k=x_0+z$ ($z\in\mathcal{K}_k$)가 최소화해야 할 목적함수는 $\|b-Ax_k\|_2 = $==빈칸== 이다.

## 해설
$b-Ax_k=b-A(x_0+z)=(b-Ax_0)-Az=r_0-Az$이므로 목적함수를 $z$의 함수로 바꿔 쓴 것입니다.

**정답: $\|r_0 - Az\|_2$**

## 예시
$A=\begin{pmatrix}2&1\\-1&2\end{pmatrix}$는 $A^T=\begin{pmatrix}2&-1\\1&2\end{pmatrix}\neq A$라 비대칭입니다. $b=(3,1)$, $x_0=(0,0)$으로 시작합니다. 직접 풀면 정확해는 $x^*=(1,1)$입니다.

$r_0=b=(3,1)$, $\|r_0\|_2=\sqrt{10}$. 아르놀디(Arnoldi) 첫 벡터는 $v_1=r_0/\|r_0\|=(3,1)/\sqrt{10}$입니다.

$Av_1 = (7,-1)/\sqrt{10}$이고, $h_{11}=v_1^T(Av_1) = \frac1{10}(3\cdot7+1\cdot(-1))=2$입니다. $w=Av_1-h_{11}v_1 = (1,-3)/\sqrt{10}$이고 $h_{21}=\|w\|=1$이므로 $v_2=w/h_{21}=(1,-3)/\sqrt{10}$입니다.

1스텝 GMRES는 $\min_y\left\|\begin{pmatrix}\sqrt{10}\\0\end{pmatrix}-\begin{pmatrix}2\\1\end{pmatrix}y\right\|_2$를 최소화하는 스칼라 $y$를 찾는 최소제곱 문제입니다. 미분해서 풀면 $y=\frac{2\sqrt{10}}{5}\approx1.265$이고, $x_1=x_0+v_1y=(1.2,\,0.4)$를 얻습니다.

잔차를 확인하면 $r_1=b-Ax_1=(0.2,\,1.4)$이고 $\|r_1\|_2=\sqrt{2}\approx1.414 < \|r_0\|_2=\sqrt{10}\approx3.162$입니다. 잔차가 줄었지만 아직 정확해 $(1,1)$은 아닙니다 — $n=2$이므로 명제에 따르면 늦어도 2번째 반복에서 정확히 도달합니다.
