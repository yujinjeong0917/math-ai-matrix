---
slug: plan-and-execute
theme: LLM
domainLabel: LLM/Agent
subLabel: 에이전트 설계 패턴
title: Plan-and-Execute: 계획부터 세우고 하나씩 실행하기
related: Tree of Thoughts · 에이전트 상태 머신 · Reflexion
---

## 도입
Plan-and-Execute는 계획자와 실행자로 나뉜다. 계획자는 목표를 받아 순서가 있는 하위 작업 목록을 미리 만든다. 실행자는 그 목록을 하나씩 꺼내 실제로 수행한다. 도구를 부르거나 하위 에이전트를 호출하는 식이다. 각 하위 작업이 끝나면 결과를 계획에 반영하고 다음 하위 작업으로 넘어간다.

이 구조는 한 단계씩 추론과 행동을 반복하는 방식의 약점을 메운다. 매 순간 다음 행동 하나만 결정하는 방식은 직전 몇 걸음의 맥락만 보고 판단하기 때문에 작업이 길어질수록 애초의 목표를 잊거나 이미 한 일을 반복하거나 순서를 뒤섞기 쉽다. Plan-and-Execute는 전체 순서를 별도의 목록으로 밖에 꺼내둔다. 지금 무엇을 해야 하는지를 매번 다시 추론할 필요 없이 목록을 보면 되므로 다음 행동 하나를 고르는 부담이 줄어든다.

다만 처음 세운 계획이 실제 상황과 어긋날 수 있다. 항공권이 매진됐거나 예상과 다른 결과가 나오면 그 시점에서 남은 계획을 다시 세우는 재계획 단계를 넣는 구현이 많다. 계획을 고정된 것으로 보지 않고 실행 결과에 따라 갱신되는 것으로 다루는 편이 실제로는 더 안전하다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="105" width="100" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="70" y="135" text-anchor="middle" font-size="13">목표</text>
<rect x="180" y="105" width="110" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="235" y="135" text-anchor="middle" font-size="13">계획자</text>
<line x1="120" y1="130" x2="180" y2="130" class="dg-line" stroke-width="1.5"/>
<rect x="350" y="20" width="240" height="140" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="362" y="38" font-size="12" class="dg-dim">계획 목록</text>
<text x="362" y="60" font-size="12">1. 항공권 예약</text>
<rect x="356" y="70" width="228" height="24" class="dg-accent" opacity="0.35"/>
<text x="362" y="87" font-size="12">2. 숙소 예약 (진행중)</text>
<text x="362" y="114" font-size="12">3. 렌터카 예약</text>
<text x="362" y="141" font-size="12">4. 일정표 정리</text>
<line x1="290" y1="130" x2="350" y2="90" class="dg-line" stroke-width="1.5"/>
<rect x="350" y="195" width="240" height="45" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="470" y="222" text-anchor="middle" font-size="13">실행자: 현재 단계 수행</text>
<line x1="470" y1="160" x2="470" y2="195" class="dg-line" stroke-width="1.5"/>
<path d="M350,220 L235,220 L235,155" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="245" y="205" font-size="12">결과 반영 · 필요시 재계획</text>
</svg>

_계획자가 순서를 정하고 실행자가 각 단계를 차례로 수행하며 필요하면 다시 계획한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
여행 준비를 항공권 예약 숙소 예약 렌터카 예약 일정표 정리까지 한 번에 시키면 에이전트가 중간에 원래 목표를 놓칠 수 있다. 한 단계씩 반응하며 움직이는 방식은 방금 한 일에만 집중하다가 전체 그림을 잃어버리기 쉽다. Plan-and-Execute는 먼저 전체 순서를 목록으로 적어두고 그 목록을 하나씩 지워가며 실행한다.

여행 가기 전에 할 일 목록을 종이에 써두고 하나씩 체크하며 처리하는 것과 같다. 목록이 있으니 지금 몇 번째 할 일을 하고 있는지 항상 알 수 있다.


## 예시

