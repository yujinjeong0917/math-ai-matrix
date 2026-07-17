---
slug: mercer-theorem-kernel-trick
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: 머서 정리와 커널트릭: 그람행렬의 PSD 조건
related: 함수공간의 내적(RKHS 기초) · SVM 라그랑주 쌍대문제의 유도
---

## 도입
커널트릭은 "명시적으로 특징벡터 $\phi(x)$를 계산하지 않고도 고차원 특징공간에서의 내적 $\phi(x)\cdot\phi(y)$를 흉내낼 수 있다"는 아이디어예요. 그런데 아무 함수나 이렇게 쓸 수 있는 건 아니고, 머서 정리가 그 조건 — 그람행렬이 양의준정부호(PSD)이면 된다 — 을 정확히 알려줍니다.

## 명제
대칭함수 $k:X\times X\to\mathbb{R}$가 임의의 유한한 점들 $x_1,\dots,x_m\in X$에 대해 그람행렬 $K_{ij}:=k(x_i,x_j)$가 양의준정부호(PSD, 모든 벡터 $z$에 대해 $z^TKz\ge0$)이면, 어떤 특징사상 $\psi:\{x_1,\dots,x_m\}\to\mathbb{R}^m$이 존재해 $k(x_i,x_j)=\langle\psi(x_i),\psi(x_j)\rangle$ 로 쓸 수 있다 (유한 표본에서의 머서 정리).

## 그림
<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="100" x2="200" y2="100" class="dg-dim" stroke-width="1.5"/>
<circle cx="55" cy="100" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="95" cy="100" r="5" class="dg-accent"/>
<circle cx="130" cy="100" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="170" cy="100" r="5" class="dg-accent"/>
<text x="110" y="130" font-size="11" class="dg-dim">저차원: 직선으로 분리 불가</text>
<line x1="220" y1="100" x2="270" y2="100" class="dg-line" stroke-width="2"/>
<polygon points="270,100 260,95 260,105" class="dg-stroke-ink"/>
<text x="222" y="85" font-size="11">φ(x)</text>
<circle cx="330" cy="150" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="370" cy="160" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="350" cy="50" r="5" class="dg-accent"/>
<circle cx="410" cy="60" r="5" class="dg-accent"/>
<line x1="290" y1="105" x2="450" y2="95" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="6,3"/>
<text x="300" y="90" font-size="11">분리 초평면</text>
<text x="380" y="190" font-size="11" class="dg-dim">고차원 특징공간</text>
</svg>

_저차원에서 분리 불가능한 두 클래스가 특징사상 φ를 거치면 초평면으로 분리된다._

## 문제
$K$가 PSD라는 가정으로부터 모든 고유값 $\lambda_l\ge0$ 이다: 만약 어떤 $\lambda_l<0$ 이라면, 그에 대응하는 고유벡터 $z_l$을 그람행렬의 이차형식에 대입해 $z_l^TKz_l = $==빈칸==$ < 0$ 이 되어 PSD 가정($z^TKz\ge0,\ \forall z$)에 모순되기 때문이다.

## 해설
Kz_l=λ_lz_l (고유벡터 정의)이므로 z_l^TKz_l = z_l^T(λ_lz_l) = λ_l(z_l^Tz_l) = λ_l‖z_l‖²예요. λ_l<0이고 ‖z_l‖²>0이니 이 값 전체는 음수가 돼요.

**정답: $\lambda_l\|z_l\|^2$**

## 예시
그람행렬이 $K=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ 라 합시다. 고유값은 $1$과 $3$으로 모두 음이 아니라 PSD입니다.

고유값분해로 $\psi(x_1)\approx(-0.707,\ 1.225)$, $\psi(x_2)\approx(0.707,\ 1.225)$ 를 얻으면, 실제로 $$\langle\psi(x_1),\psi(x_2)\rangle=(-0.707)(0.707)+(1.225)(1.225)\approx-0.5+1.5=1=K_{12}$$ $$\langle\psi(x_1),\psi(x_1)\rangle\approx0.5+1.5=2=K_{11}$$ 로 그람행렬의 값을 특징벡터의 내적으로 정확히 복원함을 확인할 수 있습니다.
