---
slug: wasserstein-gan
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 제약 최적화
title: Wasserstein 거리의 쌍대형과 1-립시츠 제약
related: 
---

## 도입
GAN의 원래 목적함수는 두 분포가 전혀 겹치지 않을 때 그래디언트가 거의 사라지는 문제가 있습니다. WGAN은 대신 두 분포 사이의 Wasserstein 거리를 최소화합니다. 그런데 Wasserstein 거리는 정의 자체가 가능한 모든 결합분포를 뒤져야 하는 계산 불가능한 하한입니다. 대신 이 거리를 1-립시츠 함수 하나로 재는 쌍대형이 있습니다. 그 쌍대형이 어디서 나오는지, 왜 하필 1-립시츠라는 제약이 붙는지 확인해 봅니다.

## 명제
$f$가 1-립시츠이면 임의의 결합분포 $\gamma\in\Pi(p,q)$에 대해 $E_p[f]-E_q[f] \le W(p,q)$ 이다. ($W(p,q)=\inf_{\gamma\in\Pi(p,q)}E_{(x,y)\sim\gamma}[\|x-y\|]$)

## 그림
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="180" x2="520" y2="180" class="dg-line" stroke-width="1.5"/>
<text x="500" y="200" font-size="12">x</text>
<line x1="120" y1="180" x2="120" y2="60" class="dg-stroke-ink" stroke-width="3"/>
<text x="90" y="50" font-size="12">p (x=0)</text>
<line x1="400" y1="180" x2="400" y2="60" class="dg-stroke-ink" stroke-width="3" stroke-dasharray="6,3"/>
<text x="365" y="50" font-size="12">q (x=d)</text>
<path d="M130,120 Q260,70 390,120" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="390,120 378,113 380,124" class="dg-stroke-accent"/>
<text x="215" y="80" font-size="12">확률질량 이동</text>
<text x="150" y="200" class="dg-dim" font-size="12">W(p,q) = 옮겨야 할 거리: 두 분포가 겹치지 않아도 유의미한 거리</text>
</svg>

_한 분포에서 다른 분포로 확률질량을 옮기는 이동으로 겹치지 않는 분포 사이에도 의미 있는 거리를 정의한다._

## 문제
지금 목표는 $E_p[f]-E_q[f]$를 결합분포 $\gamma$ 하나의 언어로 다시 쓰는 것이다. $\Pi(p,q)$에 속하는 임의의 결합분포 $\gamma$를 하나 고정한다. $\gamma$의 정의상 $x$만 따로 봤을 때의 분포는 $p$이고 $y$만 따로 봤을 때의 분포는 $q$다. 그러니 $x$만의 함수인 $f(x)$의 기댓값은 $p$ 아래에서 구하든 $\gamma$ 아래에서 구하든 같은 값이 나온다. $y$ 쪽도 마찬가지다. $E_{x\sim p}[f(x)] - E_{y\sim q}[f(y)] = E_{(x,y)\sim\gamma}[$==빈칸==$]$ 이다.

## 해설
$\gamma$의 주변분포가 각각 $p,q$이므로 $E_{x\sim p}[f(x)]=E_\gamma[f(x)]$이고 $E_{y\sim q}[f(y)]=E_\gamma[f(y)]$다. 이 둘을 하나의 기댓값으로 합치면 $E_\gamma[f(x)-f(y)]$가 된다.

**정답: $f(x)-f(y)$**

## 예시
증명에 들어가기 전에 아주 단순한 두 분포로 부등식 양변을 직접 계산해서 왜 1-립시츠라는 제약이 꼭 필요한지 봅니다.

$p$는 $x=0$에 확률 1을 두는 분포, $q$는 $x=3$에 확률 1을 두는 분포라 합니다. 두 분포를 잇는 결합은 사실상 하나뿐이라 $W(p,q)=|0-3|=3$입니다.

**1-립시츠 함수인 경우.** $f(x)=-x$를 씁니다. 기울기 크기가 항상 $1$이라 1-립시츠 조건을 만족합니다.
$$E_p[f]-E_q[f]=f(0)-f(3)=0-(-3)=3$$
이 값은 $W(p,q)=3$과 정확히 같습니다. 부등식이 등호로 맞아떨어지는 경계 사례입니다.

**1-립시츠가 아닌 경우.** $h(x)=-2x$처럼 기울기 크기가 $2$인 함수를 쓰면 사정이 달라집니다.
$$E_p[h]-E_q[h]=h(0)-h(3)=0-(-6)=6$$
$6$은 $W(p,q)=3$을 넘어버립니다. 함수가 너무 가파르면 부등식 자체가 깨진다는 뜻입니다. WGAN이 critic을 1-립시츠로 억지로 붙잡아 두는 이유가 바로 여기에 있습니다.

아래 증명은 1-립시츠라는 조건 하나만 지키면 어떤 결합분포를 쓰든 이 부등식이 항상 성립한다는 사실을 일반적으로 보입니다.
