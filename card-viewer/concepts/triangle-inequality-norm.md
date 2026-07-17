---
slug: triangle-inequality-norm
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: 노름의 삼각부등식: 코시-슈바르츠에서 유도
related: 일반화된 내적과 마할라노비스 거리 · 함수공간의 내적(RKHS 기초)
---

## 도입
노름은 벡터의 길이를 재는 도구인데, 두 벡터를 이어붙인 길이가 각각의 길이의 합을 절대 넘지 않는다는 사실 — 삼각부등식 — 이 성립해야 "거리"라는 이름값을 해요. 이 부등식은 사실 코시-슈바르츠 부등식 하나로부터 거의 자동으로 따라나옵니다.

## 명제
내적공간 $V$에서 노름을 $\|x\|:=\sqrt{\langle x,x\rangle}$ 로 정의하면, 임의의 $x,y\in V$에 대해 $\|x+y\|\le \|x\|+\|y\|$ 이다 (단, 코시-슈바르츠 부등식 $|\langle x,y\rangle|\le\|x\|\|y\|$ 는 이미 성립한다고 가정한다).

## 그림
<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="170" x2="180" y2="60" class="dg-stroke-ink" stroke-width="2.5"/>
<polygon points="180,60 168,70 175,78" class="dg-stroke-ink"/>
<text x="90" y="105" font-size="13">x</text>
<line x1="180" y1="60" x2="300" y2="100" class="dg-line" stroke-width="1.8" stroke-dasharray="5,3"/>
<polygon points="300,100 288,95 290,108" class="dg-line"/>
<text x="245" y="72" font-size="13">y</text>
<line x1="40" y1="170" x2="300" y2="100" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="300,100 286,102 290,112" class="dg-stroke-accent"/>
<text x="160" y="155" font-size="13">x+y</text>
<text x="40" y="190" font-size="11" class="dg-dim">‖x+y‖ ≤ ‖x‖+‖y‖ (삼각형 한 변 ≤ 나머지 두 변의 합)</text>
</svg>

_x, y, x+y가 이루는 삼각형에서 한 변의 길이는 나머지 두 변의 합을 넘지 않는다._

## 문제
좌변을 내적으로 전개하면 $\|x+y\|^2 = \langle x+y,x+y\rangle = \|x\|^2 + 2\langle x,y\rangle + $==빈칸== 이다.

## 해설
내적의 쌍선형성으로 <x+y,x+y>를 전개하면 <x,x>+<x,y>+<y,x>+<y,y>가 되는데, 대칭성으로 <x,y>=<y,x>라서 교차항은 2<x,y>가 되고 마지막 항 <y,y>는 정의상 ‖y‖²예요.

**정답: $\|y\|^2$**

## 예시
추상적인 부등식이 실제로 얼마나 여유있게 성립하는지 숫자로 확인해봅니다.

$x=(1,2)$, $y=(3,1)$ 이라 하면 $\|x\|=\sqrt5$, $\|y\|=\sqrt{10}$ 이고 $\langle x,y\rangle=1\cdot3+2\cdot1=5$ 입니다.

코시-슈바르츠 부등식을 확인하면 $|\langle x,y\rangle|=5 \le \|x\|\|y\|=\sqrt{50}=5\sqrt2\approx7.07$ 로 성립합니다.

이제 $x+y=(4,3)$ 이므로 $\|x+y\|=\sqrt{16+9}=5$ 이고, $\|x\|+\|y\|=\sqrt5+\sqrt{10}\approx2.236+3.162=5.398$ 입니다. 실제로 $5\le5.398$ 로 삼각부등식이 성립함을 확인할 수 있습니다.
