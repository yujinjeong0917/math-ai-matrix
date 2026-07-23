---
slug: gabor-granger-method
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 가격 민감도 조사
title: Gabor-Granger 방법: 여러 가격을 제시해 수요곡선 그리기
related: Van Westendorp PSM · 프리미엄 전환율
---

## 도입
응답자에게 가격 몇 개를 순서대로 제시하고 각각에 대해 예 또는 아니오로 답하게 한다. 가격 $p$에서 사겠다고 답한 비율을 $D(p)$라 하면 가격이 오를수록 $D(p)$는 단조 감소하는 계단형 곡선이 된다. 여기에 가격을 곱한 $R(p) = p \times D(p)$를 계산하면 기대 매출을 지수화한 값을 얻고 이 값이 가장 큰 가격을 매출 최적화 관점의 후보 가격으로 삼는다.

Van Westendorp와의 차이는 누가 가격을 정하느냐에 있다. PSM은 응답자가 스스로 기준점을 만들게 하지만 Gabor-Granger는 조사자가 미리 몇 개의 가격을 골라서 제시해야 한다. 제시 범위 밖의 가격에 대한 반응은 알 수 없다는 뜻이다. 대신 사겠다 안 사겠다처럼 구매 결정에 훨씬 가까운 질문이라 응답이 행동 지향적이고 $R(p)$처럼 매출을 바로 시뮬레이션할 수 있다는 장점이 있다.

한계는 PSM과 비슷하다. 여전히 실제 결제가 아니라 설문 속 진술 의향이고 경쟁 상품 가격이 화면에 없는 상태에서 답하기 때문에 실제 시장 반응과 차이가 날 수 있다. 그래서 두 방법을 함께 써서 서로의 약점을 보완하는 경우가 많다.

## 명제


## 그림
<svg viewBox="0 0 580 240" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="18" font-size="12">구매의향 D(p)와 매출지수 R(p)=p×D(p)</text>
<line x1="50" y1="40" x2="50" y2="200" class="dg-line" stroke-width="1.5"/>
<line x1="50" y1="200" x2="540" y2="200" class="dg-line" stroke-width="1.5"/>
<rect x="65" y="65" width="50" height="135" class="dg-dim"/>
<rect x="165" y="87" width="50" height="113" class="dg-dim"/>
<rect x="265" y="125" width="50" height="75" class="dg-dim"/>
<rect x="365" y="155" width="50" height="45" class="dg-dim"/>
<rect x="465" y="185" width="50" height="15" class="dg-dim"/>
<polyline points="90,71 190,50 290,71 390,106 490,163" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="190" cy="50" r="5" class="dg-accent"/>
<text x="190" y="34" font-size="12" text-anchor="middle">최적가 7,000원</text>
<text x="90" y="215" font-size="11" text-anchor="middle" class="dg-dim">5,000</text>
<text x="190" y="215" font-size="11" text-anchor="middle" class="dg-dim">7,000</text>
<text x="290" y="215" font-size="11" text-anchor="middle" class="dg-dim">9,000</text>
<text x="390" y="215" font-size="11" text-anchor="middle" class="dg-dim">11,000</text>
<text x="490" y="215" font-size="11" text-anchor="middle" class="dg-dim">13,000</text>
<text x="290" y="232" font-size="11" text-anchor="middle" class="dg-dim">제시 가격(원)</text>
</svg>

_구매의향은 가격이 오를수록 줄어들지만 매출지수는 7,000원에서 정점을 찍는다._

## 문제
먼저 $(5000, 0.9)$와 $(9000, 0.5)$ 두 점을 지나는 직선의 기울기를 구하면 $\dfrac{0.5-0.9}{9000-5000} = $==빈칸== 다.

## 해설
두 점 사이의 변화량을 그대로 나눈 값이에요. 구매의향이 가격 1원당 얼마나 줄어드는지를 나타내는 기울기예요.

**정답: $-0.0001$**

## 예시
5,000원, 7,000원, 9,000원, 11,000원, 13,000원 다섯 가격을 20명에게 제시하고 사겠다고 답한 사람 수를 세었더니 각각 18명, 15명, 10명, 6명, 2명이었다. 구매의향 비율 $D(p)$는 90%, 75%, 50%, 30%, 10%다.

매출지수 $R(p) = p \times D(p)$를 계산하면 4500, 5250, 4500, 3300, 1300이다. 가장 큰 값은 7,000원에서 나온 5250이므로 이 데이터 안에서는 7,000원이 매출을 극대화하는 후보 가격이 된다.
