---
slug: fgsm-adversarial-perturbation
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: FGSM: 1차 근사로 유도하는 최적 적대적 섭동
hook: 아주 작은 섭동만 더해도 신경망을 완전히 속일 수 있다는 적대적 예제 현상은, 사실 손실함수의 1차 근사(선형화) 위에서 아주 간단한 제약 최적화 문제를 풀면 자연스럽게 유도됩니다.
related: 볼록함수 경사하강법 O(1/k) 수렴률
---

## 기본설명
입력 $x$, 손실 $L(\theta,x,y)$가 $x$에 대해 미분가능하다고 하자. $\ell_\infty$ 노름 제약 $\|\delta\|_\infty\le\varepsilon$ 아래, 손실의 1차 테일러 근사 $L(\theta,x+\delta,y)\approx L(\theta,x,y)+\delta^\top\nabla_xL(\theta,x,y)$ 를 최대화하는 섭동은 $$\delta^* = \varepsilon\,\mathrm{sign}\big(\nabla_xL(\theta,x,y)\big)$$ 이다.

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
