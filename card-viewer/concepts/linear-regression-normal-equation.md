---
slug: linear-regression-normal-equation
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 선형회귀 정규방정식의 유도
related: 
---

## 도입
데이터에 가장 잘 맞는 직선 하나를 긋고 싶습니다. 여러 특징이 있는 경우라면 초평면이 됩니다. 잘 맞는다는 말은 예측값과 실제값의 차이를 최대한 작게 만든다는 뜻입니다. 그 차이를 제곱해서 전부 더한 값을 최소로 만드는 계수를 한 번에 계산하는 공식이 정규방정식입니다. 별도의 반복 학습 없이도 답이 정확히 나온다는 점이 이 공식의 매력입니다.

## 명제
설계행렬 $X\in\mathbb{R}^{n\times d}$와 목표값 $y\in\mathbb{R}^n$에 대해 $J(\beta)=\|X\beta-y\|^2$를 최소화하는 $\beta$는 $\beta=(X^TX)^{-1}X^Ty$이다.

## 그림
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="220" x2="330" y2="220" class="dg-line" stroke-width="1"/>
<line x1="40" y1="20" x2="40" y2="220" class="dg-line" stroke-width="1"/>
<line x1="75" y1="184" x2="285" y2="36" class="dg-stroke-ink" stroke-width="2"/>
<text x="290" y="32" font-size="12">Xβ (최적 직선)</text>
<circle cx="110" cy="154" r="5" class="dg-accent"/>
<circle cx="180" cy="121" r="5" class="dg-accent"/>
<circle cx="250" cy="55" r="5" class="dg-accent"/>
<line x1="110" y1="154" x2="110" y2="159.5" class="dg-line" stroke-width="2" stroke-dasharray="4,2"/>
<line x1="180" y1="110" x2="180" y2="121" class="dg-line" stroke-width="2" stroke-dasharray="4,2"/>
<line x1="250" y1="55" x2="250" y2="60.5" class="dg-line" stroke-width="2" stroke-dasharray="4,2"/>
<text x="55" y="200" font-size="11" class="dg-dim">y</text>
<text x="315" y="215" font-size="11" class="dg-dim">x</text>
<text x="60" y="45" font-size="11" class="dg-dim">각 점에서 직선까지의 수직 잔차(y-Xβ)</text>
</svg>

_정규방정식이 찾는 직선은 각 데이터점의 수직 잔차 제곱합을 가장 작게 만드는 직선이다._

## 문제
이 노름의 제곱을 그대로는 미분하기 어렵다. 미분하려면 내적으로 풀어써야 한다. 노름의 제곱은 자기 자신과의 내적과 같다는 성질을 쓰면 $J(\beta) = (X\beta-y)^T(X\beta-y)$ 이다. 이걸 전개하면 $J(\beta) = \beta^TX^TX\beta - 2y^TX\beta + $==빈칸== 이다.

## 해설
전개된 세 항 중 $\beta$가 전혀 들어 있지 않은 항이 남는다. $(X\beta)^TX\beta$와 $-2y^TX\beta$를 뺀 나머지가 $y^Ty$다. 이 항은 $\beta$를 어떻게 고르든 값이 바뀌지 않는 상수항이다.

**정답: $y^Ty$**

## 예시
정규방정식이 실제로 어떤 직선을 찾아내는지 작은 데이터로 직접 풀어봅니다.

세 점 $(1,2)$, $(2,3)$, $(3,5)$에 직선을 맞춥니다. 설계행렬과 목표값은 다음과 같습니다.
$$X=\begin{pmatrix}1&1\\1&2\\1&3\end{pmatrix},\quad y=\begin{pmatrix}2\\3\\5\end{pmatrix}$$
$X^TX=\begin{pmatrix}3&6\\6&14\end{pmatrix}$이고 $X^Ty=\begin{pmatrix}10\\23\end{pmatrix}$입니다. 행렬식은 $3\times14-6\times6=6$으로 0이 아니어서 $X^TX$는 가역입니다.
$$\beta=(X^TX)^{-1}X^Ty=\begin{pmatrix}1/3\\3/2\end{pmatrix}$$
이 직선은 $x=1,2,3$에서 각각 $11/6,\ 10/3,\ 29/6$을 예측합니다. 실제값 $2,3,5$와 완전히 같지는 않지만 오차제곱합을 가장 작게 만드는 계수가 바로 이 값입니다.

아래 증명은 임의의 설계행렬 $X$와 목표값 $y$에 대해 오차제곱합을 최소화하는 계수가 항상 이 공식으로 정확히 계산됨을 보입니다.
