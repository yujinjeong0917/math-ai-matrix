---
slug: axis-reinforcement-learning
theme: AXIS
domainLabel: 매트릭스 읽는 법
subLabel: 매트릭스 열 · AI 4갈래
title: Reinforcement Learning — 가치기반·정책기반·Actor-Critic·모델기반
related: Q-러닝: 시간차 업데이트 · 정책경사 정리(REINFORCE)의 유도 · Actor-Critic 베이스라인의 무편향성 · MCTS의 UCT 선택 공식 유도
---

## 도입
앞의 세 열은 전부 정적인 데이터셋을 놓고 배워요. 데이터가 이미 다 모여 있고, 모델은 그 안에서 패턴을 찾거나 분포를 흉내 내면 돼요. RL은 다르게 돌아가요. 지금 행동을 고르면 그 결과로 다음 상황(상태)이 바뀌고, 그 바뀐 상황에서 또 행동을 고르는 순환 구조 안에서 배워요.

이 구조를 수식으로 정리한 게 마르코프 결정과정(MDP)이고, "지금 이 선택이 당장은 손해여도 나중에 더 큰 보상을 준다"는 걸 다루려면 동적계획법과 확률, 그리고 정책을 직접 최적화하는 경사법이 다 같이 필요해요. 이 안에서도 무엇을 직접 최적화 대상으로 삼느냐에 따라 갈래가 나뉘어요.

가치기반(Q러닝류)은 각 상태·행동의 가치(미래 보상의 기댓값)를 추정하고 그중 가장 가치가 높은 행동을 고르는 식으로 간접적으로 정책을 얻어요. 정책기반(정책경사)은 가치를 거치지 않고 정책 자체를 파라미터로 직접 표현해서 기대 보상이 커지는 방향으로 그 파라미터를 경사상승법으로 밀어요.

Actor-Critic은 둘을 합쳐서, 정책(actor)을 경사법으로 개선하되 그 경사의 분산을 줄이기 위해 가치 추정(critic)을 기준선으로 같이 학습해요. 모델기반은 아예 환경의 전이 확률과 보상 구조 자체를 모델링해서, 실제로 행동하기 전에 미리 시뮬레이션하며 계획을 세워요.

최근 LLM을 사람 선호에 맞추는 RLHF도 결국 이 열의 도구(보상모델과 정책경사)를 언어모델의 다음 토큰 생성에 그대로 얹은 거예요.

## 명제


## 그림
<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg">
<rect x="60" y="90" width="130" height="70" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="125" y="130" font-size="13" text-anchor="middle">Agent</text>
<text x="125" y="148" font-size="11" text-anchor="middle" class="dg-dim">(정책 π)</text>
<rect x="310" y="90" width="130" height="70" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="375" y="130" font-size="13" text-anchor="middle">Environment</text>
<path d="M190,105 Q250,55 310,105" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="310,105 298,97 296,108" class="dg-stroke-accent"/>
<text x="250" y="55" font-size="12" text-anchor="middle">행동 aₜ</text>
<path d="M310,150 Q250,205 190,150" fill="none" class="dg-line" stroke-width="2" stroke-dasharray="6,3"/>
<polygon points="190,150 202,145 200,157" class="dg-line"/>
<text x="250" y="222" font-size="12" text-anchor="middle" class="dg-dim">상태 sₜ₊₁, 보상 rₜ₊₁</text>
</svg>

_에이전트는 행동을 내보내고(실선), 환경은 그 결과로 다음 상태와 보상을 되돌려준다(점선). 이 순환이 강화학습의 기본 루프다._

## 문제
가치기반 방법의 목표는 상태·행동의 가치 $Q(s,a)$를 정확히 추정하는 것이다. 벨만 최적방정식에 따르면 $Q^*(s,a)=\mathbb E[r+\gamma\max_{a'}Q^*(s',a')]$가 성립해야 한다. 환경의 전이확률을 모르는 채로 표본 하나 $(s,a,r,s')$만 갖고 이 등식이 지금 추정값과 얼마나 어긋나는지(TD 오차)를 재려면, 벨만 등식 우변을 표본으로 근사한 값에서 지금의 추정치 $Q(s,a)$를 빼야 한다. 이 TD 오차는 ==빈칸== 로 쓸 수 있다.

## 해설
벨만 방정식 우변을 기댓값 없이 표본 하나로 근사하면 $r+\gamma\max_{a'}Q(s',a')$가 되는데, 여기서 지금 추정치 $Q(s,a)$를 빼면 방정식이 얼마나 어긋나는지를 나타내는 값이 나와요. 이 오차를 0으로 줄여나가는 게 Q러닝의 갱신 규칙이에요.

**정답: $r+\gamma\max_{a'}Q(s',a')-Q(s,a)$**

## 예시
q-learning-td-update는 가치기반의 대표 예로, 벨만 최적방정식을 표본 하나로 근사해서 상태·행동 가치를 조금씩 갱신하는 시간차(TD) 업데이트를 보여줘요. 환경의 모델(전이확률)을 몰라도 경험만 쌓으면 최적 가치로 수렴한다는 게 핵심이에요.

policy-gradient-theorem은 정책기반의 기본 유도로, 정책을 직접 파라미터화해서 기대 보상의 그래디언트를 구하는 REINFORCE 식을 보여줘요. actor-critic-baseline은 이 그래디언트에 가치 추정을 기준선으로 빼서 분산을 줄이는 방법을 다루는데, 이게 바로 가치기반과 정책기반을 합친 Actor-Critic이에요.

mcts-uct는 모델기반 계열의 대표 예로, 환경의 규칙을 알고 있다는 전제 아래 시뮬레이션을 반복하며 어느 행동이 유망한지 탐색과 활용의 균형을 잡아 계산해요. 그리고 rlhf는 이 RL 도구들을 그대로 가져와서 사람의 선호로 학습한 보상모델을 기준으로 언어모델의 정책(다음 토큰 분포)을 PPO로 개선해요.
