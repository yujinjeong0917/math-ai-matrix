---
slug: ltv-modeling
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: LTV · 이탈예측
title: LTV 모델링: 고객 한 명이 평생 벌어다 줄 돈 추정하기
related: Churn 예측 · LTV:CAC 비율 · Payback Period
---

## 도입
가장 널리 쓰이는 단순 공식은 $LTV = \frac{ARPU \times m}{c}$다. $ARPU$는 고객 한 명의 월평균 매출, $m$은 매출총이익률, $c$는 월 이탈률이다. 이탈률이 매달 일정하다고 가정하면 평균 체류 개월수는 $\frac{1}{c}$가 되고 여기에 월별 순이익을 곱한 값이 곧 LTV다.

이 공식은 이탈률이 시간에 관계없이 일정하다고 가정한다는 한계가 있다. 실제로는 가입 직후 몇 달의 이탈률이 특히 높고 오래 남은 고객일수록 이후 이탈률이 낮아지는 경우가 흔하다. 그래서 정교한 팀은 단순 공식 대신 생존분석이나 그래디언트부스팅 같은 모델로 코호트별, 개인별 잔존 곡선을 직접 추정하고 그 곡선 아래 면적으로 LTV를 계산한다.

여기서 나온 월평균 매출과 이탈률 추정치는 뒤에 나오는 Payback Period 계산에 그대로 재사용된다. 이탈률 $c$ 자체는 Churn 예측 모델이 만들어내는 위험도 점수를 집계해서 얻는 경우가 많아 두 개념은 사실상 한 파이프라인 위에 있다.

흔한 함정은 세 가지다. 매출총이익률을 반영하지 않고 매출만으로 LTV를 계산하면 실제보다 크게 부풀려진다. 전체 고객 평균 하나로 뭉뚱그리면 상위 소수 고객이 평균을 끌어올려 대다수 고객의 실제 가치를 과대평가하게 된다. 마지막으로 이탈률이 일정하다는 가정 자체가 초기 코호트에서는 잘 맞지 않아 신생 서비스일수록 단순 공식의 오차가 커진다.

## 명제


## 그림
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="210" x2="580" y2="210" class="dg-line" stroke-width="1.5"/>
<rect x="70" y="90" width="50" height="120" class="dg-accent"/>
<rect x="150" y="118" width="50" height="92" class="dg-dim"/>
<rect x="230" y="140" width="50" height="70" class="dg-dim"/>
<rect x="310" y="158" width="50" height="52" class="dg-dim"/>
<rect x="390" y="172" width="50" height="38" class="dg-dim"/>
<rect x="470" y="184" width="50" height="26" class="dg-dim"/>
<text x="95" y="225" text-anchor="middle" font-size="12">1개월</text>
<text x="175" y="225" text-anchor="middle" font-size="12">2개월</text>
<text x="255" y="225" text-anchor="middle" font-size="12">3개월</text>
<text x="335" y="225" text-anchor="middle" font-size="12">4개월</text>
<text x="415" y="225" text-anchor="middle" font-size="12">5개월</text>
<text x="495" y="225" text-anchor="middle" font-size="12">6개월</text>
<path d="M 60 80 L 60 68 L 530 68 L 530 80" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="295" y="56" text-anchor="middle" font-size="13">누적 순이익 = LTV</text>
<text x="50" y="245" font-size="12" class="dg-dim">이탈로 남는 고객이 줄면서 매달 순이익도 함께 줄어든다</text>
</svg>

_매달 이탈로 줄어드는 고객이 남기는 순이익을 모두 더한 값이 LTV다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
고객 한 명을 데려오는 데 돈을 쓰기 전에 먼저 답해야 할 질문이 있다. 이 고객이 앞으로 얼마를 벌어다 줄 것인가다. 이 숫자 없이는 마케팅비를 얼마까지 써도 되는지 판단할 기준 자체가 없다. LTV(Lifetime Value)는 고객 한 명이 서비스를 이용하는 동안 남길 것으로 예상되는 총 이익을 미리 추정한 값이다.

계산 방식을 아주 단순화하면 이렇다. 이 고객이 한 달에 얼마를 쓰는지, 그 중 실제 이익으로 남는 비율은 얼마인지, 그리고 평균적으로 몇 달이나 머무는지를 곱한다. 오래 머물수록 많이 남기고 이탈이 빠를수록 LTV는 낮아진다.


## 예시
월평균 매출(ARPU) 10달러, 매출총이익률 70%, 월 이탈률 5%인 구독 서비스가 있다고 하자. $LTV = \frac{10 \times 0.7}{0.05} = 140$이므로 이 고객 한 명의 생애가치는 약 140달러로 추정된다. 같은 이탈률이 계속 유지된다면 평균 체류 개월수는 $\frac{1}{0.05}=20$개월이다.
