---
slug: svm-margin
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: SVM 서포트 벡터 마진의 폭 2/‖w‖
related: 
---

## 도입
SVM은 두 클래스를 가르는 초평면 $w^Tx+b=0$을 찾을 때 아무 초평면이나 고르지 않습니다. 가장 가까운 데이터까지의 거리, 즉 마진이 최대가 되는 초평면을 고릅니다. 정규화된 형태에서는 가장 가까운 양성 데이터와 음성 데이터가 각각 $w^Tx+b=1$과 $w^Tx+b=-1$이라는 두 평행한 지지 초평면 위에 놓이도록 스케일을 맞춥니다. 이 두 지지 초평면 사이의 수직거리가 정확히 $2/\|w\|$라는 것이 마진 최대화 문제 전체의 출발점입니다.

## 명제
두 지지 초평면 $w^Tx+b=1$과 $w^Tx+b=-1$ 사이의 수직거리는 $2/\|w\|$이다.

## 그림
<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="230" x2="420" y2="50" class="dg-stroke-ink" stroke-width="2.5"/>
<line x1="73" y1="257" x2="433" y2="77" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="47" y1="203" x2="407" y2="23" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<circle cx="180" cy="240" r="7" class="dg-accent"/>
<circle cx="260" cy="215" r="7" class="dg-accent"/>
<circle cx="340" cy="175" r="7" class="dg-accent"/>
<circle cx="253" cy="167" r="7" class="dg-accent"/>
<circle cx="253" cy="167" r="12" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<rect x="134" y="134" width="14" height="14" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="214" y="84" width="14" height="14" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="304" y="54" width="14" height="14" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="220" y="106" width="14" height="14" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="227" cy="113" r="12" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="240" y1="140" x2="262" y2="185" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="262,185 250,178 256,192" class="dg-accent"/>
<text x="266" y="182" font-size="12">w</text>
<line x1="299" y1="77" x2="325" y2="131" class="dg-line" stroke-width="1.5"/>
<polygon points="299,77 305,88 292,86" class="dg-dim"/>
<polygon points="325,131 319,120 332,122" class="dg-dim"/>
<text x="335" y="105" font-size="12">마진 = 2/‖w‖</text>
<text x="330" y="95" font-size="11" class="dg-dim">wᵀx+b=+1</text>
<text x="270" y="45" font-size="11" class="dg-dim">wᵀx+b=-1</text>
</svg>

_서포트 벡터(테두리로 표시)가 놓인 두 지지 초평면 사이의 수직거리가 마진이며, 그 폭은 정확히 2/‖w‖다._

## 문제
이제 $t$의 값을 구하기 위해 $w^T(x_+-x_-)$를 두 가지 방법으로 계산해서 비교한다. 먼저 $x_+,x_-$가 각각 놓인 평면의 정의를 그대로 쓴다. $x_+$는 $w^Tx_++b=1$을 만족하고 $x_-$는 $w^Tx_-+b=-1$을 만족한다. 두 식을 빼면 $w^T(x_+-x_-) = (1-b)-(-1-b) = $==빈칸== 이다.

## 해설
$(1-b)-(-1-b) = 1-b+1+b$이고 $b$가 서로 상쇄되어 2만 남는다. 두 지지 평면의 절편 차이인 $1-(-1)=2$가 그대로 반영된 것이다.

**정답: $2$**

## 예시
마진의 폭이 정말 $2/\|w\|$인지 추상적인 논증 전에 좌표를 직접 찍어서 확인해봅니다.

$w=(3,4)$, $b=0$이라 합니다. $\|w\|=\sqrt{9+16}=5$입니다. $w$ 방향을 따라 원점에서 움직인 점 중 $w^Tx=1$을 만족하는 점은 $x_+=w/\|w\|^2=(3,4)/25=(0.12,0.16)$입니다. 실제로 $w^Tx_+=3\times0.12+4\times0.16=0.36+0.64=1$이 맞습니다.

같은 방식으로 $w^Tx=-1$을 만족하는 점은 $x_-=-w/25=(-0.12,-0.16)$입니다.

두 점 사이의 거리는 $\|x_+-x_-\|=\|(0.24,0.32)\|=\sqrt{0.0576+0.1024}=\sqrt{0.16}=0.4$입니다. 이 값은 정확히 $2/\|w\|=2/5=0.4$와 일치합니다.

좌표를 직접 찍어 재본 거리가 공식과 정확히 맞아떨어졌습니다. 아래 증명은 이 일치가 이 특정 $w$만의 우연이 아니라 임의의 $w,b$에서 항상 성립함을 보입니다.
