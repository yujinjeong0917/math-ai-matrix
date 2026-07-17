---
slug: latent-dirichlet-allocation
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 잠재디리클레할당(LDA) 토픽모델: 생성구조와 collapsed Gibbs 업데이트
related: 켤레사전분포 3종
---

## 도입
문서 하나가 여러 주제를 섞어 쓴 것이라는 직관을 확률모델로 만든 것이 LDA 토픽모델입니다. 사전분포로 디리클레를, 관측단계에서 다항(범주형)을 쓰기 때문에 앞서 다룬 디리클레-다항 켤레성이 그대로 학습 알고리즘의 핵심이 됩니다.

## 명제
판(plate) 표기로 정의된 LDA 생성모델에서 $\theta_d$(문서-토픽 비율), $\phi_k$(토픽-단어 분포)를 디리클레-다항 켤레성으로 적분해 없애면, 단어-토픽 배정의 전체조건부는 $$p(z_{d,n}=k\mid z_{-(d,n)},w)\propto (n_{d,k}^{\neg dn}+\alpha_k)\cdot\frac{n_{k,w_{d,n}}^{\neg dn}+\beta_{w_{d,n}}}{n_k^{\neg dn}+\sum_v\beta_v}$$ 로 닫힌형이며, 이것이 collapsed Gibbs sampling의 업데이트 규칙이다.

## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<rect x="70" y="40" width="380" height="190" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="430" y="222" font-size="12">D</text>
<rect x="150" y="100" width="180" height="90" rx="4" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="313" y="182" font-size="12">N</text>
<rect x="385" y="60" width="110" height="110" rx="4" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="475" y="162" font-size="12">K</text>
<circle cx="40" cy="150" r="11" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="35" y="154" font-size="12">α</text>
<circle cx="110" cy="150" r="16" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="97" y="155" font-size="10">θd</text>
<circle cx="195" cy="145" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="190" y="149" font-size="11">z</text>
<circle cx="280" cy="145" r="14" class="dg-accent"/>
<text x="273" y="149" font-size="11">w</text>
<circle cx="440" cy="115" r="16" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="428" y="119" font-size="10">φk</text>
<circle cx="440" cy="35" r="10" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="434" y="39" font-size="12">β</text>
<line x1="51" y1="150" x2="90" y2="150" class="dg-stroke-ink" stroke-width="1.5"/>
<path d="M85,146 L94,150 L85,154" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="126" y1="149" x2="177" y2="146" class="dg-stroke-ink" stroke-width="1.5"/>
<path d="M170,141 L180,146 L170,151" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="209" y1="145" x2="262" y2="145" class="dg-stroke-ink" stroke-width="1.5"/>
<path d="M255,140 L265,145 L255,150" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="440" y1="45" x2="440" y2="97" class="dg-stroke-ink" stroke-width="1.5"/>
<path d="M435,90 L440,100 L445,90" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="424" y1="122" x2="298" y2="140" class="dg-stroke-ink" stroke-width="1.5"/>
<path d="M304,133 L296,140 L306,144" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="70" y="28" font-size="11">문서마다 θd~Dir(α), 토픽마다 φk~Dir(β), 단어마다 z~Cat(θd), w~Cat(φz)</text>
<text x="70" y="252" font-size="10" class="dg-dim">채운 원 w = 관측된 단어, 빈 원 = 잠재변수</text>
</svg>

_문서 판(D) 안 단어 판(N)에서 θd, z, w가 반복되고, 토픽 판(K)의 φk가 관측단어 w를 함께 생성한다._

## 문제
먼저 문서 $d$에서 $\theta_d$를 적분해 없앤다. $z_{d,1:N_d}\mid\theta_d$는 각 위치가 독립인 범주형이므로 토픽별 등장횟수 벡터 $n_d=(n_{d,1},\dots,n_{d,K})$ 관점에서 디리클레-다항 켤레성이 그대로 적용된다. 디리클레 사전분포와 다항 우도를 곱해 정규화하면 나오는 주변우도는 $p(z_{d,:}\mid\alpha) = $==빈칸==

## 해설
디리클레-다항 주변우도는 정규화상수의 비, 즉 다변량 베타함수 $B(x)=\prod_k\Gamma(x_k)/\Gamma(\sum_kx_k)$를 써서 $B(n_d+\alpha)/B(\alpha)$로 정확히 표현됩니다(다항계수는 $k$에 무관한 상수라 생략).

**정답: $\dfrac{B(n_d+\alpha)}{B(\alpha)}$**

## 예시
토픽 $K=2$, 어휘 $V=3$(단어 A,B,C), $\alpha=(0.1,0.1)$, $\beta=0.01$(모든 단어 동일)이라 하자. 지금 다시 뽑을 단어(A)의 토큰을 제외하면 그 문서의 토픽별 카운트는 $n_d=(3,1)$(토픽1에 3개, 토픽2에 1개), 전체 말뭉치에서 토픽1은 단어A를 5번(총 10개 단어), 토픽2는 단어A를 1번(총 7개 단어) 배정했다고 하자.

공식에 대입하면 토픽1의 비정규화 확률은 $(3+0.1)\cdot(5+0.01)/(10+3\cdot0.01)=3.1\cdot5.01/10.03\approx1.548$, 토픽2는 $(1+0.1)\cdot(1+0.01)/(7+3\cdot0.01)=1.1\cdot1.01/7.03\approx0.158$ 이다. 정규화하면 $p(z=1)\approx0.907$, $p(z=2)\approx0.093$으로, 이 토큰은 압도적으로 토픽1에 재배정될 확률이 높다 — 문서가 이미 토픽1을 선호하고(3 vs 1) 토픽1이 단어 A를 많이 써왔기(5 vs 1) 때문이다.
