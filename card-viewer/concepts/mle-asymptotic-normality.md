---
slug: mle-asymptotic-normality
theme: STAT
domainLabel: 추론통계
subLabel: 추정이론
title: MLE의 점근적 정규성: 표본이 커지면 정규분포로 수렴한다
hook: 최대우도추정량은 표본이 유한할 때는 정확한 분포를 알기 어려운 경우가 많습니다.
related: 최대우도추정(MLE) · 크라메르-라오 하한
---

## 기본설명
$X_1,\ldots,X_n$이 밀도(또는 확률질량) $f(x;\theta)$에서 독립적으로 뽑힌 표본이고 $\theta_0$가 참값이라 하자. 적절한 정칙조건(미분과 적분의 순서 교환 가능, 피셔정보량 $I(\theta)=E\!\left[\left(\frac{\partial}{\partial\theta}\log f(X;\theta)\right)^2\right]$이 존재하고 양수) 아래에서 MLE $\hat\theta_n$은 $\sqrt n(\hat\theta_n-\theta_0)\xrightarrow{d} N\!\left(0,\,I(\theta_0)^{-1}\right)$ 를 만족한다.

## 문제
점수함수는 평균이 0이라는 중요한 성질을 가진다. 밀도의 적분이 항상 $1$이라는 사실 $\int f(x;\theta)\,dx=1$의 양변을 $\theta$로 미분하면 $\int\frac{\partial f}{\partial\theta}(x;\theta)\,dx=0$을 얻고, $\frac{\partial f}{\partial\theta}=f\cdot s$이므로 이는 $\int s(x;\theta)f(x;\theta)\,dx=E_\theta[s(X;\theta)]$와 같다. 따라서 $E_{\theta_0}[s(X;\theta_0)]=$==빈칸== 이다.

## 해설
정칙조건 아래서는 적분과 미분의 순서를 바꿀 수 있어요. 밀도의 전체 적분은 항상 1로 고정되어 있으니 그 미분은 0이고, 이를 점수함수의 기댓값으로 바꿔 쓰면 정확히 0이 나옵니다.

**정답: $0$**

## 예시
추상적인 테일러전개 논증에 들어가기 전에, 계산이 쉬운 베르누이 분포에서 피셔정보량과 점근분산이 실제로 무엇을 의미하는지 먼저 확인해봅니다.

$X_i\sim\mathrm{Bernoulli}(p)$ 이면 로그가능도는 $\log f(x;p)=x\log p+(1-x)\log(1-p)$이고, 점수함수는 $s(x;p)=\frac{x}{p}-\frac{1-x}{1-p}$, 이를 한 번 더 미분하면 $s'(x;p)=-\frac{x}{p^2}-\frac{1-x}{(1-p)^2}$입니다.

피셔정보량은 $I(p)=E[-s'(X;p)]=\frac{E[X]}{p^2}+\frac{E[1-X]}{(1-p)^2}=\frac{p}{p^2}+\frac{1-p}{(1-p)^2}=\frac{1}{p}+\frac{1}{1-p}=\frac{1}{p(1-p)}$입니다.

$p=0.3$이라는 구체적인 값을 넣어보면 $I(0.3)=\frac{1}{0.3\times0.7}=\frac{1}{0.21}\approx4.762$이고, 명제에 따른 점근분산은 $I(0.3)^{-1}=0.21$입니다.

실제로 베르누이 분포의 MLE는 표본평균 $\hat p=\bar X$이고, 중심극한정리에 의해 $\sqrt n(\bar X-p)\xrightarrow{d}N(0,p(1-p))$가 이미 알려져 있습니다. $p=0.3$일 때 $p(1-p)=0.21$로 방금 구한 $I(p)^{-1}$과 정확히 같습니다. 즉 이 경우 MLE의 점근적 정규성 정리는 익숙한 중심극한정리와 정확히 같은 결론을 줍니다. 아래 증명은 이 일치가 우연이 아니라 스코어함수의 테일러전개로부터 일반적으로 성립함을 보입니다.
