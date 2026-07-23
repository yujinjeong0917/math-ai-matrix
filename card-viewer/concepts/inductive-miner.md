---
slug: inductive-miner
theme: PM
domainLabel: Process Mining
subLabel: 발견 알고리즘
title: Inductive Miner: 재귀적 분할로 항상 유효한 모델 보장하기
related: Alpha Algorithm · Heuristic Miner · 프로세스 트리
---

## 도입
먼저 로그에서 활동 사이의 직접후행 빈도를 담은 그래프를 만듭니다. Inductive Miner는 이 그래프를 네 가지 컷 가운데 하나로 자를 수 있는지 확인합니다. 한쪽 그룹에서 다른 쪽 그룹으로만 화살표가 가면 순차 컷이고 두 그룹 사이에 화살표가 전혀 없으면 배타적 선택 컷이고 두 그룹 사이에 양방향 화살표가 모두 있으면 병렬 컷이고 한쪽은 항상 실행되는 본체이고 다른 쪽은 본체 끝에서 시작해 본체 앞으로 되돌아가는 구조면 반복 컷입니다.

맞는 컷을 찾으면 로그를 그 그룹에 맞춰 두 개의 부분 로그로 쪼개고 각 부분 로그에 대해 똑같은 과정을 재귀적으로 반복합니다. 활동이 하나만 남으면 그 활동 자체가 나뭇잎이 되어 재귀가 끝납니다. 이렇게 쪼개고 다시 합치는 과정의 결과물이 프로세스 트리이고 나뭇잎은 활동 내부 노드는 방금 나온 네 가지 연산자 가운데 하나입니다.

이 방식이 필요했던 이유는 어떤 로그를 넣어도 컷이 하나는 반드시 찾아진다는 데 있습니다. 정말 아무 규칙도 안 보이면 모든 활동을 자유롭게 반복하는 아주 느슨한 반복 구조로라도 자르면 되기 때문입니다. 그래서 Inductive Miner는 항상 끝까지 실행되고 끝나면 정확히 완료 상태에 도달하는 모델을 예외 없이 보장합니다. 대신 이렇게 항상 성립하는 안전한 컷을 찾다 보면 실제보다 더 많은 동작을 허용하는 느슨한 모델이 나올 수 있는데 이 정밀도 손실을 줄이려고 드문 엣지를 먼저 걸러내고 컷을 찾는 개선판도 널리 쓰입니다.

## 명제


## 그림
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
<text x="70" y="24" font-size="13" text-anchor="middle">그룹 1</text>
<circle cx="70" cy="70" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="70" y="75" font-size="13" text-anchor="middle">a</text>
<circle cx="70" cy="150" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="70" y="155" font-size="13" text-anchor="middle">b</text>
<line x1="70" y1="86" x2="70" y2="134" class="dg-line" stroke-width="1.5"/>
<line x1="220" y1="14" x2="220" y2="206" class="dg-line" stroke-width="1.5" stroke-dasharray="5,4"/>
<text x="400" y="24" font-size="13" text-anchor="middle">그룹 2</text>
<circle cx="360" cy="50" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="360" y="55" font-size="13" text-anchor="middle">c</text>
<circle cx="420" cy="110" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="420" y="115" font-size="13" text-anchor="middle">d</text>
<circle cx="360" cy="170" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="360" y="175" font-size="13" text-anchor="middle">e</text>
<line x1="374" y1="60" x2="406" y2="100" class="dg-line" stroke-width="1.5"/>
<line x1="406" y1="120" x2="374" y2="160" class="dg-line" stroke-width="1.5"/>
<line x1="85" y1="145" x2="345" y2="58" class="dg-stroke-accent" stroke-width="2"/>
<text x="580" y="220" font-size="12" text-anchor="end" class="dg-dim">순차 컷: 그룹1 → 그룹2 방향으로만 화살표</text>
</svg>

_왼쪽 그룹에서 오른쪽 그룹으로만 화살표가 가면 순차 컷으로 잘라 두 부분 로그로 나눈다._

## 문제
$n=1$인 경우 즉 활동이 단 하나뿐인 로그를 생각하자. 이때 프로세스 트리는 그 활동 하나만 담은 나뭇잎이 되고, 대응하는 페트리넷은 시작 플레이스에서 트랜지션 하나를 거쳐 종료 플레이스로 이어지는 구조다. 시작 마킹의 토큰 개수는 $1$이고 트랜지션이 한 번 발화하면서 소비하는 토큰은 $1$개, 새로 만드는 토큰도 $1$개다. 발화가 끝난 뒤 종료 마킹에 남는 토큰의 개수는 시작 토큰 개수에서 소비량을 빼고 생산량을 더한 $1-1+1=$==빈칸==개이다.

## 해설
시작 토큰 1개에서 소비 1개를 빼고 생산 1개를 더하면 1-1+1=1이 되기 때문이에요.

**정답: $1$**

## 예시

