---
slug: anchors
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 규칙 · 트리 특화
title: Anchors: 이 조건만 지키면 예측이 안 바뀐다는 보증
related: TreeSHAP · LIME for Text
---

## 도입
Anchors는 조건절(predicate)의 곱으로 이루어진 규칙 $A$를 찾는다. 이 규칙이 정한 조건은 고정하고 나머지 특징은 데이터 분포에서 무작위로 채워 넣은 가상 샘플들의 분포 $D(z \mid A)$를 만든 다음 그 샘플들에 대해 원래 예측과 같은 결과가 나오는 비율(정밀도)을 측정한다.

$\mathrm{prec}(A) = \mathbb{E}_{D(z \mid A)}\big[\mathbb{1}(\hat f(z) = \hat f(x))\big] \ge \tau$

정밀도가 미리 정한 임계값 $\tau$(흔히 0.95) 이상인 규칙을 anchor로 채택한다. 정밀도를 정확히 계산하려면 무한히 많은 샘플이 필요하므로 실제로는 후보 규칙마다 정밀도 추정치의 신뢰구간을 좁혀가는 다중슬롯머신 알고리즘(KL-LUCB)을 써서 효율적으로 탐색한다. 조건절 하나짜리 규칙부터 시작해 빔서치처럼 조건을 하나씩 추가하며 규칙을 넓혀간다. 정밀도 조건을 만족하는 규칙 중에서는 더 많은 다른 샘플에도 적용되는(커버리지가 넓은) 규칙을 우선한다.

LIME 같은 국소 선형 근사는 그 근사가 어디까지 유효한지 경계를 알려주지 않는다는 한계가 있었다. 특징값을 조금만 더 멀리 움직여도 선형 근사가 맞는지 틀리는지 알 도리가 없다. Anchors는 아예 대리모델로 근사하는 대신 원래 블랙박스 모델의 실제 출력에 대해 직접 정밀도를 측정하기 때문에 "이 조건 안에서는 예측이 이 정도 확률로 보장된다"는 명시적이고 정량화된 신뢰 범위를 제공한다는 점이 근본적으로 다르다.

## 명제


## 그림
<svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="240" x2="520" y2="240" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="60" y1="240" x2="60" y2="40" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="500" y="262" font-size="12" text-anchor="middle">소득</text>
<text x="30" y="40" font-size="12">신용점수</text>
<rect x="80" y="60" width="160" height="140" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<text x="160" y="52" font-size="11" text-anchor="middle">소득 &lt; 3000만 &amp; 신용점수 &lt; 600</text>
<circle cx="110" cy="90" r="6" class="dg-accent" stroke="none"/>
<circle cx="150" cy="120" r="6" class="dg-accent" stroke="none"/>
<circle cx="190" cy="80" r="6" class="dg-accent" stroke="none"/>
<circle cx="130" cy="160" r="6" class="dg-accent" stroke="none"/>
<circle cx="210" cy="150" r="6" class="dg-accent" stroke="none"/>
<circle cx="170" cy="180" r="6" class="dg-dim" stroke="none"/>
<circle cx="300" cy="100" r="6" class="dg-accent" stroke="none"/>
<circle cx="350" cy="180" r="6" class="dg-dim" stroke="none"/>
<circle cx="400" cy="90" r="6" class="dg-dim" stroke="none"/>
<circle cx="450" cy="150" r="6" class="dg-accent" stroke="none"/>
<circle cx="320" cy="210" r="6" class="dg-dim" stroke="none"/>
<circle cx="330" cy="255" r="6" class="dg-accent" stroke="none"/>
<text x="345" y="259" font-size="11" text-anchor="start">예측 = 거절</text>
<circle cx="440" cy="255" r="6" class="dg-dim" stroke="none"/>
<text x="455" y="259" font-size="11" text-anchor="start">예측 = 승인</text>
</svg>

_점선 상자 안 조건을 만족하면 다른 값이 무엇이든 예측이 높은 확률로 거절로 유지된다._

## 문제
부등식 $k/n \ge \tau$의 양변에 $n$을 곱하면 $k \ge n\tau$가 된다. 그런데 $k$는 반드시 정수여야 하므로 이 부등식을 만족하는 최소값은 $k_{\min}=$ ==빈칸== 이다.

## 해설
정수 $k$가 $n\tau$ 이상이 되는 가장 작은 값은 올림함수로 구해지기 때문이에요.

**정답: $\lceil n\tau \rceil$**

## 예시
"소득 &lt; 3000만원이고 신용점수 &lt; 600점"이라는 anchor 후보를 이 조건에 맞춰 무작위로 채운 가상 신청자 50명에 대해 검증했더니 48명이 원래와 같은 거절 예측을 받았다. 정밀도는 $48/50=0.96$으로 목표 임계값 $\tau=0.95$를 넘기므로 이 규칙을 anchor로 채택할 수 있다.
