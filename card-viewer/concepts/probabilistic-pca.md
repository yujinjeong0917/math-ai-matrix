---
slug: probabilistic-pca
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 확률적 주성분분석(PPCA)의 주변분포와 결정론적 PCA로의 수렴
related: 가우시안 조건부분포(Schur complement) · 주성분분석(PCA)의 최적 방향
---

## 도입
PCA는 원래 '분산을 최대로 보존하는 방향을 찾는' 결정론적 최적화 문제로 소개되지만, 같은 결과를 확률적 생성모델로도 얻을 수 있습니다. 잠재변수에서 관측을 만들어내는 선형-가우시안 모델을 세우면, 관측잡음이 사라지는 극한에서 이 확률모델이 정확히 표준 PCA로 붕괴합니다.

## 명제
$z\sim N(0,I_k)$, $x=Wz+\mu+\varepsilon$, $\varepsilon\sim N(0,\sigma^2I_d)$($z\perp\varepsilon$) 라 하면 $x\sim N(\mu,\,WW^T+\sigma^2I)$ 이고, $W$가 열계수 $k$일 때 $\sigma^2\to0$ 극한에서 잠재변수의 사후평균에 의한 재구성값은 $x$를 $W$의 열공간으로의 직교사영으로 수렴한다.

## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="190" x2="480" y2="60" class="dg-stroke-ink" stroke-width="2"/>
<text x="340" y="50" font-size="12">잠재직선 (W의 열공간)</text>
<circle cx="160" cy="110" r="5" class="dg-dim"/>
<line x1="160" y1="110" x2="188" y2="138" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<circle cx="190" cy="140" r="3" class="dg-accent"/>
<circle cx="300" cy="150" r="5" class="dg-dim"/>
<line x1="300" y1="150" x2="322" y2="122" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<circle cx="320" cy="120" r="3" class="dg-accent"/>
<circle cx="400" cy="130" r="5" class="dg-dim"/>
<line x1="400" y1="130" x2="392" y2="97" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<circle cx="390" cy="95" r="3" class="dg-accent"/>
<text x="60" y="215" font-size="11" class="dg-dim">관측 x = Wz + μ + ε (잡음 σ² 있음)</text>
<text x="260" y="230" font-size="11">σ² → 0: 사후평균이 직교사영 Px로 수렴</text>
</svg>

_관측잡음 σ²이 줄어들수록 재구성값이 잠재직선 위 직교사영점으로 수렴한다._

## 문제
먼저 주변분포다. $x$는 독립인 가우시안 $z,\varepsilon$의 아핀결합이므로 $x$ 자체도 가우시안이다. 평균은 $E[x]=WE[z]+\mu+E[\varepsilon]=\mu$ 이고, 공분산은 $z\perp\varepsilon$이므로 $\mathrm{Cov}(x)=W\,\mathrm{Cov}(z)\,W^T+\mathrm{Cov}(\varepsilon) = $==빈칸==

## 해설
$\mathrm{Cov}(z)=I_k$, $\mathrm{Cov}(\varepsilon)=\sigma^2I_d$이므로 $W\cdot I\cdot W^T+\sigma^2I = WW^T+\sigma^2I$가 됩니다.

**정답: $WW^T+\sigma^2I$**

## 예시
$d=2,\,k=1$인 가장 단순한 PPCA로 극한 수렴을 직접 확인한다. $W=(2,0)^T$, $\mu=(0,0)$, 관측 $x=(3,4)$ 라 하자.

$\sigma^2=1$일 때 $M=W^TW+\sigma^2=4+1=5$이므로 $E[z\mid x]=M^{-1}W^T(x-\mu) = (2\cdot3+0\cdot4)/5=6/5=1.2$, 재구성값은 $W\cdot1.2=(2.4,0)$이다.

$\sigma^2$을 $0.1,\,0.01$로 줄이면 재구성값은 각각 $(2.927,0),\,(2.993,0)$으로 점점 가까워지고, $\sigma^2\to0$의 극한에서는 정확히 $(3,0)$이 된다. 이는 $x=(3,4)$를 $W$의 열공간(=$x$축)으로 직교사영한 값 $Px=(3,0)$과 정확히 일치한다(여기서 $P=W(W^TW)^{-1}W^T=\mathrm{diag}(1,0)$).
