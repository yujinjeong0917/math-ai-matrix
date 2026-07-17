---
slug: chunking-strategy
theme: LLM
domainLabel: LLM/Agent
subLabel: 검색 · 인덱싱
title: 청킹 전략: 문서를 얼마나 잘게, 얼마나 겹치게 자를까
related: 벡터DB(HNSW) · 하이브리드 검색
---

## 도입
가장 단순한 방식은 고정 토큰 수로 자르는 것입니다. 예를 들어 500토큰씩 잘라 조각을 만듭니다. 이 방식은 구현이 쉽지만 문장이나 문단 중간에서 잘릴 위험이 있습니다. 좀 더 나은 방식은 문단이나 문장 경계를 존중하며 자르는 재귀적 분할이고, 표나 코드 블록처럼 구조가 있는 문서는 그 구조 단위를 청크 경계로 삼는 방식도 씁니다.

청크를 나누는 이유는 임베딩 모델과 컨텍스트 윈도우 모두 한 번에 처리할 수 있는 길이에 한계가 있기 때문입니다. 문서 전체를 하나의 벡터로 임베딩하면 문서 안의 서로 다른 주제가 뭉개져서 정확히 관련된 부분만 찾아내기 어렵습니다. 반대로 청크가 지나치게 작으면 하나의 청크가 질문에 답하기에 충분한 맥락을 담지 못합니다.

겹침(overlap)은 청크 경계에서 발생하는 문맥 단절을 완화하는 장치입니다. 청크 사이에 일정 구간을 겹치게 자르면 경계 근처에 있던 문장이 양쪽 청크에 모두 포함되어 어느 쪽이 검색되더라도 필요한 맥락을 잃지 않습니다. 다만 겹침을 너무 크게 주면 같은 내용이 여러 청크에 중복 저장되어 인덱스 크기와 검색 비용이 늘어나므로 청크 크기와 겹침 비율은 문서 성격과 질의 유형에 맞춰 실험적으로 정합니다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="18" font-size="12" class="dg-dim">원본 문서</text>
<rect x="20" y="26" width="560" height="26" rx="4" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="20" y="80" font-size="12" class="dg-dim">청크 분할 (겹침 구간 강조)</text>
<rect x="20" y="90" width="150" height="30" rx="4" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="140" y="90" width="150" height="30" rx="4" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="260" y="90" width="150" height="30" rx="4" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="380" y="90" width="150" height="30" rx="4" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="140" y="90" width="30" height="30" class="dg-accent" opacity="0.5"/>
<rect x="260" y="90" width="30" height="30" class="dg-accent" opacity="0.5"/>
<rect x="380" y="90" width="30" height="30" class="dg-accent" opacity="0.5"/>
<text x="70" y="145" font-size="11" text-anchor="middle">청크1</text>
<text x="190" y="145" font-size="11" text-anchor="middle">청크2</text>
<text x="310" y="145" font-size="11" text-anchor="middle">청크3</text>
<text x="430" y="145" font-size="11" text-anchor="middle">청크4</text>
<text x="330" y="175" font-size="11" class="dg-accent">겹침 구간이 문맥 단절을 줄임</text>
</svg>

_이웃한 청크가 일부 구간을 겹쳐 잘라 경계에서 문맥이 끊기지 않게 합니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
RAG는 문서를 통째로 검색하는 게 아니라 작은 조각, 즉 청크 단위로 나눠서 검색합니다. 청킹 전략은 이 조각을 얼마나 크게, 어디서 자르고, 이웃한 조각과 얼마나 겹치게 할지 정하는 설계입니다.

너무 잘게 자르면 문맥이 끊겨서 조각 하나만 봐서는 무슨 말인지 알기 어렵고, 너무 크게 자르면 조각 안에 불필요한 내용이 섞여 정작 필요한 문장의 존재감이 흐려집니다.


## 예시
500토큰 청크에 겹침을 50토큰(10%)으로 주면 두번째 청크는 첫번째 청크의 마지막 50토큰부터 다시 시작합니다. 그 50토큰 구간에 있던 문장은 두 청크 모두에서 검색될 수 있어 경계에 걸친 정보를 놓칠 확률이 줄어듭니다.
