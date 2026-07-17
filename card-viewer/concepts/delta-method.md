---
slug: delta-method
theme: STAT
domainLabel: 추론통계
subLabel: 점근이론
title: 델타법: 변환된 추정량의 점근분포
related: 일치추정량 · 중심극한정리 · Slutsky 정리
---

## 도입
추정량 $\hat\theta_n$의 점근분포를 알고 있다고 해서 $g(\hat\theta_n)$처럼 이를 변환한 값의 점근분포까지 저절로 알 수 있는 것은 아닙니다. 그런데 $g$가 매끄러운 함수이기만 하면 국소적으로 직선(접선)에 가깝게 행동한다는 사실을 이용해, $\hat\theta_n$의 점근분산에 $g'(\theta)^2$만 곱해주면 $g(\hat\theta_n)$의 점근분산을 바로 구할 수 있습니다. 이것이 델타법입니다.

## 명제
$\sqrt n(\hat\theta_n-\theta)\xrightarrow{d}N(0,\sigma^2)$이고 $g$가 $\theta$에서 미분가능하며 $g'(\theta)\ne0$이라 하자. 그러면 $\sqrt n\big(g(\hat\theta_n)-g(\theta)\big)\xrightarrow{d}N\!\left(0,\,g'(\theta)^2\sigma^2\right)$ 이다.


## 문제
$g$가 $\theta$에서 미분가능하므로 $\hat\theta_n$이 $\theta$ 가까이에 있을 때 $g(\hat\theta_n)=g(\theta)+g'(\theta)(\hat\theta_n-\theta)+R_n$ 으로 쓸 수 있고, 여기서 나머지항 $R_n$은 $(\hat\theta_n-\theta)$보다 훨씬 빠르게 $0$에 가까워진다. 이 식을 $g(\hat\theta_n)-g(\theta)$에 대해 정리하면 $g(\hat\theta_n)-g(\theta)=$==빈칸== 이다.

## 해설
테일러전개 식에서 양변에 g(θ)를 이항하면 좌변에 g(θ̂_n)−g(θ)가 남고 우변에는 1차항과 나머지항만 남습니다.

**정답: $g'(\theta)(\hat\theta_n-\theta)+R_n$**

## 예시
추상적인 테일러전개 논증 전에, 변환함수 $g(p)=p^2$를 구체적인 숫자에 적용해 델타법이 무엇을 계산하는지 먼저 확인해봅니다.

$X_1,\ldots,X_n\stackrel{iid}{\sim}\mathrm{Bernoulli}(p)$이면 중심극한정리에 의해 $\sqrt n(\bar X_n-p)\xrightarrow{d}N(0,p(1-p))$입니다. $p=0.3$이면 점근분산은 $p(1-p)=0.3\times0.7=0.21$입니다.

이제 $g(p)=p^2$를 생각하면 $g'(p)=2p$이고 $p=0.3$에서 $g'(0.3)=0.6$입니다. 델타법에 따르면 $\sqrt n(\bar X_n^2-p^2)$의 점근분산은 $g'(p)^2\sigma^2=(0.6)^2\times0.21=0.36\times0.21=0.0756$입니다.

즉 표본평균 대신 그것을 제곱한 값을 쓰더라도, 미분값 $g'(p)=0.6$만큼의 배율로 조정하면 여전히 정규근사를 쓸 수 있다는 것이 델타법이 말해주는 바입니다. 아래 증명은 이 배율 조정이 왜 $g'(\theta)$의 제곱으로 정확히 결정되는지를 테일러전개로 보입니다.
