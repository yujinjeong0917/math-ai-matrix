---
slug: simpsons-paradox
theme: PROB
domainLabel: 확률 · 통계
subLabel: 확률의 기초
title: Simpson의 역설: 부분집단과 전체집단의 상관관계 반전
related: 공분산 0과 통계적 독립의 차이
---

## 도입
두 치료법 A, B를 비교할 때, 환자를 중증도별로 나눈 모든 부분집단에서 A가 B보다 성공률이 높더라도, 전체 환자를 합쳐서 보면 거꾸로 B가 더 높게 나올 수 있습니다. 이건 확률 계산이 틀려서가 아니라, 부분집단별로 A와 B에 배정된 환자 비율(가중치)이 서로 다르기 때문에 생기는 순수한 산술적 현상이에요.

## 명제
두 부분집단 $i=1,2$에서 성공률이 $\frac{a_i}{b_i}>\frac{c_i}{d_i}$ (그룹 A가 그룹 B보다 항상 높음)라 하더라도, 전체 합산 성공률은 $\frac{a_1+a_2}{b_1+b_2}<\frac{c_1+c_2}{d_1+d_2}$로 반전될 수 있다. 이 반전은 A와 B의 부분집단별 가중치(표본 비율)가 서로 다를 때만 일어나며, 가중치가 같으면 반전은 불가능하다.

## 그림
<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg">
<rect x="440" y="20" width="16" height="12" class="dg-accent"/>
<text x="460" y="30" font-size="11" class="dg-dim">A(개복수술)</text>
<rect x="540" y="20" width="16" height="12" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="3,2"/>
<text x="560" y="30" font-size="11" class="dg-dim">B(경피적시술)</text>
<line x1="40" y1="200" x2="580" y2="200" class="dg-line" stroke-width="1"/>
<rect x="65" y="60" width="30" height="140" class="dg-accent"/>
<rect x="105" y="70" width="30" height="130" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="3,2"/>
<text x="80" y="52" font-size="11" text-anchor="middle">93%</text>
<text x="120" y="62" font-size="11" text-anchor="middle">87%</text>
<text x="100" y="220" font-size="12" text-anchor="middle">작은 결석: A&gt;B</text>
<rect x="265" y="90" width="30" height="110" class="dg-accent"/>
<rect x="305" y="97" width="30" height="103" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="3,2"/>
<text x="280" y="82" font-size="11" text-anchor="middle">73%</text>
<text x="320" y="89" font-size="11" text-anchor="middle">69%</text>
<text x="300" y="220" font-size="12" text-anchor="middle">큰 결석: A&gt;B</text>
<rect x="465" y="83" width="30" height="117" class="dg-accent"/>
<rect x="505" y="76" width="30" height="124" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="3,2"/>
<text x="480" y="75" font-size="11" text-anchor="middle">78%</text>
<text x="520" y="68" font-size="11" text-anchor="middle">83%</text>
<text x="500" y="220" font-size="12" text-anchor="middle">전체 합산: B&gt;A (역전!)</text>
</svg>

_두 부분집단 모두에서 A(채움)가 B(점선 윤곽)보다 높지만, 부분집단별 표본 비율이 달라 전체 합산에서는 순위가 뒤바뀐다._

## 문제
전체 합산 성공률은 부분집단 성공률의 가중평균으로 쓸 수 있다. $\alpha=\frac{b_1}{b_1+b_2}$라 하면 A의 전체 성공률은 $\frac{a_1+a_2}{b_1+b_2}=\alpha\cdot\frac{a_1}{b_1}+(1-\alpha)\cdot\frac{a_2}{b_2}$이다. 마찬가지로 $\beta=\frac{d_1}{d_1+d_2}$라 하면 B의 전체 성공률은 ==빈칸==이다.

## 해설
같은 방식으로, B의 전체 성공률도 B 자신의 부분집단 표본 비율 $\beta$를 가중치로 쓴 가중평균이에요. 핵심은 A의 가중치 $\alpha$와 B의 가중치 $\beta$가 일반적으로 서로 다르다는 점입니다.

**정답: $\beta\cdot\frac{c_1}{d_1}+(1-\beta)\cdot\frac{c_2}{d_2}$**

## 예시
실제 신장결석 치료법 비교 자료(Charig et al., 1986)를 봅시다. 개복수술(A)과 경피적 시술(B)을 결석 크기별로 나누어 비교하면:

작은 결석: A는 $81/87\approx93.1\%$, B는 $234/270\approx86.7\%$ 성공 — A가 더 높음.

큰 결석: A는 $192/263\approx73.0\%$, B는 $55/80\approx68.75\%$ 성공 — 역시 A가 더 높음.

그런데 전체를 합치면 A는 $\frac{81+192}{87+263}=\frac{273}{350}=78.0\%$, B는 $\frac{234+55}{270+80}=\frac{289}{350}\approx82.6\%$로, 놀랍게도 **B가 더 높게** 뒤바뀝니다. 이는 계산 오류가 아니라, 개복수술(A)이 큰 결석(성공률이 원래 낮은 집단)에 훨씬 많이 배정되었기 때문입니다 — A 환자의 $263/350=75\%$가 큰 결석군인 반면 B 환자는 $80/350=23\%$만 큰 결석군입니다.
