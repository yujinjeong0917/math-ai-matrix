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
원본 이미지 $z'=(1,1,1)$에서는 꺼진 슈퍼픽셀이 없으므로 $d=0$이고 $\pi_x=e^0=1$이다. 슈퍼픽셀 하나만 끈 교란 이미지, 예를 들어 $z'=(0,1,1)$처럼 $d=1$인 경우 근접도 가중치는 $\pi_x=$==빈칸== 이다.

## 해설
근접도 가중치는 꺼진 슈퍼픽셀 수 $d$에 대해 $\exp(-d)$로 정의했으므로 $d=1$을 대입하면 $e^{-1}$이 나와요.

**정답: $e^{-1}$**

## 예시

