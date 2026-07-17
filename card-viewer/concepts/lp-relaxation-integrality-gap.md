---
slug: lp-relaxation-integrality-gap
theme: DISC2
domainLabel: 이산수학 심화
subLabel: 부호이론 · 조합최적화
title: 정수계획법의 LP완화와 완화갭: LP Relaxation
related: 
---

## 도입
정수해만 허용하는 최적화 문제(정수계획법, IP)는 풀기 어려운 경우가 많습니다. 정수제약을 잠시 내려놓고 실수해를 허용한 선형계획법(LP완화)을 풀면 훨씬 쉽고 빠르지만, 그 답이 원래 정수문제의 진짜 답은 아닙니다. 대신 이 LP완화값은 항상 원래 정수최적값에 대한 유효한 한계(경계)를 제공하며, 그 경계가 얼마나 느슨할 수 있는지를 완화갭이라 부릅니다.

## 명제
정수계획법 $\mathrm{OPT}_{IP}=\text{opt}\{c^Tx : x\in P\cap\mathbb{Z}^n\}$ (단 $P=\{x:Ax\le b,x\ge0\}$)의 LP완화를 $\mathrm{OPT}_{LP}=\text{opt}\{c^Tx:x\in P\}$라 하면, 최소화 문제에서는 $\mathrm{OPT}_{LP}\le\mathrm{OPT}_{IP}$, 최대화 문제에서는 $\mathrm{OPT}_{LP}\ge\mathrm{OPT}_{IP}$가 항상 성립한다. 그러나 이 부등식은 일반적으로 등식이 아니며(완화갭 $>1$), 이는 구체적인 예제로 보일 수 있다.


## 문제
최소화 문제를 기준으로 보자. $x^*$를 IP의 최적해라 하면 $x^*\in P\cap\mathbb{Z}^n\subseteq P$이므로 $x^*$는 LP에서도 실행가능하다. LP는 더 넓은 영역 $P$ 위에서 최솟값을 구하는 것이므로, 그 최솟값은 $P$ 안의 특정한 점 $x^*$에서의 값보다 클 수 없다: $\mathrm{OPT}_{LP}\le c^Tx^* = $==빈칸== 이다.

## 해설
x*는 IP의 최적해이므로 c^Tx*의 값이 바로 OPT_IP의 정의예요.

**정답: $\mathrm{OPT}_{IP}$**

## 예시
삼각형 그래프 $K_3$(정점 $1,2,3$, 세 변 모두 존재)의 정점피복 문제로 LP완화값과 정수최적값이 벌어지는 예를 만들어봅니다. IP는 $\min x_1+x_2+x_3$ s.t. 각 변 $(i,j)$에서 $x_i+x_j\ge1$, $x_i\in\{0,1\}$입니다.
