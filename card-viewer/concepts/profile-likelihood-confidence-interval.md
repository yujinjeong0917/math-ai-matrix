---
slug: profile-likelihood-confidence-interval
theme: STAT
domainLabel: 추론통계
subLabel: 신뢰구간 · 순차분석
title: 프로파일우도 신뢰구간: 우도비의 반전
hook: 여러 모수 중 하나($\psi$)에만 관심이 있고 나머지($\lambda$, 성가신모수)는 관심 밖일 때가 많습니다.
---

## 기본설명
$\theta=(\psi,\lambda)$, 프로파일 로그우도 $\ell_p(\psi)=\sup_\lambda\ell(\psi,\lambda)=\ell(\psi,\hat\lambda_\psi)$, 전역 MLE를 $(\hat\psi,\hat\lambda)$라 하자. 정칙조건 하에서 $H_0:\psi=\psi_0$ (단 $\lambda$는 자유) 하에서 $n\to\infty$일 때 $$-2\big[\ell_p(\psi_0)-\ell_p(\hat\psi)\big]\xrightarrow{d}\chi^2_1$$ 이 성립하며 (성가신모수의 차원과 무관하게 자유도는 관심모수의 차원인 1), 따라서 $$CI=\{\psi:-2[\ell_p(\psi)-\ell_p(\hat\psi)]\le\chi^2_{1,1-\alpha}\}$$ 는 근사 신뢰수준 $1-\alpha$의 신뢰구간이다.

## 문제
먼저 $\hat\lambda_\psi$의 정의부터 확인하자: 각 $\psi$에서 $\hat\lambda_\psi$는 $\lambda$에 대한 1차 조건 $\ell_\lambda(\psi,\hat\lambda_\psi)=0$을 만족하도록 정의된다. 연쇄법칙으로 $\ell_p'(\psi)=\ell_\psi(\psi,\hat\lambda_\psi)+\ell_\lambda(\psi,\hat\lambda_\psi)\cdot\dfrac{d\hat\lambda_\psi}{d\psi}$ 인데, 둘째 항의 계수는 $\hat\lambda_\psi$의 정의에 의해 $\ell_\lambda(\psi,\hat\lambda_\psi) = $==빈칸==이므로 둘째 항 전체가 사라지고 $\ell_p'(\psi)=\ell_\psi(\psi,\hat\lambda_\psi)$만 남는다 (포락선정리, envelope theorem).

## 해설
$\hat\lambda_\psi$는 바로 $\ell_\lambda(\psi,\hat\lambda_\psi)=0$이 되도록 정의된 값이므로, 이 항은 $\dfrac{d\hat\lambda_\psi}{d\psi}$가 무엇이든 상관없이 항상 0입니다.

**정답: $0$**

## 예시
$X_1,\dots,X_{10}\stackrel{iid}\sim N(\mu,\sigma^2)$에서 $\mu,\sigma^2$ 모두 미지이고 관심모수는 $\psi=\mu$, 성가신모수는 $\lambda=\sigma^2$라 합시다. 표본평균 $\bar x=5$, (MLE 기준, 분모 $n$인) 표본분산 $s^2=4$입니다.

고정된 $\mu$에서 $\sigma^2$을 최적화하면 $\hat\sigma^2_\mu=\frac1n\sum(x_i-\mu)^2=s^2+(\bar x-\mu)^2$이고, 이를 로그우도에 대입해 정리하면 프로파일 로그우도의 차이는 깔끔한 닫힌 형태로 떨어집니다: $$\ell_p(\mu)-\ell_p(\bar x)=-\frac n2\log\!\Big(1+\frac{(\bar x-\mu)^2}{s^2}\Big)$$

따라서 $-2[\ell_p(\mu_0)-\ell_p(\bar x)]=n\log\big(1+(\mu_0-\bar x)^2/s^2\big)$ 입니다. $\mu_0=3$을 대입하면 $n\log(1+4/4)=10\log2\approx6.93$인데, $\chi^2_{1,0.95}=3.841$보다 크므로 $\mu_0=3$은 95% 신뢰구간 밖입니다.

경계는 $10\log(1+(\mu-5)^2/4)=3.841$을 풀면 되는데, $\log(1+(\mu-5)^2/4)=0.3841$, $(\mu-5)^2/4=e^{0.3841}-1\approx0.4684$, $(\mu-5)^2\approx1.874$, $\mu-5\approx\pm1.369$이므로 $$CI\approx(3.63,\ 6.37)$$ 이 됩니다.
