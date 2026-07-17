---
slug: gmm-em
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: GMM의 E-step: 책임값(responsibility)의 유도
hook: 군집이 여러 개 섞여 있는 데이터가 있어요.
---

## 기본설명
잠재변수 $z\in\{1,\dots,K\}$가 $P(z=k)=\pi_k$, $p(x\mid z=k)=\mathcal N(x;\mu_k,\Sigma_k)$를 따를 때, 책임값 $\gamma_k(x)=P(z=k\mid x)$는 $\gamma_k(x)=\dfrac{\pi_k\mathcal N(x;\mu_k,\Sigma_k)}{\sum_{j=1}^K\pi_j\mathcal N(x;\mu_j,\Sigma_j)}$ 이다.

## 문제
손에 쥔 건 $z$가 주어졌을 때 $x$가 나올 확률인 $p(x\mid z=k)$ 쪽이다. 하지만 정말 알고 싶은 건 반대 방향인 $P(z=k\mid x)$다. 이 둘을 잇는 다리가 베이즈 정리다.

bayes-theorem에서 확인한 그대로 적용하면 $P(z=k\mid x) = $==빈칸== 이다.

## 해설
베이즈 정리 $P(A|B)=P(B|A)P(A)/P(B)$를 그대로 가져온 것이다. 여기서는 $A$ 자리에 $z=k$가, $B$ 자리에 $x$가 들어간다.

**정답: $\dfrac{p(x\mid z=k)P(z=k)}{p(x)}$**

## 예시
책임값 공식이 실제로 어떤 숫자를 내놓는지 두 성분짜리 GMM에 직접 대입해봅니다.

두 성분이 각각 $\pi_1=\pi_2=0.5$의 비율로 섞여 있고 $\mu_1=0$, $\mu_2=3$, $\sigma_1=\sigma_2=1$이라 합시다. 데이터 $x=1$이 관측되었을 때 각 성분의 밀도를 구합니다.
$$\mathcal N(1;0,1)=\frac{1}{\sqrt{2\pi}}e^{-0.5}\approx0.2420,\qquad \mathcal N(1;3,1)=\frac{1}{\sqrt{2\pi}}e^{-2}\approx0.0540$$
이 값들을 책임값 공식에 대입합니다.
$$\gamma_1(1)=\frac{0.5\times0.2420}{0.5\times0.2420+0.5\times0.0540}=\frac{0.1210}{0.1480}\approx0.818,\qquad \gamma_2(1)\approx0.182$$
$x=1$은 $\mu_1=0$에 더 가깝지만 $\mu_2=3$에서 완전히 먼 것도 아니라서, 책임값도 한쪽으로 완전히 쏠리지 않고 $0.818$과 $0.182$로 나뉩니다. 두 값을 더하면 정확히 $1$이 되어 $x=1$이 성분 1과 성분 2에서 나왔을 확률을 온전히 나눠 가진 셈입니다. 아래 증명은 이 책임값이 베이즈 정리를 곧이곧대로 적용한 결과라는 것을 일반적인 $K$개 성분에 대해 보입니다.
