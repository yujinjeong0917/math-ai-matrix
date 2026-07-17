---
slug: strong-convexity-unique-minimum
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 함수의 성질
title: 강볼록성과 유일한 전역최소값의 존재
related: 헤시안과 2차 최적성 조건 · 경사하강법의 O(1/k) 수렴률
---

## 도입
볼록함수는 최소값이 있어도 여러 개의 점에서 같은 최소값을 가질 수 있어요(예: $f(x)=0$은 모든 점이 최소점). 하지만 곡률이 어디서나 최소 $m>0$만큼은 확보되어 있다는 "강볼록성" 조건을 추가하면, 최소값이 존재할 뿐만 아니라 그 위치가 유일하다는 훨씬 강한 결론을 얻을 수 있어요.

## 명제
$f:\mathbb{R}^n\to\mathbb{R}$가 두 번 미분가능하고 어떤 $m>0$에 대해 모든 $x$에서 $H(x)\succeq mI$(강볼록성)이면, $f$는 유일한 전역최소점 $x^*$를 갖는다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="180" x2="320" y2="180" class="dg-line" stroke-width="1"/>
<path d="M40,150 C120,60 220,60 300,150" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="120" y1="80" x2="220" y2="80" class="dg-stroke-accent" stroke-width="3" stroke-dasharray="5,3"/>
<circle cx="120" cy="80" r="3" class="dg-accent"/>
<circle cx="220" cy="80" r="3" class="dg-accent"/>
<text x="170" y="65" font-size="11" text-anchor="middle">최소 후보 구간</text>
<text x="70" y="18" font-size="12">완만한 볼록함수</text>
<line x1="420" y1="180" x2="680" y2="180" class="dg-line" stroke-width="1"/>
<path d="M400,170 Q540,40 660,170" fill="none" class="dg-stroke-accent" stroke-width="3"/>
<line x1="540" y1="40" x2="540" y2="180" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<circle cx="540" cy="40" r="4" class="dg-accent"/>
<text x="540" y="30" font-size="11" text-anchor="middle">유일한 최소점</text>
<text x="440" y="18" font-size="12">강볼록함수 (곡률 ≥ m)</text>
</svg>

_완만한 볼록함수는 최소 후보가 넓게 퍼질 수 있지만, 강볼록함수는 뾰족한 유일 최소점을 갖는다._

## 문제
임의의 $x,y$에 대해 라그랑주 나머지항이 있는 테일러 정리를 쓰면 어떤 $\xi$(선분 $[x,y]$ 위의 점)에 대해 $f(y)=f(x)+\nabla f(x)^T(y-x)+\frac12(y-x)^TH(\xi)(y-x)$ 이고, $H(\xi)\succeq mI$이므로 이차항은 $(y-x)^TH(\xi)(y-x)\ge$==빈칸== 를 만족한다.

## 해설
강볼록성 정의를 $u=y-x$에 바로 적용하면 $u^TH(\xi)u\ge m\|u\|^2=m\|y-x\|^2$이 나와요.

**정답: $m\|y-x\|^2$**

## 예시
가장 단순한 1차원 예로 등호가 정확히 성립하는 경계 사례를 확인해봅시다.

$f(x)=x^2+2$는 $f''(x)=2$이므로 모든 $x$에서 $H(x)=2\ge m=2$, 즉 $m=2$로 강볼록입니다. 최소점은 $x^*=0$, $f^*=2$입니다.

강볼록 부등식 $f(y)\ge f(x)+f'(x)(y-x)+\frac{m}{2}(y-x)^2$ 을 $x=0,y=1$에 대입하면 우변은 $2+0\cdot1+\frac{2}{2}(1)^2=3$이고, 좌변 $f(1)=1+2=3$과 정확히 같습니다. $f$가 딱 이차함수라서 $m$과 실제 곡률이 일치하는 경계 사례이기 때문에 등호가 나오는 것이며, 일반적인 강볼록함수에서는 부등식이 엄격할 수 있습니다.
