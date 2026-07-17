---
slug: ddpm-loss-reparameterization
theme: INFO
domainLabel: 정보이론
subLabel: 엔트로피 · 손실
title: 디퓨전 손실의 재정식화: ELBO가 왜 결국 노이즈 예측 MSE로 단순화되는가
hook: elbo-derivation에서 확인한 하한은 디퓨전 모델에서 $T$개의 KL항으로 더 잘게 쪼개집니다.
related: ELBO: 로그가능도의 옌센 하한 · 확산모델 정방향과정의 닫힌형 주변분포
---

## 기본설명
$q(x_{t-1}|x_t,x_0)=N(\mu_{\tilde t},\sigma_t^2I)$이고 $p_\theta(x_{t-1}|x_t)=N(\mu_\theta,\sigma_t^2I)$이며 두 평균이 $\mu_{\tilde t}=\frac{1}{\sqrt{\alpha_t}}\left(x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\epsilon\right)$, $\mu_\theta=\frac{1}{\sqrt{\alpha_t}}\left(x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\epsilon_\theta(x_t,t)\right)$ 형태로 매개변수화되면 $D_{KL}(q\|p_\theta) = \dfrac{\beta_t^2}{2\sigma_t^2\alpha_t(1-\bar\alpha_t)}\left\|\epsilon-\epsilon_\theta(x_t,t)\right\|^2$ 이다.

## 문제
분산이 같은 두 다변량 가우시안의 KL발산은 일반적으로 $\frac12\left[\mathrm{tr}(\Sigma_2^{-1}\Sigma_1)-d+(\mu_2-\mu_1)^T\Sigma_2^{-1}(\mu_2-\mu_1)+\ln\frac{\det\Sigma_2}{\det\Sigma_1}\right]$로 쓰인다. $\Sigma_1=\Sigma_2=\sigma_t^2I$를 대입하면 $\mathrm{tr}(\Sigma_2^{-1}\Sigma_1)=\mathrm{tr}(I)=d$가 되어 바로 뒤의 $-d$와 상쇄되고 $\ln(\det\Sigma_2/\det\Sigma_1)=\ln1=0$이 되어 로그항도 사라진다. 남는 항은 $\dfrac12(\mu_\theta-\mu_{\tilde t})^T(\sigma_t^2I)^{-1}(\mu_\theta-\mu_{\tilde t})$뿐이고 이는 $D_{KL}(q\|p_\theta) = $==빈칸== 로 정리된다.

## 해설
$(\sigma_t^2I)^{-1}=\frac{1}{\sigma_t^2}I$이므로 이차형식 $(\mu_\theta-\mu_{\tilde t})^T\frac{1}{\sigma_t^2}I(\mu_\theta-\mu_{\tilde t})$은 $\frac{1}{\sigma_t^2}\|\mu_\theta-\mu_{\tilde t}\|^2$과 같다. 여기에 앞의 $\frac12$를 곱하면 그대로 두 평균의 유클리드 거리 제곱을 분산의 두 배로 나눈 값이 된다.

**정답: $\dfrac{\|\mu_{\tilde t}-\mu_\theta\|^2}{2\sigma_t^2}$**

## 예시
일반식을 보기 전에 구체적인 숫자로 KL발산이 정말 잡음 오차의 제곱에 비례하는지 확인해봅니다. $\alpha_t=0.9$, $\beta_t=1-\alpha_t=0.1$, $\bar\alpha_t=0.72$, 분산은 $\sigma_t^2=\beta_t=0.1$로 두는 흔한 선택을 씁니다. 진짜 잡음은 $\epsilon=0.5$ 예측된 잡음은 $\epsilon_\theta=0.3$이라 하겠습니다.

두 평균의 차이부터 계산합니다. 두 평균 모두 $x_t$항이 똑같이 들어가 있어 빼면 지워지고 잡음 항만 남습니다.
$$\mu_{\tilde t}-\mu_\theta = -\frac{\beta_t}{\sqrt{\alpha_t}\sqrt{1-\bar\alpha_t}}(\epsilon-\epsilon_\theta) = -\frac{0.1}{\sqrt{0.9}\sqrt{0.28}}\times0.2 \approx -\frac{0.1}{0.502}\times0.2 \approx -0.039841$$
이 차이를 제곱하고 $2\sigma_t^2$로 나누면 등분산 가우시안의 KL발산 공식 그대로입니다.
$$D_{KL}(q\|p_\theta) = \frac{(-0.039841)^2}{2\times0.1} = \frac{0.001587}{0.2} \approx 0.007936$$
일반식의 상수 부분만 따로 계산해도 같은 값이 나오는지 검산합니다.
$$\frac{\beta_t^2}{2\sigma_t^2\alpha_t(1-\bar\alpha_t)} = \frac{0.01}{2\times0.1\times0.9\times0.28} = \frac{0.01}{0.0504} \approx 0.198413$$
$$0.198413\times(\epsilon-\epsilon_\theta)^2 = 0.198413\times0.04 \approx 0.007936$$
두 경로로 구한 값이 반올림 오차 범위 안에서 정확히 일치합니다. 아래 증명은 이 상수 $0.198413$이 이 숫자쌍에서만 맞는 게 아니라 두 가우시안이 분산을 공유하고 평균이 이 재매개변수화된 형태를 가지기만 하면 항상 그 자리에 나온다는 것을 보입니다.
