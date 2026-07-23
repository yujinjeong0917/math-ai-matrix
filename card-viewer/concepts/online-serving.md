---
slug: online-serving
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 모델 서빙
title: 온라인서빙: 요청 하나하나에 즉시 응답하기
related: 배치추론 · 오토스케일링
---

## 도입
온라인서빙은 모델을 항상 메모리에 올려둔 서버가 요청을 받을 때마다 즉시 순전파를 수행해 응답합니다. 배치를 최대로 키우는 배치추론과 달리 요청이 도착한 순간부터 정해진 지연시간 예산 안에 답을 내야 하므로 배치를 무한정 키울 수 없습니다. 그래서 아주 짧은 시간(수 밀리초에서 수십 밀리초) 동안만 들어온 요청을 모아 작은 배치로 묶어 처리하는 동적 배칭을 절충안으로 씁니다.

온라인서빙에서는 평균 지연시간보다 꼬리 지연시간이 더 중요하게 다뤄집니다. 대부분의 요청이 빨라도 100번 중 1번(p99 기준)이 몇 초씩 걸리면 사용자는 그 느린 경험을 서비스 전체의 인상으로 기억합니다. 그래서 온라인서빙 시스템은 평균값뿐 아니라 p95, p99 지연시간을 별도로 추적하고 목표치를 정해둡니다.

요청량은 시간대에 따라 크게 출렁이기 때문에 온라인서빙 서버는 대개 여러 대로 복제해두고 앞단에 로드밸런서를 두어 요청을 나눠 받습니다. 트래픽이 몰릴 때는 서버를 늘리고 한산할 때는 줄이는 오토스케일링과 결합해 지연시간 목표를 지키면서 비용도 관리합니다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="60" cy="90" r="16" class="dg-dim"/>
<text x="60" y="130" text-anchor="middle" font-size="12">요청 1건</text>
<line x1="80" y1="90" x2="180" y2="90" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="180,90 168,84 168,96" class="dg-accent"/>
<rect x="190" y="60" width="120" height="60" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="250" y="95" text-anchor="middle" font-size="13">모델 서버</text>
<line x1="310" y1="90" x2="410" y2="90" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="410,90 398,84 398,96" class="dg-accent"/>
<circle cx="450" cy="90" r="16" class="dg-accent"/>
<text x="450" y="130" text-anchor="middle" font-size="12">즉시 응답</text>
<text x="250" y="160" text-anchor="middle" font-size="12" class="dg-dim">지연시간 예산 안에서 처리</text>
</svg>

_요청이 도착하면 짧은 시간 안에 모델을 통과해 바로 응답을 돌려줍니다._

## 문제
가장 불리한 경우는 요청이 윈도우가 막 열린 직후에 도착해 $\tau \to 0$이 되는 경우다. 이때 대기시간 $w-\tau$는 $w$에 가까워지므로 총 지연시간은 $T(0)=$==빈칸== 이다.

## 해설
τ=0을 T(τ)=(w-τ)+p에 대입하면 대기시간이 고스란히 w로 남고 여기에 처리시간 p가 더해져 w+p가 돼요. 이 값이 동적 배칭에서 나올 수 있는 가장 긴 지연시간이에요.

**정답: $w+p$**

## 예시

