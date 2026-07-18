---
slug: found-set-proposition-logic
theme: FOUND
domainLabel: 예비수학
subLabel: 예비수학 1부 · 수학의 언어 · 명제와 대우의 동치
title: 집합과 명제
related: 수학적 귀납법과 엄밀한 증명 감각 · 방정식과 부등식 다시 보기
---

## 도입
어떤 명제를 직접 증명하기 막막할 때 "대우를 증명해보라"는 말을 들어본 적 있을 거예요. 그런데 왜 원래 명제 대신 대우를 증명해도 되는지, 그 이유까지 따로 확인해본 적은 드물어요.

이 사이트에 있는 모든 증명은 결국 "어떤 조건을 가정하면 다른 조건이 반드시 따라온다"는 걸 보이는 작업이에요. 그리고 그 바탕에는 명제를 집합으로 바꿔 생각하는 습관이 깔려 있어요. 명제 $P(x)$가 참이 되는 $x$들을 모은 집합을 $S_P$, $Q(x)$가 참이 되는 $x$들을 모은 집합을 $S_Q$라고 하면, "$P(x)$이면 $Q(x)$이다"라는 명제는 $S_P\subseteq S_Q$라는 집합 사이의 포함관계로 정확히 번역돼요.

이렇게 번역해두면 "대우가 원래 명제와 동치다"라는 사실도 집합의 포함관계 문제로 바꿔서, 눈으로 보이게 증명할 수 있어요.

## 명제
전체집합 $U$ 위에서 정의된 명제 $P(x),\,Q(x)$에 대해 진리집합을 $S_P=\{x\in U: P(x)\}$, $S_Q=\{x\in U: Q(x)\}$라 하면, "$\forall x,\ P(x)\Rightarrow Q(x)$"가 참인 것과 그 대우 "$\forall x,\ \lnot Q(x)\Rightarrow\lnot P(x)$"가 참인 것은 동치이다.

## 그림
<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="360" height="220" fill="none" class="dg-line" stroke-width="1"/>
<text x="30" y="38" font-size="12" class="dg-dim">전체집합 U</text>
<circle cx="230" cy="145" r="85" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="6,3"/>
<text x="230" y="72" font-size="13" text-anchor="middle">S_Q</text>
<circle cx="185" cy="155" r="42" class="dg-accent"/>
<circle cx="185" cy="155" r="42" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="185" y="160" font-size="13" text-anchor="middle">S_P</text>
<text x="300" y="225" font-size="11" class="dg-dim">S_Q^c (바깥 전체)</text>
<text x="60" y="225" font-size="11" class="dg-dim">S_P^c ⊇ S_Q^c</text>
</svg>

_S_P가 S_Q 안에 들어있으면(원래 명제), 바깥쪽 여집합 관계는 반드시 뒤집혀 S_Q^c가 S_P^c 안에 들어간다(대우)._

## 문제
먼저 $S_P\subseteq S_Q$를 가정하고 $S_Q^c\subseteq S_P^c$를 보인다. 임의의 원소 $x\in S_Q^c$를 잡으면 $x\notin S_Q$이다. 만약 $x\in S_P$라면 가정 $S_P\subseteq S_Q$에 의해 $x\in S_Q$가 되어 방금 말한 $x\notin S_Q$와 모순된다. 그러므로 $x\notin S_P$, 즉 $x\in$==빈칸== 이다.

## 해설
x가 S_P의 원소라고 가정하면 모순이 생기므로 x는 S_P의 원소일 수 없어요. S_P의 원소가 아니라는 건 정의상 여집합 S_P^c의 원소라는 뜻이에요.

**정답: $S_P^c$**

## 예시
구체적인 명제로 확인해봅니다. 전체집합을 $U=\{1,2,3,4,5,6\}$으로 두고, $P(x)$를 "$x$는 $4$의 약수이다", $Q(x)$를 "$x$는 짝수이다"로 정해봅니다.

$P(x)$의 진리집합은 $S_P=\{1,2,4\}$이고, $Q(x)$의 진리집합은 $S_Q=\{2,4,6\}$이에요. $S_P\subseteq S_Q$인지 확인해보면 $1\in S_P$인데 $1\notin S_Q$이므로 포함관계가 성립하지 않아요. 실제로 $x=1$은 $4$의 약수이지만 짝수는 아니니, "$P(x)\Rightarrow Q(x)$"는 참이 아닙니다.

이번엔 $P(x)$를 "$x$는 $6$의 약수이다"로 바꿔봅니다. $S_P=\{1,2,3,6\}$인데 $3\in S_P$이고 $3\notin S_Q=\{2,4,6\}$이라, 이번에도 포함관계가 깨져요. $x=3$은 $6$의 약수이지만 짝수가 아니라는 반례예요.

이제 $P(x)$를 "$x$는 $2$의 배수이면서 $4$ 이하이다"로 정하면 $S_P=\{2,4\}$가 되고, 이번엔 $S_P\subseteq S_Q=\{2,4,6\}$이 실제로 성립해요. 대우로 확인해보면 $S_Q^c=\{1,3,5\}$이고 $S_P^c=\{1,3,5,6\}$인데, $S_Q^c\subseteq S_P^c$도 정확히 성립합니다. 원래 포함관계가 성립하는 경우에만 대우 쪽 포함관계도 함께 성립한다는 걸 숫자로 확인한 거예요.
