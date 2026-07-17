---
slug: rank-nullity-theorem
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 랭크-널리티 정리(차원정리)
hook: 선형사상은 정의역의 정보를 일부는 완전히 없애버리고(핵, kernel) 나머지는 상(image)으로 보존합니다.
related: 
---

## 기본설명
$V,W$가 유한차원 벡터공간이고 $\Phi:V\to W$가 선형사상이라 하자. 그러면 $\dim(\ker\Phi)+\dim(\operatorname{Im}\Phi)=\dim V$이다.

## 문제
기저확장정리(임의의 부분공간의 기저는 전체 공간의 기저로 확장할 수 있다)에 의해 $v_1,\dots,v_k$를 $V$ 전체의 기저 $v_1,\dots,v_k,v_{k+1},\dots,v_n$ ($n=\dim V$)으로 확장할 수 있다. 목표는 $\{\Phi(v_{k+1}),\dots,\Phi(v_n)\}$이 $\operatorname{Im}\Phi$의 기저임을 보여 $\dim(\operatorname{Im}\Phi)=$==빈칸== 임을 얻는 것이다.

## 해설
기저 후보의 개수가 $n-k$개이므로, 이것이 실제로 기저임을 보이면 상의 차원이 $n-k$가 됩니다.

**정답: $n-k$**

## 예시
$\Phi:\mathbb{R}^3\to\mathbb{R}^2$을 $\Phi(x,y,z)=(x+y,\,y+z)$로 정의합니다(행렬로는 $\begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$).

핵을 구하려면 $x+y=0$, $y+z=0$을 풀어야 하는데, $y=-x$, $z=-y=x$이므로 핵은 $(1,-1,1)$ 방향 하나로 생성되는 1차원 부분공간입니다(실제로 $\Phi(1,-1,1)=(1-1,-1+1)=(0,0)$). 두 행 $(1,1,0)$과 $(0,1,1)$은 서로 배수가 아니므로 상은 $\mathbb{R}^2$ 전체, 즉 2차원입니다. 따라서 $\dim(\ker\Phi)+\dim(\operatorname{Im}\Phi)=1+2=3=\dim\mathbb{R}^3$으로 명제가 확인됩니다.
