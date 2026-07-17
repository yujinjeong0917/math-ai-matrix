---
slug: vae-kl-regularizer
theme: INFO
domainLabel: 정보이론
subLabel: 발산 · 상호정보
title: VAE KL 정규화항의 닫힌 형태와 사후붕괴
hook: VAE의 ELBO에는 $D_{KL}(q(z|x)\|p(z))$라는 정규화항이 들어갑니다.
---

## 기본설명
$q(z|x)=N(\mu,\sigma^2)$, $p(z)=N(0,1)$ (1차원)일 때 $D_{KL}(q\|p) = \dfrac12\left(\mu^2+\sigma^2-\log\sigma^2-1\right)$ 이다.

## 문제
두 로그밀도를 각각 적어봅니다. $\log q(z) = -\frac12\log(2\pi\sigma^2) - \dfrac{(z-\mu)^2}{2\sigma^2}$ 이고 $\log p(z) = -\frac12\log(2\pi) - \dfrac{z^2}{2}$ 입니다. 두 식을 빼면 공통으로 들어있는 $-\frac12\log(2\pi)$가 상쇄됩니다.

$\log q(z) - \log p(z) = -\frac12\log\sigma^2 - \dfrac{(z-\mu)^2}{2\sigma^2} + $==빈칸== 이다.

## 해설
$-\left(-\frac{z^2}{2}\right)=\frac{z^2}{2}$가 부호 반전으로 남습니다. 공통 상수 $-\frac12\log(2\pi)$는 서로 상쇄되어 사라집니다.

**정답: $\frac{z^2}{2}$**

## 예시
KL 정규화항이 닫힌 형태로 정확히 계산된다는 명제를 숫자로 확인해봅니다. 로그는 자연로그를 사용합니다.

근사사후분포가 $q(z|x)=N(1,0.25)$ 즉 $\mu=1$ $\sigma^2=0.25$라 하겠습니다.
$$D_{KL}(q\|p)=\frac12\left(1+0.25-\log0.25-1\right)=\frac12(0.25+1.386)\approx0.818$$
**사후붕괴에 가까운 경우.** $\mu=0.01$ $\sigma^2=0.9801$로 사전분포 $N(0,1)$에 거의 붙어버린 경우를 봅니다.
$$D_{KL}(q\|p)=\frac12\left(0.0001+0.9801-\log0.9801-1\right)\approx\frac12(0.0003)\approx0.0002$$
$q$가 사전분포에서 멀리 떨어져 있을 때는 KL항이 $0.818$로 크지만 $q$가 사전분포에 거의 겹쳐지자 KL항은 $0.0002$까지 떨어져 사실상 0입니다. $z$가 사전분포와 구별되지 않는다는 것은 $z$ 안에 $x$의 정보가 거의 남지 않았다는 뜻입니다.

아래 증명은 이 닫힌 형태 공식 $\frac12(\mu^2+\sigma^2-\log\sigma^2-1)$이 임의의 $\mu,\sigma$에서 정확히 성립함을 가우시안 밀도를 직접 적분해 보입니다.
