---
slug: recommendation-ctr-uplift
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 성과 지표
title: 추천 클릭률 상승분: 추천이 정말 클릭을 더 끌어냈는가
related: 커버리지 · Intra-List Diversity
---

## 도입
클릭률(CTR)은 노출수 대비 클릭수로 정의된다. $\mathrm{CTR} = \dfrac{\text{clicks}}{\text{impressions}}$. 그런데 추천 영역 하나만의 CTR을 재면 두 가지가 뒤섞인다. 사용자가 검색이나 카테고리 탐색으로도 어차피 찾아냈을 상품이 추천 자리에 우연히 노출된 경우와 추천이 아니었다면 발견하지 못했을 상품을 추천이 실제로 끌어낸 경우가 같은 숫자 안에 합쳐진다.

이를 분리하려면 무작위로 나눈 두 집단이 필요하다. 한쪽에는 추천 알고리즘을 그대로 적용하고 다른 쪽에는 추천 영역을 노출하지 않거나 인기순 혹은 무작위 순서로 대체한다. 절대 상승분은 $\text{Uplift} = \mathrm{CTR}_{\text{treat}} - \mathrm{CTR}_{\text{control}}$로 정의되고 대조군 대비 얼마나 늘었는지 비교하고 싶을 때는 상대 상승분 $\dfrac{\mathrm{CTR}_{\text{treat}} - \mathrm{CTR}_{\text{control}}}{\mathrm{CTR}_{\text{control}}}$을 함께 본다.

이 숫자가 통계적으로 의미 있는 차이인지도 확인해야 한다. 표본 크기가 작으면 우연한 변동만으로도 비슷한 크기의 차이가 나올 수 있어서 A/B 테스트의 신뢰구간이나 유의성 검정을 함께 봐야 한다. 또한 클릭만 늘고 구매나 체류시간 같은 가드레일 지표가 오히려 나빠졌다면 자극적인 섬네일처럼 클릭을 유도하기만 하는 낚시성 추천일 위험도 점검해야 한다.

## 명제


## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="200" x2="520" y2="200" class="dg-line" stroke-width="1.5"/>
<rect x="140" y="140" width="80" height="60" class="dg-dim"/>
<rect x="340" y="116" width="80" height="84" class="dg-accent"/>
<text x="180" y="128" font-size="13" text-anchor="middle">대조군</text>
<text x="180" y="228" font-size="12" class="dg-dim" text-anchor="middle">CTR 6.0%</text>
<text x="380" y="104" font-size="13" text-anchor="middle">추천 노출군</text>
<text x="380" y="228" font-size="12" text-anchor="middle">CTR 8.4%</text>
<line x1="240" y1="140" x2="330" y2="116" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="285" y="105" font-size="12" text-anchor="middle">+2.4%p</text>
</svg>

_대조군과 추천 노출군의 클릭률 차이가 추천이 만들어낸 순수 상승분이다._

## 문제
노출군의 클릭수는 정의에서 $C_t = \mathrm{CTR}_{\text{treat}} \times I$로 다시 쓸 수 있다. 만약 노출군에도 추천 대신 대조군과 같은 클릭률이 적용되었다면 기대되는 클릭수는 $\mathrm{CTR}_{\text{control}} \times I$이므로, 추천이 만들어낸 추가 클릭수는 $\Delta\text{Clicks} = C_t - \mathrm{CTR}_{\text{control}} \times I = \mathrm{CTR}_{\text{treat}} \times I - \mathrm{CTR}_{\text{control}} \times I = $==빈칸==$\times I$이다.

## 해설
공통 인수 I를 밖으로 묶어내면 남는 항은 두 CTR의 차이이고, 이는 정의에서의 절대 상승분 Δ와 같기 때문이에요.

**정답: $(\mathrm{CTR}_{\text{treat}} - \mathrm{CTR}_{\text{control}})$**

## 예시
노출군 10만 명에게 추천을 보여주고 대조군 10만 명에게는 인기순 목록을 보여줬다고 하자. 노출군 클릭수는 8,400건으로 $\mathrm{CTR}_{\text{treat}} = 8{,}400/100{,}000 = 8.4\%$다. 대조군 클릭수는 6,000건으로 $\mathrm{CTR}_{\text{control}} = 6{,}000/100{,}000 = 6.0\%$다.

절대 상승분은 $8.4\% - 6.0\% = 2.4\%\text{p}$이고 상대 상승분은 $2.4/6.0 = 40\%$다. 추천 알고리즘이 인기순 대비 클릭을 40퍼센트 더 끌어냈다는 뜻이다.
