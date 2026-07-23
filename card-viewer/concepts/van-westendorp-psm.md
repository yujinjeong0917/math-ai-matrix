---
slug: van-westendorp-psm
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 가격 민감도 조사
title: Van Westendorp PSM: 네 가지 질문으로 수용 가격대 찾기
related: Gabor-Granger 방법 · A/B 가격 테스트의 함정
---

## 도입
모든 응답자에게 이 네 질문을 하고 각 질문마다 가격이 오를수록 응답이 누적되는 비율을 그래프로 그린다. 너무 쌈과 저렴함 곡선은 가격이 오를수록 그렇게 답하는 비율이 줄어드는 하향 곡선이 되고 비쌈과 너무 비쌈 곡선은 가격이 오를수록 비율이 늘어나는 상향 곡선이 된다. 두 종류의 곡선이 만나는 지점들이 의미 있는 경계값을 만든다. 너무 쌈 곡선과 비쌈 곡선이 만나는 점을 한계 저가점(PMC)이라 부르고 이 아래로 가격을 내리면 품질 의심이 시작된다고 본다. 저렴함 곡선과 너무 비쌈 곡선이 만나는 점을 한계 고가점(PME)이라 부르고 이 위로 가격을 올리면 구매 저항이 본격적으로 시작된다고 본다. PMC와 PME 사이가 수용 가능 가격대다.

왜 가격을 직접 묻지 않고 네 개로 쪼개는지는 질문의 프레임 문제와 관련이 있다. 단일 질문은 조사자가 가격을 언급하지 않더라도 응답자에게 이미 특정 기준점을 암묵적으로 심어준다. 반대로 네 질문은 각각 다른 극단을 묻기 때문에 조사자가 어떤 가격도 제시하지 않은 상태에서 응답자 스스로 가진 하한과 상한을 드러내게 만든다.

한계도 있다. 이 방법은 실제 구매 행동이 아니라 설문 응답에 기반한 진술 선호다. 경쟁 상품 가격이나 실제 지갑을 여는 순간의 압박감은 반영되지 않는다. 그래서 실무에서는 PSM으로 대략적인 가격대를 먼저 좁힌 뒤 Gabor-Granger처럼 실제 구매 의향을 직접 묻는 방법과 함께 쓰는 경우가 많다.

## 명제


## 그림
<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="18" font-size="12">누적 응답 비율</text>
<line x1="60" y1="30" x2="60" y2="220" class="dg-line" stroke-width="1.5"/>
<line x1="60" y1="220" x2="460" y2="220" class="dg-line" stroke-width="1.5"/>
<text x="470" y="224" font-size="11" class="dg-dim">가격</text>
<rect x="235" y="40" width="65" height="180" class="dg-dim" opacity="0.2"/>
<text x="268" y="55" font-size="11" text-anchor="middle">수용 가격대</text>
<polyline points="60,45 140,80 220,130 300,175 460,215" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<polyline points="60,60 160,90 260,130 360,170 460,200" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="5,3"/>
<polyline points="60,215 160,180 260,140 360,95 460,55" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<polyline points="60,220 180,200 280,160 380,110 460,60" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="5,3"/>
<circle cx="235" cy="150" r="4" class="dg-accent"/>
<text x="215" y="140" font-size="11" text-anchor="middle">PMC</text>
<circle cx="300" cy="148" r="4" class="dg-accent"/>
<text x="320" y="140" font-size="11" text-anchor="middle">PME</text>
<line x1="60" y1="235" x2="80" y2="235" class="dg-stroke-ink" stroke-width="2"/>
<text x="85" y="239" font-size="11">너무 쌈</text>
<line x1="180" y1="235" x2="200" y2="235" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="205" y="239" font-size="11">저렴함</text>
<line x1="280" y1="235" x2="300" y2="235" class="dg-stroke-accent" stroke-width="2"/>
<text x="305" y="239" font-size="11">비쌈</text>
<line x1="380" y1="235" x2="400" y2="235" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="405" y="239" font-size="11">너무 비쌈</text>
</svg>

_너무 쌈, 저렴함 곡선과 비쌈, 너무 비쌈 곡선이 교차하는 구간이 수용 가능한 가격대를 만든다._

## 문제
먼저 하한 경계 후보인 $p=3$(만원)에서 $F_{cheap}(3)$을 계산해 보자. 너무 쌈 정렬값 2,2,3,3,4 중 3 이상인 값은 3,3,4로 3개이므로 $F_{cheap}(3) = 3/5 = $==빈칸== 다.

## 해설
정렬된 다섯 개의 값 중 3 이상인 값이 3개(3,3,4)이므로 5로 나누면 60%가 나와요. 즉 3만원에서는 응답자의 60%가 여전히 이 가격을 의심스러울 만큼 싸다고 느낀다는 뜻이에요.

**정답: $0.6$**

## 예시
응답자 5명에게 네 질문을 던져 얻은 답을 만원 단위로 정리하면 다음과 같다. 응답자별 순서는 너무 쌈, 저렴함, 비쌈, 너무 비쌈이다. 1번은 3, 5, 9, 13. 2번은 2, 6, 10, 15. 3번은 4, 7, 11, 14. 4번은 3, 6, 9, 12. 5번은 2, 5, 10, 16이다.

각 질문의 답을 정렬해 중앙값을 구하면 너무 쌈은 2, 2, 3, 3, 4 중 3만원, 저렴함은 5, 5, 6, 6, 7 중 6만원, 비쌈은 9, 9, 10, 10, 11 중 10만원, 너무 비쌈은 12, 13, 14, 15, 16 중 14만원이다. 대략적인 경계로 보면 수용 가능 가격대는 6만원에서 10만원 사이이고 3만원 아래는 품질 의심이 시작되는 구간, 14만원 위는 구매 포기가 시작되는 구간에 가깝다.
