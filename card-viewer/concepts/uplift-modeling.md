---
slug: uplift-modeling
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 인과적 임팩트 측정
title: Uplift Modeling: 마케팅에 반응할 사람만 골라내기
related: Synthetic Control · MMM
---

## 도입
인과추론의 근본적인 문제는 한 사람에 대해 처치를 받았을 때의 결과와 안 받았을 때의 결과를 동시에 관측할 수 없다는 데 있다. 개인별 처치효과 $\tau_i = y_i(1) - y_i(0)$는 그래서 원리적으로 관측 불가능하다. Uplift Modeling은 무작위로 나뉜 과거의 처치군과 대조군 데이터를 이용해 개인 하나의 두 가지 잠재적 결과를 직접 비교하는 대신 특징이 비슷한 사람들을 처치군과 대조군에서 각각 모아 그 그룹 단위의 평균 차이를 특징의 함수로 추정한다.
$$\tau(x) = E[Y(1) \mid X=x] - E[Y(0) \mid X=x]$$
구매확률 자체를 예측해서 점수가 높은 순으로 타겟팅하는 일반적인 반응모델은 애초에 구매확률이 높은 사람 즉 쿠폰이 없어도 어차피 살 사람들을 우선적으로 골라내는 경향이 있다. 이 사람들에게 예산을 쓰는 건 결과를 바꾸지 못하면서 마진만 내주는 낭비다.

고객을 처치 여부에 따른 반응으로 나누면 네 가지 유형이 나온다. 처치해야만 사는 설득 가능군은 우플리프트가 양수라 타겟팅할 가치가 가장 크고 처치 여부와 무관하게 어차피 사는 확실 구매군과 어차피 안 사는 가망 없음군은 우플리프트가 0에 가까워 타겟팅해도 결과가 달라지지 않는다. 가장 위험한 유형은 처치를 받으면 오히려 구매를 덜 하게 되는 역효과군으로 우플리프트가 음수다. 일반 반응모델은 처치군과 대조군을 함께 놓고 비교하지 않기 때문에 이 역효과군을 원리적으로 찾아낼 수가 없다.

모델링 방법으로는 처치군과 대조군에 각각 별도 모델을 학습시키고 예측값을 빼는 투모델 방식이 가장 단순하지만 두 모델의 오차 패턴이 다르면 편향이 생기기 쉽다. 좀 더 정교한 방식은 우플리프트 트리처럼 애초에 분기 기준 자체를 처치군과 대조군 사이 결과분포 차이를 최대로 벌리는 방향으로 잡아서 처음부터 우플리프트를 직접 최적화한다.

## 명제


## 그림
<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="20" x2="60" y2="260" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="60" y1="260" x2="480" y2="260" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="270" y1="20" x2="270" y2="260" class="dg-line" stroke-width="1" stroke-dasharray="4,4"/>
<line x1="60" y1="140" x2="480" y2="140" class="dg-line" stroke-width="1" stroke-dasharray="4,4"/>
<text x="150" y="80" font-size="13" text-anchor="middle" class="dg-accent">Persuadables</text>
<text x="150" y="98" font-size="10" text-anchor="middle" class="dg-dim">처치해야 사는 사람</text>
<text x="380" y="80" font-size="13" text-anchor="middle">Sure Things</text>
<text x="380" y="98" font-size="10" text-anchor="middle" class="dg-dim">어차피 사는 사람</text>
<text x="150" y="200" font-size="13" text-anchor="middle">Lost Causes</text>
<text x="150" y="218" font-size="10" text-anchor="middle" class="dg-dim">어차피 안 사는 사람</text>
<text x="380" y="200" font-size="13" text-anchor="middle" class="dg-accent">Sleeping Dogs</text>
<text x="380" y="218" font-size="10" text-anchor="middle" class="dg-dim">건드리면 역효과</text>
<text x="270" y="290" font-size="11" text-anchor="middle">미처치 시 구매확률: 낮음 → 높음</text>
</svg>

_처치 여부에 따른 구매확률 조합으로 네 유형이 나뉘고 우플리프트는 설득 가능군을 겨냥한다._

## 문제
먼저 처치군 쪽을 본다. $T=1$인 사람들은 일관성 가정에 의해 관측된 결과가 곧 $Y(1)$이므로 $E[Y\mid X=x,T=1]=E[Y(1)\mid X=x,T=1]$이다. 그런데 무작위배정으로 $T$와 $Y(1)$이 독립이므로 조건 $T=1$을 굳이 걸지 않아도 기댓값이 같다. 즉 $E[Y(1)\mid X=x,T=1]=$==빈칸==이다.

## 해설
T와 Y(1)이 독립이라는 것은 T=1이라는 조건을 걸어도 Y(1)의 분포(따라서 기댓값)가 바뀌지 않는다는 뜻이에요. 그러니 조건에서 T=1을 빼도 값이 같아요.

**정답: $E[Y(1)\mid X=x]$**

## 예시
20,000명을 처치군 10,000명 대조군 10,000명으로 무작위 배정한 쿠폰 캠페인에서 처치군 구매 2,200명(22%) 대조군 구매 1,800명(18%)이 나왔다고 하자. 전체 평균 우플리프트는 $22\%-18\%=4\%\text{p}$이고 순증 구매는 $2{,}200-1{,}800=400$명이다.

우플리프트 모델로 예측점수 상위 10%인 2,000명씩을 처치군과 대조군에서 뽑아 비교했더니 처치군은 35%인 700명이 구매하고 대조군은 15%인 300명이 구매해 그 구간의 순증이 400명이었다. 즉 전체 순증 400명 전부가 상위 10% 구간에서 나온 셈이고 나머지 90% 구간에서는 쿠폰이 구매 여부를 거의 바꾸지 못했다는 뜻이다. 상위 10%에게만 쿠폰을 준다면 예산의 10분의 1만 쓰고도 순증 구매 전체를 그대로 얻을 수 있다.
