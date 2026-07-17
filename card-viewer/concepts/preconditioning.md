---
slug: preconditioning
theme: NUM2
domainLabel: 수치해석 심화
subLabel: 안정성과 조건화
title: 전처리(Preconditioning): 조건수를 낮춰 반복법을 가속하기
hook: CG나 GMRES 같은 Krylov 방법의 수렴속도는 시스템 행렬 $A$의 고유값이 얼마나 넓게 퍼져 있는지, 즉 조건수 $\kappa(A)$에 크게 좌우됩니다.
---

## 기본설명
$A\in\mathbb{R}^{n\times n}$이 SPD이고 $M$이 SPD 전처리행렬이라 하자. $M^{-1/2}AM^{-1/2}$는 $M^{-1}A$와 닮음(similar, 같은 고유값을 가짐)이며 대칭이다. CG를 (대칭화된) 전처리 시스템 $M^{-1/2}AM^{-1/2}\tilde x=M^{-1/2}b$에 적용하면, 매 반복의 오차는 $\|\tilde e_k\|_{\tilde A} \le 2\Big(\dfrac{\sqrt{\tilde\kappa}-1}{\sqrt{\tilde\kappa}+1}\Big)^k\|\tilde e_0\|_{\tilde A}$ ($\tilde\kappa=\kappa(M^{-1/2}AM^{-1/2})$)를 만족한다. 대각전처리 $M=\mathrm{diag}(A)$처럼 $\tilde\kappa \ll \kappa(A)$가 되도록 $M$을 고르면, 같은 정확도에 도달하는 데 필요한 반복 횟수가 크게 줄어든다.

## 문제
SPD 전처리행렬 $M$을 골라 $M^{-1}Ax=M^{-1}b$로 바꾸면 해는 그대로 $x=A^{-1}b$지만, $M^{-1}A$는 $A,M$이 모두 대칭이어도 일반적으로 대칭이 아니다(두 대칭행렬의 곱은 대칭이 아닐 수 있다). CG를 쓰려면 대칭성이 필요하므로, 대신 $M^{-1/2}AM^{-1/2}$처럼 양쪽에서 $M^{-1/2}$를 곱한 대칭화된 형태를 쓴다. $M^{-1}A$와 $M^{-1/2}AM^{-1/2}$의 관계는 $M^{-1}A = M^{-1/2}\big($==빈칸==$\big)M^{1/2}$ 이다.

## 해설
$M^{-1/2}(M^{-1/2}AM^{-1/2})M^{1/2} = M^{-1}AM^{-1/2}M^{1/2}=M^{-1}A$이므로 이렇게 인수분해됩니다. 이는 $M^{-1}A$가 대칭행렬 $M^{-1/2}AM^{-1/2}$와 닮음변환 관계임을 보여줍니다.

**정답: $M^{-1/2}AM^{-1/2}$**

## 예시
$A=\begin{pmatrix}100&1\\1&2\end{pmatrix}$는 대각성분의 스케일이 크게 다른 SPD 행렬입니다($100\cdot2-1^2=199>0$이라 SPD). 고유값을 계산하면 $\lambda\approx100.01,\,1.99$이고 조건수는 $\kappa(A)=\lambda_{\max}/\lambda_{\min}\approx50.26$입니다.

대각전처리 $M=\mathrm{diag}(100,\,2)$를 쓰면 $M^{-1/2}=\mathrm{diag}(1/10,\,1/\sqrt2)$이고,
$$\tilde A = M^{-1/2}AM^{-1/2}=\begin{pmatrix}1&\frac{1}{10\sqrt2}\\\frac{1}{10\sqrt2}&1\end{pmatrix}\approx\begin{pmatrix}1&0.0707\\0.0707&1\end{pmatrix}$$
이 $2\times2$ 대칭행렬은 대각성분이 모두 $1$이고 비대각성분이 $c=1/(10\sqrt2)\approx0.0707$이라, 고유벡터 $(1,1)/\sqrt2$와 $(1,-1)/\sqrt2$에 대응하는 고유값이 정확히 $1+c\approx1.0707$과 $1-c\approx0.9293$입니다. 따라서 $\kappa(\tilde A)=\dfrac{1+c}{1-c}\approx1.152$입니다.

$\kappa(A)\approx50.26$에서 $\kappa(\tilde A)\approx1.152$로 급감했습니다. CG의 스텝당 오차감소율 $r=\dfrac{\sqrt\kappa-1}{\sqrt\kappa+1}$을 비교하면 $r_A\approx0.753$인 반면 $r_{\tilde A}\approx0.035$로, 전처리된 시스템의 CG 1스텝이 원래 시스템의 CG 여러 스텝에 맞먹는 오차감소를 만들어냅니다.
