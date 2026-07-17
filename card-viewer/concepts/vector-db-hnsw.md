---
slug: vector-db-hnsw
theme: LLM
domainLabel: LLM/Agent
subLabel: 검색 · 인덱싱
title: 벡터DB(HNSW): 근사최근접 탐색으로 빠르게 검색하기
related: 하이브리드 검색 · 청킹 전략
---

## 도입
HNSW는 Hierarchical Navigable Small World의 약자로, 벡터들을 여러 층의 그래프로 연결해둡니다. 가장 위층은 노드가 적고 서로 멀리까지 연결된 성긴 그래프이고 아래로 내려갈수록 노드가 촘촘해지며 마지막 최하층에는 전체 벡터가 다 들어 있습니다. 검색은 맨 위층의 임의 진입점에서 시작해 질문 벡터와 더 가까운 이웃으로 그래프를 따라 이동하다가 더 가까워지지 않으면 한 층 아래로 내려가는 과정을 반복합니다.

모든 벡터를 하나하나 비교하는 전수 탐색은 벡터 개수를 $n$이라 할 때 $O(n)$의 비교가 필요합니다. 데이터가 수백만, 수천만 개로 늘어나면 질의 하나에도 시간이 오래 걸려서 실시간 서비스에 쓰기 어렵습니다. HNSW는 이 문제를 완화하기 위해 정확한 최근접 대신 근사최근접을 찾는 쪽으로 타협합니다. 계층 구조 덕분에 평균적인 탐색 비용은 대략 $O(\log n)$ 수준으로 줄어들고, 이 덕분에 대규모 벡터DB에서도 밀리초 단위 검색이 가능해집니다.

대가는 결과가 항상 진짜 최근접이라는 보장이 없다는 점입니다. 그래프를 따라가다가 지역적으로 더 가까운 길목을 놓치면 진짜 최근접이 아닌 근사값을 반환할 수 있습니다. 실무에서는 탐색 중 유지하는 후보 개수 같은 파라미터를 조절해 속도와 정확도 사이의 균형을 맞춥니다.

## 명제


## 그림
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="20" font-size="12" class="dg-dim">Layer 2 (성긴 장거리 연결)</text>
<line x1="150" y1="40" x2="350" y2="40" class="dg-line" stroke-width="1.5"/>
<line x1="350" y1="40" x2="500" y2="40" class="dg-line" stroke-width="1.5"/>
<circle cx="150" cy="40" r="8" class="dg-accent"/>
<circle cx="350" cy="40" r="8" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="500" cy="40" r="8" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="20" y="110" font-size="12" class="dg-dim">Layer 1</text>
<line x1="80" y1="130" x2="150" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="150" y1="130" x2="260" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="260" y1="130" x2="350" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="350" y1="130" x2="430" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="430" y1="130" x2="500" y2="130" class="dg-line" stroke-width="1.5"/>
<circle cx="80" cy="130" r="7" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="150" cy="130" r="7" class="dg-accent"/>
<circle cx="260" cy="130" r="7" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="350" cy="130" r="7" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="430" cy="130" r="7" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="500" cy="130" r="7" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="20" y="200" font-size="12" class="dg-dim">Layer 0 (전체 노드)</text>
<line x1="40" y1="220" x2="110" y2="220" class="dg-line" stroke-width="1.5"/>
<line x1="110" y1="220" x2="180" y2="220" class="dg-line" stroke-width="1.5"/>
<line x1="180" y1="220" x2="250" y2="220" class="dg-line" stroke-width="1.5"/>
<line x1="250" y1="220" x2="320" y2="220" class="dg-line" stroke-width="1.5"/>
<line x1="320" y1="220" x2="390" y2="220" class="dg-line" stroke-width="1.5"/>
<line x1="390" y1="220" x2="460" y2="220" class="dg-line" stroke-width="1.5"/>
<line x1="460" y1="220" x2="530" y2="220" class="dg-line" stroke-width="1.5"/>
<line x1="530" y1="220" x2="580" y2="220" class="dg-line" stroke-width="1.5"/>
<circle cx="40" cy="220" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="110" cy="220" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="180" cy="220" r="6" class="dg-accent"/>
<circle cx="250" cy="220" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="320" cy="220" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="390" cy="220" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="460" cy="220" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="530" cy="220" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="580" cy="220" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<path d="M150,48 L150,122" class="dg-stroke-accent" stroke-width="2" fill="none"/>
<path d="M150,138 L180,212" class="dg-stroke-accent" stroke-width="2" fill="none"/>
</svg>

_위층의 성긴 연결에서 시작해 아래층으로 내려가며 목표 벡터에 가까워집니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
텍스트를 임베딩 벡터로 바꾸고 나면 가장 비슷한 문서 찾기는 결국 수백만 개 벡터 중에서 질문 벡터와 가장 가까운 것을 찾는 문제가 됩니다. 벡터를 하나하나 거리 계산으로 비교하면 정확하지만 데이터가 많아질수록 느려집니다. HNSW는 정확도를 살짝 포기하는 대신 훨씬 빠르게 가까운 벡터를 찾아주는 인덱스 구조입니다.

비유하자면 고속도로에서 시작해 점점 국도, 골목길로 좁혀가며 목적지에 접근하는 것과 비슷합니다. 처음부터 골목길만 뒤지면 느리지만 큰 길에서 대략적인 방향을 잡고 점점 좁은 길로 내려오면 훨씬 빨리 도착합니다.


## 예시
벡터 100만 개 중 하나를 전수 비교로 찾으면 매 질의마다 100만 번의 거리 계산이 필요합니다. HNSW로 찾으면 평균적으로 $\log_2 1000000 \approx 20$, 즉 약 20번 수준의 훨씬 적은 비교만으로 충분히 가까운 벡터에 도달합니다.
