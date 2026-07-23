---
slug: pdp
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 의존도 시각화
title: PDP: 특징 하나를 바꿔가며 평균 예측이 어떻게 변하는지 보기
related: ICE plot · ALE
---

## 도입
관심 특징 $x_S$의 각 격자값에 대해 나머지 특징 $x_C$는 데이터셋에 있는 모든 샘플의 실제 값 그대로 두고 $x_S$만 그 격자값으로 바꿔치기한 뒤 모델 예측을 구해 평균을 낸다.

$\hat f_S(x_S) = \dfrac{1}{n}\displaystyle\sum_{i=1}^{n} \hat f\big(x_S,\, x_C^{(i)}\big)$

선형모델이라면 계수 하나만 봐도 특징의 영향을 알 수 있지만 트리 앙상블이나 신경망처럼 계수라는 게 존재하지 않는 블랙박스 모델에서는 "이 특징을 늘리면 예측이 어떻게 변하는가"라는 가장 기본적인 질문에 답할 방법이 마땅치 않았다. PDP는 모델 구조를 몰라도 예측값만 여러 번 뽑아보면 되는 방식으로 이 질문에 답하는 가장 단순한 전역 설명 방법이다.

다만 여기에는 숨은 가정이 있다. $x_S$를 격자값으로 바꿔치기하면서 다른 특징은 그 샘플이 실제로 가진 값 그대로 둔 채 조합을 만드는데 두 특징이 서로 강하게 연관되어 있으면 현실에는 존재하지 않는 조합이 섞여 들어갈 수 있다. 예를 들어 집 평수와 방 개수가 강하게 연관되어 있다면 평수를 20평으로 낮췄는데 방은 6개인, 실제로는 거의 없는 조합에 대한 예측까지 평균에 끼어든다. 이 문제를 어떻게 피하는지는 ALE에서 다룬다.

## 명제


## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="220" x2="520" y2="220" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="60" y1="220" x2="60" y2="40" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="20" y="30" font-size="12">평균 예측 점수</text>
<text x="500" y="245" font-size="12" text-anchor="middle">공부시간</text>
<path d="M120,196 L300,148 L480,100" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="120" cy="196" r="4" class="dg-accent" stroke="none"/>
<circle cx="300" cy="148" r="4" class="dg-accent" stroke="none"/>
<circle cx="480" cy="100" r="4" class="dg-accent" stroke="none"/>
<text x="120" y="184" font-size="11" text-anchor="middle">56</text>
<text x="300" y="136" font-size="11" text-anchor="middle">68</text>
<text x="480" y="88" font-size="11" text-anchor="middle">80</text>
<text x="120" y="238" font-size="12" text-anchor="middle">1시간</text>
<text x="300" y="238" font-size="12" text-anchor="middle">3시간</text>
<text x="480" y="238" font-size="12" text-anchor="middle">5시간</text>
</svg>

_공부시간을 격자값으로 바꿔가며 나머지 특징은 그대로 두고 예측을 평균 낸 곡선이다._

## 문제
합을 항별로 나누면 $\displaystyle\sum_i f(t,b_i) = 3(50+6t) + \sum_i b_i$이다. 여기서 $\sum_i b_i = b_A+b_B+b_C=$==빈칸==이다.

## 해설
0과 -5와 5를 더하면 서로 상쇄되어 합이 0이 돼요.

**정답: $0$**

## 예시
학생 A, B, C의 다른 조건에 따른 예측 점수를 간단히 "$50 + 6\times$공부시간$+$개인 기저값"으로 두고 개인 기저값을 각각 $0,-5,+5$라고 하자. 공부시간 1시간일 때 세 학생의 예측은 $56, 51, 61$이고 평균은 $(56+51+61)/3=56$이다. 3시간일 때는 $68,63,73$의 평균 $68$, 5시간일 때는 $80,75,85$의 평균 $80$이 된다. 이렇게 얻은 $(1,56),(3,68),(5,80)$ 세 점을 이은 곡선이 PDP다.
