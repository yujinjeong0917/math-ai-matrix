---
slug: classifier-free-guidance
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: Classifier-Free Guidance: 별도 분류기 없이 조건부 생성을 더 선명하게 만들기
related: Classifier Guidance: 조건부 스코어의 분해 · 확산모델 정방향과정의 닫힌형 주변분포
---

## 도입
classifier-guidance에서는 무조건부 스코어에 별도로 학습한 분류기의 그래디언트를 더해서 조건부 생성을 유도했습니다. 이 방식은 분류기를 따로 학습해야 하고 그 분류기가 노이즈 낀 중간 단계 $x_t$에서도 잘 작동해야 한다는 부담이 있습니다. Classifier-free guidance는 분류기 없이 디퓨전 모델 하나만으로 같은 효과를 냅니다. 학습할 때 조건 $y$를 무작위로 지워서 조건부 잡음예측 $\epsilon(x,y)$와 무조건부 잡음예측 $\epsilon(x)$를 같은 네트워크로 함께 학습해두고 샘플링할 때 두 예측을 외삽합니다. 이 외삽이 어떤 분포에서 샘플링하는 것과 같은지 스코어함수로 확인해봅니다.

## 명제
$p_w(x|y)\propto p(x|y)^w p(x)^{1-w}$로 정의된 분포의 스코어는 $\nabla_x\log p_w(x|y) = \nabla_x\log p(x) + w\left(\nabla_x\log p(x|y)-\nabla_x\log p(x)\right)$ 이고 이는 잡음예측 공간에서 $\epsilon_w(x,y) = \epsilon(x) + w\left(\epsilon(x,y)-\epsilon(x)\right)$ 와 정확히 같은 형태다.

## 그림
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
<circle cx="80" cy="180" r="4" class="dg-accent"/>
<text x="55" y="200" font-size="12">x</text>
<line x1="80" y1="180" x2="80" y2="70" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<path d="M80,180 L210,130" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="5,4"/>
<polygon points="210,130 198,133 202,122" class="dg-stroke-ink"/>
<text x="215" y="132" font-size="12" class="dg-dim">ε(x) 무조건부</text>
<path d="M80,180 L270,100" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="270,100 256,105 261,92" class="dg-stroke-ink"/>
<text x="278" y="102" font-size="12">ε(x,y) 조건부 (w=1)</text>
<path d="M80,180 L460,20" class="dg-stroke-accent" stroke-width="3"/>
<polygon points="460,20 442,28 448,12" class="dg-stroke-accent"/>
<text x="330" y="45" font-size="12">외삽 ε_w(x,y), w=3</text>
<text x="330" y="60" font-size="11" class="dg-dim">= ε(x)+w(ε(x,y)-ε(x))</text>
</svg>

_무조건부와 조건부 예측의 차이 방향으로 w배 더 길게 외삽하면 조건부 쪽으로 더 뾰족한 분포에서 샘플링하는 것과 같다._

## 문제
이 정규화된 분포에 로그를 씌우면 곱은 합으로 나눗셈은 뺄셈으로 바뀐다. $\log p_w(x|y) = w\log p(x|y) + (1-w)\log p(x) - $==빈칸== 이다.

## 해설
정의의 분모 $Z(y)$에 로그를 씌우면 부호가 반대로 붙어 빼는 항이 된다. 분자의 두 거듭제곱은 로그를 통해 각각 계수 $w$와 $1-w$가 곱해진 덧셈으로 풀린다.

**정답: $\log Z(y)$**

## 예시
추상적인 스코어 공식을 보기 전에 구체적인 두 가우시안으로 거듭제곱 분포의 스코어가 정말 두 스코어의 선형결합인지 확인해봅니다. $p(x)=N(x;0,1)$, $p(x|y)=N(x;2,1)$이고 $w=3$을 씁니다.

각 스코어를 $x=1$에서 계산합니다. $\nabla_x\log p(x)=-x$이므로 $-1$이고 $\nabla_x\log p(x|y)=-(x-2)=2-x$이므로 $1$입니다.
$$\nabla_x\log p(x) + w\left(\nabla_x\log p(x|y)-\nabla_x\log p(x)\right) = -1+3\times(1-(-1)) = -1+6=5$$
이제 $p_w(x|y)\propto p(x|y)^3p(x)^{-2}$를 직접 로그미분해서 검산합니다. $\log p_w(x|y) = w\log p(x|y)+(1-w)\log p(x)+\text{const} = -\frac{w}{2}(x-2)^2-\frac{1-w}{2}x^2+\text{const}$이고 이를 $x$로 미분하면 $-w(x-2)-(1-w)x=2w-x$가 됩니다. $w=3,x=1$을 넣으면 $2\times3-1=5$로 방금 얻은 값과 정확히 일치합니다.

이제 실제 디퓨전 샘플링에서 쓰는 잡음예측 값으로도 같은 외삽식을 확인해봅니다. 무조건부 예측이 $\epsilon(x)=0.5$, 조건부 예측이 $\epsilon(x,y)=1.2$, guidance 강도가 $w=3$이라 하면 다음과 같습니다.
$$\epsilon_w(x,y)=\epsilon(x)+w(\epsilon(x,y)-\epsilon(x))=0.5+3\times(1.2-0.5)=0.5+2.1=2.6$$
$w=1$이면 그냥 조건부 예측 $\epsilon(x,y)=1.2$ 그대로이고 $w=3$으로 키우자 예측이 $2.6$까지 밀려나 조건부 방향으로 원래보다 더 강하게 밀어붙입니다. 아래 증명은 이 외삽식이 왜 거듭제곱으로 뾰족해진 분포 $p_w(x|y)$에서 샘플링하는 것과 정확히 같은지 일반적으로 보입니다.
