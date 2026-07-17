---
slug: function-space-inner-product
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: 함수공간의 내적: ⟨f,g⟩=∫f(x)g(x)dx
hook: 벡터는 화살표만이 아니에요.
---

## 기본설명
$C[a,b]$를 $[a,b]$ 위의 연속함수 전체의 집합이라 하자. $\langle f,g\rangle := \int_a^b f(x)g(x)\,dx$ 로 정의하면 이는 $C[a,b]$ 위의 내적이다(대칭성·쌍선형성·양정치성을 만족한다).

## 문제
쌍선형성(첫 인자에 대한 선형성): 적분의 선형성에 의해 $\langle cf+f',g\rangle = \int_a^b (cf(x)+f'(x))g(x)\,dx = c\int_a^b f(x)g(x)dx + \int_a^b f'(x)g(x)dx = $==빈칸== 이고, 대칭성과 결합하면 두 번째 인자에 대해서도 선형이다.

## 해설
적분은 합과 상수배에 대해 선형이라, (cf+f')g의 적분을 c·(fg의 적분)과 (f'g의 적분)의 합으로 쪼갤 수 있어요. 그게 바로 정의에 의해 c<f,g>+<f',g>예요.

**정답: $c\langle f,g\rangle + \langle f',g\rangle$**

## 예시
추상적 증명 전에 두 구체적 함수의 내적을 직접 계산해서 정의가 어떻게 작동하는지 봅니다.

$[a,b]=[0,1]$ 위에서 $f(x)=x$, $g(x)=x^2$ 이라 하면 $$\langle f,g\rangle=\int_0^1 x\cdot x^2\,dx=\int_0^1 x^3\,dx=\left.\frac{x^4}{4}\right|_0^1=\frac14$$ 입니다.

양정치성도 확인해봅니다. 항등적으로 0이 아닌 함수 $h(x)=x-\tfrac12$ 에 대해 $$\langle h,h\rangle=\int_0^1\left(x-\frac12\right)^2dx=\frac1{12}\approx0.083>0$$ 로, 실제로 0이 아닌 연속함수의 자기 내적은 양수임을 확인할 수 있습니다.
