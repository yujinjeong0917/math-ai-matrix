---
slug: bayesian-optimization-ei
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 근사 · 적분
title: 베이지안 최적화의 획득함수: 기대개선(Expected Improvement)의 닫힌형
related: 가우시안 프로세스 회귀
---

## 도입
평가 비용이 비싼 블랙박스 함수를 최소화하고 싶을 때, 매번 어디를 다음으로 평가할지 정해야 합니다. 가우시안 프로세스(GP)로 함수를 대리(surrogate)하면 각 후보점에서 함숫값이 어떤 분포를 따르는지 알 수 있으므로, "지금까지 찾은 최적값보다 얼마나 더 좋아질 것으로 기대되는가"를 확률적으로 계산할 수 있습니다. 이 기댓값이 바로 기대개선(EI) 획득함수이고, 놀랍게도 적분을 끝까지 계산하면 표준정규분포의 CDF와 PDF만으로 이루어진 닫힌형 공식이 나옵니다.

## 명제
GP 대리모델의 사후분포에 따라 후보점 $x$에서의 함숫값이 $f(x)\sim\mathcal N(\mu(x),\sigma(x)^2)$ 을 따른다고 하자(최소화 문제, 현재까지의 최적값 $f_{\min}$). 개선량을 $I(x)=\max(f_{\min}-f(x),0)$ 라 정의하면, 기대개선 $\mathrm{EI}(x)=\mathbb E[I(x)]$ 은 $\sigma(x)>0$일 때 $$\mathrm{EI}(x) = \big(f_{\min}-\mu(x)\big)\Phi(Z) + \sigma(x)\,\phi(Z),\qquad Z=\frac{f_{\min}-\mu(x)}{\sigma(x)}$$ 로 주어진다. 여기서 $\Phi,\phi$는 각각 표준정규분포의 CDF, PDF이다.

## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="150" x2="600" y2="150" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="6,3"/>
<text x="45" y="145" font-size="11" class="dg-dim">현재 최적값 f_min</text>
<polygon points="40,90 140,50 220,150 320,80 400,40 480,100 560,60 560,150 480,190 400,150 320,140 220,200 140,150 40,150" class="dg-dim" opacity="0.35"/>
<path d="M40,120 C140,60 220,190 320,110 C400,60 480,140 560,90" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="320" cy="175" r="4" class="dg-accent"/>
<line x1="320" y1="175" x2="320" y2="110" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="320,110 315,122 325,122" class="dg-stroke-accent"/>
<text x="330" y="185" font-size="12">EI 최대 후보점</text>
<text x="45" y="30" font-size="12">GP 사후평균과 신뢰구간</text>
</svg>

_사후 신뢰구간이 현재 최적값 아래로 크게 벌어진 후보점에서 기대개선(EI)이 커진다._

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
