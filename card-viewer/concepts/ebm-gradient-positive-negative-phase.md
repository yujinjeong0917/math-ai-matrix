---
slug: ebm-gradient-positive-negative-phase
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 에너지기반모델의 그래디언트: 양성위상과 음성위상
hook: 에너지기반모델(EBM)은 각 데이터 지점에 "에너지"를 부여하고, 에너지가 낮을수록 확률이 높다고 정의합니다.
---

## 기본설명
에너지함수 $E_\theta:\mathbb R^d\to\mathbb R$로 정의되는 에너지기반모델 $p_\theta(x)=\exp(-E_\theta(x))/Z(\theta)$, $Z(\theta)=\int\exp(-E_\theta(x'))\,dx'$를 생각하자. 데이터 $x\sim p_{\text{data}}$에 대한 음의 로그우도 손실 $J(\theta)=\mathbb E_{x\sim p_{\text{data}}}[-\log p_\theta(x)]$의 그래디언트는 $$\nabla_\theta J(\theta) = \mathbb E_{x\sim p_{\text{data}}}[\nabla_\theta E_\theta(x)] - \mathbb E_{x'\sim p_\theta}[\nabla_\theta E_\theta(x')]$$ 로 쓰인다. 첫째 항을 양성위상(positive phase), 둘째 항을 음성위상(negative phase)이라 부른다.

## 문제
로그의 미분 공식으로 $\nabla_\theta \log Z(\theta) = $==빈칸== 이다.

## 해설
합성함수 미분법 $\frac{d}{d\theta}\log Z=\frac{1}{Z}\frac{dZ}{d\theta}$를 벡터 $\theta$에 대해 그대로 적용한 거예요.

**정답: $\frac{\nabla_\theta Z(\theta)}{Z(\theta)}$**

## 예시
추상적인 지수족 적분 논증에 들어가기 전에, 가장 단순한 에너지함수 $E_\theta(x)=\theta x^2/2$ ($\theta>0$)로 명제를 확인해봅니다. 이때 $p_\theta(x)\propto\exp(-\theta x^2/2)$는 평균 0, 분산 $1/\theta$인 가우시안이고, 정규화상수는 가우시안 적분 공식으로 $Z(\theta)=\int\exp(-\theta x^2/2)dx=\sqrt{2\pi/\theta}$입니다.

$\theta=2$에서 직접 계산해봅니다. $\log Z(\theta) = \frac12\log(2\pi)-\frac12\log\theta$ 이므로 $\nabla_\theta\log Z(\theta)=-\frac{1}{2\theta}$, 즉 $\theta=2$에서 $-0.25$입니다.

한편 음성위상 쪽에서 직접 계산하면 $\nabla_\theta E_\theta(x')=x'^2/2$이고 $x'\sim\mathcal N(0,1/\theta)$이므로 $\mathbb E_{p_\theta}[\nabla_\theta E_\theta(x')]=\mathbb E[x'^2]/2=\mathrm{Var}(x')/2=\frac{1}{2\theta}$, $\theta=2$에서 $0.25$입니다. 정확히 $\nabla_\theta\log Z(\theta)=-\mathbb E_{p_\theta}[\nabla_\theta E_\theta(x')]$가 수치로 확인되며($-0.25=-0.25$), 이는 명제의 핵심 등식과 정확히 일치합니다(직접 재계산해 확인).
