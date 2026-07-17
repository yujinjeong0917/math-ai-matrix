---
slug: efficientnet
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: CNN 백본 계보
title: EfficientNet: 깊이·너비·해상도의 동시 스케일링
related: ResNet · LeNet/AlexNet
---

## 도입
신경망의 용량을 키우는 세 축은 층 수를 늘리는 깊이, 채널 수를 늘리는 너비, 입력 이미지 크기를 키우는 해상도다. 기존 연구들은 대개 이 중 한 축만 키우면서 나머지는 그대로 두는 식으로 스케일업을 했다.

EfficientNet은 이 세 축을 하나의 계수 $\phi$로 함께 조절하는 복합 스케일링을 제안한다. 깊이는 $d=\alpha^\phi$, 너비는 $w=\beta^\phi$, 해상도는 $r=\gamma^\phi$로 늘리고 이때 $\alpha\cdot\beta^2\cdot\gamma^2\approx2$이며 $\alpha,\beta,\gamma\ge1$이라는 제약을 둔다. 너비와 해상도에 제곱이 붙는 이유는 너비를 늘리면 채널 방향으로, 해상도를 늘리면 가로세로 두 방향으로 연산량이 늘어나기 때문에 전체 연산량이 대략 $2^\phi$배가 되도록 맞춘 것이다.

먼저 작은 기준 모델에서 그리드서치로 $\alpha,\beta,\gamma$의 최적 비율을 한 번 찾아두면 이후에는 $\phi$ 값만 바꿔서 EfficientNet B0부터 B7까지 크기가 다른 모델들을 일관된 비율로 만들어낼 수 있다. 그 결과 비슷한 연산량 대비 정확도가 당시 다른 CNN들보다 크게 앞섰다.

## 명제


## 그림
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="120" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
      <text x="45" y="200" font-size="12">기본 모델</text>
      <line x1="130" y1="150" x2="220" y2="150" class="dg-line" stroke-width="1.5" />
      <text x="150" y="140" class="dg-dim" font-size="12">φ</text>
      <rect x="230" y="40" width="220" height="150" fill="none" class="dg-stroke-accent" stroke-width="2" />
      <line x1="230" y1="90" x2="450" y2="90" class="dg-line" stroke-width="1" />
      <line x1="230" y1="140" x2="450" y2="140" class="dg-line" stroke-width="1" />
      <line x1="300" y1="40" x2="300" y2="190" class="dg-line" stroke-width="1" />
      <line x1="370" y1="40" x2="370" y2="190" class="dg-line" stroke-width="1" />
      <text x="250" y="28" font-size="12">너비 w=β^φ</text>
      <text x="455" y="120" font-size="12">깊이 d=α^φ</text>
      <text x="230" y="207" font-size="12">해상도 r=γ^φ</text>
    </svg>

_세 축을 정해진 비율로 함께 키우는 복합 스케일링을 도식화했습니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
신경망을 더 좋은 성능으로 키우고 싶을 때 흔히 층을 더 깊게 쌓거나 채널을 더 넓히거나 입력 이미지 해상도를 더 키우는 세 가지 방법 중 하나를 쓴다. 문제는 이 셋 중 하나만 계속 키우면 금방 성능 향상이 둔해지고 계산량만 낭비하게 된다는 점이다.

EfficientNet은 셋 중 하나만 고르는 대신 세 가지를 정해진 비율로 함께 키운다. 사진을 확대할 때 가로와 세로를 같은 비율로 늘려야 비율이 깨지지 않듯이 깊이 너비 해상도를 균형 잡힌 비율로 동시에 늘리면 같은 연산량으로 훨씬 더 좋은 성능을 얻을 수 있다는 것을 보여준 모델이다.


## 예시
$\alpha=1.2$, $\beta=1.1$, $\gamma=1.15$인 기준 비율에서 $\phi=1$을 쓰면 깊이는 $1.2$배, 너비는 $1.1$배, 해상도는 $1.15$배로 함께 늘어난다.

이때 연산량 배수는 $\alpha\cdot\beta^2\cdot\gamma^2 \approx 1.2\times1.21\times1.32 \approx 1.92$로 목표한 $2$배 근처에 맞춰진다. $\phi$를 2, 3으로 올리면 세 값이 함께 지수적으로 커지면서 더 큰 모델이 같은 비율로 만들어진다.
