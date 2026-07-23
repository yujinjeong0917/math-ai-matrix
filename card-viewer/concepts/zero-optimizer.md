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
먼저 이 세 그룹을 하나도 나누지 않고 GPU마다 전부 복제하는 표준 데이터 병렬의 경우를 확인해보자. GPU 한 장이 들고 있는 메모리는 fp16 파라미터 $2\Psi$, fp16 그래디언트 $2\Psi$, 옵티마이저 상태 $12\Psi$를 모두 더한 ==빈칸== 이다.

## 해설
2Ψ+2Ψ+12Ψ를 그대로 더하면 16Ψ가 돼요. 이것이 ZeRO를 적용하기 전 표준 데이터 병렬의 GPU당 메모리예요.

**정답: $16\Psi$**

## 예시
파라미터 70억 개짜리 모델을 생각해보면 $\Psi = 7 \times 10^9$이므로 표준 데이터 병렬에서는 GPU 한 장에 $16\Psi \approx 112$GB가 필요합니다. 80GB급 GPU 한 장에는 애초에 다 올라가지 않습니다. GPU 8장으로 ZeRO 3단계를 쓰면 GPU당 메모리는 대략 $16\Psi / 8 \approx 14$GB로 줄어들어 같은 모델을 여유 있게 올릴 수 있습니다.
