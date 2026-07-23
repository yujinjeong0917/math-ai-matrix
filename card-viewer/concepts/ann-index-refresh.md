---
slug: ann-index-refresh
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 대규모 서빙 아키텍처
title: ANN 인덱스 갱신: 최신성을 지키려면 색인을 다시 만들어야 한다
related: 2단계 구조 · 실시간 피처 스토어
---

## 도입
ANN 인덱스는 임베딩 벡터를 미리 그래프나 클러스터 구조로 정리해두고 질의가 들어오면 전체를 다 비교하지 않고도 가까운 벡터를 빠르게 찾도록 만든 자료구조다. 대표적으로 HNSW나 IVF 같은 방식을 쓴다. 이 구조를 만드는 데는 계산 비용이 들기 때문에 매 요청마다 새로 만들 수 없고 한 번 만든 색인을 한동안 재사용한다.

하지만 그 사이에 신규 아이템이 계속 들어오고 추천 모델이 재학습되면서 기존 아이템의 임베딩 좌표 자체도 달라진다. 색인이 오래될수록 색인 안 벡터 위치와 최신 모델이 계산하는 실제 임베딩 위치 사이의 차이가 커지고 검색 결과의 재현율이 점점 떨어진다. 신규 아이템은 색인에 아예 없으니 아무리 관련성이 높아도 후보로 뽑히지 않는다.

대응 방법은 두 갈래다. 하나는 전체 임베딩으로 색인을 처음부터 다시 만드는 풀 리빌드를 정해진 주기마다 도는 것이다. 다른 하나는 신규 아이템의 임베딩만 기존 색인에 점진적으로 추가하는 증분 업데이트로 리빌드 사이 공백을 메우는 것이다. 대개 두 방법을 함께 쓴다. 증분 업데이트로 신규 아이템의 최소한의 검색 가능성을 보장하고 주기적인 풀 리빌드로 임베딩 전체가 흐트러지는 것을 바로잡는다.

## 명제


## 그림
<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg">
<text x="320" y="20" text-anchor="middle" font-size="12" class="dg-dim">색인이 오래될수록 신규 아이템이 검색되지 않는 정도가 커진다</text>
<line x1="40" y1="150" x2="600" y2="150" class="dg-line" stroke-width="1.5"/>
<path d="M60,140 C150,120 200,90 260,60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<line x1="260" y1="60" x2="260" y2="150" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="260" y="168" text-anchor="middle" font-size="11">풀 리빌드</text>
<path d="M260,140 C350,120 400,90 460,60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<line x1="460" y1="60" x2="460" y2="150" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="460" y="168" text-anchor="middle" font-size="11">풀 리빌드</text>
<path d="M460,140 C520,125 560,110 590,95" fill="none" class="dg-stroke-accent" stroke-width="2"/>
</svg>

_리빌드 직후 격차는 초기화되지만 시간이 지날수록 다시 벌어진다._

## 문제
신규 아이템이 일정한 속도 $r$로 유입되므로, 리빌드 후 $t$일이 지난 시점에 색인에 반영되지 못한 신규 아이템 수는 $m(t) = $==빈칸== 로 쓸 수 있다.

## 해설
단위 시간당 r개씩 유입되는 아이템이 t일 동안 누적되므로, 그 개수는 속도와 경과 시간의 곱으로 계산돼요.

**정답: $rt$**

## 예시

