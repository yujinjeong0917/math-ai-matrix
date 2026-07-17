---
slug: react-llm
theme: LLM
domainLabel: LLM/Agent
subLabel: 프롬프팅 기법
title: ReAct: 추론과 행동을 교대로 반복하기
related: Chain-of-Thought · Self-RAG
---

## 도입
ReAct라는 이름은 Reasoning과 Acting을 합친 말입니다. 한 스텝은 세 부분으로 구성됩니다. Thought에서 모델은 지금까지 알고 있는 것과 다음에 무엇을 해야 할지 문장으로 정리합니다. Action에서 모델은 실제로 호출할 도구와 그 인자를 정합니다. Observation에서는 그 도구를 실행한 실제 결과가 프롬프트에 다시 삽입됩니다. 이 세 부분이 목표를 달성하거나 최대 스텝 수에 도달할 때까지 반복됩니다.

ReAct가 풀어낸 한계는 순수 CoT의 근본적인 약점입니다. CoT는 모델이 이미 학습 때 본 지식만으로 추론을 이어가기 때문에 학습 시점 이후의 정보나 모델이 애초에 몰랐던 사실이 필요한 문제에서는 그럴듯하지만 틀린 추론을 만들어내기 쉽습니다. ReAct는 매 스텝마다 실제 도구 호출 결과를 관찰로 끼워 넣기 때문에 추론이 외부 사실에 계속 닻을 내리게 됩니다. 중간에 잘못된 가정을 세워도 다음 Observation에서 틀렸다는 게 드러나면 Thought에서 경로를 수정할 수 있습니다.

이 구조는 프롬프팅 기법으로도 에이전트 설계 패턴으로도 같이 쓰입니다. 단발성 질의응답에 쓸 때는 검색 도구 하나를 붙인 프롬프트 템플릿 정도로 충분하지만, 여러 도구와 여러 턴에 걸친 작업을 시키는 에이전트를 만들 때는 이 Thought, Action, Observation 루프가 에이전트의 기본 실행 루프 자체가 됩니다. 이후 등장한 Reflexion, Plan-and-Execute 같은 에이전트 패턴들도 이 루프 위에 자기반성이나 사전 계획 단계를 얹은 확장으로 볼 수 있습니다.

## 명제


## 그림
<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg">
<circle cx="280" cy="60" r="42" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="280" y="65" font-size="13" text-anchor="middle">Thought</text>
<circle cx="450" cy="210" r="42" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="450" y="215" font-size="13" text-anchor="middle">Action</text>
<circle cx="110" cy="210" r="42" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="110" y="215" font-size="12" text-anchor="middle">Observation</text>
<path d="M310,95 L420,180" class="dg-line" fill="none" stroke-width="1.5"/>
<polygon points="420,180 407,178 413,167" class="dg-dim"/>
<path d="M408,225 L152,225" class="dg-line" fill="none" stroke-width="1.5"/>
<polygon points="152,225 164,219 164,231" class="dg-dim"/>
<path d="M140,180 L250,95" class="dg-line" fill="none" stroke-width="1.5"/>
<polygon points="250,95 237,97 243,108" class="dg-dim"/>
<line x1="322" y1="45" x2="480" y2="45" class="dg-line" stroke-width="1.5"/>
<polygon points="480,45 470,40 470,50" class="dg-accent"/>
<rect x="480" y="26" width="70" height="38" rx="6" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="515" y="49" font-size="12" text-anchor="middle">답변</text>
</svg>

_Thought, Action, Observation을 반복하다가 충분한 근거가 모이면 답을 냅니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
사람이 낯선 문제를 풀 때는 머릿속으로만 생각하지 않고 중간중간 확인 행동을 합니다. 검색해보고, 결과를 보고, 다시 생각하고, 또 검색합니다. ReAct는 언어모델에게 이 패턴을 그대로 시킵니다. 모델이 "생각한다" 와 "행동한다" 를 한 번씩 번갈아 반복하면서 행동의 결과를 다시 다음 생각의 재료로 씁니다.

여기서 행동은 검색엔진 호출, 계산기 실행, API 조회처럼 모델 바깥의 실제 도구를 쓰는 것을 뜻합니다. 그래서 ReAct는 순수하게 텍스트만으로 추론하는 방식과 달리 실제 세계에서 얻은 정보로 자신의 추론을 계속 검증하고 고쳐나갈 수 있습니다.


## 예시
"현재 애플 CEO의 출생년도는?" 라는 질문에 ReAct는 다음처럼 진행합니다. Thought: 애플 CEO가 누구인지 먼저 검색해야 한다. Action: 검색("애플 현재 CEO"). Observation: 팀 쿡. Thought: 팀 쿡의 출생년도를 검색해야 한다. Action: 검색("팀 쿡 출생년도"). Observation: 1960년. Thought: 답을 알았다. 최종 답: 1960년.
