---
slug: matrix-factorization
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 협업필터링
title: Matrix Factorization: 평점행렬을 저랭크로 분해하기
related: ALS · Two-Tower 모델
---

## 도입
사용자 수를 $m$, 아이템 수를 $n$이라 하면 평점행렬은 $R \in \mathbb{R}^{m\times n}$입니다. Matrix Factorization은 이를 사용자 잠재행렬 $P \in \mathbb{R}^{m\times k}$와 아이템 잠재행렬 $Q \in \mathbb{R}^{n\times k}$의 곱으로 근사합니다.
$$R \approx PQ^\top,\qquad \hat r_{ui} = p_u^\top q_i$$
학습은 관측된 평점에서만 오차를 재는 목적함수를 최소화합니다.
$$\min_{P,Q}\ \sum_{(u,i)\in\Omega} (r_{ui}-p_u^\top q_i)^2 + \lambda\left(\|p_u\|^2+\|q_i\|^2\right)$$
여기서 $\Omega$는 실제로 평점이 관측된 (사용자, 아이템) 쌍의 집합입니다.

이전 세대인 이웃기반 협업필터링은 사용자끼리 또는 아이템끼리 평점 벡터의 유사도를 직접 계산했습니다. 유사도를 모든 쌍마다 저장하고 갱신해야 해서 사용자나 아이템이 늘어날수록 감당하기 어려워지고 평점이 희소할수록 유사도 자체가 불안정해집니다. Matrix Factorization은 유사도를 직접 계산하는 대신 소수의 잠재차원으로 압축된 벡터를 학습해서 이 확장성 문제를 피합니다.

합이 관측된 쌍에서만 도는 이유도 여기에 있습니다. 실제 평점행렬은 대부분 비어 있어서 완전한 행렬을 요구하는 일반 SVD는 애초에 적용할 수 없습니다. 정규화 항 $\lambda(\|p_u\|^2+\|q_i\|^2)$은 평점을 몇 개밖에 남기지 않은 사용자나 아이템이 과적합되는 것을 막아줍니다.

목적함수는 $P$와 $Q$를 동시에 움직이는 이차형식이라 전체적으로는 비볼록입니다. 확률적 경사하강법으로 관측된 평점 하나씩 오차를 줄여가며 $p_u$와 $q_i$를 같이 갱신하는 방식이 넷플릭스 프라이즈 시절부터 널리 쓰였습니다. 다음 항목인 ALS는 이 비볼록성을 정면으로 다루는 대신 한쪽을 고정해 문제를 쪼개는 방식으로 우회합니다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="30" width="150" height="150" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="40" y1="70" x2="190" y2="70" class="dg-line" stroke-width="1"/>
<line x1="40" y1="110" x2="190" y2="110" class="dg-line" stroke-width="1"/>
<line x1="40" y1="150" x2="190" y2="150" class="dg-line" stroke-width="1"/>
<line x1="80" y1="30" x2="80" y2="180" class="dg-line" stroke-width="1"/>
<line x1="120" y1="30" x2="120" y2="180" class="dg-line" stroke-width="1"/>
<line x1="160" y1="30" x2="160" y2="180" class="dg-line" stroke-width="1"/>
<rect x="80" y="30" width="40" height="40" class="dg-accent"/>
<rect x="160" y="70" width="30" height="40" class="dg-accent"/>
<rect x="40" y="150" width="40" height="30" class="dg-accent"/>
<text x="115" y="205" font-size="12" text-anchor="middle">R (평점행렬)</text>
<text x="215" y="115" font-size="16" text-anchor="middle">≈</text>
<rect x="245" y="30" width="35" height="150" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="262" y="205" font-size="12" text-anchor="middle">P (m×k)</text>
<text x="300" y="115" font-size="16" text-anchor="middle">×</text>
<rect x="330" y="90" width="230" height="35" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="445" y="145" font-size="12" text-anchor="middle">Qᵀ (k×n)</text>
</svg>

_희소한 평점행렬을 사용자 벡터 P와 아이템 벡터 Q의 곱으로 근사한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
추천 서비스는 사용자와 아이템의 모든 조합에 대한 평점을 알고 싶어합니다. 하지만 실제로 관측된 평점은 전체 조합 중 아주 일부뿐입니다. Matrix Factorization은 사용자마다 짧은 벡터를 하나씩, 아이템마다도 짧은 벡터를 하나씩 준 다음 두 벡터의 내적으로 평점을 예측합니다.

사용자 벡터와 아이템 벡터가 관측된 평점을 잘 재현하도록 학습되면 한 번도 보지 못한 조합의 평점도 같은 내적으로 채울 수 있습니다. 벡터 몇 개만으로 거대한 평점행렬 전체를 압축해서 표현하는 셈입니다.


## 예시
사용자 $u_1$의 잠재벡터가 $p_{u_1}=(1.2,\,0.5)$이고 아이템 $i_1$의 잠재벡터가 $q_{i_1}=(1.0,\,2.0)$이라면 예측 평점은 $\hat r_{u_1,i_1}=1.2\times1.0+0.5\times2.0=2.2$입니다. 실제 관측된 평점이 $2$라면 오차는 $0.2$ 정도에 불과합니다.

같은 사용자가 아이템 $i_3$을 한 번도 평가하지 않았어도 $q_{i_3}=(0.8,\,1.0)$만 있으면 $\hat r_{u_1,i_3}=1.2\times0.8+0.5\times1.0=1.46$처럼 관측되지 않은 칸도 채울 수 있습니다. 관측된 평점을 재현하도록 학습된 벡터가 관측되지 않은 조합에도 그대로 적용된다는 점이 Matrix Factorization을 협업필터링에 쓰는 핵심 이유입니다.
