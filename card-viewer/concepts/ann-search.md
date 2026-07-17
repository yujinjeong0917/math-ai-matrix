---
slug: ann-search
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 임베딩기반 검색
title: ANN 검색: 정확한 최근접 대신 빠른 근사로 후보 찾기
related: Two-Tower 모델
---

## 도입
전수조사 방식의 계산량은 아이템 수 $N$과 벡터 차원 $d$에 대해 $O(Nd)$입니다. 오천만 개 아이템을 128차원 벡터로 매 요청마다 전부 비교하는 것은 서빙에 허용된 밀리초 단위 시간 안에 끝낼 수 없습니다.

대표적인 ANN 방식은 두 갈래입니다. IVF 계열은 아이템 벡터를 오프라인에서 군집화해두고 질의가 오면 질의 벡터와 가까운 몇 개 군집 안의 아이템만 비교합니다. 비교 대상이 $N$에서 대략 $\sqrt N$ 수준으로 줄어듭니다. HNSW 같은 그래프 계열은 아이템 벡터를 여러 층의 그래프로 연결해두고 위쪽 성긴 층에서 큰 걸음으로 이동한 뒤 아래쪽 촘촘한 층에서 세밀하게 좁혀가며 질의 벡터에 가까운 노드까지 도달합니다. 탐색 시간이 대략 로그 스케일로 줄어듭니다.

정확도를 포기한 만큼 성능 지표도 달라집니다. 진짜 최근접 $k$개를 항상 보장하는 대신 실제로 찾아낸 비율인 재현율로 품질을 잽니다. 군집을 몇 개까지 볼지 그래프를 얼마나 넓게 탐색할지 같은 색인 파라미터를 조절해서 지연시간 예산 안에서 목표 재현율을 맞춥니다. 카탈로그가 수억 개를 넘어가면 벡터 자체를 짧은 코드로 압축하는 product quantization을 색인 구조와 함께 써서 메모리도 줄입니다.

## 명제


## 그림
<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="18" font-size="13" text-anchor="middle">브루트포스: 전체 스캔</text>
<circle cx="150" cy="120" r="8" class="dg-accent"/>
<text x="150" y="145" font-size="11" text-anchor="middle">질의 벡터</text>
<circle cx="60" cy="60" r="5" class="dg-dim"/>
<circle cx="90" cy="200" r="5" class="dg-dim"/>
<circle cx="220" cy="70" r="5" class="dg-dim"/>
<circle cx="240" cy="180" r="5" class="dg-dim"/>
<circle cx="40" cy="140" r="5" class="dg-dim"/>
<circle cx="250" cy="130" r="5" class="dg-dim"/>
<circle cx="180" cy="40" r="5" class="dg-dim"/>
<circle cx="70" cy="30" r="5" class="dg-dim"/>
<line x1="150" y1="120" x2="60" y2="60" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<line x1="150" y1="120" x2="90" y2="200" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<line x1="150" y1="120" x2="220" y2="70" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<line x1="150" y1="120" x2="240" y2="180" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<line x1="150" y1="120" x2="40" y2="140" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<line x1="150" y1="120" x2="250" y2="130" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<line x1="150" y1="120" x2="180" y2="40" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<line x1="150" y1="120" x2="70" y2="30" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<text x="470" y="18" font-size="13" text-anchor="middle">ANN: 그래프 일부만 탐색</text>
<circle cx="360" cy="120" r="5" class="dg-dim"/>
<circle cx="410" cy="70" r="5" class="dg-dim"/>
<circle cx="420" cy="170" r="5" class="dg-dim"/>
<circle cx="470" cy="100" r="5" class="dg-dim"/>
<circle cx="480" cy="160" r="5" class="dg-dim"/>
<circle cx="520" cy="60" r="5" class="dg-dim"/>
<circle cx="540" cy="130" r="5" class="dg-dim"/>
<circle cx="580" cy="90" r="8" class="dg-accent"/>
<line x1="360" y1="120" x2="420" y2="170" class="dg-line" stroke-width="1"/>
<line x1="470" y1="100" x2="480" y2="160" class="dg-line" stroke-width="1"/>
<line x1="480" y1="160" x2="540" y2="130" class="dg-line" stroke-width="1"/>
<line x1="360" y1="120" x2="410" y2="70" class="dg-stroke-accent" stroke-width="2.5"/>
<line x1="410" y1="70" x2="470" y2="100" class="dg-stroke-accent" stroke-width="2.5"/>
<line x1="470" y1="100" x2="520" y2="60" class="dg-stroke-accent" stroke-width="2.5"/>
<line x1="520" y1="60" x2="580" y2="90" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="360" y="145" font-size="11" text-anchor="middle">진입점</text>
<text x="580" y="115" font-size="11" text-anchor="middle">근사 최근접</text>
</svg>

_브루트포스는 모든 항목을 비교하지만 ANN은 그래프의 일부 경로만 따라가 후보를 찾는다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
Two-Tower가 사용자 벡터 하나를 내놓아도 수천만 개 아이템 벡터 중 가장 가까운 몇 개를 찾아야 합니다. 아이템 벡터 하나하나와 내적을 계산하는 정확한 최근접 이웃 검색은 아이템 수만큼 계산이 늘어나서 카탈로그가 커지면 요청 하나를 처리하는 데도 너무 오래 걸립니다.

ANN 검색은 미리 색인을 만들어두고 그 색인을 따라가며 대부분의 아이템은 아예 비교하지 않은 채로 충분히 가까운 이웃을 찾습니다. 정확한 최근접이 아니라 근사한 최근접을 대가로 속도를 크게 얻습니다.


## 예시

