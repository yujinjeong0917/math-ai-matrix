---
slug: diffusion-noise-schedule
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: Diffusion 순방향 과정의 분산보존과 닫힌형 노이즈 주입
related: 
---

## 도입
Diffusion 모델의 순방향 과정은 원본 데이터에 아주 조금씩 여러 스텝에 걸쳐 가우시안 노이즈를 섞어 나갑니다. 학습할 때마다 이 과정을 처음부터 $t$번 반복해서 시뮬레이션하는 것은 너무 비효율적입니다. 다행히 각 스텝에서 쓰는 계수 $\alpha_t=1-\beta_t$를 잘 고르면, $t$번째 스텝의 결과를 원본 $x_0$로부터 단 한 번의 계산으로 바로 얻는 닫힌 형태의 식이 존재합니다. 그 식이 왜 성립하는지, 그리고 그 계수들이 왜 분산을 1로 유지하도록 설계되는지를 직접 확인해 봅니다.

## 명제
$x_t=\sqrt{\alpha_t}x_{t-1}+\sqrt{1-\alpha_t}\epsilon_t$ ($\epsilon_t$는 서로 독립인 표준정규분포)를 반복하면, $\bar\alpha_t=\prod_{s=1}^t\alpha_s$에 대해 $x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\epsilon$ 형태의 닫힌 식을 얻는다.

## 그림
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="18" font-size="13" text-anchor="middle">순방향 과정: 원본이 스텝마다 조금씩 가우시안 노이즈에 덮인다</text>
<rect x="20" y="40" width="110" height="110" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="75" cy="95" r="20" class="dg-accent"/>
<circle cx="66" cy="86" r="2.5" class="dg-dim"/><circle cx="92" cy="112" r="2.5" class="dg-dim"/>
<text x="75" y="168" font-size="12" text-anchor="middle">x₀ (원본)</text>
<rect x="160" y="40" width="110" height="110" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="215" cy="95" r="14" class="dg-accent"/>
<circle cx="180" cy="60" r="2.5" class="dg-dim"/><circle cx="206" cy="86" r="2.5" class="dg-dim"/><circle cx="258" cy="86" r="2.5" class="dg-dim"/><circle cx="232" cy="112" r="2.5" class="dg-dim"/><circle cx="232" cy="138" r="2.5" class="dg-dim"/>
<text x="215" y="168" font-size="12" text-anchor="middle">x₁</text>
<rect x="300" y="40" width="110" height="110" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="355" cy="95" r="9" class="dg-accent"/>
<circle cx="320" cy="60" r="2.5" class="dg-dim"/><circle cx="346" cy="60" r="2.5" class="dg-dim"/><circle cx="398" cy="60" r="2.5" class="dg-dim"/><circle cx="346" cy="86" r="2.5" class="dg-dim"/><circle cx="372" cy="86" r="2.5" class="dg-dim"/><circle cx="346" cy="112" r="2.5" class="dg-dim"/><circle cx="372" cy="112" r="2.5" class="dg-dim"/><circle cx="320" cy="138" r="2.5" class="dg-dim"/><circle cx="372" cy="138" r="2.5" class="dg-dim"/>
<text x="355" y="168" font-size="12" text-anchor="middle">x₂</text>
<rect x="440" y="40" width="110" height="110" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="495" cy="95" r="4" class="dg-accent"/>
<circle cx="460" cy="60" r="2.5" class="dg-dim"/><circle cx="512" cy="60" r="2.5" class="dg-dim"/><circle cx="538" cy="60" r="2.5" class="dg-dim"/><circle cx="460" cy="86" r="2.5" class="dg-dim"/><circle cx="486" cy="86" r="2.5" class="dg-dim"/><circle cx="538" cy="86" r="2.5" class="dg-dim"/><circle cx="460" cy="112" r="2.5" class="dg-dim"/><circle cx="486" cy="112" r="2.5" class="dg-dim"/><circle cx="512" cy="112" r="2.5" class="dg-dim"/><circle cx="460" cy="138" r="2.5" class="dg-dim"/><circle cx="486" cy="138" r="2.5" class="dg-dim"/><circle cx="512" cy="138" r="2.5" class="dg-dim"/><circle cx="538" cy="138" r="2.5" class="dg-dim"/>
<text x="495" y="168" font-size="12" text-anchor="middle">x₃</text>
<rect x="580" y="40" width="110" height="110" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="600" cy="60" r="2.5" class="dg-dim"/><circle cx="626" cy="60" r="2.5" class="dg-dim"/><circle cx="652" cy="60" r="2.5" class="dg-dim"/><circle cx="678" cy="60" r="2.5" class="dg-dim"/>
<circle cx="600" cy="86" r="2.5" class="dg-dim"/><circle cx="626" cy="86" r="2.5" class="dg-dim"/><circle cx="652" cy="86" r="2.5" class="dg-dim"/><circle cx="678" cy="86" r="2.5" class="dg-dim"/>
<circle cx="600" cy="112" r="2.5" class="dg-dim"/><circle cx="626" cy="112" r="2.5" class="dg-dim"/><circle cx="652" cy="112" r="2.5" class="dg-dim"/><circle cx="678" cy="112" r="2.5" class="dg-dim"/>
<circle cx="600" cy="138" r="2.5" class="dg-dim"/><circle cx="626" cy="138" r="2.5" class="dg-dim"/><circle cx="652" cy="138" r="2.5" class="dg-dim"/><circle cx="678" cy="138" r="2.5" class="dg-dim"/>
<text x="635" y="168" font-size="12" text-anchor="middle">x_T (순수 노이즈)</text>
<line x1="132" y1="95" x2="157" y2="95" class="dg-line" stroke-width="1.5"/><polygon points="157,95 148,90 148,100" class="dg-dim"/>
<line x1="272" y1="95" x2="297" y2="95" class="dg-line" stroke-width="1.5"/><polygon points="297,95 288,90 288,100" class="dg-dim"/>
<line x1="412" y1="95" x2="437" y2="95" class="dg-line" stroke-width="1.5"/><polygon points="437,95 428,90 428,100" class="dg-dim"/>
<line x1="552" y1="95" x2="577" y2="95" class="dg-line" stroke-width="1.5"/><polygon points="577,95 568,90 568,100" class="dg-dim"/>
</svg>

_매 스텝 √αₜ만큼 신호를 남기고 √(1-αₜ)만큼 노이즈를 더하면, t가 커질수록 원본의 흔적은 옅어지고 결국 순수 가우시안 노이즈만 남는다._

## 문제
닫힌 식을 구하기 전에 이 재귀가 왜 이런 계수 $\sqrt{\alpha_t}$와 $\sqrt{1-\alpha_t}$를 쓰는지부터 확인해 둘 필요가 있다. $x_{t-1}$의 분산이 1이라고 하자. $x_{t-1}$과 $\epsilon_t$는 서로 독립이므로 합의 분산은 각 항의 분산을 더한 것과 같다. $\mathrm{Var}(x_t) = \alpha_t\cdot\mathrm{Var}(x_{t-1}) + (1-\alpha_t)\cdot\mathrm{Var}(\epsilon_t) = \alpha_t\cdot1+(1-\alpha_t)\cdot1 = $==빈칸== 이다.

## 해설
$\alpha_t+(1-\alpha_t)$는 $\alpha_t$의 값이 무엇이든 항상 1이다. 스텝을 거쳐도 분산이 계속 1로 유지된다는 뜻이다. 이 성질 때문에 이 과정을 분산보존 과정이라 부른다. $\alpha_t=1-\beta_t$로 두는 이유도 두 계수의 제곱합이 정확히 1이 되도록 짝을 맞추기 위해서다.

**정답: $1$**

## 예시
추상적인 재귀 결합을 보기 전에 실제 숫자 두 스텝으로 닫힌 형태가 어떻게 만들어지는지 확인해봅니다.

$\beta_1=0.1$, $\beta_2=0.2$로 두면 $\alpha_1=0.9$, $\alpha_2=0.8$입니다. 두 스텝을 이어붙이면 계수는 $\sqrt{\alpha_2\alpha_1}=\sqrt{0.72}\approx0.849$이고 노이즈 계수는 $\sqrt{1-\alpha_2\alpha_1}=\sqrt{0.28}\approx0.529$입니다.

실제로 분산이 보존되는지 확인해봅니다. $0.849^2+0.529^2\approx0.72+0.28=1$입니다. 두 계수의 제곱합이 정확히 1로 맞아떨어집니다.

이 값은 각 스텝의 노이즈를 따로 더해서 얻은 값과도 일치합니다. $\alpha_2(1-\alpha_1)+(1-\alpha_2)=0.8\times0.1+0.2=0.08+0.2=0.28$로 앞서 구한 $1-\bar\alpha_2$와 정확히 같습니다.

두 스텝을 직접 합성해봤더니 $\bar\alpha_2=\alpha_1\alpha_2$라는 누적곱이 그대로 닫힌 식의 계수가 되었습니다. 아래 증명은 이 패턴이 두 스텝만이 아니라 임의의 $t$번째 스텝까지 그대로 이어짐을 보입니다.
