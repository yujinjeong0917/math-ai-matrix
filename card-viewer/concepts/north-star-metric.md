---
slug: north-star-metric
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 북극성지표 · OMTM
title: North Star Metric: 조직 전체가 함께 보는 단 하나의 지표
related: 가드레일 지표 · 퍼널분석
---

## 도입
North Star Metric을 고를 때 흔히 하는 실수는 매출을 그대로 쓰는 것이다. 매출은 가격을 급격히 올리거나 무리한 업셀을 강요해도 단기적으로 움직일 수 있어서 회사가 실제로 건강해지고 있는지와 어긋나는 방향으로도 오를 수 있다. 반면 잘 고른 North Star Metric은 고객이 제품에서 얻는 핵심 가치의 빈도나 강도를 직접 담는다. 숙박 예약 플랫폼이라면 예약된 숙박일수 음악 스트리밍이라면 실제로 재생된 시간처럼 사용자가 제품에서 얻는 실질적 경험량에 가까운 숫자를 고른다.

이 지표는 보통 그 자체로 관리하기보다 몇 개의 입력지표로 분해해서 다룬다. 예를 들어 주간 활성 창작자 수라는 North Star Metric은 신규 가입자 수 신규 가입자의 활성화율 기존 사용자의 재방문 빈도라는 몇 개의 입력지표의 곱이나 합으로 나타낼 수 있다. 각 팀이 자신이 실제로 움직일 수 있는 입력지표 하나씩을 맡으면 조직 전체가 하나의 지표를 향해 나눠서 일하는 구조가 만들어진다. 다만 이 분해가 제품이 바뀌어도 여전히 유효한지 주기적으로 다시 검증해야 한다. 시간이 지나며 입력지표를 움직여도 North Star Metric이 더 이상 따라오지 않는 상황이 생길 수 있다.

이 개념은 Lean Analytics에서 말하는 OMTM 즉 지금 이 순간 가장 중요한 단 하나의 지표와 자주 겹쳐 쓰인다. 다만 OMTM은 특정 성장 단계나 팀 단위에서 한시적으로 집중할 지표를 가리키는 경우가 많고 North Star Metric은 회사 전체가 오래 유지하는 상위 앵커에 가깝다는 뉘앙스 차이가 있다. 단일 지표에만 의존하면 그 지표를 게임하듯 억지로 올리는 부작용이 생길 수 있어서 실무에서는 항상 가드레일 지표와 짝을 지어 쓴다.

## 명제


## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<rect x="200" y="20" width="160" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="280" y="50" font-size="13" text-anchor="middle">North Star Metric</text>
<line x1="280" y1="70" x2="100" y2="140" class="dg-line" stroke-width="1.5"/>
<line x1="280" y1="70" x2="280" y2="140" class="dg-line" stroke-width="1.5"/>
<line x1="280" y1="70" x2="460" y2="140" class="dg-line" stroke-width="1.5"/>
<rect x="30" y="140" width="140" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="100" y="165" font-size="12" text-anchor="middle">입력지표 1</text>
<text x="100" y="183" font-size="11" text-anchor="middle" class="dg-dim">신규 활성화율</text>
<rect x="210" y="140" width="140" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="280" y="165" font-size="12" text-anchor="middle">입력지표 2</text>
<text x="280" y="183" font-size="11" text-anchor="middle" class="dg-dim">재방문 빈도</text>
<rect x="390" y="140" width="140" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="460" y="165" font-size="12" text-anchor="middle">입력지표 3</text>
<text x="460" y="183" font-size="11" text-anchor="middle" class="dg-dim">30일 잔존율</text>
</svg>

_North Star Metric은 여러 팀이 나눠 갖는 입력지표들의 조합으로 분해된다._

## 문제
북극성지표를 신규가입자수 $N$, 활성화율 $a$, 재방문율 $r$의 곱 $NSM = N \times a \times r$로 분해한다고 하자. $N=10{,}000$, $a=0.30$, $r=0.40$일 때 이번 주 지표값은 $NSM_0 = 10{,}000 \times 0.30 \times 0.40=$==빈칸== 명이다.

## 해설
세 입력지표를 그대로 곱하면 10,000×0.30×0.40=1,200이 되기 때문이에요.

**정답: $1{,}200$**

## 예시
주간 활성 창작자 수를 신규가입자수 $N$ 활성화율 $a$ 재방문율 $r$의 곱으로 근사한다고 하자. $N=10{,}000$ $a=0.30$ $r=0.40$이면 이번 주 활성 창작자 수는 $10{,}000 \times 0.30 \times 0.40 = 1{,}200$명이다.

온보딩 팀이 활성화율을 30%에서 33%로 3%포인트 개선하면 나머지가 그대로라도 $10{,}000 \times 0.33 \times 0.40 = 1{,}320$명이 되어 North Star Metric이 약 10% 상승한다. 온보딩 팀은 매출이나 재방문율을 직접 건드리지 않고도 자기 입력지표 하나만으로 전체 지표에 기여한 것을 확인할 수 있다.
