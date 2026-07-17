---
slug: mdp-transition-graph
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 그래프 · 탐색
title: 가치반복과 벨만 연산자의 축소사상
related: 
---

## 도입
최단경로 그래프에서 $d(v)=\min_u(d(u)+w(u,v))$라는 재귀식을 반복 적용하면 결국 진짜 최단거리에 도달했다. MDP의 상태-행동 전이그래프에서도 비슷한 재귀식이 있다. 다만 전이가 결정론적인 간선이 아니라 확률적인 분포이고 최소 대신 최대를 구한다는 점이 다르다. 이 재귀식을 반복 적용하는 가치반복이 실제로 참값에 수렴한다는 것을 확인해본다.

## 명제
벨만 최적 연산자 $(TV)(s) = \max_a \sum_{s'} P(s'|s,a)\left[r(s,a,s')+\gamma V(s')\right]$는 sup-노름 기준으로 $\|TV_1-TV_2\|_\infty \le \gamma\|V_1-V_2\|_\infty$를 만족하는 축소사상이다.

## 그림
<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="120" cy="100" r="18" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="340" cy="100" r="18" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<path d="M 136 88 Q 230 40 324 88" fill="none" class="dg-stroke-accent" stroke-width="2" />
<polygon points="324,88 313,86 318,95" class="dg-accent" />
<path d="M 324 112 Q 230 160 136 112" fill="none" class="dg-stroke-accent" stroke-width="2" />
<polygon points="136,112 147,110 142,119" class="dg-accent" />
<text x="120" y="105" font-size="12" text-anchor="middle">s₁</text>
<text x="340" y="105" font-size="12" text-anchor="middle">s₂</text>
<text x="230" y="30" font-size="11" text-anchor="middle">a: P=1, r=0</text>
<text x="230" y="178" font-size="11" text-anchor="middle">a: P=1, r=0</text>
<text x="30" y="20" font-size="11">V₁=(10,0), V₂=(0,10) → ‖V₁−V₂‖∞=10</text>
<text x="30" y="196" font-size="11" class="dg-dim">TV₁=(0,9), TV₂=(9,0) → ‖TV₁−TV₂‖∞=9=γ·10 (γ=0.9)</text>
</svg>

_벨만 연산자 T를 한 번 적용하면 두 가치함수 사이 거리가 정확히 γ배로 줄어든다._

## 문제
이제 절댓값 안의 기댓값을 처리할 차례다. 기댓값의 절댓값은 절댓값의 기댓값을 넘지 않는다는 성질과, $V_1(s')-V_2(s')$의 크기가 아무리 커도 둘 사이의 최대 차이인 $\|V_1-V_2\|_\infty$를 넘지 않는다는 사실을 함께 쓴다.

$\left|\sum_{s'}P(s'|s,a)\gamma(V_1(s')-V_2(s'))\right| \le \gamma\sum_{s'}P(s'|s,a)$==빈칸==$ = \gamma\|V_1-V_2\|_\infty$ 이다.

## 해설
각 $s'$에서 $|V_1(s')-V_2(s')|$는 두 함수의 최대 차이인 $\|V_1-V_2\|_\infty$보다 클 수 없다. 이 상수를 확률 $P(s'|s,a)$의 합인 1과 곱하면 그대로 $\gamma\|V_1-V_2\|_\infty$가 남는다.

**정답: $|V_1(s')-V_2(s')|$**

## 예시
축소사상 부등식을 보기 전에 상태 두 개짜리 아주 작은 MDP에 실제 숫자를 넣어 벨만 연산자가 거리를 얼마나 줄이는지 확인해본다.

상태 $s_1,s_2$가 있고 각 상태에서 행동은 하나뿐이며 그 행동은 상대 상태로 확률 1로 넘어가고 보상은 0이라 하자. 할인율은 $\gamma=0.9$다. 두 가치함수를 $V_1=(10,0)$, $V_2=(0,10)$으로 두면 $\|V_1-V_2\|_\infty=10$이다.
$$TV_1=(0+0.9\times0,\ 0+0.9\times10)=(0,\ 9),\qquad TV_2=(0+0.9\times10,\ 0+0.9\times0)=(9,\ 0)$$
두 결과의 성분별 차이는 $|0-9|=9$와 $|9-0|=9$로 모두 9다. 그러니 $\|TV_1-TV_2\|_\infty=9$이고 이는 정확히 $\gamma\|V_1-V_2\|_\infty=0.9\times10=9$와 같다. 벨만 연산자를 한 번 적용했더니 두 가치함수 사이의 거리가 정확히 $\gamma$배로 줄어든 것이다. 아래 증명은 이 축소 비율 $\gamma$가 이 예제에서만 성립하는 게 아니라 임의의 $V_1,V_2$에서 상한으로 항상 성립하는 사실임을 보인다.
