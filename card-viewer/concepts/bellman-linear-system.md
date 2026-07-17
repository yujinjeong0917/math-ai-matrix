---
slug: bellman-linear-system
theme: NUM2
domainLabel: 수치해석 심화
subLabel: 직접법
title: 벨만방정식의 선형시스템 풀이와 가역성
related: 벨만 기대방정식의 1스텝 갱신 · 벨만 연산자의 수렴성 논증
---

## 도입
정책 $\pi$를 고정하면 가치함수 $V^\pi$는 벨만 기대방정식 $V^\pi(s)=R(s)+\gamma\sum_{s'}P(s'|s)V^\pi(s')$을 만족합니다. 이건 사실 $V^\pi$에 대한 연립일차방정식입니다. 굳이 반복적으로 갱신하지 않아도 이 선형시스템을 직접 풀어 $V^\pi$를 정확히 구할 수 있습니다. 다만 그러려면 이 시스템이 항상 유일한 해를 갖는다는 사실, 즉 계수행렬이 항상 가역이라는 사실이 먼저 확인되어야 합니다.

## 명제
유한 상태공간에서 정책 $\pi$에 대한 전이확률행렬을 $P$(각 행의 합이 $1$인 확률행렬), 보상을 $R$, 할인율을 $0\le\gamma<1$이라 하면 벨만 기대방정식은 선형시스템 $(I-\gamma P)V=R$이고, $I-\gamma P$는 항상 가역이어서 $V^\pi=(I-\gamma P)^{-1}R$이 유일하게 존재한다.


## 문제
$V=R+\gamma PV$의 양변에서 $\gamma PV$를 이항하면 $(I-\gamma P)V = $==빈칸== 이다.

## 해설
$\gamma PV$항을 좌변으로 옮기면 $V-\gamma PV=(I-\gamma P)V$가 되고 우변에는 $R$만 남는다.

**정답: $R$**

## 예시
상태 $\{1,2\}$인 2상태 MDP에서 $\gamma=0.5$, $P=\begin{pmatrix}0.8&0.2\\0.4&0.6\end{pmatrix}$, $R=(2,0)$이라 합시다.
$$I-\gamma P=\begin{pmatrix}1-0.4&-0.1\\-0.2&1-0.3\end{pmatrix}=\begin{pmatrix}0.6&-0.1\\-0.2&0.7\end{pmatrix}$$
행렬식은 $0.6\times0.7-(-0.1)\times(-0.2)=0.42-0.02=0.4$이므로 역행렬이 존재합니다.
$$(I-\gamma P)^{-1}=\frac1{0.4}\begin{pmatrix}0.7&0.1\\0.2&0.6\end{pmatrix}=\begin{pmatrix}1.75&0.25\\0.5&1.5\end{pmatrix}$$
$V=(I-\gamma P)^{-1}R=\begin{pmatrix}1.75&0.25\\0.5&1.5\end{pmatrix}\begin{pmatrix}2\\0\end{pmatrix}=(3.5,\,1.0)$입니다. 검산하면 $V_1=2+0.5(0.8\times3.5+0.2\times1.0)=2+0.5\times3=3.5$, $V_2=0+0.5(0.4\times3.5+0.6\times1.0)=0.5\times2=1.0$으로 벨만방정식을 정확히 만족합니다.
