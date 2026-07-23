---
slug: reranking-llm
theme: LLM
domainLabel: LLM/Agent
subLabel: 증강 · 재순위화
title: Reranking: 검색결과를 한 번 더 정밀하게 정렬하기
related: 하이브리드 검색 · RAG-Fusion
---

## 도입
1차 검색에 쓰는 임베딩 모델은 흔히 bi-encoder 구조입니다. 질문과 문서를 각각 독립적으로 벡터로 인코딩한 뒤 $\mathrm{sim}(q,d) = \cos(E(q), E(d))$처럼 두 벡터의 코사인 유사도로 관련성을 잽니다. 이 구조는 문서 벡터를 미리 계산해 인덱스에 저장해둘 수 있어 매우 빠르지만 질문과 문서를 따로 인코딩하기 때문에 둘 사이의 세밀한 상호작용은 반영하지 못합니다.

Reranker는 보통 cross-encoder 구조를 씁니다. 질문과 문서를 하나의 입력으로 이어붙여 $s(q,d) = f_\theta(q,d)$처럼 함께 모델에 넣고 관련성 점수를 직접 출력합니다. 질문과 문서의 각 단어가 서로 어텐션을 주고받을 수 있어 훨씬 정밀하지만 후보마다 모델을 새로 돌려야 하므로 계산 비용이 커서 전체 문서에 적용하기는 어렵습니다.

그래서 실무에서는 두 방식을 단계적으로 결합합니다. bi-encoder나 BM25로 먼저 넓게 후보를 추린 뒤 그중 상위 수십에서 수백 개만 cross-encoder로 재정렬합니다. 이렇게 하면 전체 문서에 대해서는 빠른 1차 검색의 속도를 유지하면서 최종적으로 사용자에게 노출되는 소수의 결과에 대해서는 정밀한 모델의 정확도를 얻을 수 있습니다.

## 명제


## 그림
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="90" width="80" height="40" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="50" y="114" font-size="12" text-anchor="middle">질문</text>
<line x1="90" y1="110" x2="140" y2="110" class="dg-line" stroke-width="1.5"/>
<polygon points="140,110 130,105 130,115" class="dg-dim"/>
<text x="140" y="30" font-size="11" class="dg-dim">1단계: 임베딩 검색(빠름)</text>
<rect x="140" y="50" width="60" height="120" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="170" cy="70" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="170" cy="95" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="170" cy="120" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="170" cy="145" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="170" y="190" font-size="10" text-anchor="middle" class="dg-dim">후보 수백개</text>
<line x1="200" y1="110" x2="260" y2="110" class="dg-line" stroke-width="1.5"/>
<polygon points="260,110 250,105 250,115" class="dg-dim"/>
<text x="260" y="30" font-size="11" class="dg-accent">2단계: Reranker(정밀)</text>
<rect x="260" y="70" width="120" height="80" rx="6" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="320" y="108" font-size="11" text-anchor="middle" class="dg-accent">질문+문서</text>
<text x="320" y="122" font-size="11" text-anchor="middle" class="dg-accent">정밀 채점</text>
<line x1="380" y1="110" x2="440" y2="110" class="dg-line" stroke-width="1.5"/>
<polygon points="440,110 430,105 430,115" class="dg-accent"/>
<rect x="440" y="80" width="80" height="30" rx="6" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="480" y="100" font-size="11" text-anchor="middle">상위1</text>
<rect x="440" y="120" width="80" height="30" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="480" y="140" font-size="11" text-anchor="middle">상위2</text>
</svg>

_빠른 1차 검색으로 후보를 넓게 추리고 정밀한 reranker로 소수만 다시 정렬합니다._

## 문제
$d^*$가 1차 검색의 상위 $k$개 안에 실제로 들어올 확률(1차 검색의 recall@k)을 $R(k)$라 하자. reranker가 최종적으로 $d^*$를 1위로 올려놓으려면 먼저 $d^*$가 애초에 그 후보 집합 안에 있어야 하므로, 최종적으로 $d^*$가 1위가 될 확률을 $P_{\text{final}}$이라 하면 $P_{\text{final}} \le$ ==빈칸== 이다.

## 해설
d*가 1위가 되려면 최소한 후보군에 포함돼 있어야 하는데 그 확률이 R(k)이므로, 최종 확률은 이 값을 넘을 수 없어요.

**정답: $R(k)$**

## 예시
1차 검색으로 추린 상위 100개 문서 중 실제로 질문과 가장 관련 있는 문서가 37번째 순위에 있었다면, cross-encoder reranker가 질문과 문서를 함께 보고 그 문서를 1위로 끌어올려 최종 답변에 쓰일 확률을 높입니다.
