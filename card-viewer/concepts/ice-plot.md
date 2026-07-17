---
slug: ice-plot
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 의존도 시각화
title: ICE plot: PDP를 샘플 단위로 쪼개보기
related: PDP · ALE
---

## 도입
샘플 $i$마다 나머지 특징 $x_C^{(i)}$는 그 샘플의 실제 값으로 고정한 채 관심 특징만 격자값을 바꿔가며 예측을 구하면 그 샘플만의 곡선이 나온다.

$\hat f^{(i)}(x_S) = \hat f\big(x_S,\, x_C^{(i)}\big), \qquad \hat f_S(x_S) = \dfrac{1}{n}\displaystyle\sum_{i} \hat f^{(i)}(x_S)$

PDP가 안고 있던 약점은 평균이라는 연산 자체가 이질적인 효과를 지워버릴 수 있다는 점이었다. 관심 특징의 효과가 다른 특징 값에 따라 달라지는 상호작용이 있으면 PDP는 그 상호작용을 뭉개서 밋밋한 하나의 선으로만 보여준다. ICE는 평균을 내기 전 단계에서 멈춰서 이 상호작용을 곡선들의 퍼짐 정도로 그대로 노출한다.

곡선들이 시작 위치부터 서로 다른 기저 수준에 있으면 모양 차이보다 높낮이 차이가 눈에 먼저 들어와 비교가 어려울 수 있다. 이런 경우 모든 곡선을 가장 왼쪽 격자점 값 기준으로 0에서 시작하도록 평행이동한 centered ICE(c-ICE)를 쓰면 높낮이 차이는 지우고 기울기, 즉 특징에 대한 반응 패턴의 차이만 비교하기 쉬워진다.

## 명제


## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="220" x2="520" y2="220" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="60" y1="220" x2="60" y2="40" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="20" y="30" font-size="12">예측 점수</text>
<text x="500" y="245" font-size="12" text-anchor="middle">공부시간</text>
<path d="M120,216 L300,168 L480,120" fill="none" class="dg-line" stroke-width="1.5"/>
<path d="M120,176 L300,128 L480,80" fill="none" class="dg-line" stroke-width="1.5"/>
<path d="M120,196 L300,148 L480,100" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="120" y="238" font-size="12" text-anchor="middle">1시간</text>
<text x="300" y="238" font-size="12" text-anchor="middle">3시간</text>
<text x="480" y="238" font-size="12" text-anchor="middle">5시간</text>
<text x="420" y="84" font-size="11">학생 C</text>
<text x="420" y="108" font-size="11">학생 A</text>
<text x="420" y="122" font-size="11" class="dg-dim">= PDP(평균)</text>
<text x="420" y="152" font-size="11">학생 B</text>
</svg>

_가는 선은 개별 학생의 ICE 곡선이고 굵은 선은 그 곡선들을 평균한 PDP다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
PDP는 데이터셋 전체를 평균 낸 곡선 하나만 보여준다. 그런데 평균 뒤에는 서로 다른 개별 패턴이 숨어 있을 수 있다. 어떤 학생은 공부시간이 늘수록 점수가 꾸준히 오르고 어떤 학생은 거의 안 오를 수도 있는데 이 둘을 평균 내면 두 효과가 뭉뚱그려져 하나의 매끈한 곡선처럼 보인다. ICE plot은 평균 내기 전에 샘플 하나하나에 대해 똑같은 곡선을 따로 그려서 이런 개별 차이를 그대로 드러낸다.

PDP는 이 개별 ICE 곡선들을 세로로 평균 낸 것과 정확히 같다. 그래서 실무에서는 둘을 함께 그려서 ICE 곡선들이 서로 다른 방향으로 흩어져 있는지, 아니면 다 비슷한 모양으로 겹쳐 있어서 PDP 한 줄만으로도 대표성이 있는지를 함께 확인한다.


## 예시
PDP 항목의 학생 A, B, C 예로 돌아가 보면 학생 A의 곡선은 $(1,56),(3,68),(5,80)$, 학생 B는 $(1,51),(3,63),(5,75)$, 학생 C는 $(1,61),(3,73),(5,85)$로 서로 다른 개별 곡선이다. 이 세 곡선을 각 격자점에서 평균하면 정확히 PDP의 $56,68,80$이 나온다. 다만 학생 A의 개인 기저값이 마침 세 학생 평균인 0과 같기 때문에 A의 곡선이 우연히 PDP와 겹쳐 보이는데 이는 A가 딱 평균적인 조건을 가진 학생이기 때문일 뿐이다.
