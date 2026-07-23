---
slug: policy-gradient-saliency
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 그래디언트 기반
title: 정책 그래디언트 saliency: 어떤 상태 성분이 행동을 바꾸는가
related: Saliency Map · 정책 네트워크 CAM · 정책 어텐션 시각화
---

## 도입
기본 saliency map과 마찬가지로 선택한 행동의 확률 또는 로그확률을 상태로 미분한다. $S_i = \partial \pi_\theta(a|s)/\partial s_i$ 또는 수치적으로 더 안정적인 $\partial \log \pi_\theta(a|s)/\partial s_i$를 쓴다. 역전파 한 번으로 상태의 모든 성분에 대한 민감도를 동시에 얻는다는 점도 분류 모델의 saliency map과 같다.

대표적으로 Atari 벽돌깨기류 게임에서 이 기법을 적용하면 잘 학습된 에이전트는 공과 패들 위치에 saliency가 집중되는 모습을 보인다. 반대로 화면 한구석의 점수 표시나 생명 개수 표시처럼 게임 진행과 우연히 상관관계가 있던 요소에 saliency가 몰리는 경우도 보고된 바 있는데 이는 에이전트가 겉보기 성능은 높아도 잘못된 단서에 의존하고 있다는 신호다.

비슷한 방식으로 상태의 가치 $V(s)$를 상태로 미분하는 가치함수 saliency도 만들 수 있다. 가치함수 saliency는 이 상태가 얼마나 좋은지를 설명하는 것이고 정책 그래디언트 saliency는 왜 하필 이 행동을 골랐는지를 설명한다는 점에서 서로 다른 질문에 답한다.

## 명제


## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="30" width="300" height="200" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="180" cy="90" r="10" class="dg-accent" stroke="none"/>
<rect x="150" y="200" width="70" height="14" class="dg-accent"/>
<rect x="260" y="40" width="60" height="24" fill="none" class="dg-line" stroke-width="1.5"/>
<text x="290" y="57" font-size="11" text-anchor="middle" class="dg-dim">점수 037</text>
<text x="180" y="70" font-size="11" text-anchor="middle" class="dg-dim">공</text>
<text x="185" y="232" font-size="11" text-anchor="middle" class="dg-dim">패들</text>
<text x="420" y="90" font-size="13" text-anchor="middle">높은 ∂π/∂s</text>
<text x="420" y="108" font-size="12" text-anchor="middle" class="dg-dim">공, 패들 위치</text>
<text x="420" y="150" font-size="13" text-anchor="middle">낮은 ∂π/∂s</text>
<text x="420" y="168" font-size="12" text-anchor="middle" class="dg-dim">점수판(정상)</text>
<text x="420" y="210" font-size="12" text-anchor="middle" class="dg-dim">점수판이 밝다면</text>
<text x="420" y="226" font-size="12" text-anchor="middle" class="dg-dim">가짜 상관 의심</text>
</svg>

_정책망의 saliency가 게임 요소에 집중되는지 무관한 표시에 쏠리는지로 학습이 제대로 됐는지 가늠할 수 있다._

## 문제
로그를 취하면 분수의 로그는 분자의 로그에서 분모의 로그를 뺀 것이므로, $\log \pi_\theta(a\mid s) = $ ==빈칸== 가 된다.

## 해설
소프트맥스 정의의 로그를 취하면 분수의 로그 성질에 따라 분자 f_a(s)의 로그(자기 자신)에서 분모 합의 로그를 뺀 형태가 된다.

**정답: $f_a(s) - \log\sum_{b} \exp(f_b(s))$**

## 예시

