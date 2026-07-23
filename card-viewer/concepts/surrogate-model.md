---
slug: surrogate-model
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 전역 근사
title: Surrogate Model: 단순한 모델로 블랙박스 전체를 흉내내기
related: 전역 설명 · InterpretML · Global SHAP 요약
---

## 도입
대리모델 $g$는 원래 모델 $f$의 입력 $x$에 대한 예측 $f(x)$를 타깃으로 학습한다. 실제 정답 라벨이 아니라 원래 모델이 내놓은 출력을 흉내 내도록 지도학습을 돌리는 셈이라 일종의 지식 증류(distillation)에 가깝다. 선형회귀, 얕은 결정트리, GAM처럼 계수나 분기 규칙을 사람이 바로 읽을 수 있는 모델을 $g$로 고른다.

여기서 말하는 대리모델은 데이터 분포 전체에 걸쳐 학습하는 전역 대리모델이다. 이 점이 입력 하나 주변에서만 국소적으로 근사하는 LIME과 다르다. LIME의 국소 선형모델은 그 지점 근처에서만 믿을 만하지만 전역 대리모델은 데이터셋 전체를 대표하려고 시도한다. 그만큼 국소 근사보다 정확도를 맞추기가 더 어렵다.

충실도는 보통 $g(x)$와 $f(x)$의 예측 일치율이나 결정계수로 측정한다. 충실도가 높은 영역에서는 대리모델의 설명을 믿을 수 있지만 원래 모델이 복잡한 비선형 결정을 내리는 영역에서는 단순한 대리모델이 그 굴곡을 못 따라가 설명이 어긋난다. 대리모델을 쓸 때는 전체 평균 충실도만이 아니라 어느 구간에서 특히 어긋나는지도 함께 봐야 한다.

## 명제


## 그림
<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="20" width="440" height="180" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<path d="M40,140 C120,60 180,180 260,90 C340,20 400,120 480,70" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="40" y1="120" x2="480" y2="90" class="dg-stroke-accent" stroke-width="2.5" stroke-dasharray="6,3"/>
<text x="150" y="40" text-anchor="middle" font-size="12">블랙박스의 실제 결정경계</text>
<text x="370" y="185" text-anchor="middle" font-size="12" class="dg-accent">대리모델의 단순 근사 경계</text>
</svg>

_복잡한 실제 경계를 단순한 경계 하나로 근사하면 어긋나는 구간이 생긴다._

## 문제
세 점에서의 잔차 제곱합은 $S(w,b)=(-w+b-1)^2+b^2+(w+b-1)^2$이다. $w$에 대해 편미분하면 $\frac{\partial S}{\partial w} = -2(-w+b-1)+2(w+b-1) = 4w$가 되는데, 이를 0으로 놓으면 최적의 기울기는 ==빈칸== 이다.

## 해설
4w=0을 풀면 w=0이 나오는데, 이는 x=-1과 x=1에서 f 값이 똑같이 1이라 대칭을 이루기 때문이에요.

**정답: $0$**

## 예시

