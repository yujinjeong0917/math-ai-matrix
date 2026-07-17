---
slug: independent-component-analysis
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 독립성분분석(ICA): 가우시안 소스의 회전 비식별성
related: 확률적 PCA(PPCA)
---

## 도입
여러 신호가 섞인 관측에서 원래 독립적인 소스 신호들을 복원하는 것이 ICA입니다. 그런데 소스가 가우시안이면 아무리 좋은 알고리즘을 써도 원리적으로 복원이 불가능하고, 반대로 소스가 비가우시안이면(가우시안 성분이 최대 1개까지만) 유일하게 복원할 수 있습니다. 이 차이는 가우시안분포만이 갖는 회전 대칭성 때문에 생깁니다.

## 명제
$x=As$, $s$의 성분이 서로 독립이고 $A$가 정칙이라 하자. 모든 $s_i$가 가우시안이면 임의의 직교행렬 $R$에 대해 $A'=AR^T$, $s'=Rs$도 같은 관측분포 $x$를 내므로 $A$는 회전만큼 비식별이다. 반대로 $s_i$ 중 최대 하나만 가우시안이면 $A$는 순열과 스케일을 제외하고 유일하게 식별된다(Darmois–Skitovich 정리).

## 그림
<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
<text x="55" y="20" font-size="13">가우시안 소스: 회전에 불변 (비식별)</text>
<circle cx="170" cy="130" r="80" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="90" y1="130" x2="250" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="170" y1="50" x2="170" y2="210" class="dg-line" stroke-width="1.5"/>
<line x1="113" y1="73" x2="227" y2="187" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="113" y1="187" x2="227" y2="73" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="70" y="228" font-size="11" class="dg-dim">실선 축 = 점선(회전) 축: 등고선이 원이라 구별 불가</text>
<text x="410" y="20" font-size="13">비가우시안(균등) 소스: 회전하면 모양이 달라짐</text>
<rect x="410" y="70" width="120" height="120" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="470,50 550,130 470,210 390,130" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<text x="400" y="228" font-size="11" class="dg-dim">정사각형(실선) ≠ 45° 회전 모양(점선): 식별 가능</text>
</svg>

_가우시안 소스는 회전해도 등고선이 원이라 구별 불가능하지만, 비가우시안 소스는 회전하면 모양이 달라져 식별된다._

## 문제
먼저 모든 $s_i$가 표준정규분포인 경우를 본다. 임의의 직교행렬 $R$($RR^T=R^TR=I$)에 대해 $s' := Rs$ 를 정의하면 $s'$의 공분산은 $\mathrm{Cov}(s')=R\,\mathrm{Cov}(s)\,R^T = RIR^T = $==빈칸==

## 해설
$R$이 직교행렬이므로 $RR^T=I$이고, $\mathrm{Cov}(s)=I$이므로 그대로 $RIR^T = RR^T = I$가 됩니다.

**정답: $I$**

## 예시
회전 비식별성을 2차원에서 확인한다. $A=I$(항등행렬), 회전각 $90°$의 직교행렬 $R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ 을 생각하자. $A'=AR^T=R^T=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ 인데, $A'A'^T=R^TR=I=AA^T$ 이므로 $s\sim N(0,I)$ 이든 $s'=Rs\sim N(0,I)$ 이든 $x=As=A's'$의 분포는 완전히 같다 — 가우시안 소스는 이 회전을 관측만으로 구별할 방법이 없다.

반대로 소스가 비가우시안이면 이 모호함이 깨진다. $s_1,s_2$가 $\mathrm{Uniform}(-\sqrt3,\sqrt3)$(분산 1)로 독립이라 하자. 균등분포의 초과첨도(excess kurtosis)는 이론값 $-1.2$인데(수치실험 $-1.2002$), 두 성분을 45° 방향으로 섞은 $y=(s_1+s_2)/\sqrt2$의 초과첨도는 이론상 원래 값의 절반인 $-0.6$이 된다(수치실험 $-0.597$). 즉 회전으로 섞은 결과는 원래 성분보다 더 가우시안에 가까워져(중심극한정리적 현상) 통계적으로 구별되며, 이 혼합이 진짜 독립성분이 아님이 드러난다.
