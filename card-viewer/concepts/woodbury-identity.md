---
slug: woodbury-identity
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 우드베리 항등식: 저랭크 업데이트의 역행렬
hook: 역행렬을 이미 알고 있는 행렬 $A$에 작은 변화(저랭크 업데이트) $UCV$를 더했을 때, 처음부터 $n\times n$ 역행렬을 다시 계산할 필요는 없습니다.
---

## 기본설명
$A\in\mathbb{R}^{n\times n}$, $C\in\mathbb{R}^{k\times k}$가 가역이고 $U\in\mathbb{R}^{n\times k}$, $V\in\mathbb{R}^{k\times n}$이며 $C^{-1}+VA^{-1}U$도 가역이라 하자. 그러면 $$(A+UCV)^{-1}=A^{-1}-A^{-1}U\big(C^{-1}+VA^{-1}U\big)^{-1}VA^{-1}$$이 성립한다.

## 문제
핵심은 대괄호 안을 $C$로 묶어내는 것이다. $I+CVA^{-1}U=C(C^{-1}+VA^{-1}U)$인데, 우변을 분배하면 $CC^{-1}+CVA^{-1}U=$==빈칸== 이므로 이 등식이 성립함을 확인할 수 있다.

## 해설
$CC^{-1}=I$이므로 분배한 결과가 정확히 좌변과 같아집니다.

**정답: $I + CVA^{-1}U$**

## 예시
$n=2$, $k=1$인 가장 단순한 경우(Sherman-Morrison 공식)로 확인해봅니다. $A=I$, $u=(1,1)^T$, $v=(1,-1)^T$, $C=[1]$이라 하면 $UCV=uv^T=\begin{pmatrix}1&-1\\1&-1\end{pmatrix}$이고
$$A+UCV=\begin{pmatrix}2&-1\\1&0\end{pmatrix}$$
입니다. 이 행렬의 행렬식은 $2\cdot0-(-1)\cdot1=1$이라 직접 역행렬을 구하면 $\begin{pmatrix}0&1\\-1&2\end{pmatrix}$입니다.

우드베리 공식으로 계산하면 $A^{-1}=I$이고 $VA^{-1}U=v^Tu=1-1=0$이므로 $C^{-1}+VA^{-1}U=1+0=1$입니다. 따라서
$$A^{-1}-A^{-1}U(1)^{-1}VA^{-1}=I-uv^T=\begin{pmatrix}1&0\\0&1\end{pmatrix}-\begin{pmatrix}1&-1\\1&-1\end{pmatrix}=\begin{pmatrix}0&1\\-1&2\end{pmatrix}$$
로 직접 계산한 역행렬과 정확히 일치합니다.
