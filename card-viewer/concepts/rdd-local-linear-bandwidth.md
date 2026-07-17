---
slug: rdd-local-linear-bandwidth
theme: CAUSAL
domainLabel: 인과추론
subLabel: 실험 설계 확장
title: 회귀불연속의 국소선형추정: 대역폭과 편향-분산 트레이드오프
related: 회귀불연속설계(RDD) · 이중차분법 · 이중강건추정
---

## 도입
샤프 RDD는 임계점 좌우 극한의 차이 $\tau_{SRD}=\lim_{x\downarrow c}E[Y\mid X=x]-\lim_{x\uparrow c}E[Y\mid X=x]$ 로 식별된다는 것을 이미 알고 있습니다. 문제는 이 극한을 유한한 데이터로 실제로 '어떻게' 추정하느냐입니다. 임계점 근방의 관측치만 골라 좌우 각각 직선을 적합하는 국소선형회귀(local linear regression)가 실무 표준인데, 이때 '근방'을 얼마나 넓게(대역폭 $h$) 잡을지가 추정의 품질을 좌우합니다 — 너무 좁히면 관측치가 적어 분산이 커지고, 너무 넓히면 임계점에서 멀리 떨어진, 곡률이 다른 구간까지 섞여 편향이 커집니다.

## 명제
$\mu(x):=E[Y\mid X=x]$가 $x=c$ 근방에서 두 번 연속미분가능하다고 하자. 대역폭 $h$의 국소선형회귀로 얻은 한쪽 극한 추정량의 (조건부) 편향과 분산이 $\mathrm{Bias}(h)\approx B\,\mu''(c)\,h^2$, $\mathrm{Var}(h)\approx \dfrac{V\sigma^2}{nh}$(단, $B,V$는 커널·설계에 의해 정해지는 상수, $\sigma^2$는 $X=c$ 근방 조건부분산, $n$은 표본크기)로 근사된다면, 평균제곱오차 $\mathrm{MSE}(h)=\mathrm{Bias}(h)^2+\mathrm{Var}(h)$를 최소화하는 대역폭은 $h^*\propto n^{-1/5}$ 이다.


## 문제
가정에 따라 $\mathrm{MSE}(h) = \mathrm{Bias}(h)^2+\mathrm{Var}(h) = $==빈칸== 이다.

## 해설
$\mathrm{Bias}(h)\approx B\mu''(c)h^2$를 제곱하면 $h^2$가 $h^4$이 되고, 여기에 분산 항을 그대로 더하면 돼요.

**정답: $B^2\mu''(c)^2h^4+\dfrac{V\sigma^2}{nh}$**

## 예시
구체적인 상수 $B^2\mu''(c)^2=1$, $V\sigma^2=4$(임의의 단위)를 대입해 표본크기에 따라 $\mathrm{MSE}(h)=h^4+4/(nh)$가 어떻게 최소화되는지 확인해보자.

$n=100$: 최적 $h^*\approx0.398$, 최소 $\mathrm{MSE}^*\approx0.126$
$n=1000$: 최적 $h^*\approx0.251$, 최소 $\mathrm{MSE}^*\approx0.0199$
$n=10000$: 최적 $h^*\approx0.159$, 최소 $\mathrm{MSE}^*\approx0.00316$

$n=1000$을 고정하고 $h$만 바꿔보면 트레이드오프가 뚜렷이 보인다.

$h=0.02$(너무 좁음): 편향$^2\approx0.0000002$, 분산$\approx0.200$, $\mathrm{MSE}\approx0.200$ — 분산이 압도적
$h=0.251$(최적): 편향$^2\approx0.00398$, 분산$\approx0.0159$, $\mathrm{MSE}\approx0.0199$
$h=0.30$(너무 넓음): 편향$^2\approx0.0081$, 분산$\approx0.0133$, $\mathrm{MSE}\approx0.0214$ — 편향이 다시 지배하기 시작

$h$가 너무 작을 때는 분산 항 $4/(nh)$이 지배하고, $h$가 너무 클 때는 편향 항 $h^4$이 지배하며, 그 사이 어딘가에서 둘의 합이 최소가 된다는 것을 표로 확인할 수 있다.
