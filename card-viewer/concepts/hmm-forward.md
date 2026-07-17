---
slug: hmm-forward
theme: PROB
domainLabel: 확률 · 통계
subLabel: 마르코프 · 확률과정
title: 은닉마르코프모델 전방 알고리즘의 재귀식
related: 
---

## 도입
HMM은 눈에 보이지 않는 상태 $s_t$가 순서대로 바뀌면서 매 시점 관측 $o_t$를 하나씩 내놓는다고 가정해요. 문제는 지금까지의 관측 $o_1,\dots,o_t$만 보고 현재 숨은 상태가 무엇일지 확률을 계산하려면, 있을 수 있는 모든 상태 경로를 다 따져야 할 것처럼 보인다는 거예요. 경로 수는 시점이 늘어날수록 지수적으로 불어나요. 전방 알고리즘은 이 계산을 재귀식 하나로 압축해서 그 폭발을 막아요.

## 명제
$\alpha_t(j)=P(o_1,\dots,o_t,s_t=j)$로 정의하면 $\alpha_t(j) = \left[\sum_i\alpha_{t-1}(i)P(s_t=j\mid s_{t-1}=i)\right]P(o_t\mid s_t=j)$ 이다.

## 그림
<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg">
  <text x="120" y="25" font-size="12" class="dg-dim">시점 t-1</text>
  <text x="320" y="25" font-size="12" class="dg-dim">시점 t</text>
  <line x1="230" y1="40" x2="230" y2="250" class="dg-line" stroke-width="1" stroke-dasharray="2,4"/>
  <circle cx="140" cy="70" r="18" fill="none" class="dg-stroke-ink" stroke-width="1.6"/>
  <circle cx="140" cy="150" r="18" fill="none" class="dg-stroke-ink" stroke-width="1.6"/>
  <circle cx="140" cy="230" r="18" fill="none" class="dg-stroke-ink" stroke-width="1.6"/>
  <text x="120" y="75" font-size="11">α(1)</text>
  <text x="120" y="155" font-size="11">α(2)</text>
  <text x="120" y="235" font-size="11">α(3)</text>
  <circle cx="340" cy="150" r="20" class="dg-accent"/>
  <circle cx="340" cy="70" r="16" fill="none" class="dg-line" stroke-width="1.2" stroke-dasharray="4,3"/>
  <circle cx="340" cy="230" r="16" fill="none" class="dg-line" stroke-width="1.2" stroke-dasharray="4,3"/>
  <text x="328" y="155" font-size="12" font-weight="700">αₜ(j)</text>
  <line x1="158" y1="70" x2="320" y2="145" class="dg-stroke-accent" stroke-width="2.4"/>
  <polygon points="320,145 306,140 310,152" class="dg-accent"/>
  <line x1="158" y1="150" x2="320" y2="150" class="dg-stroke-accent" stroke-width="2.4"/>
  <polygon points="320,150 306,145 306,155" class="dg-accent"/>
  <line x1="158" y1="230" x2="320" y2="155" class="dg-stroke-accent" stroke-width="2.4"/>
  <polygon points="320,155 306,158 310,146" class="dg-accent"/>
  <text x="200" y="105" font-size="10">P(j|1)</text>
  <text x="220" y="140" font-size="10">P(j|2)</text>
  <text x="200" y="200" font-size="10">P(j|3)</text>
  <text x="360" y="220" font-size="11" class="dg-dim">···이어지는 시점</text>
</svg>

_시점 t-1의 모든 상태(원)에서 화살표가 αₜ(j)(강조 원)로 모여 재귀적으로 합산되고, 나머지 상태(점선 원)는 같은 방식으로 병렬 계산된다._

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
