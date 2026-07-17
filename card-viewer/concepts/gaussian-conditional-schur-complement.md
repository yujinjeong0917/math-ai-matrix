---
slug: gaussian-conditional-schur-complement
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 다변량 가우시안의 조건부분포와 Schur complement
hook: 다변량 가우시안에서 일부 변수를 관측했을 때 나머지 변수의 분포는 어떻게 바뀔까요?
related: 다변량 가우시안의 주변분포 · 확률적 PCA(PPCA) · 가우시안 프로세스 회귀 · 베이지안 선형회귀 사후분포
---

## 기본설명
$(x,y)\sim N(\mu,\Sigma)$, $\mu=(\mu_x;\mu_y)$, $\Sigma=\begin{pmatrix}\Sigma_{xx}&\Sigma_{xy}\\\Sigma_{yx}&\Sigma_{yy}\end{pmatrix}$ 라 하면 $x\mid y \sim N\left(\mu_x+\Sigma_{xy}\Sigma_{yy}^{-1}(y-\mu_y),\ \Sigma_{xx}-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yx}\right)$ 이다. 뒤의 공분산은 $\Sigma_{yy}$에 대한 $\Sigma$의 Schur complement이다.

## 문제
$z$와 $y$가 서로 독립임을 보이려면 공분산이 0임을 확인하면 충분하다(결합가우시안에서는 무상관과 독립이 동치이다). $\mathrm{Cov}(z,y) = \mathrm{Cov}(x,y) - \Sigma_{xy}\Sigma_{yy}^{-1}\mathrm{Cov}(y,y) = \Sigma_{xy}-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yy} = $==빈칸==

## 해설
$\Sigma_{yy}^{-1}\Sigma_{yy}=I$이므로 두 번째 항이 그대로 $\Sigma_{xy}$가 되어 첫째 항과 상쇄됩니다.

**정답: $0$**

## 예시
Schur complement 공식을 2차원 숫자 예제로 확인한다. $\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, $\mu=(0,0)$ 이라 하자(첫 성분이 $x$, 둘째가 $y$).

공식대로 조건부분산은 $\Sigma_{xx}-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yx} = 2 - 1\cdot\tfrac12\cdot1 = 1.5$ 이고, $y=4$로 관측되었다면 조건부평균은 $\mu_x+\Sigma_{xy}\Sigma_{yy}^{-1}(y-\mu_y)=0+1\cdot\tfrac12\cdot(4-0)=2$ 이다. 즉 $x\mid y=4 \sim N(2,\,1.5)$.

이 값은 이변량정규분포의 상관계수 공식으로도 검산된다: $\rho=\mathrm{Cov}(x,y)/\sqrt{\mathrm{Var}(x)\mathrm{Var}(y)}=1/2$이고 조건부분산 공식 $\sigma_x^2(1-\rho^2)=2(1-0.25)=1.5$로 정확히 일치한다.
