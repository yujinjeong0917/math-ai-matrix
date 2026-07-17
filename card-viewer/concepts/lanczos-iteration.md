---
slug: lanczos-iteration
theme: NUM2
domainLabel: 수치해석 심화
subLabel: 반복법
title: Lanczos 반복법: 대칭행렬의 삼중대각화
hook: 큰 희소 대칭행렬 $A$의 고유값을 구하고 싶을 때, QR 알고리즘처럼 $A$ 전체를 밀집행렬로 다루며 대각화하는 것은 비용이 너무 큽니다.
related: 
---

## 기본설명
$A\in\mathbb{R}^{n\times n}$이 대칭이고 $q_1$이 단위벡터라 하자. $q_0=0,\ \beta_1=0$에서 시작해 $j=1,2,\dots$에 대해 $\alpha_j=q_j^TAq_j$, $r_j=Aq_j-\alpha_jq_j-\beta_jq_{j-1}$, $\beta_{j+1}=\|r_j\|_2$, $q_{j+1}=r_j/\beta_{j+1}$을 계산하는 Lanczos 반복은 정규직교벡터 $q_1,\dots,q_k$를 생성하며, $Q_k=[q_1\ \cdots\ q_k]$에 대해 $Q_k^TAQ_k=T_k$는 대각성분이 $\alpha_1,\dots,\alpha_k$이고 부대각성분이 $\beta_2,\dots,\beta_k$인 삼중대각행렬이다.

## 문제
일반적인(비대칭 허용) 아르놀디 과정에서는 $Aq_j$를 $q_1,\dots,q_j$ 전부에 대해 직교화해야 한다. 그런데 $A$가 대칭이면 $i<j-1$인 벡터에 대한 계수 $q_i^T(Aq_j)$는 $q_i^T(Aq_j)=(Aq_i)^Tq_j$로 바꿔쓸 수 있고, $Aq_i$는 $q_1,\dots,q_{i+1}$의 선형결합이며 $j>i+1$이면 $q_j$가 이 벡터들과 모두 직교하므로 $q_i^T(Aq_j) = $==빈칸== 가 된다.

## 해설
$Aq_i\in\mathrm{span}\{q_1,\dots,q_{i+1}\}$이고 $j>i+1$이면 $q_j\perp\mathrm{span}\{q_1,\dots,q_{i+1}\}$이므로 두 벡터의 내적이 0이 됩니다. 대칭성이 이 소거를 가능하게 하는 핵심입니다.

**정답: $0$**

## 예시
$A=\begin{pmatrix}4&1&1\\1&3&0\\1&0&2\end{pmatrix}$는 대칭이지만 $(1,3)$ 성분이 $0$이 아니라서 아직 삼중대각이 아닙니다. $q_1=(1,0,0)$에서 Lanczos를 시작합니다 (검산용: $\mathrm{tr}(A)=4+3+2=9$).

**1단계.** $\alpha_1=q_1^TAq_1=4$. $Aq_1=(4,1,1)$이므로 $r_1=Aq_1-\alpha_1q_1=(0,1,1)$이고 $\beta_2=\|r_1\|=\sqrt2$, $q_2=r_1/\beta_2=(0,\,1/\sqrt2,\,1/\sqrt2)$.

**2단계.** $Aq_2=(2,3,2)/\sqrt2$이고 $\alpha_2=q_2^TAq_2=2.5$. $r_2=Aq_2-\alpha_2q_2-\beta_2q_1=(0,\,\sqrt2/4,\,-\sqrt2/4)$이므로 $\beta_3=\|r_2\|=0.5$, $q_3=r_2/\beta_3=(0,\,1/\sqrt2,\,-1/\sqrt2)$.

**3단계.** $Aq_3=(0,\,3/\sqrt2,\,-2/\sqrt2)$이고 $\alpha_3=q_3^TAq_3=2.5$.

정리하면 $T_3=\begin{pmatrix}4&\sqrt2&0\\\sqrt2&2.5&0.5\\0&0.5&2.5\end{pmatrix}$이고, $\mathrm{tr}(T_3)=4+2.5+2.5=9=\mathrm{tr}(A)$로 직교닮음변환에서 대각합이 보존된다는 사실과 정확히 일치합니다. 실제로 $A$와 $T_3$의 고유값을 각각 구하면 둘 다 $\{1.468,\,2.653,\,4.879\}$로 동일합니다.
