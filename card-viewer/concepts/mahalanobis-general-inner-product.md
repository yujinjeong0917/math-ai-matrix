---
slug: mahalanobis-general-inner-product
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: 일반화된 내적: 양의정부호 행렬과 마할라노비스 거리
related: 노름의 삼각부등식 · 함수공간의 내적(RKHS 기초)
---

## 도입
유클리드 내적 $\langle x,y\rangle=x^Ty$는 사실 내적이 만족해야 할 공리들의 아주 특수한 경우일 뿐이에요. 대칭 양의정부호(PD) 행렬 $A$만 있으면 $x^TAy$라는 새로운 쌍선형형식으로 완전히 유효한 내적을 만들 수 있고, 이를 이용하면 변수마다 스케일과 상관관계가 다른 데이터에도 맞는 "거리"를 정의할 수 있습니다 — 이것이 바로 마할라노비스 거리예요.

## 명제
$A\in\mathbb{R}^{n\times n}$가 대칭($A^T=A$)이고 양의정부호($x^TAx>0,\ \forall x\ne0$)라 하자. $\langle x,y\rangle_A := x^TAy$ 로 정의하면 이는 $\mathbb{R}^n$ 위의 내적이다(대칭성·쌍선형성·양정치성을 만족한다). 특히 $A=\Sigma^{-1}$ ($\Sigma$: 공분산행렬)로 두면 $d_M(x,y):=\|x-y\|_A=\sqrt{(x-y)^T\Sigma^{-1}(x-y)}$ 는 마할라노비스 거리가 된다.

## 그림
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="110" cy="100" r="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="110" cy="100" r="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="110" cy="100" r="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="110" y="185" font-size="12" text-anchor="middle">유클리드: 원형 등고선</text>
<g transform="rotate(35 310 100)">
<ellipse cx="310" cy="100" rx="65" ry="22" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="6,3"/>
<ellipse cx="310" cy="100" rx="45" ry="15" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="6,3"/>
<ellipse cx="310" cy="100" rx="25" ry="8" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="6,3"/>
</g>
<text x="310" y="185" font-size="12" text-anchor="middle">마할라노비스: 기울어진 타원 등고선</text>
</svg>

_유클리드 거리는 원형 등고선을, 마할라노비스 거리는 공분산 방향으로 기울어진 타원 등고선을 만든다._

## 문제
대칭성: $A^T=A$ 이므로 $\langle y,x\rangle_A = y^TAx = (y^TAx)^T = x^TA^Ty = $==빈칸==$ = \langle x,y\rangle_A$ 이다. (스칼라는 자신의 전치와 같다는 사실을 이용했다.)

## 해설
스칼라 y^TAx의 전치를 취해도 값은 그대로인데, 전치 규칙 (y^TAx)^T = x^TA^Ty를 적용하고 A가 대칭이라 A^T=A이므로 x^TA^Ty = x^TAy가 되어 정확히 <x,y>_A의 정의와 같아져요.

**정답: $x^TAy$**

## 예시
$A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ 는 고유값이 $1,3$ 으로 모두 양수라 대칭 양의정부호입니다.

$x=(1,2)$, $y=(3,-1)$ 에 대해 $\langle x,y\rangle_A = x^TAy = 7$ 이고, 실제로 $\langle y,x\rangle_A=y^TAx=7$ 로 대칭성이 확인됩니다. 또한 $\langle x,x\rangle_A=x^TAx=14>0$ 입니다.

이제 $\Sigma=\begin{pmatrix}4&1\\1&3\end{pmatrix}$ 이고 $A=\Sigma^{-1}$ 라 하면, $d_M(x,y)^2=(x-y)^T\Sigma^{-1}(x-y)$ 에서 $x-y=(-2,3)$ 이므로 $$d_M(x,y)^2 = 5.4545\ldots,\qquad d_M(x,y)\approx2.335$$ 로 계산되어, 공분산의 상관구조를 반영한 거리값을 얻습니다.
