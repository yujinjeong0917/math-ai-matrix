---
slug: global-explanation
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 범위 구분
title: 전역 설명: 모델 전체는 평균적으로 어떻게 행동하는가
related: 국소 설명 · Surrogate Model · Global SHAP 요약
---

## 도입
전역 설명을 얻는 방법은 크게 두 갈래다. 하나는 처음부터 전역적으로 해석 가능한 대리모델을 학습하는 방법이다. 선형회귀의 계수나 얕은 결정트리의 분기 규칙은 그 자체로 모델 전체의 행동을 설명한다. 다른 하나는 개별 사례마다 계산한 국소 설명을 많이 모아 통계적으로 집계하는 방법이다. 수천 개 샘플의 SHAP값을 평균 내면 전역 특징 중요도가 나오는 식이다.

부분의존도 플롯(PDP)이나 순열 중요도(permutation importance)처럼 애초에 개별 샘플 단위 분해를 거치지 않고 데이터셋 전체를 대상으로 직접 계산하는 전역 기법도 있다. 이런 기법은 국소 설명을 집계할 필요 없이 곧바로 전역 그림을 만든다.

전역과 국소는 이분법이라기보다 스펙트럼에 가깝다. 국소 설명을 집계하면 전역 설명이 되고 전역 설명을 특정 부분집합으로 좁히면 그 부분집합에 한정된 준전역 설명이 된다. 어느 수준에서 설명을 봐야 하는지는 질문의 성격에 달려 있다. 모델을 감사하거나 규제 대응 문서를 쓸 때는 전역 설명이 필요하고 이 사람에게 왜 이런 결정이 나왔는지 답해야 할 때는 국소 설명이 필요하다.

## 명제


## 그림
<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="160" x2="480" y2="160" class="dg-line" stroke-width="1.5"/>
<line x1="40" y1="160" x2="40" y2="30" class="dg-line" stroke-width="1.5"/>
<circle cx="90" cy="120" r="5" class="dg-dim"/>
<circle cx="130" cy="100" r="5" class="dg-dim"/>
<circle cx="170" cy="130" r="5" class="dg-dim"/>
<circle cx="210" cy="90" r="5" class="dg-dim"/>
<circle cx="250" cy="110" r="5" class="dg-dim"/>
<circle cx="290" cy="70" r="5" class="dg-dim"/>
<circle cx="330" cy="95" r="5" class="dg-dim"/>
<circle cx="370" cy="60" r="5" class="dg-dim"/>
<circle cx="410" cy="80" r="5" class="dg-dim"/>
<path d="M80,125 C200,60 320,60 420,55" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="260" y="45" text-anchor="middle" font-size="13">전체 데이터에 대한 평균적 경향</text>
<text x="260" y="185" text-anchor="middle" font-size="12" class="dg-dim">모든 예측을 아우르는 하나의 요약</text>
</svg>

_개별 점들이 아니라 전체 데이터에 걸친 평균적 경향 하나를 본다._

## 문제
전역 중요도는 $I_X = \frac{1}{n}\sum_{i=1}^n |\phi_X^{(i)}|$로 정의된다. 95개 샘플의 기여분과 5개 샘플의 기여분을 각각 더하면 분자, 즉 $\sum_{i=1}^n |\phi_X^{(i)}|$의 값은 ==빈칸== 이다.

## 해설
95×0과 5×1을 더하면 5가 나와요.

**정답: $5$**

## 예시

