---
slug: grad-cam
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 구조 특화 설명
title: Grad-CAM: 클래스별로 어디를 보고 판단했는가
related: Saliency Map · 정책 네트워크 CAM · GAN Dissection
---

## 도입
선택한 합성곱층의 채널별 특징맵을 $A^k$, 목표 클래스 점수를 $y_c$라 하자. 먼저 $y_c$를 $A^k$의 모든 위치로 미분한 뒤 공간 위치에 대해 평균 내 채널별 중요도를 구한다. $\alpha_k^c = \frac{1}{Z}\sum_i \sum_j \frac{\partial y_c}{\partial A^k_{ij}}$.

이 중요도로 채널들을 가중합하고 ReLU를 씌운다. $L^c_{Grad\text{-}CAM} = \mathrm{ReLU}\left(\sum_k \alpha_k^c A^k\right)$. ReLU를 쓰는 이유는 그 클래스를 밀어올리는 방향으로 기여하는 부분만 남기고 오히려 클래스를 억누르는 방향으로 기여하는 부분은 지도에서 제외하기 위해서다.

이렇게 나온 지도는 선택한 층의 해상도를 그대로 가지므로 보통 원본 이미지보다 훨씬 작다. 이를 원본 크기로 보간해서 확대한 뒤 이미지 위에 반투명하게 겹쳐 표시한다. 마지막 합성곱층을 주로 선택하는 이유는 그 층이 깊어서 클래스와 관련된 의미 있는 정보를 담고 있으면서도 완전연결층과 달리 아직 공간적 위치 정보를 유지하고 있기 때문이다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="30" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="30" y="30" width="30" height="30" class="dg-dim"/>
<rect x="60" y="60" width="30" height="30" class="dg-accent"/>
<text x="60" y="105" font-size="12" text-anchor="middle">채널 1, α₁=0.7</text>
<rect x="30" y="130" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="30" y="130" width="30" height="30" class="dg-accent"/>
<rect x="60" y="160" width="30" height="30" class="dg-dim"/>
<text x="60" y="205" font-size="12" text-anchor="middle">채널 2, α₂=0.2</text>
<line x1="95" y1="60" x2="230" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="95" y1="160" x2="230" y2="140" class="dg-line" stroke-width="1.5"/>
<text x="260" y="120" font-size="12" text-anchor="middle">Σ αₖAᵏ</text>
<text x="260" y="140" font-size="12" text-anchor="middle">ReLU</text>
<line x1="290" y1="130" x2="360" y2="130" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="360,125 372,130 360,135" class="dg-dim" stroke="none"/>
<rect x="380" y="60" width="140" height="140" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="450" cy="130" r="45" class="dg-accent" stroke="none"/>
<text x="450" y="220" font-size="13" text-anchor="middle">클래스 c에 대한 활성화맵</text>
</svg>

_채널별 그래디언트로 중요도를 구하고 가중합한 뒤 ReLU를 씌워 클래스별 활성화맵을 만든다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
픽셀 하나하나의 그래디언트를 보는 saliency map은 점처럼 흩어진 잡음이 많아 읽기 어렵다. Grad-CAM은 더 거친 대신 훨씬 안정적인 단위에서 질문을 던진다. CNN의 마지막 합성곱층에는 여러 채널이 있고 각 채널은 이미지의 특정 위치에서 어떤 학습된 패턴이 나타나는지를 공간적으로 표시한 지도다. Grad-CAM은 지금 관심 있는 클래스에 대해 각 채널이 얼마나 중요한지를 재고 그 중요도로 채널들을 가중합해 하나의 지도로 합친다.

이렇게 만든 지도는 위치 정보를 예측하도록 따로 학습된 적이 없는 일반 분류 모델에서도 물체의 위치를 어느 정도 짚어낸다는 점이 놀라운 부분이다. 또한 Grad-CAM은 클래스에 따라 결과가 달라진다. 개와 고양이가 함께 있는 사진에서 개 클래스에 대한 지도는 개가 있는 자리를, 고양이 클래스에 대한 지도는 고양이가 있는 자리를 밝힌다. 단순히 눈에 띄는 영역을 표시하는 게 아니라 그 클래스를 지지하는 영역을 표시한다는 뜻이다.


## 예시
2×2 크기의 특징맵을 가진 채널이 두 개 있고 채널 1의 중요도가 $\alpha_1=0.7$, 채널 2의 중요도가 $\alpha_2=0.2$라고 하자. 채널 1의 왼쪽 위 값이 5, 채널 2의 같은 위치 값이 2라면 그 위치의 가중합은 $0.7 \times 5 + 0.2 \times 2 = 3.9$이고 이 값이 양수이므로 ReLU를 통과해 그대로 활성화맵에 남는다. 만약 가중합이 음수로 나온 위치가 있다면 ReLU가 그 위치를 0으로 눌러 지도에서 사라진다.
