---
slug: classifier-guidance
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: Classifier Guidance: 조건부 스코어의 분해
related: 
---

## 도입
디퓨전 모델에서 원하는 클래스 $y$로 생성을 유도하고 싶을 때 조건부 분포의 그래디언트 $\nabla\log p(x|y)$를 직접 학습하지 않고도 만들어낼 수 있습니다. 무조건부 스코어 $\nabla\log p(x)$에 별도로 학습한 분류기의 그래디언트 $\nabla\log p(y|x)$만 더하면 됩니다. 이 분해가 어디서 나오는지 베이즈 정리로 확인해 봅니다.

## 명제
$\nabla_x\log p(x|y) = \nabla_x\log p(x) + \nabla_x\log p(y|x)$.

## 그림
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
<circle cx="100" cy="150" r="3" class="dg-accent"/>
<line x1="100" y1="150" x2="220" y2="90" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="220,90 205,95 213,103" class="dg-stroke-ink"/>
<text x="130" y="105" font-size="12">∇log p(x) (무조건부 스코어)</text>
<line x1="220" y1="90" x2="300" y2="130" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="6,3"/>
<polygon points="300,130 285,127 292,138" class="dg-stroke-ink"/>
<text x="215" y="155" font-size="12">∇log p(y|x) (분류기 그래디언트)</text>
<line x1="100" y1="150" x2="300" y2="130" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="300,130 286,127 291,140" class="dg-stroke-accent"/>
<text x="310" y="120" font-size="12">∇log p(x|y) (조건부 스코어)</text>
<text x="50" y="195" class="dg-dim" font-size="12">무조건부 스코어와 분류기 그래디언트를 더하면 조건부 스코어가 된다</text>
</svg>

_무조건부 스코어 벡터에 분류기 그래디언트 벡터를 더하면 조건부 스코어 벡터가 된다._

## 문제
이 식은 곱과 나눗셈이 섞여 있어 그대로 미분하면 번거롭다. 로그를 씌우면 곱은 덧셈으로 나눗셈은 뺄셈으로 바뀌어 각 항을 따로 다룰 수 있다. 양변에 로그를 씌우면 $\log p(x|y) = \log p(y|x) + \log p(x) - $==빈칸== 이다.

## 해설
로그는 곱을 합으로 나눗셈을 뺄셈으로 바꾼다. 분자의 곱 $p(y|x)p(x)$는 두 항의 합으로 분모의 $p(y)$는 빼는 항으로 바뀐다.

**정답: $\log p(y)$**

## 예시
기호를 미분하기 전에 구체적인 함수 두 개로 세 그래디언트가 실제로 더해지는지 확인해봅니다. $p(x)$를 표준정규분포로, $p(y=1|x)=\sigma(x)$인 시그모이드 분류기를 쓰고 $x=1$에서 계산합니다.

표준정규분포는 $\log p(x)=-x^2/2+\text{const}$이므로 $\nabla_x\log p(x)=-x$입니다. $x=1$에서 이 값은 $-1$입니다.

분류기 쪽은 $\log p(y=1|x)=\log\sigma(x)$이고 $\nabla_x\log\sigma(x)=1-\sigma(x)$입니다. $\sigma(1)\approx0.731$이므로 이 값은 $1-0.731=0.269$입니다.
$$\nabla_x\log p(x)+\nabla_x\log p(y|x)\approx-1+0.269=-0.731$$
실제로 베이즈 정리로 $p(x|y=1)\propto\sigma(x)\,p(x)$를 직접 미분해도 $\nabla_x\log p(x|y=1)=(1-\sigma(x))-x$이므로 $x=1$에서 같은 값 $-0.731$이 나옵니다. 무조건부 스코어와 분류기의 그래디언트를 따로 계산해서 더한 것과 조건부 스코어를 직접 미분한 것이 정확히 일치합니다. 아래 증명은 이 일치가 특정 함수에서만 성립하는 게 아니라 베이즈 정리와 로그의 성질만으로 항상 성립함을 보입니다.
