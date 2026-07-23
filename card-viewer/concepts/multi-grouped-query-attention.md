---
slug: multi-grouped-query-attention
theme: LLM
domainLabel: LLM/Agent
subLabel: KV 캐시 · 메모리
title: Multi/Grouped-Query Attention: Key/Value 헤드 수를 줄여 캐시 아끼기
related: PagedAttention
---

## 도입
표준 멀티헤드 어텐션(MHA)은 쿼리 헤드 수 $h$개마다 키 헤드와 밸류 헤드도 각각 $h$개씩 따로 둔다. Multi-Query Attention(MQA)은 이를 극단적으로 줄여 키와 밸류 헤드를 단 1개만 두고 모든 쿼리 헤드가 이 하나의 키, 밸류 헤드를 공유하게 한다. Grouped-Query Attention(GQA)은 그 중간 지점으로 쿼리 헤드 $h$개를 $g$개의 그룹으로 묶고 그룹마다 하나씩, 즉 $g$개의 키, 밸류 헤드만 둔다. $g=h$이면 MHA와 같고 $g=1$이면 MQA와 같다.

이 방식이 필요한 이유는 KV 캐시 메모리가 헤드 수에 정비례해서 커지기 때문이다. 시퀀스가 길어지고 배치가 커질수록 캐시 크기가 헤드 수만큼 불어나 서빙 GPU 메모리의 병목이 된다. 키, 밸류 헤드 수를 $h$에서 $g$로 줄이면 캐시 크기도 그 비율 $g/h$만큼 줄어든다. 예를 들어 헤드가 32개인 모델을 그룹 8개짜리 GQA로 바꾸면 캐시 크기는 원래의 4분의 1로 줄어든다.

다만 키, 밸류를 공유하는 만큼 모델이 표현할 수 있는 어텐션 패턴의 다양성은 약간 줄어든다. MQA는 캐시를 가장 크게 줄이지만 품질 저하가 상대적으로 크고 GQA는 그룹 수를 조절해 캐시 절감과 품질 사이의 절충점을 고를 수 있어 최근 대형 모델들이 널리 채택하는 절충안이 되었다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<text x="100" y="18" text-anchor="middle" font-size="13">MHA</text>
<text x="320" y="18" text-anchor="middle" font-size="13">GQA</text>
<text x="540" y="18" text-anchor="middle" font-size="13">MQA</text>
<circle cx="40" cy="50" r="10" class="dg-accent"/><circle cx="80" cy="50" r="10" class="dg-accent"/>
<circle cx="120" cy="50" r="10" class="dg-accent"/><circle cx="160" cy="50" r="10" class="dg-accent"/>
<rect x="25" y="90" width="30" height="24" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="65" y="90" width="30" height="24" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="105" y="90" width="30" height="24" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="145" y="90" width="30" height="24" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="40" y1="60" x2="40" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="80" y1="60" x2="80" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="120" y1="60" x2="120" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="160" y1="60" x2="160" y2="90" class="dg-line" stroke-width="1.5"/>
<text x="100" y="140" text-anchor="middle" font-size="11" class="dg-dim">KV 헤드 4개</text>
<circle cx="260" cy="50" r="10" class="dg-accent"/><circle cx="300" cy="50" r="10" class="dg-accent"/>
<circle cx="340" cy="50" r="10" class="dg-accent"/><circle cx="380" cy="50" r="10" class="dg-accent"/>
<rect x="265" y="90" width="30" height="24" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="345" y="90" width="30" height="24" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="260" y1="60" x2="280" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="300" y1="60" x2="280" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="340" y1="60" x2="360" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="380" y1="60" x2="360" y2="90" class="dg-line" stroke-width="1.5"/>
<text x="320" y="140" text-anchor="middle" font-size="11" class="dg-dim">KV 헤드 2개(그룹 공유)</text>
<circle cx="480" cy="50" r="10" class="dg-accent"/><circle cx="520" cy="50" r="10" class="dg-accent"/>
<circle cx="560" cy="50" r="10" class="dg-accent"/><circle cx="600" cy="50" r="10" class="dg-accent"/>
<rect x="525" y="90" width="30" height="24" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="480" y1="60" x2="540" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="520" y1="60" x2="540" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="560" y1="60" x2="540" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="600" y1="60" x2="540" y2="90" class="dg-line" stroke-width="1.5"/>
<text x="540" y="140" text-anchor="middle" font-size="11" class="dg-dim">KV 헤드 1개(전체 공유)</text>
</svg>

_쿼리 헤드 수는 유지한 채 키, 밸류 헤드 수만 줄여 캐시 크기를 줄인다._

## 문제
헤드가 $h$개이므로 MHA에서 토큰 하나, 레이어 하나당 필요한 KV 캐시 크기는 $\text{cache}_{MHA} = $==빈칸== 이다.

## 해설
헤드 하나당 캐시가 $2d$이고 이런 헤드가 $h$개 있으므로 $2d$를 $h$번 더한 값, 즉 $2hd$가 되기 때문이에요.

**정답: $2hd$**

## 예시

