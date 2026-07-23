---
slug: wide-and-deep
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 딥러닝 랭킹
title: Wide&Deep: 암기와 일반화를 함께 학습하기
related: DIN · Two-Tower 모델
---

## 도입
wide 부분은 원본 피처와 사람이 직접 만든 교차피처 $\phi(x)$를 입력받는 일반화 선형모델입니다.
$$y_{wide} = w^\top [x,\ \phi(x)] + b$$
deep 부분은 범주형 피처를 임베딩한 뒤 여러 층의 완전연결층을 통과시킵니다.
$$a^{(l+1)} = \mathrm{ReLU}\left(W^{(l)}a^{(l)} + b^{(l)}\right)$$
두 출력은 하나의 로짓으로 합쳐져 같은 시그모이드와 같은 로그손실로 함께 학습됩니다.
$$P(y=1\mid x) = \sigma\!\left(w_{wide}^\top[x,\phi(x)] + w_{deep}^\top a^{(final)} + b\right)$$
두 부분을 따로 학습해 나중에 점수만 평균 내는 방식이 아니라 하나의 손실에서 나온 그래디언트가 wide와 deep 양쪽으로 동시에 흘러갑니다. 그래서 deep 부분이 일반화하느라 놓친 특정 조합의 오차를 wide 부분이 바로 옆에서 보정하도록 함께 맞춰집니다.

Google Play 앱 추천에서 처음 제안된 구조로 암기와 일반화가 둘 다 필요하다는 문제의식에서 나왔습니다. 사용자 행동 이력 전체를 어떻게 다룰지는 아직 다루지 않는데 이 부분은 이력을 하나의 벡터로 뭉뚱그리지 않는 DIN에서 다시 다뤄집니다.

## 명제


## 그림
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="20" font-size="13" text-anchor="middle">Wide (선형 + 교차피처)</text>
<rect x="40" y="35" width="220" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="150" y="57" font-size="12" text-anchor="middle">원본 피처 + 수동 교차피처</text>
<line x1="150" y1="69" x2="150" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="60" y="100" width="180" height="30" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="150" y="120" font-size="12" text-anchor="middle">선형결합 w·x</text>
<text x="460" y="20" font-size="13" text-anchor="middle">Deep (임베딩 + MLP)</text>
<rect x="360" y="35" width="200" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="460" y="57" font-size="12" text-anchor="middle">범주형 피처 임베딩</text>
<line x1="460" y1="69" x2="460" y2="95" class="dg-line" stroke-width="1.5"/>
<rect x="380" y="95" width="160" height="28" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="460" y="113" font-size="11" text-anchor="middle">은닉층 1</text>
<line x1="460" y1="123" x2="460" y2="140" class="dg-line" stroke-width="1.5"/>
<rect x="390" y="140" width="140" height="28" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="460" y="158" font-size="11" text-anchor="middle">은닉층 2</text>
<line x1="150" y1="130" x2="300" y2="200" class="dg-line" stroke-width="1.5"/>
<line x1="460" y1="168" x2="330" y2="200" class="dg-line" stroke-width="1.5"/>
<rect x="260" y="200" width="110" height="34" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="315" y="222" font-size="12" text-anchor="middle">합산 후 시그모이드</text>
</svg>

_wide는 교차피처를 암기하고 deep은 임베딩으로 일반화한 뒤 하나의 출력에서 합쳐진다._

## 문제
시그모이드 함수 $\sigma(z)$를 $z$로 미분하면 자기 자신을 이용해 표현되는 특별한 형태가 나온다는 사실이 잘 알려져 있다. $p=\sigma(z)$라 할 때 $\dfrac{dp}{dz} = $==빈칸== 이다.

## 해설
시그모이드의 도함수는 σ(z)(1-σ(z))라는 표준 공식이에요. p=σ(z)로 치환하면 p(1-p)가 돼요.

**정답: $p(1-p)$**

## 예시

