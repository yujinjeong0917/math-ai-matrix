---
slug: gbdt-ranking
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 랭킹 모델
title: GBDT 랭킹: 그래디언트 부스팅 트리로 순위 매기기
related: LambdaMART
---

## 도입
$M$개의 트리를 더한 최종 예측은 다음과 같습니다.
$$F_M(x) = \sum_{m=1}^{M} \gamma_m h_m(x)$$
각 트리 $h_m$은 지금까지의 예측 $F_{m-1}(x)$가 만드는 손실의 음의 그래디언트를 새로 학습합니다. 함수공간에서 경사하강을 반복하는 셈이라 부스팅이라 부릅니다.

이전 세대의 선형 CTR 모델은 나이와 카테고리의 조합처럼 의미 있는 상호작용을 사람이 직접 새 피처 열로 만들어 넣어줘야 했습니다. 트리는 분기 경로 자체가 상호작용입니다. 나이로 한 번 나누고 그 안에서 다시 카테고리로 나누면 두 피처의 조합이 자연스럽게 만들어집니다.

트리는 피처 스케일에 둔감하고 결측값도 기본 분기 방향으로 처리할 수 있어 다루기 편합니다. 데이터가 아주 많지 않은 표 형태 랭킹 피처에서는 딥러닝보다 적은 튜닝으로도 강한 성능을 내는 경우가 많아 지금도 랭킹 단계의 기본값으로 널리 쓰입니다. 다만 손실이 클릭 여부 같은 포인트별 정답만 보고 있어서 순위 자체가 얼마나 좋아지는지는 직접 보지 못한다는 한계가 남습니다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="70" width="90" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="75" y="100" font-size="12" text-anchor="middle">트리 1</text>
<line x1="120" y1="95" x2="180" y2="95" class="dg-line" stroke-width="1.5"/>
<text x="150" y="85" font-size="11" text-anchor="middle">잔차</text>
<rect x="180" y="70" width="90" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="225" y="100" font-size="12" text-anchor="middle">트리 2</text>
<line x1="270" y1="95" x2="330" y2="95" class="dg-line" stroke-width="1.5"/>
<text x="300" y="85" font-size="11" text-anchor="middle">잔차</text>
<rect x="330" y="70" width="90" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="375" y="100" font-size="12" text-anchor="middle">트리 3</text>
<text x="375" y="145" font-size="11" text-anchor="middle" class="dg-dim">…</text>
<line x1="420" y1="95" x2="470" y2="95" class="dg-line" stroke-width="1.5"/>
<rect x="470" y="55" width="140" height="80" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="540" y="90" font-size="12" text-anchor="middle">모든 트리 합</text>
<text x="540" y="108" font-size="11" text-anchor="middle" class="dg-dim">F(x)=Σγₘhₘ(x)</text>
</svg>

_각 트리는 이전까지의 예측이 못 맞춘 잔차를 새로 학습해 더한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
Two-Tower와 ANN 검색을 거치면 후보가 수백 개 수준으로 좁혀집니다. 이 단계부터는 사용자와 아이템 피처를 훨씬 깊게 섞어서 정밀하게 순위를 매길 여유가 생깁니다. GBDT는 작은 결정트리 여러 개를 이어붙인 앙상블입니다. 새 트리는 지금까지의 트리들이 아직 못 맞춘 부분만 골라 고치도록 학습됩니다.

트리는 분기를 거듭하면서 나이나 요일이나 카테고리 같은 피처의 조합을 저절로 찾아냅니다. 사람이 미리 어떤 조합이 중요한지 짜서 넣어주지 않아도 됩니다.


## 예시

