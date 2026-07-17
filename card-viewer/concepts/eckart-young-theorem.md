---
slug: eckart-young-theorem
theme: LINALG2
domainLabel: 선형대수 심화
subLabel: 랜덤행렬 · 저랭크
title: 에카르트-영(Eckart–Young) 정리: 프로베니우스 노름 최적 저랭크 근사
related: 
---

## 도입
추천시스템이나 모델압축에서는 큰 행렬 $A$를 랭크가 훨씬 작은 행렬로 대체하고 싶을 때가 많아요. 그런데 "가장 닮은" 저랭크 행렬을 어떻게 골라야 원본 정보를 최대한 남길 수 있을까요. 놀랍게도 정답은 이미 알고 있는 도구인 특이값분해(SVD) 안에 그대로 들어 있습니다. 특이값이 작은 성분들을 잘라내기만 하면 그게 바로 최적의 답이에요.

## 명제
$A\in\mathbb{R}^{m\times n}$의 특이값분해를 $A=\sum_{i=1}^r \sigma_i u_iv_i^T$ ($\sigma_1\ge\cdots\ge\sigma_r>0$, $r=\mathrm{rank}(A)$, $\{u_i\},\{v_i\}$는 각각 정규직교) 라 하자. $k<r$에 대해 절단된 SVD $A_k:=\sum_{i=1}^k\sigma_iu_iv_i^T$ 를 정의하면, $\mathrm{rank}(B)\le k$인 모든 행렬 $B$ 중 $A_k$가 프로베니우스 노름 $\|A-B\|_F$를 최소화하며, 그 최솟값은 $\|A-A_k\|_F=\sqrt{\sum_{i=k+1}^r\sigma_i^2}$ 이다.

## 그림
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="180" x2="300" y2="180" class="dg-line" stroke-width="1.5"/>
<line x1="50" y1="180" x2="50" y2="30" class="dg-line" stroke-width="1.5"/>
<rect x="70" y="50" width="30" height="130" class="dg-accent"/>
<rect x="115" y="90" width="30" height="90" class="dg-accent"/>
<rect x="160" y="120" width="30" height="60" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<rect x="205" y="150" width="30" height="30" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<line x1="150" y1="35" x2="150" y2="185" class="dg-stroke-ink" stroke-width="2"/>
<text x="95" y="30" font-size="11" text-anchor="middle">σ1..σk 유지</text>
<text x="215" y="30" font-size="10" class="dg-dim" text-anchor="middle">이후 절단(점선)</text>
<text x="370" y="60" font-size="13">‖A-B‖_F² ≥ ‖A-A_k‖_F² = Σ_{i&gt;k} σ_i²</text>
<text x="370" y="90" font-size="11" class="dg-dim">랭크 ≤ k인 임의의 B보다</text>
<text x="370" y="110" font-size="11" class="dg-dim">절단된 SVD A_k가 항상 더 가깝다</text>
</svg>

_특이값 막대에서 상위 k개만 남기고 절단하면 프로베니우스 노름 관점에서 최적의 저랭크 근사가 된다._

## 문제
$A-A_k=\sum_{i=k+1}^r\sigma_iu_iv_i^T$이다. 서로 다른 $i\neq j$에 대해 $\langle u_iv_i^T,\,u_jv_j^T\rangle_F=\mathrm{tr}(v_iu_i^Tu_jv_j^T)=(u_i^Tu_j)(v_i^Tv_j)=0$ 이므로(정규직교성), 이 랭크-$1$ 조각들은 프로베니우스 내적 기준으로 서로 수직이다. 따라서 프로베니우스 노름의 제곱은 각 조각의 노름 제곱을 그냥 더한 것과 같아 $\|A-A_k\|_F^2 = $==빈칸== 이다.

## 해설
서로 수직인 조각들의 합에서는 피타고라스 정리처럼 노름의 제곱이 각 조각 노름 제곱의 합이 돼요. 각 조각 $\sigma_iu_iv_i^T$의 프로베니우스 노름 제곱은 $\sigma_i^2\|u_i\|^2\|v_i\|^2=\sigma_i^2$이므로(단위벡터라 노름이 1) 이걸 $i=k+1$부터 $r$까지 더한 값이에요.

**정답: $\sum_{i=k+1}^r\sigma_i^2$**

## 예시
추상적인 최적화 논증에 앞서, 대칭행렬 하나로 절단된 SVD가 실제로 최적인지 직접 확인해봅니다.

$A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$는 대칭이라 SVD가 고유분해와 일치합니다. 고유값은 $3$과 $1$이고 각각의 고유벡터는 $(1,1)/\sqrt2$, $(1,-1)/\sqrt2$이므로 $\sigma_1=3,\,u_1=v_1=(1,1)/\sqrt2$이고 $\sigma_2=1,\,u_2=v_2=(1,-1)/\sqrt2$입니다.

랭크-$1$ 절단 $A_1=\sigma_1u_1v_1^T$을 계산하면 다음과 같습니다.
$$A_1=3\times\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}=\begin{pmatrix}1.5&1.5\\1.5&1.5\end{pmatrix}$$
오차는 $A-A_1=\begin{pmatrix}0.5&-0.5\\-0.5&0.5\end{pmatrix}$이고 $\|A-A_1\|_F=\sqrt{4\times0.25}=1$입니다. 명제가 예측하는 값 $\sqrt{\sigma_2^2}=\sqrt1=1$과 정확히 같습니다.

이제 랭크가 같은 $1$인 다른 행렬과 비교해봅니다. $B=\begin{pmatrix}2&0\\0&0\end{pmatrix}$ (랭크 $1$)을 고르면 $A-B=\begin{pmatrix}0&1\\1&2\end{pmatrix}$이고 $\|A-B\|_F=\sqrt{0+1+1+4}=\sqrt6\approx2.449$로, $A_1$일 때의 오차 $1$보다 훨씬 큽니다. 절단된 SVD가 임의로 고른 저랭크 행렬보다 실제로 더 낫습니다.
