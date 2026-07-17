---
slug: ddim-deterministic
theme: PROB
domainLabel: 확률 · 통계
subLabel: 마르코프 · 확률과정
title: DDIM: 비마르코프 결정론적 역과정의 일관성
related: 
---

## 도입
DDPM의 샘플링은 매 스텝 새로운 무작위성을 더해가며 $x_T$에서 $x_0$까지 거슬러 내려와요. 스텝 수가 많을수록 품질은 좋지만 느려요. DDIM은 매 스텝 새로 무작위 잡음을 뽑지 않고, $x_t$로부터 $x_0$을 바로 추정한 뒤 그 추정치로 결정론적으로 다음 단계를 구해요. 마르코프체인처럼 한 스텝씩 밟는 구조를 벗어난다고 해서 비마르코프라 불러요. 그런데도 이 결정론적 역과정이 diffusion-forward-process에서 구한 것과 똑같은 주변분포를 그대로 만족한다는 걸 확인해봐요.

## 명제
$x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\epsilon$이고 노이즈 예측이 정확해 $\epsilon_\theta(x_t,t)=\epsilon$이면, DDIM 갱신식 $x_{t-1}=\sqrt{\bar\alpha_{t-1}}\hat x_0+\sqrt{1-\bar\alpha_{t-1}}\epsilon_\theta(x_t,t)$은 $x_{t-1}=\sqrt{\bar\alpha_{t-1}}x_0+\sqrt{1-\bar\alpha_{t-1}}\epsilon$과 정확히 같다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
  <line x1="350" y1="15" x2="350" y2="205" class="dg-line" stroke-width="1" stroke-dasharray="3,4"/>
  <text x="80" y="22" font-size="13" font-weight="700">DDPM: 확률적 경로 다발</text>
  <text x="440" y="22" font-size="13" font-weight="700">DDIM: 결정론적 단일 경로</text>
  <text x="165" y="45" font-size="12">x_T</text>
  <text x="165" y="195" font-size="12">x₀</text>
  <text x="515" y="45" font-size="12">x_T</text>
  <text x="515" y="195" font-size="12">x₀</text>
  <circle cx="175" cy="35" r="7" class="dg-dim"/>
  <circle cx="175" cy="185" r="7" class="dg-dim"/>
  <circle cx="525" cy="35" r="7" class="dg-dim"/>
  <circle cx="525" cy="185" r="7" class="dg-dim"/>
  <path d="M175,40 Q120,90 150,110 Q100,140 140,160 Q110,175 175,182" fill="none" class="dg-line" stroke-width="1.4" stroke-dasharray="4,3"/>
  <path d="M175,40 Q220,80 195,105 Q240,135 200,155 Q230,172 175,182" fill="none" class="dg-line" stroke-width="1.4" stroke-dasharray="2,4"/>
  <path d="M175,40 Q150,85 175,110 Q155,140 175,160 Q160,172 175,182" fill="none" class="dg-line" stroke-width="1.4" stroke-dasharray="6,3"/>
  <path d="M525,40 C500,90 550,130 525,182" fill="none" class="dg-stroke-accent" stroke-width="3"/>
  <polygon points="525,182 519,168 531,168" class="dg-accent"/>
</svg>

_왼쪽 DDPM은 매 스텝 새 무작위성을 더해 여러 갈래의 점선 경로를 만들고, 오른쪽 DDIM은 같은 x_T에서 굵은 실선 하나의 결정론적 경로로 x₀에 도달한다._

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
