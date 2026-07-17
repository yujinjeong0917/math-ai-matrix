---
slug: bayesian-linear-regression-posterior
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 베이지안 선형회귀: 닫힌형 사후분포와 예측분포
related: 가우시안 조건부분포(Schur complement) · 가우시안 프로세스 회귀 · 켤레사전분포 3종
---

## 도입
릿지회귀에 베이지안 해석을 입히면 점추정 하나가 아니라 파라미터에 대한 완전한 확률분포를 얻습니다. 사전분포와 우도가 모두 가우시안이면 이 사후분포와, 새 입력에 대한 예측분포까지 전부 닫힌 형태로 나옵니다.

## 명제
$w\sim N(m_0,S_0)$, $y\mid X,w\sim N(Xw,\sigma^2I)$ 이면 $w\mid X,y \sim N(m_N,S_N)$, $S_N^{-1}=S_0^{-1}+\sigma^{-2}X^TX$, $m_N=S_N(S_0^{-1}m_0+\sigma^{-2}X^Ty)$ 이고, 새 입력 $x_*$에 대한 예측분포는 $y_*\mid x_*,X,y\sim N(x_*^Tm_N,\ x_*^TS_Nx_*+\sigma^2)$ 이다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<text x="40" y="18" font-size="12">사전분포에서 뽑은 회귀직선들</text>
<line x1="40" y1="190" x2="40" y2="30" class="dg-line" stroke-width="1"/>
<line x1="40" y1="190" x2="300" y2="190" class="dg-line" stroke-width="1"/>
<line x1="40" y1="180" x2="280" y2="40" class="dg-dim" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="40" y1="60" x2="280" y2="170" class="dg-dim" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="40" y1="120" x2="280" y2="30" class="dg-dim" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="40" y1="150" x2="280" y2="190" class="dg-dim" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="40" y1="90" x2="280" y2="100" class="dg-dim" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="40" y="210" font-size="11" class="dg-dim">데이터 반영 전: 기울기·절편이 넓게 퍼짐</text>
<text x="400" y="18" font-size="12">사후분포에서 뽑은 회귀직선들</text>
<line x1="380" y1="190" x2="380" y2="30" class="dg-line" stroke-width="1"/>
<line x1="380" y1="190" x2="650" y2="190" class="dg-line" stroke-width="1"/>
<line x1="390" y1="155" x2="650" y2="55" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="390" y1="150" x2="650" y2="50" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="390" y1="160" x2="650" y2="60" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="390" y1="148" x2="650" y2="52" class="dg-stroke-accent" stroke-width="1.5"/>
<circle cx="420" cy="140" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="480" cy="110" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="380" y="210" font-size="11">관측점 근처로 수렴, 퍼짐이 크게 줄어듦</text>
</svg>

_사전분포에서 뽑은 직선(왼쪽, 넓게 퍼짐)과 달리 사후분포의 직선(오른쪽)은 관측점 근처로 수렴한다._

## 문제
$y=Xw+\varepsilon$ 은 $w$의 아핀변환에 독립인 가우시안 잡음을 더한 것이므로 $(w,y)$는 결합가우시안이다. 교차공분산은 $\mathrm{Cov}(w,y)=\mathrm{Cov}(w,Xw+\varepsilon)=\mathrm{Cov}(w,w)X^T = $==빈칸==

## 해설
$\mathrm{Cov}(w,w)=S_0$이고 $\varepsilon$는 $w$와 독립이라 두 번째 항은 기여가 없으므로, $S_0$에 $X^T$를 곱한 것만 남습니다.

**정답: $S_0X^T$**

## 예시
$1$차원 특성, 관측 2개: $x=(1,2)$, $y=(1,2)$(거의 $y=x$ 관계). 사전분포 $w\sim N(0,1)$($S_0=1$), 잡음분산 $\sigma^2=1$이라 하자.

파라미터공간 공식으로 계산하면 $S_N^{-1}=S_0^{-1}+\sigma^{-2}X^TX = 1+(1^2+2^2)=6$, $S_N=1/6$, $m_N=S_N\cdot\sigma^{-2}X^Ty=\tfrac16(1\cdot1+2\cdot2)=\tfrac16\cdot5=5/6\approx0.833$ 이다.

같은 결과를 데이터공간(Schur complement) 공식으로도 검산할 수 있다: $\Sigma_{yy}=XS_0X^T+\sigma^2I=\begin{pmatrix}2&2\\2&5\end{pmatrix}$, $\Sigma_{xy}=S_0X^T=(1,2)$이고, $\Sigma_{xy}\Sigma_{yy}^{-1}y = 5/6$, $S_0-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yx}=1/6$로 정확히 일치한다.

새 입력 $x_*=4$에서의 예측분포는 평균 $x_*m_N=4\cdot5/6=10/3\approx3.33$, 분산 $x_*^2S_N+\sigma^2=16/6+1\approx3.67$이다.
