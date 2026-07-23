---
slug: local-approx-error
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 대리모델 신뢰도
title: 설명 근사오차: 국소 근사가 놓치는 것
related: 대리모델 충실도
---

## 도입
설명 지점 $x_0$에서 만든 국소 선형근사를 $\hat{f}(x) = f(x_0) + \nabla f(x_0)^\top (x - x_0)$라 하자. 실제 함수 $f$와 근사 $\hat f$ 사이 오차는 $\varepsilon(x) = |f(x) - \hat f(x)|$로 정의된다. 테일러 정리에 따르면 이 오차는 $x_0$에서 멀어질수록 대략 $\lVert x - x_0 \rVert^2$에 비례해 커진다. 조금만 벗어나도 근사가 급격히 무너지는 구간이 반드시 존재한다는 뜻이다.

LIME처럼 표본을 뽑아 선형모델을 적합시키는 기법에서는 적합 과정에서 나오는 잔차의 크기로 이 오차를 근사 추정할 수 있다. 적합에 쓴 표본들에 대한 잔차제곱합이 크면 그 지점 근처는 원래 함수가 심하게 휘어 있어 선형근사가 잘 안 맞는다는 신호다. 이 잔차를 커널 폭 선택의 기준으로 삼아 폭을 줄이면 근사오차는 줄어들지만 표본이 적어져 안정성은 나빠지는 편향분산 트레이드오프가 생긴다.

결정경계 바로 근처는 근사오차가 특히 크게 나타나는 위험지대다. 클래스가 갈리는 경계는 함수가 급격히 꺾이는 지점이라 선형근사가 가장 잘 틀리는 곳이기 때문이다. 설명하려는 입력이 결정경계에서 얼마나 떨어져 있는지를 함께 보고해 이 설명은 경계 근처라 근사오차가 클 수 있다는 경고를 붙이는 편이 안전하다.

## 명제


## 그림
<svg viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg">
<path d="M60,200 L104,142.4 L148,97.6 L192,65.6 L236,46.4 L280,40 L324,46.4 L368,65.6 L412,97.6 L456,142.4 L500,200" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="100" y1="119" x2="300" y2="3" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="5,3"/>
<circle cx="192" cy="66" r="6" class="dg-accent"/>
<text x="192" y="86" font-size="12" text-anchor="middle">x₀</text>
<circle cx="236" cy="46" r="5" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<circle cx="236" cy="40" r="5" class="dg-dim"/>
<line x1="236" y1="46" x2="236" y2="40" class="dg-stroke-accent" stroke-width="2"/>
<text x="246" y="48" font-size="12">오차 작음</text>
<circle cx="280" cy="40" r="5" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<circle cx="280" cy="14" r="5" class="dg-dim"/>
<line x1="280" y1="40" x2="280" y2="14" class="dg-stroke-accent" stroke-width="2"/>
<text x="290" y="30" font-size="12">오차 큼</text>
<text x="400" y="130" font-size="13">f(x) 원래 함수</text>
<text x="70" y="115" font-size="13">f̂(x) 선형근사</text>
</svg>

_근사 기준점에서 멀어질수록 선형근사의 오차가 거리 제곱에 비례해 커진다._

## 문제
테일러 정리의 라그랑주 나머지 형태에 따르면, $x_0$과 $x$ 사이의 어떤 $\xi$에 대해 $f(x) - \hat f(x) = $==빈칸==가 성립한다.

## 해설
1차 테일러 다항식 다음에 남는 나머지항은 2차 도함수를 사용한 라그랑주 나머지 공식으로 주어지기 때문이에요.

**정답: $\dfrac{f''(\xi)}{2}(x-x_0)^2$**

## 예시
$f(x)=x^2$이고 $x_0=1$에서 접선으로 근사하면 $\hat f(x) = 1 + 2(x-1)$이다. $x=1.1$에서는 실제값 1.21 근사값 1.2로 오차가 0.01이다. $x=1.5$에서는 실제값 2.25 근사값 2.0으로 오차가 0.25다. 거리가 5배 멀어졌을 뿐인데 오차는 25배로 늘었다. 거리의 제곱에 비례해 커진다는 사실이 그대로 드러난다.
