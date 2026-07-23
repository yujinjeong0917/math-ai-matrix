---
slug: policy-attention-viz
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 어텐션 기반
title: 정책 어텐션 시각화: 의사결정이 주목한 곳
related: Attention Rollout · 정책 그래디언트 saliency · 정책 네트워크 CAM
---

## 도입
트랜스포머 기반 정책 $\pi_\theta$에서 행동을 만들어내는 쿼리 토큰이 시퀀스의 각 개체 혹은 각 시점에 해당하는 키들을 얼마나 주목하는지 $\mathrm{softmax}(QK^\top/\sqrt d)$를 뽑아낸다. 특정 행동에 대해 이 가중치가 가장 큰 개체나 시점을 읽으면 그 결정에 가장 크게 관여한 요소를 짚어낼 수 있다.

attention rollout과 마찬가지로 정책도 어텐션층을 여러 겹 쌓으므로 마지막 층의 가중치만 보면 한 단계만 확인하는 셈이다. 더 충실한 그림이 필요하면 층을 거쳐 누적하는 rollout 방식이나 Grad-CAM처럼 그래디언트로 가중치를 매기는 변형을 어텐션층에 적용한다.

실무에서는 자율주행이나 다중에이전트 정책을 감사하는 데 이 방법을 쓴다. 감속이라는 행동을 고를 때 어텐션이 앞차에 꾸준히 집중된다면 안심할 수 있는 신호지만 학습 데이터에서 감속 상황과 우연히 상관관계가 있었을 뿐인 배경 요소에 어텐션이 몰려 있다면 정책 그래디언트 saliency에서와 같은 종류의 가짜 상관관계 위험 신호다.

## 명제


## 그림
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="140" width="80" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="164" font-size="12" text-anchor="middle">차량 1</text>
<rect x="150" y="140" width="80" height="40" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="190" y="164" font-size="12" text-anchor="middle">차량 2</text>
<rect x="260" y="140" width="80" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="300" y="164" font-size="12" text-anchor="middle">차량 3</text>
<rect x="370" y="140" width="80" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="410" y="164" font-size="12" text-anchor="middle">차량 4</text>
<rect x="65" y="120" width="30" height="10" class="dg-dim"/>
<rect x="175" y="70" width="30" height="60" class="dg-accent"/>
<rect x="285" y="115" width="30" height="15" class="dg-dim"/>
<rect x="395" y="125" width="30" height="5" class="dg-dim"/>
<text x="190" y="60" font-size="11" text-anchor="middle" class="dg-dim">가장 높은 어텐션</text>
<line x1="190" y1="180" x2="190" y2="210" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="185,205 190,217 195,205" class="dg-accent" stroke="none"/>
<text x="290" y="215" font-size="13">행동: 감속</text>
</svg>

_개체별 어텐션 가중치 막대가 클수록 그 개체가 이 행동에 크게 관여했다._

## 문제
지수값은 $\exp(3.0)\approx20.086,\ \exp(0.5)\approx1.649,\ \exp(-0.5)\approx0.607$이다. 세 값을 모두 더하면 정규화 상수는 $Z=$==빈칸== 이다.

## 해설
20.086, 1.649, 0.607을 모두 더하면 소프트맥스의 분모가 나오기 때문이에요.

**정답: $22.34$**

## 예시

