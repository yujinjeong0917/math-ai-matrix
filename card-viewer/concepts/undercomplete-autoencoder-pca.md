---
slug: undercomplete-autoencoder-pca
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 언더컴플리트 선형 오토인코더와 PCA의 동치성
related: 주성분분석(PCA) · 수축 오토인코더
---

## 도입
은닉층 차원이 입력보다 작은 오토인코더는 정보를 압축했다가 복원하도록 학습됩니다. 만약 인코더와 디코더가 모두 선형함수이고 손실이 평균제곱오차라면, 이 압축은 결국 우리가 이미 알고 있는 PCA와 똑같은 부분공간을 찾아냅니다.

## 명제
중심화된 데이터 $x\in\mathbb{R}^d$ (공분산 $\Sigma$, 고유값 $\lambda_1\ge\cdots\ge\lambda_d$)에 대해 인코더 $z=W_ex$($W_e\in\mathbb{R}^{k\times d}$, $k<d$)와 디코더 $\hat x=W_dz$($W_d\in\mathbb{R}^{d\times k}$)로 이루어진 선형 오토인코더가 $E\|x-W_dW_ex\|^2$를 최소화한다고 하자. 이때 최적해에서 $\mathrm{range}(W_d)$는 $\Sigma$의 상위 $k$개 고유벡터가 장(span)하는 부분공간과 같고, 최소 손실값은 $\sum_{i=k+1}^d\lambda_i$이다.

## 그림
<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="90" cy="150" r="3" class="dg-stroke-ink"/>
<circle cx="130" cy="120" r="3" class="dg-stroke-ink"/>
<circle cx="160" cy="140" r="3" class="dg-stroke-ink"/>
<circle cx="200" cy="90" r="3" class="dg-stroke-ink"/>
<circle cx="230" cy="105" r="3" class="dg-stroke-ink"/>
<circle cx="270" cy="60" r="3" class="dg-stroke-ink"/>
<circle cx="300" cy="75" r="3" class="dg-stroke-ink"/>
<line x1="60" y1="175" x2="330" y2="45" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="250" y="40" font-size="12">오토인코더 부분공간 = PCA 주성분 축</text>
<line x1="130" y1="120" x2="140" y2="132" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="200" y1="90" x2="210" y2="102" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<text x="90" y="192" font-size="10" class="dg-dim">두 축이 정확히 일치</text>
</svg>

_은닉차원 k인 선형 오토인코더가 학습한 부분공간은 PCA 상위 k개 주성분 축과 정확히 일치한다._

## 문제
$A$에 대해 미분하여 0으로 두면 $-2\Sigma U_S+2A\Sigma=0$, 즉 $A\Sigma=U_S^T\Sigma$이고, 이는 $A=$==빈칸== 로 만족된다 (이때 $C=U_SA=U_SU_S^T$, 즉 $S$ 위로의 직교사영이다).

## 해설
$A=U_S^T$를 대입하면 $A\Sigma=U_S^T\Sigma$가 그대로 성립하므로 정류점 조건을 만족해요. 즉 최적의 디코더-인코더 합성은 $U_S$ 위로의 직교사영 $U_SU_S^T$가 돼요.

**정답: $U_S^T$**

## 예시
PCA 예제에서 다뤘던 $\Sigma=\begin{pmatrix}3&1\\1&3\end{pmatrix}$를 그대로 씁니다. 고유값은 4와 2, 최대 고유값의 고유벡터는 $(1,1)/\sqrt2$입니다.

은닉층을 1차원($k=1$)으로 둔 선형 오토인코더를 학습시키면, 최적의 $W_dW_e$는 정확히 $(1,1)/\sqrt2$ 방향으로의 직교사영이고, 이때 남는 복원오차의 기댓값은 두 번째(작은) 고유값 $\lambda_2=2$와 같습니다. 실제로 $\mathrm{tr}(\Sigma)-\lambda_1=6-4=2$로 정확히 일치합니다.
