---
slug: diffusion-noise-schedule
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: Diffusion 순방향 과정의 분산보존과 닫힌형 노이즈 주입
hook: Diffusion 모델의 순방향 과정은 원본 데이터에 아주 조금씩 여러 스텝에 걸쳐 가우시안 노이즈를 섞어 나갑니다.
---

## 기본설명
$x_t=\sqrt{\alpha_t}x_{t-1}+\sqrt{1-\alpha_t}\epsilon_t$ ($\epsilon_t$는 서로 독립인 표준정규분포)를 반복하면, $\bar\alpha_t=\prod_{s=1}^t\alpha_s$에 대해 $x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\epsilon$ 형태의 닫힌 식을 얻는다.

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
