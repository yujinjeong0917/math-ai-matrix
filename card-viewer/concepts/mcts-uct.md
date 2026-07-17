---
slug: mcts-uct
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 그래프 · 탐색
title: MCTS의 UCT 선택 공식 유도
related: 
---

## 도입
몬테카를로 트리 탐색은 트리를 내려가며 매번 어느 자식 노드로 갈지 골라야 한다. 지금까지 좋아 보였던 노드만 계속 파고들면 더 좋은 수를 놓칠 수 있고, 반대로 안 가본 노드만 찾아다니면 시간을 낭비한다. 이 균형을 잡아주는 것이 UCT 공식이다. 그 공식이 확률의 신뢰구간을 재는 도구인 Hoeffding 부등식에서 어떻게 자연스럽게 나오는지 확인해본다.

## 명제
노드 $s$에서 총 $N(s)$번 시뮬레이션을 했고 그중 자식 $a$를 $N(s,a)$번 방문해서 평균 보상 $Q(s,a)$를 관측했다면, Hoeffding 부등식으로부터 신뢰폭 $\sqrt{\ln N(s)/2N(s,a)}$를 얻을 수 있고, 이를 $Q(s,a)$에 더한 $Q(s,a)+c\sqrt{\ln N(s)/N(s,a)}$를 최대화하는 것이 UCT 선택 규칙이다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<circle cx="80" cy="110" r="16" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="80" y="115" font-size="12" text-anchor="middle">s</text>
<line x1="94" y1="100" x2="230" y2="50" class="dg-line" stroke-width="1.5" />
<line x1="94" y1="120" x2="230" y2="170" class="dg-stroke-accent" stroke-width="2.5" />
<circle cx="250" cy="50" r="16" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="250" y="55" font-size="12" text-anchor="middle">a₁</text>
<circle cx="250" cy="170" r="16" class="dg-accent" />
<text x="250" y="175" font-size="12" text-anchor="middle">a₂</text>
<text x="280" y="28" font-size="11">N=40, Q=0.60</text>
<text x="280" y="44" font-size="11" class="dg-dim">UCT ≈ 1.075</text>
<text x="280" y="148" font-size="11">N=10, Q=0.50</text>
<text x="280" y="164" font-size="11">UCT ≈ 1.450 (선택)</text>
<text x="30" y="20" font-size="11" class="dg-dim">방문 적은 a₂가 신뢰폭 보너스로 다음 선택됨</text>
</svg>

_Q값은 a₁이 높지만 방문이 적은 a₂의 UCT가 더 커서 다음 탐색으로 선택된다(굵은 선)._

## 문제
이제 이 실패확률을 아주 작은 값으로 직접 고정하고 그에 맞는 $\epsilon$을 거꾸로 구해본다. 실패확률을 $1/N(s)$로 두면 전체 시뮬레이션 횟수가 늘어날수록 각 자식에 대한 신뢰구간이 점점 더 엄격해진다는 뜻이 된다.

$\exp(-2N(s,a)\epsilon^2) = \dfrac{1}{N(s)}$ 의 양변에 로그를 씌우면 $-2N(s,a)\epsilon^2 = $==빈칸== 이다.

## 해설
$\ln(1/N(s))=-\ln N(s)$이다. 양변에 로그를 씌우면 왼쪽은 $-2N(s,a)\epsilon^2$가 그대로 남고 오른쪽은 이 값이 된다.

**정답: $-\ln N(s)$**

## 예시
극한을 다루는 부등식 유도에 들어가기 전에 실제 방문 횟수와 평균 보상을 넣어 UCT 점수를 계산해본다.

총 시뮬레이션 $N(s)=100$번 중 자식 $a_1$은 40번 방문해서 평균 보상 $Q(s,a_1)=0.6$을 얻었고, 자식 $a_2$는 10번만 방문해서 평균 보상 $Q(s,a_2)=0.5$를 얻었다고 하자. 상수는 $c=1.4$로 둔다.
$$\mathrm{UCT}(a_1)=0.6+1.4\sqrt{\frac{\ln100}{40}}\approx0.6+1.4\times0.339\approx1.075$$
$$\mathrm{UCT}(a_2)=0.5+1.4\sqrt{\frac{\ln100}{10}}\approx0.5+1.4\times0.679\approx1.450$$
평균 보상은 $a_1$이 더 높지만 UCT 점수는 $a_2$가 더 높다. 방문 횟수가 적어 불확실한 $a_2$에게 신뢰폭이라는 보너스가 더 크게 붙었기 때문이다. 다음 시뮬레이션은 평균이 낮은데도 $a_2$ 쪽으로 향한다. 아래 증명은 이 보너스 항이 임의로 고른 것이 아니라 Hoeffding 부등식에서 정확히 유도되는 형태임을 보인다.
