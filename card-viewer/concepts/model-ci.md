---
slug: model-ci
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 파이프라인 자동화
title: 모델 CI: 데이터나 코드가 바뀌면 파이프라인을 자동으로 재검증하기
related: 데이터 리니지 · 재현성 · 블루그린 배포
---

## 도입
전통적인 CI(Continuous Integration)는 코드 변경을 트리거로 삼아 빌드와 테스트를 자동 실행한다. 모델 CI는 여기에 두 번째 트리거를 더한다. 학습 데이터셋의 새 버전이 들어오는 것도 파이프라인을 다시 돌릴 이유가 된다. 코드 커밋이든 데이터 버전 갱신이든 둘 중 하나만 바뀌어도 전체 학습 파이프라인이 자동으로 재실행된다.

재실행되는 파이프라인은 단순히 에러 없이 끝까지 도는지만 확인하지 않는다. 학습이 끝난 뒤 검증셋 성능이 이전 모델 대비 일정 기준 이하로 떨어지지 않는지 데이터 스키마가 기대한 형태를 유지하는지 피처 분포가 급격히 튀지 않는지까지 자동으로 체크한다. 이 체크를 통과해야만 모델이 레지스트리에 등록되고 다음 단계인 배포 파이프라인으로 넘어간다.

데이터 리니지와 재현성이 모델 CI를 실질적으로 가능하게 만드는 토대다. 어떤 데이터 스냅샷이 파이프라인을 트리거했는지 리니지로 알 수 있어야 하고 같은 스냅샷과 같은 코드로 다시 돌렸을 때 같은 결과가 나온다는 재현성이 보장돼야 CI 결과를 신뢰할 수 있다. 이 셋이 갖춰지면 사람이 매번 수동으로 재학습을 챙기지 않아도 데이터와 코드 변화에 맞춰 모델이 계속 최신 상태로 검증된다.

## 명제


## 그림
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="30" width="120" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="55" font-size="12" text-anchor="middle">코드 변경</text>
<rect x="20" y="150" width="120" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="175" font-size="12" text-anchor="middle">데이터 갱신</text>
<line x1="140" y1="50" x2="220" y2="100" class="dg-line" stroke-width="1.5"/>
<line x1="140" y1="170" x2="220" y2="120" class="dg-line" stroke-width="1.5"/>
<rect x="220" y="85" width="140" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="290" y="106" font-size="12" text-anchor="middle">학습 파이프라인</text>
<text x="290" y="124" font-size="12" text-anchor="middle">자동 재실행</text>
<line x1="360" y1="110" x2="430" y2="110" class="dg-line" stroke-width="1.5"/>
<rect x="430" y="85" width="140" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="500" y="106" font-size="12" text-anchor="middle">성능 · 스키마 검증</text>
<text x="500" y="124" font-size="12" text-anchor="middle">통과시 레지스트리 등록</text>
</svg>

_코드나 데이터 중 하나만 바뀌어도 학습 파이프라인이 자동으로 다시 돌고 검증을 거친다._

## 문제
먼저 트리거 규칙을 잘못하여 $\text{Trigger} = T_{code} \wedge T_{data}$(둘 다 바뀔 때만 재실행)로 잡았다고 하자. 코드는 그대로이고($T_{code}=0$) 데이터만 새로 들어온 경우($T_{data}=1$)를 대입하면 $\text{Trigger} = $==빈칸== 가 되어, 데이터만 바뀐 위험한 상황을 파이프라인이 놓치고 만다.

## 해설
논리곱(AND)은 두 값이 모두 1이어야 1이 되는데, T_code=0이므로 결과는 항상 0이 돼요. 즉 데이터만 바뀐 상황을 전혀 감지하지 못한다는 뜻이에요.

**정답: $0$**

## 예시

