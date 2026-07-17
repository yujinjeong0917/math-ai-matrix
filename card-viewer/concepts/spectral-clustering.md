---
slug: spectral-clustering
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 그래프 · 탐색
title: 그래프 라플라시안과 연결성 (Fiedler 값)
related: 
---

## 도입
스펙트럴 군집화는 그래프를 두 덩어리로 가르는 문제를 라플라시안 행렬의 고유벡터 문제로 바꿔서 푼다. 이 바꿔치기가 왜 타당한지, 그래프가 몇 개의 조각으로 끊어져 있는지를 라플라시안의 고유값이 어떻게 정확히 알려주는지 확인해본다.

## 명제
그래프의 라플라시안을 $L=D-W$라 하자. 그래프가 서로 연결되지 않은 두 덩어리로 쪼개져 있으면, $L$의 두 번째로 작은 고유값(Fiedler 값)은 정확히 0이다.

## 그림
<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">
<line x1="90" y1="80" x2="60" y2="20" class="dg-line" stroke-width="1.5" stroke-dasharray="4,4" />
<line x1="90" y1="80" x2="120" y2="20" class="dg-line" stroke-width="1.5" stroke-dasharray="4,4" />
<line x1="60" y1="80" x2="140" y2="80" class="dg-stroke-accent" stroke-width="2.5" />
<circle cx="60" cy="80" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="140" cy="80" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="55" y="85" font-size="12">A</text>
<text x="135" y="85" font-size="12">B</text>
<line x1="320" y1="80" x2="400" y2="80" class="dg-stroke-accent" stroke-width="2.5" />
<circle cx="320" cy="80" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="400" cy="80" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="315" y="85" font-size="12">C</text>
<text x="395" y="85" font-size="12">D</text>
<line x1="230" y1="10" x2="230" y2="150" class="dg-line" stroke-width="1.2" stroke-dasharray="2,4" />
<text x="30" y="150" font-size="12">고유값 0,0,2,2</text>
<text x="30" y="170" font-size="11" class="dg-dim">두 성분 → Fiedler값(λ₂) = 0</text>
</svg>

_서로 연결되지 않은 두 성분 {A,B}, {C,D} → 라플라시안 고유값에 0이 두 번(λ₁=λ₂=0) 나타난다._

## 문제
라플라시안의 정의를 성분별로 풀어서 이차형식을 다시 써보면, 이 값이 변으로 이어진 두 노드 값의 차이의 제곱들을 더한 형태로 정리된다. 그래프의 각 변 $(i,j)$에 대해 가중치 $w_{ij}$와 두 끝점 값의 차이 $(x_i-x_j)^2$를 곱해서 모두 더하면 된다.

정리하면 $x^TLx = \dfrac{1}{2}\sum_{i,j} w_{ij}(x_i-x_j)^2$==빈칸==$0$ 이다.

## 해설
가중치 $w_{ij}$가 모두 0 이상이고 제곱항 $(x_i-x_j)^2$도 항상 0 이상이므로, 이들을 곱해서 더한 값도 항상 0 이상이다. 그래서 $x^TLx\ge0$이 성립한다.

**정답: $\ge$**

## 예시
고유값 논증을 보기 전에 네 개짜리 작은 그래프에 라플라시안을 직접 만들어서 고유값을 확인해본다.

노드 $A,B,C,D$가 있고 간선은 $A$-$B$ 하나, $C$-$D$ 하나뿐이라 그래프가 두 덩어리로 완전히 쪼개져 있다고 하자. 차수는 모두 1이므로 라플라시안은 다음과 같다.
$$L=\begin{pmatrix}1&-1&0&0\\-1&1&0&0\\0&0&1&-1\\0&0&-1&1\end{pmatrix}$$
이 행렬의 고유값을 직접 풀면 $0,0,2,2$가 나온다. 작은 순서로 나열하면 $\lambda_1=0,\ \lambda_2=0$이라서 Fiedler 값인 두 번째로 작은 고유값도 정확히 0이다.

실제로 $A$ 덩어리를 가리키는 지시벡터 $\mathbf{1}_A=(1,1,0,0)$을 넣어보면 $L\mathbf{1}_A=(1-1,\ -1+1,\ 0,\ 0)=(0,0,0,0)$으로 고유값 0의 고유벡터임이 바로 확인된다. 아래 증명은 이 두 번째 0이 이 특정 그래프의 우연이 아니라 그래프가 두 덩어리로 쪼개져 있기만 하면 항상 나타나는 사실임을 보인다.
