---
slug: value-iteration-stability
theme: NUM2
domainLabel: 수치해석 심화
subLabel: 안정성과 조건화
title: 가치반복의 수치적 안정성: 축약사상과 오차의 유계성
hook: 가치반복은 완전연산에서라면 벨만연산자 $T$의 고정점으로 기하급수적으로 수렴합니다.
---

## 기본설명
$T$가 $(\mathbb{R}^n,\|\cdot\|_\infty)$ 위에서 상수 $\gamma<1$인 축약사상이고 $V^*=T(V^*)$가 그 고정점이라 하자. 계산된 반복열이 $\hat V_{k+1}=T(\hat V_k)+\varepsilon_k$, $\|\varepsilon_k\|_\infty\le\varepsilon$ (모든 $k$)을 만족하면, 오차 $e_k:=\hat V_k-V^*$는 $\|e_k\|_\infty \le \gamma^k\|e_0\|_\infty + \dfrac{\varepsilon}{1-\gamma}$ 를 만족하며, 특히 $k\to\infty$에서도 $\varepsilon/(1-\gamma)$라는 유한한 값 안에 머무른다(발산하지 않는다).

## 문제
$e_k:=\hat V_k-V^*$라 하자. $V^*=T(V^*)$이므로 $e_{k+1} = \hat V_{k+1}-V^* = T(\hat V_k)+\varepsilon_k - T(V^*) = \big[T(\hat V_k)-T(V^*)\big]+\varepsilon_k$ 이고, 삼각부등식과 축약성을 함께 쓰면 $\|e_{k+1}\|_\infty \le $==빈칸== 이다.

## 해설
$\|T(\hat V_k)-T(V^*)\|\le\gamma\|e_k\|$(축약성)이고 $\|\varepsilon_k\|\le\varepsilon$이므로, 삼각부등식 $\|a+b\|\le\|a\|+\|b\|$을 적용하면 이 상한을 얻습니다.

**정답: $\gamma\|e_k\|_\infty + \varepsilon$**

## 예시
단일 상태의 벨만연산자를 $T(v)=0.5v+3$이라 하고 ($\gamma=0.5$), 참 고정점은 $V^*=T(V^*)$를 풀면 $V^*=6$입니다.

매 스텝 최악의 경우 항상 같은 방향으로 $\varepsilon=0.01$만큼의 반올림오차가 섞인다고 하고, $\hat V_0=0$에서 계산된 반복 $\hat V_{k+1}=0.5\hat V_k+3+0.01$을 따라가 봅니다.

$\hat V_1=3.01,\ \hat V_2=4.515,\ \hat V_3=5.2675,\ \hat V_4=5.64375,\ \hat V_5=5.831875,\ldots$

이 재귀식을 닫힌 식으로 풀면 $\hat V_k = 6.02(1-0.5^k)$이고, $k\to\infty$에서 $\hat V_k \to 6.02$로 수렴합니다 — 참값 $V^*=6$보다 정확히 $0.02$만큼 큰 값에서 멈춥니다. 명제의 상한 $\varepsilon/(1-\gamma)=0.01/0.5=0.02$와 정확히 일치합니다: 오차는 발산하지 않고 딱 이 상한만큼에서 안정됩니다.
