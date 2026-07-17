---
slug: normalized-cut-relaxation
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 그래프 · 탐색
title: 정규화 절단(Normalized Cut)의 완화: 조합최적화에서 일반화 고유값 문제로
hook: 그래프를 두 조각으로 잘라 군집을 나누고 싶습니다.
related: 마르코프랜덤필드 인수분해
---

## 기본설명
그래프 $G=(V,E)$의 가중치행렬 $W$(대칭, 비음), 차수행렬 $D=\mathrm{diag}(d_1,\ldots,d_n)$($d_i=\sum_j w_{ij}$), 라플라시안 $L=D-W$가 주어졌다고 하자. 분할 $(A,\bar A)$에 대해 $\mathrm{cut}(A,\bar A)=\sum_{i\in A,j\in\bar A}w_{ij}$, $\mathrm{vol}(A)=\sum_{i\in A}d_i$라 하고 $\mathrm{Ncut}(A,\bar A)=\frac{\mathrm{cut}(A,\bar A)}{\mathrm{vol}(A)}+\frac{\mathrm{cut}(A,\bar A)}{\mathrm{vol}(\bar A)}$로 정의하자. 이산 지시벡터를 실수벡터로 완화하면, $\mathrm{Ncut}$을 최소화하는 문제는 $Lv=\lambda Dv$(동치로 $D^{-1}Lv=\lambda v$)의 두 번째로 작은 고유값에 대응하는 고유벡터를 구하는 문제로 귀결된다.

## 문제
먼저 $f^TD\mathbf1=\sum_{i\in A}d_i\sqrt{b_V/a_V} - \sum_{i\in\bar A}d_i\sqrt{a_V/b_V} = a_V\sqrt{b_V/a_V} - b_V\sqrt{a_V/b_V}$이다. 첫 항은 $a_V\sqrt{b_V/a_V}=\sqrt{a_V^2\cdot b_V/a_V}=\sqrt{a_Vb_V}$로 정리되고, 둘째 항 $b_V\sqrt{a_V/b_V}=$==빈칸== 이므로, 두 항이 서로 같아 $f^TD\mathbf1=0$이 성립한다.

## 해설
같은 방식으로 $b_V\sqrt{a_V/b_V}=\sqrt{b_V^2\cdot a_V/b_V}=\sqrt{a_Vb_V}$로 정리돼요. 두 항이 똑같이 $\sqrt{a_Vb_V}$라서 빼면 0이 됩니다.

**정답: $\sqrt{a_Vb_V}$**

## 예시
4개 노드 그래프로 항등식을 직접 확인해봅니다. 간선과 가중치는 $w_{12}=2,\ w_{23}=1,\ w_{34}=2$뿐이고 나머지는 0이라 하죠. 차수는 $d_1=2,\ d_2=3,\ d_3=3,\ d_4=2$이고 $\mathrm{vol}(V)=10$입니다.

$A=\{1,2\}$, $\bar A=\{3,4\}$로 자르면 $\mathrm{cut}(A,\bar A)=w_{23}=1$, $\mathrm{vol}(A)=5$, $\mathrm{vol}(\bar A)=5$이므로 $\mathrm{Ncut}=1/5+1/5=0.4$입니다.

지시벡터 $f_i=\sqrt{\mathrm{vol}(\bar A)/\mathrm{vol}(A)}$($i\in A$), $f_i=-\sqrt{\mathrm{vol}(A)/\mathrm{vol}(\bar A)}$($i\in\bar A$)를 만들면 $\mathrm{vol}(A)=\mathrm{vol}(\bar A)=5$이므로 $f=(1,1,-1,-1)$입니다.

직접 계산하면 $f^TD\mathbf1=2(1)+3(1)+3(-1)+2(-1)=0$이고, $f^TDf=2+3+3+2=10=\mathrm{vol}(V)$입니다. 라플라시안 이차형식 $f^TLf=\sum_{i<j}w_{ij}(f_i-f_j)^2$을 계산하면, $(1,2)$간선은 $f_1-f_2=0$, $(3,4)$간선도 $f_3-f_4=0$이라 기여가 없고, $(2,3)$간선만 $w_{23}(f_2-f_3)^2=1\cdot(1-(-1))^2=4$를 기여하여 $f^TLf=4$입니다. 그런데 $\mathrm{vol}(V)\cdot\mathrm{Ncut}=10\times0.4=4$로 정확히 일치합니다 — 이것이 아래 증명에서 쓸 핵심 항등식입니다.
