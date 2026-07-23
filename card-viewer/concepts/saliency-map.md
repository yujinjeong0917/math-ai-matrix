---
slug: saliency-map
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 그래디언트 기반
title: Saliency Map: 입력에 대한 출력의 그래디언트
related: 선형모델 계수 · Integrated Gradients · Grad-CAM
---

## 도입
목표 클래스의 점수 $y_c$를 입력 $x$로 미분한 값 $S_i = \partial y_c / \partial x_i$가 saliency 값이다. 역전파를 한 번만 돌리면 모든 입력 성분에 대한 이 값을 동시에 얻을 수 있어서 계산 비용이 매우 낮다.

그런데 그래디언트는 지금 서 있는 그 점에서의 순간 기울기일 뿐이다. ReLU가 음수 구간을 완전히 눌러버렸거나 활성화가 포화 구간에 들어간 경우 실제로는 그 입력이 중요한데도 그 지점에서의 기울기는 0에 가깝게 나올 수 있다. 이런 이유로 raw saliency map은 특징 없이 흩뿌려진 잡음처럼 보일 때가 많다.

이 문제를 완화하려고 입력에 작은 무작위 노이즈를 여러 번 더해 계산한 saliency를 평균 내는 SmoothGrad 같은 보정법이 나왔고 아예 그래디언트를 한 점이 아니라 경로 전체에서 적분하는 Integrated Gradients도 등장했다. Sanity Checks for Saliency Maps 연구는 일부 saliency map이 모델의 가중치를 무작위로 초기화해도 거의 똑같은 모양을 낸다는 사실을 보여 어떤 saliency 기법이 실제로 학습된 가중치를 반영하는지 검증해야 한다는 경고를 남겼다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="80" width="110" height="90" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="85" y="60" font-size="13" text-anchor="middle">입력 x</text>
<line x1="140" y1="125" x2="190" y2="125" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="190,120 202,125 190,130" class="dg-dim" stroke="none"/>
<rect x="205" y="80" width="130" height="90" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="270" y="60" font-size="13" text-anchor="middle">모델 f</text>
<text x="270" y="130" font-size="12" class="dg-dim" text-anchor="middle">순전파</text>
<line x1="335" y1="125" x2="385" y2="125" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="385,120 397,125 385,130" class="dg-dim" stroke="none"/>
<rect x="400" y="100" width="90" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="445" y="80" font-size="13" text-anchor="middle">출력 y_c</text>
<path d="M400,160 C300,220 180,220 90,175" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<polygon points="90,175 100,168 96,180" class="dg-accent" stroke="none"/>
<text x="245" y="235" font-size="13" text-anchor="middle">역전파로 계산한 ∂y_c/∂x</text>
<rect x="560" y="80" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="560" y="80" width="20" height="20" class="dg-accent"/>
<rect x="600" y="100" width="20" height="20" class="dg-accent"/>
<text x="590" y="160" font-size="12" text-anchor="middle" class="dg-dim">saliency map</text>
</svg>

_역전파로 얻은 출력의 입력에 대한 그래디언트를 이미지 위에 지도로 그린다._

## 문제
먼저 이 지점에서의 선형결합 값을 구하면 $z = w_1x_1+w_2x_2+b = 2(1)+(-3)(1)+(-5) = $==빈칸== 이다.

## 해설
주어진 숫자를 그대로 대입해서 계산하면 2-3-5=-6이 나와요.

**정답: $-6$**

## 예시
$y = 3x_1 + x_2^2$라는 단순한 함수가 있고 $x=(1,2)$에서 평가한다고 하자. $\partial y/\partial x_1 = 3$이고 $\partial y/\partial x_2 = 2x_2 = 4$이다. 이 점에서는 $x_2$ 방향의 민감도가 $x_1$ 방향보다 더 크므로 saliency map은 $x_2$에 해당하는 위치를 더 밝게 표시한다.
