---
slug: eckart-young-low-rank
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 에카르트-영 정리: SVD 절단이 최적의 저랭크 근사인 이유
hook: 행렬을 압축하려면 랭크를 낮춰야 합니다.
related: 특이값분해(SVD) · 주성분분석(PCA)의 최적 방향
---

## 기본설명
$A=U\Sigma V^T=\sum_{i=1}^r\sigma_iu_iv_i^T$ ($\sigma_1\ge\cdots\ge\sigma_r>0$)이고 $k<r$이라 하자. $A_k:=\sum_{i=1}^k\sigma_iu_iv_i^T$라 두면, 랭크가 $k$ 이하인 모든 행렬 $B$ 중에서 $A_k$가 프로베니우스 노름 $\|A-B\|_F$를 최소화하며 그 최솟값은 $\|A-A_k\|_F=\sqrt{\sum_{i=k+1}^r\sigma_i^2}$이다. 이는 분산을 최대화하는 방향을 찾는 PCA의 논증과는 다른 증명 경로로, '가장 가까운 근사'라는 목표에서 직접 출발한다.

## 문제
폰 노이만 대각합 부등식(von Neumann's trace inequality, 널리 알려진 보조정리로 여기서는 결과만 인용한다)에 따르면 같은 크기의 두 행렬의 내적은 $\operatorname{tr}(A^TB)\le$==빈칸== 로 위로 제한된다(특이값을 각각 내림차순으로 나열해 대응시킨 곱의 합).

## 해설
$B$의 특이값이 $k$개까지만 0이 아니므로 합이 $i=1$부터 $k$까지만 남습니다.

**정답: $\sum_{i=1}^k \sigma_i(A)\sigma_i(B)$**

## 예시
$A=\begin{pmatrix}2&2\\-1&1\end{pmatrix}$의 SVD는 $\sigma_1=2\sqrt2$, $\sigma_2=\sqrt2$, $u_1=(1,0)$, $v_1=(1,1)/\sqrt2$였습니다(특이값분해 문서 참고). 랭크-1 절단은
$$A_1=\sigma_1u_1v_1^T=2\sqrt2\begin{pmatrix}1\\0\end{pmatrix}\begin{pmatrix}1/\sqrt2&1/\sqrt2\end{pmatrix}=\begin{pmatrix}2&2\\0&0\end{pmatrix}$$
이고, 오차는
$$A-A_1=\begin{pmatrix}0&0\\-1&1\end{pmatrix},\qquad\|A-A_1\|_F=\sqrt{0^2+0^2+(-1)^2+1^2}=\sqrt2=\sigma_2$$
입니다. 정리대로 오차가 정확히 버려진 특이값 $\sigma_2=\sqrt2$와 일치합니다. 다른 어떤 랭크-1 행렬로 $A$를 근사해도 이보다 프로베니우스 노름을 더 줄일 수 없습니다.
