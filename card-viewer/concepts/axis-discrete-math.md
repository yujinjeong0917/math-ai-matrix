---
slug: axis-discrete-math
theme: AXIS
domainLabel: 매트릭스 읽는 법
subLabel: 매트릭스 행 · 수학 대분류
title: 이산수학 · 그래프 — 이어짐 자체가 의미인 데이터
related: 의사결정나무 재귀 분기의 정지성 · GNN 메시지패싱의 순열 등변성 · 그래프 라플라시안과 스펙트럴 클러스터링 · 최단경로의 최적 부분구조와 벨만 방정식
---

## 도입
데이터가 항상 실수 벡터로 깔끔하게 떨어지는 건 아니에요. 소셜 네트워크의 친구 관계, 분자의 원자 결합, 의사결정나무의 분기처럼 개체 하나하나보다 "이어짐" 자체가 의미를 갖는 데이터들이 있어요.

이런 데이터를 다루려면 좌표와 거리의 언어가 아니라 노드와 엣지, 그래프 $G=(V,E)$의 언어가 필요해요. 구조 위에서 세고, 탐색하고, 최적의 경로나 분할을 찾는 것이 이 행의 핵심 아이디어예요.

GNN(그래프 신경망)이 딥러닝 열 안에서 유독 다른 계열과 느낌이 다른 이유도 여기서 나와요. CNN이나 Transformer 밑에는 선형대수가 깔려 있지만, GNN 밑에는 그래프 이론이 깔려 있어요. 메시지패싱만 봐도 행렬곱이 아니라 이웃 노드를 도는 순회에 훨씬 가까워요.

기초 매트릭스에서는 이 행이 트리·앙상블 구조, 그래프·탐색, 알고리즘 기초 세 중분류로 나뉘어요. 의사결정나무가 왜 유한 번에 분기를 멈추는지, 최단경로가 왜 벨만 방정식으로 풀리는지가 여기 들어가요.

심화 매트릭스로 가면 그래프이론 심화, 조합론 심화, 네트워크 흐름, 부호이론·조합최적화(disc2) 네 갈래로 갈라져요. 최대유량-최소절단, 램지 정리, 이분매칭처럼 순수 수학에 좀 더 가까운 정리들을 다루는데, 이 결과들은 실제로는 조합최적화 문제를 근사하거나 자원을 배분하는 알고리즘으로 그대로 응용돼요.

## 명제


## 그림
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
<line x1="350" y1="20" x2="350" y2="240" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<text x="175" y="20" font-size="13" text-anchor="middle">트리(계층 구조)</text>
<text x="525" y="20" font-size="13" text-anchor="middle">그래프(임의의 연결)</text>
<line x1="175" y1="50" x2="100" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="175" y1="50" x2="250" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="100" y1="110" x2="60" y2="180" class="dg-line" stroke-width="1.5"/>
<line x1="100" y1="110" x2="140" y2="180" class="dg-line" stroke-width="1.5"/>
<line x1="250" y1="110" x2="210" y2="180" class="dg-line" stroke-width="1.5"/>
<line x1="250" y1="110" x2="290" y2="180" class="dg-line" stroke-width="1.5"/>
<circle cx="175" cy="50" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<circle cx="100" cy="110" r="13" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<circle cx="250" cy="110" r="13" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<circle cx="60" cy="180" r="12" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<circle cx="140" cy="180" r="12" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<circle cx="210" cy="180" r="12" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<circle cx="290" cy="180" r="12" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<line x1="450" y1="60" x2="550" y2="60" class="dg-line" stroke-width="1.5"/>
<line x1="550" y1="60" x2="600" y2="150" class="dg-line" stroke-width="1.5"/>
<line x1="600" y1="150" x2="500" y2="220" class="dg-line" stroke-width="1.5"/>
<line x1="500" y1="220" x2="420" y2="150" class="dg-line" stroke-width="1.5"/>
<line x1="550" y1="60" x2="500" y2="220" class="dg-line" stroke-width="1.3"/>
<line x1="420" y1="150" x2="450" y2="60" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="450" cy="60" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<circle cx="550" cy="60" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<circle cx="600" cy="150" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<circle cx="500" cy="220" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<circle cx="420" cy="150" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<text x="450" y="65" font-size="11" text-anchor="middle">A</text>
<text x="550" y="65" font-size="11" text-anchor="middle">B</text>
<text x="600" y="155" font-size="11" text-anchor="middle">C</text>
<text x="500" y="225" font-size="11" text-anchor="middle">D</text>
<text x="420" y="155" font-size="11" text-anchor="middle">E</text>
<text x="430" y="105" font-size="11" class="dg-dim">사이클</text>
</svg>

_트리는 노드 사이 경로가 유일하지만(왼쪽), 그래프는 여러 경로와 사이클(굵은 점선)이 함께 존재할 수 있다(오른쪽)._

## 문제
의사결정나무는 한 노드에서 데이터를 두 갈래로 나누고, 나뉜 부분집합에 대해 같은 분기 과정을 재귀적으로 반복하는 구조다. 한 노드에 있는 데이터 개수를 $n$이라 하면, 진짜 분기는 두 자식의 데이터 개수 $n_1,n_2$가 $n_1+n_2=n$이면서 각각 $1$ 이상이어야 성립한다(한쪽이 0개면 나눈 게 아니다). 그러면 $n_1,n_2$는 항상 ==빈칸== 를 만족한다.

## 해설
$n_1+n_2=n$이고 둘 다 최소 1 이상이면, 각자는 전체 $n$에서 상대방 몫을 뺀 값이라 반드시 $n$보다 작아요. 이렇게 자식 노드의 데이터 개수가 매 분기마다 엄격히 줄어들고, 자연수는 무한히 줄어들 수 없으니 유한 번 안에 더 못 나누는 상태에 도달해서 재귀가 멈춰요.

**정답: $n_1<n,\ n_2<n$**

## 예시
트리·앙상블 구조에서는 decision-tree-recursion이 의사결정나무 하나의 재귀적 분기가 왜 유한 번 안에 반드시 멈추는지를 보여요. 나무 구조를 다루는 첫 단추가 바로 이 정지성이에요.

그래프·탐색에서는 gnn-message-passing이 그래프신경망의 메시지패싱이 왜 노드 순서를 바꿔도 결과가 그대로인지(순열 등변성)를 다루고, spectral-clustering은 그래프 라플라시안의 고유벡터로 군집을 나누는 원리를 보여줘요.

알고리즘 기초에서는 shortest-path-dp가 최단경로를 구하는 다이나믹 프로그래밍이 왜 최적 부분구조 위에서 성립하는지를 다루고, 심화 매트릭스의 네트워크 흐름에서는 max-flow-min-cut이 그래프 위의 흐름을 최적화하는 정리를 보여줘요. 이 결과는 자원 배분 문제나 추천시스템의 매칭 문제로 그대로 이어져요.
