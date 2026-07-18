---
slug: found-equation-inequality-review
theme: FOUND
domainLabel: 예비수학
subLabel: 예비수학 1부 · 수학의 언어 · 부등식으로 최적을 증명하기
title: 방정식과 부등식 다시 보기
related: 집합과 명제 · 함수란 무엇인가 · 볼록함수의 1계 조건과 전역 최적성
---

## 도입
방정식은 "정확히 언제 등호가 성립하는가"를 묻고, 부등식은 "어느 범위까지 가능한가"를 물어요. 그런데 최적화 문제 대부분은 사실 부등식 문제예요. "이 값은 항상 이 한계를 넘지 못한다"는 부등식을 보이고, "그 한계에 정확히 도달하는 경우가 있다"는 걸 추가로 보이면, 그 한계가 바로 최댓값(또는 최솟값)이 됩니다.

이 논리를 가장 깔끔하게 보여주는 도구가 산술-기하평균 부등식(AM-GM)이에요. 음이 아닌 두 수 $x,y$에 대해 $\dfrac{x+y}{2}\ge\sqrt{xy}$가 항상 성립하고, 등호는 $x=y$일 때만 성립해요. 이 부등식 하나로 "둘레가 고정된 직사각형 중 넓이가 가장 큰 것은 정사각형이다"라는, 겉보기엔 기하 문제인 것도 증명할 수 있어요.

## 명제
둘레의 절반이 $s>0$으로 고정된 직사각형, 즉 $x+y=s$ ($x,y>0$)를 만족하는 직사각형 중에서 넓이 $A=xy$가 최대가 되는 것은 $x=y=s/2$일 때이며, 그때 최대 넓이는 $A=\dfrac{s^2}{4}$이다.

## 그림
<svg viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="220" x2="440" y2="220" class="dg-line" stroke-width="1.3"/>
<polygon points="440,220 429,215 429,225" class="dg-line"/>
<line x1="40" y1="220" x2="40" y2="30" class="dg-line" stroke-width="1.3"/>
<polygon points="40,30 35,42 45,42" class="dg-line"/>
<path d="M60,210 Q240,45 420,210" fill="none" class="dg-stroke-accent" stroke-width="2.2"/>
<line x1="240" y1="220" x2="240" y2="60" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="40" y1="60" x2="240" y2="60" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<circle cx="240" cy="60" r="4" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="248" y="48" font-size="12">최댓값 s²/4</text>
<text x="232" y="240" font-size="12">x=s/2</text>
<text x="70" y="45" font-size="12" class="dg-dim">A(x)=x(s−x)</text>
</svg>

_x+y=s로 고정하고 넓이 A=xy를 x의 함수로 그리면 x=s/2에서 유일한 최댓값 s²/4를 가진다._

## 문제
상한부터 본다. 임의의 실수는 제곱하면 $0$ 이상이므로 $(\sqrt x-\sqrt y)^2\ge0$이다. 좌변을 전개하면 $x-2\sqrt{xy}+y\ge0$이 되고, 이를 정리하면 $x+y\ge$==빈칸== 이다.

## 해설
x-2√(xy)+y≥0에서 -2√(xy)를 우변으로 넘기면 x+y≥2√(xy)가 돼요. 이게 바로 산술-기하평균 부등식(AM-GM)의 원형이에요.

**정답: $2\sqrt{xy}$**

## 예시
둘레의 절반이 $s=10$으로 고정된 직사각형을 생각해봅니다. $x+y=10$을 만족하는 몇 가지 경우를 넓이로 비교해봅니다.

$x=2,y=8$이면 $A=16$이고, $x=3,y=7$이면 $A=21$, $x=4,y=6$이면 $A=24$, $x=4.5,y=5.5$이면 $A=24.75$가 나와요. $x=5,y=5$(정사각형)이면 $A=25$가 됩니다.

$x$가 $5$에서 멀어질수록 넓이가 점점 줄어들고, $x=y=5$일 때 넓이가 $25=\dfrac{10^2}{4}$로 정확히 최댓값이 나오는 걸 확인할 수 있어요. $x=4.5,y=5.5$처럼 정사각형에 아주 가까워도 넓이는 $24.75$로 딱 $25$에 못 미친다는 점도 눈여겨볼 만해요. 등호는 정말로 $x=y$일 때만 딱 맞아떨어져요.
