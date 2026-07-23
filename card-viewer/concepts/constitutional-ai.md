---
slug: constitutional-ai
theme: LLM
domainLabel: LLM/Agent
subLabel: 정렬(Alignment)
title: Constitutional AI: 원칙에 따라 스스로 비평하고 다시 학습하기
related: RLHF
---

## 도입
Constitutional AI는 두 단계로 진행된다. 첫 단계는 지도학습 단계로 모델이 먼저 응답을 만들고 원칙 목록 중 하나를 골라 그 원칙에 비추어 자기 응답을 비평하게 한 다음 비평 내용을 반영해 응답을 다시 쓰게 한다. 이렇게 만들어진 원칙에 맞게 고쳐진 응답들로 모델을 다시 지도학습시킨다.

둘째 단계는 RLHF와 비슷한 강화학습 단계이지만 사람이 응답 쌍의 우열을 매기는 대신 모델 자신에게 원칙을 기준으로 어느 응답이 더 나은지 판단하게 해서 그 판단으로 선호 데이터셋을 만든다. 이 AI가 만든 선호 데이터로 보상모델을 학습시키고 그 보상모델로 다시 정책을 강화학습시킨다. 사람이 매긴 선호 대신 AI가 매긴 선호를 쓴다는 뜻에서 이 단계를 RLAIF라고 부르기도 한다.

Constitutional AI가 필요한 이유는 RLHF의 사람 평가 의존도를 낮추기 위해서다. 사람이 유해할 수 있는 응답 수천 수만 건을 일일이 비교하는 대신 원칙 몇 줄만 정해두면 모델이 그 원칙을 기준으로 스스로 비평과 수정을 반복하며 훨씬 많은 양의 학습 신호를 만들어낼 수 있다. 원칙 자체가 투명하게 문서로 공개될 수 있어 정렬 기준이 어디서 왔는지 추적하기도 RLHF보다 쉬워진다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="120" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="46" text-anchor="middle" font-size="12">초기 응답</text>
<line x1="140" y1="42" x2="180" y2="42" class="dg-line" stroke-width="1.5"/>
<rect x="180" y="20" width="150" height="44" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="255" y="38" text-anchor="middle" font-size="12">원칙에 비추어</text>
<text x="255" y="54" text-anchor="middle" font-size="12">자기 비평</text>
<line x1="330" y1="42" x2="370" y2="42" class="dg-line" stroke-width="1.5"/>
<rect x="370" y="20" width="130" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="435" y="46" text-anchor="middle" font-size="12">응답 재작성</text>
<text x="600" y="46" font-size="12" class="dg-dim">SFT로 재학습</text>
<line x1="435" y1="64" x2="435" y2="110" class="dg-line" stroke-width="1.5"/>
<rect x="365" y="110" width="140" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="435" y="128" text-anchor="middle" font-size="12">원칙 기준</text>
<text x="435" y="144" text-anchor="middle" font-size="12">AI가 응답 쌍 비교</text>
<line x1="365" y1="132" x2="320" y2="132" class="dg-line" stroke-width="1.5"/>
<rect x="180" y="110" width="140" height="44" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="250" y="136" text-anchor="middle" font-size="12">보상모델 학습</text>
<line x1="180" y1="132" x2="140" y2="132" class="dg-line" stroke-width="1.5"/>
<rect x="20" y="110" width="120" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="128" text-anchor="middle" font-size="12">RL로 정책</text>
<text x="80" y="144" text-anchor="middle" font-size="12">업데이트</text>
</svg>

_사람 대신 원칙과 AI 스스로의 비평이 지도학습 데이터와 선호 데이터를 모두 만들어낸다._

## 문제
두 방식의 노동 구조를 비교하려면 총 인간 노동의 비율 $\rho(N) = L_{CAI}(N)/L_{RLHF}(N)$에 두 식을 대입하면 된다. $\rho(N) = $==빈칸== 이다.

## 해설
$L_{CAI}(N)=c'P$, $L_{RLHF}(N)=cN$이므로 비율의 정의대로 두 식을 그대로 나누면 얻어지는 값이에요.

**정답: $\frac{c'P}{cN}$**

## 예시

