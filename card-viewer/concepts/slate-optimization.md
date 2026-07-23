---
slug: slate-optimization
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 강화학습 추천
title: 슬레이트 최적화: 한 화면 전체를 하나의 조합으로 최적화하기
related: 장기보상 최적화 · Contextual Bandit
---

## 도입
단순한 상위 $k$개 방식은 $\sum_i \mathrm{score}(i)$가 큰 순서로 아이템을 골라 채워 넣습니다. 사용자가 각 아이템을 다른 아이템과 무관하게 독립적으로 평가한다고 가정하는 셈입니다. 이 가정은 비슷한 아이템끼리 클릭을 나눠 갖는 대체 효과나 다양한 화면이 더 많은 관심을 끌어내는 보완 효과를 놓칩니다.

슬레이트 최적화는 후보 전체에서 순서 있는 아이템 집합 $S=(i_1,\dots,i_k)$ 하나를 골라 그 슬레이트 전체의 기대보상을 최대화하는 문제로 다시 씁니다. 사용자 $u$가 주어졌을 때 $\mathbb{E}[R(S)\mid u]$의 $R(S)$는 개별 점수의 단순합이 아니라 조합 자체에 좌우됩니다. 가능한 슬레이트 조합은 $N$개 후보에서 $\binom{N}{k}k!$개나 되어 정확히 다 따져보는 것은 현실적이지 않습니다. 실제로는 이미 고른 아이템들에 가장 큰 보상을 더해줄 다음 아이템을 순차적으로 골라 넣는 탐욕적 구성이나 슬레이트 전체 혹은 지금까지 고른 슬레이트를 조건으로 한 다음 아이템을 직접 점수화하는 모델을 씁니다.

결국 매 시점의 행동이 아이템 하나가 아니라 슬레이트 전체가 되는 문제로 바뀝니다. 그래서 슬레이트 최적화는 강화학습으로 풀리는 경우가 많습니다. 행동 공간을 슬레이트 단위로 잡고 그 슬레이트가 만들어낸 전체 참여도를 보상으로 삼으면 아이템끼리의 상호작용을 독립성을 가정하지 않고 데이터에서 직접 학습할 수 있습니다.

## 명제


## 그림
<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="20" font-size="13" text-anchor="middle">개별 점수로 상위 k개 선택</text>
<rect x="40" y="40" width="60" height="60" class="dg-accent"/>
<text x="70" y="75" font-size="11" text-anchor="middle">A</text>
<rect x="110" y="40" width="60" height="60" class="dg-accent"/>
<text x="140" y="75" font-size="11" text-anchor="middle">A'</text>
<rect x="180" y="40" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="210" y="75" font-size="11" text-anchor="middle">B</text>
<text x="140" y="118" font-size="11" text-anchor="middle" class="dg-dim">A와 A'는 비슷해서 겹침</text>
<text x="470" y="20" font-size="13" text-anchor="middle">슬레이트 단위로 조합 최적화</text>
<rect x="380" y="40" width="60" height="60" class="dg-accent"/>
<text x="410" y="75" font-size="11" text-anchor="middle">A</text>
<rect x="450" y="40" width="60" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="480" y="75" font-size="11" text-anchor="middle">C</text>
<rect x="520" y="40" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="550" y="75" font-size="11" text-anchor="middle">B</text>
<text x="480" y="118" font-size="11" text-anchor="middle" class="dg-dim">A, C, B는 서로 다른 관심사를 커버</text>
<path d="M380,130 L580,130" fill="none" class="dg-line" stroke-width="1.5"/>
<text x="480" y="150" font-size="11" text-anchor="middle">전체 슬레이트 = 하나의 액션</text>
</svg>

_개별 최고점 조합은 비슷한 항목이 겹칠 수 있지만 슬레이트 최적화는 화면 전체의 다양성까지 고려한다._

## 문제
두 아이템 $i,j$가 서로 완전한 대체재라서 같이 노출되면 사용자가 둘 중 최대 하나만 클릭한다고 하자. 단독 클릭확률이 각각 $p_i=p_j=0.6$이면, 나이브 top-k가 매기는 슬레이트 점수는 $\mathrm{score}(i)+\mathrm{score}(j)=p_i+p_j=$==빈칸== 이다.

## 해설
score(i)=p_i=0.6, score(j)=p_j=0.6이므로 단순히 더하면 0.6+0.6=1.2가 나와요.

**정답: $1.2$**

## 예시

