---
slug: moore-penrose-pseudoinverse
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 무어-펜로즈 유사역행렬과 최소노름해
hook: 정사각행렬이 아니거나 랭크가 부족한 행렬은 보통의 역행렬을 가지지 않습니다.
related: 특이값분해(SVD) · 선형회귀 정규방정식
---

## 기본설명
$A\in\mathbb{R}^{m\times n}$의 특이값분해를 $A=U\Sigma V^T$(특이값 $\sigma_1\ge\cdots\ge\sigma_r>0$, 랭크 $r$)라 하고, $\Sigma^+\in\mathbb{R}^{n\times m}$을 $\Sigma$를 전치한 뒤 0이 아닌 대각성분을 역수로 바꾼 행렬이라 하자. $A^+:=V\Sigma^+U^T$라 두면, $Ax=b$가 해를 가질 때 $x^*=A^+b$는 그 해들 중 유클리드 노름 $\|x\|$이 가장 작은 유일한 해이다. 이는 열이 모두 독립인 과결정계에서 최소제곱해를 구하는 정규방정식(linear-regression-normal-equation)과 달리, 랭크부족 또는 과소결정(해가 무한히 많은) 상황을 다룬다.

## 문제
SVD $A=U\Sigma V^T$에서 $\ker(A)$는 특이값이 0인 방향들, 즉 $v_{r+1},\dots,v_n$이 생성하는 부분공간과 같다(이 방향들은 $A$가 완전히 눌러버리는 방향이다). 한편 $A^+b=V\Sigma^+U^Tb=\sum_{i=1}^r\dfrac{u_i^Tb}{\sigma_i}v_i$로 쓸 수 있는데, 이 식은 $v_1,\dots,v_r$만의 선형결합이므로 $A^+b\in$==빈칸== 이다.

## 해설
합이 $i=1$부터 $r$까지만 돌아가므로 $A^+b$는 오직 $v_1,\dots,v_r$의 선형결합입니다.

**정답: $\operatorname{span}(v_1,\dots,v_r)$**

## 예시
추상적인 증명 전에 랭크가 부족한 $2\times2$ 행렬로 최소노름해를 직접 확인해봅니다.
$$A=\begin{pmatrix}1&2\\2&4\end{pmatrix},\qquad b=\begin{pmatrix}5\\10\end{pmatrix}$$
$A$의 두 행은 서로 배수 관계라 랭크가 1이고, $Ax=b$를 만족하는 $x$는 무수히 많습니다. 이를테면 $x=(1,2)^T$도 $x=(7,-1)^T$도 모두 $Ax=b$를 만족합니다(직접 대입하면 $A(1,2)^T=(5,10)^T$, $A(7,-1)^T=(5,10)^T$).

이 행렬은 $A=vv^T$ ($v=(1,2)^T$) 꼴이라 특이값분해가 $\sigma_1=5$, $\sigma_2=0$, $u_1=v_1=v/\|v\|=(1,2)/\sqrt5$로 아주 간단합니다. 유사역행렬은 $$A^+=\frac{1}{\sigma_1}v_1u_1^T=\begin{pmatrix}0.04&0.08\\0.08&0.16\end{pmatrix}$$이고, $x^*=A^+b=(1,2)^T$입니다. 실제로 $\|(1,2)^T\|=\sqrt5\approx2.24$인데 반해 다른 해 $(7,-1)^T$의 노름은 $\sqrt{50}\approx7.07$로 훨씬 크므로, $A^+b$가 더 작은 노름의 해임을 확인할 수 있습니다.
