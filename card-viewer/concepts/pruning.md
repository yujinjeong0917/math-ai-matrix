---
slug: pruning
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 모델 압축
title: 프루닝: 중요도 낮은 파라미터 잘라내기
related: 양자화 · 지식증류
---

## 도입
가장 단순한 기준은 크기 기반 프루닝입니다. 절댓값이 작은 가중치일수록 출력에 미치는 영향이 작다고 보고 임계값 이하인 가중치를 0으로 만듭니다. 한 번에 다 자르기보다는 조금씩 잘라내고 남은 가중치로 다시 미세조정을 거치는 과정을 반복하는 것이 일반적입니다. 한꺼번에 많이 자르면 성능이 크게 떨어지지만 자르고 재학습하는 과정을 반복하면 남은 가중치들이 빈자리를 메우며 성능을 상당 부분 회복합니다.

프루닝은 어떤 단위로 자르느냐에 따라 결과가 크게 달라집니다. 비구조적 프루닝은 개별 가중치 하나하나를 기준으로 골라내기 때문에 정확도는 잘 유지되지만 결과로 남는 것은 군데군데 구멍이 뚫린 희소 행렬입니다. 일반적인 GPU 연산은 이런 불규칙한 희소 패턴을 그대로는 빠르게 처리하지 못해 전용 하드웨어나 라이브러리가 없으면 속도 이득으로 이어지지 않을 수 있습니다. 구조적 프루닝은 채널이나 필터, 어텐션 헤드처럼 통째로 잘라도 되는 단위로 제거합니다. 정확도 손실은 비구조적 방식보다 클 수 있지만 잘라낸 만큼 행렬 크기 자체가 줄어들어 별도의 하드웨어 지원 없이도 실제 속도 향상으로 이어집니다.

양자화가 값 하나하나를 표현하는 정밀도를 낮추는 방법이라면 프루닝은 값 자체를 아예 없애는 방법입니다. 둘은 서로 다른 축에서 모델을 가볍게 만들기 때문에 실무에서는 프루닝으로 불필요한 파라미터를 먼저 제거하고 남은 파라미터를 양자화로 다시 압축하는 식으로 함께 적용하는 경우가 많습니다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<line x1="120" y1="60" x2="480" y2="60" class="dg-stroke-accent" stroke-width="2"/>
<line x1="120" y1="60" x2="480" y2="130" class="dg-stroke-accent" stroke-width="2"/>
<line x1="120" y1="60" x2="480" y2="200" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="120" y1="130" x2="480" y2="60" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="120" y1="130" x2="480" y2="130" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="120" y1="130" x2="480" y2="200" class="dg-stroke-accent" stroke-width="2"/>
<line x1="120" y1="200" x2="480" y2="60" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="120" y1="200" x2="480" y2="130" class="dg-stroke-accent" stroke-width="2"/>
<line x1="120" y1="200" x2="480" y2="200" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="120" cy="60" r="14" class="dg-dim"/>
<circle cx="120" cy="130" r="14" class="dg-dim"/>
<circle cx="120" cy="200" r="14" class="dg-dim"/>
<circle cx="480" cy="60" r="14" class="dg-dim"/>
<circle cx="480" cy="130" r="14" class="dg-dim"/>
<circle cx="480" cy="200" r="14" class="dg-dim"/>
<text x="120" y="225" text-anchor="middle" font-size="12">입력층</text>
<text x="480" y="225" text-anchor="middle" font-size="12">출력층</text>
<text x="300" y="30" text-anchor="middle" font-size="12">점선은 제거된 연결, 실선은 남은 연결</text>
</svg>

_중요도가 낮은 연결을 제거해도 남은 연결만으로 비슷한 출력을 낼 수 있습니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
학습이 끝난 모델을 들여다보면 결과에 거의 영향을 주지 않는 가중치가 상당히 많이 섞여 있습니다. 값이 0에 가깝거나 다른 가중치와 하는 일이 겹치는 경우입니다. 프루닝은 이런 중요도 낮은 가중치를 잘라내서 모델을 더 작고 빠르게 만드는 방법입니다. 나무의 불필요한 가지를 쳐내는 것과 같은 발상입니다.

중요한 점은 아무 가중치나 자르는 게 아니라 어떤 기준으로 중요도를 판단하고 얼마나 잘라도 성능이 크게 안 떨어지는지를 확인해가며 진행한다는 것입니다.


## 예시

