---
slug: rbm-bipartite-conditional-independence
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 그래프 · 탐색
title: 제한볼츠만머신(RBM)의 이분그래프 구조와 조건부독립
hook: 제한볼츠만머신(RBM)은 가시유닛 $v$와 은닉유닛 $h$ 사이에만 간선이 있고, 가시-가시, 은닉-은닉 간선은 전혀 없는 이분(bipartite) 그래프 구조를 갖습니다.
related: 마르코프랜덤필드 인수분해 · 대조발산
---

## 기본설명
RBM의 에너지함수를 $E(v,h)=-a^Tv-b^Th-v^TWh$, 결합분포를 $p(v,h)=\frac1Z e^{-E(v,h)}$라 하자. 그래프가 이분구조(즉 에너지에 $h_j h_k$ 형태의 항이 전혀 없음)이기 때문에, 가시유닛이 주어졌을 때 은닉유닛들은 서로 조건부독립이다: $p(h\mid v)=\prod_{j=1}^F p(h_j\mid v)$이고 각 $p(h_j{=}1\mid v)=\sigma\big(b_j+\sum_iv_iW_{ij}\big)$(마찬가지로 $p(v\mid h)=\prod_ip(v_i\mid h)$도 성립).

## 문제
$v$를 고정하면 $p(h\mid v)\propto\exp(-E(v,h))=\exp\Big(b^Th+v^TWh\Big)=\exp\Big(\sum_{j=1}^F\big[b_j+\textstyle\sum_iv_iW_{ij}\big]h_j\Big) = $==빈칸== 로, 지수 안이 $j$에 대한 합으로 완전히 분리된다.

## 해설
지수함수는 합을 곱으로 바꿔주므로, $\exp(\sum_j(\cdots)_j)=\prod_j\exp((\cdots)_j)$가 돼요. 각 인자가 오직 $h_j$ 하나에만 의존한다는 게 핵심이에요.

**정답: $\prod_{j=1}^F \exp\!\big(\big[b_j+\textstyle\sum_iv_iW_{ij}\big]h_j\big)$**

## 예시
가시유닛 2개, 은닉유닛 2개인 작은 RBM으로 확인합니다. $W=\begin{pmatrix}1&-1\\2&0.5\end{pmatrix}$(행이 $v_i$, 열이 $h_j$), $a=(0,0)$, $b=(0.5,-0.5)$이고 $v=(1,0)$을 관측했다고 하죠.

$(v^TW)_1=1\times1+0\times2=1$, $(v^TW)_2=1\times(-1)+0\times0.5=-1$이므로, 이론값은 $p(h_1{=}1\mid v)=\sigma(0.5+1)=\sigma(1.5)\approx0.8176$, $p(h_2{=}1\mid v)=\sigma(-0.5-1)=\sigma(-1.5)\approx0.1824$입니다.

직접 확인을 위해, $v$가 주어졌을 때 $h$에 대한 비정규화 확률 $\propto\exp\big((b_1{+}1)h_1+(b_2{-}1)h_2\big)=\exp(1.5h_1)\exp(-1.5h_2)$를 네 조합에 대해 계산하면 $(0,0){:}1,\ (0,1){:}e^{-1.5}\approx0.2231,\ (1,0){:}e^{1.5}\approx4.4817,\ (1,1){:}e^0=1$이고 합은 $\approx6.7048$입니다. 정규화하면 $p(1,0)\approx0.6684$, $p(1,1)\approx0.1491$이므로 $p(h_1{=}1)=p(1,0)+p(1,1)\approx0.8176$로 이론값과 일치합니다. 또한 $p(h_1{=}1)p(h_2{=}1)\approx0.8176\times0.1824\approx0.1491=p(1,1)$로 정확히 맞아떨어져, $h_1,h_2$가 $v$ 조건부로 독립임이 수치로도 확인됩니다.
