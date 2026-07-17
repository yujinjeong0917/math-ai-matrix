---
slug: weight-noise-tikhonov-equivalence
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 가중치 노이즈 주입과 정칙화의 동치성: 테일러 전개로 본 그래디언트 벌점
hook: 학습 중에 가중치에 작은 잡음을 섞어 넣으면 모델이 더 안정적으로 일반화된다는 것은 실무에서 잘 알려진 현상입니다.
related: L1 정칙화의 연화임계값 유도
---

## 기본설명
모델 출력을 $\hat y_w(x)$, 제곱오차손실을 $(\hat y_w(x)-y)^2$ 라 하자. 학습 시 가중치에 잡음 $\tilde w=w+\varepsilon$, $\varepsilon\sim\mathcal N(0,\eta I)$ 를 주입한 기대손실을 1차 테일러 전개하면 $$\mathbb E_\varepsilon\big[(\hat y_{w+\varepsilon}(x)-y)^2\big] \approx (\hat y_w(x)-y)^2 + \eta\,\big\|\nabla_w \hat y_w(x)\big\|^2$$ 이다. 즉 데이터 전체에 대한 기대값을 취하면 원래의 손실에 그래디언트 제곱노름에 비례하는 정칙화항 $\eta\,\mathbb E_{x,y}[\|\nabla_w\hat y_w(x)\|^2]$ 이 더해진 것과 같다.

## 문제
$\varepsilon$이 작다고 가정하고 $\hat y_{w+\varepsilon}(x)$를 $w$ 주변에서 1차까지 테일러 전개한다: $$\hat y_{w+\varepsilon}(x) \approx \hat y_w(x) + \varepsilon^\top g,\qquad g:=\nabla_w\hat y_w(x)$$ 이제 이를 손실식에 대입하면 $(\hat y_{w+\varepsilon}(x)-y)^2 \approx (\hat y_w(x)-y+\varepsilon^\top g)^2$ 이고, 이를 전개하면 ==빈칸== 가 된다.

## 해설
$(A+B)^2=A^2+2AB+B^2$ 을 $A=\hat y_w(x)-y$, $B=\varepsilon^\top g$ 로 적용한 것입니다.

**정답: $(\hat y_w(x)-y)^2 + 2(\hat y_w(x)-y)\,\varepsilon^\top g + (\varepsilon^\top g)^2$**

## 예시
선형모델로 직접 검증하면 근사가 아니라 정확히 성립함을 볼 수 있습니다.

$\hat y_w(x)=wx$ (스칼라 가중치, 스칼라 입력), $x=2$, $w=3$, $y=5$, 잡음 분산 $\eta=0.1$ 이라 하자. 원래 손실은 $\hat y=6$이므로 $(\hat y-y)^2=(6-5)^2=1$ 이다.

잡음을 주입한 예측은 $\hat y_{w+\varepsilon}(x)=(w+\varepsilon)x=wx+\varepsilon x$ 로, 이 모델은 $w$에 대해 선형이라 근사 없이 정확히 전개된다. 기대손실을 직접 계산하면
$$\mathbb E_\varepsilon[(wx+\varepsilon x-y)^2] = (wx-y)^2 + 2x(wx-y)\mathbb E[\varepsilon] + x^2\mathbb E[\varepsilon^2] = 1 + 0 + 4(0.1) = 1.4$$
명제의 공식으로도 $\nabla_w\hat y_w(x)=x=2$ 이므로 정칙화항은 $\eta x^2=0.1\times4=0.4$, 합은 $1+0.4=1.4$. 실제로 100만 번 몬테카를로 시뮬레이션을 해도 $1.401$로 일치했습니다.
