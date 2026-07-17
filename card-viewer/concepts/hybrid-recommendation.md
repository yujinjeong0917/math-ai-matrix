---
slug: hybrid-recommendation
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 콜드스타트 대응
title: 하이브리드 방식: 협업필터링과 콘텐츠 기반을 함께 쓰기
related: 신규 사용자 콜드스타트 · 신규 아이템 콜드스타트 · 협업필터링과의 비교
---

## 도입
가장 단순한 결합은 두 방법이 각각 매긴 점수를 가중합하는 것이다. 최종 점수를 $score = \alpha \cdot CF_{score} + (1-\alpha) \cdot content_{score}$처럼 두고 상호작용 데이터가 충분한 사용자나 아이템에는 $\alpha$를 높여 협업 필터링 비중을 키우고 데이터가 부족한 콜드스타트 상황에는 $\alpha$를 낮춰 콘텐츠 기반 비중을 키운다.

조건에 따라 아예 다른 방법으로 전환하는 방식도 있다. 상호작용이 임계치 이하인 동안은 콘텐츠 기반 추천만 쓰다가 충분히 쌓이면 협업 필터링으로 전환한다. 또는 콘텐츠 기반으로 넓은 후보군을 먼저 추리고 그 후보군 안에서 협업 필터링이나 랭킹 모델이 순서를 다시 매기는 계단식 구조도 흔히 쓰인다.

최근에는 두 신호를 별도 시스템으로 분리하지 않고 하나의 랭킹 모델 안에 함께 넣는 방식이 많다. 아이템의 콘텐츠 특징 벡터와 협업 필터링에서 나온 임베딩을 같은 모델의 입력 특징으로 나란히 넣어 모델 스스로 두 신호의 가중치를 학습하게 하는 식이다. 결과적으로 콜드스타트 구간에서는 콘텐츠 특징이 신호를 채우고 데이터가 쌓인 구간에서는 협업 신호가 주도권을 넘겨받는 흐름이 하나의 모델 안에서 자연스럽게 이어진다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="95" y="41" text-anchor="middle" font-size="12">협업필터링 점수</text>
<text x="95" y="58" text-anchor="middle" font-size="11" class="dg-dim">상호작용 기반</text>
<rect x="20" y="130" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="95" y="151" text-anchor="middle" font-size="12">콘텐츠 기반 점수</text>
<text x="95" y="168" text-anchor="middle" font-size="11" class="dg-dim">특징 벡터 기반</text>
<line x1="170" y1="45" x2="260" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="170" y1="155" x2="260" y2="110" class="dg-line" stroke-width="1.5"/>
<rect x="260" y="70" width="160" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="340" y="95" text-anchor="middle" font-size="12">가중 결합</text>
<text x="340" y="112" text-anchor="middle" font-size="11" class="dg-dim">α·CF+(1-α)·콘텐츠</text>
<line x1="420" y1="100" x2="470" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="470" y="75" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="545" y="96" text-anchor="middle" font-size="12">최종 추천 순위</text>
<text x="340" y="55" text-anchor="middle" font-size="11" class="dg-dim">데이터 적을수록 α 감소</text>
</svg>

_협업필터링과 콘텐츠 기반 점수를 상황에 맞는 가중치로 섞어 최종 순위를 만든다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
협업 필터링은 데이터가 쌓일수록 강력해지지만 신규 사용자나 신규 아이템 앞에서는 무력하다. 콘텐츠 기반 필터링은 상호작용 없이도 작동하지만 아이템 자체의 특징 밖으로는 잘 나가지 못해 새로운 취향을 발견하는 힘이 약하다. 하이브리드 방식은 두 방법을 함께 써서 서로의 약점을 상대의 강점으로 메운다.


## 예시

