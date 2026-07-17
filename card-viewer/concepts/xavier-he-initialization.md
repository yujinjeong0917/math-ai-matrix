---
slug: xavier-he-initialization
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 가중치 초기화: 순전파 분산을 보존하는 스케일은 어디서 오는가
related: 그래디언트 소실·폭발 · 역전파(체인룰)의 정확성 · 경사하강법의 하강 보장
---

## 도입
가중치를 너무 크게 초기화하면 층을 거칠 때마다 신호의 크기가 기하급수적으로 폭발하고, 너무 작게 초기화하면 반대로 신호가 기하급수적으로 사그라들어요. 둘 다 학습 초반부터 그래디언트가 제대로 흐르지 못하게 막아요. 그렇다면 가중치의 분산을 얼마로 잡아야 층을 거쳐도 신호의 분산이 그대로 유지될까요. 이 질문에 답을 내놓는 것이 자비에 초기화이고, 활성함수로 ReLU를 쓸 때는 그 답이 정확히 두 배로 바뀝니다. 왜 그런지 확인해 봅니다.

## 명제
$h=\sum_{i=1}^{n_{in}}w_ix_i$에서 $w_i,x_i$가 서로 독립이고 평균 0인 확률변수라 하면 $\mathrm{Var}(h)=\mathrm{Var}(x)$를 만족하는 가중치 분산은 $\mathrm{Var}(w)=1/n_{in}$이다(자비에 초기화). 활성함수가 ReLU라서 다음 층으로 넘어가는 값이 절반은 0이 되는 경우에는 $\mathrm{Var}(w)=2/n_{in}$이어야 같은 성질이 유지된다(He 초기화).

## 그림
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
<line x1="70" y1="20" x2="70" y2="190" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="70" y1="190" x2="580" y2="190" class="dg-stroke-ink" stroke-width="1.5"/>
<path d="M70,150 L160,120 L250,85 L340,55 L430,35 L520,22 L580,18" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<path d="M70,150 L160,162 L250,172 L340,180 L430,185 L520,188 L580,189" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="5,4"/>
<path d="M70,150 L160,148 L250,151 L340,149 L430,150 L520,149 L580,150" fill="none" class="dg-stroke-accent" stroke-width="3"/>
<circle cx="160" cy="148" r="3" class="dg-accent"/>
<circle cx="340" cy="149" r="3" class="dg-accent"/>
<circle cx="520" cy="149" r="3" class="dg-accent"/>
<text x="75" y="35" font-size="12">폭발 (분산 과대 초기화)</text>
<text x="380" y="195" font-size="12" class="dg-dim">소실 (분산 과소 초기화)</text>
<text x="330" y="135" font-size="12">일정 유지 (Xavier / He)</text>
<text x="500" y="205" font-size="12" text-anchor="middle" class="dg-dim">층 깊이 →</text>
</svg>

_층을 거칠수록 신호 분산이 폭발·소실하는 두 경우와, 적절한 스케일로 분산이 그대로 유지되는 경우를 비교한다._

## 문제
$h$는 $n_{in}$개의 곱 $w_ix_i$를 더한 합이다. $w_i$가 서로 독립이고 평균이 $0$이면 서로 다른 두 항 $w_ix_i$와 $w_jx_j$($i\neq j$)의 공분산은 $0$이 되어 사라진다. 그러니 합의 분산은 각 항의 분산을 단순히 더한 것과 같다. 모든 항이 서로 같은 분포를 따르므로 $n_{in}$개의 동일한 분산을 더한 값이 된다: $\mathrm{Var}(h) = $==빈칸== 이다.

## 해설
서로 독립인 항들의 합의 분산은 각 항의 분산의 합과 같다는 성질을 썼다. $n_{in}$개의 항이 모두 같은 분포 $w_ix_i$를 따르므로 그 합은 $\mathrm{Var}(w_1x_1)$을 $n_{in}$번 더한 것과 같다.

**정답: $n_{in}\cdot\mathrm{Var}(w_1x_1)$**

## 예시
추상적인 조건을 확인하기 전에 $n_{in}=100$인 완전연결층 하나로 자비에 조건과 He 조건이 실제로 분산을 어떻게 맞춰주는지 계산해봅니다.

**자비에 초기화.** 입력 분산이 $\mathrm{Var}(x)=1$이라 하고 자비에 조건대로 $\mathrm{Var}(w)=1/100=0.01$로 잡습니다. 이때 출력 분산은 다음과 같습니다.
$$\mathrm{Var}(h)=n_{in}\cdot\mathrm{Var}(w)\cdot\mathrm{Var}(x)=100\times0.01\times1=1$$
입력 분산 $1$이 출력에서도 그대로 $1$로 유지됩니다.

**He 초기화.** 이번엔 활성함수로 ReLU를 쓰는 은닉층을 생각합니다. 이전 층의 사전활성값이 $\mathrm{Var}(h_l)=1$인 평균 0 대칭분포를 따른다고 하면, ReLU를 거친 값의 이차모멘트는 $E[a_l^2]=\tfrac12\mathrm{Var}(h_l)=0.5$로 절반이 됩니다. 만약 여기서도 자비에 조건 $\mathrm{Var}(w)=0.01$을 그대로 쓴다면 다음 층의 분산은 다음처럼 절반으로 줄어듭니다.
$$\mathrm{Var}(h_{l+1})=100\times0.01\times0.5=0.5$$
층을 거칠 때마다 분산이 계속 절반씩 줄어드는 셈입니다. 그런데 He 조건대로 $\mathrm{Var}(w)=2/100=0.02$로 바꾸면 다음과 같습니다.
$$\mathrm{Var}(h_{l+1})=100\times0.02\times0.5=1$$
ReLU가 신호를 절반으로 줄이는 만큼 가중치 분산을 정확히 두 배로 키워서 다시 상쇄한 것입니다. 아래 증명은 이 절반과 두 배가 특정 숫자의 우연이 아니라 ReLU의 대칭성에서 항상 정확히 나온다는 것을 보입니다.
