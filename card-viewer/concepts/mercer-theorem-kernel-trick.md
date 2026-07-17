---
slug: mercer-theorem-kernel-trick
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: 머서 정리와 커널트릭: 그람행렬의 PSD 조건
hook: 커널트릭은 "명시적으로 특징벡터 $\phi(x)$를 계산하지 않고도 고차원 특징공간에서의 내적 $\phi(x)\cdot\phi(y)$를 흉내낼 수 있다"는 아이디어예요.
related: 함수공간의 내적(RKHS 기초) · SVM 라그랑주 쌍대문제의 유도
---

## 기본설명
대칭함수 $k:X\times X\to\mathbb{R}$가 임의의 유한한 점들 $x_1,\dots,x_m\in X$에 대해 그람행렬 $K_{ij}:=k(x_i,x_j)$가 양의준정부호(PSD, 모든 벡터 $z$에 대해 $z^TKz\ge0$)이면, 어떤 특징사상 $\psi:\{x_1,\dots,x_m\}\to\mathbb{R}^m$이 존재해 $k(x_i,x_j)=\langle\psi(x_i),\psi(x_j)\rangle$ 로 쓸 수 있다 (유한 표본에서의 머서 정리).

## 문제
$K$가 PSD라는 가정으로부터 모든 고유값 $\lambda_l\ge0$ 이다: 만약 어떤 $\lambda_l<0$ 이라면, 그에 대응하는 고유벡터 $z_l$을 그람행렬의 이차형식에 대입해 $z_l^TKz_l = $==빈칸==$ < 0$ 이 되어 PSD 가정($z^TKz\ge0,\ \forall z$)에 모순되기 때문이다.

## 해설
Kz_l=λ_lz_l (고유벡터 정의)이므로 z_l^TKz_l = z_l^T(λ_lz_l) = λ_l(z_l^Tz_l) = λ_l‖z_l‖²예요. λ_l<0이고 ‖z_l‖²>0이니 이 값 전체는 음수가 돼요.

**정답: $\lambda_l\|z_l\|^2$**

## 예시
그람행렬이 $K=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ 라 합시다. 고유값은 $1$과 $3$으로 모두 음이 아니라 PSD입니다.

고유값분해로 $\psi(x_1)\approx(-0.707,\ 1.225)$, $\psi(x_2)\approx(0.707,\ 1.225)$ 를 얻으면, 실제로 $$\langle\psi(x_1),\psi(x_2)\rangle=(-0.707)(0.707)+(1.225)(1.225)\approx-0.5+1.5=1=K_{12}$$ $$\langle\psi(x_1),\psi(x_1)\rangle\approx0.5+1.5=2=K_{11}$$ 로 그람행렬의 값을 특징벡터의 내적으로 정확히 복원함을 확인할 수 있습니다.
