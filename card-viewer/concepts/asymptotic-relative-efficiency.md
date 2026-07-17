---
slug: asymptotic-relative-efficiency
theme: STAT
domainLabel: 추론통계
subLabel: 점근이론
title: 점근적 상대효율(ARE): 표본평균과 표본중앙값 중 누가 더 효율적인가
hook: 같은 모수를 추정하는 두 일치추정량이 있다면, 어느 쪽이 더 적은 표본으로 더 정밀한 추정을 하는지 비교하고 싶어집니다.
---

## 기본설명
같은 모수를 추정하는 두 일치추정량이 있다면, 어느 쪽이 더 적은 표본으로 더 정밀한 추정을 하는지 비교하고 싶어집니다. 두 추정량 모두 점근적으로 정규분포를 따른다면 점근분산의 비율이 바로 그 답을 줍니다. 점근분산이 작은 쪽이 더 효율적인 추정량입니다.

**명제(정의).** $\sqrt n(\hat\theta_1-\theta)\xrightarrow{d}N(0,\sigma_1^2)$이고 $\sqrt n(\hat\theta_2-\theta)\xrightarrow{d}N(0,\sigma_2^2)$이면, $\hat\theta_1$의 $\hat\theta_2$에 대한 점근적 상대효율은 $\mathrm{ARE}(\hat\theta_1,\hat\theta_2)=\sigma_2^2/\sigma_1^2$로 정의한다. $\mathrm{ARE}>1$이면 $\hat\theta_1$이 더 효율적이다.

**명제(적용).** $X_1,\ldots,X_n\stackrel{iid}{\sim}N(\mu,\sigma^2)$일 때 표본평균 $\bar X_n$과 표본중앙값 $\tilde M_n$을 비교하면 $\mathrm{ARE}(\bar X_n,\tilde M_n)=\pi/2\approx1.5708$이다.

## 문제
$X\sim N(\mu,\sigma^2)$의 밀도는 $f(x)=\dfrac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\dfrac{(x-\mu)^2}{2\sigma^2}\right)$이다. 정규분포는 대칭이므로 중앙값이 평균과 같아 $m=\mu$이고, 이 점에서 지수부가 $0$이 되어 $f(\mu)=$==빈칸== 이다.

## 해설
x=μ를 대입하면 지수 안의 (x−μ)²이 0이 되어 exp(0)=1이 되고, 앞의 상수 1/(σ√(2π))만 남습니다.

**정답: $\dfrac{1}{\sigma\sqrt{2\pi}}$**

## 예시
일반적인 순서통계량 이론에 따르면, 모집단 밀도 $f$와 모집단 중앙값 $m$에 대해 표본중앙값은 $\sqrt n(\tilde M_n-m)\xrightarrow{d}N\!\left(0,\dfrac{1}{4f(m)^2}\right)$을 만족한다는 것이 알려져 있습니다 (이 결과 자체는 순서통계량의 점근론에서 유도되며 여기서는 주어진 사실로 사용합니다).

표준정규분포 $N(0,1)$이라 하면 $\mu=m=0$이고 밀도값은 $f(0)=\dfrac{1}{\sqrt{2\pi}}\approx0.3989$입니다. 그러면 $f(0)^2=\dfrac{1}{2\pi}\approx0.1592$이고, 표본중앙값의 점근분산은 $\dfrac{1}{4f(0)^2}=\dfrac{1}{4\times0.1592}\approx\dfrac{1}{0.6366}\approx1.5708$입니다.

표본평균의 점근분산은 중심극한정리에 의해 그냥 $\sigma^2=1$입니다. 따라서 $\mathrm{ARE}(\bar X_n,\tilde M_n)=\dfrac{1.5708}{1}\approx1.5708=\pi/2$로, 표본평균이 표본중앙값보다 약 $1.57$배 더 효율적입니다. 거꾸로 말하면 표본중앙값으로 표본평균과 같은 정밀도를 얻으려면 표본을 약 $1.57$배 더 모아야 합니다.
