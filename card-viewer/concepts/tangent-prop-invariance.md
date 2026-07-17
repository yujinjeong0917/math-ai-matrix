---
slug: tangent-prop-invariance
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 기하 · 측도
title: Tangent Prop: 매니폴드 접선 방향의 불변성 정칙화
related: 풀링과 근사적 이동불변성
---

## 도입
이미지를 살짝 회전하거나 평행이동해도 "같은 숫자"라는 사실은 바뀌지 않아야 합니다. 이런 변환을 딥러닝 모델에 직접 가르치는 대신, 변환이 만드는 국소적인 방향(접선 벡터)으로 모델 출력이 얼마나 민감한지를 재서 그 민감도를 0에 가깝게 누르는 방법이 있습니다. 이것이 Tangent Prop입니다.

## 명제
$s(x,\alpha)$를 $s(x,0)=x$를 만족하는 매끄러운 변환족(회전, 평행이동 등)이라 하고 $\tau(x) = \left.\dfrac{\partial s}{\partial\alpha}(x,\alpha)\right|_{\alpha=0}$을 그 접선 벡터라 하자. 만약 미분가능한 함수 $f:\mathbb{R}^n\to\mathbb{R}$가 $\alpha=0$ 근방의 모든 $\alpha$에 대해 $f(s(x,\alpha))=f(x)$ (변환에 대해 완전히 불변)를 만족하면, 반드시 $\nabla f(x)^\top \tau(x) = 0$이 성립한다. 역으로 완전한 불변이 아니더라도 $(\nabla f(x)^\top\tau(x))^2$을 손실에 정칙화항으로 더해 훈련하면 $f(s(x,\alpha)) - f(x) = O(\alpha^2)$ 수준으로 1차 민감도를 억제할 수 있다.


## 문제
$f$가 이 변환에 완전히 불변이라 하자: 모든 (충분히 작은) $\alpha$에 대해 $f(s(x,\alpha)) = f(x)$. $g(\alpha) := f(s(x,\alpha))$로 정의하면 $g(\alpha)$는 $\alpha$에 무관하게 항상 $f(x)$라는 상수값을 가지므로, 미분하면 $g'(\alpha) = $==빈칸== 이다 (모든 $\alpha$에서).

## 해설
상수 함수의 도함수는 항상 0이에요. g(α)=f(x)는 α에 의존하지 않는 상수이기 때문이에요.

**정답: $0$**

## 예시
구체적으로 2차원 평면에서 각도 $\alpha$만큼 회전하는 변환 $s(x,y,\alpha) = (x\cos\alpha - y\sin\alpha,\ x\sin\alpha + y\cos\alpha)$를 생각합니다. 이 변환의 접선 벡터는 $\alpha=0$에서의 미분입니다.
$$\tau(x,y) = \left.\frac{\partial}{\partial\alpha}(x\cos\alpha-y\sin\alpha,\ x\sin\alpha+y\cos\alpha)\right|_{\alpha=0} = (-y,\ x)$$
점 $(x,y)=(2,1)$에서는 $\tau(2,1)=(-1,2)$입니다.

이제 두 함수로 명제를 확인해봅니다. 회전에 대해 불변인 함수 $f(x,y)=x^2+y^2$(원점으로부터 거리 제곱)의 경우 $\nabla f = (2x,2y)$이므로 $\tau^\top\nabla f = -y(2x) + x(2y) = 0$이 항상 성립합니다 — 명제가 예측한 그대로입니다.

반면 회전에 대해 불변이 아닌 함수 $f(x,y)=x$의 경우 $\nabla f=(1,0)$이므로 $\tau^\top\nabla f = -y(1) + x(0) = -y$인데, 이는 $y=0$이 아닌 한 $0$이 아닙니다. 실제로 $(2,1)$을 조금 회전시키면 $x$좌표 값이 바뀌므로 $f$가 불변이 아니라는 사실과 정확히 일치합니다.
