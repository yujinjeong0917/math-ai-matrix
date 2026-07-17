---
slug: conjugate-priors-three-families
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 켤레사전분포 3종: 베타-이항, 디리클레-다항, 가우시안-가우시안
hook: 베이즈 갱신은 사전분포에 우도를 곱하고 정규화하는 절차인데, 대부분의 경우 그 결과가 어떤 이름 붙은 분포족인지조차 알기 어렵습니다.
related: 잠재디리클레할당(LDA) · 베이지안 선형회귀 사후분포
---

## 기본설명
다음 세 쌍은 모두 켤레이다. (1) $\theta\sim\mathrm{Beta}(\alpha,\beta)$, $x\mid\theta\sim\mathrm{Binomial}(n,\theta)$ 이면 $\theta\mid x\sim\mathrm{Beta}(\alpha+x,\beta+n-x)$. (2) $\pi\sim\mathrm{Dir}(\alpha)$, $x\mid\pi\sim\mathrm{Multinomial}(n,\pi)$ 이면 $\pi\mid x\sim\mathrm{Dir}(\alpha+x)$. (3) $\mu\sim N(\mu_0,\tau_0^2)$, $x_i\mid\mu\overset{iid}\sim N(\mu,\sigma^2)$($\sigma^2$ 기지)이면 $\mu\mid x_{1:n}\sim N(\mu_n,\tau_n^2)$, $\tau_n^2=(1/\tau_0^2+n/\sigma^2)^{-1}$, $\mu_n=\tau_n^2(\mu_0/\tau_0^2+n\bar x/\sigma^2)$.

## 문제
이 커널은 베타분포의 정의와 정확히 같은 형태이므로 정규화하면 사후분포는 $\theta\mid x\sim\mathrm{Beta}($==빈칸==$)$ 이다.

## 해설
베타분포 $\mathrm{Beta}(a,b)$의 커널은 $\theta^{a-1}(1-\theta)^{b-1}$이므로 지수를 비교하면 $a-1=x+\alpha-1,\ b-1=n-x+\beta-1$에서 $a=\alpha+x,\ b=\beta+n-x$를 얻습니다.

**정답: $\alpha+x,\ \beta+n-x$**

## 예시
세 가지 켤레성을 구체적 숫자로 각각 확인해본다.

**베타-이항.** 사전분포 $\theta\sim\mathrm{Beta}(2,2)$ 에서 $n=10$번 시행 중 $x=7$번 성공했다면, 공식대로 사후분포는 $\mathrm{Beta}(2+7,\,2+10-7)=\mathrm{Beta}(9,5)$ 이다.

**디리클레-다항.** $K=3$개 범주에 사전분포 $\pi\sim\mathrm{Dir}(1,1,1)$, 관측이 $n=6$번 시행에서 $(x_1,x_2,x_3)=(3,2,1)$이었다면 사후분포는 $\mathrm{Dir}(1+3,\,1+2,\,1+1)=\mathrm{Dir}(4,3,2)$ 이다.

**가우시안-가우시안.** 사전분포 $\mu\sim N(0,1)$, 관측분산 $\sigma^2=4$, $n=4$개 관측의 평균이 $\bar x=2$라면 $\tau_n^2=1/(1/1+4/4)=1/2$, $\mu_n=\tfrac12\left(0/1+4\cdot2/4\right)=\tfrac12\cdot2=1$ 이므로 사후분포는 $N(1,\,0.5)$ 이다.
