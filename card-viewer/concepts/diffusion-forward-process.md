---
slug: diffusion-forward-process
theme: PROB
domainLabel: 확률 · 통계
subLabel: 마르코프 · 확률과정
title: 확산모델 정방향과정의 닫힌형 주변분포
related: 
---

## 도입
확산모델의 정방향과정은 $x_0$에 조금씩 잡음을 더해가는 마르코프체인이에요. 한 스텝씩 $q(x_t\mid x_{t-1})$을 따라가려면 $t$번의 샘플링이 필요해요. 그런데 실제로 학습할 땐 임의의 $t$에서 $x_0$로부터 곧바로 $x_t$를 한 번에 샘플링해야 해요. 이게 가능한 이유는 $t$번의 잡음 주입을 통째로 합쳐도 결국 하나의 정규분포로 정리되기 때문이에요. 귀납법과 재매개변수화 트릭으로 그 닫힌 형태를 유도해봐요.

## 명제
$x_t=\sqrt{\alpha_t}x_{t-1}+\sqrt{1-\alpha_t}\epsilon_t$ ($\epsilon_t\sim\mathcal N(0,I)$, 서로 독립)이고 $\bar\alpha_t:=\prod_{s=1}^t\alpha_s$이면, 어떤 $\epsilon\sim\mathcal N(0,I)$가 존재해 $x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\epsilon$ 이다.

## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="100" r="20" class="dg-dim"/>
  <circle cx="180" cy="100" r="20" fill="none" class="dg-stroke-ink" stroke-width="1.6" stroke-dasharray="8,2"/>
  <circle cx="300" cy="100" r="20" fill="none" class="dg-stroke-ink" stroke-width="1.6" stroke-dasharray="5,3"/>
  <circle cx="420" cy="100" r="20" fill="none" class="dg-line" stroke-width="1.6" stroke-dasharray="3,3"/>
  <circle cx="540" cy="100" r="20" fill="none" class="dg-line" stroke-width="1.6" stroke-dasharray="2,4"/>
  <text x="52" y="105" font-size="12" font-weight="700">x₀</text>
  <text x="170" y="105" font-size="11">x₁</text>
  <text x="290" y="105" font-size="11">x_t</text>
  <text x="410" y="105" font-size="11">x_t+1</text>
  <text x="530" y="105" font-size="11">x_T</text>
  <text x="20" y="135" font-size="10" class="dg-dim">잡음 없음</text>
  <text x="510" y="135" font-size="10" class="dg-dim">순수 잡음</text>
  <line x1="82" y1="100" x2="158" y2="100" class="dg-stroke-ink" stroke-width="1.8"/>
  <polygon points="158,100 146,95 146,105" class="dg-dim"/>
  <line x1="202" y1="100" x2="278" y2="100" class="dg-stroke-ink" stroke-width="1.8"/>
  <polygon points="278,100 266,95 266,105" class="dg-dim"/>
  <line x1="322" y1="100" x2="398" y2="100" class="dg-stroke-ink" stroke-width="1.8"/>
  <polygon points="398,100 386,95 386,105" class="dg-dim"/>
  <line x1="442" y1="100" x2="518" y2="100" class="dg-stroke-ink" stroke-width="1.8"/>
  <polygon points="518,100 506,95 506,105" class="dg-dim"/>
  <path d="M60,80 C160,10 250,10 300,78" fill="none" class="dg-stroke-accent" stroke-width="2.2" stroke-dasharray="6,3"/>
  <polygon points="300,78 288,68 296,82" class="dg-accent"/>
  <text x="130" y="35" font-size="11" font-weight="700">임의의 t로 한 번에 점프</text>
</svg>

_x₀→x₁→…→x_T로 갈수록 원 테두리의 점선이 성겨지며 잡음이 강해진다. 위쪽 강조 화살표는 x₀에서 임의의 t로 바로 뛰는 닫힌 형태 샘플링을 뜻한다._

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
