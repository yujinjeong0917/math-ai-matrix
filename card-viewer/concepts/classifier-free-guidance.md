---
slug: classifier-free-guidance
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: Classifier-Free Guidance: 별도 분류기 없이 조건부 생성을 더 선명하게 만들기
hook: classifier-guidance에서는 무조건부 스코어에 별도로 학습한 분류기의 그래디언트를 더해서 조건부 생성을 유도했습니다.
---

## 기본설명
$p_w(x|y)\propto p(x|y)^w p(x)^{1-w}$로 정의된 분포의 스코어는 $\nabla_x\log p_w(x|y) = \nabla_x\log p(x) + w\left(\nabla_x\log p(x|y)-\nabla_x\log p(x)\right)$ 이고 이는 잡음예측 공간에서 $\epsilon_w(x,y) = \epsilon(x) + w\left(\epsilon(x,y)-\epsilon(x)\right)$ 와 정확히 같은 형태다.

## 문제
이 정규화된 분포에 로그를 씌우면 곱은 합으로 나눗셈은 뺄셈으로 바뀐다. $\log p_w(x|y) = w\log p(x|y) + (1-w)\log p(x) - $==빈칸== 이다.

## 해설
정의의 분모 $Z(y)$에 로그를 씌우면 부호가 반대로 붙어 빼는 항이 된다. 분자의 두 거듭제곱은 로그를 통해 각각 계수 $w$와 $1-w$가 곱해진 덧셈으로 풀린다.

**정답: $\log Z(y)$**

## 예시
추상적인 스코어 공식을 보기 전에 구체적인 두 가우시안으로 거듭제곱 분포의 스코어가 정말 두 스코어의 선형결합인지 확인해봅니다. $p(x)=N(x;0,1)$, $p(x|y)=N(x;2,1)$이고 $w=3$을 씁니다.

각 스코어를 $x=1$에서 계산합니다. $\nabla_x\log p(x)=-x$이므로 $-1$이고 $\nabla_x\log p(x|y)=-(x-2)=2-x$이므로 $1$입니다.
$$\nabla_x\log p(x) + w\left(\nabla_x\log p(x|y)-\nabla_x\log p(x)\right) = -1+3\times(1-(-1)) = -1+6=5$$
이제 $p_w(x|y)\propto p(x|y)^3p(x)^{-2}$를 직접 로그미분해서 검산합니다. $\log p_w(x|y) = w\log p(x|y)+(1-w)\log p(x)+\text{const} = -\frac{w}{2}(x-2)^2-\frac{1-w}{2}x^2+\text{const}$이고 이를 $x$로 미분하면 $-w(x-2)-(1-w)x=2w-x$가 됩니다. $w=3,x=1$을 넣으면 $2\times3-1=5$로 방금 얻은 값과 정확히 일치합니다.

이제 실제 디퓨전 샘플링에서 쓰는 잡음예측 값으로도 같은 외삽식을 확인해봅니다. 무조건부 예측이 $\epsilon(x)=0.5$, 조건부 예측이 $\epsilon(x,y)=1.2$, guidance 강도가 $w=3$이라 하면 다음과 같습니다.
$$\epsilon_w(x,y)=\epsilon(x)+w(\epsilon(x,y)-\epsilon(x))=0.5+3\times(1.2-0.5)=0.5+2.1=2.6$$
$w=1$이면 그냥 조건부 예측 $\epsilon(x,y)=1.2$ 그대로이고 $w=3$으로 키우자 예측이 $2.6$까지 밀려나 조건부 방향으로 원래보다 더 강하게 밀어붙입니다. 아래 증명은 이 외삽식이 왜 거듭제곱으로 뾰족해진 분포 $p_w(x|y)$에서 샘플링하는 것과 정확히 같은지 일반적으로 보입니다.
