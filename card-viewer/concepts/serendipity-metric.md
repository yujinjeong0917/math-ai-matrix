---
slug: serendipity-metric
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 다양성 지표
title: 세렌디피티: 예상 밖인데도 만족스러운 추천
related: Intra-List Diversity · 추천 클릭률 상승분
---

## 도입
세렌디피티를 정의하려면 먼저 무엇이 예상된 추천인지 기준이 있어야 한다. 보통 인기순 추천이나 사용자의 과거 이용 이력만으로 만든 단순한 베이스라인 추천기를 기준선으로 두고 그 목록에 없는 아이템을 예상 밖으로 취급한다. 여기에 사용자가 실제로 클릭하거나 구매하는 등 유용하다고 반응한 아이템 집합을 겹쳐서 $\mathrm{Serendipity} = \dfrac{|\text{Unexpected} \cap \text{Useful}|}{|\text{Recommended}|}$로 계산한다.

이 지표가 정확도 지표와 별도로 필요한 이유는 정확도만 최적화한 추천기가 결국 사용자의 과거 행동을 그대로 반복해서 보여주는 방향으로 수렴하기 때문이다. 그 결과 사용자는 이미 아는 취향 안에 갇히고 서비스는 새로운 발견의 기회를 만들어주지 못한다. 세렌디피티는 이런 정체를 막고 장기적인 참여와 만족을 지키기 위한 보완 지표로 쓰인다.

다만 예상 밖이라는 기준 자체가 어떤 베이스라인을 고르느냐에 따라 달라지고 유용함도 클릭 같은 암묵적 신호로 근사할 수밖에 없어서 절대적인 숫자보다는 시간에 따른 변화나 알고리즘 간 상대 비교로 쓰는 경우가 많다. 세렌디피티를 끌어올리려는 재랭킹은 정확도를 희생하는 경우가 흔해서 Intra-List Diversity와 마찬가지로 관련성과의 균형을 함께 살펴야 한다.

## 명제


## 그림
<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg">
<rect x="60" y="40" width="440" height="240" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="280" y1="40" x2="280" y2="280" class="dg-line" stroke-width="1.5"/>
<line x1="60" y1="160" x2="500" y2="160" class="dg-line" stroke-width="1.5"/>
<rect x="280" y="40" width="220" height="120" class="dg-accent" opacity="0.18"/>
<text x="170" y="95" font-size="13" text-anchor="middle">예상됨 + 만족</text>
<text x="170" y="115" font-size="12" class="dg-dim" text-anchor="middle">뻔한 추천</text>
<text x="390" y="95" font-size="13" text-anchor="middle">예상 밖 + 만족</text>
<text x="390" y="115" font-size="12" text-anchor="middle">세렌디피티</text>
<text x="170" y="215" font-size="13" text-anchor="middle">예상됨 + 무관심</text>
<text x="170" y="235" font-size="12" class="dg-dim" text-anchor="middle">지루한 추천</text>
<text x="390" y="215" font-size="13" text-anchor="middle">예상 밖 + 무관심</text>
<text x="390" y="235" font-size="12" class="dg-dim" text-anchor="middle">엉뚱한 추천</text>
<text x="280" y="296" font-size="12" class="dg-dim" text-anchor="middle">예상됨 ← → 예상 밖</text>
</svg>

_예상 밖이면서 동시에 사용자가 만족한 추천만 세렌디피티로 인정된다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
사용자가 이미 좋아할 걸 뻔히 아는 상품만 계속 추천하면 안전하지만 지루하다. 세렌디피티는 사용자가 예상하지 못했는데도 실제로 마음에 들어 한 추천이 얼마나 나왔는지를 재는 지표다.

단순히 특이한 추천을 많이 하는 것과는 다르다. 예상 밖이면서 동시에 사용자에게 실제로 유용했던 경우만 세렌디피티로 인정한다. 예상 밖인데 관심도 없는 추천은 그냥 엉뚱한 추천일 뿐이다.


## 예시
어떤 사용자에게 추천 아이템 20개를 보여줬는데 이 중 실제로 클릭하거나 구매한 유용한 아이템이 8개였다고 하자. 이 8개 중에서 인기순 베이스라인 목록에는 없었던 예상 밖 아이템이 5개였다면 $\mathrm{Serendipity} = 5/20 = 25\%$다.

나머지 유용한 아이템 3개는 베이스라인에도 있었을 뻔한 추천이었으므로 세렌디피티로는 잡히지 않는다. 같은 추천기라도 베이스라인을 더 정교하게 잡으면 예상 밖으로 분류되는 아이템 수가 줄어들어 세렌디피티 값 자체가 낮아질 수 있다는 점도 함께 기억해야 한다.
