---
slug: gaussian-marginal-distribution
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 다변량 가우시안의 주변분포
related: 가우시안 조건부분포(Schur complement)
---

## 도입
결합분포에서 일부 변수를 '적분해서 지워버리면' 남는 변수들의 분포를 주변분포라 부릅니다. 일반적인 분포에서는 이 적분이 매우 어렵지만, 가우시안은 특별해서 아무리 많은 변수를 지워도 남는 분포가 다시 가우시안입니다.

## 명제
$(x,y)\sim N(\mu,\Sigma)$, $\mu=(\mu_x;\mu_y)$, $\Sigma=\begin{pmatrix}\Sigma_{xx}&\Sigma_{xy}\\\Sigma_{yx}&\Sigma_{yy}\end{pmatrix}$ 이면 $x\sim N(\mu_x,\Sigma_{xx})$ 이다. 즉 결합공분산행렬에서 해당 블록만 남기면 그것이 곧 주변분포의 공분산이다.

## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="180" cy="90" rx="110" ry="55" fill="none" class="dg-stroke-ink" stroke-width="2" transform="rotate(20 180 90)"/>
<ellipse cx="180" cy="90" rx="75" ry="37" fill="none" class="dg-stroke-ink" stroke-width="1.5" transform="rotate(20 180 90)"/>
<line x1="95" y1="190" x2="95" y2="150" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="130" y1="190" x2="130" y2="135" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="180" y1="190" x2="180" y2="122" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="230" y1="190" x2="230" y2="135" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="265" y1="190" x2="265" y2="150" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="60" y1="190" x2="300" y2="190" class="dg-line" stroke-width="1.5"/>
<text x="60" y="215" font-size="11" class="dg-dim">y를 적분해 없앰 (주변화)</text>
<line x1="320" y1="150" x2="370" y2="150" class="dg-stroke-accent" stroke-width="2"/>
<path d="M362,143 L372,150 L362,157" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<path d="M390,220 Q470,60 550,220" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<line x1="390" y1="220" x2="550" y2="220" class="dg-line" stroke-width="1"/>
<text x="395" y="240" font-size="11">x의 주변분포 N(μx, Σxx)</text>
</svg>

_2D 가우시안을 y축 방향으로 적분한 그림자(주변분포)는 다시 1차원 가우시안이 된다._

## 문제
먼저 선형항을 계산하면 $t^T\mu = t_x^T\mu_x + 0^T\mu_y = $==빈칸==

## 해설
$t_y=0$이므로 $\mu_y$와 곱해지는 항이 사라지고 $t_x^T\mu_x$만 남습니다.

**정답: $t_x^T\mu_x$**

## 예시
먼저 가장 단순한 2차원 경우로 감을 잡는다. $(x,y)\sim N\left((0,0),\begin{pmatrix}2&1\\1&2\end{pmatrix}\right)$ 라면, 잘 알려진 이변량정규분포의 주변분포 성질에 의해 $x\sim N(0,2)$ 이다 — 이는 공분산행렬의 좌상단 원소를 그대로 읽은 것과 같다.

블록이 여러 성분일 때도 같은 원리가 성립함을 3차원에서 확인한다. $\mu=(1,2,3)$, $\Sigma=\begin{pmatrix}4&2&0\\2&3&1\\0&1&2\end{pmatrix}$ 인 3차원 가우시안에서 앞의 두 성분 $(x_1,x_2)$의 주변분포를 구하면, 나머지 성분($x_3$)의 평균·공분산 정보는 모두 사라지고 대응하는 블록만 남아 $$(x_1,x_2)\sim N\left((1,2),\ \begin{pmatrix}4&2\\2&3\end{pmatrix}\right)$$ 이 된다(공분산행렬 $\Sigma$의 좌상단 $2\times2$ 블록을 그대로 취한 것).
