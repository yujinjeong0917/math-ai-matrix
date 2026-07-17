---
slug: teacher-forcing-exposure-bias
theme: PROB
domainLabel: 확률 · 통계
subLabel: 마르코프 · 확률과정
title: 교사강요와 노출편향: 학습과 생성이 서로 다른 입력분포를 보는 문제
related: 은닉상태가 과거를 압축하는 재귀 구조 · 교사강요가 그대로 옮긴 확률 연쇄법칙
---

## 도입
rnn-hidden-state에서 본 것처럼 순환신경망은 $h_t=f(h_{t-1},x_t)$로 과거를 은닉상태에 압축하고, autoregressive-chain-rule에서는 전체 시퀀스의 확률이 $p(x_1,\dots,x_T)=\prod_t p(x_t|x_{<t})$로 정확히 분해된다는 것을 확인했습니다. 교사강요는 이 연쇄법칙의 각 항을 훈련 데이터의 참값 $x_{<t}^{true}$를 조건으로 걸어 계산하고, 그 로그우도의 합을 손실로 최소화합니다. 그런데 생성 시점에는 참값을 알 수 없으므로 모델은 자기 자신이 만든 이전 토큰을 조건으로 씁니다. 한 번이라도 틀린 토큰을 내놓으면 그 뒤의 조건은 훈련 데이터에서 한 번도 보지 못했던 분포로 넘어가버립니다. 이 학습과 생성 사이의 입력분포 불일치가 노출편향이며, 오류가 왜 누적되는지 아주 단순화한 모델로 정량화해봅니다.

## 명제
문맥이 정확할 때 모델이 다음 토큰을 틀릴 조건부확률을 $\varepsilon$이라 하자(이는 교사강요 손실이 직접 재는 양이다). 매 시점의 오류확률이 오직 직전까지의 문맥이 정확한지에만 의존하고 항상 $\varepsilon$이라는 단순화된 가정 아래, 길이 $T$의 시퀀스를 처음부터 끝까지 하나도 틀리지 않고 생성할 확률은 $(1-\varepsilon)^T$이다. 반면 교사강요 손실은 모든 시점에서 참 문맥만을 조건으로 쓰므로 문맥이 한 번이라도 어긋난 이후의 상황은 전혀 평가하지 않는다.

## 그림
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="150" x2="560" y2="150" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="100" cy="150" r="4" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="200" cy="150" r="4" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="300" cy="150" r="4" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="400" cy="150" r="4" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="500" cy="150" r="4" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="60" y="138" font-size="12">교사강요(학습): 매 시점 정답 조건으로 복귀</text>
<path d="M100,150 C160,148 240,130 300,118 C360,106 440,70 500,55" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="200" cy="140" r="4" class="dg-accent"/>
<circle cx="300" cy="118" r="4" class="dg-accent"/>
<circle cx="400" cy="90" r="4" class="dg-accent"/>
<circle cx="500" cy="55" r="4" class="dg-accent"/>
<line x1="300" y1="150" x2="300" y2="118" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="400" y1="150" x2="400" y2="90" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="500" y1="150" x2="500" y2="55" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<text x="330" y="45" font-size="12">생성(추론): 자기 예측으로 조건화, 오차 누적</text>
<text x="60" y="200" font-size="11" class="dg-dim">t=1에서 t=5로 갈수록 두 경로가 점점 벌어짐</text>
</svg>

_학습은 매번 정답으로 되돌아가지만, 생성은 자기 오류를 물려받아 궤적이 점점 벌어진다._

## 문제
먼저 시점당 오류확률을 정의한다. 문맥 $x_{<t}$가 정확히 참값 $x_{<t}^{true}$와 같을 때 모델이 다음 토큰을 틀리게 고를 조건부확률을 $\varepsilon$이라 쓴다. 교사강요는 학습 중 항상 참 문맥만을 모델에 넣어주므로, 교사강요 손실이 각 시점마다 실제로 재고 있는 오류율이 바로 이 $\varepsilon$이다. 즉 $\varepsilon = $==빈칸== 이다.

## 해설
정의 그대로다. 조건이 참 문맥과 정확히 같을 때 모델의 예측 $\hat x_t$가 정답 $x_t$와 다를 확률이 $\varepsilon$이다. 교사강요는 훈련 내내 이 조건, 즉 참 문맥만을 모델에 넣으므로 손실이 재는 오류율은 정확히 이 $\varepsilon$이다.

**정답: $P\bigl(\hat x_t\ne x_t \mid x_{<t}=x_{<t}^{true}\bigr)$**

## 예시
증명에 들어가기 전에 시퀀스 길이 $T=5$, 시점당 오류확률 $\varepsilon=0.1$인 아주 단순한 상황에서 실제로 숫자가 어떻게 벌어지는지 봅니다.

교사강요로 학습한 모델의 시점당 정확도는 $1-\varepsilon=0.9$, 즉 $90\%$라 하겠습니다. 언뜻 보면 상당히 좋은 모델처럼 보입니다.

그런데 생성 시점에는 매 시점의 정확도 $0.9$가 다섯 번 연속으로 곱해져야 전체 시퀀스가 처음부터 끝까지 맞습니다.
$$(1-\varepsilon)^T=0.9^5=0.9\times0.9\times0.9\times0.9\times0.9$$
차례로 계산하면 $0.9^2=0.81$, $0.9^3=0.729$, $0.9^4=0.6561$, $0.9^5=0.59049$입니다.

시점당 정확도는 $90\%$로 높아 보이지만 다섯 토큰짜리 시퀀스 전체가 완전히 맞을 확률은 약 $59\%$로 뚝 떨어집니다. 교사강요 손실이 보고하는 지표는 시점당 정확도 $0.9$ 하나뿐이고, 이 $0.59$라는 전체 성공률은 애초에 교사강요가 평가한 적이 없는 양입니다. 시퀀스가 더 길어지면 이 격차는 지수적으로 더 벌어집니다.

아래 증명은 이 $(1-\varepsilon)^T$라는 곱셈 구조가 왜 나오는지, 그리고 이 값이 교사강요 손실이 실제로 재는 양과 어떻게 다른지 확인합니다.
