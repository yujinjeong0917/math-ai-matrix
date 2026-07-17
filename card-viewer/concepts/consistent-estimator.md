---
slug: consistent-estimator
theme: STAT
domainLabel: 추론통계
subLabel: 점근이론
title: 일치추정량: 표본이 커지면 확률적으로 참값에 다가간다
related: 중심극한정리 · 델타법
---

## 도입
불편성은 표본 하나하나에 대한 평균적 정확성을 이야기하지만, 표본크기를 늘렸을 때 추정값이 실제로 참값에 가까워지는지는 별개의 문제입니다. 이를 보장하는 성질이 일치성입니다. 표본이 커질수록 추정값이 참값에서 벗어날 확률이 0으로 사라진다는 뜻입니다.

**명제(정의).** 추정량열 $\hat\theta_n$이 $\theta$에 대해 일치추정량이라는 것은, 임의의 $\varepsilon>0$에 대해 $\lim_{n\to\infty}P(|\hat\theta_n-\theta|\ge\varepsilon)=0$ 이라는 뜻이며 이를 $\hat\theta_n\xrightarrow{p}\theta$로 표기한다. $X_1,\ldots,X_n$이 평균 $\mu$, 분산 $\sigma^2<\infty$인 분포에서 독립적으로 뽑힌 표본이면 표본평균 $\bar X_n$은 $\mu$의 일치추정량이다.

## 명제



## 문제
이전 항목에서 확인했듯 $E[\bar X_n]=\mu$이고 독립성에 의해 $\mathrm{Var}(\bar X_n)=\mathrm{Var}\!\left(\frac{1}{n}\sum_{i=1}^n X_i\right)=\frac{1}{n^2}\sum_{i=1}^n\mathrm{Var}(X_i)=\frac{1}{n^2}\cdot n\sigma^2=$==빈칸== 이다.

## 해설
n²으로 나누고 nσ²을 곱하면 σ²/n이 남습니다. 표본평균의 분산은 개별 관측치 분산을 표본크기로 나눈 값입니다.

**정답: $\dfrac{\sigma^2}{n}$**

## 예시
체비셰프 부등식이 주는 상한이 표본크기와 함께 실제로 얼마나 빨리 줄어드는지 숫자로 확인해봅니다.

$\sigma^2=4$, 오차허용범위 $\varepsilon=1$이라 하면 체비셰프 부등식이 주는 상한은 $P(|\bar X_n-\mu|\ge1)\le\dfrac{\sigma^2}{n\varepsilon^2}=\dfrac{4}{n}$입니다.

$n=100$이면 상한은 $4/100=0.04$이고, $n=10000$이면 상한은 $4/10000=0.0004$입니다. 표본크기를 100배 늘리자 확률의 상한이 100배 줄어들며 0에 가까워지는 것을 볼 수 있습니다.

$\varepsilon$을 얼마나 작게 잡아도 $n$을 충분히 크게 하면 이 상한을 원하는 만큼 0에 가깝게 만들 수 있다는 것이 아래 증명의 핵심입니다.
