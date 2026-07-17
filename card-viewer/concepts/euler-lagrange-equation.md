---
slug: euler-lagrange-equation
theme: CALC2
domainLabel: 미적분 심화
subLabel: 변분법
title: 오일러-라그랑주 방정식의 유도
related: 볼록 범함수의 유일한 전역최소 · 부스팅과 함수공간 경사하강법
---

## 도입
신경망 학습은 유한한 개수의 파라미터를 조정하는 최적화처럼 보이지만, 더 넓게 보면 사실 함수 하나를 통째로 최적화하는 문제의 특수한 경우예요. 함수 하나, 혹은 곡선 하나를 입력받아서 숫자 하나를 내놓는 것을 범함수(functional)라고 부릅니다. 이 범함수를 최소화하는 함수 자체를 찾는 이론이 변분법이고, 그 답이 만족해야 하는 미분방정식이 오일러-라그랑주 방정식이에요. 확산모델을 시간을 촘촘하게 쪼개는 대신 연속시간 극한으로 보낼 때도, 신경망을 무한히 넓은 함수공간에서의 경사하강으로 볼 때도 결국 이 방정식과 같은 논리가 배경에 깔려 있습니다.

## 명제
$F(x,y,y')$가 매끄러운 함수이고, 양 끝점 $y(a)=y_a$, $y(b)=y_b$가 고정된 함수들 중에서 범함수 $J[y]=\displaystyle\int_a^b F(x,y,y')\,dx$ 를 최소화하는 함수 $y$가 있다면, $y$는 모든 $x\in[a,b]$에서 오일러-라그랑주 방정식 $\dfrac{\partial F}{\partial y} - \dfrac{d}{dx}\dfrac{\partial F}{\partial y'} = 0$ 을 만족한다.

## 그림
<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg">
<circle cx="60" cy="190" r="4" class="dg-accent"/>
<circle cx="420" cy="50" r="4" class="dg-accent"/>
<text x="60" y="210" font-size="11" text-anchor="middle">고정 끝점 a</text>
<text x="420" y="35" font-size="11" text-anchor="middle">고정 끝점 b</text>
<path d="M60,190 Q200,60 420,50" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="4,3"/>
<path d="M60,190 Q280,160 420,50" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="4,3"/>
<path d="M60,190 Q240,100 420,50" fill="none" class="dg-stroke-accent" stroke-width="3"/>
<text x="150" y="90" font-size="12">최적곡선 y*(x)</text>
<text x="150" y="150" font-size="11" class="dg-dim">섭동곡선 y*+εη (같은 끝점)</text>
</svg>

_같은 끝점을 지나는 이웃 곡선들을 겹쳐 그리면, 최적곡선에서 범함수 값이 국소적으로 정류됨을 볼 수 있다._

## 문제
이 '흔드는 방향'을 구체적으로 만들기 위해, 양 끝점에서 $0$이 되는 임의의 매끄러운 함수 $\eta(x)$($\eta(a)=\eta(b)=0$)와 작은 실수 $\varepsilon$을 써서 $y(x,\varepsilon)=y^*(x)+\varepsilon\eta(x)$ 라는 섭동을 만든다. $\eta(a)=\eta(b)=0$이므로 이 섭동도 여전히 같은 끝점 조건을 만족한다. 이 섭동을 넣은 범함수값을 $\varphi(\varepsilon)=J[y^*+\varepsilon\eta]$ 라 하면, $\varphi$는 이제 $\varepsilon$ 하나짜리 보통의 실함수다. $y^*$가 $J$를 최소화하므로 $\varphi(\varepsilon)$는 $\varepsilon=0$에서 최솟값을 갖고, 따라서 $\varphi'(0) = $==빈칸== 이다.

## 해설
보통의 일변수함수가 극값을 갖는 지점에서는 도함수가 0이 된다는 미적분의 가장 기본적인 성질을 $\varphi(\varepsilon)$에 그대로 적용한 것입니다.

**정답: $0$**

## 예시
추상적인 변분 논증에 들어가기 전에, 가장 유명한 범함수인 평면 위 두 점 사이의 곡선 길이로 감을 잡아봅니다.

$(0,0)$에서 $(1,1)$까지 가는 곡선 $y(x)$의 길이는 $J[y]=\int_0^1\sqrt{1+y'(x)^2}\,dx$ 입니다. 직선 $y=x$를 따라가면 $y'=1$이라 길이는 다음과 같습니다.
$$J[x\mapsto x]=\int_0^1\sqrt{1+1^2}\,dx=\sqrt2\approx1.4142$$
이번엔 양 끝점은 그대로 고정한 채 살짝 흔들어본 곡선 $y(x)=x+0.1\sin(\pi x)$를 씁니다. $\sin(0)=\sin(\pi)=0$이라 끝점 조건은 그대로 지켜집니다. 이 곡선의 길이를 심프슨 공식으로 근사하면 다음과 같습니다.
$$J[x\mapsto x+0.1\sin(\pi x)]\approx1.4230$$
직선보다 살짝 구불거리게 만들었을 뿐인데 길이가 $\sqrt2\approx1.4142$보다 커졌습니다. 아래 증명은 이 직선이 우연히 짧은 게 아니라, $F(x,y,y')=\sqrt{1+y'^2}$를 오일러-라그랑주 방정식에 넣으면 정확히 직선만이 해가 된다는 사실을 보입니다.
