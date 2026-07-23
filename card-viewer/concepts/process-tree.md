---
slug: process-tree
theme: PM
domainLabel: Process Mining
subLabel: 표현 형식
title: 프로세스 트리: 재귀적 연산자로 블록을 쌓은 모델
related: Inductive Miner · Petri Net · BPMN
---

## 도입
나뭇잎은 활동이거나 아무 흔적도 남기지 않는 침묵 활동 $\tau$입니다. 내부 마디는 네 가지 연산자 가운데 하나입니다. 순차 $\to$는 자식들이 적힌 순서 그대로 진행됩니다. 배타적 선택 $\times$는 자식 가운데 딱 하나만 진행되고 나머지는 건너뜁니다. 병렬 $\wedge$는 자식 전부가 동시에 진행되되 서로 어떤 순서로 끼어들어도 상관없습니다. 반복 $\circlearrowleft$는 첫째 자식이 본체로 최소 한 번은 반드시 실행되고 둘째 자식이 재실행 경로로 선택되면 다시 본체로 돌아가며 본체를 마친 직후에만 전체가 끝날 수 있습니다.

이 네 연산자의 의미는 재귀적으로 정의됩니다. 나무 전체가 허용하는 실행 순서는 각 자식이 허용하는 실행 순서들을 부모 연산자의 규칙대로 조합한 것과 정확히 같습니다. 이렇게 정의되기 때문에 프로세스 트리를 Petri Net으로 옮기는 절차는 각 마디를 정해진 블록 모양으로 기계적으로 바꾸는 작업이 되고 그 결과물은 항상 건전성을 만족합니다. Inductive Miner가 발견의 결과물로 Petri Net을 직접 짜맞추지 않고 프로세스 트리를 먼저 만드는 이유가 여기 있습니다. 나중에 따로 건전성을 검증할 필요 없이 트리 구조 자체가 건전성을 보장해 주기 때문입니다.

다만 모든 동작이 이 네 가지 깔끔한 블록으로만 나뉘는 것은 아닙니다. 로그에 이 블록 구조로는 설명이 안 되는 행동이 남아 있으면 Inductive Miner는 남은 활동들을 통째로 아무렇게나 반복해도 되는 아주 느슨한 반복 마디로 감싸버립니다. 건전성은 지키되 실제보다 더 많은 동작을 허용하게 되는 대가를 치르는 것입니다.

## 명제


## 그림
<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
<circle cx="300" cy="40" r="20" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="300" y="46" font-size="14" text-anchor="middle">→</text>
<line x1="300" y1="60" x2="110" y2="120" class="dg-line" stroke-width="1.5"/>
<line x1="300" y1="60" x2="300" y2="120" class="dg-line" stroke-width="1.5"/>
<line x1="300" y1="60" x2="490" y2="120" class="dg-line" stroke-width="1.5"/>
<rect x="70" y="120" width="80" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="110" y="142" font-size="12" text-anchor="middle">접수</text>
<circle cx="300" cy="140" r="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="300" y="146" font-size="14" text-anchor="middle">×</text>
<rect x="450" y="120" width="80" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="490" y="142" font-size="12" text-anchor="middle">배송</text>
<line x1="300" y1="160" x2="220" y2="210" class="dg-line" stroke-width="1.5"/>
<line x1="300" y1="160" x2="380" y2="210" class="dg-line" stroke-width="1.5"/>
<rect x="170" y="210" width="100" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="220" y="232" font-size="12" text-anchor="middle">카드결제</text>
<rect x="330" y="210" width="100" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="380" y="232" font-size="12" text-anchor="middle">현금결제</text>
</svg>

_접수와 배송 사이에서 카드결제와 현금결제 중 하나만 배타적으로 선택된다._

## 문제
먼저 $X$ 안쪽의 병렬 마디 $\wedge(c,d)$가 허용하는 트레이스부터 구한다. 병렬 연산자는 자식 전부가 반드시 등장하되 서로 어떤 순서로 끼어들어도 상관없다고 정의되므로, 두 활동 $c,d$가 만들어내는 트레이스는 ==빈칸== 이다.

## 해설
병렬은 두 활동이 모두 일어나되 순서가 자유롭다는 뜻이므로, c가 먼저인 경우와 d가 먼저인 경우 두 가지 나열이 모두 허용돼요.

**정답: $\{cd, dc\}$**

## 예시

