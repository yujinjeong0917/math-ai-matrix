---
slug: gaussian-conditional-schur-complement
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 다변량 가우시안의 조건부분포와 Schur complement
related: 다변량 가우시안의 주변분포 · 확률적 PCA(PPCA) · 가우시안 프로세스 회귀 · 베이지안 선형회귀 사후분포
---

## 도입
다변량 가우시안에서 일부 변수를 관측했을 때 나머지 변수의 분포는 어떻게 바뀔까요? 놀랍게도 답은 여전히 가우시안이고, 그 평균과 공분산은 원래 공분산행렬의 블록들만으로 깔끔하게 표현됩니다. 이 공식은 칼만필터, 가우시안 프로세스, 베이지안 선형회귀 등 확률적 머신러닝 전반의 기초가 됩니다.

## 명제
$(x,y)\sim N(\mu,\Sigma)$, $\mu=(\mu_x;\mu_y)$, $\Sigma=\begin{pmatrix}\Sigma_{xx}&\Sigma_{xy}\\\Sigma_{yx}&\Sigma_{yy}\end{pmatrix}$ 라 하면 $x\mid y \sim N\left(\mu_x+\Sigma_{xy}\Sigma_{yy}^{-1}(y-\mu_y),\ \Sigma_{xx}-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yx}\right)$ 이다. 뒤의 공분산은 $\Sigma_{yy}$에 대한 $\Sigma$의 Schur complement이다.

## 그림
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="150" cy="120" rx="90" ry="50" fill="none" class="dg-stroke-ink" stroke-width="2" transform="rotate(35 150 120)"/>
<ellipse cx="150" cy="120" rx="60" ry="33" fill="none" class="dg-stroke-ink" stroke-width="1.5" transform="rotate(35 150 120)"/>
<line x1="20" y1="152" x2="280" y2="152" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="6,4"/>
<text x="20" y="145" font-size="12">y = y0 단면</text>
<line x1="310" y1="130" x2="360" y2="130" class="dg-stroke-accent" stroke-width="2"/>
<path d="M352,123 L362,130 L352,137" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="305" y="118" font-size="11">Schur complement</text>
<path d="M380,220 Q470,60 560,220" fill="none" class="dg-dim" stroke-width="2" stroke-dasharray="6,4"/>
<path d="M430,220 Q480,90 545,220" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<line x1="380" y1="220" x2="600" y2="220" class="dg-line" stroke-width="1"/>
<text x="385" y="90" font-size="11" class="dg-dim">주변분포 p(x)</text>
<text x="450" y="70" font-size="11">조건부 p(x|y=y0)</text>
<text x="400" y="240" font-size="11" class="dg-dim">분산이 좁아지고 평균이 이동함</text>
</svg>

_가우시안을 y=y0에서 자른 단면은 다시 가우시안이며, 평균이 이동하고 분산은 좁아진다._

## 문제
$z$와 $y$가 서로 독립임을 보이려면 공분산이 0임을 확인하면 충분하다(결합가우시안에서는 무상관과 독립이 동치이다). $\mathrm{Cov}(z,y) = \mathrm{Cov}(x,y) - \Sigma_{xy}\Sigma_{yy}^{-1}\mathrm{Cov}(y,y) = \Sigma_{xy}-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yy} = $==빈칸==

## 해설
$\Sigma_{yy}^{-1}\Sigma_{yy}=I$이므로 두 번째 항이 그대로 $\Sigma_{xy}$가 되어 첫째 항과 상쇄됩니다.

**정답: $0$**

## 예시
Schur complement 공식을 2차원 숫자 예제로 확인한다. $\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, $\mu=(0,0)$ 이라 하자(첫 성분이 $x$, 둘째가 $y$).

공식대로 조건부분산은 $\Sigma_{xx}-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yx} = 2 - 1\cdot\tfrac12\cdot1 = 1.5$ 이고, $y=4$로 관측되었다면 조건부평균은 $\mu_x+\Sigma_{xy}\Sigma_{yy}^{-1}(y-\mu_y)=0+1\cdot\tfrac12\cdot(4-0)=2$ 이다. 즉 $x\mid y=4 \sim N(2,\,1.5)$.

이 값은 이변량정규분포의 상관계수 공식으로도 검산된다: $\rho=\mathrm{Cov}(x,y)/\sqrt{\mathrm{Var}(x)\mathrm{Var}(y)}=1/2$이고 조건부분산 공식 $\sigma_x^2(1-\rho^2)=2(1-0.25)=1.5$로 정확히 일치한다.
