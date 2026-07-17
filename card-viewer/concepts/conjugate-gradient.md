---
slug: conjugate-gradient
theme: NUM2
domainLabel: 수치해석 심화
subLabel: 반복법
title: 켤레기울기법(CG): A-켤레 방향과 유한 스텝 수렴
hook: 대칭 양의정부호(SPD) 행렬 $A$로 이루어진 선형시스템 $Ax=b$를 반복법으로 풀 때, 가장 단순한 방법인 최대강하법(steepest descent)은 등고선을 따라 지그재그로 움직이며 이미 최적화한 방향을 계속 다시 건드리는 비효율을 겪습니다.
---

## 기본설명
$A\in\mathbb{R}^{n\times n}$이 대칭 양의정부호이고 $b\in\mathbb{R}^n$이라 하자. CG가 생성하는 탐색방향 $p_0,\dots,p_{n-1}$은 서로 $A$-켤레이다(즉 $i\neq j$이면 $p_i^TAp_j=0$). 각 반복은 $x_{k+1}=x_k+\alpha_kp_k$ 형태로 이차함수 $\varphi(x)=\frac12x^TAx-b^Tx$를 부분공간 $x_0+\mathrm{span}\{p_0,\dots,p_k\}$ 위에서 최소화하도록 $\alpha_k$를 정하며, 완전연산(exact arithmetic)에서는 늦어도 $n$번째 반복 $x_n$에서 정확해 $x^*=A^{-1}b$에 도달한다.

## 문제
서로 다른 두 방향 $p_i,p_j$ ($i\neq j$)가 $A$-켤레라는 것은, $A$가 만드는 내적 $\langle u,v\rangle_A:=u^TAv$ 기준으로 직교함을 뜻한다. 즉 $A$-켤레 조건은 $p_i^TAp_j = $==빈칸== 이다.

## 해설
직교는 내적이 0이라는 뜻이며, 여기서는 그 내적이 $u^TAv$로 정의됩니다.

**정답: $0$**

## 예시
구체적인 $2\times2$ SPD 시스템으로 CG를 직접 돌려봅니다.
$$A=\begin{pmatrix}4&1\\1&3\end{pmatrix},\quad b=\begin{pmatrix}1\\2\end{pmatrix}$$
순서주 소행렬식이 $4>0$, $\det A=11>0$이므로 $A$는 SPD입니다. $Ax=b$를 직접 풀면 정확해는 $x^*=(1/11,\,7/11)\approx(0.0909,\,0.6364)$입니다.

$x_0=(0,0)$에서 시작합니다. $r_0=b-Ax_0=(1,2)=p_0$이고,

$\alpha_0=\dfrac{r_0^Tr_0}{p_0^TAp_0}=\dfrac{5}{20}=\dfrac14$ (여기서 $Ap_0=(6,7)$, $p_0^TAp_0=1\cdot6+2\cdot7=20$),

$x_1=x_0+\alpha_0p_0=(0.25,\,0.5)$, $r_1=r_0-\alpha_0Ap_0=(-0.5,\,0.25)$.

$\beta_0=\dfrac{r_1^Tr_1}{r_0^Tr_0}=\dfrac{0.3125}{5}=\dfrac1{16}$이므로 $p_1=r_1+\beta_0p_0=(-7/16,\,3/8)$,

$\alpha_1=\dfrac{r_1^Tr_1}{p_1^TAp_1}=\dfrac{5/16}{55/64}=\dfrac{4}{11}$이고,

$x_2=x_1+\alpha_1p_1=(1/11,\,7/11)=x^*$ — 정확해와 정확히 일치합니다.

$n=2$인 시스템이라 늦어도 2번째 반복에서 정확해에 도달해야 한다는 명제의 예측이 그대로 확인됩니다.
