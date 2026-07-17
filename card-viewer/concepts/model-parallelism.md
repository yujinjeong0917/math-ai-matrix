---
slug: model-parallelism
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 분산학습
title: 모델 병렬: 모델 자체를 여러 장비에 나눠 담기
related: 데이터 병렬 · ZeRO
---

## 도입
모델 병렬은 크게 두 방식으로 나뉩니다. 파이프라인 병렬은 모델을 층 단위로 잘라 GPU마다 몇 개 층씩 맡기는 방식입니다. 입력이 GPU1의 층을 통과하면 그 출력이 GPU2로 넘어가 다음 층을 통과하는 식으로 이어집니다. 텐서 병렬은 층 하나를 자르는 대신 층 안의 행렬 연산 자체를 여러 GPU에 나눠 각자 일부 계산을 맡고 결과를 합칩니다. Megatron-LM이 트랜스포머의 어텐션과 피드포워드 행렬을 이렇게 쪼갠 대표 사례입니다.

파이프라인 병렬의 약점은 유휴 시간입니다. GPU2는 GPU1의 출력이 도착할 때까지 기다려야 하고 역전파도 같은 순서를 거꾸로 거쳐야 하므로 앞뒤 GPU가 서로를 기다리는 구간이 생깁니다. 이를 파이프라인 버블이라 부릅니다. 배치를 여러 개의 작은 마이크로배치로 쪼개 GPU들이 최대한 겹쳐서 일하게 만드는 것이 이 버블을 줄이는 핵심 기법입니다.

데이터 병렬과 모델 병렬은 풀고자 하는 문제가 다릅니다. 데이터 병렬은 모델은 한 GPU에 들어가지만 학습을 더 빠르게 하고 싶을 때 쓰고 모델 병렬은 모델 자체가 한 GPU에 안 들어갈 때 씁니다. 실제로 대형 모델을 학습할 때는 두 방식을 함께 씁니다. 모델을 여러 GPU 그룹으로 병렬 분할하고 그 그룹을 다시 데이터 병렬로 복제하는 식으로 조합해 GPU 수백 장 규모까지 확장합니다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="70" width="160" height="80" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="110" y="100" text-anchor="middle" font-size="13">GPU 1</text>
<text x="110" y="122" text-anchor="middle" font-size="12" class="dg-dim">층 1, 2</text>
<rect x="240" y="70" width="160" height="80" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="320" y="100" text-anchor="middle" font-size="13">GPU 2</text>
<text x="320" y="122" text-anchor="middle" font-size="12" class="dg-dim">층 3, 4</text>
<rect x="450" y="70" width="160" height="80" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="530" y="100" text-anchor="middle" font-size="13">GPU 3</text>
<text x="530" y="122" text-anchor="middle" font-size="12" class="dg-dim">층 5, 6</text>
<line x1="190" y1="110" x2="240" y2="110" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="240,110 228,104 228,116" class="dg-accent"/>
<line x1="400" y1="110" x2="450" y2="110" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="450,110 438,104 438,116" class="dg-accent"/>
<text x="215" y="95" text-anchor="middle" font-size="11" class="dg-dim">중간 결과</text>
<text x="425" y="95" text-anchor="middle" font-size="11" class="dg-dim">중간 결과</text>
</svg>

_모델을 층 단위로 나눠 GPU마다 일부 층만 맡고 중간 결과를 다음 GPU로 넘깁니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
모델이 너무 커서 GPU 한 장의 메모리에 다 올라가지 않는 경우가 있습니다. 데이터 병렬은 모델을 GPU마다 통째로 복사하는 방식이라 이 문제를 풀지 못합니다. 모델 병렬은 발상을 바꿔서 모델 자체를 여러 장비에 나눠 담습니다. 한 GPU는 모델의 앞부분만, 다른 GPU는 뒷부분만 갖고 있는 식입니다.

대신 GPU끼리 계산 중간 결과를 주고받아야 합니다. 앞 GPU가 계산을 끝내야 뒤 GPU가 이어받을 수 있기 때문에 GPU 사이의 통신과 대기 시간을 얼마나 줄이느냐가 관건이 됩니다.


## 예시

