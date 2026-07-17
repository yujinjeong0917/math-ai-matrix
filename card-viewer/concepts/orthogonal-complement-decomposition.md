---
slug: orthogonal-complement-decomposition
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: 직교여공간과 직합분해: V = U ⊕ U⊥
hook: 부분공간 $U$가 있을 때, $U$에 완전히 수직인 벡터들을 모아놓은 집합 $U^\perp$를 생각할 수 있어요.
related: Gram-Schmidt 직교화 · 직교 사영 정리(일반형)
---

## 기본설명
유한차원 내적공간 $V$ ($\dim V=n$)의 부분공간 $U$에 대해 직교여공간을 $U^\perp := \{v\in V : \langle v,u\rangle=0,\ \forall u\in U\}$ 라 하면, $V = U\oplus U^\perp$ (직합)이고 $\dim U + \dim U^\perp = n$ 이다.

## 문제
$U$의 정규직교기저를 $\{e_1,\dots,e_k\}$ 라 하자 ($k=\dim U$, Gram-Schmidt로 항상 구성 가능하다). $x$의 $U$-성분을 $u := $==빈칸== 로 정의한다.

## 해설
U 위로의 사영은 정규직교기저 방향 성분들의 합으로 표현돼요. 각 e_i 방향으로 x를 투영한 성분 <x,e_i>e_i를 전부 더하면 U 안에서 x에 대응하는 성분이 나와요.

**정답: $\sum_{i=1}^k \langle x, e_i\rangle e_i$**

## 예시
추상적인 직합 논증에 들어가기 전에 구체적인 벡터로 분해를 직접 확인해봅니다.

$\mathbb{R}^3$에서 $U=\mathrm{span}\{(1,1,0)\}$ 이라 하면 정규직교기저는 $e_1=\frac{1}{\sqrt2}(1,1,0)$ 입니다. $x=(2,0,3)$ 을 분해해봅니다.
$$u = \langle x,e_1\rangle e_1 = \frac{2}{\sqrt2}\cdot\frac{1}{\sqrt2}(1,1,0) = (1,1,0)$$
그러면 $w:=x-u=(1,-1,3)$ 인데, 실제로 $\langle w,e_1\rangle = \frac{1}{\sqrt2}(1-1+0)=0$ 이므로 $w\in U^\perp$ 이고 $x=u+w=(1,1,0)+(1,-1,3)$ 로 정확히 복원됩니다. $\dim U=1$, $\dim U^\perp=2$ 이고 합이 전체 차원 $3$과 같습니다.
