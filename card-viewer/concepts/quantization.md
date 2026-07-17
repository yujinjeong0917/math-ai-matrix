---
slug: quantization
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 모델 압축
title: 양자화: 가중치 정밀도를 낮춰 가볍게 만들기
related: 프루닝 · 지식증류
---

## 도입
양자화는 연속적인 실수 값을 정해진 간격의 정수 값으로 매핑합니다. 실수 범위를 스케일 $s$와 영점 $z$로 나눠 정수 $q = \mathrm{round}(x/s) + z$로 변환하고 다시 쓸 때는 $x \approx s(q - z)$로 되돌립니다. 값의 범위를 텐서 전체에 대해 하나로 잡을 수도 있고(퍼텐서) 채널마다 따로 잡을 수도 있는데(퍼채널) 채널별로 나누면 값의 분포가 채널마다 다를 때 정밀도 손실을 줄일 수 있습니다.

비트수를 줄이면 메모리는 그 비율만큼 정확히 줄어듭니다. 32비트를 8비트로 낮추면 $32/8=4$배, 4비트로 낮추면 8배 절감됩니다. 16비트에서 8비트로만 낮춰도 2배가 줄어듭니다. 계산 속도도 함께 빨라지는데 저비트 정수 연산을 지원하는 하드웨어에서는 같은 시간에 더 많은 연산을 처리할 수 있기 때문입니다.

양자화 방식은 크게 두 가지입니다. 학습이 끝난 모델을 사후에 양자화하는 방식(post-training quantization)은 빠르고 간단하지만 정밀도 손실이 클 수 있습니다. 학습 과정 자체에 양자화를 흉내 낸 연산을 끼워 넣어 모델이 낮은 정밀도에 적응하도록 학습하는 방식(quantization-aware training)은 추가 학습이 필요하지만 정확도 손실을 더 줄일 수 있습니다. 값의 분포에 극단적으로 크거나 작은 이상치가 섞여 있으면 양자화 구간이 그 이상치에 맞춰 넓어져 나머지 값들의 정밀도가 오히려 나빠지는 문제가 있어 이상치를 따로 다루는 기법들도 함께 쓰입니다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="60" x2="600" y2="60" class="dg-line" stroke-width="1.5"/>
<circle cx="100" cy="60" r="5" class="dg-dim"/>
<circle cx="150" cy="60" r="5" class="dg-dim"/>
<circle cx="210" cy="60" r="5" class="dg-dim"/>
<circle cx="280" cy="60" r="5" class="dg-dim"/>
<circle cx="330" cy="60" r="5" class="dg-dim"/>
<circle cx="400" cy="60" r="5" class="dg-dim"/>
<circle cx="460" cy="60" r="5" class="dg-dim"/>
<circle cx="520" cy="60" r="5" class="dg-dim"/>
<circle cx="560" cy="60" r="5" class="dg-dim"/>
<text x="60" y="40" font-size="12">FP32 원본 값(촘촘한 실수)</text>
<line x1="60" y1="170" x2="600" y2="170" class="dg-stroke-ink" stroke-width="2"/>
<line x1="150" y1="160" x2="150" y2="180" class="dg-stroke-accent" stroke-width="2"/>
<line x1="330" y1="160" x2="330" y2="180" class="dg-stroke-accent" stroke-width="2"/>
<line x1="520" y1="160" x2="520" y2="180" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="150" cy="170" r="6" class="dg-accent"/>
<circle cx="330" cy="170" r="6" class="dg-accent"/>
<circle cx="520" cy="170" r="6" class="dg-accent"/>
<text x="60" y="200" font-size="12">INT8 양자화 값(정해진 구간)</text>
<line x1="100" y1="65" x2="150" y2="160" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="210" y1="65" x2="150" y2="160" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="280" y1="65" x2="330" y2="160" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="400" y1="65" x2="330" y2="160" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="460" y1="65" x2="520" y2="160" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="560" y1="65" x2="520" y2="160" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
</svg>

_촘촘한 실수 값들을 정해진 간격의 정수 구간으로 반올림해 표현합니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
모델 가중치는 보통 32비트 부동소수점으로 저장됩니다. 값 하나하나를 아주 세밀하게 표현할 수 있지만 그만큼 메모리도 많이 차지하고 계산할 때도 비트 수만큼 자원을 씁니다. 그런데 추론 단계에서는 가중치를 그렇게까지 세밀하게 표현하지 않아도 결과가 크게 달라지지 않는 경우가 많습니다. 양자화는 가중치를 더 적은 비트수로 표현해 모델을 가볍게 만드는 방법입니다.

비유하자면 소수점 아래 여섯 자리까지 정확히 재던 값을 소수점 아래 한두 자리로 반올림해 쓰는 것과 비슷합니다. 정밀도는 조금 떨어지지만 저장 공간과 계산량은 크게 줄어듭니다.


## 예시
파라미터 70억 개짜리 모델을 FP32로 저장하면 $7 \times 10^9 \times 4$바이트, 즉 약 28GB가 필요합니다. INT8로 양자화하면 $7 \times 10^9 \times 1$바이트, 즉 약 7GB로 줄어들어 정확히 4분의 1이 됩니다. GPU 메모리가 부족해 못 올리던 모델이 양자화 이후에는 올라가는 경우가 흔한 이유입니다.
