---
slug: backprop
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 역전파(체인룰)의 정확성
hook: 신경망은 여러 층을 겹겹이 쌓은 합성함수예요.
related: 
---

## 기본설명
$h=Wx$, $z=g(h)$, $L=f(z)$일 때 $\frac{\partial L}{\partial W}$는 체인룰로 세 항의 곱으로 분해된다.

## 문제
합성함수를 미분할 땐 체인룰을 쓴다. 바깥 함수를 먼저 미분하고 안쪽 함수의 미분을 곱해나가는 규칙이다. $L$은 $z$를 통해서만 $W$에 의존한다. 그러니 가장 바깥쪽부터 한 겹을 벗겨내면 $\frac{\partial L}{\partial W} = \frac{\partial L}{\partial z}\cdot$==빈칸== 이다.

## 해설
$L=f(z)$이고 $z$가 $W$에 의존한다. 체인룰의 첫 단계는 $L$이 $z$에 대해 변하는 정도와 $z$가 $W$에 대해 변하는 정도를 곱하는 것이다. 즉 $\frac{\partial L}{\partial z}\cdot\frac{\partial z}{\partial W}$예요.

**정답: $\frac{\partial z}{\partial W}$**

## 예시
세 겹으로 합성된 함수를 직접 숫자로 미분해보면 체인룰이 정말로 세 조각의 곱으로 딱 떨어지는지 눈으로 확인할 수 있습니다.

$W=2$, $x=3$으로 두면 $h=Wx=6$입니다. $z=g(h)=h^2$로 두면 $z=36$이고, $L=f(z)=5z$로 두면 $L=180$입니다.

세 조각을 각각 미분합니다. $\frac{\partial L}{\partial z}=5$이고 $\frac{\partial z}{\partial h}=2h=12$이고 $\frac{\partial h}{\partial W}=x=3$입니다.

체인룰대로 세 조각을 곱하면 다음과 같습니다.
$$\frac{\partial L}{\partial W}=5\times12\times3=180$$
이 값이 맞는지는 $L$을 $W$만의 식으로 직접 풀어서도 확인할 수 있습니다. $L=5(Wx)^2=5W^2x^2$이므로 $\frac{\partial L}{\partial W}=10Wx^2=10\times2\times9=180$입니다. 세 조각을 따로 곱한 값과 정확히 같습니다.

아래 증명은 이렇게 세 조각으로 쪼개는 방식이 특정 함수에서만 통하는 게 아니라 합성함수라면 항상 성립하는 체인룰의 일반적인 결과임을 보입니다.
