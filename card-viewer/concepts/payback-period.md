---
slug: payback-period
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 수익성 지표
title: Payback Period: 들인 돈을 회수하는 데 몇 달이 걸리는가
related: CAC · LTV:CAC 비율
---

## 도입
$T = \frac{CAC}{ARPU}$다. $CAC$는 고객 한 명을 획득하는 데 든 비용이고 $ARPU$는 고객당 월평균 매출이다. SaaS 업계에서는 흔히 12개월 이내를 양호한 기준으로 언급하지만 이 역시 절대적인 법칙이 아니라 업종과 자금 사정에 따라 달라지는 경험칙이다.

이 계산에 쓰이는 월평균 매출 추정치는 LTV 모델링에서 쓴 $ARPU$와 같은 값을 그대로 재사용할 수 있다. 결국 Payback Period는 CAC를 LTV 계산에 쓰인 월별 수익 흐름 위에 얹어서 회수 시점을 뽑아낸 지표라고 볼 수 있다.

흔한 함정은 매출 기준 계산과 매출총이익률을 반영한 이익 기준 계산을 섞어서 비교하는 것이다. 두 방식은 결과가 크게 달라지므로 어느 쪽을 쓰는지 항상 명시해야 한다. 또한 초기 할인가로 가입한 코호트는 이후 정가로 전환되며 $ARPU$ 자체가 바뀌기 때문에 가입 초기 데이터만으로 회수 기간을 낙관적으로 잡지 않도록 주의해야 한다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="200" x2="600" y2="200" class="dg-line" stroke-width="1.5"/>
<line x1="60" y1="200" x2="60" y2="30" class="dg-line" stroke-width="1.5"/>
<line x1="60" y1="90" x2="600" y2="90" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="82" text-anchor="end" font-size="12" class="dg-dim">CAC 100달러 회수 완료선</text>
<path d="M 60 200 L 600 77" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="543" cy="90" r="5" class="dg-accent"/>
<text x="543" y="112" text-anchor="middle" font-size="12">약 14.3개월</text>
<text x="60" y="216" font-size="12">0개월</text>
<text x="580" y="216" font-size="12">16개월</text>
<text x="70" y="42" font-size="12" class="dg-dim">누적 총이익</text>
</svg>

_누적 이익이 CAC를 넘어서는 시점이 곧 회수 완료 시점이다._

## 문제
고객 한 명이 매달 평균 $ARPU$만큼 매출을 낸다고 하자. $t$개월이 지나면 누적 매출은 $ARPU\times t$이고, 회수가 끝나는 시점은 이 누적 매출이 처음 들인 비용 $CAC$와 같아지는 순간이다. 이 조건 $ARPU\times T=CAC$를 $T$에 대해 정리하면 $T=$==빈칸== 다.

## 해설
ARPU×T=CAC의 양변을 ARPU로 나누면 T만 남아요.

**정답: $\dfrac{CAC}{ARPU}$**

## 예시
CAC가 100달러이고 고객당 월평균 매출이 10달러라면 $T=\frac{100}{10}=10$개월 만에 들인 돈을 회수한다. 다만 이 계산은 매출 전체를 기준으로 한 것이고 매출총이익률 70%를 반영한 월 이익 7달러를 기준으로 다시 계산하면 $\frac{100}{7}\approx14.3$개월로 늘어난다.
