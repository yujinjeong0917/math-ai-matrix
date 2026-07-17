---
slug: decision-tree-recursion
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 트리 · 앙상블 구조
title: 의사결정나무 재귀 분기의 정지성
related: 
---

## 도입
의사결정나무는 뿌리 노드에서 시작해서 데이터를 계속 둘로 쪼개며 자란다. 그런데 이 재귀적 분기가 정말 유한 번 만에 멈춘다는 보장이 있을까. 데이터가 유한하다면 답은 그렇다. 각 분기가 데이터를 진짜로 쪼개는 한, 나무는 반드시 유한한 횟수 안에서 멈춘다는 것을 확인한다.

## 명제
유한한 $n$개의 데이터로 시작한 의사결정나무에서, 매 분기가 노드의 데이터를 두 개의 비어있지 않은 부분집합으로 나눈다면, 전체 재귀적 분기 과정은 최대 $n-1$번의 분기 안에 멈춘다.

## 그림
<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg">
<line x1="280" y1="46" x2="170" y2="95" class="dg-line" stroke-width="1.5" />
<line x1="280" y1="46" x2="390" y2="95" class="dg-line" stroke-width="1.5" />
<line x1="170" y1="95" x2="110" y2="160" class="dg-line" stroke-width="1.5" />
<line x1="170" y1="95" x2="230" y2="160" class="dg-line" stroke-width="1.5" />
<line x1="110" y1="160" x2="75" y2="215" class="dg-line" stroke-width="1.5" />
<line x1="110" y1="160" x2="145" y2="215" class="dg-line" stroke-width="1.5" />
<circle cx="280" cy="46" r="16" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="170" cy="95" r="16" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="110" cy="160" r="16" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="390" cy="95" r="12" class="dg-accent" />
<circle cx="230" cy="160" r="12" class="dg-accent" />
<circle cx="75" cy="215" r="10" class="dg-accent" />
<circle cx="145" cy="215" r="10" class="dg-accent" />
<text x="280" y="50" font-size="12" text-anchor="middle">4</text>
<text x="170" y="99" font-size="12" text-anchor="middle">3</text>
<text x="390" y="99" font-size="12" text-anchor="middle">1</text>
<text x="110" y="164" font-size="12" text-anchor="middle">2</text>
<text x="230" y="164" font-size="12" text-anchor="middle">1</text>
<text x="75" y="219" font-size="11" text-anchor="middle">1</text>
<text x="145" y="219" font-size="11" text-anchor="middle">1</text>
<text x="20" y="20" font-size="11" class="dg-dim">테두리만 = 아직 분기 가능</text>
<text x="20" y="235" font-size="11" class="dg-dim">채워진 원 = 더 못 쪼개는 잎(크기 1)</text>
</svg>

_분기 3번(=n-1) 만에 잎 4개가 전부 데이터 1개짜리로 멈춘다._

## 문제
분기가 한 번 일어날 때마다 나무의 구조에 무슨 일이 일어나는지 살펴본다. 잎 노드 하나를 골라 그 데이터를 둘로 쪼개면, 그 잎은 더 이상 잎이 아니게 되고 대신 새로운 잎 두 개가 생긴다. 잎 하나가 사라지고 잎 두 개가 새로 생기므로 잎의 총 개수는 정확히 하나만큼 늘어난다.

그러니 분기를 $k$번 반복한 뒤의 잎 개수는 ==빈칸== 이다.

## 해설
시작할 때 잎은 1개이고 분기 한 번마다 잎이 정확히 1개씩 늘어난다. k번 반복했으니 처음의 1에 k를 더한 값이 남는다.

**정답: $1+k$**

## 예시
추상적인 부등식을 보기 전에 데이터 4개짜리 아주 작은 나무를 직접 쪼개보면 왜 분기 횟수가 딱 $n-1$번에서 막히는지 눈으로 확인할 수 있다.

데이터 4개로 시작한 뿌리 노드가 있다. 잎이 하나뿐이니 $L=1$이다.

**첫 분기.** 4개를 3개와 1개로 나눈다. 잎이 2개가 되었으니 $k=1$에서 $1+k=2$가 정확히 맞아떨어진다.

**둘째, 셋째 분기.** 3개짜리 잎을 2개와 1개로 쪼개면 잎은 3개가 되고($k=2$, $1+k=3$), 남은 2개짜리 잎을 1개와 1개로 쪼개면 잎은 4개가 된다($k=3$, $1+k=4$).

이제 모든 잎에 데이터가 정확히 1개씩만 남았다. 분기란 정의상 데이터를 두 개의 비어있지 않은 부분집합으로 나누는 것인데 데이터가 1개뿐인 잎은 더 쪼갤 방법이 없다.
$$k_{\max}=3=n-1=4-1$$
분기는 정확히 3번에서 멈췄고 이는 $n-1$과 같다. 아래 증명은 이 한계가 데이터 4개짜리 특수한 경우가 아니라 임의의 $n$에서 항상 성립하는 사실임을 보인다.
