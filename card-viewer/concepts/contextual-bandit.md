---
slug: contextual-bandit
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 밴딧 기반 추천
title: Contextual Bandit: 문맥을 보고 팔을 고르는 탐색과 활용
related: Thompson Sampling
---

## 도입
문맥을 보지 않는 밴딧은 각 팔의 보상을 팔 하나당 분포 하나로만 관리합니다. 대표적으로 epsilon-greedy는 확률 $\epsilon$으로 무작위 팔을 뽑고 나머지 확률로는 지금까지 평균 보상이 가장 높은 팔을 뽑습니다. 문제는 보상이 문맥에 따라 크게 다를 수 있다는 점입니다. 전체 평균으로는 별로인 팔이 특정 사용자군에서는 최선일 수 있는데 문맥을 무시한 모델은 이를 볼 방법이 없고 서로 다른 문맥의 데이터가 한 분포로 뒤섞여 학습도 느려집니다.

Contextual Bandit은 매 라운드 문맥 $x_t$를 보고 팔 $a_t$를 고르고 고른 팔의 보상 $r_t$만 관측해 그 팔의 보상 모델을 갱신합니다. 대표적인 선형 방식인 LinUCB는 팔마다 기대보상을 $\hat r_a(x) = \theta_a^\top x$로 모델링하고 다음 값이 가장 큰 팔을 고릅니다.
$$\theta_a^\top x + \alpha\sqrt{x^\top A_a^{-1} x}$$
두 번째 항은 그 문맥에서 그 팔의 데이터가 적을수록 커지는 불확실성 항입니다. 데이터가 쌓일수록 저절로 줄어들어서 따로 탐색 비율을 정해두지 않아도 불확실한 곳을 더 살펴보게 됩니다.

고른 팔의 보상만 관측된다는 점이 지도학습 랭킹과 결정적으로 다릅니다. 후보 전체에 정답이 붙어 있는 것이 아니라 실제로 보여준 것 하나에만 결과가 붙습니다. 로그에 남은 결과만 가지고 그대로 학습하면 과거에 자주 보여준 팔만 계속 강화하고 거의 보여주지 않은 팔에 대해서는 아무것도 배우지 못합니다. 그래서 탐색을 명시적으로 설계해야 합니다.

## 명제


## 그림
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="90" width="100" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="70" y="114" font-size="12" text-anchor="middle">문맥 x</text>
<line x1="120" y1="110" x2="170" y2="110" class="dg-line" stroke-width="1.5"/>
<rect x="170" y="90" width="100" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="220" y="114" font-size="12" text-anchor="middle">정책</text>
<line x1="270" y1="110" x2="310" y2="110" class="dg-line" stroke-width="1.5"/>
<text x="450" y="30" font-size="12" text-anchor="middle">기대보상 ± 불확실성</text>
<rect x="340" y="110" width="24" height="60" class="dg-dim"/>
<line x1="352" y1="90" x2="352" y2="130" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="352" y="185" font-size="11" text-anchor="middle">팔 A</text>
<rect x="400" y="80" width="24" height="90" class="dg-accent"/>
<line x1="412" y1="60" x2="412" y2="100" class="dg-stroke-accent" stroke-width="2"/>
<text x="412" y="185" font-size="11" text-anchor="middle">팔 B (선택)</text>
<rect x="460" y="130" width="24" height="40" class="dg-dim"/>
<line x1="472" y1="110" x2="472" y2="150" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="472" y="185" font-size="11" text-anchor="middle">팔 C</text>
<text x="412" y="210" font-size="11" text-anchor="middle" class="dg-dim">보상은 선택된 팔에서만 관측된다</text>
</svg>

_정책이 문맥을 보고 팔을 고르면 그 팔의 보상만 관측되어 다음 선택에 반영된다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
순위를 매길 수 있어도 지금 이 사용자에게 어떤 후보를 실제로 보여줄지는 또 다른 문제입니다. 지금까지 제일 좋아 보이는 것만 계속 보여주면 아직 충분히 시도하지 못한 후보의 진짜 성능을 영영 알 수 없습니다. 각 아이템을 슬롯머신의 팔 하나로 보고 무엇을 당길지 고르는 문제를 밴딧이라 부릅니다.

Contextual Bandit은 여기에 한 가지를 더합니다. 모든 사용자에게 같은 팔이 최선이라고 가정하지 않고 지금 이 사용자와 상황이라는 문맥을 보고 어떤 팔이 좋을지 판단합니다.


## 예시

