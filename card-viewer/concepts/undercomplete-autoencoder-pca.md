---
slug: undercomplete-autoencoder-pca
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 언더컴플리트 선형 오토인코더와 PCA의 동치성
hook: 은닉층 차원이 입력보다 작은 오토인코더는 정보를 압축했다가 복원하도록 학습됩니다.
related: 주성분분석(PCA) · 수축 오토인코더
---

## 기본설명
중심화된 데이터 $x\in\mathbb{R}^d$ (공분산 $\Sigma$, 고유값 $\lambda_1\ge\cdots\ge\lambda_d$)에 대해 인코더 $z=W_ex$($W_e\in\mathbb{R}^{k\times d}$, $k<d$)와 디코더 $\hat x=W_dz$($W_d\in\mathbb{R}^{d\times k}$)로 이루어진 선형 오토인코더가 $E\|x-W_dW_ex\|^2$를 최소화한다고 하자. 이때 최적해에서 $\mathrm{range}(W_d)$는 $\Sigma$의 상위 $k$개 고유벡터가 장(span)하는 부분공간과 같고, 최소 손실값은 $\sum_{i=k+1}^d\lambda_i$이다.

## 문제
$A$에 대해 미분하여 0으로 두면 $-2\Sigma U_S+2A\Sigma=0$, 즉 $A\Sigma=U_S^T\Sigma$이고, 이는 $A=$==빈칸== 로 만족된다 (이때 $C=U_SA=U_SU_S^T$, 즉 $S$ 위로의 직교사영이다).

## 해설
$A=U_S^T$를 대입하면 $A\Sigma=U_S^T\Sigma$가 그대로 성립하므로 정류점 조건을 만족해요. 즉 최적의 디코더-인코더 합성은 $U_S$ 위로의 직교사영 $U_SU_S^T$가 돼요.

**정답: $U_S^T$**

## 예시
PCA 예제에서 다뤘던 $\Sigma=\begin{pmatrix}3&1\\1&3\end{pmatrix}$를 그대로 씁니다. 고유값은 4와 2, 최대 고유값의 고유벡터는 $(1,1)/\sqrt2$입니다.

은닉층을 1차원($k=1$)으로 둔 선형 오토인코더를 학습시키면, 최적의 $W_dW_e$는 정확히 $(1,1)/\sqrt2$ 방향으로의 직교사영이고, 이때 남는 복원오차의 기댓값은 두 번째(작은) 고유값 $\lambda_2=2$와 같습니다. 실제로 $\mathrm{tr}(\Sigma)-\lambda_1=6-4=2$로 정확히 일치합니다.
