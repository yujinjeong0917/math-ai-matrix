---
slug: gaussian-marginal-distribution
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 다변량 가우시안의 주변분포
hook: 결합분포에서 일부 변수를 '적분해서 지워버리면' 남는 변수들의 분포를 주변분포라 부릅니다.
related: 가우시안 조건부분포(Schur complement)
---

## 기본설명
$(x,y)\sim N(\mu,\Sigma)$, $\mu=(\mu_x;\mu_y)$, $\Sigma=\begin{pmatrix}\Sigma_{xx}&\Sigma_{xy}\\\Sigma_{yx}&\Sigma_{yy}\end{pmatrix}$ 이면 $x\sim N(\mu_x,\Sigma_{xx})$ 이다. 즉 결합공분산행렬에서 해당 블록만 남기면 그것이 곧 주변분포의 공분산이다.

## 문제
먼저 선형항을 계산하면 $t^T\mu = t_x^T\mu_x + 0^T\mu_y = $==빈칸==

## 해설
$t_y=0$이므로 $\mu_y$와 곱해지는 항이 사라지고 $t_x^T\mu_x$만 남습니다.

**정답: $t_x^T\mu_x$**

## 예시
먼저 가장 단순한 2차원 경우로 감을 잡는다. $(x,y)\sim N\left((0,0),\begin{pmatrix}2&1\\1&2\end{pmatrix}\right)$ 라면, 잘 알려진 이변량정규분포의 주변분포 성질에 의해 $x\sim N(0,2)$ 이다 — 이는 공분산행렬의 좌상단 원소를 그대로 읽은 것과 같다.

블록이 여러 성분일 때도 같은 원리가 성립함을 3차원에서 확인한다. $\mu=(1,2,3)$, $\Sigma=\begin{pmatrix}4&2&0\\2&3&1\\0&1&2\end{pmatrix}$ 인 3차원 가우시안에서 앞의 두 성분 $(x_1,x_2)$의 주변분포를 구하면, 나머지 성분($x_3$)의 평균·공분산 정보는 모두 사라지고 대응하는 블록만 남아 $$(x_1,x_2)\sim N\left((1,2),\ \begin{pmatrix}4&2\\2&3\end{pmatrix}\right)$$ 이 된다(공분산행렬 $\Sigma$의 좌상단 $2\times2$ 블록을 그대로 취한 것).
