---
slug: integrated-gradients-text
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 어텐션 · 그래디언트 기반
title: Integrated Gradients(텍스트): 토큰 임베딩까지 경로적분 확장하기
related: Attention 설명의 한계 · LIME for Text
---

## 도입
기준 임베딩 $x'$(흔히 [PAD] 토큰의 임베딩이나 영벡터를 쓴다)에서 실제 임베딩 $x$까지 직선 경로를 따라가며 각 지점의 그래디언트를 적분한다.

$IG_i(x) = (x_i - x_i') \displaystyle\int_{0}^{1} \frac{\partial f\big(x' + \alpha (x-x')\big)}{\partial x_i}\, d\alpha$

실제 계산에서는 적분을 $m$단계의 리만 합으로 근사한다.

$IG_i(x) \approx (x_i - x_i') \cdot \dfrac{1}{m}\displaystyle\sum_{k=1}^{m} \frac{\partial f\big(x' + \frac{k}{m}(x-x')\big)}{\partial x_i}$

단일 지점의 그래디언트를 쓰는 Saliency Map은 계산이 가볍지만 포화 구간에서 중요한 특징을 놓치는 문제가 있었다. Integrated Gradients는 경로 전체의 그래디언트를 누적하기 때문에 중간에 포화 구간을 지나더라도 그 앞뒤 구간에서 쌓인 신호가 반영된다. 또한 모든 특징의 기여도 합이 $f(x)-f(x')$와 정확히 같아지는 완전성(completeness) 공리를 만족하는데 단순 그래디언트나 일부 다른 방법들은 이 성질을 보장하지 못한다.

텍스트에 적용할 때 특유의 문제도 있다. 임베딩은 벡터라서 차원별 기여도를 다시 단어 하나의 점수로 합치는 과정(합산이나 노름을 취하는 방식)이 필요하고 기준 임베딩을 무엇으로 잡느냐에 따라 결과가 꽤 달라진다. [PAD] 임베딩을 쓸지 영벡터를 쓸지에 따라 같은 문장도 다른 기여도가 나올 수 있다는 점은 이 방법의 실무적인 약점으로 꼽힌다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="140" x2="560" y2="140" class="dg-line" stroke-width="1.5"/>
<circle cx="60" cy="140" r="6" class="dg-dim" stroke="none"/>
<text x="60" y="118" font-size="12" text-anchor="middle">x'(기준)</text>
<text x="60" y="164" font-size="11" text-anchor="middle" class="dg-dim">α=0</text>
<circle cx="185" cy="140" r="4" class="dg-dim" stroke="none"/>
<text x="185" y="164" font-size="11" text-anchor="middle" class="dg-dim">α=0.25</text>
<circle cx="310" cy="140" r="4" class="dg-dim" stroke="none"/>
<text x="310" y="164" font-size="11" text-anchor="middle" class="dg-dim">α=0.5</text>
<circle cx="435" cy="140" r="4" class="dg-dim" stroke="none"/>
<text x="435" y="164" font-size="11" text-anchor="middle" class="dg-dim">α=0.75</text>
<circle cx="560" cy="140" r="6" class="dg-accent" stroke="none"/>
<text x="560" y="118" font-size="12" text-anchor="middle">x(실제)</text>
<text x="560" y="164" font-size="11" text-anchor="middle">α=1</text>
<rect x="179" y="114" width="12" height="16" class="dg-dim"/>
<rect x="304" y="106" width="12" height="24" class="dg-dim"/>
<rect x="429" y="98" width="12" height="32" class="dg-dim"/>
<rect x="554" y="90" width="12" height="40" class="dg-accent"/>
<text x="185" y="99" font-size="10" text-anchor="middle">0.10</text>
<text x="310" y="91" font-size="10" text-anchor="middle">0.15</text>
<text x="435" y="83" font-size="10" text-anchor="middle">0.20</text>
<text x="560" y="75" font-size="10" text-anchor="middle">0.25</text>
<rect x="140" y="180" width="360" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="320" y="200" font-size="12" text-anchor="middle">각 지점의 그래디언트를 적분해 토큰 기여도로 합산</text>
</svg>

_기준 임베딩부터 실제 임베딩까지 경로를 따라가며 그래디언트를 적분해 토큰 기여도를 계산한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
그래디언트는 지금 이 지점에서 입력을 아주 살짝 바꿨을 때 출력이 얼마나 민감하게 반응하는지만 알려준다. 그런데 모델이 이미 확신에 찬 상태(포화 구간)에 들어가 있으면 그 단어가 사실 결정에 결정적이었는데도 그 지점의 그래디언트는 0에 가깝게 나올 수 있다. 이미 다 반영된 근거는 국소적으로는 더 바꿀 필요가 없어 보이기 때문이다.

Integrated Gradients는 딱 한 지점의 그래디언트만 보는 대신 아무 정보도 없는 기준 상태에서 실제 입력까지 이어지는 경로를 따라가며 그래디언트를 계속 쌓아 올린다. 텍스트에서는 단어 자체가 이산적이라 경로를 단어 위에 그릴 수 없으므로 단어가 매핑되는 임베딩 벡터 위에 경로를 긋는다.


## 예시
토큰 "훌륭하다"의 임베딩 한 성분이 기준값 $x'_i=0$에서 실제값 $x_i=2.0$까지 이동한다고 하자. 경로를 4단계로 나눠 $\alpha=0.25,0.5,0.75,1$에서 그래디언트를 측정하면 각각 $0.10,0.15,0.20,0.25$가 나왔다. 평균 그래디언트는 $(0.10+0.15+0.20+0.25)/4=0.175$이므로 이 성분의 기여도는 $(2.0-0)\times 0.175=0.35$이다.
