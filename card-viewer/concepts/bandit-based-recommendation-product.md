---
slug: bandit-based-recommendation-product
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 추천 · 개인화
title: 밴딧 기반 추천: 실시간으로 탐색과 활용의 균형 잡기
related: 개인화 랭킹 · CTR
---

## 도입
고전적인 A/B테스트는 실험 기간 동안 트래픽을 균등하게 나누고 기간이 끝난 뒤 한 번에 승자를 정한다. 밴딧은 그 사이 계속 관측치를 쌓으며 트래픽 배분 비율 자체를 실시간으로 바꾼다. 가장 단순한 방법은 엡실론 그리디로 확률 $\epsilon$만큼은 무작위로 아무 옵션이나 시도하고 나머지 $1-\epsilon$은 지금까지 성과가 가장 좋은 옵션을 그대로 활용한다. UCB나 톰슨 샘플링 같은 방법은 각 옵션의 성과 추정치와 함께 그 추정치의 불확실성까지 반영해 아직 덜 알려진 옵션에 조금 더 기회를 주는 식으로 탐색과 활용을 더 정교하게 조절한다.

사용자 특징까지 반영해 사용자마다 최선의 옵션이 다를 수 있다고 보는 방식을 맥락적 밴딧이라 부른다. 이 경우 밴딧의 팔 선택 문제는 개인화 랭킹의 스코어링 문제와 사실상 맞닿는다. 랭킹 모델이 내놓은 점수를 팔의 기대 보상으로 쓰고 그 위에 탐색 로직을 얹는 구조가 흔하다.

흔한 함정은 초반 데이터가 적을 때 우연히 성과가 좋아 보인 옵션에 트래픽이 너무 빨리 쏠려 다른 옵션을 제대로 검증하지 못하고 조기에 수렴해버리는 것이다. 사용자 취향이 시간에 따라 바뀌는 비정상성 환경에서는 과거에 이겼던 팔에 계속 트래픽이 몰려 새로운 변화에 둔감해질 수 있다. 전환처럼 보상이 나타나기까지 시간이 걸리는 지표를 목표로 쓰면 아직 결과가 확정되지 않은 최근 노출을 어떻게 반영할지도 별도로 설계해야 한다.

## 명제


## 그림
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="30" width="520" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="40" y="30" width="52" height="40" class="dg-accent"/>
<rect x="92" y="30" width="468" height="40" class="dg-dim"/>
<text x="66" y="55" text-anchor="middle" font-size="12">탐색 10%</text>
<text x="326" y="55" text-anchor="middle" font-size="12">활용 90%(현재 최선의 팔)</text>
<line x1="66" y1="70" x2="66" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="66" y1="110" x2="150" y2="150" class="dg-line" stroke-width="1.5"/>
<line x1="66" y1="110" x2="300" y2="150" class="dg-line" stroke-width="1.5"/>
<line x1="66" y1="110" x2="450" y2="150" class="dg-line" stroke-width="1.5"/>
<rect x="105" y="150" width="90" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="150" y="174" text-anchor="middle" font-size="12">팔 A</text>
<rect x="255" y="150" width="90" height="40" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="300" y="174" text-anchor="middle" font-size="12">팔 B(최선)</text>
<rect x="405" y="150" width="90" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="450" y="174" text-anchor="middle" font-size="12">팔 C</text>
<line x1="326" y1="70" x2="300" y2="150" class="dg-stroke-accent" stroke-width="2"/>
<text x="300" y="215" text-anchor="middle" font-size="12" class="dg-dim">활용 트래픽은 최선의 팔로 몰리고 탐색 트래픽은 세 팔에 고르게 나뉜다</text>
</svg>

_탐색 비율만큼은 계속 다른 옵션을 시도하며 정보를 갱신한다._

## 문제
먼저 탐색에 배정되는 전체 노출 수는 $T$에 $\epsilon$을 곱해 구할 수 있으므로 ==빈칸== 건이다.

## 해설
엡실론 비율만큼의 노출이 탐색에 쓰이므로 전체 노출 T에 엡실론을 곱해요.

**정답: $T\epsilon=90000\times0.1=9000$**

## 예시
하루 노출 90000건, 탐색 비율(엡실론) 0.1인 엡실론 그리디 정책을 쓴다고 하자. 탐색에 배정되는 노출은 $90000\times0.1=9000$건이고 이를 후보 3개 팔에 고르게 나누면 팔마다 $9000/3=3000$건씩 받는다. 나머지 $90000\times0.9=81000$건은 모두 현재 성과가 가장 좋은 팔로 간다. 그 결과 최선의 팔은 하루 $81000+3000=84000$건을, 나머지 두 팔은 각각 3000건을 받는 셈이다.
