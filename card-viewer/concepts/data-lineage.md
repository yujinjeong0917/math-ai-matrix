---
slug: data-lineage
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 데이터 버저닝
title: 데이터 리니지: 이 데이터가 어디서 왔는지 추적하기
related: 재현성 · 모델 CI · 데이터 드리프트
---

## 도입
데이터 리니지는 그래프로 표현한다. 노드는 원본 테이블 전처리 스크립트 파생 피처 최종 학습 데이터셋이고 간선은 어떤 노드가 어떤 노드로부터 만들어졌는지를 나타낸다. 노드마다 버전과 생성 시각을 같이 남겨두면 특정 시점에 학습된 모델이 정확히 어떤 데이터 스냅샷을 봤는지 재구성할 수 있다.

리니지가 없는 파이프라인에서는 원본 데이터가 조용히 바뀌어도 아무도 모른다. 상류 테이블 스키마가 바뀌거나 결측치 처리 로직이 수정되면 그 변화가 몇 단계 아래 학습 데이터에 그대로 흘러들지만 추적할 방법이 없으면 모델 성능이 왜 떨어졌는지 원인 후보만 나열하다 끝난다. 리니지 그래프가 있으면 문제가 생긴 피처 하나에서 시작해 그 피처가 의존하는 원본 테이블까지 역추적해 정확히 어디서 변화가 생겼는지 좁힐 수 있다.

실무에서는 피처스토어나 워크플로우 오케스트레이션 도구가 이 그래프를 자동으로 기록한다. 스크립트가 어떤 입력 테이블을 읽고 어떤 출력 테이블을 쓰는지만 선언하면 도구가 나머지 의존관계를 이어붙인다. 규제가 있는 도메인에서는 리니지가 감사 요건이기도 하다. 어떤 모델이 어떤 데이터로 학습됐는지 설명할 수 있어야 하기 때문이다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="80" width="110" height="42" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="75" y="105" font-size="12" text-anchor="middle">원본 로그 테이블</text>
<line x1="130" y1="101" x2="185" y2="101" class="dg-line" stroke-width="1.5"/>
<polygon points="185,101 175,96 175,106" class="dg-dim"/>
<rect x="190" y="80" width="110" height="42" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="245" y="105" font-size="12" text-anchor="middle">전처리 스크립트</text>
<line x1="300" y1="101" x2="355" y2="101" class="dg-line" stroke-width="1.5"/>
<polygon points="355,101 345,96 345,106" class="dg-dim"/>
<rect x="360" y="80" width="110" height="42" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="415" y="105" font-size="12" text-anchor="middle">파생 피처 테이블</text>
<line x1="470" y1="101" x2="525" y2="101" class="dg-line" stroke-width="1.5"/>
<polygon points="525,101 515,96 515,106" class="dg-dim"/>
<rect x="530" y="70" width="100" height="62" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="580" y="95" font-size="12" text-anchor="middle">학습 데이터셋</text>
<text x="580" y="113" font-size="11" text-anchor="middle" class="dg-dim">스냅샷 v7</text>
<text x="330" y="30" font-size="12" text-anchor="middle">화살표를 거꾸로 따라가면 원인을 좁힐 수 있다</text>
</svg>

_원본 테이블부터 학습 데이터셋까지 변환 이력을 그래프로 남긴다._

## 문제
먼저 이 그래프에 사이클이 있을 수 있는지 살펴봅시다. 만약 $v_1\to v_2\to\cdots\to v_k\to v_1$ 형태의 사이클이 있다고 가정하면, 정의에 의해 각 간선 $v_i\to v_{i+1}$마다 $t(v_i)<t(v_{i+1})$이 성립합니다(단 $i=1,\ldots,k-1$). 부등식은 추이적이므로 이 $k-1$개의 관계를 전부 이어 붙이면 $t(v_1)$과 $t(v_k)$ 사이에는 ==빈칸== 라는 관계가 성립합니다.

## 해설
$t(v_1)<t(v_2)$이고 $t(v_2)<t(v_3)$이고 이런 식으로 $t(v_{k-1})<t(v_k)$까지 $k-1$개의 부등식을 부등식의 추이성으로 차례차례 이어 붙이면 중간 노드들의 시각은 다 사라지고 양 끝만 남는 관계가 나와요.

**정답: $t(v_1)<t(v_k)$**

## 예시

