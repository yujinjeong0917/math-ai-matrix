---
slug: hmm-forward
theme: PROB
domainLabel: 확률 · 통계
subLabel: 마르코프 · 확률과정
title: 은닉마르코프모델 전방 알고리즘의 재귀식
hook: HMM은 눈에 보이지 않는 상태 $s_t$가 순서대로 바뀌면서 매 시점 관측 $o_t$를 하나씩 내놓는다고 가정해요.
---

## 기본설명
$\alpha_t(j)=P(o_1,\dots,o_t,s_t=j)$로 정의하면 $\alpha_t(j) = \left[\sum_i\alpha_{t-1}(i)P(s_t=j\mid s_{t-1}=i)\right]P(o_t\mid s_t=j)$ 이다.

## 문제
지금 목표는 $t$ 시점의 전방변수 $\alpha_t(j)=P(o_1,\dots,o_t,s_t=j)$를 $t-1$ 시점의 $\alpha_{t-1}$들로 표현하는 재귀식을 얻는 것이다. 첫 걸음은 전확률법칙으로 $t-1$ 시점의 숨은 상태 $s_{t-1}$에 대해 나눠 더하는 것이다.

$\alpha_t(j) = \sum_i $==빈칸== 이다.

## 해설
$s_{t-1}$이 가질 수 있는 모든 값 $i$로 나눠서 더해도 전체 확률은 그대로다. 전확률법칙을 결합확률에 그대로 적용한 것이다.

**정답: $P(o_1,\dots,o_t,s_{t-1}=i,s_t=j)$**

## 예시
재귀식이 실제로 어떻게 굴러가는지 작은 2상태 HMM에 직접 대입해봅니다.

날씨가 $\text{Rain}$ 또는 $\text{Sun}$ 두 상태뿐이고 우산을 들고 오는지($\text{Umbrella}$) 관측한다고 합시다. 초기확률은 $\pi(\text{Rain})=0.6$, $\pi(\text{Sun})=0.4$이고 전이확률은 $P(\text{Rain}|\text{Rain})=0.7$, $P(\text{Rain}|\text{Sun})=0.4$, 방출확률은 $P(\text{Umbrella}|\text{Rain})=0.9$, $P(\text{Umbrella}|\text{Sun})=0.2$입니다.

첫날 우산을 봤다면 $\alpha_1$은 초기확률에 방출확률만 곱하면 됩니다.
$$\alpha_1(\text{Rain})=0.6\times0.9=0.54,\qquad \alpha_1(\text{Sun})=0.4\times0.2=0.08$$
둘째 날도 우산을 봤다면 재귀식대로 이전 $\alpha_1$들을 전이확률로 섞은 뒤 방출확률을 곱합니다.
$$\alpha_2(\text{Rain})=[0.54\times0.7+0.08\times0.4]\times0.9=0.41\times0.9=0.369$$
$$\alpha_2(\text{Sun})=[0.54\times0.3+0.08\times0.6]\times0.2=0.21\times0.2=0.042$$
둘째 날의 상태별 경로는 네 갈래지만 하나하나 나열하지 않고도 $\alpha_1$ 두 값과 전이확률만으로 $\alpha_2$를 바로 얻었습니다. 아래 증명은 이 재귀식이 시점이 아무리 늘어나도 경로를 일일이 나열할 필요 없이 항상 성립한다는 사실을 보입니다.
