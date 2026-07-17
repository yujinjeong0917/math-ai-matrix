---
slug: value-iteration-contraction
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 수치적 안정성
title: 가치반복의 수렴성: 벨만 최적연산자의 축약성
related: 
---

## 도입
가치반복은 벨만 최적연산자를 계속 적용해서 가치함수를 갱신하는 알고리즘입니다. 그런데 이 반복이 정말 하나의 값으로 수렴한다는 보장은 어디서 나올까요. markov-mdp 항목에서 본 벨만방정식의 연산자 버전이 실은 거리를 매번 줄이는 축약사상이라는 사실에서 나옵니다.

## 명제
벨만 최적연산자 $(TV)(s)=\max_a\left[r(s,a)+\gamma\sum_{s'}P(s'|s,a)V(s')\right]$는 $\|TV_1-TV_2\|_\infty \le \gamma\|V_1-V_2\|_\infty$를 만족하는 축약사상이고, 따라서 가치반복은 유일한 고정점으로 수렴한다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="190" x2="440" y2="190" class="dg-line" stroke-width="1"/>
<line x1="40" y1="190" x2="40" y2="20" class="dg-line" stroke-width="1"/>
<text x="440" y="205" font-size="11" text-anchor="end">반복 횟수 k</text>
<text x="20" y="20" font-size="11">‖Vₖ−V*‖∞</text>
<rect x="55" y="30" width="30" height="150" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<rect x="105" y="57" width="30" height="123" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<rect x="155" y="79" width="30" height="101" class="dg-stroke-accent" fill="none" stroke-width="2" stroke-dasharray="4,3"/>
<rect x="205" y="97" width="30" height="83" class="dg-stroke-accent" fill="none" stroke-width="2" stroke-dasharray="4,3"/>
<rect x="255" y="111" width="30" height="69" class="dg-stroke-accent" fill="none" stroke-width="2" stroke-dasharray="4,3"/>
<rect x="305" y="122" width="30" height="58" class="dg-accent"/>
<rect x="355" y="130" width="30" height="50" class="dg-accent"/>
<rect x="400" y="137" width="20" height="43" class="dg-accent"/>
<line x1="40" y1="180" x2="440" y2="180" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<text x="380" y="196" font-size="10" class="dg-dim">V* (고정점)</text>
<text x="60" y="25" font-size="10">거리 × γ 마다 감소</text>
</svg>

_벨만 연산자를 반복 적용할 때마다 거리가 γ배씩 줄어들어 유일한 고정점으로 축약수렴한다._

## 문제
먼저 $s$를 하나 고정한다. $(TV_1)(s)$와 $(TV_2)(s)$는 둘 다 $\max_a[\cdots]$ 형태인데, $|\max_af(a)-\max_ag(a)|\le\max_a|f(a)-g(a)|$라는 표준 부등식을 쓰면 최댓값끼리의 차이를 행동별 차이의 최댓값으로 눌러 잡을 수 있다. 이때 두 식에 똑같이 들어있는 $r(s,a)$ 항은 빼는 과정에서 사라진다.

$|(TV_1)(s)-(TV_2)(s)| \le \gamma\max_a|\sum_{s'}P(s'|s,a)($==빈칸==$)|$ 이다.

## 해설
$r(s,a)$ 항은 두 식 모두에 똑같이 있어 빼면 사라진다. 남는 것은 $\gamma$가 곱해진 기댓값 안의 $V_1(s')-V_2(s')$뿐이다.

**정답: $V_1(s')-V_2(s')$**

## 예시
축약사상이라는 말이 실제로 무엇을 뜻하는지 아주 단순한 2상태 MDP에 숫자를 넣어 확인해봅니다.

상태 $s_1,s_2$가 있고 각 상태에서 선택지가 하나뿐이라 $\max$가 필요 없다고 하겠습니다. 보상은 $r=0$이고 전이는 자기 자신으로만 가는 $P(s|s)=1$입니다. 할인율은 $\gamma=0.9$입니다. 이 경우 $(TV)(s)=0.9\,V(s)$로 아주 단순해집니다.

두 가치함수 $V_1=(10,0)$과 $V_2=(0,0)$을 비교합니다. $\|V_1-V_2\|_\infty=10$입니다. 한 번 $T$를 적용하면 $TV_1=(9,0)$, $TV_2=(0,0)$이 되어 $\|TV_1-TV_2\|_\infty=9$입니다.

$9$는 정확히 $\gamma\times10=9$입니다. 거리가 정확히 $\gamma$배로 줄어든 것을 확인할 수 있습니다.

$V_1$에 $T$를 계속 적용하면 $10,\,9,\,8.1,\,7.29,\dots$로 $\gamma$의 거듭제곱 속도로 $0$에 수렴합니다. 이게 바로 유일한 고정점 $V^*=(0,0)$입니다.

아래 증명은 이 $\gamma$배 축소가 이 특수한 예에서만이 아니라 임의의 두 가치함수 사이에서 항상 성립한다는 사실을 일반적으로 보입니다.
