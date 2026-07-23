---
slug: cohort-stabilization-point
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 코호트 매트릭스
title: 코호트 안정화 지점: 리텐션 곡선이 평평해지는 순간
related: 코호트 삼각형 · 행동 기반 세그멘테이션
---

## 도입
리텐션 곡선은 보통 초기 급락 구간과 그 뒤를 잇는 완만한 꼬리 구간으로 나뉜다. 초기 급락은 호기심으로 써본 사람들이 빠르게 빠져나가는 구간이고 꼬리 구간은 실제로 습관이 된 사람들이 천천히 줄어드는 구간이다. 안정화 지점은 연속된 두 시점 사이의 리텐션 하락폭이 정해둔 임계값보다 작은 상태가 몇 개월 이상 이어지는 시점으로 정의한다.

이 지점이 중요한 이유는 코호트별 장기 가치를 비교할 때 12개월, 24개월까지 기다릴 필요 없이 몇 개월 안에 대략적인 장기 리텐션 수준을 추정할 수 있게 해주기 때문이다. LTV 계산이나 신규 코호트의 건강도 조기 점검에 바로 쓸 수 있다.

다만 곡선이 평평해 보이는 게 진짜 안정화인지 일시적인 정체인지는 구분해야 한다. 계절적 요인이나 진행 중인 프로모션 때문에 잠깐 하락이 멈춘 것일 수도 있다. 충분히 긴 관측 구간과 여러 코호트를 함께 비교해야 우연한 정체와 진짜 안정화를 가려낼 수 있다.

## 명제


## 그림
<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="30" x2="60" y2="180" class="dg-line" stroke-width="1.5"/>
<line x1="60" y1="180" x2="480" y2="180" class="dg-line" stroke-width="1.5"/>
<text x="45" y="34" font-size="11" text-anchor="end" class="dg-dim">50%</text>
<text x="45" y="184" font-size="11" text-anchor="end" class="dg-dim">0%</text>
<polyline points="80,45 140,90 200,105 260,114 320,117 380,118.5 440,119.1" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="320" cy="117" r="5" class="dg-accent"/>
<line x1="320" y1="117" x2="320" y2="180" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="320" y="98" font-size="12" text-anchor="middle">안정화 지점</text>
<text x="80" y="198" font-size="11" text-anchor="middle" class="dg-dim">M1</text>
<text x="140" y="198" font-size="11" text-anchor="middle" class="dg-dim">M2</text>
<text x="200" y="198" font-size="11" text-anchor="middle" class="dg-dim">M3</text>
<text x="260" y="198" font-size="11" text-anchor="middle" class="dg-dim">M4</text>
<text x="320" y="198" font-size="11" text-anchor="middle" class="dg-dim">M5</text>
<text x="380" y="198" font-size="11" text-anchor="middle" class="dg-dim">M6</text>
<text x="440" y="198" font-size="11" text-anchor="middle" class="dg-dim">M7</text>
</svg>

_리텐션 곡선의 낙폭이 작아지기 시작하는 지점 이후가 장기 잔존율의 근사치다._

## 문제
먼저 하락폭이 정말 일정한 비율로 줄어드는지 마지막 두 구간으로 확인해 보자. M5→M6 하락폭은 0.5%p, M6→M7 하락폭은 0.2%p다. 두 값의 비를 구하면 공비 $r = 0.2 / 0.5 = $==빈칸== 다.

## 해설
바로 앞 두 하락폭의 비를 그대로 나눈 값이에요. 이 비율이 앞으로도 유지된다고 가정하면 하락폭이 매달 0.4배씩 줄어드는 등비수열을 이룬다는 뜻이에요.

**정답: $0.4$**

## 예시
어떤 코호트의 리텐션이 M1 45%, M2 30%, M3 25%, M4 22%, M5 21%, M6 20.5%, M7 20.3%로 이어졌다. 구간별 하락폭은 M1에서 M2까지 15%p, M2에서 M3까지 5%p, M3에서 M4까지 3%p, M4에서 M5까지 1%p, M5에서 M6까지 0.5%p, M6에서 M7까지 0.2%p로 점점 줄어든다.

하락폭이 0.5%p 이하로 줄어든 M5 이후를 안정화 지점으로 보면 이 코호트의 장기 잔존율은 20% 안팎으로 수렴할 것이라고 미리 근사할 수 있다.
