---
slug: manifold-hypothesis
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 기하 · 측도
title: 매니폴드 가정과 국소 자유도
related: 
---

## 도입
이미지 하나는 픽셀 수만큼의 차원을 갖는 벡터입니다. 그런데도 진짜 자연스러운 이미지들은 그 광대한 공간의 극히 일부, 훨씬 낮은 차원의 표면 근처에만 모여 있는 것처럼 보입니다. 이 관찰을 매니폴드 가정이라 부릅니다. 증명된 정리는 아니지만 이 가정이 참이라면 국소적으로 무엇이 따라 나오는지는 미분기하로 정확히 유도할 수 있습니다.

## 명제
$M\subset\mathbb{R}^D$가 매끄러운 $d$차원 다양체($d\ll D$)이고 $x_0\in M$이면, $x_0$ 근방의 $M$위의 점은 $d$개의 좌표 $t_1,\dots,t_d$로 매개화되는 접공간 근사 $x\approx x_0+\sum_it_iv_i$로 표현되고 그 오차는 $O(\|x-x_0\|^2)$이다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="400" height="180" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<text x="40" y="40" font-size="11" class="dg-dim">고차원 공간 ℝᴰ</text>
<path d="M60,150 C120,60 200,180 260,80 C320,10 380,120 410,60" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="270" y="40" font-size="11">저차원 다양체 M (d차원)</text>
<circle cx="120" cy="112" r="3" class="dg-accent"/>
<circle cx="180" cy="130" r="3" class="dg-accent"/>
<circle cx="230" cy="105" r="3" class="dg-accent"/>
<circle cx="290" cy="60" r="3" class="dg-accent"/>
<circle cx="340" cy="80" r="3" class="dg-accent"/>
<circle cx="230" cy="105" r="6" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<line x1="205" y1="95" x2="255" y2="115" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<text x="200" y="165" font-size="10">접공간 T_x₀M (d차원, 국소근사)</text>
<text x="55" y="200" font-size="10" class="dg-dim">데이터는 M 위(또는 근처)에만 분포</text>
</svg>

_고차원 공간 속 데이터가 실제로는 접혀 있는 저차원 곡면 위에 분포한다는 가정이다._

## 문제
점 $x_0\in M$에서 $M$에 접하는 모든 방향을 모은 벡터공간을 접공간 $T_{x_0}M$이라 부른다. $M$이 $d$차원 다양체라는 정의 자체가 이 접공간의 차원을 결정한다.

$\dim T_{x_0}M = $==빈칸== 이다.

## 해설
$d$차원 다양체라는 것은 정의상 모든 점에서 접공간이 $d$차원 벡터공간이라는 뜻이다. 다양체의 차원과 접공간의 차원은 정의상 같다.

**정답: $d$**

## 예시
추상적인 $d$차원 다양체 대신 손에 잡히는 그림으로 먼저 봅니다. $\mathbb{R}^3$ 안에 놓인 반지름 $1$짜리 원을 매니폴드로 씁니다. 원 위의 점이니 자유도는 $d=1$뿐이지만 좌표는 $D=3$개나 씁니다.
$$x(t)=(\cos t,\sin t,0),\qquad x_0=x(0)=(1,0,0)$$
$x_0$에서의 접방향은 $v_1=(0,1,0)$입니다. $t=0.1$만큼 움직인 실제 점과 접선 근사 $x_0+tv_1$을 비교합니다.
$$x(0.1)=(0.995004,\,0.099833,\,0),\qquad x_0+0.1v_1=(1,\,0.1,\,0)$$
두 점의 차이는 $(-0.004996,\,-0.000167,\,0)$이고 그 크기는 약 $0.005$입니다. $t^2/2=0.01/2=0.005$와 정확히 맞아떨어집니다. 오차가 $t$가 아니라 $t^2$ 크기로 아주 작다는 것을 확인할 수 있습니다.

아래 증명은 이 관찰이 원이라는 특수한 경우만이 아니라 매끄러운 $d$차원 다양체 전반에서 항상 성립함을 보입니다.
