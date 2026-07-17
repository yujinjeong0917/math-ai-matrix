---
slug: cramer-rao-lower-bound
theme: STAT
domainLabel: 추론통계
subLabel: 추정이론
title: 크라메르-라오 하한: 불편추정량 분산의 이론적 하한
hook: 불편추정량을 아무리 잘 설계해도 분산을 무한정 줄일 수는 없습니다.
---

## 기본설명
$X\sim f(x;\theta)$이고 $T(X)$가 $\theta$의 불편추정량, 즉 $E_\theta[T(X)]=\theta$이며 정칙조건이 성립한다고 하자. $I(\theta)=E_\theta\!\left[\left(\frac{\partial}{\partial\theta}\log f(X;\theta)\right)^2\right]$을 피셔정보량이라 하면 $\mathrm{Var}_\theta(T(X))\ge\dfrac{1}{I(\theta)}$ 가 성립한다.

## 문제
불편성 항등식 $E_\theta[T(X)]=\int T(x)f(x;\theta)\,dx=\theta$의 양변을 $\theta$로 미분하면, 좌변은 $\int T(x)\frac{\partial f}{\partial\theta}(x;\theta)\,dx=\int T(x)f(x;\theta)s(x;\theta)\,dx=E_\theta[T(X)s(X;\theta)]$가 되고 우변은 $1$이 된다. 즉 $E_\theta[T(X)s(X;\theta)]=$==빈칸== 이다.

## 해설
θ를 θ로 미분하면 1이죠. 불편성 항등식의 우변이 θ 그 자체이므로 미분하면 1이 남습니다.

**정답: $1$**

## 예시
부등식이 실제로 등호를 이룰 수도 있다는 것을 정규분포 평균 추정 예제로 먼저 확인해봅니다.

$X_1,\ldots,X_n\stackrel{iid}{\sim}N(\mu,\sigma^2)$이고 $\sigma^2$는 알려져 있다고 합시다. $\sigma^2=4$, $n=5$로 두면, 한 관측치의 피셔정보량은 $I_1(\mu)=1/\sigma^2=1/4$이고 $n$개 독립 관측치의 피셔정보량은 $I(\mu)=nI_1(\mu)=n/\sigma^2=5/4=1.25$입니다.

크라메르-라오 하한은 $1/I(\mu)=1/1.25=0.8$입니다. 한편 $T(X)=\bar X$는 $\mu$의 불편추정량이고 $\mathrm{Var}(\bar X)=\sigma^2/n=4/5=0.8$입니다.

즉 $\mathrm{Var}(\bar X)$가 하한과 정확히 $0.8=0.8$로 일치합니다. 표본평균은 정규분포 평균 추정에서 하한을 등호로 달성하는 효율적인 추정량인 것입니다. 아래 증명은 이 하한이 특정 분포만의 우연이 아니라 코시-슈바르츠 부등식으로부터 항상 성립하는 일반적인 사실임을 보입니다.
