---
slug: agent-state-machine
theme: LLM
domainLabel: LLM/Agent
subLabel: 메모리 · 상태관리
title: 에이전트 상태 머신: 진행 단계를 명시적으로 관리하기
related: Plan-and-Execute · 단기 vs 장기 메모리 · Reflexion
---

## 도입
상태 머신은 에이전트가 있을 수 있는 단계를 몇 개의 상태로 정의하고 각 상태에서 어떤 사건이 일어나면 어느 상태로 넘어가는지를 전이 규칙으로 정의한다. 지금 어떤 상태에 있느냐에 따라 어떤 도구를 쓸 수 있는지 어떤 프롬프트 틀을 쓰는지가 정해진다. 전이는 행동의 결과로 일어난다. 테스트를 통과하면 실행 상태에서 완료 상태로 넘어가고 실패하면 다시 실행 상태로 돌아가는 식이다. LangGraph 같은 프레임워크는 이 구조를 상태를 노드로 전이를 엣지로 둔 그래프로 그대로 구현해서 모델의 자유로운 텍스트 생성 바깥에서 오케스트레이터가 직접 흐름을 관리하게 한다.

이 구조가 필요한 이유는 상태 머신 없이 프롬프트만으로 진행 단계를 추적하면 쉽게 깨지기 때문이다. 지금 작업이 어디까지 왔는지가 오직 대화 기록 속에 암묵적으로만 남아 있으면 모델은 매 턴 그 기록을 다시 읽고 스스로 지금 단계를 추측해야 한다. 작업이 길어질수록 이 추측은 어긋나기 쉽고 필요한 단계를 건너뛰거나 이미 끝난 단계를 반복할 수 있다. 상태와 허용된 전이를 코드 바깥의 명시적 구조로 빼두면 다음에 무엇이 허용되는지는 모델의 판단이 아니라 오케스트레이터가 결정하고 강제한다. 그 상태 안에서 실제로 무엇을 생성할지만 모델에게 맡기면 된다.

Plan-and-Execute와 비슷해 보이지만 차이가 있다. 계획은 보통 하나의 순서로 쭉 이어지는 목록이고 상태 머신은 실패 시 되돌아가는 분기나 반복 같은 더 복잡한 흐름까지 표현할 수 있다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="100" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="100" y="130" text-anchor="middle" font-size="13">계획 수립</text>
<rect x="220" y="100" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="280" y="130" text-anchor="middle" font-size="13">실행</text>
<rect x="400" y="100" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="460" y="130" text-anchor="middle" font-size="13">검증</text>
<rect x="560" y="100" width="60" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="590" y="130" text-anchor="middle" font-size="13">완료</text>
<line x1="160" y1="125" x2="220" y2="125" class="dg-line" stroke-width="1.5"/>
<line x1="340" y1="125" x2="400" y2="125" class="dg-line" stroke-width="1.5"/>
<line x1="520" y1="125" x2="560" y2="125" class="dg-stroke-accent" stroke-width="2"/>
<text x="540" y="115" text-anchor="middle" font-size="12">통과</text>
<path d="M460,150 L460,195 L280,195 L280,150" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="370" y="212" text-anchor="middle" font-size="12">실패시 다시 실행</text>
</svg>

_각 상태에서 할 수 있는 일이 정해져 있고 전이 조건에 따라서만 다음 상태로 넘어간다._

## 문제
전이 규칙 다섯 가지를 다시 살펴보면 도착 상태가 $D$인 것만 골라야 한다. $R\to C$, $C\to T$, $T\to F$, $F\to T$는 모두 도착 상태가 $D$가 아니다. 다섯 개 중 도착 상태가 $D$인 전이만 남기면 ==빈칸== 하나뿐이다.

## 해설
다섯 가지 전이 중 도착 상태가 완료$(D)$인 것은 테스트 실행에서 테스트 통과로 완료로 가는 전이 하나뿐이기 때문이에요.

**정답: $T\to D$**

## 예시

