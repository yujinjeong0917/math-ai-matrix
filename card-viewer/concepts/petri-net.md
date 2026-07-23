---
slug: petri-net
theme: PM
domainLabel: Process Mining
subLabel: 표현 형식
title: Petri Net: 플레이스와 트랜지션으로 동시성을 표현하기
related: Token Replay · 프로세스 트리 · Alpha Algorithm
---

## 도입
Petri Net은 튜플 $N=(P,T,F)$로 정의됩니다. $P$는 플레이스의 집합 $T$는 트랜지션의 집합이고 $P$와 $T$는 겹치지 않습니다. $F$는 플레이스에서 트랜지션으로 또는 트랜지션에서 플레이스로만 이어지는 화살표의 집합입니다. 마킹 $M$은 각 플레이스에 토큰을 몇 개씩 놓을지 정하는 함수로 지금 이 순간의 상태를 나타냅니다.

트랜지션 $t$로 들어오는 화살표가 시작되는 플레이스들의 모임을 전제집합 $\bullet t$라 부릅니다. $\bullet t$ 안 모든 플레이스에 토큰이 하나 이상 있어야 $t$가 발화할 수 있습니다. 발화하면 전제집합의 각 플레이스에서 토큰을 하나씩 소비하고 후제집합 $t\bullet$의 각 플레이스에 토큰을 하나씩 생산합니다.

이 발화 규칙 하나만으로 병렬과 선택이 모두 자연스럽게 나옵니다. 두 트랜지션이 서로 다른 플레이스에서 토큰을 가져오면 둘 다 동시에 발화할 수 있어 병렬이 되고 두 트랜지션이 같은 플레이스의 토큰을 두고 경쟁하면 하나가 먼저 가져가는 순간 다른 하나는 발화할 수 없게 되어 선택이 됩니다. 이렇게 상태와 발화 규칙만으로 모든 게 정해지기 때문에 어떤 모델이 항상 끝까지 실행되고 끝나면 정확히 완료 상태에만 도달하는지 즉 건전성을 수학적으로 판정할 수 있습니다. 시작 플레이스 하나와 종료 플레이스 하나만 두고 나머지 모든 노드가 그 사이 경로 위에 있는 제한된 형태를 워크플로우넷이라 부르고 발견 알고리즘들이 만들어내는 결과 대부분이 이 형태를 따릅니다.

## 명제


## 그림
<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg">
<circle cx="50" cy="130" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="50" cy="130" r="5" class="dg-accent"/>
<rect x="90" y="114" width="54" height="32" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="117" y="135" font-size="12" text-anchor="middle">접수</text>
<line x1="64" y1="130" x2="90" y2="130" class="dg-line" stroke-width="1.5"/>
<circle cx="190" cy="130" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="144" y1="130" x2="176" y2="130" class="dg-line" stroke-width="1.5"/>
<rect x="230" y="114" width="60" height="32" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="260" y="135" font-size="12" text-anchor="middle">승인</text>
<line x1="204" y1="130" x2="230" y2="130" class="dg-line" stroke-width="1.5"/>
<circle cx="340" cy="60" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="340" cy="200" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="286" y1="120" x2="330" y2="70" class="dg-line" stroke-width="1.5"/>
<line x1="286" y1="140" x2="330" y2="192" class="dg-line" stroke-width="1.5"/>
<rect x="390" y="44" width="60" height="32" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="420" y="65" font-size="12" text-anchor="middle">결제</text>
<rect x="390" y="184" width="70" height="32" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="425" y="205" font-size="12" text-anchor="middle">배송준비</text>
<line x1="354" y1="60" x2="390" y2="60" class="dg-line" stroke-width="1.5"/>
<line x1="354" y1="200" x2="390" y2="200" class="dg-line" stroke-width="1.5"/>
<circle cx="500" cy="60" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="500" cy="200" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="450" y1="60" x2="486" y2="60" class="dg-line" stroke-width="1.5"/>
<line x1="460" y1="200" x2="486" y2="200" class="dg-line" stroke-width="1.5"/>
<rect x="560" y="114" width="54" height="32" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="587" y="135" font-size="12" text-anchor="middle">완료</text>
<line x1="500" y1="74" x2="575" y2="114" class="dg-line" stroke-width="1.5"/>
<line x1="500" y1="186" x2="575" y2="146" class="dg-line" stroke-width="1.5"/>
<circle cx="630" cy="130" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="614" y1="130" x2="616" y2="130" class="dg-line" stroke-width="1.5"/>
<text x="50" y="165" font-size="11" text-anchor="middle" class="dg-dim">시작</text>
<text x="630" y="165" font-size="11" text-anchor="middle" class="dg-dim">종료</text>
</svg>

_승인 이후 결제와 배송준비가 동시에 진행되고 둘 다 끝나야 완료 트랜지션이 발화한다._

## 문제
초기 마킹에서 승인대기에만 토큰이 1개 있고 나머지 플레이스는 모두 0개라 하자. 승인이 발화하면 전제집합 $\bullet$승인 $=\{$승인대기$\}$에서 토큰을 하나 소비하고 후제집합 승인$\bullet=\{$결제대기, 배송준비대기$\}$에 하나씩 놓으므로, 발화 직후 결제완료의 토큰 수는 ==빈칸== 이고 배송준비완료의 토큰 수는 [[blank:나]] 이다.

## 해설
결제완료는 승인의 후제집합에 들어있지 않아요. 발화 규칙은 전제집합에서 소비하고 후제집합에만 생산하므로, 후제집합에 없는 플레이스는 아무 영향을 받지 않고 초기값 0 그대로 남아요.

**정답: $0$**

## 예시
승인 트랜지션이 발화하면 결제 대기 플레이스와 배송준비 대기 플레이스 두 곳에 토큰이 하나씩 동시에 생깁니다. 결제와 배송준비는 서로 다른 플레이스에서 토큰을 가져오므로 어느 순서로 끝나도 상관없이 각자 진행됩니다. 완료 트랜지션은 결제 완료 플레이스와 배송준비 완료 플레이스 둘 다에 토큰이 있어야만 발화할 수 있으므로 둘 중 하나라도 끝나지 않았다면 절대 먼저 완료 처리가 되지 않습니다.
