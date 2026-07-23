---
slug: rag-fusion
theme: LLM
domainLabel: LLM/Agent
subLabel: 증강 · 재순위화
title: RAG-Fusion: 질문을 여러 갈래로 바꿔 검색결과를 합치기
related: 하이브리드 검색 · Self-RAG · Reranking
---

## 도입
과정은 세 단계로 이뤄집니다. 먼저 LLM이 원래 질문을 서로 다른 관점이나 표현으로 재구성한 쿼리를 여러 개 생성합니다. 다음으로 각 재구성 쿼리마다 독립적으로 검색을 수행해 쿼리 개수만큼의 순위 목록을 얻습니다. 마지막으로 이 순위 목록들을 Reciprocal Rank Fusion(RRF)으로 합쳐 하나의 최종 순위를 만듭니다. RRF는 문서 $d$의 융합 점수를 다음처럼 계산합니다.

$$\text{RRFscore}(d) = \sum_{r} \frac{1}{k + \text{rank}_r(d)}$$

여기서 합은 각 쿼리에서 나온 순위 목록 전체에 대해 이뤄지고 $\text{rank}_r(d)$는 그 목록에서 문서 $d$의 등수이며 $k$는 보통 60 정도로 두는 상수입니다. 여러 목록에서 골고루 상위에 오른 문서일수록 이 점수가 커집니다.

단일 쿼리 RAG의 한계는 검색 결과가 질문의 정확한 문구에 지나치게 민감하다는 점입니다. 사용자가 쓴 단어가 하필 문서의 표현과 다르면 실제로 관련 있는 문서라도 임베딩이나 키워드 매칭에서 낮은 순위로 밀려날 수 있습니다. RAG-Fusion은 질문을 여러 방식으로 바꿔 던짐으로써 이 표현 의존성을 줄입니다. 한 표현으로는 놓친 문서도 다른 표현의 쿼리에서는 상위에 걸릴 기회를 얻고, RRF는 등수 기반으로 합치기 때문에 검색 엔진마다 점수 스케일이 달라도 안정적으로 결합됩니다.

## 명제


## 그림
<svg viewBox="0 0 660 260" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="105" width="90" height="40" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="55" y="129" font-size="12" text-anchor="middle">원 질문</text>
<line x1="100" y1="115" x2="170" y2="40" class="dg-line" stroke-width="1.5"/>
<line x1="100" y1="125" x2="170" y2="125" class="dg-line" stroke-width="1.5"/>
<line x1="100" y1="135" x2="170" y2="210" class="dg-line" stroke-width="1.5"/>
<rect x="170" y="20" width="100" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="220" y="41" font-size="11" text-anchor="middle">재구성 쿼리1</text>
<rect x="170" y="108" width="100" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="220" y="129" font-size="11" text-anchor="middle">재구성 쿼리2</text>
<rect x="170" y="196" width="100" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="220" y="217" font-size="11" text-anchor="middle">재구성 쿼리3</text>
<line x1="270" y1="37" x2="330" y2="37" class="dg-line" stroke-width="1.5"/>
<line x1="270" y1="125" x2="330" y2="125" class="dg-line" stroke-width="1.5"/>
<line x1="270" y1="213" x2="330" y2="213" class="dg-line" stroke-width="1.5"/>
<rect x="330" y="20" width="90" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="375" y="41" font-size="11" text-anchor="middle">순위목록1</text>
<rect x="330" y="108" width="90" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="375" y="129" font-size="11" text-anchor="middle">순위목록2</text>
<rect x="330" y="196" width="90" height="34" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="375" y="217" font-size="11" text-anchor="middle">순위목록3</text>
<line x1="420" y1="37" x2="480" y2="115" class="dg-line" stroke-width="1.5"/>
<line x1="420" y1="125" x2="480" y2="125" class="dg-line" stroke-width="1.5"/>
<line x1="420" y1="213" x2="480" y2="135" class="dg-line" stroke-width="1.5"/>
<rect x="480" y="105" width="80" height="40" rx="6" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="520" y="123" font-size="11" text-anchor="middle" class="dg-accent">RRF</text>
<text x="520" y="137" font-size="10" text-anchor="middle" class="dg-accent">융합</text>
<line x1="560" y1="125" x2="620" y2="125" class="dg-line" stroke-width="1.5"/>
<polygon points="620,125 610,120 610,130" class="dg-accent"/>
<text x="590" y="160" font-size="11" text-anchor="middle">최종 순위</text>
</svg>

_원 질문을 여러 쿼리로 재구성해 각각 검색한 뒤 RRF로 하나의 순위로 합칩니다._

## 문제
먼저 문서 $A$가 첫 번째 목록에서 얻는 항을 계산해 보면 $\dfrac{1}{k+\text{rank}_1(A)} = \dfrac{1}{60+2} =$ ==빈칸== 이다.

## 해설
정의에서 k=60, rank=2이므로 60에 2를 더한 62의 역수가 되기 때문이에요.

**정답: $1/62$**

## 예시
"파이썬 리스트 정렬" 이라는 질문을 "파이썬에서 리스트를 정렬하는 방법", "sort와 sorted의 차이" 로 재구성해 각각 검색하면, 원 질문만으로는 하위권이었던 "sorted 함수 활용법" 문서가 두번째 재구성 쿼리에서 상위에 올라 RRF 합산 후 최종 순위에서도 상위권에 들 수 있습니다.
