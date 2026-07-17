---
slug: eigen-diagonalization
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 대칭행렬의 직교대각화 (스펙트럴 정리)
hook: 행렬을 다루기 쉬운 형태로 풀어헤치는 방법 중 가장 강력한 것이 대각화예요.
related: 
---

## 기본설명
$n\times n$ 실수 대칭행렬 $A$($A=A^T$)는 $A=Q\Lambda Q^T$ ($Q$: 직교행렬, $\Lambda$: 대각행렬) 형태로 대각화된다.

## 문제
직교행렬 $Q$를 만들려면 그 열로 쓸 고유벡터들이 서로 수직이어야 한다. 그래서 먼저 대칭행렬의 고유벡터들이 실제로 서로 직각을 이루는지부터 확인한다. 서로 다른 고유값 $\lambda_i\neq\lambda_j$에 대응하는 고유벡터 $v_i,v_j$는 ==빈칸== 이다. 이는 곧 두 고유벡터가 서로 직교한다는 뜻이다.

## 해설
$Av_i=\lambda_iv_i$와 $Av_j=\lambda_jv_j$라는 정의를 이용해서 $v_j^TAv_i$와 $v_i^TAv_j$를 각각 계산해 비교하면 $(\lambda_i-\lambda_j)v_i^Tv_j=0$이 나와요. $\lambda_i\neq\lambda_j$라고 가정했으니 남은 $v_i^Tv_j$가 0이어야만 이 등식이 성립해요. 그래서 직교해요.

**정답: $v_i^Tv_j = 0$**

## 예시
추상적인 증명 전에 대칭행렬 하나를 직접 대각화해보면 스펙트럴 정리가 무슨 말을 하는지 바로 느낄 수 있습니다.

다음 대칭행렬을 봅니다.
$$A=\begin{pmatrix}4&2\\2&1\end{pmatrix}$$
특성방정식을 풀면 고유값은 5와 0입니다. $\lambda=5$에 대응하는 고유벡터는 $(2,1)$이고 $\lambda=0$에 대응하는 고유벡터는 $(1,-2)$입니다. 두 벡터의 내적은 $2\times1+1\times(-2)=0$이라 실제로 서로 직교합니다.

이 두 고유벡터를 길이 1로 맞춰 열로 세우면 다음과 같습니다.
$$Q=\begin{pmatrix}2/\sqrt5&1/\sqrt5\\1/\sqrt5&-2/\sqrt5\end{pmatrix},\quad \Lambda=\begin{pmatrix}5&0\\0&0\end{pmatrix}$$
$Q$의 두 열은 각각 길이가 1이고 서로 수직이므로 $Q^TQ=I$가 성립합니다. 실제로 $Q\Lambda Q^T$를 계산해보면 다시 $\begin{pmatrix}4&2\\2&1\end{pmatrix}$가 나와 원래의 $A$와 정확히 일치합니다.

대칭행렬 하나를 직접 뜯어봤더니 직교행렬과 대각행렬로 정말 깔끔하게 갈라졌습니다. 아래 증명은 이 분해가 특정 행렬만의 우연이 아니라 모든 실수 대칭행렬에서 항상 가능하다는 사실을 보입니다.
