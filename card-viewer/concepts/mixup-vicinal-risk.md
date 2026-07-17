---
slug: mixup-vicinal-risk
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: Mixup: 두 샘플을 섞어 학습하면 왜 결정경계가 더 부드러워지는가
related: 무작위 마스킹으로 학습을 정칙화하는 또다른 방식 · 사전믿음을 통한 파라미터 정칙화와의 비교
---

## 도입
보통의 경험위험최소화(ERM)는 관측된 $n$개의 데이터 점에서만 손실을 재는 경험분포 $P_{emp}(x,y)=\frac1n\sum_i\delta(x-x_i)\delta(y-y_i)$ 위에서 학습합니다. 이 분포는 관측된 점 바로 그 자리에만 확률 질량을 두므로, 두 데이터 점 사이의 공간에서 모델이 어떻게 행동하든 손실에는 전혀 반영되지 않습니다. Mixup은 두 표본을 직선으로 잇는 사이 공간에도 가상의 훈련 표본을 만들어 넣습니다. $x'=\lambda x_i+(1-\lambda)x_j$, $y'=\lambda y_i+(1-\lambda)y_j$ ($\lambda\sim\mathrm{Beta}(\alpha,\alpha)$)로 만든 이 가상 표본들이 정의하는 새로운 분포 위에서 위험을 최소화하는 것을 비시널 위험 최소화(vicinal risk minimization)라 부릅니다. 이 훈련 방식이 왜 모델을 두 표본 사이에서 선형적으로 보간하도록 유도하는지, 선형모델에서 정확히 무슨 일이 일어나는지부터 확인합니다.

## 명제
선형모델 $f(x)=w^Tx+b$와 제곱오차 손실을 쓸 때 $f(x')=\lambda f(x_i)+(1-\lambda)f(x_j)$가 $\lambda$에 관계없이 항상 정확히 성립하고, 그 결과 mixup 손실은 $\bigl(f(x')-y'\bigr)^2\le\lambda\bigl(f(x_i)-y_i\bigr)^2+(1-\lambda)\bigl(f(x_j)-y_j\bigr)^2$을 만족한다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<text x="40" y="18" font-size="12">ERM: 관측점에서만 손실 정의</text>
<circle cx="70" cy="70" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="100" cy="100" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="130" cy="60" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="195" y="140" width="10" height="10" class="dg-accent"/>
<rect x="225" y="115" width="10" height="10" class="dg-accent"/>
<rect x="255" y="160" width="10" height="10" class="dg-accent"/>
<polyline points="40,120 110,115 150,105 180,135 300,150" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="40" y="200" font-size="11" class="dg-dim">각진 결정경계, 점 사이 공간은 손실에 반영되지 않음</text>
<line x1="330" y1="20" x2="330" y2="205" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<text x="360" y="18" font-size="12">Mixup: 직선 사이 가상 표본 추가</text>
<circle cx="390" cy="70" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="420" cy="100" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="450" cy="60" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="515" y="140" width="10" height="10" class="dg-accent"/>
<rect x="545" y="115" width="10" height="10" class="dg-accent"/>
<rect x="575" y="160" width="10" height="10" class="dg-accent"/>
<line x1="420" y1="100" x2="545" y2="115" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="450" y1="60" x2="515" y2="140" class="dg-line" stroke-width="1" stroke-dasharray="4,3"/>
<circle cx="482" cy="107" r="3" class="dg-dim"/>
<circle cx="482" cy="100" r="3" class="dg-dim"/>
<circle cx="470" cy="88" r="3" class="dg-dim"/>
<path d="M360,140 Q450,105 620,150" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="360" y="200" font-size="11" class="dg-dim">보간점(λ)이 채워져 경계가 부드러워짐</text>
</svg>

_두 표본 사이 직선 위 가상 표본이 손실에 반영되면서 각진 결정경계가 완만해진다._

## 문제
Mixup이 정의하는 비시널 분포는 다음과 같은 절차로 표본을 만든다. 훈련집합에서 두 인덱스 $i,j$를 균등하게 고르고 $\lambda\sim\mathrm{Beta}(\alpha,\alpha)$를 뽑은 뒤, 두 입력과 두 라벨을 각각 같은 비율로 섞는다. 즉 가상 표본은 $(x',y') = $==빈칸== 이다.

## 해설
mixup의 정의 그 자체다. 입력과 라벨 모두 같은 계수 $\lambda,1-\lambda$로 볼록결합해 하나의 가상 표본을 만든다.

**정답: $(\lambda x_i+(1-\lambda)x_j,\ \lambda y_i+(1-\lambda)y_j)$**

## 예시
증명에 들어가기 전에 이차원 입력을 가진 이진분류 문제에서 실제 숫자로 mixup 표본과 그 손실을 계산해봅니다.

두 데이터 점을 $x_i=(1,1)$, $y_i=1$과 $x_j=(4,5)$, $y_j=0$으로 두고 $\lambda=0.7$로 섞습니다.
$$x'=0.7(1,1)+0.3(4,5)=(1.9,\ 2.2),\qquad y'=0.7\times1+0.3\times0=0.7$$
이미 학습되어 있는 선형모델 $f(x)=0.5x^{(1)}-0.2x^{(2)}+0.1$이 있다고 하겠습니다($x^{(1)},x^{(2)}$는 두 좌표입니다).
$$f(x_i)=0.5-0.2+0.1=0.4,\qquad f(x_j)=2.0-1.0+0.1=1.1$$
섞은 점에서의 예측값을 직접 대입해 계산해봅니다.
$$f(x')=0.5\times1.9-0.2\times2.2+0.1=0.95-0.44+0.1=0.61$$
그런데 $\lambda f(x_i)+(1-\lambda)f(x_j)=0.7\times0.4+0.3\times1.1=0.28+0.33=0.61$로 정확히 같은 값이 나옵니다. 선형모델은 입력을 섞은 그대로 출력도 섞습니다.

이제 mixup 손실과 두 끝점 손실의 볼록결합을 비교합니다.
$$(f(x_i)-y_i)^2=(0.4-1)^2=0.36,\qquad (f(x_j)-y_j)^2=(1.1-0)^2=1.21$$
$$\lambda\times0.36+(1-\lambda)\times1.21=0.7\times0.36+0.3\times1.21=0.252+0.363=0.615$$
$$(f(x')-y')^2=(0.61-0.7)^2=0.0081$$
실제 mixup 손실 $0.0081$은 두 끝점 손실의 볼록결합 $0.615$보다 훨씬 작습니다. 두 끝점에서의 오차 $f(x_i)-y_i=-0.6$과 $f(x_j)-y_j=1.1$이 부호가 반대라 섞인 지점에서 서로 상쇄되었기 때문입니다.

아래 증명은 이 부등식이 이 숫자들만의 우연이 아니라 선형모델이라면 언제나 성립하는 사실임을 보이고, 이 사실이 선형이 아닌 모델에서는 왜 추가적인 정칙화 압력으로 작동하는지도 살펴봅니다.
