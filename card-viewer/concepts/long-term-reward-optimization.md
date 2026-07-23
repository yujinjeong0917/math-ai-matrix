---
slug: long-term-reward-optimization
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 강화학습 추천
title: 장기보상 최적화: 클릭 대신 리텐션을 보상으로
related: 슬레이트 최적화 · Contextual Bandit
---

## 도입
여태 다룬 GBDT나 DIN이나 Transformer 기반 랭킹은 모두 이번 노출에서 클릭이 났는지만 보는 즉각보상으로 학습됩니다. 자주 클릭되지만 만족도는 낮은 아이템은 클릭률 지표에서는 좋아 보이면서도 그 사용자가 나중에 덜 찾아오게 만드는 대가를 조용히 쌓을 수 있는데 이 손해는 학습 신호가 보는 범위 바깥에서 일어납니다.

추천을 상태와 행동과 보상이 이어지는 순차적 결정 문제로 보면 다음 한 스텝이 아니라 여러 스텝의 보상을 더한 값을 목적함수로 쓸 수 있습니다.
$$J(\pi) = \mathbb{E}_\pi\left[\sum_{t=0}^{T}\gamma^t r_t\right]$$
$\gamma\in(0,1)$은 먼 미래의 보상을 덜 반영하는 할인율이고 $r_t$에는 즉각 클릭뿐 아니라 나중에 다시 찾아왔는지 같은 신호도 포함될 수 있습니다.

어려운 지점은 진짜 장기보상인 다음 주 재방문 여부가 아주 늦게 관측되고 그 사이 다른 요인의 영향도 섞여서 어떤 추천이 어떤 결과에 얼마나 기여했는지 가려내기 어렵다는 데 있습니다. 그래서 실무에서는 재방문과 상관관계가 있으면서 더 빨리 관측되는 세션 길이나 활성일수 같은 대리 지표를 쓰거나 즉각 클릭이 아니라 누적 기대보상을 추정하는 가치함수 $Q(s,a)$를 로그 데이터로 따로 학습해서 즉각보상 기반 랭킹 점수를 보정하는 데 씁니다.

Contextual Bandit이 최선인 것만 계속 보여주던 방식에서 벗어나 탐색을 명시적으로 다뤘던 것처럼 장기보상 최적화는 보상을 이번 클릭 하나로 보던 방식에서 벗어나 지금 보여준 것이 나중에 만드는 지연된 효과까지 다룹니다. 그 대가로 훨씬 어려운 신용할당과 측정 문제를 떠안습니다.

## 명제


## 그림
<svg viewBox="0 0 620 210" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="140" x2="580" y2="140" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="100" cy="140" r="6" class="dg-accent"/>
<text x="100" y="120" font-size="12" text-anchor="middle">오늘 클릭</text>
<circle cx="260" cy="140" r="6" class="dg-dim"/>
<text x="260" y="120" font-size="11" text-anchor="middle" class="dg-dim">재방문 없음?</text>
<circle cx="420" cy="140" r="6" class="dg-accent"/>
<text x="420" y="120" font-size="12" text-anchor="middle">일주일 뒤 재방문</text>
<text x="100" y="165" font-size="11" text-anchor="middle" class="dg-dim">즉시보상만 보면 여기까지</text>
<path d="M100,150 C 200,190 350,190 420,150" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<text x="260" y="200" font-size="11" text-anchor="middle">장기보상은 여기까지 이어서 본다</text>
</svg>

_즉시 클릭만 보는 보상은 오늘에서 끊기지만 장기보상은 재방문까지 이어서 평가한다._

## 문제
한 시점 $t$에서 남은 누적보상을 $G_t = \sum_{k=0}^{T-t}\gamma^k r_{t+k}$라 정의하면, $G_t = r_t + \gamma r_{t+1}+\gamma^2 r_{t+2}+\cdots = r_t + \gamma(r_{t+1}+\gamma r_{t+2}+\cdots) = r_t + \gamma\,$==빈칸== 이다.

## 해설
괄호 안의 항은 t+1 시점부터 시작하는 같은 형태의 누적합이라 정의상 G_{t+1}과 정확히 같아요.

**정답: $G_{t+1}$**

## 예시

