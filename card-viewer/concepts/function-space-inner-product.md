---
slug: function-space-inner-product
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: 함수공간의 내적: ⟨f,g⟩=∫f(x)g(x)dx
related: 머서 정리와 커널트릭 · 일반화된 내적과 마할라노비스 거리
---

## 도입
벡터는 화살표만이 아니에요. 함수도 "무한 차원 벡터"로 볼 수 있고, 두 함수를 곱해서 적분한 값을 내적으로 정의하면 함수들 사이에도 각도와 길이, 직교성을 이야기할 수 있게 됩니다. 이 아이디어가 나중에 재생커널힐베르트공간(RKHS)의 출발점이 돼요.

## 명제
$C[a,b]$를 $[a,b]$ 위의 연속함수 전체의 집합이라 하자. $\langle f,g\rangle := \int_a^b f(x)g(x)\,dx$ 로 정의하면 이는 $C[a,b]$ 위의 내적이다(대칭성·쌍선형성·양정치성을 만족한다).

## 그림
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="100" x2="400" y2="100" class="dg-dim" stroke-width="1"/>
<path d="M 30,100 Q 100,30 165,100 Q 230,170 300,100 Q 365,30 400,60" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="55" y="45" font-size="12">f(x)</text>
<path d="M 30,100 Q 100,170 165,100 Q 230,30 300,100 Q 365,170 400,140" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="6,3"/>
<text x="55" y="160" font-size="12">g(x)</text>
<text x="140" y="195" font-size="11" class="dg-dim">양(+) 넓이와 음(-) 넓이가 서로 상쇄되어 ∫f·g dx = 0</text>
</svg>

_두 함수의 곱을 구간에서 적분하면 양의 넓이와 음의 넓이가 상쇄되어 내적이 0(직교)이 될 수 있다._

## 문제
쌍선형성(첫 인자에 대한 선형성): 적분의 선형성에 의해 $\langle cf+f',g\rangle = \int_a^b (cf(x)+f'(x))g(x)\,dx = c\int_a^b f(x)g(x)dx + \int_a^b f'(x)g(x)dx = $==빈칸== 이고, 대칭성과 결합하면 두 번째 인자에 대해서도 선형이다.

## 해설
적분은 합과 상수배에 대해 선형이라, (cf+f')g의 적분을 c·(fg의 적분)과 (f'g의 적분)의 합으로 쪼갤 수 있어요. 그게 바로 정의에 의해 c<f,g>+<f',g>예요.

**정답: $c\langle f,g\rangle + \langle f',g\rangle$**

## 예시
추상적 증명 전에 두 구체적 함수의 내적을 직접 계산해서 정의가 어떻게 작동하는지 봅니다.

$[a,b]=[0,1]$ 위에서 $f(x)=x$, $g(x)=x^2$ 이라 하면 $$\langle f,g\rangle=\int_0^1 x\cdot x^2\,dx=\int_0^1 x^3\,dx=\left.\frac{x^4}{4}\right|_0^1=\frac14$$ 입니다.

양정치성도 확인해봅니다. 항등적으로 0이 아닌 함수 $h(x)=x-\tfrac12$ 에 대해 $$\langle h,h\rangle=\int_0^1\left(x-\frac12\right)^2dx=\frac1{12}\approx0.083>0$$ 로, 실제로 0이 아닌 연속함수의 자기 내적은 양수임을 확인할 수 있습니다.
