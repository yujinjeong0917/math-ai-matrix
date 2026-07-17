---
slug: particle-filter-sequential-importance
theme: PROB
domainLabel: 확률 · 통계
subLabel: 마르코프 · 확률과정
title: 순차중요도샘플링과 입자필터: 가중치의 재귀적 업데이트
related: 중요도샘플링(일반) · 칼만필터(선형-가우시안 특수사례)
---

## 도입
상태공간모형에서 잠재상태 $x_t$가 마르코프 전이 $p(x_t\mid x_{t-1})$를 따르고 관측 $y_t$가 $p(y_t\mid x_t)$로 생성될 때, 우리가 원하는 것은 필터링 분포 $p(x_{1:t}\mid y_{1:t})$입니다. 상태공간이 비선형이거나 비가우시안이면 칼만필터처럼 닫힌형 해가 없어, 매 시점마다 전체 경로에 중요도샘플링을 새로 적용해야 하는데 이는 계산량이 시간에 따라 계속 늘어난다는 문제가 있습니다.

순차중요도샘플링(SIS, 입자필터의 핵심)은 제안분포를 시점별로 분해해서 이전 시점의 가중치를 재활용하는 재귀 공식을 만듭니다. 이 재귀 덕분에 매 시점마다 전체 경로를 다시 계산할 필요 없이 새 관측 하나만 반영해 가중치를 갱신할 수 있습니다.

## 명제
제안분포가 $q(x_{1:t}\mid y_{1:t})=q(x_1\mid y_1)\prod_{k=2}^t q(x_k\mid x_{1:k-1},y_{1:k})$로 순차 분해되고, 비정규화 가중치를 $w_t=\tilde p(x_{1:t},y_{1:t})/q(x_{1:t}\mid y_{1:t})$로 정의하면(단 $\tilde p(x_{1:t},y_{1:t})=p(x_1)\prod_{k=2}^tp(x_k\mid x_{k-1})\prod_{k=1}^tp(y_k\mid x_k)$), 가중치는 $w_t = w_{t-1}\cdot\dfrac{p(x_t\mid x_{t-1})p(y_t\mid x_t)}{q(x_t\mid x_{1:t-1},y_{1:t})}$로 재귀적으로 계산된다.

## 그림
<svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg">
<text x="110" y="22" font-size="12" text-anchor="middle" class="dg-dim">① 균등 가중치</text>
<text x="410" y="22" font-size="12" text-anchor="middle" class="dg-dim">② 전파+가중치 갱신</text>
<text x="700" y="22" font-size="12" text-anchor="middle" class="dg-dim">③ 재표본(균등 복원)</text>
<circle cx="110" cy="60" r="9" class="dg-accent"/>
<circle cx="110" cy="110" r="9" class="dg-accent"/>
<circle cx="110" cy="160" r="9" class="dg-accent"/>
<circle cx="110" cy="210" r="9" class="dg-accent"/>
<circle cx="110" cy="260" r="9" class="dg-accent"/>
<line x1="122" y1="60" x2="396" y2="60" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<line x1="122" y1="110" x2="396" y2="110" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<line x1="122" y1="160" x2="396" y2="160" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<line x1="122" y1="210" x2="396" y2="210" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<line x1="122" y1="260" x2="396" y2="260" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<circle cx="410" cy="60" r="4" fill="none" class="dg-dim" stroke-width="1.5" stroke-dasharray="3,2"/>
<circle cx="410" cy="110" r="20" class="dg-accent"/>
<circle cx="410" cy="160" r="6" fill="none" class="dg-dim" stroke-width="1.5" stroke-dasharray="3,2"/>
<circle cx="410" cy="210" r="15" class="dg-accent"/>
<circle cx="410" cy="260" r="3" fill="none" class="dg-dim" stroke-width="1.5" stroke-dasharray="3,2"/>
<text x="426" y="64" font-size="11" class="dg-dim">×(폐기)</text>
<text x="426" y="264" font-size="11" class="dg-dim">×(폐기)</text>
<path d="M420,102 Q560,60 690,60" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<path d="M420,110 Q560,110 690,110" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<path d="M416,160 Q560,160 690,160" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<path d="M420,210 Q560,210 690,210" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<path d="M420,218 Q560,260 690,260" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<circle cx="700" cy="60" r="9" class="dg-accent"/>
<circle cx="700" cy="110" r="9" class="dg-accent"/>
<circle cx="700" cy="160" r="9" class="dg-accent"/>
<circle cx="700" cy="210" r="9" class="dg-accent"/>
<circle cx="700" cy="260" r="9" class="dg-accent"/>
</svg>

_원의 크기가 입자 가중치를 나타낸다. 가중치가 큰 입자(실선 채움)는 재표본에서 여러 번 복제되고, 작은 입자(점선 윤곽)는 폐기되며 균등 가중치가 복원된다._

## 문제
마르코프성에 의해 결합확률은 $\tilde p(x_{1:t},y_{1:t}) = \tilde p(x_{1:t-1},y_{1:t-1})\cdot p(x_t\mid x_{t-1})\cdot p(y_t\mid x_t)$로 인수분해된다. $x_t$가 $x_{t-1}$에만, $y_t$가 $x_t$에만 의존한다는 상태공간모형의 가정에서 바로 나온다. 제안분포의 분모 역시 순차분해 가정에 의해 $q(x_{1:t}\mid y_{1:t}) = q(x_{1:t-1}\mid y_{1:t-1})\cdot$==빈칸== 로 쪼개진다.

## 해설
제안분포의 순차분해 정의 $q(x_{1:t}\mid y_{1:t})=q(x_1\mid y_1)\prod_{k=2}^tq(x_k\mid x_{1:k-1},y_{1:k})$에서 마지막 $k=t$ 항이 바로 이 조건부분포예요.

**정답: $q(x_t\mid x_{1:t-1},y_{1:t})$**

## 예시
이산 상태 $x_t\in\{0,1\}$과 잡음 섞인 이진 센서 $y_t\in\{0,1\}$로 구성된 장난감 모형으로 재귀식을 직접 확인합니다. 관측모형은 맞을 때 $p(y_t\mid x_t)=0.9$, 틀릴 때 $0.1$이고, 전이모형은 $p(x_2=1\mid x_1=1)=0.8$이라 합시다. 제안분포로 전이분포 그 자체 $q(x_t\mid x_{1:t-1},y_{1:t})=p(x_t\mid x_{t-1})$ (부트스트랩 필터)를 쓰면, 재귀식의 분자·분모가 정확히 약분되어 $w_t=w_{t-1}\cdot p(y_t\mid x_t)$로 단순해집니다.

입자 하나가 $x_1=1$이고 $y_1=1$을 관측했다면 초기 가중치는 $w_1=p(y_1\mid x_1=1)=0.9$입니다. 이 입자가 전이분포에서 $x_2=1$로 이동하고 $y_2=1$을 관측했다면
$$w_2=w_1\cdot p(y_2\mid x_2=1)=0.9\times0.9=0.81$$
로 갱신됩니다. 전체 경로 $(x_1,x_2)$의 결합확률을 처음부터 다시 계산하지 않고, 이전 가중치에 새 관측 하나만 곱해서 갱신했다는 점이 재귀식의 핵심입니다.
