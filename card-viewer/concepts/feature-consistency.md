---
slug: feature-consistency
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 피처스토어
title: 온라인/오프라인 피처 일관성: 학습 때 본 값과 서빙 때 값이 같아야 한다
related: 
---

## 도입
피처스토어는 이 문제를 오프라인 스토어와 온라인 스토어를 나누되 같은 정의를 공유하게 만드는 방식으로 접근합니다. 오프라인 스토어는 대량의 과거 데이터를 대상으로 피처를 배치로 계산해 학습 데이터셋을 만드는 데 쓰이고 온라인 스토어는 서빙 요청이 들어왔을 때 밀리초 단위로 값을 즉시 조회할 수 있는 키값 저장소입니다. 두 스토어가 같은 피처 정의(변환 로직)를 공유하도록 만들어 학습 때 쓴 계산식과 서빙 때 쓰는 계산식이 어긋나지 않게 하는 것이 핵심입니다.

오프라인 스토어에서 학습 데이터를 만들 때는 시점 정합(point-in-time correctness)이 특히 중요합니다. 특정 시점의 학습 샘플에 피처를 붙일 때 그 샘플이 실제로 존재했던 시점까지의 데이터만 사용해야지 나중에 갱신된 값을 앞당겨 쓰면 미래 정보가 새어 들어가는 라벨 누수(leakage)가 생깁니다. 서빙 시점에는 반대로 항상 최신 값을 조회하면 되지만 학습용 데이터를 만들 때는 각 샘플의 시점 기준으로 그 시점에 알 수 있었던 값만 골라내야 합니다.

같은 피처를 학습 파이프라인은 배치 작업으로, 서빙 파이프라인은 별도의 실시간 서비스 코드로 각각 따로 구현하면 두 코드가 시간이 지나며 조금씩 어긋나기 쉽습니다. 피처 정의를 한 곳에 선언해두고 배치 계산과 실시간 계산 양쪽에서 같은 정의를 실행하는 구조를 쓰면 이런 어긋남을 원천적으로 줄일 수 있습니다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<rect x="230" y="20" width="180" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="320" y="50" text-anchor="middle" font-size="13">피처 정의(공유 로직)</text>
<line x1="280" y1="70" x2="150" y2="120" class="dg-line" stroke-width="1.5"/>
<line x1="360" y1="70" x2="490" y2="120" class="dg-line" stroke-width="1.5"/>
<rect x="60" y="120" width="180" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="150" y="150" text-anchor="middle" font-size="12">오프라인 배치 계산</text>
<rect x="400" y="120" width="180" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="490" y="150" text-anchor="middle" font-size="12">온라인 스토어 조회</text>
<line x1="150" y1="170" x2="150" y2="210" class="dg-line" stroke-width="1.5"/>
<line x1="490" y1="170" x2="490" y2="210" class="dg-line" stroke-width="1.5"/>
<rect x="60" y="210" width="180" height="36" class="dg-dim"/>
<text x="150" y="233" text-anchor="middle" font-size="12">학습 데이터</text>
<rect x="400" y="210" width="180" height="36" class="dg-dim"/>
<text x="490" y="233" text-anchor="middle" font-size="12">서빙 응답</text>
</svg>

_오프라인 배치 계산과 온라인 실시간 계산이 같은 피처 정의를 공유해야 값이 어긋나지 않습니다._

## 문제
두 합을 항별로 풀어써 보면 $X_t=p_{t-1}+p_{t-2}+\cdots+p_{t-7}$이고 $X'_t=p_{t-2}+p_{t-3}+\cdots+p_{t-8}$이라서 $p_{t-2}$부터 $p_{t-7}$까지 여섯 개 항이 두 식에 똑같이 들어 있습니다. 이 공통 항들을 상쇄시키면 학습-서빙 스큐 $\Delta_t=X_t-X'_t$는 ==빈칸== 로 정리됩니다.

## 해설
겹치는 $p_{t-2}$부터 $p_{t-7}$까지의 항이 빼기 과정에서 서로 지워지고, 각 식에만 남아 있던 맨 앞 항 $p_{t-1}$과 맨 뒤 항 $p_{t-8}$만 남기 때문이에요.

**정답: $p_{t-1}-p_{t-8}$**

## 예시
최근 7일간 구매 합계라는 피처가 있다고 하면 학습 파이프라인은 어제까지 완결된 7일치 데이터를 기준으로 128,400원을 계산해 학습 데이터에 붙입니다. 그런데 서빙 파이프라인이 아직 어제 데이터를 반영하지 못한 온라인 스토어에서 값을 읽어오면 같은 시점인데도 96,200원처럼 다른 값이 조회될 수 있습니다. 모델은 128,400원 근방의 값들로 학습됐는데 실제 서빙에서는 계속 더 낮은 값을 받게 되어 예측이 조금씩 어긋납니다.
