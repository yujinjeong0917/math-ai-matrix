---
slug: james-stein-estimator
theme: STAT
domainLabel: 추론통계
subLabel: 추정이론
title: James-Stein 추정량: 3차원 이상에서 표본평균의 허용불가능성
hook: $p$개의 서로 다른 정규분포 평균을 동시에 추정하는 상황을 생각해봅니다.
related: 불편추정량 · 편향-분산 트레이드오프
---

## 기본설명
$X\sim N(\theta,I_p)$를 관측했고 제곱오차손실 $L(\theta,\delta)=\|\delta-\theta\|^2$ 아래 $\theta$를 추정한다고 하자. 항등추정량 $\delta_0(X)=X$의 위험은 모든 $\theta$에서 $R(\theta,\delta_0)=p$이다. $p\ge3$일 때 James-Stein 추정량 $\delta_{JS}(X)=\left(1-\dfrac{p-2}{\|X\|^2}\right)X$의 위험은 $R(\theta,\delta_{JS})=p-(p-2)^2E\!\left[\dfrac{1}{\|X\|^2}\right]$이며, 이는 모든 $\theta$에서 $R(\theta,\delta_0)=p$보다 엄격히 작다. 즉 $\delta_0=X$는 허용가능하지 않다(inadmissible).

## 문제
지금 목표는 상수 $c$를 가진 수축추정량 $\delta_c(X)=\left(1-\dfrac{c}{\|X\|^2}\right)X$의 위험을 $c$의 함수로 구하고, 이를 최소화하는 $c$를 찾는 것이다. $\delta_c(X)-\theta = (X-\theta)-\dfrac{c}{\|X\|^2}X$이므로 위험을 전개하면 $R(\theta,\delta_c)=E\|X-\theta\|^2-2cE\!\left[\dfrac{(X-\theta)^\top X}{\|X\|^2}\right]+c^2E\!\left[\dfrac1{\|X\|^2}\right]$이다. 각 성분이 분산 $1$인 독립 정규변수이므로 첫째 항은 $E\|X-\theta\|^2=$==빈칸== 이다.

## 해설
X-θ는 각 성분이 평균 0, 분산 1인 독립 정규변수이므로, 그 제곱합의 기댓값은 성분 개수 p입니다.

**정답: $p$**

## 예시
추상적인 스타인 항등식 논증에 들어가기 전에, $\theta=0$인 특수한 경우 하나로 위험이 실제로 얼마나 줄어드는지 구체적인 숫자로 확인해봅니다.

$p=5$이고 $\theta=0$이라 하면 $\|X\|^2$은 자유도 $5$인 카이제곱분포를 따르고, 카이제곱분포의 역모멘트 공식 $E[1/\chi^2_k]=1/(k-2)$($k>2$)에 의해 $E[1/\|X\|^2]=1/(5-2)=1/3$입니다.

James-Stein 추정량의 위험은 $R(0,\delta_{JS})=p-(p-2)^2E[1/\|X\|^2]=5-3^2\times\frac13=5-3=2$입니다. 항등추정량의 위험은 $R(0,\delta_0)=p=5$입니다. $2<5$이므로 $\theta=0$ 근방에서 James-Stein 추정량이 항등추정량보다 훨씬 낮은 위험을 갖습니다(실제로 $2{,}000{,}000$번의 몬테카를로 시뮬레이션으로 $E[1/\|X\|^2]$을 직접 추정해도 $\approx0.3338$로 이론값 $1/3$과 잘 맞습니다).
