---
slug: wald-confidence-interval
theme: STAT
domainLabel: 추론통계
subLabel: 신뢰구간 · 순차분석
title: Wald 신뢰구간: MLE의 점근정규성에서 유도되는 커버리지
hook: 점추정값 하나만으로는 불확실성을 표현할 수 없습니다.
---

## 기본설명
정칙조건 하에서 MLE $\hat\theta_n$은 $\sqrt n(\hat\theta_n-\theta)\xrightarrow{d}N(0,1/I_1(\theta))$를 만족한다 ($I_1$: 관측값 1개당 피셔정보). 추정된 표준오차를 $\widehat{SE}=1/\sqrt{nI_1(\hat\theta_n)}$로 두고 $$CI_n=\big[\hat\theta_n-z_{\alpha/2}\widehat{SE},\ \hat\theta_n+z_{\alpha/2}\widehat{SE}\big]$$ 라 하면, 커버리지 확률 $P_\theta(\theta\in CI_n)$은 $n\to\infty$일 때 $1-\alpha$로 수렴한다.

## 문제
$\widehat{SE}=1/\sqrt{nI_1(\hat\theta_n)}$의 정의를 그대로 대입하면 $W_n=\dfrac{\hat\theta_n-\theta}{\widehat{SE}}=\sqrt n(\hat\theta_n-\theta)\cdot$==빈칸==로 다시 쓸 수 있다.

## 해설
$1/\widehat{SE}=\sqrt{nI_1(\hat\theta_n)}=\sqrt n\cdot\sqrt{I_1(\hat\theta_n)}$이므로, $(\hat\theta_n-\theta)/\widehat{SE}=\sqrt n(\hat\theta_n-\theta)\cdot\sqrt{I_1(\hat\theta_n)}$로 인수분해됩니다.

**정답: $\sqrt{I_1(\hat\theta_n)}$**

## 예시
베르누이 모형 $X_i\sim\text{Bernoulli}(\theta)$, $n=100$, 표본비율 $\hat\theta=0.62$인 상황을 생각합시다. 베르누이의 피셔정보는 $I_1(\theta)=1/(\theta(1-\theta))$이므로 $$\widehat{SE}=\sqrt{\frac{\hat\theta(1-\hat\theta)}{n}}=\sqrt{\frac{0.62\times0.38}{100}}=\sqrt{0.002356}\approx0.0485$$

95% 신뢰구간이면 $z_{0.025}=1.96$이므로 $$CI=0.62\pm1.96\times0.0485\approx0.62\pm0.095=(0.525,\ 0.715)$$

표본크기 $n$이 커질수록 $\widehat{SE}$는 $1/\sqrt n$의 속도로 줄어들어 구간이 좁아지고, 아래에서 보일 논증에 의해 그 구간이 참값 $\theta$를 포함할 확률은 $n\to\infty$일 때 정확히 0.95로 수렴합니다.
