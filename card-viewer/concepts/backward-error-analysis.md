---
slug: backward-error-analysis
theme: NUM2
domainLabel: 수치해석 심화
subLabel: 안정성과 조건화
title: 후방오차분석: 전방오차 ≤ 조건수 × 후방오차
related: 
---

## 도입
계산기가 내놓은 답이 '완전히 틀린' 것인지 아니면 '거의 맞는 입력에 대한 정확한 답'인지는 전혀 다른 이야기입니다. 후방오차분석(backward error analysis)은 후자의 관점을 취합니다: 계산된 결과 $\hat y$를 원래 문제 $f(x)$에 대한 근사가 아니라, 살짝 교란된 입력 $x+\Delta x$에 대한 정확한 답 $f(x+\Delta x)$로 재해석하는 것입니다. 이 관점이 강력한 이유는, 문제 자체가 입력의 교란에 얼마나 민감한지(조건수)를 알고 있다면 후방오차만으로 전방오차(우리가 실제로 궁금한, 계산된 답과 참값의 차이)를 통제할 수 있기 때문입니다.

## 명제
미분가능한 문제 $f$의 상대조건수를 $\kappa(x) = \lim_{\Delta x\to0}\sup \dfrac{\|f(x+\Delta x)-f(x)\|/\|f(x)\|}{\|\Delta x\|/\|x\|}$ 라 하자. 어떤 알고리즘이 계산한 $\hat y=\hat f(x)$가 후방안정(backward stable)이어서 $\hat y = f(x+\Delta x)$를 만족하는 $\Delta x$가 존재하고 $\|\Delta x\|/\|x\| \le \varepsilon_{\text{back}}$ ($\varepsilon_{\text{back}}$이 충분히 작다)이면, 상대 전방오차는 $\dfrac{\|\hat y - f(x)\|}{\|f(x)\|} \le \kappa(x)\,\varepsilon_{\text{back}} + O(\varepsilon_{\text{back}}^2)$ 를 만족한다.


## 문제
$\hat y=f(x+\Delta x)$이므로 $f$가 $x$ 근방에서 매끄럽다면 1차 테일러 전개로 $f(x+\Delta x) - f(x) \approx $==빈칸== 이다.

## 해설
1차 테일러 근사는 $f(x+\Delta x)\approx f(x)+f'(x)\Delta x$이므로, 양변에서 $f(x)$를 빼면 이 식을 얻습니다.

**정답: $f'(x)\Delta x$**

## 예시
$A=\begin{pmatrix}2&0\\0&1\end{pmatrix}$, $b=(2,1)$인 $Ax=b$를 생각합니다. 정확해는 $x^*=(1,1)$입니다.

어떤 반올림 섞인 알고리즘이 계산한 해가 $\hat x=(1.01,\,1)$이라고 합시다 (첫 성분에서 $0.01$만큼 어긋났습니다).

후방오차 관점에서는 "$\hat x$가 정확히 어떤 시스템을 풀었는가"를 되묻습니다. $A\hat x = (2.02,\,1)$이므로, $\hat x$는 원래 $b$가 아니라 $b+\Delta b$, $\Delta b=A\hat x-b=(0.02,\,0)$에 대해서는 정확한 해입니다.

상대 후방오차는 $\|\Delta b\|/\|b\| = 0.02/\sqrt5 \approx 0.008944$이고, 상대 전방오차는 $\|\hat x-x^*\|/\|x^*\| = 0.01/\sqrt2\approx0.007071$입니다.

$A$의 (2-노름) 조건수는 $\kappa(A)=\|A\|_2\|A^{-1}\|_2 = 2\times1=2$입니다. 명제의 부등식을 확인해보면 $\kappa(A)\times(\text{후방오차}) = 2\times0.008944\approx0.017888 \ge 0.007071 \approx (\text{전방오차})$로, 실제로 부등식이 성립합니다 (여유가 있는 상한이지 등식은 아닙니다).
