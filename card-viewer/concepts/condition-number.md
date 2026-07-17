---
slug: condition-number
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 수치적 안정성
title: 조건수와 선형시스템의 오차 민감도
hook: 컴퓨터로 계산할 땐 아주 작은 반올림 오차가 늘 섞여요.
related: 
---

## 기본설명
$Ax=b$에서 $b$에 오차 $\delta b$가 생기면 $\dfrac{\|\delta x\|}{\|x\|} \le \kappa(A)\dfrac{\|\delta b\|}{\|b\|}$, $\kappa(A)=\|A\|\|A^{-1}\|$.

## 문제
둘 사이의 관계를 보려면 원래 식을 빼서 순수하게 오차끼리의 관계만 남기는 게 자연스러운 다음 수입니다. $A(x+\delta x)=b+\delta b$에서 원래 식 $Ax=b$를 빼면 $A\delta x=\delta b$가 남습니다. 여기서 양변에 $A^{-1}$을 곱하면 $\delta x = $==빈칸== 입니다.

## 해설
$A\delta x=\delta b$의 양쪽에 $A^{-1}$를 곱하면 왼쪽은 $\delta x$만 남고 오른쪽은 $A^{-1}\delta b$가 됩니다. 이 식은 입력의 오차 $\delta b$가 $A^{-1}$이라는 변환을 통과하면서 그대로 해의 오차 $\delta x$로 바뀐다는 뜻입니다.

**정답: $A^{-1}\delta b$**

## 예시
추상적인 부등식에 들어가기 전에 작은 대각행렬 하나로 직접 계산해보면 조건수가 무엇을 재는 값인지 바로 감이 잡힙니다.

$A=\begin{pmatrix}1&0\\0&0.01\end{pmatrix}$를 씁니다. 대각행렬이라 특이값은 대각성분의 절댓값 그대로 $1$과 $0.01$입니다. 그러니 조건수는 $\kappa(A)=\|A\|\|A^{-1}\|=\dfrac{1}{0.01}=100$입니다.
$$Ax=b,\quad x=\begin{pmatrix}1\\1\end{pmatrix},\quad b=\begin{pmatrix}1\\0.01\end{pmatrix}$$
이제 $b$의 둘째 성분에만 작은 오차 $\delta b=\begin{pmatrix}0\\0.0001\end{pmatrix}$를 더해봅니다. 입력의 상대오차는 $\|\delta b\|/\|b\|\approx0.0001/1.00005\approx0.0001$로 아주 작습니다.

$A^{-1}=\begin{pmatrix}1&0\\0&100\end{pmatrix}$이므로 $\delta x=A^{-1}\delta b=\begin{pmatrix}0\\0.01\end{pmatrix}$입니다. $x$의 상대오차는 $\|\delta x\|/\|x\|\approx0.01/1.41421\approx0.00707$입니다.

입력의 상대오차는 $0.0001$인데 해의 상대오차는 $0.00707$로 약 $70$배나 커졌습니다. $70$은 정확히 조건수 $\kappa(A)=100$이 정해둔 상한 아래에 들어갑니다.

아래 증명은 이 증폭 배율이 이 특정한 행렬에서만 생기는 우연이 아니라 임의의 $A$와 임의의 오차에서 조건수로 정확히 상한이 잡히는 사실임을 보입니다.
