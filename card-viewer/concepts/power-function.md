---
slug: power-function
theme: STAT
domainLabel: 추론통계
subLabel: 가설검정 이론
title: 검정력함수: $\beta(\theta)=P_\theta(\text{기각})$와 표본크기의 극한
related: 
---

## 도입
어떤 검정이 좋은 검정인지 판단하려면 그 검정이 각 모수값에서 얼마나 자주 귀무가설을 기각하는지를 모수의 함수로 봐야 합니다. 이것이 검정력함수예요. $\theta$가 귀무가설 영역에 있으면 이 값은 제1종 오류율이고, 대립가설 영역에 있으면 검정력(1에서 제2종 오류율을 뺀 값)이 됩니다. 좋은 검정이라면 표본이 많아질수록 대립가설 하에서 검정력함수가 1에 가까워져야겠죠. 정규분포 평균검정으로 이를 직접 확인해봅니다.

## 명제
검정함수 $\phi$의 검정력함수를 $\beta(\theta)=E_\theta[\phi(X)]=P_\theta(\text{기각})$라 하자. $X_1,\dots,X_n\stackrel{iid}\sim N(\theta,\sigma^2)$ ($\sigma^2$ 기지), $H_0:\theta=\theta_0$ vs $H_1:\theta>\theta_0$, 검정은 $Z=\sqrt n(\bar X-\theta_0)/\sigma>z_\alpha$이면 기각(유의수준 $\alpha$)한다고 하자. 그러면 $$\beta(\theta)=\Phi\!\left(\frac{\sqrt n(\theta-\theta_0)}{\sigma}-z_\alpha\right)$$ 이고, 고정된 $\theta>\theta_0$에 대해 $n\to\infty$일 때 $\beta(\theta)\to1$이다.


## 문제
이제 임의의 참값 $\theta$에서 $\beta(\theta)$를 구해보자. $\theta$ 기준으로 표준화된 통계량은 $\dfrac{\bar X-\theta}{\sigma/\sqrt n}\sim N(0,1)$ (참값이 $\theta$일 때 정확히 표준정규분포)이다. 기각조건 $\sqrt n(\bar X-\theta_0)/\sigma>z_\alpha$의 양변에서 $\sqrt n(\theta-\theta_0)/\sigma$를 빼서 이 표준화된 통계량에 대한 사건으로 바꾸면, $\dfrac{\bar X-\theta}{\sigma/\sqrt n}>$==빈칸==가 된다.

## 해설
$\sqrt n(\bar X-\theta_0)/\sigma>z_\alpha$를 $\sqrt n(\bar X-\theta)/\sigma+\sqrt n(\theta-\theta_0)/\sigma>z_\alpha$로 다시 쓰고 우변으로 $\sqrt n(\theta-\theta_0)/\sigma$를 넘기면 이 식이 나옵니다.

**정답: $z_\alpha - \dfrac{\sqrt n(\theta-\theta_0)}{\sigma}$**

## 예시
$\sigma=1$, $\theta_0=0$, $\alpha=0.05$ (그러면 $z_\alpha=1.645$), 실제로는 $\theta=0.5$인 상황을 생각해봅시다.

$n=16$일 때: $\dfrac{\sqrt{16}\times0.5}{1}=2$ 이므로 $\beta(0.5)=\Phi(2-1.645)=\Phi(0.355)\approx0.639$

$n=64$일 때: $\dfrac{\sqrt{64}\times0.5}{1}=4$ 이므로 $\beta(0.5)=\Phi(4-1.645)=\Phi(2.355)\approx0.991$

표본이 16에서 64로 늘어나기만 해도 검정력이 0.639에서 0.991로 급격히 뛰어오르는 것을 볼 수 있습니다. $n$을 계속 키우면 $\beta(0.5)$는 1에 한없이 가까워집니다.
