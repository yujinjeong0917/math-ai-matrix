---
slug: agent-short-long-memory
theme: LLM
domainLabel: LLM/Agent
subLabel: 메모리 · 상태관리
title: 단기 vs 장기 메모리: 지금 대화와 쌓인 과거를 다르게 다루기
related: 메모리 압축 · 에이전트 상태 머신
---

## 도입
단기 메모리는 현재 컨텍스트 윈도우 안에 있는 토큰 그 자체다. 모델이 별도의 검색 없이 바로 참조할 수 있지만 창 크기라는 물리적 한계가 있고 대화가 끝나거나 창이 가득 차 오래된 부분이 잘려나가면 사라진다. 장기 메모리는 창 밖에 저장된다. 흔히 과거 대화 조각이나 추출된 사실을 임베딩 벡터로 바꿔 벡터 데이터베이스에 쌓아두고 세션이 끝나도 남는다. 지금 사용자의 질문과 유사도가 높은 항목만 검색으로 꺼내와서 그 턴의 컨텍스트 윈도우에 끼워 넣는다.

이렇게 나누는 이유는 컨텍스트 윈도우의 고정된 크기 한계 때문이다. 오래 이어지는 에이전트가 알아야 할 정보는 지난 작업 이력이나 몇 달에 걸쳐 쌓인 사용자 선호나 과거 결정처럼 한 번에 창 하나에 다 담기 어렵다. 설령 억지로 담더라도 매번 모든 걸 넣으면 토큰 비용이 커지고 정작 지금 필요한 정보가 방대한 과거 속에 묻혀 모델이 놓치기 쉬워진다. 빠르고 작은 작업 공간과 느리지만 큰 저장소로 나누고 필요할 때만 꺼내오는 방식은 컴퓨터가 캐시와 디스크를 나누는 것과 같은 발상이다.

다만 검색 품질이 완벽하지 않다는 점은 감안해야 한다. 임베딩 유사도만으로는 정말 필요한 기억을 놓치거나 관련 없는 기억을 끌어올 수 있다. 검색 대신 대화 전체를 압축해 항상 곁에 두는 요약 기반 방식과 조합해서 쓰는 경우가 많다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="30" width="220" height="160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="150" y="50" text-anchor="middle" font-size="13">컨텍스트 윈도우(단기)</text>
<rect x="60" y="70" width="180" height="24" class="dg-dim" opacity="0.5"/>
<text x="150" y="87" text-anchor="middle" font-size="12">지난 턴</text>
<rect x="60" y="100" width="180" height="24" class="dg-dim" opacity="0.5"/>
<text x="150" y="117" text-anchor="middle" font-size="12">지난 턴</text>
<rect x="60" y="130" width="180" height="24" class="dg-accent"/>
<text x="150" y="147" text-anchor="middle" font-size="12">현재 턴</text>
<rect x="380" y="10" width="220" height="200" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="490" y="30" text-anchor="middle" font-size="13">벡터DB(장기)</text>
<circle cx="420" cy="60" r="6" class="dg-dim"/>
<circle cx="460" cy="80" r="6" class="dg-dim"/>
<circle cx="500" cy="55" r="6" class="dg-accent"/>
<circle cx="540" cy="90" r="6" class="dg-dim"/>
<circle cx="430" cy="110" r="6" class="dg-dim"/>
<circle cx="560" cy="60" r="6" class="dg-dim"/>
<circle cx="480" cy="130" r="6" class="dg-dim"/>
<circle cx="520" cy="150" r="6" class="dg-dim"/>
<path d="M500,55 L260,130" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="330" y="105" text-anchor="middle" font-size="12">유사도로 검색해 주입</text>
</svg>

_단기 메모리는 창 안의 최근 대화, 장기 메모리는 벡터DB에서 검색해 필요할 때만 가져온다._

## 문제
아무 것도 덜어내지 않고 대화 전체를 계속 쌓아둔다면, $t$번째 턴이 끝난 시점까지 쌓인 토큰의 총량은 매 턴 $\Delta$씩 늘어난 값을 처음 토큰 수에 더한 것과 같다. 이를 식으로 쓰면 $L(t) = $==빈칸==이다.

## 해설
처음에 이미 쓰인 $L_0$에 매 턴 $\Delta$씩 $t$번 더해지기 때문이에요.

**정답: $L_0 + t\Delta$**

## 예시

