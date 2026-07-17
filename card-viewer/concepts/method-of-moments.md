---
slug: method-of-moments
theme: STAT
domainLabel: 추론통계
subLabel: 추정이론
title: 적률법 추정량: 모집단 적률과 표본 적률을 맞바꾸는 방법
hook: 모수 $\theta$를 추정하는 가장 오래된 방법 중 하나는 최대우도법보다 단순합니다.
related: 최대우도추정(MLE)
---

## 기본설명
모수 $\theta=(\theta_1,\ldots,\theta_k)$를 가진 분포의 $j$차 적률이 $\mu_j(\theta)=E_\theta[X^j]$이고, 사상 $g:\theta\mapsto(\mu_1(\theta),\ldots,\mu_k(\theta))$가 연속이고 역함수 $g^{-1}$도 연속이라 하자. 표본적률 $m_j=\frac1n\sum_{i=1}^n X_i^j$에 대해 적률법 추정량을 $\hat\theta=g^{-1}(m_1,\ldots,m_k)$로 정의하면, $\hat\theta$는 $\theta$의 일치추정량이다. 즉 $n\to\infty$일 때 $\hat\theta\xrightarrow{p}\theta$이다.

## 문제
실제로는 $\theta$를 모르므로 이론적 적률 대신 표본에서 직접 계산할 수 있는 표본적률 $m_j=\frac1n\sum_{i=1}^n X_i^j$을 쓴다. 적률법의 발상은 이론적 관계식 $\mu_j(\theta)=m_j$가 $j=1,\ldots,k$ 모두에서 성립한다고 놓고, 이 연립방정식을 $\theta$에 대해 풀어 $\hat\theta=$==빈칸== 를 얻는 것이다.

## 해설
μ_j(θ)=m_j라는 연립방정식을 θ에 대해 풀어내는 것은 정확히 g의 역함수에 표본적률들을 대입하는 것과 같습니다.

**정답: $g^{-1}(m_1,\ldots,m_k)$**

## 예시
구체적으로 감마분포 $\mathrm{Gamma}(\alpha,\beta)$(모양 $\alpha$, 비율 $\beta$, 평균 $\alpha/\beta$, 분산 $\alpha/\beta^2$)에 적률법을 적용해 실제 데이터로 계산해봅니다.

데이터가 $\{2,3,5,6,4\}$($n=5$)라 합시다. 표본평균은 $m_1=(2+3+5+6+4)/5=4$이고, 표본분산(중심적률) $m_{2c}=\frac15\sum(x_i-4)^2=\frac{4+1+1+4+0}{5}=2$입니다.

모수와 적률의 관계 $\mu_1=\alpha/\beta$, $\mu_{2c}=\alpha/\beta^2$에서 $\beta=\mu_1/\mu_{2c}$, $\alpha=\beta\mu_1=\mu_1^2/\mu_{2c}$이므로, 표본적률을 대입하면 $\hat\beta=4/2=2$, $\hat\alpha=4^2/2=8$입니다.

검산해보면 $\mathrm{Gamma}(\alpha=8,\beta=2)$의 평균은 $8/2=4$로 $m_1$과 정확히 같고, 분산은 $8/2^2=2$로 $m_{2c}$와 정확히 같습니다. 표본적률을 그대로 되돌려 넣으면 원래 모수 관계식이 다시 성립합니다.
