---
slug: session-based-recommendation
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 세션 기반 추천
title: 세션 기반 추천: 로그인 없이 지금 행동만으로 추천하기
related: GRU4Rec · Next-item Prediction
---

## 도입
전통적인 협업 필터링은 사용자 아이디별로 누적된 이력을 벡터나 임베딩으로 요약해 추천에 쓴다. 하지만 익명 사용자, 신규 방문자, 로그인하지 않은 사용자에게는 그런 이력이 없다. 세션 기반 추천은 사용자 식별자 대신 하나의 세션, 즉 같은 방문 동안의 클릭과 장바구니 담기와 조회 같은 행동 순서만을 입력으로 쓴다.

핵심은 순서 정보다. 단순히 세션 안에서 함께 본 아이템의 집합만 보는 것이 아니라 어떤 아이템 다음에 어떤 아이템을 봤는지 즉 순서를 반영해야 다음 행동을 더 잘 예측할 수 있다. 초기에는 아이템 간 전이 확률을 마르코프 체인으로 모델링하는 방법을 썼고 이후에는 RNN 계열인 GRU4Rec이나 셀프어텐션 기반 모델인 SASRec, BERT4Rec처럼 세션 전체 맥락을 함께 인코딩하는 방식으로 발전했다.

세션 기반 추천은 next-item prediction 과제로 정식화되는 경우가 많다. 세션 안 클릭 순서 $x_1, x_2, \ldots, x_t$가 주어졌을 때 다음 클릭 $x_{t+1}$을 전체 아이템 카탈로그에 대한 순위 문제로 예측한다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<text x="30" y="20" font-size="12" class="dg-dim">이번 세션의 클릭 순서</text>
<circle cx="60" cy="70" r="16" class="dg-dim"/><text x="60" y="74" text-anchor="middle" font-size="11">A</text>
<line x1="76" y1="70" x2="124" y2="70" class="dg-line" stroke-width="1.5"/>
<circle cx="140" cy="70" r="16" class="dg-dim"/><text x="140" y="74" text-anchor="middle" font-size="11">B</text>
<line x1="156" y1="70" x2="204" y2="70" class="dg-line" stroke-width="1.5"/>
<circle cx="220" cy="70" r="16" class="dg-dim"/><text x="220" y="74" text-anchor="middle" font-size="11">C</text>
<line x1="236" y1="70" x2="290" y2="70" class="dg-line" stroke-width="1.5"/>
<rect x="300" y="40" width="120" height="60" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="360" y="65" text-anchor="middle" font-size="12">세션 모델</text>
<text x="360" y="82" text-anchor="middle" font-size="11" class="dg-dim">GRU4Rec 등</text>
<line x1="420" y1="70" x2="470" y2="70" class="dg-line" stroke-width="1.5"/>
<circle cx="490" cy="70" r="18" class="dg-accent"/><text x="490" y="74" text-anchor="middle" font-size="11">D?</text>
<text x="490" y="108" text-anchor="middle" font-size="12">다음 클릭 예측</text>
<text x="30" y="160" font-size="12" class="dg-dim">사용자 아이디나 로그인, 과거 이력이 없어도 동작</text>
</svg>

_세션 안 클릭 순서만으로 다음에 볼 아이템을 예측한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
온라인 쇼핑몰에 로그인하지 않고 들어온 사용자도 있고 오랜만에 들어와서 예전 취향이 지금과 다를 수도 있다. 이런 사용자에게는 과거 전체 이력을 쓰는 개인화 추천을 적용하기 어렵다. 세션 기반 추천은 그 사용자가 지금 이 방문에서 클릭하고 담은 몇 개의 행동만 보고 다음에 볼 만한 아이템을 추천한다.

비유하면 오래 알고 지낸 단골 손님의 취향을 기억해서 추천하는 대신 방금 매장에 들어와 둘러본 코너만 보고 다음 코너를 안내하는 셈이다.


## 예시

