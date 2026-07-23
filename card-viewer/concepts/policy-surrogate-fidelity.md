---
slug: policy-surrogate-fidelity
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 대리모델 신뢰도
title: 정책 대리설명 충실도: 결정트리가 정책을 얼마나 잘 흉내내는가
related: 대리모델 충실도 · 정책 설명 안정성 · 반사실 행동설명
---

## 도입
정책 대리설명 충실도는 지도학습의 대리모델 충실도를 정책 문제에 그대로 옮긴 것이다. 상태 집합 $S$에 대해 원래 정책 $\pi$가 고르는 행동과 결정트리 $\hat\pi$가 고르는 행동이 얼마나 일치하는지를 잰다.

$$\text{Policy Agreement} = \frac{1}{|S|}\sum_{s \in S} \mathbf{1}[\pi(s) = \hat\pi(s)]$$

행동 일치도만으로는 부족할 때가 많다. 두 정책이 다른 행동을 골랐어도 그 결과로 얻는 누적 보상이 비슷하다면 실질적으로는 괜찮은 근사일 수 있다. 반대로 행동 일치도는 높은데 충돌 직전처럼 결정적인 소수 상태에서만 어긋난다면 그 어긋남이 훨씬 위험할 수 있다. 그래서 행동 단위 일치도와 별도로 결정트리 정책을 실제로 굴려봤을 때의 누적 보상을 원래 정책과 비교하는 방법도 함께 쓴다.

트리 깊이는 해석가능성과 충실도 사이의 직접적인 트레이드오프다. 트리를 얕게 만들수록 사람이 규칙을 읽고 이해하기는 쉬워지지만 원래 신경망 정책의 복잡한 결정경계를 담아내지 못해 일치도가 떨어진다. 실무에서는 목표로 하는 최소 일치도를 먼저 정하고 그 조건을 만족하는 가장 얕은 트리를 찾는 식으로 두 요구를 절충한다.

## 명제


## 그림
<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="18" font-size="13" text-anchor="middle">신경망 정책</text>
<path d="M40,190 C90,110 150,210 200,120 C215,90 230,60 260,30" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="470" y="18" font-size="13" text-anchor="middle">결정트리 정책</text>
<line x1="470" y1="30" x2="470" y2="230" class="dg-stroke-ink" stroke-width="2"/>
<line x1="340" y1="130" x2="470" y2="130" class="dg-stroke-ink" stroke-width="2"/>
<line x1="470" y1="90" x2="600" y2="90" class="dg-stroke-ink" stroke-width="2"/>
<rect x="440" y="150" width="40" height="40" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<text x="460" y="145" font-size="12" text-anchor="middle">불일치</text>
<text x="310" y="250" font-size="12" text-anchor="middle" class="dg-dim">직선 분할은 곡선 경계를 완전히 담아내지 못한다</text>
</svg>

_신경망 정책의 곡선 경계를 결정트리의 축 정렬 분할로 근사하면 일부 영역에서 어긋남이 생긴다._

## 문제
이 가정에서 $\hat\pi$가 얻는 정규화 누적 보상은 일치한 상태의 개수를 $T$로 나눈 값보다 작을 수 없다. 즉 $V^{\hat\pi} \ge \dfrac{1}{T}\sum_{s \in S} \mathbf{1}[\pi(s)=\hat\pi(s)]$이고, 이 우변은 앞서 정의한 지표인 ==빈칸==와 정확히 같은 식이다.

## 해설
정의한 식 자체가 상태별 일치 여부를 평균한 것이므로, 이 부등식의 우변과 Policy Agreement 공식이 그대로 일치해요.

**정답: $\text{Policy Agreement}$**

## 예시
같은 정책을 깊이 2인 트리로 근사하면 행동 일치도가 81퍼센트 실제로 굴렸을 때 누적 보상은 원래 정책의 92퍼센트 수준이 나온다고 하자. 깊이를 4로 늘리면 일치도는 94퍼센트 보상은 99퍼센트까지 올라간다. 규칙을 얼마나 단순하게 유지할지는 이 수치를 보고 정하는 게 안전하다.
