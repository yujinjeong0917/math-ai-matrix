---
slug: shortest-path-dp
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 알고리즘 기초
title: 최단경로의 최적 부분구조와 벨만 방정식
related: 
---

## 도입
강화학습의 가치반복과 그래프에서 최단경로를 구하는 동적계획법은 사실 같은 아이디어에서 나왔어요. 그 아이디어를 최적 부분구조라고 불러요. 전체 최적해의 일부분도 그 자체로 최적이어야 한다는 통찰이에요. 최단경로 버전으로 이 통찰을 직접 확인해 봅니다.

## 명제
노드 $s$에서 $v$까지의 최단거리 $d(v)$는 $v$의 모든 인접 노드 $u$에 대해 $d(v)=\min_u(d(u)+w(u,v))$ 를 만족한다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="110" x2="240" y2="50" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="240" y1="50" x2="240" y2="170" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="240" y1="170" x2="420" y2="110" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="60" y1="110" x2="240" y2="170" class="dg-line" stroke-width="1.2" stroke-dasharray="4,3" />
<line x1="240" y1="50" x2="420" y2="110" class="dg-line" stroke-width="1.2" stroke-dasharray="4,3" />
<circle cx="60" cy="110" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="240" cy="50" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="240" cy="170" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="420" cy="110" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="55" y="115" font-size="12">S</text>
<text x="235" y="55" font-size="12">B</text>
<text x="235" y="175" font-size="12">A</text>
<text x="415" y="115" font-size="12">C</text>
<text x="130" y="72" font-size="11">2</text>
<text x="248" y="113" font-size="11">1</text>
<text x="320" y="132" font-size="11">5</text>
<text x="130" y="150" font-size="11" class="dg-dim">4</text>
<text x="320" y="72" font-size="11" class="dg-dim">8</text>
</svg>

_굵은 실선 S→B→A→C가 최단경로(총 8), 점선은 더 긴 대안 간선._

## 문제
방금 확인한 사실을 기호로 정리합니다. $s$에서 $u$까지의 최단거리는 정의상 $d(u)$입니다. $P'$가 바로 그 최단경로이므로 $P'$의 길이도 $d(u)$와 같아야 합니다. 즉 $\mathrm{length}(P') = $==빈칸== 입니다.

## 해설
방금 확인했듯 $P'$보다 짧게 $s$에서 $u$로 가는 경로가 있다면, 그걸 $P$에 갈아 끼워서 $P$보다 짧은 $s$-$v$ 경로를 만들 수 있습니다. 이는 $P$가 최단경로라는 가정과 모순됩니다. 그러니 그런 경로는 존재할 수 없고, $P'$의 길이는 정확히 $s$에서 $u$까지의 최단거리인 $d(u)$일 수밖에 없습니다. 이 논증 방식을 귀류법이라 부릅니다.

**정답: $d(u)$**

## 예시
추상적인 재귀식을 보기 전에 작은 그래프에 실제 숫자를 넣어 최단거리를 직접 계산해보면 이 식이 왜 성립하는지 바로 느껴집니다.

노드 $S,A,B,C$가 있고 간선은 $S\to B$ 가중치 2, $S\to A$ 가중치 4, $B\to A$ 가중치 1, $A\to C$ 가중치 5, $B\to C$ 가중치 8이라 하겠습니다. $S$에서 출발하면 $d(S)=0$이고 $B$까지는 $S$를 거치는 길뿐이라 $d(B)=2$입니다.

이제 $A$까지의 거리를 봅니다. $A$로 가는 길은 $S$를 직접 거치는 길과 $B$를 거쳐가는 길 두 가지입니다.
$$d(A)=\min(d(S)+4,\ d(B)+1)=\min(4,\ 3)=3$$
직접 가는 길은 4지만 $B$를 거치면 $2+1=3$으로 더 짧습니다. 이웃 노드의 최단거리에 간선 가중치를 더해보고 그중 최솟값을 고른 것뿐인데 $A$까지의 진짜 최단거리가 그대로 나왔습니다.

$C$도 같은 방식으로 구해봅니다.
$$d(C)=\min(d(A)+5,\ d(B)+8)=\min(8,\ 10)=8$$
$A$를 거치는 길이 8로 더 짧습니다. 아래 증명은 이 재귀식이 이 작은 그래프뿐 아니라 모든 그래프에서 항상 성립하는 사실임을 보입니다.
