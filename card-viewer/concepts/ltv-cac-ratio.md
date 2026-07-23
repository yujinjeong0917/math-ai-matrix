---
slug: ltv-cac-ratio
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 수익성 지표
title: LTV:CAC 비율: 벌어들이는 돈이 들인 돈보다 충분히 큰가
related: CAC · LTV 모델링 · Payback Period
---

## 도입
$\frac{LTV}{CAC}$로 계산한다. SaaS 업계에서는 이 값이 3 이상이면 건강한 수준이라는 경험칙이 널리 인용된다. 다만 이는 업종과 성장 단계에 따라 달라질 수 있는 경험칙일 뿐 절대적인 기준은 아니다. 값이 1 이하라면 고객을 늘릴수록 손해가 쌓이는 구조이고 3에서 5 사이는 대체로 안정적인 구간으로 본다. 반대로 지나치게 높은 값, 예를 들어 10을 넘는 경우는 오히려 마케팅에 너무 소극적이어서 더 빠르게 성장할 기회를 놓치고 있다는 신호로 해석되기도 한다.

이 비율이 의미 있으려면 LTV와 CAC 각각이 같은 기준으로 계산돼야 한다. LTV는 매출총이익률을 반영한 순이익 기준으로, CAC는 인건비와 툴 비용까지 포함한 전체 비용 기준으로 맞춰야 두 숫자를 나눈 값이 왜곡되지 않는다.

흔한 함정은 두 가지다. LTV는 미래를 추정한 값이라 낙관적으로 잡히기 쉽고 초기에 오래 남은 소수 고객만 보고 전체를 낙관하는 생존편향에 빠지기 쉽다. 또한 지금의 CAC는 현재 채널 믹스를 기준으로 한 값이라 마케팅 규모를 키우면 남아 있는 잠재 고객의 획득 비용이 더 비싸지면서 CAC 자체가 오르는 경우가 많다. 지금 비율이 좋다고 해서 그 비율이 그대로 유지된다는 보장은 없다.

## 명제


## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="220" x2="500" y2="220" class="dg-line" stroke-width="1.5"/>
<rect x="120" y="180" width="80" height="40" class="dg-dim"/>
<text x="160" y="240" text-anchor="middle" font-size="12">CAC</text>
<text x="160" y="170" text-anchor="middle" font-size="12">100달러</text>
<rect x="320" y="164" width="80" height="56" class="dg-accent"/>
<text x="360" y="240" text-anchor="middle" font-size="12">LTV</text>
<text x="360" y="154" text-anchor="middle" font-size="12">140달러</text>
<line x1="80" y1="100" x2="480" y2="100" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="480" y="94" text-anchor="end" font-size="12" class="dg-dim">3배 기준선</text>
<text x="300" y="40" text-anchor="middle" font-size="13">LTV/CAC = 1.4, 기준선(3배)에는 못 미친다</text>
</svg>

_LTV 막대가 CAC 막대의 3배에 이르러야 흔히 말하는 건강한 구간에 들어간다._

## 문제
고객 한 명이 남기는 순이익은 $LTV-CAC$이다. 이 값을 $LTV$로 나눈 비율은 $\dfrac{LTV-CAC}{LTV}=$==빈칸== 로 정리된다.

## 해설
분자를 LTV와 CAC로 나눠서 각각 LTV로 나누면 LTV/LTV=1과 CAC/LTV로 갈라져요.

**정답: $1-\dfrac{CAC}{LTV}$**

## 예시
앞서 구한 LTV 140달러와 CAC 100달러를 그대로 쓰면 $\frac{140}{100}=1.4$로 흔히 말하는 3배 기준에 못 미친다. 반대로 LTV가 450달러, CAC가 100달러라면 $\frac{450}{100}=4.5$로 건강한 구간에 들어간다.
