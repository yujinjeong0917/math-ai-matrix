---
slug: blue-green-deployment
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 배포 전략
title: 블루그린 배포: 새 버전을 완전히 준비한 뒤 한번에 전환하기
related: 카나리 배포 · 자동 롤백 트리거 · 롤백 전략
---

## 도입
블루 환경은 지금 실제 트래픽을 받고 있는 기존 버전이고 그린 환경은 그 옆에 새로 띄운 신규 버전이다. 그린 환경은 실제 사용자 트래픽을 받기 전까지는 독립적으로 헬스체크와 스모크 테스트를 거친다. 준비가 끝나면 로드밸런서나 라우팅 설정을 바꿔서 트래픽을 블루에서 그린으로 한번에 옮긴다. 이 전환은 보통 몇 초 안에 끝난다.

전환 뒤 문제가 발견되면 라우팅을 다시 블루로 돌리기만 하면 되므로 롤백도 똑같이 빠르다. 블루 환경을 트래픽 전환 이후 바로 없애지 않고 일정 시간 그대로 남겨두는 것이 이 빠른 롤백을 가능하게 하는 핵심이다. 대신 두 환경을 동시에 띄워둬야 하는 기간에는 인프라 비용이 두 배로 든다는 단점이 있다.

카나리 배포와 비교하면 전환 방식의 철학이 다르다. 카나리는 위험을 트래픽 비율로 나눠서 점진적으로 노출하고 블루그린은 위험을 시간으로 나눠서 그린 환경이 충분히 검증된 뒤 한번에 전체 트래픽을 넘긴다. 그린 환경에서 사전 테스트로 걸러지지 않는 문제 예를 들어 실제 트래픽 패턴에서만 드러나는 부하 문제는 블루그린 방식으로는 늦게 발견될 수 있다는 점이 카나리 대비 약점이다.

## 명제


## 그림
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<circle cx="50" cy="110" r="16" class="dg-dim" stroke="none"/>
<text x="50" y="145" font-size="12" text-anchor="middle">트래픽</text>
<line x1="66" y1="110" x2="180" y2="70" class="dg-stroke-accent" stroke-width="2"/>
<rect x="180" y="45" width="150" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="255" y="75" font-size="12" text-anchor="middle">블루 (기존 버전)</text>
<rect x="180" y="130" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="255" y="150" font-size="12" text-anchor="middle">그린 (신규 버전)</text>
<text x="255" y="168" font-size="11" text-anchor="middle" class="dg-dim">사전 검증 중</text>
<text x="420" y="90" font-size="12">검증 완료시</text>
<text x="420" y="108" font-size="12">라우팅을 한번에 전환</text>
</svg>

_그린 환경이 준비를 마치면 트래픽 전체가 한번에 옮겨간다._

## 문제
괄호 안 $F(\tau) d_{fast} + (1-F(\tau))d_{slow}$에서 $(1-F(\tau))d_{slow}=d_{slow}-F(\tau)d_{slow}$이므로 전체는 $d_{slow}+F(\tau)(d_{fast}-d_{slow})$로 묶인다. 이를 $E[\text{Cost}(\tau)]$ 식에 대입한 뒤 $\pi F(\tau)$ 앞의 부호를 밖으로 빼내 정리하면 $E[\text{Cost}(\tau)] = c\tau + \pi d_{slow} - \pi F(\tau)($==빈칸==$)$ 이다.

## 해설
(1-F(τ))d_slow = d_slow - F(τ)d_slow로 전개해 F(τ)d_fast와 합치면 전체가 d_slow+F(τ)(d_fast-d_slow)로 묶여요. 이 식을 cτ+πd_slow - πF(τ)(●) 꼴에 맞추려면 πF(τ)(d_fast-d_slow) = -πF(τ)(d_slow-d_fast)가 되어야 하므로, 부호를 뒤집은 d_slow-d_fast가 괄호 안에 들어가요.

**정답: $d_{slow}-d_{fast}$**

## 예시

