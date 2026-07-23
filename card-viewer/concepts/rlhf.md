---
slug: rlhf
theme: LLM
domainLabel: LLM/Agent
subLabel: 정렬(Alignment)
title: RLHF: 인간 선호로 보상모델을 만들고 PPO로 정렬하기
related: Constitutional AI
---

## 도입
RLHF는 세 단계로 이루어진다. 먼저 지도학습으로 사람이 작성한 좋은 응답 예시들로 기본 모델을 한 번 다듬어 SFT(supervised fine-tuning) 모델을 만든다. 다음으로 같은 프롬프트에 대해 이 모델이 만든 여러 응답을 사람 평가자가 순위를 매기게 하고 이 순위 데이터로 보상모델을 학습시킨다. 보상모델은 응답 하나를 받아 사람이 매길 법한 점수를 예측하는 별도의 신경망이다.

마지막 단계에서는 SFT 모델을 정책으로 두고 PPO(Proximal Policy Optimization) 알고리즘으로 강화학습을 진행한다. 정책이 만든 응답을 보상모델에 넣어 점수를 받고 그 점수를 높이는 방향으로 정책을 업데이트한다. 이때 정책이 원래 SFT 모델에서 너무 멀어지면 보상모델을 속이는 이상한 출력으로 흐를 수 있어서 KL 발산 항을 페널티로 더해 원래 모델 분포 근처에 머물도록 제약을 건다.

RLHF가 필요한 이유는 다음 토큰 예측이라는 학습 목표 자체가 사람이 실제로 원하는 답의 특성, 즉 유용함이나 안전함이나 정직함과 직접적으로 일치하지 않기 때문이다. 사람이 응답 쌍을 비교해 우열만 표시해도 그로부터 학습된 보상모델이 사람의 판단 기준을 대신할 채점자 역할을 하고 강화학습이 이 채점자의 점수를 계속 높이는 방향으로 모델을 조금씩 바꿔나간다. 다만 보상모델과 PPO 파이프라인을 함께 굴려야 해서 학습 과정 자체가 무겁고 불안정해지기 쉽다는 단점이 있다.

## 명제


## 그림
<svg viewBox="0 0 660 220" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="30" width="120" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="56" text-anchor="middle" font-size="12">SFT 모델</text>
<line x1="140" y1="52" x2="180" y2="52" class="dg-line" stroke-width="1.5"/>
<rect x="180" y="30" width="140" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="250" y="48" text-anchor="middle" font-size="12">여러 응답 생성</text>
<text x="250" y="64" text-anchor="middle" font-size="12">사람이 순위 매김</text>
<line x1="320" y1="52" x2="360" y2="52" class="dg-line" stroke-width="1.5"/>
<rect x="360" y="30" width="140" height="44" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="430" y="56" text-anchor="middle" font-size="12">보상모델</text>
<line x1="430" y1="74" x2="430" y2="110" class="dg-line" stroke-width="1.5"/>
<rect x="130" y="110" width="300" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="280" y="132" text-anchor="middle" font-size="12">PPO: 보상 점수를 높이는 방향으로</text>
<text x="280" y="150" text-anchor="middle" font-size="12">정책(=SFT 모델) 업데이트, KL 페널티로 제약</text>
<path d="M130,135 C 60,135 60,52 20,52" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="30" y="95" font-size="11" class="dg-dim">정책 갱신</text>
</svg>

_SFT 모델의 여러 응답을 사람이 비교해 보상모델을 만들고 그 점수로 PPO가 정책을 업데이트한다._

## 문제
곱의 미분법을 적용해 $\pi(y)\log\dfrac{\pi(y)}{\pi_{SFT}(y)}$를 $\pi(y)$에 대해 미분하면 $\dfrac{\partial}{\partial \pi(y)}\Big[\pi(y)\log\dfrac{\pi(y)}{\pi_{SFT}(y)}\Big] = $==빈칸== 이 된다.

## 해설
곱의 미분법에 의해 $\pi(y)\log(\pi(y)/\pi_{SFT}(y))$를 $\pi(y)$로 미분하면 $\log(\pi(y)/\pi_{SFT}(y))$ 항과 $\pi(y)\cdot\frac{1}{\pi(y)}=1$ 항의 합이 되기 때문이에요.

**정답: $\log\frac{\pi(y)}{\pi_{SFT}(y)} + 1$**

## 예시

