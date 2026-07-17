---
slug: ebm-gradient-positive-negative-phase
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 에너지기반모델의 그래디언트: 양성위상과 음성위상
related: 대조발산(Contrastive Divergence) · 스코어매칭(Hyvärinen)
---

## 도입
에너지기반모델(EBM)은 각 데이터 지점에 "에너지"를 부여하고, 에너지가 낮을수록 확률이 높다고 정의합니다. 그런데 이 정의에는 확률의 합을 1로 맞추기 위한 분배함수 $Z(\theta)$가 숨어 있고, 이 $Z(\theta)$도 $\theta$에 의존하기 때문에 로그우도를 미분하면 뜻밖의 항이 하나 더 튀어나옵니다.

## 명제
에너지함수 $E_\theta:\mathbb R^d\to\mathbb R$로 정의되는 에너지기반모델 $p_\theta(x)=\exp(-E_\theta(x))/Z(\theta)$, $Z(\theta)=\int\exp(-E_\theta(x'))\,dx'$를 생각하자. 데이터 $x\sim p_{\text{data}}$에 대한 음의 로그우도 손실 $J(\theta)=\mathbb E_{x\sim p_{\text{data}}}[-\log p_\theta(x)]$의 그래디언트는 $$\nabla_\theta J(\theta) = \mathbb E_{x\sim p_{\text{data}}}[\nabla_\theta E_\theta(x)] - \mathbb E_{x'\sim p_\theta}[\nabla_\theta E_\theta(x')]$$ 로 쓰인다. 첫째 항을 양성위상(positive phase), 둘째 항을 음성위상(negative phase)이라 부른다.

## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<path d="M40,150 C150,60 250,180 350,90 C420,50 480,140 520,100" fill="none" class="dg-stroke-ink" stroke-width="2.5"/>
<circle cx="250" cy="180" r="4" class="dg-accent"/>
<path d="M250,180 L250,145" class="dg-stroke-accent" stroke-width="3"/>
<polygon points="250,145 244,156 256,156" class="dg-stroke-accent"/>
<text x="250" y="205" font-size="11" text-anchor="middle">데이터 x</text>
<text x="255" y="130" font-size="11">양성위상: 에너지 낮추기</text>
<circle cx="420" cy="50" r="4" class="dg-dim"/>
<path d="M420,50 L420,85" class="dg-stroke-ink" stroke-width="3" stroke-dasharray="5,3"/>
<polygon points="420,85 414,74 426,74" class="dg-stroke-ink" transform="rotate(180 420 85)"/>
<text x="420" y="40" font-size="11" text-anchor="middle" class="dg-dim">모델 샘플 x'</text>
<text x="380" y="105" font-size="11" class="dg-dim">음성위상: 에너지 높이기</text>
</svg>

_양성위상은 데이터 지점의 에너지를 낮추고, 음성위상은 모델이 만든 샘플의 에너지를 높인다._

## 문제
로그의 미분 공식으로 $\nabla_\theta \log Z(\theta) = $==빈칸== 이다.

## 해설
합성함수 미분법 $\frac{d}{d\theta}\log Z=\frac{1}{Z}\frac{dZ}{d\theta}$를 벡터 $\theta$에 대해 그대로 적용한 거예요.

**정답: $\frac{\nabla_\theta Z(\theta)}{Z(\theta)}$**

## 예시
추상적인 지수족 적분 논증에 들어가기 전에, 가장 단순한 에너지함수 $E_\theta(x)=\theta x^2/2$ ($\theta>0$)로 명제를 확인해봅니다. 이때 $p_\theta(x)\propto\exp(-\theta x^2/2)$는 평균 0, 분산 $1/\theta$인 가우시안이고, 정규화상수는 가우시안 적분 공식으로 $Z(\theta)=\int\exp(-\theta x^2/2)dx=\sqrt{2\pi/\theta}$입니다.

$\theta=2$에서 직접 계산해봅니다. $\log Z(\theta) = \frac12\log(2\pi)-\frac12\log\theta$ 이므로 $\nabla_\theta\log Z(\theta)=-\frac{1}{2\theta}$, 즉 $\theta=2$에서 $-0.25$입니다.

한편 음성위상 쪽에서 직접 계산하면 $\nabla_\theta E_\theta(x')=x'^2/2$이고 $x'\sim\mathcal N(0,1/\theta)$이므로 $\mathbb E_{p_\theta}[\nabla_\theta E_\theta(x')]=\mathbb E[x'^2]/2=\mathrm{Var}(x')/2=\frac{1}{2\theta}$, $\theta=2$에서 $0.25$입니다. 정확히 $\nabla_\theta\log Z(\theta)=-\mathbb E_{p_\theta}[\nabla_\theta E_\theta(x')]$가 수치로 확인되며($-0.25=-0.25$), 이는 명제의 핵심 등식과 정확히 일치합니다(직접 재계산해 확인).
