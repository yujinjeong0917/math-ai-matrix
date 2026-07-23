---
slug: chain-of-thought
theme: LLM
domainLabel: LLM/Agent
subLabel: 프롬프팅 기법
title: Chain-of-Thought: 중간 추론과정을 말로 풀어내게 하기
related: Few-shot Prompting · ReAct
---

## 도입
CoT는 프롬프트에 "단계별로 생각해보자" 같은 트리거 문장을 넣는 제로샷 방식이나, 풀이 과정이 포함된 예시 몇 개를 미리 보여주는 퓨샷 방식으로 적용합니다. 디코더 기반 언어모델은 자기회귀적으로 토큰을 하나씩 생성하고 각 토큰은 그 앞의 모든 토큰을 조건으로 삼습니다. 그래서 중간 추론을 먼저 출력하면 모델은 최종 답을 내기 전에 스스로 쓴 단서를 추가 입력처럼 다시 읽어들이는 셈이 됩니다.

직접 답변 프롬프팅의 한계는 모델이 질문을 받자마자 정답 토큰을 바로 예측해야 한다는 점입니다. 한 번의 순전파 안에서 처리할 수 있는 계산량은 사실상 고정되어 있어서 여러 단계를 거쳐야 풀리는 문제는 이 한 번의 시도로 감당하기 어렵습니다. CoT는 답을 내기 전에 여러 토큰만큼의 생성 과정을 추가로 확보해주는 셈이라 실질적인 연산 여유를 늘려주는 효과를 냅니다.

CoT의 효과는 모델 규모와 관계가 깊습니다. 충분히 큰 모델에서는 CoT가 정답률을 크게 끌어올리지만 작은 모델에서는 오히려 효과가 약하거나 없다는 관찰이 널리 보고되었습니다. 이후 등장한 self-consistency는 같은 질문에 대해 여러 CoT 경로를 샘플링한 뒤 다수결로 최종 답을 고르는 방식으로 CoT의 변동성을 보완합니다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="16" font-size="12" class="dg-dim">직접 답변</text>
<rect x="20" y="24" width="90" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="65" y="46" font-size="12" text-anchor="middle">질문</text>
<line x1="110" y1="41" x2="500" y2="41" class="dg-line" stroke-width="1.5"/>
<polygon points="500,41 490,36 490,46" class="dg-dim"/>
<rect x="500" y="24" width="110" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="555" y="46" font-size="12" text-anchor="middle">오답</text>
<text x="20" y="150" font-size="12" class="dg-accent">Chain-of-Thought</text>
<rect x="20" y="160" width="80" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="60" y="182" font-size="12" text-anchor="middle">질문</text>
<line x1="100" y1="177" x2="140" y2="177" class="dg-line" stroke-width="1.5"/>
<polygon points="140,177 132,172 132,182" class="dg-dim"/>
<rect x="140" y="160" width="80" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="180" y="182" font-size="12" text-anchor="middle">단계1</text>
<line x1="220" y1="177" x2="260" y2="177" class="dg-line" stroke-width="1.5"/>
<polygon points="260,177 252,172 252,182" class="dg-dim"/>
<rect x="260" y="160" width="80" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="300" y="182" font-size="12" text-anchor="middle">단계2</text>
<line x1="340" y1="177" x2="380" y2="177" class="dg-line" stroke-width="1.5"/>
<polygon points="380,177 372,172 372,182" class="dg-dim"/>
<rect x="380" y="160" width="80" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="420" y="182" font-size="12" text-anchor="middle">단계3</text>
<line x1="460" y1="177" x2="500" y2="177" class="dg-line" stroke-width="1.5"/>
<polygon points="500,177 492,172 492,182" class="dg-accent"/>
<rect x="500" y="160" width="110" height="34" rx="6" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="555" y="182" font-size="12" text-anchor="middle">정답</text>
</svg>

_직접 답변은 한 번에 답을 내지만 CoT는 중간 단계를 거쳐 답에 도달합니다._

## 문제
직접 답변 방식에서는 $f_1$의 출력이 나와야 비로소 $f_2$를 적용할 수 있으므로, 두 연산은 한 번의 순전파 안에서 깊이를 나눠 쓰는 게 아니라 이어붙여 써야 한다. 따라서 이 합성을 한 번에 계산하는 데 필요한 총 깊이는 ==빈칸== 이다.

## 해설
$f_2$는 $f_1$의 출력이 완성되어야 계산을 시작할 수 있어서 두 연산의 깊이를 동시에(병렬로) 쓸 수 없고 순서대로 이어붙여야 해요. 그래서 필요한 깊이는 $d+d=2d$가 됩니다.

**정답: $2d$**

## 예시
"철수는 사과를 5개 가지고 있었는데 3개를 더 사고 그중 2개를 먹었습니다. 남은 사과는 몇 개일까요?" 라는 질문에서 직접 답변 프롬프팅은 곧바로 틀린 값을 낼 위험이 있습니다.

CoT는 다음처럼 풀어씁니다. 처음 5개, 3개를 사면 $5+3=8$개, 2개를 먹으면 $8-2=6$개. 각 단계가 다음 단계의 입력이 되므로 최종 답 6에 안정적으로 도달합니다.
