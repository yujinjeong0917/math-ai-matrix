---
slug: input-metric-tree
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 지표 트리
title: 인풋 지표 트리: 노스스타 지표를 팀별 담당 지표로 쪼개기
related: 지표 트리 검증 · ICE 스코어
---

## 도입
가장 단단한 트리는 정의상 곱셈이나 덧셈으로 정확히 분해되는 산식 기반 트리다. 예를 들어 주간 결제액이라는 노스스타 지표는 방문자수와 구매전환율과 평균결제액의 곱으로 정확히 나뉜다. $\text{Revenue} = \text{Visitors} \times \text{CVR} \times \text{AOV}$처럼 표현할 수 있으며 이 경우 방문자수는 마케팅팀, 구매전환율(CVR)은 프로덕트팀, 평균결제액(AOV)은 상품 및 가격 담당팀이 나눠 책임지는 식으로 조직 구조와 지표 트리를 맞출 수 있다.

모든 지표가 이렇게 산식으로 깔끔하게 나뉘지는 않는다. 세션당 페이지뷰나 스크롤 깊이처럼 노스스타 지표와 정의상 연결되어 있지는 않지만 과거 데이터에서 상관관계가 강해서 인풋으로 채택하는 경우도 흔하다. 산식 기반 인풋은 수학적으로 항상 참이라 트리 구조 자체가 틀릴 위험은 없지만 상관 기반 인풋은 그 상관관계가 인과관계인지 우연인지 구분이 안 된 채로 트리에 들어간다는 위험을 안고 있다.

트리를 한 단계 더 내려가면 각 인풋 지표를 다시 그 아래 인풋으로 쪼갤 수 있다. 구매전환율은 장바구니 추가율과 결제 완료율의 곱으로 다시 나뉘는 식이다. 이렇게 층을 늘릴수록 담당 범위는 좁아지고 원인 추적은 더 정밀해지지만 층이 너무 많아지면 각 팀이 노스스타 지표와의 연결을 체감하기 어려워지는 부작용도 있다.

## 명제


## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<rect x="180" y="20" width="200" height="44" class="dg-accent"/>
<text x="280" y="47" font-size="13" text-anchor="middle">노스스타: 주간 결제액</text>
<line x1="280" y1="64" x2="110" y2="100" class="dg-line" stroke-width="1.5"/>
<line x1="280" y1="64" x2="280" y2="100" class="dg-line" stroke-width="1.5"/>
<line x1="280" y1="64" x2="450" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="40" y="100" width="140" height="40" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="110" y="124" font-size="12" text-anchor="middle">방문자수</text>
<rect x="210" y="100" width="140" height="40" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="280" y="124" font-size="12" text-anchor="middle">구매전환율</text>
<rect x="380" y="100" width="140" height="40" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="450" y="124" font-size="12" text-anchor="middle">평균결제액</text>
<line x1="280" y1="140" x2="205" y2="180" class="dg-line" stroke-width="1.5"/>
<line x1="280" y1="140" x2="355" y2="180" class="dg-line" stroke-width="1.5"/>
<rect x="140" y="180" width="130" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="205" y="204" font-size="11" text-anchor="middle">장바구니 추가율</text>
<rect x="290" y="180" width="130" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="355" y="204" font-size="11" text-anchor="middle">결제 완료율</text>
</svg>

_노스스타 지표를 곱셈으로 분해하면 각 인풋 지표를 담당할 팀이 명확해진다._

## 문제
방문자수 50,000명, 구매전환율 4%, 평균결제액 30,000원일 때 기준 주간 결제액은 $\text{Revenue}_0 = 50{,}000 \times 0.04 \times 30{,}000 = $==빈칸== 원이다.

## 해설
세 인풋값을 그대로 곱하면 나오는 값이에요.

**정답: $60{,}000{,}000$**

## 예시
방문자수 50,000명, 구매전환율 4%, 평균결제액 30,000원이라면 주간 결제액은 $50{,}000 \times 0.04 \times 30{,}000 = 60{,}000{,}000$원이다.

프로덕트팀이 담당하는 구매전환율만 4%에서 5%로 끌어올리고 나머지 두 인풋이 그대로라면 결제액은 $50{,}000 \times 0.05 \times 30{,}000 = 75{,}000{,}000$원이 되어 25% 늘어난다. 어느 인풋이 얼마나 움직였는지가 노스스타 지표 변화로 바로 환산되는 것이 산식 기반 트리의 장점이다.
