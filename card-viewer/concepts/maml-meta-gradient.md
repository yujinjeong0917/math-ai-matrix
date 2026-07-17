---
slug: maml-meta-gradient
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: MAML의 메타그래디언트: 그래디언트를 통한 그래디언트
related: 혼합편미분의 대칭성(Clairaut/Schwarz)
---

## 도입
빠르게 새로운 과제에 적응하는 모델을 만들고 싶습니다. MAML(Model-Agnostic Meta-Learning)의 아이디어는, "몇 번의 경사하강 스텝만 밟아도 잘 적응하는 초기점 $\theta$"를 직접 학습하자는 것입니다. 그런데 이 목표를 최적화하려면, 내부 루프의 경사하강 스텝 자체가 $\theta$의 함수이므로 그 스텝을 통과해서 미분해야 합니다. 즉 그래디언트 안에 또 그래디언트가 들어있는 연쇄법칙 문제가 됩니다.

## 명제
과제 $T$의 손실 $L_T$에 대해 내부 루프 한 스텝 적응을 $\theta'(\theta):=\theta-\alpha\nabla_\theta L_T(\theta)$ 라 하고, 메타목적함수를 $J(\theta)=L_T(\theta'(\theta))$ 라 하자(적응된 파라미터를 새로운 데이터로 평가). 그러면 $$\nabla_\theta J(\theta) = \Big(I-\alpha\,\nabla^2_\theta L_T(\theta)\Big)\,\nabla_{\theta'} L_T(\theta')\Big|_{\theta'=\theta'(\theta)}$$ 이다. 즉 메타그래디언트는 적응된 지점에서의 그래디언트에 "내부 손실의 헤시안이 반영된 야코비안"을 곱한 것과 같다.

## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<circle cx="280" cy="140" r="90" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="3,3"/>
<circle cx="280" cy="140" r="6" class="dg-accent"/>
<text x="280" y="160" font-size="12" text-anchor="middle">θ (메타 초기점)</text>
<path d="M280,140 L150,55" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="150,55 158,68 165,58" class="dg-stroke-accent"/>
<text x="115" y="45" font-size="11" text-anchor="middle">θ'_1 (과제 1)</text>
<path d="M280,140 L440,55" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="440,55 428,58 435,68" class="dg-stroke-accent"/>
<text x="475" y="45" font-size="11" text-anchor="middle">θ'_2 (과제 2)</text>
<path d="M280,140 L230,235" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="230,235 234,222 244,228" class="dg-stroke-accent"/>
<text x="210" y="252" font-size="11" text-anchor="middle">θ'_3 (과제 3)</text>
</svg>

_메타 초기점에서 각 과제로 몇 스텝 적응한 지점들로 향하는 메타그래디언트 방향._

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
