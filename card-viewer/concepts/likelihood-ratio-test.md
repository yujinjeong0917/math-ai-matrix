---
slug: likelihood-ratio-test
theme: STAT
domainLabel: 추론통계
subLabel: 가설검정 이론
title: 우도비검정과 Wilks 정리: $-2\log\Lambda \to \chi^2$
hook: 복잡한 모형에서 두 모형(제약된 귀무모형 vs 전체모형)의 적합도를 비교할 표준화된 척도가 필요합니다.
related: 
---

## 기본설명
정칙조건을 만족하는 모수 $\theta\in\mathbb R$의 로그우도 $\ell_n(\theta)$와 MLE $\hat\theta_n$에 대해, 단순귀무가설 $H_0:\theta=\theta_0$ 하에서 $n\to\infty$일 때 $$-2\log\Lambda_n = 2\big[\ell_n(\hat\theta_n)-\ell_n(\theta_0)\big] \xrightarrow{d} \chi^2_1$$ 이다 (모수가 $p$차원이고 $r$개의 제약이 있는 일반적인 경우에는 자유도가 $r$인 카이제곱분포로 일반화된다).

## 문제
$\ell_n(\theta_0)$을 $\hat\theta_n$ 주변에서 2차항까지 전개하면 $\ell_n(\theta_0)=\ell_n(\hat\theta_n)+\ell_n'(\hat\theta_n)(\theta_0-\hat\theta_n)+\frac12\ell_n''(\hat\theta_n)(\theta_0-\hat\theta_n)^2+o_p(1)$ 인데, $\hat\theta_n$이 MLE이므로 $\ell_n'(\hat\theta_n)=$==빈칸==이고 따라서 1차항이 통째로 사라진다.

## 해설
MLE $\hat\theta_n$은 정의상 스코어방정식 $\ell_n'(\hat\theta_n)=0$의 해입니다. 로그우도가 그 최댓값(내부점)에서 미분가능하면 1차 조건은 항상 0입니다.

**정답: $0$**

## 예시
지수분포 관측값 $n=25$개, 표본평균 $\bar x=1.2$인 자료에서 $H_0:\lambda=1$을 검정한다고 합시다. 지수분포의 로그우도는 $\ell_n(\lambda)=n\log\lambda-\lambda n\bar x$이고, MLE는 $\hat\lambda_n=1/\bar x=1/1.2\approx0.8333$입니다.

대입하면 $$\ell_n(\hat\lambda_n)-\ell_n(1)=n\big[\log\hat\lambda_n+\bar x(1-\hat\lambda_n)\big]=25\big[\log(0.8333)+1.2\times0.1667\big]$$

$\log(0.8333)\approx-0.1823$, $1.2\times0.1667\approx0.2$이므로 대괄호 안은 약 $0.0177$이고, 전체는 $25\times0.0177\approx0.442$입니다. 따라서 $-2\log\Lambda_n\approx2\times0.442=0.885$인데, $\chi^2_1$의 5% 임계값은 $3.841$이므로 이 자료는 $H_0:\lambda=1$을 기각할 근거가 부족합니다.
