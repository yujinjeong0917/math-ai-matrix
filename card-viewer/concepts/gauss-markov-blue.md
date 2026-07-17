---
slug: gauss-markov-blue
theme: STAT
domainLabel: 추론통계
subLabel: 추정이론
title: 가우스-마르코프 정리: 선형·불편 추정량 중 OLS가 최소분산(BLUE)이다
hook: 선형회귀에서 계수를 추정하는 방법은 최소제곱법 말고도 무수히 많습니다.
related: 불편추정량 · 크라메르-라오 하한
---

## 기본설명
선형모형 $Y=X\beta+\varepsilon$에서 $X\in\mathbb{R}^{n\times p}$가 완전열계수이고 $E[\varepsilon]=0$, $\mathrm{Cov}(\varepsilon)=\sigma^2I_n$이라 하자. $\delta=CY$ 형태의 모든 선형추정량 중 $\beta$의 불편추정량인 것들(즉 모든 $\beta$에 대해 $E[\delta]=\beta$인 것들)을 생각하자. OLS 추정량 $\hat\beta=(X^\top X)^{-1}X^\top Y$는 이 클래스 안에서 최소분산을 가진다. 즉 임의의 다른 선형불편추정량 $\delta$에 대해 $\mathrm{Cov}(\delta)-\mathrm{Cov}(\hat\beta)$는 양의 준정부호(positive semi-definite)다.

## 문제
$\delta$가 불편추정량이 되려면 모든 $\beta$에 대해 $E[\delta]=E[CY]=CX\beta=\beta$여야 하므로 $CX=I_p$가 필요하다. $C=(X^\top X)^{-1}X^\top+D$를 대입하면 $CX=(X^\top X)^{-1}X^\top X+DX=I_p+DX$이므로, $CX=I_p$라는 조건은 $DX=$==빈칸== 를 뜻한다.

## 해설
I_p+DX=I_p가 성립하려면 DX 항이 정확히 0이어야 합니다.

**정답: $0$**

## 예시
추상적인 행렬 대수 전에, 아주 단순한 $1$변수 모형에서 OLS와 다른 불편추정량 하나를 직접 비교해 분산 차이를 확인해봅니다.

절편 없는 모형 $Y_i=\beta x_i+\varepsilon_i$, $x=(1,2,3)$, $\mathrm{Var}(\varepsilon_i)=\sigma^2$라 합시다. OLS 추정량은 $\hat\beta=\dfrac{\sum x_iY_i}{\sum x_i^2}=\dfrac{Y_1+2Y_2+3Y_3}{14}$이고, $X^\top X=1^2+2^2+3^2=14$이므로 $\mathrm{Var}(\hat\beta)=\sigma^2/14\approx0.0714\sigma^2$입니다.

이번엔 $Y_1$ 하나만 쓰는 추정량 $\delta=Y_1$을 봅니다. $E[Y_1]=\beta x_1=\beta$이므로 $\delta$도 불편추정량이고, $\mathrm{Var}(\delta)=\mathrm{Var}(Y_1)=\sigma^2$입니다.

실제로 $\delta=CY$에서 $C=(1,0,0)$, OLS의 계수는 $C_{\text{ols}}=(1,2,3)/14$이므로 $D=C-C_{\text{ols}}=(13/14,-1/7,-3/14)$입니다. $DD^\top=(13/14)^2+(1/7)^2+(3/14)^2=13/14\approx0.9286$이고, $\mathrm{Var}(\hat\beta)/\sigma^2+DD^\top=1/14+13/14=1=\mathrm{Var}(\delta)/\sigma^2$로 정확히 맞아떨어집니다. $\sigma^2/14\approx0.0714\sigma^2$이 $\sigma^2$보다 훨씬 작으므로, 세 관측치를 모두 쓰는 OLS가 관측치 하나만 쓰는 추정량보다 분산이 훨씬 작습니다.
