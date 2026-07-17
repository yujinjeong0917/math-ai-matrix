---
slug: image-lime
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 국소 근사 기반
title: 이미지 LIME: 슈퍼픽셀 단위로 교란하기
related: LIME · 잠재공간 교란
---

## 도입
먼저 분할 알고리즘(quickshift나 SLIC 등)으로 원본 이미지를 $M$개의 슈퍼픽셀로 나눈다. 해석 가능한 표현은 이 $M$개 슈퍼픽셀 각각의 켜짐 꺼짐을 나타내는 이진벡터 $z' \in \{0,1\}^M$이다. $z'$의 각 성분이 1이면 그 슈퍼픽셀은 원본 그대로 두고 0이면 회색이나 해당 영역의 평균색 같은 중립적인 값으로 덮어 새 이미지를 만든다.

이렇게 만든 여러 교란 이미지를 원래 분류 모델에 통과시켜 관심 클래스에 대한 예측 확률을 얻는다. 원본 이미지($z'$가 전부 1인 경우)에 가까운 교란 이미지 즉 꺼진 슈퍼픽셀 수가 적은 이미지일수록 LIME의 근접도 가중치 $\pi_x$를 더 크게 준다. 이 가중치 붙은 데이터로 이진벡터 $z'$를 입력으로 받는 희소 선형모델을 학습시키면 슈퍼픽셀별 계수를 얻는다.

양의 계수를 가진 슈퍼픽셀은 켜져 있을 때 예측 확률을 밀어올리는 영역이고 음의 계수는 끌어내리는 영역이다. 계수가 큰 상위 몇 개 슈퍼픽셀만 원본 위에 하이라이트로 표시하면 사람이 보기에 모델이 이미지의 어느 부분을 보고 그 클래스를 골랐는지 한눈에 들어오는 설명이 된다. 화소 단위 그래디언트 기반 설명과 달리 슈퍼픽셀 단위라 노이즈가 적고 물체 경계와도 잘 맞아떨어지는 편이다.

## 명제


## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="30" width="220" height="180" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<path d="M30,90 L110,60 L160,100 L120,150 L30,140 Z" fill="none" class="dg-line" stroke-width="1.5"/>
<path d="M110,60 L250,30 L250,120 L160,100 Z" class="dg-accent"/>
<path d="M160,100 L250,120 L250,210 L120,150 Z" fill="none" class="dg-line" stroke-width="1.5"/>
<path d="M30,140 L120,150 L250,210 L30,210 Z" class="dg-dim"/>
<text x="140" y="20" font-size="12" text-anchor="middle">슈퍼픽셀로 분할</text>
<line x1="255" y1="120" x2="330" y2="120" class="dg-line" stroke-width="1.5"/>
<text x="292" y="110" font-size="12" text-anchor="middle">on/off</text>
<rect x="330" y="60" width="200" height="120" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="430" y="90" font-size="12" text-anchor="middle">교란 이미지 → f(z)</text>
<text x="430" y="115" font-size="12" text-anchor="middle" class="dg-dim">가까운 샘플에 큰 가중치</text>
<text x="430" y="150" font-size="12" text-anchor="middle">→ 슈퍼픽셀별 계수</text>
</svg>

_일부 슈퍼픽셀을 지운 여러 버전의 이미지로 예측 변화를 관찰해 슈퍼픽셀별 중요도를 얻는다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
이미지는 화소 하나하나가 수만 개라서 LIME을 화소 단위로 그대로 적용하면 교란해야 할 변수가 너무 많아진다. 화소 하나를 껐다 켠다고 사람 눈에 보이는 의미 있는 변화가 생기지도 않는다. 이미지 LIME은 화소를 개별로 다루는 대신 색과 질감이 비슷해서 같은 물체 조각처럼 보이는 덩어리로 이미지를 먼저 쪼갠다. 이 덩어리를 슈퍼픽셀이라고 부른다.

이제 교란은 슈퍼픽셀 단위로 이루어진다. 특정 슈퍼픽셀 영역을 회색이나 평균색으로 지워버리거나 그대로 두는 식으로 켜고 끄면서 여러 버전의 이미지를 만들고 각 버전에 대한 모델 예측을 관찰한다. 어떤 조각을 지웠을 때 예측이 크게 흔들리면 그 조각이 예측에 중요했다는 뜻이다.


## 예시

