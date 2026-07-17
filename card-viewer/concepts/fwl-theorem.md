---
slug: fwl-theorem
theme: CAUSAL
domainLabel: 인과추론
subLabel: 선형회귀와 편향제거
title: 직교화(FWL 정리): 잔차끼리의 회귀
related: 평균처치효과(ATE) · 성향점수 · Double/Debiased ML
---

## 도입
처치효과를 추정할 때 흔히 다중회귀 $Y=X\beta+T\alpha+\varepsilon$ 를 돌려서 $T$의 계수 $\alpha$를 교란변수 $X$를 통제한 처치효과로 해석합니다. 그런데 이 계수는 실제로 어떻게 만들어지는 걸까요? 직관적으로는, $T$ 중에서 $X$로 이미 설명되는 부분(공통 변동)은 걷어내고 $Y$ 중에서도 $X$로 설명되는 부분은 걷어낸 뒤, 남은 '순수한' 변동끼리만 비교하면 될 것 같습니다. Frisch-Waugh-Lovell(FWL) 정리는 이 직관이 다중회귀의 계수와 정확히 같음을 보장합니다.

## 명제
$X\in\mathbb{R}^{n\times k}$(절편 포함, full column rank), $T\in\mathbb{R}^n$, $Y\in\mathbb{R}^n$ 이라 하자. $M_X:=I_n-X(X^TX)^{-1}X^T$ 를 $X$에 대한 잔차생성행렬이라 하고 $\tilde T:=M_XT,\ \tilde Y:=M_XY$ 라 하자. 다중회귀 $Y=X\beta+T\alpha+\varepsilon$의 최소제곱 추정량 $\hat\alpha$ 는, $\tilde T$에 대한 $\tilde Y$의 단순회귀계수 $(\tilde T^T\tilde T)^{-1}\tilde T^T\tilde Y$ 와 정확히 같다.


## 문제
정규방정식은 $\begin{pmatrix}X^TX & X^TT\\ T^TX & T^TT\end{pmatrix}\begin{pmatrix}\beta\\ \alpha\end{pmatrix}=\begin{pmatrix}X^TY\\ T^TY\end{pmatrix}$ 로 쓸 수 있다. 첫 번째 블록 $X^TX\beta+X^TT\alpha=X^TY$ 을 $\beta$에 대해 풀면 $\beta = $==빈칸== 이다.

## 해설
정규방정식의 첫 줄에서 $\beta$가 곱해진 항만 남기고 나머지를 우변으로 넘긴 뒤 양변에 $(X^TX)^{-1}$를 곱하면 이 식을 얻어요. $\alpha$는 아직 모르는 값이라 식 안에 그대로 남아있어요.

**정답: $(X^TX)^{-1}X^TY-(X^TX)^{-1}X^TT\alpha$**

## 예시
추상적인 행렬대수 전에 구체적인 숫자로 확인해봅니다. 관측치가 6개이고, 교란변수 $X$와 처치 $T$, 결과 $Y$가 잡음 없이 정확히 $Y=1+2X+5T$를 따른다고 하자.

$X=1,\,T=0,\,Y=3$
$X=2,\,T=0,\,Y=5$
$X=3,\,T=0,\,Y=7$
$X=1,\,T=1,\,Y=8$
$X=2,\,T=1,\,Y=10$
$X=3,\,T=1,\,Y=12$

이 6개 점에 $Y=\beta_0+\beta_1X+\alpha T$ 를 최소제곱으로 적합하면 정확히 $\beta_0=1,\ \beta_1=2,\ \alpha=5$ 를 얻는다(잡음이 없으므로 잔차 $0$으로 완전적합).

이제 FWL 절차를 밟아보자. 먼저 $T$를 $[1,X]$에 회귀하면 6개 관측치에서 $T=0$인 그룹과 $T=1$인 그룹 모두 $X$가 $\{1,2,3\}$으로 같은 분포라 $T$와 $X$ 사이에 아무 관계가 없고, 회귀는 $\hat T=0.5$(상수)를 준다. 잔차는 $\tilde T=(-0.5,-0.5,-0.5,\,0.5,0.5,0.5)$이다. 다음으로 $Y$를 $[1,X]$에 회귀하면 $\hat Y=3.5+2X$를 얻고, 잔차는 $\tilde Y=(-2.5,-2.5,-2.5,\,2.5,2.5,2.5)$이다.

이제 $\tilde Y$를 $\tilde T$에 단순회귀하면 계수는 $\dfrac{\tilde T^T\tilde Y}{\tilde T^T\tilde T}=\dfrac{3(-0.5)(-2.5)+3(0.5)(2.5)}{3(0.5)^2+3(0.5)^2}=\dfrac{7.5}{1.5}=5$로, 다중회귀에서 얻은 처치효과 계수 $\alpha=5$와 정확히 일치한다. 아래 증명은 이 일치가 우연이 아니라 항상 성립함을 보인다.
