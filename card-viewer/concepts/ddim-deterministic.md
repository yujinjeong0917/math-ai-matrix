---
slug: ddim-deterministic
theme: PROB
domainLabel: 확률 · 통계
subLabel: 마르코프 · 확률과정
title: DDIM: 비마르코프 결정론적 역과정의 일관성
hook: DDPM의 샘플링은 매 스텝 새로운 무작위성을 더해가며 $x_T$에서 $x_0$까지 거슬러 내려와요.
related: 
---

## 기본설명
$x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\epsilon$이고 노이즈 예측이 정확해 $\epsilon_\theta(x_t,t)=\epsilon$이면, DDIM 갱신식 $x_{t-1}=\sqrt{\bar\alpha_{t-1}}\hat x_0+\sqrt{1-\bar\alpha_{t-1}}\epsilon_\theta(x_t,t)$은 $x_{t-1}=\sqrt{\bar\alpha_{t-1}}x_0+\sqrt{1-\bar\alpha_{t-1}}\epsilon$과 정확히 같다.

## 문제
$x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\epsilon$ 을 $x_0$에 대해 풀어본다. 양변에서 잡음항을 이항한 뒤 $\sqrt{\bar\alpha_t}$로 나눈다.

$x_0 = $==빈칸== 이다.

## 해설
$x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\epsilon$에서 $\sqrt{1-\bar\alpha_t}\epsilon$을 반대편으로 이항하고 양변을 $\sqrt{\bar\alpha_t}$로 나눈 것이다.

**정답: $\dfrac{x_t-\sqrt{1-\bar\alpha_t}\,\epsilon}{\sqrt{\bar\alpha_t}}$**

## 예시
직전 예시에서 쓴 숫자를 그대로 이어받아 DDIM이 정말 같은 값을 내놓는지 확인해봅니다.

$x_0=10$, $\bar\alpha_2=0.72$, $\bar\alpha_1=0.9$이고 잡음이 $\epsilon=0.5$였다고 합시다. 정방향과정의 닫힌 형태로 $x_2$를 구합니다.
$$x_2=\sqrt{0.72}\times10+\sqrt{0.28}\times0.5\approx8.4853+0.2646=8.7499$$
모델이 잡음을 완벽하게 예측해서 $\epsilon_\theta(x_2,2)=0.5$라 하면, DDIM은 이 값으로 먼저 $x_0$를 추정합니다.
$$\hat x_0=\frac{8.7499-\sqrt{0.28}\times0.5}{\sqrt{0.72}}=\frac{8.4853}{0.8485}=10.0$$
추정치 $\hat x_0$가 진짜 $x_0=10$과 정확히 일치합니다. 이제 이 값을 DDIM 갱신식에 넣어 $x_1$을 결정론적으로 구합니다.
$$x_1=\sqrt{0.9}\times10+\sqrt{0.1}\times0.5\approx9.4868+0.1581=9.6449$$
새로 무작위 잡음을 뽑지 않고 처음 $x_2$를 만들 때 썼던 $\epsilon=0.5$를 그대로 재사용했을 뿐인데도, 이 값은 diffusion-forward-process의 닫힌 형태로 직접 계산한 $x_1=\sqrt{0.9}\times10+\sqrt{0.1}\times0.5=9.6449$와 소수점까지 완전히 같습니다. 아래 증명은 이 일치가 우연이 아니라 노이즈 예측이 정확하기만 하면 항상 성립한다는 것을 일반적으로 보입니다.
