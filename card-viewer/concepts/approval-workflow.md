---
slug: approval-workflow
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 거버넌스
title: 승인 워크플로우: 스테이징 검증 후 프로덕션으로 승격하기
related: 모델 카드 · 모델 버저닝
---

## 도입
전형적인 흐름은 학습이 끝난 모델을 우선 스테이징 환경에 올리는 것으로 시작합니다. 스테이징은 실제 서비스와 같은 구성으로 돌아가지만 실제 사용자 트래픽에는 영향을 주지 않는 격리된 환경입니다. 여기서 정해둔 평가 데이터셋으로 성능 지표를 확인하고 지연 시간과 자원 사용량 같은 운영 지표까지 함께 점검합니다.

기준을 통과하면 승인 단계로 넘어갑니다. 승인은 담당자가 카드와 지표를 검토하고 승인하는 수동 방식일 수도 있고 정해둔 지표 기준을 자동으로 통과하면 다음 단계로 넘어가는 자동화 방식일 수도 있습니다. 규제가 엄격한 도메인일수록 사람이 직접 확인하는 수동 승인을 요구하는 경우가 많습니다.

승인 워크플로우가 없으면 학습 코드에서 곧바로 프로덕션 엔드포인트로 모델이 흘러들어가는 구조가 됩니다. 학습 스크립트의 사소한 버그나 평가 데이터셋 선택 실수가 그대로 실제 사용자에게 노출되고 문제를 알아차렸을 때는 이미 많은 요청이 잘못된 응답을 받은 뒤일 수 있습니다. 승인 단계는 이런 사고가 퍼지기 전에 멈추는 마지막 검문소 역할을 합니다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="85" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="115" text-anchor="middle" font-size="12">학습 완료 모델</text>
<line x1="140" y1="110" x2="190" y2="110" class="dg-line" stroke-width="1.5"/>
<rect x="190" y="85" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="250" y="108" text-anchor="middle" font-size="12">스테이징</text>
<text x="250" y="124" text-anchor="middle" font-size="12">검증</text>
<line x1="310" y1="110" x2="360" y2="110" class="dg-line" stroke-width="1.5"/>
<polygon points="360,110 400,80 440,110 400,140" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="400" y="107" text-anchor="middle" font-size="11">기준</text>
<text x="400" y="121" text-anchor="middle" font-size="11">통과?</text>
<line x1="440" y1="110" x2="500" y2="60" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="470" y="55" font-size="11">예</text>
<rect x="500" y="35" width="120" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="560" y="58" text-anchor="middle" font-size="12">프로덕션</text>
<text x="560" y="74" text-anchor="middle" font-size="12">승격</text>
<line x1="400" y1="140" x2="400" y2="185" class="dg-line" stroke-width="1.5"/>
<text x="415" y="165" font-size="11">아니오</text>
<rect x="340" y="185" width="120" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="400" y="205" text-anchor="middle" font-size="11">반려 · 재학습</text>
</svg>

_스테이징 검증을 통과한 모델만 프로덕션으로 승격됩니다._

## 문제
승인 단계, 즉 사람이 카드와 지표를 직접 검토하는 수동 승인이 스테이징에서 놓친 결함을 다시 잡아낼 확률을 $r=0.5$라 하자(스테이징과는 다른 방식으로 보므로 독립사건으로 둔다). 결함 모델이 스테이징도, 승인도 모두 통과해 실제 프로덕션까지 도달하려면 두 단계 모두에서 놓쳐야 하므로 그 확률은 $(1-p)(1-r)=$==빈칸== 이다.

## 해설
두 단계에서 각각 놓칠 확률은 서로 독립이니 곱으로 계산해요. $0.2\times0.5=0.1$, 즉 $10\%$예요.

**정답: $0.1$**

## 예시

