---
slug: fgsm-adversarial-perturbation
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: FGSM: 1차 근사로 유도하는 최적 적대적 섭동
related: 볼록함수 경사하강법 O(1/k) 수렴률
---

## 도입
아주 작은 섭동만 더해도 신경망을 완전히 속일 수 있다는 적대적 예제 현상은, 사실 손실함수의 1차 근사(선형화) 위에서 아주 간단한 제약 최적화 문제를 풀면 자연스럽게 유도됩니다. "얼마나 세게, 어느 방향으로 흔들어야 손실이 가장 빨리 커지는가"라는 질문에 대한 답이 바로 FGSM(Fast Gradient Sign Method)입니다.

## 명제
입력 $x$, 손실 $L(\theta,x,y)$가 $x$에 대해 미분가능하다고 하자. $\ell_\infty$ 노름 제약 $\|\delta\|_\infty\le\varepsilon$ 아래, 손실의 1차 테일러 근사 $L(\theta,x+\delta,y)\approx L(\theta,x,y)+\delta^\top\nabla_xL(\theta,x,y)$ 를 최대화하는 섭동은 $$\delta^* = \varepsilon\,\mathrm{sign}\big(\nabla_xL(\theta,x,y)\big)$$ 이다.

## 그림
<svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="230" cy="150" rx="140" ry="90" fill="none" class="dg-stroke-ink" stroke-width="1.2"/>
<ellipse cx="230" cy="150" rx="95" ry="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<ellipse cx="230" cy="150" rx="50" ry="30" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="170" y="90" width="120" height="120" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="6,3"/>
<circle cx="230" cy="150" r="4" class="dg-accent"/>
<text x="230" y="170" font-size="11" text-anchor="middle">x</text>
<path d="M230,150 L285,100" class="dg-stroke-accent" stroke-width="3"/>
<polygon points="285,100 272,102 279,111" class="dg-stroke-accent"/>
<circle cx="290" cy="90" r="4" class="dg-accent"/>
<text x="300" y="85" font-size="12">x+δ* = x+ε·sign(∇L)</text>
<text x="170" y="80" font-size="11" class="dg-dim">‖δ‖∞ ≤ ε 제약 상자</text>
<text x="230" y="225" font-size="11" class="dg-dim" text-anchor="middle">손실 등고선</text>
</svg>

_L∞ 제약 상자 안에서 그래디언트 부호 방향으로 이동하면 상자의 모서리에 도달해 손실 증가가 최대화된다._

## 문제
이제 좌표 하나만 본다. $|\delta_i|\le\varepsilon$ 범위에서 $\delta_ig_i$ 를 최대화하려면, $g_i>0$일 때는 $\delta_i$를 가능한 한 크게($\delta_i=\varepsilon$), $g_i<0$일 때는 가능한 한 작게($\delta_i=-\varepsilon$) 잡아야 한다. 이는 곧 $\delta_i=\varepsilon\,\mathrm{sign}(g_i)$ 이며, 이때 최댓값은 $\delta_ig_i=$==빈칸== 이다.

## 해설
$\delta_i=\varepsilon\,\mathrm{sign}(g_i)$이면 $\delta_ig_i=\varepsilon\,\mathrm{sign}(g_i)\,g_i=\varepsilon|g_i|$ 이기 때문입니다.

**정답: $\varepsilon\,|g_i|$**

## 예시
3차원 벡터로 직접 최적해를 확인해봅니다.

그래디언트가 $g=\nabla_xL=(2,-3,1)$, 섭동 예산 $\varepsilon=0.1$ 이라 하자. 공식대로 $\delta^*=\varepsilon\,\mathrm{sign}(g)=(0.1,-0.1,0.1)$ 이다.

이때 선형근사 증가량은 $\delta^{*\top}g = 0.1(2)+(-0.1)(-3)+0.1(1) = 0.2+0.3+0.1=0.6$ 이고, 이는 $\varepsilon\|g\|_1=0.1\times(2+3+1)=0.6$ 과 정확히 같습니다.

비교를 위해 부호를 하나 틀리게 잡은 $\delta'=(0.1,0.1,0.1)$을 시도하면 $\delta'^\top g=0.2-0.3+0.1=0.0$ 으로 $\delta^*$보다 훨씬 작습니다. 이는 부호를 그래디언트에 맞추지 않으면 손실 증가량이 줄어든다는 것을 직접 보여줍니다.
