---
slug: diffusion-forward-process
theme: PROB
domainLabel: 확률 · 통계
subLabel: 마르코프 · 확률과정
title: 확산모델 정방향과정의 닫힌형 주변분포
hook: 확산모델의 정방향과정은 $x_0$에 조금씩 잡음을 더해가는 마르코프체인이에요.
---

## 기본설명
$x_t=\sqrt{\alpha_t}x_{t-1}+\sqrt{1-\alpha_t}\epsilon_t$ ($\epsilon_t\sim\mathcal N(0,I)$, 서로 독립)이고 $\bar\alpha_t:=\prod_{s=1}^t\alpha_s$이면, 어떤 $\epsilon\sim\mathcal N(0,I)$가 존재해 $x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\epsilon$ 이다.

## 문제
먼저 $t=1$인 기초단계를 확인한다. $\bar\alpha_t$의 정의 $\prod_{s=1}^t\alpha_s$에서 $t=1$일 때는 곱해지는 항이 $\alpha_1$ 하나뿐이다.

$\bar\alpha_1 = $==빈칸== 이다. 그러면 $x_1=\sqrt{\alpha_1}x_0+\sqrt{1-\alpha_1}\epsilon_1 = \sqrt{\bar\alpha_1}x_0+\sqrt{1-\bar\alpha_1}\epsilon_1$이 되어 원하는 형태가 $t=1$에서 성립한다.

## 해설
$\bar\alpha_t$의 정의 $\prod_{s=1}^t\alpha_s$에 $t=1$을 넣으면 곱해지는 항이 $\alpha_1$ 하나뿐이라 그대로 $\alpha_1$이 된다.

**정답: $\alpha_1$**

## 예시
두 스텝만 직접 손으로 합쳐봐도 닫힌 형태가 어떻게 나오는지 확인할 수 있습니다.

$\alpha_1=0.9$, $\alpha_2=0.8$이라 하면 $\bar\alpha_2=\alpha_1\alpha_2=0.72$입니다. 정방향과정을 한 스텝씩 적어봅니다.
$$x_1=\sqrt{0.9}\,x_0+\sqrt{0.1}\,\epsilon_1\approx0.9487x_0+0.3162\epsilon_1$$
$$x_2=\sqrt{0.8}\,x_1+\sqrt{0.2}\,\epsilon_2\approx0.8944x_1+0.4472\epsilon_2$$
둘째 줄에 첫째 줄을 대입해서 $x_1$을 지우면 다음과 같습니다.
$$x_2\approx0.8944(0.9487x_0+0.3162\epsilon_1)+0.4472\epsilon_2=0.8485x_0+0.2828\epsilon_1+0.4472\epsilon_2$$
$x_0$의 계수 $0.8485$는 $\sqrt{\bar\alpha_2}=\sqrt{0.72}\approx0.8485$와 정확히 같습니다. 잡음 두 항의 분산을 더하면 $0.2828^2+0.4472^2\approx0.08+0.20=0.28=1-\bar\alpha_2$가 되어, 둘을 합친 잡음도 정규분포를 따르면서 분산이 딱 $1-\bar\alpha_2$가 됩니다.

두 번의 잡음 주입을 거쳤는데도 결국 $x_0$에 계수 $\sqrt{\bar\alpha_2}$를 곱하고 분산 $1-\bar\alpha_2$짜리 잡음 하나를 더한 것과 똑같은 모양이 나왔습니다. 아래 증명은 이 압축이 두 스텝뿐 아니라 임의의 $t$스텝에서도 귀납법으로 항상 성립한다는 것을 보입니다.
