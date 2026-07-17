---
slug: double-debiased-ml
theme: CAUSAL
domainLabel: 인과추론
subLabel: 이질적 효과와 개인화
title: Double/Debiased Machine Learning: Neyman 직교성과 교차적합
hook: FWL 정리는 선형모델에서 처치효과를 잔차끼리의 회귀로 뽑아낼 수 있음을 보여주었습니다.
related: 직교화(FWL 정리) · 도구변수 · 이중강건추정
---

## 기본설명
부분선형모델 $Y=\theta T+g(X)+\varepsilon$, $E[\varepsilon\mid X,T]=0$, $T=m(X)+\nu$, $E[\nu\mid X]=0$ 을 생각하자. 뉘앙스모수 $\eta=(g,m)$에 대한 모멘트함수를 $\psi(W;\theta,\eta):=(Y-g(X)-\theta T)(T-m(X))$ 라 하면, 참값 $\theta_0,\eta_0=(g_0,m_0)$에서 이 모멘트는 Neyman 직교성을 만족한다: 임의의 방향 $\Delta\eta=(\Delta g,\Delta m)$에 대해 $\left.\dfrac{d}{dr}E[\psi(W;\theta_0,\eta_0+r\Delta\eta)]\right|_{r=0}=0$.

## 문제
참 모수 $(\theta_0,\eta_0)$에서 잔차를 $\varepsilon:=Y-g_0(X)-\theta_0T$, $\nu:=T-m_0(X)$ 라 쓰면 $\psi(W;\theta_0,\eta_0)=\varepsilon\nu$ 이고, 가정 $E[\varepsilon\mid X,T]=0$에 의해 $E[\psi(W;\theta_0,\eta_0)]=E\big[E[\varepsilon\mid X,T]\,\nu\big] = $==빈칸== 이다.

## 해설
조건부기댓값 $E[\varepsilon\mid X,T]$ 자체가 $0$이므로, 그 위에 무엇을 곱한 뒤 기댓값을 취해도 전체 기댓값은 $0$이 돼요.

**정답: $0$**

## 예시
$g,m$이 선형함수일 때 이 모멘트조건은 FWL의 잔차회귀와 정확히 같은 대상이다. 앞선 FWL 예제($X=1,2,3$, $T=0,1$, $Y=1+2X+5T$)에서 $g_0(X)=1+2X$, $m_0(X)=0.5$(상수)로 두면, $\psi(W;\theta_0,\eta_0)=(Y-g_0(X)-\theta_0T)(T-m_0(X))$의 표본평균을 최소화하는 $\theta_0$은 바로 FWL 예제에서 계산했던 잔차회귀계수 $5$와 같다.

직교성의 의미를 숫자로 느껴보자. $X=x_0$인 층에 세 사람이 있고 그들의 $T-m_0(x_0)$ 값이 각각 $-0.1,\ 0,\ 0.1$(평균 $0$, 즉 $m_0(x_0)$가 정확히 조건부평균)이라 하자. 만약 뉘앙스함수 $g$를 $g_0(x_0)$ 대신 $g_0(x_0)+2$(임의의 상수 $2$만큼 틀리게)로 바꿔 넣으면, 모멘트의 $g$ 방향 변화분은 $-\Delta g(x_0)\times$이 세 사람의 $T-m_0(x_0)$ 평균 $= -2\times 0=0$이다. $\Delta g(x_0)$를 얼마나 크게 잡든(설사 g가 많이 틀려도) 이 세 사람 그룹에서의 기여분은 정확히 $0$으로 사라진다 — 이것이 Neyman 직교성이 1차 오차를 무해하게 만드는 메커니즘이다.
