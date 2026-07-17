---
slug: bayesian-optimization-ei
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 근사 · 적분
title: 베이지안 최적화의 획득함수: 기대개선(Expected Improvement)의 닫힌형
hook: 평가 비용이 비싼 블랙박스 함수를 최소화하고 싶을 때, 매번 어디를 다음으로 평가할지 정해야 합니다.
related: 가우시안 프로세스 회귀
---

## 기본설명
GP 대리모델의 사후분포에 따라 후보점 $x$에서의 함숫값이 $f(x)\sim\mathcal N(\mu(x),\sigma(x)^2)$ 을 따른다고 하자(최소화 문제, 현재까지의 최적값 $f_{\min}$). 개선량을 $I(x)=\max(f_{\min}-f(x),0)$ 라 정의하면, 기대개선 $\mathrm{EI}(x)=\mathbb E[I(x)]$ 은 $\sigma(x)>0$일 때 $$\mathrm{EI}(x) = \big(f_{\min}-\mu(x)\big)\Phi(Z) + \sigma(x)\,\phi(Z),\qquad Z=\frac{f_{\min}-\mu(x)}{\sigma(x)}$$ 로 주어진다. 여기서 $\Phi,\phi$는 각각 표준정규분포의 CDF, PDF이다.

## 문제
이 적분을 표준정규분포에 대한 적분으로 바꾸기 위해 $u=(t-\mu)/\sigma$로 치환한다. $t=\mu+\sigma u$, $dt=\sigma\,du$ 이고, 적분 상한 $t=f_{\min}$은 $u=Z$ 에 대응한다(단 $Z=(f_{\min}-\mu)/\sigma$). 그러면 $$\mathrm{EI}(x)=\int_{-\infty}^{Z} \big(f_{\min}-\mu-\sigma u\big)\,\phi(u)\,du$$ 이 되고, 이는 ==빈칸== 두 항으로 나뉜다.

## 해설
피적분함수 $(f_{\min}-\mu-\sigma u)\phi(u)$를 $(f_{\min}-\mu)$항과 $-\sigma u$항으로 나누어 적분의 선형성을 쓴 것입니다.

**정답: $(f_{\min}-\mu)\int_{-\infty}^{Z}\phi(u)\,du \;-\; \sigma\int_{-\infty}^{Z} u\,\phi(u)\,du$**

## 예시
공식을 구체적인 숫자로 검산해봅니다.

후보점 $x$에서 GP 사후분포가 $\mu(x)=1$, $\sigma(x)=1$ 이고 현재까지의 최적값이 $f_{\min}=0$ 이라 하자. 그러면 $Z=(0-1)/1=-1$ 이고, 표준정규표에서 $\Phi(-1)\approx0.15866$, $\phi(-1)=\frac{1}{\sqrt{2\pi}}e^{-1/2}\approx0.24197$ 이다.

공식에 대입하면
$$\mathrm{EI}(x) = (0-1)(0.15866) + (1)(0.24197) \approx 0.0833$$
즉 이 후보점을 평가하면 평균적으로 약 $0.0833$만큼 현재 최적값보다 개선될 것으로 기대됩니다(직접 수치검산 결과와 소수 넷째 자리까지 일치).
