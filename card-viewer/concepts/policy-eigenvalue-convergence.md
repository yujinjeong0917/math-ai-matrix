---
slug: policy-eigenvalue-convergence
theme: NUM2
domainLabel: 수치해석 심화
subLabel: 고유값 알고리즘
title: 정책평가 반복의 수렴속도: 스펙트럴반경과 $\gamma^k$
hook: 정책평가 반복 $V_{k+1}=R+\gamma PV_k$은 벨만 기대연산자를 그냥 반복 적용하는 것뿐인데, 몇 번 반복해야 답에 충분히 가까워지는지는 감이 잘 오지 않습니다.
---

## 기본설명
정책평가 반복 $V_{k+1}=R+\gamma PV_k$의 고정점을 $V^*=(I-\gamma P)^{-1}R$이라 하면 오차 $e_k=V_k-V^*$는 $e_k=(\gamma P)^ke_0$를 만족한다. $P$가 확률행렬이라 $P$의 최대 고유값이 $1$이므로 $\gamma P$의 스펙트럴반경은 $\gamma$이고, 따라서 $\|e_k\|$는 점근적으로 $\gamma^k$의 속도로 $0$에 수렴한다.

## 문제
두 식을 빼면 $V_{k+1}-V^* = (R+\gamma PV_k)-(R+\gamma PV^*) = \gamma P($==빈칸==$)$ 이다.

## 해설
$R$ 항은 상쇄되고 $\gamma P$가 공통으로 곱해진 차이만 남는다.

**정답: $V_k-V^*$**

## 예시
bellman-linear-system 항목과 같은 2상태 MDP를 씁니다: $\gamma=0.5$, $P=\begin{pmatrix}0.8&0.2\\0.4&0.6\end{pmatrix}$, $R=(2,0)$이고 정확한 해는 $V^*=(3.5,1.0)$이었습니다. $V_0=(0,0)$에서 반복을 시작합니다.

$V_1=R+\gamma PV_0=(2,0)$입니다. $V_2=R+\gamma PV_1=(2,0)+0.5\begin{pmatrix}0.8&0.2\\0.4&0.6\end{pmatrix}\begin{pmatrix}2\\0\end{pmatrix}=(2,0)+0.5(1.6,0.8)=(2.8,0.4)$입니다.

오차를 계산하면 $e_0=V_0-V^*=(-3.5,-1)$, $e_1=V_1-V^*=(-1.5,-1)$, $e_2=V_2-V^*=(-0.7,-0.6)$입니다. 실제로 $\gamma Pe_0=0.5\begin{pmatrix}0.8&0.2\\0.4&0.6\end{pmatrix}\begin{pmatrix}-3.5\\-1\end{pmatrix}=0.5(-3.0,-2.0)=(-1.5,-1.0)=e_1$이 정확히 성립하고, 같은 방식으로 $\gamma Pe_1=(-0.7,-0.6)=e_2$도 성립합니다.

$P$의 고유값은 특성방정식 $\lambda^2-1.4\lambda+0.4=0$을 풀면 $\lambda=1,0.4$입니다(확률행렬이므로 최대 고유값이 항상 $1$). 따라서 $\gamma P$의 스펙트럴반경은 $0.5\times1=0.5$이고, 오차의 크기는 대략 $0.5^k$의 속도로 줄어듭니다: $\|e_0\|\approx3.64,\ \|e_1\|\approx1.80,\ \|e_2\|\approx0.92$로 각 단계에서 대략 절반씩 줄어드는 것을 볼 수 있습니다.
