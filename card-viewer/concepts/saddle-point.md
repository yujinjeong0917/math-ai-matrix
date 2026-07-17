---
slug: saddle-point
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: 안장점에서 그래디언트가 사라지는 이유
related: 
---

## 도입
손실함수 표면에서 기울기가 0인 지점은 극솟값만이 아닙니다. 어느 방향으로는 볼록하고 다른 방향으로는 오목한 안장점도 기울기가 0입니다. 고차원 신경망에서는 이런 안장점이 국소최솟값보다 훨씬 흔하게 나타납니다. 안장점 근처에서 그래디언트가 왜 그렇게 작게 유지되는지 대칭행렬의 대각화로 확인해 봅니다.

## 명제
$\nabla f(x^*)=0$이고 헤시안 $H=\nabla^2f(x^*)$가 양의 고윳값과 음의 고윳값을 모두 가지면(안장점) 음의 고유값 $\lambda<0$의 고유벡터 $v$ 방향으로 $x=x^*+tv$만큼 이동했을 때 $\nabla f(x)\approx t\lambda v$이고 그 크기는 $|t||\lambda|$이다.

## 그림
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
<line x1="200" y1="270" x2="200" y2="30" class="dg-line" stroke-width="1"/>
<line x1="50" y1="150" x2="350" y2="150" class="dg-line" stroke-width="1"/>
<path d="M120,60 Q200,150 120,240" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<path d="M280,60 Q200,150 280,240" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<path d="M90,40 Q200,150 90,260" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="6,3"/>
<path d="M310,40 Q200,150 310,260" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="6,3"/>
<path d="M60,150 Q200,80 340,150" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<path d="M60,150 Q200,220 340,150" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="200" cy="150" r="3" class="dg-accent"/>
<text x="205" y="145" font-size="12">안장점 (∇f=0)</text>
<text x="225" y="70" font-size="12">+ 방향(볼록)</text>
<text x="45" y="150" font-size="12">- 방향(오목)</text>
<text x="45" y="285" class="dg-dim" font-size="12">한 방향은 오목, 다른 방향은 볼록: 헤시안 고윳값 부호가 섞여 있음</text>
</svg>

_안장점에서는 한 방향은 오목, 다른 방향은 볼록해서 그래디언트가 0이면서도 극값이 아니다._

## 문제
손실함수가 두 번 미분 가능하면 헤시안의 $(i,j)$ 성분과 $(j,i)$ 성분은 편미분 순서를 바꿔도 같다. 그러니 $H$는 대칭행렬이다. 대칭행렬은 항상 직교대각화된다는 사실을 스펙트럴 정리에서 이미 확인했다. 그러니 $H=Q\Lambda Q^T$로 쓸 수 있고 $\Lambda$의 대각성분은 실수인 고윳값들이다. 안장점이라는 말은 이 고윳값들 중 어떤 것은 양수이고 어떤 것은 음수라는 뜻이다. 즉 어떤 인덱스 $i,j$에 대해 $($==빈칸==$)$ 가 성립한다.

## 해설
모든 고유값이 양수면 극솟값이고 모두 음수면 극댓값이다. 안장점이려면 극솟값도 극댓값도 아니어야 하므로 고유값의 부호가 섞여 있어야 한다.

**정답: $\lambda_i>0,\ \lambda_j<0$**

## 예시
추상적인 고유값 논증에 들어가기 전에 가장 단순한 안장점 함수로 그래디언트가 실제로 어떻게 변하는지 계산해봅니다. $f(x,y)=x^2-y^2$는 원점에서 그래디언트가 0이지만 $x$ 방향으로는 볼록하고 $y$ 방향으로는 오목한 전형적인 안장점을 가집니다.

헤시안은 $H=\begin{pmatrix}2&0\\0&-2\end{pmatrix}$ 이고 이미 대각행렬이라 고유값은 바로 $2$와 $-2$, 고유벡터는 각각 $(1,0)$과 $(0,1)$입니다.

음의 고유값 $\lambda=-2$의 고유벡터 $v=(0,1)$ 방향으로 $t=0.1$만큼 이동한 점 $(0,0.1)$에서 그래디언트를 직접 계산합니다.
$$\nabla f(0,0.1)=(2x,-2y)=(0,-0.2)$$
크기는 $\|\nabla f\|=0.2$이고 명제가 말하는 값 $|t||\lambda|=0.1\times2=0.2$와 정확히 일치합니다. $f$가 순수한 이차식이라 여기서는 근사가 아니라 정확한 등식입니다.

아래 증명은 이 결과가 이차식뿐 아니라 임의의 함수를 안장점 근처에서 2차 근사했을 때도 똑같은 논리로 성립함을 보입니다.
