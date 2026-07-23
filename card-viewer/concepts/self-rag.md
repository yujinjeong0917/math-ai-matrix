---
slug: self-rag
theme: LLM
domainLabel: LLM/Agent
subLabel: 증강 · 재순위화
title: Self-RAG: 검색이 필요한지도 모델이 스스로 판단하기
related: RAG-Fusion · ReAct · Reranking
---

## 도입
Self-RAG는 모델이 일반 텍스트 토큰과 함께 특수한 판단 토큰을 같이 생성하도록 학습합니다. 이 판단 토큰에는 지금 검색이 필요한지를 나타내는 것, 검색해온 문서가 질문과 관련 있는지를 나타내는 것, 생성한 답변이 그 문서에 실제로 근거하고 있는지를 나타내는 것, 답변 전체의 품질을 나타내는 것이 포함됩니다. 모델은 생성 과정 중에 이 토큰들을 스스로 내뱉으면서 자기 출력을 실시간으로 점검합니다.

이 방식이 겨냥하는 한계는 항상 검색부터 하고 보는 RAG의 비효율입니다. 표준 RAG 파이프라인은 질문의 성격과 무관하게 매번 검색을 수행하는데, 이미 모델이 확실히 아는 사실이나 검색해도 관련 문서가 없는 질문에서는 이 검색이 그대로 낭비가 되거나 오히려 관련 없는 문서를 억지로 답변에 끼워 넣어 품질을 떨어뜨릴 수 있습니다. Self-RAG는 검색 필요 여부 판단을 파이프라인 밖의 규칙이 아니라 모델 자신의 학습된 판단으로 내재화합니다.

또한 검색을 하기로 했더라도 가져온 문서가 실제로 도움이 되는지, 생성한 문장이 그 문서 내용과 어긋나지 않는지를 같은 방식으로 스스로 점검합니다. 이 자기 점검 신호는 생성 도중에 여러 후보 중 더 근거가 탄탄한 답변을 고르는 데 쓰일 수 있어, 검색 여부 판단과 사실성 검증을 하나의 학습된 절차로 묶어낸다는 점이 이 접근의 핵심입니다.

## 명제


## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="90" width="100" height="50" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="70" y="112" font-size="11" text-anchor="middle">질문 입력</text>
<text x="70" y="128" font-size="10" text-anchor="middle" class="dg-dim">검색 필요?</text>
<line x1="120" y1="100" x2="220" y2="40" class="dg-line" stroke-width="1.5"/>
<polygon points="220,40 208,42 214,52" class="dg-dim"/>
<text x="230" y="35" font-size="11" class="dg-dim">아니오</text>
<rect x="220" y="15" width="120" height="40" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="280" y="39" font-size="11" text-anchor="middle">바로 답변 생성</text>
<line x1="120" y1="130" x2="220" y2="180" class="dg-line" stroke-width="1.5"/>
<polygon points="220,180 208,175 214,168" class="dg-dim"/>
<text x="230" y="200" font-size="11" class="dg-accent">예</text>
<rect x="220" y="160" width="120" height="40" rx="6" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="280" y="184" font-size="11" text-anchor="middle" class="dg-accent">검색 후 답변 생성</text>
<line x1="340" y1="35" x2="420" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="340" y1="180" x2="420" y2="110" class="dg-line" stroke-width="1.5"/>
<polygon points="420,90 408,90 414,100" class="dg-dim"/>
<polygon points="420,110 408,110 414,100" class="dg-accent"/>
<rect x="420" y="80" width="120" height="50" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="480" y="100" font-size="11" text-anchor="middle">자기 비평 토큰</text>
<text x="480" y="116" font-size="10" text-anchor="middle" class="dg-dim">관련성·근거 점검</text>
</svg>

_검색이 필요한 질문인지 모델이 먼저 판단하고 필요할 때만 검색 후 근거를 점검합니다._

## 문제
Self-RAG의 기대비용은 유형별로 나눠 계산해야 한다. 유형 A(비율 $p$)에서 잘못 판단해 불필요하게 검색하면 비용 $r$이 들고(확률 $1-q$), 유형 B(비율 $1-p$)에서 옳게 판단해 검색하면 비용 $r$이 들며(확률 $q$), 유형 B에서 잘못 판단해 검색을 건너뛰면 환각 비용 $h$가 든다(확률 $1-q$). 즉 $\text{cost}_{\text{self}} = p(1-q)r + (1-p)qr + (1-p)(1-q)h$ 인데, 숫자를 대입하면 앞의 두 항은 각각 $0.7(1-q)$ 와 $0.3q$ 이고, 세 번째 항을 전개하면 ==빈칸== 이다.

## 해설
(1-p)(1-q)h = 0.3(1-q)×5 = 1.5(1-q)이고 이를 펼치면 1.5-1.5q가 되기 때문이에요.

**정답: $1.5-1.5q$**

## 예시
"수도는 어디인가" 처럼 흔한 사실 질문은 검색 없이 바로 답하고, "이번 분기 우리 회사 매출 정책 변경 사항은" 처럼 최신 내부 문서가 필요한 질문에는 검색 토큰을 내며 문서를 가져온 뒤, 가져온 문서가 실제로 매출 정책을 다루는지, 생성한 답이 그 문서와 일치하는지를 차례로 점검합니다.
