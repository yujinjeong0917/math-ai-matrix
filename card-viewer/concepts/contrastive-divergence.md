---
slug: contrastive-divergence
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: 대조발산(Contrastive Divergence): 에너지기반모델의 그래디언트를 짧은 MCMC로 근사하기
hook: 에너지기반모델(EBM)은 $p_\theta(x)=\dfrac{e^{-E_\theta(x)}}{Z(\theta)}$로 확률을 정의합니다.
---

## 기본설명
로그우도의 그래디언트는 $\nabla_\theta\log p_\theta(x) = -\nabla_\theta E_\theta(x) + \mathbb E_{p_\theta}[\nabla_\theta E_\theta(x')]$로 양성위상(데이터에서 계산되는 $-\nabla_\theta E_\theta(x)$)과 음성위상(모델 기댓값 $\mathbb E_{p_\theta}[\nabla_\theta E_\theta(x')]$)의 합으로 쓰인다. CD-$k$는 음성위상을 데이터 $x$에서 시작해 $p_\theta$를 정상분포로 갖는 MCMC 커널을 $k$번 적용한 표본 $x^{(k)}$로 근사한 $\widehat{\nabla_\theta\log p_\theta(x)} = -\nabla_\theta E_\theta(x)+\nabla_\theta E_\theta(x^{(k)})$를 쓰는데, 이는 $k$가 유한한 한 일반적으로 참 그래디언트에 대한 편향추정량이다.

## 문제
$\nabla_\theta\log Z(\theta) = \dfrac{1}{Z(\theta)}\nabla_\theta\displaystyle\int e^{-E_\theta(x')}\,dx' = \dfrac{1}{Z(\theta)}\int e^{-E_\theta(x')}\big(-\nabla_\theta E_\theta(x')\big)\,dx' = $==빈칸== 이다.

## 해설
$e^{-E_\theta(x')}/Z(\theta)=p_\theta(x')$이므로 이 적분은 $-\int p_\theta(x')\nabla_\theta E_\theta(x')\,dx' = -\mathbb E_{p_\theta}[\nabla_\theta E_\theta(x')]$가 돼요.

**정답: $-\mathbb E_{p_\theta}[\nabla_\theta E_\theta(x')]$**

## 예시
$E_\theta(x)=\theta x^2/2$인 간단한 1차원 EBM(사실상 분산이 $1/\theta$인 가우시안)으로 편향을 직접 계산해봅니다. $Z(\theta)=\sqrt{2\pi/\theta}$이고 $\theta=1$, 데이터점 $x=2$라 합시다.

참 그래디언트는 $\nabla_\theta E_\theta(x)=x^2/2$이고, $p_\theta$ 아래서 $\mathbb E_{p_\theta}[X'^2]=1/\theta$ (평균 0인 가우시안의 분산)이므로
$$\nabla_\theta\log p_\theta(x) = -\frac{x^2}{2}+\frac{1}{2\theta} = -\frac{4}{2}+\frac{1}{2}=-1.5$$
이제 CD-1을 적용합니다. 데이터점 $x=2$에서 스텝 크기 $0.1$의 랑주뱅(Langevin) 한 스텝 $x' = x - \frac{0.1}{2}\nabla_xE_\theta(x) = 2-0.05\cdot(1\cdot2)=1.9$를 밟으면
$$\widehat{\nabla_\theta\log p_\theta(x)} = -\frac{x^2}{2}+\frac{x'^2}{2} = -2+\frac{1.9^2}{2}=-2+1.805=-0.195$$
로, 참값 $-1.5$와 크게 다릅니다. 체인이 단 한 스텝만 진행되어 $x'=1.9$가 여전히 데이터점 $x=2$ 근처에 머물러 있고, 모델의 진짜 전형적인 값(분산 $1/\theta=1$, 즉 $X'^2$의 기댓값 $1$) 근처로는 전혀 이동하지 못했기 때문입니다. 이 차이가 바로 CD-$k$의 편향을 수치로 보여줍니다.
