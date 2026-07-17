---
slug: coupling-layer-invertibility
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 커플링 레이어: 절반만 변환해서 야코비안을 삼각행렬로 만드는 트릭
related: 재매개변수화 트릭 · Diffusion 순방향 과정의 분산보존과 닫힌형 노이즈 주입
---

## 도입
change-of-variables-flow에서 본 변수변환 공식을 실제로 쓰려면 매 층마다 야코비안 행렬식을 계산해야 합니다. 일반적인 신경망 층에서 이 행렬식은 $n\times n$ 행렬의 행렬식이라 계산 비용이 매우 커집니다. 커플링 레이어는 입력의 절반은 그대로 두고 나머지 절반만 앞쪽 절반에 의존하는 함수로 변환합니다. 이 구조 하나만으로 역함수가 항상 존재하고 야코비안이 삼각행렬이 되어 행렬식이 대각성분의 곱으로 순식간에 계산됩니다.

## 명제
$x=(x_a,x_b)$를 분할하고 $y_a=x_a$, $y_b=x_b\odot\exp(s(x_a))+t(x_a)$ ($s,t$는 $x_a$만의 임의의 함수)라 하자. 이 변환은 항상 가역이며 야코비안 $dy/dx$는 블록삼각행렬이고 그 행렬식은 $\exp\left(\sum_i s_i(x_a)\right)$ 이다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="45" font-size="13">x_a</text>
<line x1="45" y1="40" x2="150" y2="40" class="dg-line" stroke-width="2"/>
<polygon points="150,40 140,35 140,45" class="dg-stroke-ink"/>
<text x="160" y="45" font-size="13">y_a = x_a (그대로)</text>
<text x="20" y="120" font-size="13">x_b</text>
<rect x="45" y="100" width="150" height="34" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="52" y="122" font-size="11">⊙exp(s(x_a))+t(x_a)</text>
<line x1="195" y1="117" x2="290" y2="117" class="dg-line" stroke-width="2"/>
<polygon points="290,117 280,112 280,122" class="dg-stroke-ink"/>
<text x="300" y="122" font-size="13">y_b</text>
<line x1="65" y1="60" x2="100" y2="100" class="dg-dim" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="65" y="80" font-size="10" class="dg-dim">s,t는 x_a로 결정됨</text>
<text x="420" y="30" font-size="12">야코비안 dy/dx (블록삼각)</text>
<rect x="400" y="45" width="90" height="70" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="445" y1="45" x2="445" y2="115" class="dg-line" stroke-width="1.5"/>
<line x1="400" y1="80" x2="490" y2="80" class="dg-line" stroke-width="1.5"/>
<text x="415" y="68" font-size="13">I</text>
<text x="460" y="68" font-size="13" class="dg-dim">0</text>
<rect x="400" y="80" width="45" height="35" class="dg-accent"/>
<text x="408" y="102" font-size="10">복잡, 0 아님</text>
<rect x="445" y="80" width="45" height="35" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<text x="450" y="102" font-size="9">diag(exp(s))</text>
<text x="400" y="145" font-size="12" class="dg-dim">오른쪽 위가 항상 0 → det = 1 × det(diag(exp(s)))</text>
</svg>

_xa는 그대로, xb만 xa에 의존해 변환되어 야코비안이 블록삼각행렬이 된다._

## 문제
역변환을 구하려면 출력 $y=(y_a,y_b)$만 가지고 입력 $x=(x_a,x_b)$를 되찾아야 한다. 첫 번째 절반은 변환에서 아무 것도 하지 않았으므로 정의를 그대로 뒤집으면 곧바로 답이 나온다. $x_a = $==빈칸== 이다.

## 해설
$y_a=x_a$라는 정의 자체가 이미 항등변환이다. 그러니 $y_a$를 관찰하는 순간 $x_a$가 무엇인지 별도의 계산 없이 바로 알 수 있다.

**정답: $y_a$**

## 예시
추상적인 블록행렬을 보기 전에 3차원 벡터 하나로 커플링 레이어가 실제로 역변환되고 야코비안이 정말 삼각행렬이 되는지 확인해봅니다. $x_a=x_1$ 하나만 앞쪽에 두고 $x_b=(x_2,x_3)$를 뒤쪽에 둡니다. $s(x_1)=(0.1x_1,-0.2x_1)$, $t(x_1)=(0.5x_1,1.0x_1)$이라 하고 $x=(2,1,3)$을 넣습니다.

$s(2)=(0.2,-0.4)$이므로 $\exp(s(2))\approx(1.221403,0.670320)$이고 $t(2)=(1.0,2.0)$입니다.
$$y_1=2,\qquad y_2=1\times1.221403+1.0=2.221403,\qquad y_3=3\times0.670320+2.0=4.010961$$
역변환을 확인합니다. $y_1=2$이므로 곧바로 $x_1=2$를 알 수 있고 이 값으로 $s(x_1),t(x_1)$을 다시 계산하면 방금 쓴 것과 똑같은 상수가 됩니다.
$$x_2=\frac{y_2-1.0}{1.221403}=\frac{1.221403}{1.221403}=1,\qquad x_3=\frac{y_3-2.0}{0.670320}=\frac{2.010961}{0.670320}=3$$
원래 $x=(2,1,3)$이 정확히 복원됩니다. 이제 이 변환의 야코비안을 $x_1=2$에서 직접 계산합니다.
$$\frac{dy}{dx}=\begin{pmatrix}1&0&0\\0.622140&1.221403&0\\0.597808&0&0.670320\end{pmatrix}$$
오른쪽 위 두 성분이 정확히 0이라 아래쪽 삼각형 모양입니다. 행렬식은 대각성분만 곱하면 됩니다.
$$\det\frac{dy}{dx}=1\times1.221403\times0.670320\approx0.818731$$
이 값은 $\exp(s_1(x_1)+s_2(x_1))=\exp(0.2-0.4)=\exp(-0.2)\approx0.818731$과 정확히 같습니다. 아래 증명은 이 삼각구조와 행렬식 공식이 이 숫자쌍에서만 맞는 것이 아니라 $s,t$가 어떤 신경망이든 항상 성립함을 보입니다.
