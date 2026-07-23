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
GPU 한 대는 자신이 맡은 스테이지에서 마이크로배치가 지나갈 때마다 정확히 $t$만큼 실제로 계산을 수행한다. 마이크로배치는 총 $m$개이므로 이 GPU가 실제로 일하는 시간의 총합은 ==빈칸== 이다.

## 해설
마이크로배치 하나당 이 GPU를 지나가는 데 t가 걸리고 마이크로배치가 총 m개이므로 t를 m번 더한 것과 같아요.

**정답: $mt$**

## 예시

