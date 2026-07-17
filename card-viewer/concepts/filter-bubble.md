---
slug: filter-bubble
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 다양성 · 공정성 · 탐색
title: 필터버블: 추천이 좁은 취향에 갇히는 현상
related: 노출 공정성 · Exploration-Exploitation
---

## 도입
필터버블은 협업 필터링이나 콘텐츠 기반 추천이 클릭 로그를 학습 신호로 쓰는 구조에서 자연스럽게 생긴다. 사용자가 A 장르를 클릭하면 모델은 A와 비슷한 아이템의 점수를 높이고 그 아이템이 다시 노출되어 클릭될 확률이 올라간다. 이 순환이 반복될수록 A 바깥의 아이템은 노출 기회 자체를 얻지 못해 클릭 데이터가 쌓이지 않고 모델은 그 아이템을 계속 낮게 평가한다. 정확도를 높이려는 최적화가 결과적으로 노출 범위를 스스로 좁히는 피드백 루프를 만드는 셈이다.

다양성은 보통 추천 목록 안에서 아이템끼리 얼마나 다른지로 측정한다. 대표적으로 목록 내 다양성은 $\mathrm{ILD} = \frac{1}{|R|(|R|-1)} \sum_{i \ne j \in R} d(i, j)$로 정의한다. 여기서 $R$은 추천 목록, $d(i,j)$는 두 아이템 사이의 거리다. 값이 클수록 목록 안 아이템들이 서로 이질적이라는 뜻이다.

완화 방법은 크게 두 갈래다. 하나는 재랭킹 단계에서 관련성 점수와 다양성 점수를 함께 최적화하는 것이고 다른 하나는 학습 단계에서부터 탐색적 노출을 일부 섞어 새로운 아이템에 대한 신호를 계속 확보하는 것이다. 뒤쪽 방법은 exploration exploitation 문제와 그대로 이어진다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<text x="30" y="20" font-size="12" class="dg-dim">라운드 1 · 다양한 카테고리 노출</text>
<circle cx="60" cy="55" r="13" class="dg-accent"/>
<circle cx="60" cy="90" r="13" class="dg-dim"/>
<circle cx="60" cy="125" r="13" class="dg-accent"/>
<circle cx="60" cy="160" r="13" class="dg-dim"/>
<circle cx="110" cy="55" r="13" class="dg-dim"/>
<circle cx="110" cy="90" r="13" class="dg-accent"/>
<circle cx="110" cy="125" r="13" class="dg-dim"/>
<circle cx="110" cy="160" r="13" class="dg-dim"/>
<text x="185" y="103" font-size="11" class="dg-dim">클릭</text>
<line x1="175" y1="108" x2="235" y2="108" class="dg-line" stroke-width="1.5"/>
<text x="255" y="20" font-size="12" class="dg-dim">라운드 2 · 좋아한 카테고리만 강화</text>
<circle cx="280" cy="75" r="16" class="dg-accent"/>
<circle cx="280" cy="125" r="14" class="dg-accent"/>
<circle cx="330" cy="100" r="9" class="dg-dim"/>
<text x="400" y="103" font-size="11" class="dg-dim">클릭</text>
<line x1="390" y1="108" x2="450" y2="108" class="dg-line" stroke-width="1.5"/>
<text x="470" y="20" font-size="12" class="dg-dim">라운드 3 · 카테고리 고착</text>
<circle cx="530" cy="108" r="20" class="dg-accent"/>
</svg>

_클릭이 쌓일수록 노출되는 카테고리 종류가 점점 줄어든다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
추천 시스템은 클릭한 것과 비슷한 것을 계속 보여준다. 그러다 보면 사용자가 원래 좋아하던 몇 가지 취향 바깥은 점점 화면에 뜨지 않게 된다. 처음에는 편리하지만 시간이 지날수록 선택지가 스스로 좁아지는 것처럼 느껴진다. 이 현상을 필터버블이라고 부른다.

문제는 사용자가 스스로 이 좁힘을 알아채기 어렵다는 점이다. 안 보이는 것은 안 보인다는 사실조차 알 수 없다. 그래서 추천 시스템을 설계할 때는 정확도만이 아니라 얼마나 다양한 아이템을 보여주는지도 함께 신경 써야 한다.


## 예시

