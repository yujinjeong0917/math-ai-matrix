---
slug: rejection-sampling-correctness
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: 거부샘플링(Rejection Sampling)의 정확성: 제안분포에서 목표분포로
related: 중요도샘플링(일반) · 메트로폴리스-헤이스팅스
---

## 도입
목표분포 $p(x)$에서 곧바로 표본을 뽑기 어려울 때가 많습니다. 대신 표본을 뽑기 쉬운 제안분포 $q(x)$에서 일단 뽑아 놓고, 일부는 버리고 일부만 남기는 방법을 생각해볼 수 있습니다. 그런데 얼마나, 어떤 기준으로 버려야 남은 표본들이 정확히 $p$를 따르게 될까요.

거부샘플링의 답은 이렇습니다. 모든 $x$에서 $p(x)\le Mq(x)$를 만족하는 포락 상수(envelope constant) $M\ge1$을 하나 잡습니다. $q$에서 뽑은 $X$에 대해 균등분포 $U\sim\text{Unif}(0,1)$을 독립으로 하나 더 뽑아, $U\le p(X)/(Mq(X))$이면 수락하고 아니면 버립니다.

## 명제
$p,q$가 같은 지지집합 위의 확률밀도함수이고, 어떤 상수 $M\ge1$이 모든 $x$에 대해 $p(x)\le Mq(x)$를 만족한다고 하자. $X\sim q$와 $U\sim\text{Unif}(0,1)$이 서로 독립이고 $A=\{U\le p(X)/(Mq(X))\}$라 하면, $P(A)=1/M$이고 조건부분포 $(X\mid A)$는 정확히 $p$이다.

## 그림
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
<line x1="35" y1="170" x2="500" y2="170" class="dg-line" stroke-width="1"/>
<line x1="130" y1="122" x2="130" y2="80" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="190" y1="100" x2="190" y2="38" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="250" y1="90" x2="250" y2="20" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="310" y1="95" x2="310" y2="29" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="370" y1="113" x2="370" y2="64" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="430" y1="142" x2="430" y2="118" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="130" y1="170" x2="130" y2="122" class="dg-line" stroke-width="1.5"/>
<line x1="190" y1="170" x2="190" y2="100" class="dg-line" stroke-width="1.5"/>
<line x1="250" y1="170" x2="250" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="310" y1="170" x2="310" y2="95" class="dg-line" stroke-width="1.5"/>
<line x1="370" y1="170" x2="370" y2="113" class="dg-line" stroke-width="1.5"/>
<line x1="430" y1="170" x2="430" y2="142" class="dg-line" stroke-width="1.5"/>
<path d="M40,170 Q260,-130 480,170" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="6,3"/>
<path d="M40,170 Q260,10 480,170" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="52" y="32" font-size="12" class="dg-dim">Mq(x) (포락, 점선)</text>
<text x="295" y="72" font-size="12">p(x) (목표분포, 실선)</text>
<line x1="410" y1="180" x2="435" y2="180" class="dg-line" stroke-width="1.5"/>
<text x="441" y="184" font-size="11" class="dg-dim">수락(실선 해칭)</text>
<line x1="410" y1="192" x2="435" y2="192" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<text x="441" y="196" font-size="11" class="dg-dim">기각(점선 해칭)</text>
</svg>

_제안분포 $q$에서 뽑은 점이 $p(x)$ 아래(실선 해칭)에 들어오면 수락, $p(x)$와 포락 $Mq(x)$ 사이(점선 해칭)에 들어오면 기각된다._

## 문제
$x$ 근방에서 $X\in dx$이고 동시에 사건 $A$가 일어날 결합확률은 $U$에 대해 적분해서 얻는다. $U\sim\text{Unif}(0,1)$이므로 $P(U\le t)=t$ (단 $0\le t\le1$)이고, 가정 $p(x)\le Mq(x)$ 덕분에 $t=p(x)/(Mq(x))$는 항상 $[0,1]$ 안에 있다. 따라서 $P(X\in dx, A) = q(x)\cdot\dfrac{p(x)}{Mq(x)}\,dx = $==빈칸== 이다.

## 해설
$q(x)$가 분자와 분모에 공통으로 있어 약분되고 $p(x)/M$만 남아요.

**정답: $\dfrac{p(x)}{M}\,dx$**

## 예시
추상적인 증명에 들어가기 전에 구체적인 밀도로 명제를 확인해봅니다. 목표분포를 $[0,1]$ 위의 삼각형 밀도 $p(x)=2x$로, 제안분포를 균등분포 $q(x)=1$로 잡습니다.

$x\in[0,1]$에서 $p(x)/q(x)=2x\le 2$이므로 $M=2$로 잡을 수 있습니다. 수락 규칙은 $U\le \dfrac{p(x)}{Mq(x)}=\dfrac{2x}{2}=x$가 됩니다. 즉 뽑힌 값이 클수록 수락될 확률도 커집니다.

예를 들어 $x=0.5$가 뽑혔다면 수락확률은 $0.5$입니다. 전체 수락확률을 직접 적분해서 확인하면
$$P(A)=\int_0^1 q(x)\cdot\frac{p(x)}{Mq(x)}\,dx=\int_0^1 \frac{2x}{2}\,dx=\int_0^1 x\,dx=\frac12$$
이고, 이는 명제가 말하는 $1/M=1/2$과 정확히 일치합니다.
