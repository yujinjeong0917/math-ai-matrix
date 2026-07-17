---
slug: supervisor-pattern-agent
theme: LLM
domainLabel: LLM/Agent
subLabel: 멀티에이전트 오케스트레이션
title: Supervisor 패턴: 한 에이전트가 나머지를 조율하기
related: 역할 분담형 협업 · 에이전트 메시지 프로토콜 · LangGraph
---

## 도입
단일 에이전트가 검색과 코드 작성과 검증까지 한 번에 처리하도록 설계하면 프롬프트 안에 서로 다른 목적의 지시가 뒤섞인다. 모델은 지금 어떤 역할을 수행해야 하는지 매 턴마다 스스로 구분해야 하고 이 과정에서 지시를 놓치거나 이전 단계의 맥락을 다음 단계로 잘못 끌고 오는 실수가 잦아진다. 작업이 길어질수록 컨텍스트 안에 쌓인 서로 다른 목적의 정보가 뒤섞이면서 성능이 떨어진다.

Supervisor 패턴은 이 책임을 분리한다. Supervisor 에이전트는 사용자 요청을 받아 하위 작업으로 쪼개고 각 하위 작업에 맞는 워커 에이전트를 호출한다. 워커는 자기 몫만 처리하고 결과를 Supervisor에게 돌려준다. Supervisor는 그 결과를 보고 다음에 어떤 워커를 호출할지 다시 판단한다. 이 판단 루프가 이어지다가 목표가 달성됐다고 판단하면 최종 결과를 사용자에게 반환한다.

이 구조의 장점은 워커 에이전트를 독립적으로 교체하거나 늘릴 수 있다는 점이다. 검색 워커를 더 정교한 검색 워커로 바꾸거나 새 워커를 하나 추가해도 Supervisor의 라우팅 로직만 손보면 된다. 다만 Supervisor 자체가 병목이 될 수 있다. 모든 판단이 Supervisor를 거쳐야 하므로 Supervisor가 잘못된 워커를 선택하면 전체 작업이 잘못된 방향으로 흘러간다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<rect x="260" y="20" width="120" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="320" y="50" text-anchor="middle" font-size="13">Supervisor</text>
<rect x="60" y="150" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="120" y="180" text-anchor="middle" font-size="12">워커 A</text>
<rect x="260" y="150" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="320" y="180" text-anchor="middle" font-size="12">워커 B</text>
<rect x="460" y="150" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="520" y="180" text-anchor="middle" font-size="12">워커 C</text>
<line x1="280" y1="70" x2="140" y2="150" class="dg-line" stroke-width="1.5"/>
<line x1="320" y1="70" x2="320" y2="150" class="dg-line" stroke-width="1.5"/>
<line x1="360" y1="70" x2="500" y2="150" class="dg-line" stroke-width="1.5"/>
<text x="320" y="115" text-anchor="middle" font-size="11" class="dg-dim">지시와 결과 취합</text>
</svg>

_Supervisor가 워커 에이전트를 호출하고 결과를 모아 다음 지시를 정한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
하나의 에이전트에게 모든 일을 다 시키면 프롬프트가 점점 길어지고 지시사항이 서로 부딪힌다. 리서치도 하고 코드도 짜고 검토도 하라고 하면 어느 하나에도 집중하지 못한다. Supervisor 패턴은 관리자 역할을 하는 에이전트 하나를 따로 두고 나머지 에이전트는 각자 좁은 역할만 맡게 한다. 관리자는 무엇을 누구에게 시킬지 정하고 하위 에이전트가 낸 결과를 모아서 다음 지시를 내린다.

이 구조는 회사의 팀장과 팀원 관계와 비슷하다. 팀장은 직접 코드를 짜지 않아도 되고 어떤 작업을 누구에게 맡길지 판단만 잘하면 된다. 하위 에이전트는 자기가 맡은 좁은 영역만 잘하면 되니 프롬프트도 단순해지고 결과도 예측하기 쉬워진다.


## 예시

