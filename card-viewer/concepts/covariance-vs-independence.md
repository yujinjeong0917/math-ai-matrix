---
slug: covariance-vs-independence
theme: PROB
domainLabel: 확률 · 통계
subLabel: 확률의 기초
title: 무상관과 독립성의 차이: X~N(0,1), Y=X²
related: Simpson의 역설
---

## 도입
두 확률변수가 서로 아무 관계가 없다는 것을 나타내는 방법에는 여러 층위가 있습니다. 가장 흔히 쓰는 것이 공분산(또는 상관계수)이 0이라는 조건이고, 더 강한 조건이 통계적 독립입니다. 독립이면 공분산이 0이 되는 것은 쉽게 보일 수 있지만, 거꾸로 공분산이 0이라고 해서 독립이 보장되지는 않습니다. $X$가 표준정규분포를 따르고 $Y=X^2$으로 완전히 결정되는 극단적인 예를 통해 이 역이 성립하지 않음을 확인합니다.

## 명제
$X \sim N(0,1)$이고 $Y=X^2$이라 하자. 그러면 $\mathrm{Cov}(X,Y)=0$ 이지만 $X$와 $Y$는 통계적으로 독립이 아니다.

## 그림
<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="260" x2="390" y2="260" class="dg-line" stroke-width="1"/>
<line x1="210" y1="270" x2="210" y2="30" class="dg-line" stroke-width="1"/>
<text x="395" y="264" font-size="12" class="dg-dim">X</text>
<text x="216" y="34" font-size="12" class="dg-dim">Y=X²</text>
<line x1="210" y1="30" x2="210" y2="260" class="dg-dim" stroke-width="1" stroke-dasharray="3,2"/>
<text x="216" y="46" font-size="10" class="dg-dim">대칭축(x=0)</text>
<path d="M90,80 C130,180 170,240 210,260 C250,240 290,180 330,80" fill="none" class="dg-stroke-ink" stroke-width="2.5"/>
<circle cx="330" cy="80" r="5" class="dg-accent"/>
<circle cx="290" cy="180" r="5" class="dg-accent"/>
<circle cx="250" cy="240" r="5" class="dg-accent"/>
<circle cx="210" cy="260" r="5" class="dg-accent"/>
<circle cx="170" cy="240" r="5" class="dg-accent"/>
<circle cx="130" cy="180" r="5" class="dg-accent"/>
<circle cx="90" cy="80" r="5" class="dg-accent"/>
<line x1="290" y1="180" x2="310" y2="150" class="dg-stroke-accent" stroke-width="1.5"/>
<polygon points="310,150 300,152 306,160" class="dg-accent"/>
<text x="312" y="146" font-size="11">+x³ 기여</text>
<line x1="130" y1="180" x2="110" y2="150" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,2"/>
<polygon points="110,150 112,160 120,156" class="dg-line"/>
<text x="30" y="146" font-size="11" class="dg-dim">−x³ 기여</text>
<text x="90" y="285" font-size="12" text-anchor="middle">Cov(X,Y)=0 (상쇄)</text>
<text x="330" y="285" font-size="12" text-anchor="middle" class="dg-dim">그러나 Y는 X로 완전히 결정(강한 의존)</text>
</svg>

_$Y=X^2$는 좌우대칭이라 $+x$와 $-x$의 기여가 정확히 상쇄되어 공분산은 0이 되지만, $X$값이 정해지면 $Y$가 완전히 결정되는 강한 의존관계는 그대로 남는다._

## 문제
지금 목표는 $X$와 $Y$가 정말로 무상관인지, 즉 $\mathrm{Cov}(X,Y)=0$인지를 직접 계산으로 확인하는 것이다. 이를 위해 먼저 $X\sim N(0,1)$의 홀수차 모멘트를 살펴본다. 표준정규분포의 밀도함수 $\phi(x)=\frac{1}{\sqrt{2\pi}}e^{-x^2/2}$는 원점에 대해 대칭인 우함수이고, $x^3$은 원점에 대해 반대칭인 기함수다. 기함수와 우함수를 곱한 함수를 대칭구간 전체에서 적분하면 좌우가 정확히 상쇄되어 0이 된다.

따라서 $E[X^3] = \displaystyle\int_{-\infty}^{\infty}x^3\phi(x)\,dx = $==빈칸== 이다.

## 해설
피적분함수 $x^3\phi(x)$는 기함수다($(-x)^3\phi(-x) = -x^3\phi(x)$). 기함수를 원점 대칭구간에서 적분하면 양수 구간과 음수 구간의 기여가 정확히 상쇄되어 적분값은 0이 된다. 표준정규분포뿐 아니라 원점에 대칭인 모든 분포는 홀수차 모멘트가 0이다.

**정답: $0$**

## 예시
독립이 아니라는 사실은 굳이 적분을 하지 않아도 직관적으로 알 수 있습니다. $X=2$가 관측되면 $Y=X^2$은 무조건 $4$로 확정됩니다. $X=-1$이 관측되면 $Y$는 무조건 $1$로 확정됩니다. 이렇게 $X$값마다 $Y$가 취할 수 있는 값 자체가 완전히 달라지므로, $X$와 $Y$가 서로 무관하다고 보기는 어렵습니다.

그런데 공분산을 직접 계산해보면 다른 그림이 나옵니다. $E[X]=0$이고 $E[X^3]=0$(표준정규분포는 원점 대칭이라 홀수차 모멘트가 모두 0)이므로,
$$\mathrm{Cov}(X,Y)=E[XY]-E[X]E[Y]=E[X^3]-0\times E[X^2]=0-0=0$$
공분산은 정확히 $0$입니다. 대칭성 때문에 $X$가 양수일 때 생기는 양의 기여와 음수일 때 생기는 음의 기여가 정확히 상쇄되기 때문입니다. 아래 증명은 이 상쇄가 우연이 아니라, $X,Y$가 무상관이면서도 독립은 아니라는 사실을 더 강한 함수쌍으로 직접 확인하는 과정을 보입니다.
