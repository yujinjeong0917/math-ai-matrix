---
slug: reparameterization-trick
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 재매개변수화 트릭과 그래디언트-기댓값 교환
hook: VAE의 인코더는 입력마다 평균 $\mu_\phi$와 표준편차 $\sigma_\phi$를 내놓고 여기서 잠재변수 $z$를 샘플링합니다.
related: 
---

## 기본설명
$z=g_\phi(\varepsilon)=\mu_\phi+\sigma_\phi\odot\varepsilon$, $\varepsilon\sim p(\varepsilon)$($\phi$와 무관한 고정분포)이고 $z$의 분포가 $q_\phi(z)$와 같으면 $\nabla_\phi E_{z\sim q_\phi}[f(z)] = E_{\varepsilon\sim p(\varepsilon)}[\nabla_\phi f(g_\phi(\varepsilon))]$ 이다.

## 문제
지금 목표는 기댓값을 취하는 대상 자체를 $\phi$와 무관한 고정분포로 바꿔치기하는 것이다. $z=g_\phi(\varepsilon)$이 $p(\varepsilon)$을 밀어서 $q_\phi(z)$를 만든다는 사실을 쓰면, 임의의 함수 $f$에 대해 $f(z)$의 기댓값을 $z$의 분포로 구하든 $\varepsilon$의 분포로 $f(g_\phi(\varepsilon))$의 기댓값을 구하든 같은 값이 나온다. 이를 LOTUS(무의식적 통계학자의 법칙)라 부른다. $E_{z\sim q_\phi}[f(z)] = E_{\varepsilon\sim p(\varepsilon)}[$==빈칸==$]$ 이다.

## 해설
$z=g_\phi(\varepsilon)$는 $\varepsilon$의 결정론적 함수다. LOTUS에 따르면 $z$의 분포로 $f(z)$의 기댓값을 구하는 대신, 변환 전 변수 $\varepsilon$의 분포에서 합성함수 $f(g_\phi(\varepsilon))$의 기댓값을 구해도 정확히 같은 값이 나온다.

**정답: $f(g_\phi(\varepsilon))$**

## 예시
증명에 들어가기 전에 아주 단순한 인코더 하나를 놓고 실제로 샘플 하나를 뽑아 그래디언트를 계산해봅니다.

$\mu_\phi=\phi$, $\sigma_\phi=1$(고정)로 두고 $f(z)=z^2$이라 합니다. $\phi=3$에서 $\varepsilon=0.5$ 하나를 뽑으면 $z=g_\phi(\varepsilon)=3+0.5=3.5$입니다.

이 표본 하나로 그래디언트를 계산합니다. $f'(z)=2z$이고 $\nabla_\phi g_\phi(\varepsilon)=1$이므로 체인룰로 다음을 얻습니다.
$$\nabla_\phi f(g_\phi(\varepsilon))=2\times3.5\times1=7$$
이 값 하나는 $\varepsilon$을 어떻게 뽑았는지에 따라 매번 달라지는 표본일 뿐입니다. 진짜 목표는 $\varepsilon$을 계속 다시 뽑아 평균을 낸 값입니다. $\varepsilon\sim N(0,1)$이므로 $E_\varepsilon[2(\phi+\varepsilon)]=2\phi+2E[\varepsilon]=2\times3+0=6$이 참값입니다. 방금 얻은 $7$은 이 참값 $6$을 중심으로 흔들리는 편향 없는 추정값입니다.

아래 증명은 이렇게 $\varepsilon$을 먼저 뽑고 결정론적 변환을 미분하는 방식이 왜 매번 편향 없이 참값을 추정하는 셈이 되는지 일반적으로 보입니다.
