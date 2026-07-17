---
slug: hierarchical-clustering
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 그래프 · 탐색
title: 단일연결 계층적 군집화의 사슬 연결성
related: 
---

## 도입
계층적 군집화는 가장 가까운 두 군집을 계속 합쳐 나가는 방법이다. 군집 사이의 거리를 재는 기준(연결법)에 따라 결과가 크게 달라지는데, 단일연결은 두 군집에서 각각 가장 가까운 점 한 쌍의 거리를 군집 간 거리로 삼는다. 이 정의 때문에 단일연결은 가까운 점들이 사슬처럼 이어져 있으면 그 사슬의 양 끝이 아무리 멀어도 결국 같은 군집으로 합쳐진다는 독특한 성질을 갖는다.

## 명제
점 $x=p_0,p_1,\dots,p_m=y$가 있고 연속한 두 점의 거리가 모두 $d(p_i,p_{i+1})\le r$ 을 만족하면, 단일연결 계층적 군집화를 거리 $r$에서 잘랐을 때 $x$와 $y$는 반드시 같은 군집에 속한다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="186" x2="110" y2="186" class="dg-line" stroke-width="1.5" />
<line x1="60" y1="200" x2="60" y2="186" class="dg-line" stroke-width="1.5" />
<line x1="110" y1="200" x2="110" y2="186" class="dg-line" stroke-width="1.5" />
<line x1="85" y1="186" x2="85" y2="182" class="dg-line" stroke-width="1.5" />
<line x1="85" y1="182" x2="160" y2="182" class="dg-line" stroke-width="1.5" />
<line x1="160" y1="200" x2="160" y2="182" class="dg-line" stroke-width="1.5" />
<line x1="122" y1="182" x2="122" y2="88" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="122" y1="88" x2="400" y2="88" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="400" y1="200" x2="400" y2="88" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="20" y1="88" x2="440" y2="88" class="dg-line" stroke-width="1" stroke-dasharray="3,3" />
<circle cx="60" cy="200" r="6" class="dg-accent" />
<circle cx="110" cy="200" r="6" class="dg-accent" />
<circle cx="160" cy="200" r="6" class="dg-accent" />
<circle cx="400" cy="200" r="6" class="dg-accent" />
<text x="60" y="216" font-size="11" text-anchor="middle">p₀=0</text>
<text x="110" y="216" font-size="11" text-anchor="middle">p₁=1</text>
<text x="160" y="216" font-size="11" text-anchor="middle">p₂=2</text>
<text x="400" y="216" font-size="11" text-anchor="middle">p₃=10</text>
<text x="70" y="178" font-size="10">1</text>
<text x="130" y="176" font-size="10">1</text>
<text x="230" y="82" font-size="11">병합거리 r=8</text>
<text x="20" y="40" font-size="11" class="dg-dim">직접거리 d(p₀,p₃)=10 &gt; 8인데도 사슬을 타고 r=8에서 합쳐짐</text>
</svg>

_덴드로그램: 이웃 거리 1,1,8을 타고 오르면 양끝은 r=8에서 이미 같은 군집._

## 문제
$p$가 속한 군집과 $q$가 속한 군집 사이의 거리를 생각해본다. 군집 간 거리는 정의상 그 두 군집에서 점을 하나씩 골라 만들 수 있는 모든 쌍의 거리 중 최솟값이다. 그런데 $p$와 $q$ 자신도 각자의 군집에 속한 점이므로, 이 최솟값은 $p,q$ 쌍의 거리보다 클 수 없다.

그러니 $p$가 속한 군집과 $q$가 속한 군집 사이의 거리는 ==빈칸== 를 넘지 않는다.

## 해설
군집 간 거리는 두 군집에서 뽑을 수 있는 모든 점 쌍의 거리 중 최솟값이다. p,q도 그런 점 쌍 중 하나이므로 전체 최솟값은 이 특정한 쌍의 거리 $d(p,q)$보다 클 수 없다.

**정답: $d(p,q)$**

## 예시
사슬 논증을 보기 전에 수직선 위의 점 4개를 놓고 단일연결이 정말 먼 점들까지 묶어버리는지 직접 확인해본다.

점 $p_0=0,\ p_1=1,\ p_2=2,\ p_3=10$을 수직선 위에 놓는다. 이웃한 점 사이의 거리는 각각 $d(p_0,p_1)=1$, $d(p_1,p_2)=1$, $d(p_2,p_3)=8$이다.

거리 기준 $r=8$에서 잘라본다. 이웃한 세 쌍의 거리가 모두 $1,1,8$로 전부 $r=8$ 이하다.
$$d(p_0,p_1)\le8,\quad d(p_1,p_2)\le8,\quad d(p_2,p_3)\le8\ \Rightarrow\ C_8(p_0)=C_8(p_3)$$
그런데 정작 양 끝 $p_0$과 $p_3$ 사이의 직접 거리는 $d(p_0,p_3)=10$으로 $r=8$보다 크다. 직접 거리만 보면 절대 같은 군집에 들어갈 수 없어 보이는 두 점이 중간의 사슬 덕분에 거리 8에서 이미 같은 군집으로 묶여버린다. 아래 증명은 이 사슬 연결 현상이 이 네 점만의 특이한 배치가 아니라 단일연결이라면 항상 성립하는 구조적 성질임을 보인다.
