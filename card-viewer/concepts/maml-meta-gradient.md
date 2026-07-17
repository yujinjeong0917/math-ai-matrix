---
slug: maml-meta-gradient
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: MAML의 메타그래디언트: 그래디언트를 통한 그래디언트
hook: 빠르게 새로운 과제에 적응하는 모델을 만들고 싶습니다.
related: 혼합편미분의 대칭성(Clairaut/Schwarz)
---

## 기본설명
과제 $T$의 손실 $L_T$에 대해 내부 루프 한 스텝 적응을 $\theta'(\theta):=\theta-\alpha\nabla_\theta L_T(\theta)$ 라 하고, 메타목적함수를 $J(\theta)=L_T(\theta'(\theta))$ 라 하자(적응된 파라미터를 새로운 데이터로 평가). 그러면 $$\nabla_\theta J(\theta) = \Big(I-\alpha\,\nabla^2_\theta L_T(\theta)\Big)\,\nabla_{\theta'} L_T(\theta')\Big|_{\theta'=\theta'(\theta)}$$ 이다. 즉 메타그래디언트는 적응된 지점에서의 그래디언트에 "내부 손실의 헤시안이 반영된 야코비안"을 곱한 것과 같다.

## 문제
다변수 연쇄법칙에 따라 $\nabla_\theta J(\theta) = \left[\dfrac{\partial \theta'(\theta)}{\partial \theta}\right]^{\!\top} \nabla_{\theta'} L_T(\theta')\Big|_{\theta'=\theta'(\theta)}$ 이다. 여기서 $\dfrac{\partial \theta'(\theta)}{\partial \theta}$는 $\theta'$의 각 성분을 $\theta$의 각 성분으로 편미분한 야코비 행렬이다. 즉 ==빈칸== 형태로 쓸 수 있다.

## 해설
벡터값 함수 $\theta'(\theta)$를 통해 스칼라 $J$가 정의되므로, 체인룰은 야코비안의 전치와 바깥 함수 그래디언트의 곱으로 표현됩니다.

**정답: $\nabla_\theta J(\theta) = \left(\frac{\partial \theta'(\theta)}{\partial \theta}\right)^{\!\top} \nabla_{\theta'} L_T(\theta')\Big|_{\theta'=\theta'(\theta)}$**

## 예시
스칼라 파라미터로 직접 계산해서 명제가 맞는지 확인해봅니다.

내부 손실을 $L_T(\theta)=\frac12(\theta-3)^2$ (과제의 목표값이 3), 학습률 $\alpha=0.1$, 시작점 $\theta=0$이라 하자. 내부 그래디언트는 $L_T'(\theta)=\theta-3$이므로 적응된 파라미터는
$$\theta'=0-0.1(0-3)=0.3$$
메타(테스트) 손실은 다른 목표값 5를 쓰는 $L_{\text{test}}(\theta')=\frac12(\theta'-5)^2$ 라 하자. 명제의 공식대로 계산하면, 내부 손실의 헤시안은 상수 $H=L_T''(\theta)=1$ 이고 적응 지점에서의 그래디언트는 $\theta'-5=0.3-5=-4.7$ 이므로
$$\nabla_\theta J = (1-\alpha H)(\theta'-5) = (1-0.1)(-4.7) = -4.23$$
이제 직접 $J(\theta)=\frac12(0.9\theta+0.3-5)^2$ (여기서 $\theta'(\theta)=\theta-0.1(\theta-3)=0.9\theta+0.3$)를 $\theta=0$에서 미분해도 $\frac{dJ}{d\theta}=(0.9\theta+0.3-5)\cdot 0.9\big|_{\theta=0}=(-4.7)(0.9)=-4.23$ 으로 정확히 일치합니다.
