---
slug: tree-visualization
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 구조 특화 설명
title: 트리 시각화: 분기 경로를 그대로 보여주기
related: 선형모델 계수 · 규칙 추출
---

## 도입
트리의 내부 노드는 하나의 특징에 대해 $x_j \le t$ 같은 임계값 조건을 검사하고 그 결과에 따라 왼쪽 또는 오른쪽 자식으로 이동한다. 리프 노드에는 회귀라면 예측값이 분류라면 클래스 분포가 저장돼 있다. 한 샘플의 예측은 뿌리에서 리프까지 지나온 조건들의 목록 그 자체로 설명된다.

트리 깊이가 깊을수록 조건이 많아져서 해석이 어려워지기 때문에 해석가능성을 우선하는 상황에서는 정확도를 조금 희생하더라도 얕은 트리를 일부러 선택하기도 한다.

단일 트리를 넘어 전체 모델의 특징 중요도를 낼 때는 각 특징이 분기에 쓰일 때마다 불순도(지니 불순도나 분산)가 얼마나 줄었는지를 그 분기에 도달한 샘플 수로 가중해 모든 트리에 걸쳐 합산한다. 이 평균 불순도 감소(MDI) 방식은 계산이 빠르지만 연속값이거나 범주가 많은 특징의 중요도를 과대평가하는 경향이 있어 무작위로 값을 섞어 성능 하락폭을 재는 permutation importance와 함께 비교하는 경우가 많다.

## 명제


## 그림
<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
<line x1="300" y1="30" x2="180" y2="110" class="dg-stroke-accent" stroke-width="2"/>
<line x1="300" y1="30" x2="420" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="180" y1="110" x2="120" y2="190" class="dg-stroke-accent" stroke-width="2"/>
<line x1="180" y1="110" x2="240" y2="190" class="dg-line" stroke-width="1.5"/>
<line x1="420" y1="110" x2="360" y2="190" class="dg-line" stroke-width="1.5"/>
<line x1="420" y1="110" x2="480" y2="190" class="dg-line" stroke-width="1.5"/>
<circle cx="300" cy="30" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="180" cy="110" r="14" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="420" cy="110" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="120" cy="190" r="12" class="dg-accent" stroke="none"/>
<circle cx="240" cy="190" r="12" class="dg-dim" stroke="none"/>
<circle cx="360" cy="190" r="12" class="dg-dim" stroke="none"/>
<circle cx="480" cy="190" r="12" class="dg-dim" stroke="none"/>
<text x="215" y="65" font-size="12" text-anchor="middle">소득 ≤ t</text>
<text x="385" y="65" font-size="12" text-anchor="middle" class="dg-dim">소득 > t</text>
<text x="130" y="155" font-size="12" text-anchor="middle">나이 ≤ s</text>
<text x="230" y="155" font-size="12" text-anchor="middle" class="dg-dim">나이 > s</text>
<text x="120" y="220" font-size="12" text-anchor="middle">예측 = A</text>
</svg>

_뿌리에서 리프까지 실제로 지나간 경로가 그대로 예측의 근거가 된다._

## 문제
깊이 1인 트리, 즉 뿌리가 곧바로 리프 $L$과 $R$로 갈라지는 경우를 먼저 본다. 이때 내부노드는 뿌리 하나뿐이고 $n_{\text{뿌리}} = n$이므로, $\sum_m \Delta I_m = \Delta I_{\text{뿌리}} = $ ==빈칸== 가 되어 명제의 우변과 일치한다.

## 해설
뿌리가 유일한 내부노드이므로 전체 합은 뿌리에서의 국소 감소량 하나뿐이고, n_뿌리=n을 대입하면 정의식의 첫 항이 I(뿌리)로 단순화되어 명제의 우변과 같은 형태가 된다.

**정답: $I(\text{뿌리}) - \dfrac{n_L}{n}I(L) - \dfrac{n_R}{n}I(R)$**

## 예시
나이와 소득이라는 두 특징을 쓰는 트리가 있다고 하자. 어떤 샘플의 소득이 임계값 이하라면 뿌리 노드에서 왼쪽으로 이동하고 이어서 나이가 임계값 이하인지를 검사해 다시 왼쪽으로 이동해 리프에 도달한다. 이 리프의 예측이 최종 출력이고 지나온 두 조건 소득 이하와 나이 이하가 그대로 이 예측의 근거가 된다.
