---
slug: orthogonal-projection-theorem
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: 직교 사영 정리: 최적 근사와 오차의 직교성
hook: 부분공간 $U$ 위로 데이터를 내려보내 "가장 가까운 점"을 찾고 싶다면, 그 점은 항상 원래 벡터와의 오차가 $U$에 수직인 지점이라는 성질을 갖습니다 — 이것이 최소제곱법의 기하학적 심장이에요.
---

## 기본설명
$U\subset\mathbb{R}^n$을 부분공간, $B\in\mathbb{R}^{n\times k}$를 $U$의 기저를 열로 갖는 행렬($U=\mathrm{col}(B)$, $B^TB$ 가역)이라 하자. $x\in\mathbb{R}^n$에 대해 $\pi_U(x):=\arg\min_{u\in U}\|x-u\|$ 라 하면, (i) $u^*\in U$가 $\|x-u\|$를 최소화하는 것과 오차 $(x-u^*)\perp U$는 동치이고, (ii) $\pi_U(x) = Bc^*$, $c^*=(B^TB)^{-1}B^Tx$, 즉 사영행렬 $P=B(B^TB)^{-1}B^T$는 대칭($P^T=P$)이고 멱등($P^2=P$)이다.

## 문제
임계점 조건 $\nabla\varphi(c)=0$을 구하면 $-2B^Tx + 2B^TBc = 0$, 즉 $B^TBc = $==빈칸== 이다.

## 해설
그래디언트 식을 0으로 놓고 정리하면 2B^TBc = 2B^Tx가 되고, 양변을 2로 나누면 정규방정식(normal equation) B^TBc=B^Tx를 얻어요.

**정답: $B^Tx$**

## 예시
$B=\begin{pmatrix}1&0\\1&1\\0&1\end{pmatrix}$ (즉 $U=\mathrm{col}(B)\subset\mathbb{R}^3$), $x=(1,2,3)$ 이라 합니다.

계산하면 사영행렬 $P=B(B^TB)^{-1}B^T$ 이고, $$\pi_U(x)=Px=\left(\tfrac13,\tfrac83,\tfrac73\right),\qquad x-\pi_U(x)=\left(\tfrac23,-\tfrac23,\tfrac23\right)$$ 입니다. 실제로 $B^T(x-\pi_U(x))\approx(0,0)$ 로 오차가 $U$에 수직임이 확인됩니다.

최소성도 확인해봅니다. $\|x-\pi_U(x)\|=\sqrt{4/3}\approx1.155$ 인데, $U$의 다른 점 $B(c^*+(0.1,0))$ 과 $x$의 거리는 $\approx1.163$ 으로 더 커서, $\pi_U(x)$가 실제로 더 가까운 점임을 알 수 있습니다. 또한 직접 계산하면 $P^T=P$, $P^2=P$ 도 성립합니다.
