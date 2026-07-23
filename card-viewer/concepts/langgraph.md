---
slug: langgraph
theme: LLM
domainLabel: LLM/Agent
subLabel: 대표 프레임워크 · 라이브러리
title: LangGraph: 상태 그래프로 에이전트 흐름을 명시적으로 제어하기
related: LangChain · Supervisor 패턴 · 에이전트 메시지 프로토콜
---

## 도입
LangGraph에서 노드는 상태를 입력받아 상태를 갱신해 돌려주는 함수다. 상태는 대화 이력과 중간 계산 결과와 다음에 호출할 도구 같은 정보를 담은 객체이고 그래프를 따라 흐르며 각 노드를 거칠 때마다 갱신된다. 엣지는 한 노드에서 다음 노드로 가는 경로를 정의하는데 조건부 엣지를 쓰면 상태 값을 보고 다음에 어느 노드로 갈지 런타임에 분기시킬 수 있다.

이 구조 덕분에 도구를 호출하고 결과를 확인한 뒤 다시 추론 노드로 돌아가는 루프나 특정 조건이 만족될 때까지 반복하는 루프나 여러 노드로 갈라졌다가 다시 합류하는 흐름을 모두 그래프 위에서 표현할 수 있다. LangChain의 체인이 대체로 한 방향 파이프라인에 가깝다면 LangGraph는 순환과 분기를 1급 시민으로 다룬다는 점에서 다르다.

LangGraph는 상태를 체크포인트로 저장하는 기능도 제공해서 실행 중간에 사람이 개입해 승인하거나 값을 수정한 뒤 이어서 실행하는 human-in-the-loop 패턴이나 실패한 지점부터 다시 실행하는 재시도 패턴을 구현하기 쉽게 해준다. Supervisor 패턴이나 역할 분담형 협업 같은 멀티에이전트 구조도 각 에이전트를 노드로 라우팅 로직을 조건부 엣지로 표현하면 그대로 그래프 위에 옮길 수 있다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<circle cx="60" cy="130" r="26" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="60" y="134" text-anchor="middle" font-size="12">시작</text>
<rect x="150" y="104" width="120" height="52" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="210" y="134" text-anchor="middle" font-size="13">추론 노드</text>
<rect x="360" y="104" width="120" height="52" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="420" y="134" text-anchor="middle" font-size="13">도구 호출 노드</text>
<circle cx="580" cy="130" r="26" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="580" y="134" text-anchor="middle" font-size="12">종료</text>
<line x1="86" y1="130" x2="150" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="270" y1="130" x2="360" y2="130" class="dg-line" stroke-width="1.5"/>
<path d="M420 104 C 420 40 210 40 210 104" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="315" y="35" text-anchor="middle" font-size="11" class="dg-dim">도구 결과를 들고 재추론</text>
<line x1="480" y1="130" x2="554" y2="130" class="dg-line" stroke-width="1.5"/>
<text x="517" y="150" text-anchor="middle" font-size="11" class="dg-dim">조건부</text>
</svg>

_조건부 엣지가 루프와 종료 경로를 함께 표현한다._

## 문제
위상정렬 순서 $v_1,\ldots,v_n$을 따라 모든 간선이 앞선 정점에서 뒤선 정점으로만 향하므로, 하나의 실행 경로는 같은 정점을 두 번 지날 수 없다(그렇지 않으면 위상정렬 자체와 모순된다). 서로 다른 정점을 최대 $n$개까지 한 번씩만 지날 수 있으므로, DAG 위 하나의 경로에 포함될 수 있는 간선의 최대 개수는 ==빈칸== 이다.

## 해설
정점을 n개까지 한 번씩만 거칠 수 있고 경로의 간선 수는 지나간 정점 수보다 하나 적으므로 최대 간선 수는 n-1이 돼요.

**정답: $n-1$**

## 예시

