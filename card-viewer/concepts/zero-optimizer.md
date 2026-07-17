---
slug: zero-optimizer
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 분산학습
title: ZeRO: 옵티마이저 상태와 그래디언트도 나눠 저장하기
related: 데이터 병렬 · 모델 병렬
---

## 도입
혼합정밀도로 Adam을 쓰는 일반적인 데이터 병렬 학습에서 파라미터 수가 $\Psi$개라면 GPU 한 장이 들고 있어야 하는 메모리는 대략 $16\Psi$바이트입니다. fp16 파라미터와 그래디언트가 각각 $2\Psi$바이트, 옵티마이저가 들고 있는 fp32 파라미터 사본과 모멘텀과 분산이 각각 $4\Psi$바이트씩이라 합이 $16\Psi$가 됩니다. 이 전체를 GPU마다 그대로 복제하는 것이 표준 데이터 병렬입니다.

ZeRO는 이 메모리를 세 단계로 나눠 GPU $N_d$대에 분산시킵니다. 1단계($P_{os}$)는 옵티마이저 상태만 나눠 GPU당 메모리가 대략 $4\Psi + 12\Psi/N_d$로 줄어들어 $N_d$가 커질수록 4배 절감에 가까워집니다. 2단계($P_{os+g}$)는 그래디언트까지 나눠 $2\Psi + 14\Psi/N_d$가 되어 8배 절감에 가까워집니다. 3단계($P_{os+g+p}$)는 파라미터 자체도 나눠 GPU당 메모리가 $16\Psi/N_d$로 GPU 수에 정비례해서 줄어듭니다.

파라미터를 나눠 가진 상태로도 순전파와 역전파는 문제없이 돌아갑니다. 특정 층을 계산할 차례가 되면 그 층을 갖고 있는 GPU가 나머지 GPU에 잠깐 파라미터를 뿌려주고(all-gather) 계산이 끝나면 다시 지워버립니다. 통신량은 늘지만 GPU마다 항상 전체 파라미터를 들고 있을 필요는 없어집니다. 결과적으로 데이터 병렬과 같은 학습 로직을 유지하면서도 GPU 수를 늘릴수록 GPU 한 장에 필요한 메모리는 계속 줄어드는 구조를 얻습니다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="220" x2="600" y2="220" class="dg-line" stroke-width="1.5"/>
<rect x="80" y="60" width="80" height="160" class="dg-dim"/>
<rect x="220" y="165" width="80" height="55" class="dg-accent"/>
<rect x="360" y="182" width="80" height="38" class="dg-accent"/>
<rect x="500" y="200" width="80" height="20" class="dg-accent"/>
<text x="120" y="50" text-anchor="middle" font-size="12">16Ψ</text>
<text x="260" y="155" text-anchor="middle" font-size="12">4Ψ + 12Ψ/N</text>
<text x="400" y="172" text-anchor="middle" font-size="12">2Ψ + 14Ψ/N</text>
<text x="540" y="190" text-anchor="middle" font-size="12">16Ψ/N</text>
<text x="120" y="238" text-anchor="middle" font-size="12">기본 DP</text>
<text x="260" y="238" text-anchor="middle" font-size="12">1단계</text>
<text x="400" y="238" text-anchor="middle" font-size="12">2단계</text>
<text x="540" y="238" text-anchor="middle" font-size="12">3단계</text>
</svg>

_단계가 올라갈수록 옵티마이저 상태, 그래디언트, 파라미터까지 차례로 GPU에 나눠 저장합니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
데이터 병렬은 GPU마다 모델과 그래디언트뿐 아니라 옵티마이저 상태까지 통째로 복제합니다. Adam처럼 파라미터마다 모멘텀과 분산을 따로 저장하는 옵티마이저는 이 상태만으로도 모델 파라미터 자체보다 메모리를 더 많이 잡아먹습니다. GPU 8장이 있어도 각 GPU가 같은 옵티마이저 상태를 8번 중복해서 들고 있는 셈이니 메모리가 낭비됩니다.

ZeRO는 이 중복을 없앱니다. 옵티마이저 상태와 그래디언트, 필요하면 파라미터까지 GPU마다 일부씩만 나눠 갖게 하고 계산이 필요한 순간에만 잠깐 모아 씁니다. 데이터 병렬처럼 동작하면서도 메모리는 모델 병렬에 가깝게 아낍니다.


## 예시
파라미터 70억 개짜리 모델을 생각해보면 $\Psi = 7 \times 10^9$이므로 표준 데이터 병렬에서는 GPU 한 장에 $16\Psi \approx 112$GB가 필요합니다. 80GB급 GPU 한 장에는 애초에 다 올라가지 않습니다. GPU 8장으로 ZeRO 3단계를 쓰면 GPU당 메모리는 대략 $16\Psi / 8 \approx 14$GB로 줄어들어 같은 모델을 여유 있게 올릴 수 있습니다.
