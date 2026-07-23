---
slug: contrastive-explanation
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 반사실 설명
title: 대조적 설명: 왜 A이고 B가 아닌가
related: Counterfactual 설명
---

## 도입
계산 방식은 크게 두 갈래다. 하나는 두 클래스에 대한 기여도를 각각 구한 뒤 차이를 취하는 방식이다.

$$\Delta\phi = \phi_A(x) - \phi_B(x)$$

이 차이가 큰 특징일수록 두 클래스를 가르는 데 결정적인 역할을 한다. 다른 하나는 A로 분류되는 데 반드시 있어야 하는 부분과 B로 분류되지 않으려면 없어야 하는 부분을 최적화로 직접 찾는 방식이다. Dhurandhar 등이 제안한 Contrastive Explanation Method가 이 방식을 쓴다.

대조적 설명은 counterfactual 설명과 방향이 다르다. counterfactual은 무엇을 바꾸면 예측이 뒤집히는지를 입력 공간에서 찾는 데 초점을 두고 대조적 설명은 현재 입력이 왜 클래스 B가 아니라 A로 남아있는지를 두 클래스 근거의 차이로 설명한다. 두 방식은 상호보완적이다.

사람의 설명 요구는 본질적으로 대조적이라는 지적이 인지과학 연구에서 꾸준히 나온다. 왜 P인가보다 왜 P이고 Q는 아닌가에 답할 때 사람이 더 만족한다는 것이다. 그래서 의료 진단이나 대출 심사처럼 사람이 최종 판단을 내리는 도메인의 설명 UI에서 대조적 설명이 특히 선호된다.

## 명제


## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="20" font-size="13">클래스별 특징 기여도</text>
<line x1="60" y1="200" x2="480" y2="200" class="dg-line" stroke-width="1.5"/>
<rect x="90" y="120" width="20" height="80" class="dg-accent"/>
<rect x="115" y="168" width="20" height="32" class="dg-dim"/>
<text x="112" y="215" font-size="12" text-anchor="middle">무늬</text>
<rect x="250" y="144" width="20" height="56" class="dg-accent"/>
<rect x="275" y="152" width="20" height="48" class="dg-dim"/>
<text x="272" y="215" font-size="12" text-anchor="middle">귀 모양</text>
<rect x="410" y="176" width="20" height="24" class="dg-accent"/>
<rect x="435" y="120" width="20" height="80" class="dg-dim"/>
<text x="432" y="215" font-size="12" text-anchor="middle">꼬리 길이</text>
<rect x="470" y="24" width="14" height="14" class="dg-accent"/>
<text x="490" y="35" font-size="12">고양이(A)</text>
<rect x="470" y="44" width="14" height="14" class="dg-dim"/>
<text x="490" y="55" font-size="12">개(B)</text>
</svg>

_같은 입력이라도 두 클래스에 대한 특징별 기여도를 나란히 비교하면 무엇이 판단을 갈랐는지 드러난다._

## 문제
두 식을 변끼리 빼면 $\sum_i \Delta\phi_i(x) = [f_A(x)-f_B(x)] - [f_A(x_0)-f_B(x_0)]$ 이 된다. 그런데 baseline에서는 두 클래스 점수가 같다고 가정했으므로 $f_A(x_0)-f_B(x_0) =$ ==빈칸== 이다.

## 해설
베이스라인에서 두 클래스 점수가 같다고 가정했으므로 그 차이는 0이 돼요.

**정답: $0$**

## 예시
고양이(A)와 개(B)에 대한 기여도가 무늬 0.50 대 0.20 귀 모양 0.35 대 0.30 꼬리 길이 0.15 대 0.50이라고 하자. 무늬 쪽 차이가 0.30으로 가장 커서 고양이로 판단하는 데 가장 결정적인 근거가 되고 귀 모양은 차이가 0.05뿐이라 판단에 거의 기여하지 못한다. 꼬리 길이는 오히려 개 쪽이 0.35 더 높아 이 특징만 보면 개에 가깝다는 신호다.
