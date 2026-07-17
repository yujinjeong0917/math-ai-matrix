---
slug: generating-function-recurrence
theme: DISC2
domainLabel: 이산수학 심화
subLabel: 조합론 심화
title: 생성함수로 점화식 풀기: 피보나치 수열의 닫힌 형태
hook: 점화식을 하나씩 손으로 풀어나가는 대신, 수열 전체를 $A(x)=\sum_n a_n x^n$이라는 하나의 함수(생성함수)로 묶어버리면, 점화식은 $A(x)$가 만족하는 대수 방정식으로 바뀝니다.
---

## 기본설명
$a_0=0, a_1=1, a_n=a_{n-1}+a_{n-2}\ (n\ge2)$로 정의된 피보나치 수열의 생성함수는 $A(x)=\sum_{n\ge0}a_nx^n = \dfrac{x}{1-x-x^2}$ 이고, 이로부터 닫힌 형태 $a_n = \dfrac{\varphi^n-\psi^n}{\sqrt5}$(단 $\varphi=\dfrac{1+\sqrt5}2,\ \psi=\dfrac{1-\sqrt5}2$, 비네의 공식)를 얻는다.

## 문제
$A(x) = a_0+a_1x+\sum_{n\ge2}a_nx^n = x + \sum_{n\ge2}(a_{n-1}+a_{n-2})x^n$ 이고, 지수를 맞춰 다시 쓰면 $\sum_{n\ge2}a_{n-1}x^n = x\sum_{m\ge1}a_mx^m = xA(x)$(단 $a_0=0$이므로 $m=0$항은 $0$), $\sum_{n\ge2}a_{n-2}x^n=x^2\sum_{k\ge0}a_kx^k=x^2A(x)$ 이므로 $A(x) = $==빈칸== 입니다.

## 해설
위에서 구한 세 조각(x, xA(x), x^2A(x))을 그대로 합치면 A(x)에 대한 방정식이 나와요.

**정답: $x + xA(x) + x^2A(x)$**

## 예시
수열의 처음 몇 항은 $0,1,1,2,3,5,8,\ldots$ 입니다. 예컨대 $a_5=5$인데, 이것을 점화식으로 손수 계산하지 않고 닫힌 형태 공식만으로 재현할 수 있는지가 아래 증명의 목표입니다.
