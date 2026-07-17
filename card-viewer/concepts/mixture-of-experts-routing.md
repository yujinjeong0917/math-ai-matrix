---
slug: mixture-of-experts-routing
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 트리 · 앙상블 구조
title: Mixture of Experts: 토큰마다 다른 전문가를 고르는 라우팅의 구조
related: 모든 구성원을 평가하는 밀집 앙상블과의 대조 · 연산 효율을 위해 일부만 계산에 참여시키는 다른 예
---

## 도입
모델 하나에 전문가라 부르는 여러 개의 작은 서브네트워크를 두고 입력마다 그중 일부만 골라서 쓰는 구조를 mixture of experts라 부릅니다. 라우터라 부르는 작은 게이팅 네트워크가 입력을 보고 각 전문가에 점수를 매기고 그중 점수가 높은 몇 개만 실제로 계산에 참여시킵니다. 배깅이나 그래디언트부스팅처럼 구성원 전부를 항상 평가하는 밀집 앙상블과 달리 이 방식은 평가하는 전문가 수를 고정해두고 전체 전문가 수만 늘릴 수 있습니다. 그 결과 모델이 담을 수 있는 지식의 총량과 실제로 한 번의 순전파에 드는 연산량이 서로 분리됩니다.

## 명제
전문가가 $E$개, 전문가 하나를 평가하는 비용이 $c$, 선택하는 전문가 수가 고정된 $k$일 때, 밀집 앙상블의 연산량은 $C_{dense}(E)=Ec$로 $E$에 정비례해서 늘어나지만 top-k 라우팅을 쓰는 MoE의 연산량은 $C_{moe}(E)\approx kc$로 $E$가 커져도 사실상 상수로 남는다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="90" width="60" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="50" y="114" font-size="11" text-anchor="middle">입력 x</text>
<line x1="80" y1="110" x2="150" y2="110" class="dg-line" stroke-width="1.5" />
<rect x="150" y="90" width="70" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="185" y="114" font-size="11" text-anchor="middle">라우터</text>
<line x1="220" y1="100" x2="300" y2="30" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="220" y1="105" x2="300" y2="80" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="220" y1="115" x2="300" y2="140" class="dg-line" stroke-width="1" stroke-dasharray="3,3" />
<line x1="220" y1="120" x2="300" y2="190" class="dg-line" stroke-width="1" stroke-dasharray="3,3" />
<rect x="300" y="12" width="80" height="36" class="dg-accent" />
<text x="340" y="34" font-size="11" text-anchor="middle">전문가1 g=0.73</text>
<rect x="300" y="62" width="80" height="36" class="dg-accent" />
<text x="340" y="84" font-size="11" text-anchor="middle">전문가2 g=0.27</text>
<rect x="300" y="122" width="80" height="36" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="3,3" />
<text x="340" y="144" font-size="11" text-anchor="middle" class="dg-dim">전문가3 (미활성)</text>
<rect x="300" y="172" width="80" height="36" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="3,3" />
<text x="340" y="194" font-size="11" text-anchor="middle" class="dg-dim">전문가4 (미활성)</text>
<line x1="380" y1="30" x2="430" y2="60" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="380" y1="80" x2="430" y2="60" class="dg-stroke-accent" stroke-width="2.5" />
<circle cx="440" cy="60" r="12" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="440" y="90" font-size="11" text-anchor="middle">y</text>
</svg>

_E=4개 중 top-k=2(굵은 실선)만 활성화, 나머지(점선)는 이번 입력에서 계산되지 않는다._

## 문제
먼저 전문가 하나를 평가하는 데 드는 연산량을 $c$라 하고 전문가 하나가 담고 있는 파라미터 수를 $p$라 하자. 전문가가 $E$개 있다면 모델 전체가 담는 파라미터 수, 즉 모델의 표현 용량은 각 전문가의 파라미터를 모두 합친 것이다. $P(E) = $==빈칸==이다.

## 해설
전문가 $E$개 각각이 독립적으로 $p$개의 파라미터를 갖고 이들을 모두 저장해야 하므로 총 파라미터 수는 $E$와 $p$의 곱이다. 전문가 수를 늘릴수록 이 용량은 아무 제약 없이 계속 커질 수 있다.

**정답: $Ep$**

## 예시
top-k 라우팅이 실제로 어떻게 계산되는지 게이트 값부터 직접 확인해봅니다.

전문가가 $E=4$개 있고 라우터가 입력 $x$에 대해 내놓은 점수(로짓)가 $z=(2.0,\,1.0,\,0.5,\,-1.0)$이라 합니다. 이 점수에 소프트맥스를 취해 게이트 값을 만듭니다.
$$g_i(x)=\frac{\exp(z_i)}{\sum_j\exp(z_j)}$$
계산하면 $\exp(2.0)\approx7.389$, $\exp(1.0)\approx2.718$, $\exp(0.5)\approx1.649$, $\exp(-1.0)\approx0.368$이고 합은 $\approx12.124$입니다. 따라서 게이트 값은 $g\approx(0.6095,\,0.2242,\,0.1360,\,0.0303)$입니다.

top-$k=2$이므로 점수가 가장 높은 전문가 1과 전문가 2만 고릅니다. 두 게이트 값의 합은 $0.6095+0.2242=0.8337$입니다. 이 둘만 다시 합이 1이 되도록 정규화하면 $g_1'=0.6095/0.8337\approx0.7311$이고 $g_2'=0.2242/0.8337\approx0.2689$입니다.

전문가 1과 2의 출력이 각각 $f_1(x)=(1,0)$, $f_2(x)=(0,1)$이라 하면 최종 출력은 다음과 같습니다.
$$y=g_1'f_1(x)+g_2'f_2(x)=(0.7311,\,0.2689)$$
전문가 3과 4는 이번 입력에 대해서는 아예 평가되지 않았습니다. 연산량 관점에서 보면 전문가 하나를 평가하는 비용을 $c=1$단위라 할 때 밀집 앙상블은 4개를 전부 평가해 비용이 $4$지만 top-2 MoE는 비용이 $2$로 절반입니다. 만약 전문가 수를 $E=100$으로 늘려도 top-2를 유지한다면 밀집 앙상블의 비용은 $100$까지 늘어나지만 MoE의 비용은 여전히 $2$에 가깝습니다. 아래 증명은 이 절약이 우연이 아니라 $k$를 고정해두는 한 항상 성립함을 보입니다.
