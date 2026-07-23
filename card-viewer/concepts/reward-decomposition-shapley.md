---
slug: reward-decomposition-shapley
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 게임이론 기반
title: 보상분해 Shapley: 멀티에이전트의 공로 배분
related: SHAP값 · 정책 국소설명
---

## 도입
에이전트 집합을 $N$이라 하고 부분집합 $S \subseteq N$이 협력할 때 얻는 보상을 특성함수 $v(S)$로 정의한다. $v(S)$는 보통 $S$에 속한 에이전트는 실제 정책대로 행동하고 나머지는 아무 행동도 하지 않거나 미리 정한 기본 정책을 따를 때 환경에서 얻는 누적 보상의 기댓값으로 잡는다. 이 $v(S)$에 섀플리 값 공식 $\phi_i = \sum_{S \subseteq N\setminus\{i\}} \frac{|S|!\,(n-|S|-1)!}{n!}\big[v(S\cup\{i\}) - v(S)\big]$을 그대로 적용하면 에이전트 $i$의 몫을 얻는다.

단일 에이전트 강화학습에서는 보상이 어차피 하나의 에이전트 몫이라 배분 문제 자체가 없다. 하지만 여러 에이전트가 공유 보상을 받는 협력형 멀티에이전트 환경에서는 특정 에이전트가 보상 대부분을 만들어냈는지 아니면 다른 에이전트에 무임승차하고 있는지를 학습 곡선만 보고는 구분하기 어렵다. 보상분해 Shapley는 이 무임승차 여부를 수치로 드러낸다.

실제 계산에서는 에이전트 수가 늘어나면 $2^n$개의 부분집합을 모두 평가하는 비용이 커지므로 무작위로 참여 순서를 샘플링해서 근사하거나 유사한 역할을 하는 에이전트를 묶어 그룹 단위로 섀플리 값을 근사하는 방법을 쓴다. 이렇게 구한 공로 배분은 학습이 끝난 뒤 사후 분석뿐 아니라 개별 에이전트에게 보상을 나눠주는 신용 할당 학습 신호로도 활용된다.

## 명제


## 그림
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="190" x2="560" y2="190" class="dg-line" stroke-width="1.5"/>
<rect x="70" y="110" width="70" height="80" class="dg-accent"/>
<text x="105" y="100" font-size="12" text-anchor="middle">에이전트 1</text>
<text x="105" y="205" font-size="12" text-anchor="middle" class="dg-dim">φ=8</text>
<rect x="200" y="150" width="70" height="40" class="dg-dim"/>
<text x="235" y="140" font-size="12" text-anchor="middle">에이전트 2</text>
<text x="235" y="205" font-size="12" text-anchor="middle" class="dg-dim">φ=4</text>
<rect x="330" y="130" width="70" height="60" class="dg-accent"/>
<text x="365" y="120" font-size="12" text-anchor="middle">에이전트 3</text>
<text x="365" y="205" font-size="12" text-anchor="middle" class="dg-dim">φ=6</text>
<rect x="460" y="70" width="70" height="120" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="495" y="60" font-size="13" text-anchor="middle">팀 보상</text>
<text x="495" y="205" font-size="12" text-anchor="middle">v(N)=18</text>
</svg>

_세 에이전트의 섀플리 값을 더하면 팀 전체 보상과 정확히 같아진다._

## 문제
에이전트가 3명($N=\{1,2,3\}$, $n=3$)인 협력형 환경을 생각하자. 섀플리 값 공식의 가중치는 $w(s) = \dfrac{s!\,(n-s-1)!}{n!}$인데, $n=3$일 때 $s=0$이면 $w(0)=\dfrac{0!\cdot 2!}{3!}=\dfrac{2}{6}=\dfrac{1}{3}$이고 $s=2$이면 $w(2)=\dfrac{2!\cdot 0!}{3!}=\dfrac{2}{6}=\dfrac{1}{3}$이다. $s=1$일 때는 $w(1) = $==빈칸== 이다.

## 해설
s=1이면 1!·(3-1-1)! = 1!·1! = 1이고 이를 3!=6으로 나누면 1/6이 되기 때문이에요.

**정답: $\dfrac{1}{6}$**

## 예시

