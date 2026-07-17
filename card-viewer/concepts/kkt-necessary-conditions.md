---
slug: kkt-necessary-conditions
theme: CALC2
domainLabel: 미적분 심화
subLabel: 볼록최적화 이론
title: KKT 필요조건의 유도: 정류성·원시실현가능성·쌍대실현가능성·상보슬랙성
related: 라그랑주 승수법과 KKT 조건 · 라그랑주 쌍대성과 약쌍대성 정리 · 볼록함수의 1차 조건과 전역최소
---

## 도입
제약이 하나만 있을 때 KKT 조건을 본 적이 있다면, 질문은 자연스럽게 이어져요. 제약이 여러 개로 늘어나도 같은 논리가 통할까요. 답은 그렇다는 것이고, 그 논리를 일반적인 형태로 완성하면 이름이 붙은 네 개의 조건, 즉 정류성·원시실현가능성·쌍대실현가능성·상보슬랙성으로 깔끔하게 정리됩니다. 이 네 조건은 SVM부터 강화학습의 신뢰영역 제약까지 부등식 제약이 등장하는 거의 모든 최적화 문제에서 반복해서 등장해요.

## 명제
제약이 지나치게 특이하지 않다는 constraint qualification이 성립할 때, $\min_x f(x)\ \text{s.t.}\ g_i(x)\le0\ (i=1,\dots,m)$ 의 최적해 $x^*$에서는 어떤 $\mu^*_i\ge0\ (i=1,\dots,m)$이 존재해 다음 네 조건이 모두 성립한다: 정류성 $\nabla f(x^*)+\sum_{i=1}^m\mu_i^*\nabla g_i(x^*)=0$, 원시실현가능성 $g_i(x^*)\le0$, 쌍대실현가능성 $\mu_i^*\ge0$, 상보슬랙성 $\mu_i^*g_i(x^*)=0$.

## 그림
<svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="400" cy="70" rx="130" ry="80" fill="none" class="dg-stroke-ink" stroke-width="1.2"/>
<ellipse cx="400" cy="70" rx="90" ry="55" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<ellipse cx="400" cy="70" rx="50" ry="30" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="400" y="55" font-size="11" text-anchor="middle" class="dg-dim">목적함수 등고선</text>
<path d="M60,300 L250,220" class="dg-stroke-accent" stroke-width="2"/>
<text x="90" y="310" font-size="11">제약 g1=0</text>
<path d="M250,220 L420,140" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="6,3"/>
<text x="380" y="150" font-size="11">제약 g2=0</text>
<circle cx="250" cy="220" r="5" class="dg-accent"/>
<text x="255" y="240" font-size="12">x* (활성 제약의 꼭짓점)</text>
<path d="M250,220 L330,150" class="dg-stroke-ink" stroke-width="2.5"/>
<polygon points="330,150 316,155 322,164" class="dg-stroke-ink"/>
<text x="335" y="145" font-size="11">∇f(x*)</text>
<path d="M250,220 L190,280" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="190,280 200,270 205,280" class="dg-stroke-ink"/>
<text x="150" y="295" font-size="10" class="dg-dim">-∇g1</text>
<path d="M250,220 L330,270" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="330,270 318,266 322,277" class="dg-stroke-ink"/>
<text x="335" y="285" font-size="10" class="dg-dim">-∇g2</text>
<path d="M190,280 A100,100 0 0,1 330,270 L250,220 Z" class="dg-dim" opacity="0.25"/>
</svg>

_활성 제약들이 만나는 꼭짓점에서 목적함수 그래디언트는 활성 제약 그래디언트들이 만드는 콘 안에 놓인다._

## 문제
실현가능한 하강방향이 있다는 것은 어떤 $d$가 있어서 $\nabla f(x^*)^Td<0$이면서 동시에 활성 제약들에 대해 $\nabla g_i(x^*)^Td\le0$ ($i\in A$)이 성립한다는 뜻이다. 만약 이런 $d$가 하나라도 존재한다면, 그 방향으로 충분히 작게 $t>0$만큼 움직인 $x^*+td$는 목적함수값이 줄어들면서도(1차 근사에서) 모든 제약을 계속 만족한다(비활성 제약은 애초에 여유가 있어 작은 이동으로는 어길 수 없다). 이는 $x^*$가 최적해라는 가정과 모순이다. 그러므로 $x^*$가 최적해라면 다음 부등식 시스템 $\nabla f(x^*)^Td<0,\ \nabla g_i(x^*)^Td\le0\ (i\in A)$ 은 해 $d$를 ==빈칸== 이다.

## 해설
만약 이 시스템의 해 $d$가 존재한다면 그 방향으로 조금 움직였을 때 목적함수가 줄어들면서 제약도 어기지 않게 되어, $x^*$가 최적해라는 가정과 곧바로 모순됩니다. 그래서 해가 없어야만 합니다.

**정답: $\text{갖지 않는다}$**

## 예시
추상적인 유도에 들어가기 전에, 제약이 두 개인 아주 구체적인 문제 하나를 직접 풀어서 KKT의 네 조건이 실제로 어떻게 나타나는지 확인해봅니다.

$f(x,y)=(x-2)^2+(y-2)^2$ 을 $g_1(x,y)=x+y-2\le0$ 과 $g_2(x,y)=x-3\le0$ 아래 최소화합니다. 제약이 없다면 최적해는 $(2,2)$이지만 $g_1(2,2)=2>0$이라 허용되지 않습니다. 기하학적으로 직선 $x+y=2$ 위에서 점 $(2,2)$에 가장 가까운 점을 찾으면 되고, 그 점은 $(1,1)$입니다.

이 점에서 그래디언트들을 계산합니다.
$$\nabla f(1,1)=(2(1-2),2(1-2))=(-2,-2),\qquad \nabla g_1(1,1)=(1,1),\qquad \nabla g_2(1,1)=(1,0)$$
정류조건 $\nabla f+\mu_1\nabla g_1+\mu_2\nabla g_2=0$을 성분별로 풀어봅니다. $y$성분에서 $-2+\mu_1=0$이므로 $\mu_1=2$이고, $x$성분에서 $-2+\mu_1+\mu_2=0$에 $\mu_1=2$를 넣으면 $\mu_2=0$이 나옵니다.

네 조건을 하나씩 확인합니다. 원시실현가능성: $g_1(1,1)=0\le0$, $g_2(1,1)=-2\le0$. 쌍대실현가능성: $\mu_1=2\ge0$, $\mu_2=0\ge0$. 상보슬랙성: $\mu_1g_1(1,1)=2\times0=0$, $\mu_2g_2(1,1)=0\times(-2)=0$. 경계에 딱 붙은 $g_1$은 양의 승수를 받고, 여유가 있는 $g_2$는 승수가 정확히 $0$으로 꺼집니다. 아래 증명은 이 패턴, 즉 활성 제약과 비활성 제약이 항상 이렇게 다른 방식으로 조건을 만족한다는 사실이 우연이 아니라 임의의 문제에서 일반적으로 성립함을 보입니다.
