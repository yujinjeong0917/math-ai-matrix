---
slug: jeffreys-prior-invariance
theme: PROB
domainLabel: 확률 · 통계
subLabel: 확률의 기초
title: Jeffreys 사전분포의 재매개변수화 불변성
hook: "무정보 사전분포"를 정하려 할 때 흔히 균등분포를 떠올리지만, 문제가 있습니다.
related: 켤레사전분포 3종
---

## 기본설명
모수 $\theta$에 대한 피셔정보를 $I(\theta)=E\big[(\partial_\theta\log f(X;\theta))^2\big]$라 하고 Jeffreys 사전분포를 $\pi(\theta)\propto\sqrt{I(\theta)}$로 정의하자. $\phi=h(\theta)$가 매끄러운 전단사 재매개변수화이면, $\theta$의 Jeffreys 사전분포를 변수변환 공식으로 $\phi$-스케일로 옮긴 것과 $\phi$의 모델로부터 직접 계산한 Jeffreys 사전분포 $\sqrt{I(\phi)}$가 정확히 같다.

## 문제
둘째 방식은 $\phi$를 모수로 둔 모델 $f(x;\theta(\phi))$로부터 피셔정보를 직접 계산하는 것이다. 점수함수의 연쇄법칙 $\partial_\phi\log f(x;\theta(\phi))=\partial_\theta\log f(x;\theta)\cdot\dfrac{d\theta}{d\phi}$를 제곱해 기댓값을 취하면 $I(\phi)=E[(\partial_\phi\log f)^2]=\Big(\dfrac{d\theta}{d\phi}\Big)^2E[(\partial_\theta\log f)^2]=$ $==빈칸==$이다.

## 해설
연쇄법칙으로 점수함수가 $d\theta/d\phi$배만큼 스케일되고, 이를 제곱해 기댓값을 취하면 $(d\theta/d\phi)^2$이 상수로 앞으로 빠져나와 $I(\theta)$에 곱해져요.

**정답: $I(\theta)\Big(\dfrac{d\theta}{d\phi}\Big)^2$**

## 예시
베르누이 모델 $f(x;\theta)=\theta^x(1-\theta)^{1-x}$은 피셔정보 $I(\theta)=\dfrac{1}{\theta(1-\theta)}$를 가지며, Jeffreys 사전분포는 $\pi(\theta)\propto\theta^{-1/2}(1-\theta)^{-1/2}$, 즉 $\mathrm{Beta}(1/2,1/2)$입니다.

이제 분산안정화 변환 $\phi=\arcsin(\sqrt\theta)$로 재매개변수화해 봅시다. $\theta=\sin^2\phi$이므로 $\dfrac{d\theta}{d\phi}=2\sin\phi\cos\phi=\sin(2\phi)$입니다. $\theta=0.5$에서는 $\phi=\pi/4$, $I(\theta)=1/(0.5\cdot0.5)=4$, $d\theta/d\phi=\sin(\pi/2)=1$이므로 $I(\phi)=I(\theta)(d\theta/d\phi)^2=4\cdot1^2=4$입니다.

다른 점 $\theta=0.2$에서도 확인해 봅시다. $\phi=\arcsin(\sqrt{0.2})\approx0.4636$, $I(\theta)=1/(0.2\cdot0.8)=6.25$, $d\theta/d\phi=\sin(2\cdot0.4636)=\sin(0.9273)=0.8$이므로 $I(\phi)=6.25\times0.8^2=6.25\times0.64=4.0$으로 **또다시 정확히 4**가 나옵니다. $\theta$값에 관계없이 $I(\phi)\equiv4$(상수)라는 뜻이며, 이는 $\phi$ 좌표에서 Jeffreys 사전분포가 $\sqrt{I(\phi)}=2$(상수), 즉 균등분포가 됨을 의미합니다.
