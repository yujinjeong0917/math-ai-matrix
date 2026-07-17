---
slug: markov-random-field-hammersley-clifford
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 그래프 · 탐색
title: 마르코프랜덤필드의 인수분해: Hammersley-Clifford 정리
related: RBM의 이분그래프 조건부독립 · 정규화 절단의 완화
---

## 도입
무방향 그래프로 변수들 사이의 의존관계를 표현하고 싶습니다. 그래프에서 어떤 집합으로 분리된 두 부분은 조건부독립이어야 한다는 마르코프성과, 확률분포가 클리크(완전부분그래프)별 포텐셜함수의 곱으로 인수분해된다는 깁스분포 — 이 둘은 얼핏 다른 이야기처럼 보이지만, 분포가 어디에서도 0이 아니기만 하면(양성 조건) 완전히 같은 것을 말하고 있습니다. 이것이 Hammersley-Clifford 정리입니다.

## 명제
그래프 $G=(V,E)$ 위의 확률변수 $X=(X_1,\ldots,X_n)$가 모든 $x$에서 $p(x)>0$을 만족한다고 하자(양성 조건). 이때 $p$가 $G$에 대해 (국소/전역) 마르코프 성질을 만족하는 것과, $p$가 $G$의 극대 클리크 집합 $\mathcal C$에 대해 $p(x)=\frac1Z\prod_{c\in\mathcal C}\psi_c(x_c)$로 인수분해되는 것은 동치이다.

## 그림
<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">
<rect x="55" y="65" width="140" height="70" rx="10" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3" />
<rect x="255" y="65" width="140" height="70" rx="10" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3" />
<line x1="90" y1="100" x2="220" y2="100" class="dg-line" stroke-width="1.5" />
<line x1="220" y1="100" x2="360" y2="100" class="dg-line" stroke-width="1.5" />
<circle cx="90" cy="100" r="15" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="220" cy="100" r="15" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="360" cy="100" r="15" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="90" y="105" font-size="12" text-anchor="middle">X₁</text>
<text x="220" y="105" font-size="12" text-anchor="middle">X₂</text>
<text x="360" y="105" font-size="12" text-anchor="middle">X₃</text>
<text x="125" y="60" font-size="11" text-anchor="middle">ψ₁₂</text>
<text x="325" y="60" font-size="11" text-anchor="middle">ψ₂₃</text>
<path d="M 90 82 Q 220 20 360 82" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="2,4" />
<text x="220" y="30" font-size="11" class="dg-dim">직접 간선 없음 → X₁⊥X₃ | X₂</text>
</svg>

_극대 클리크 {X₁,X₂}, {X₂,X₃}의 곱으로 인수분해 = X₂가 X₁,X₃를 분리하는 마르코프성과 동치._

## 문제
먼저 일반적인 보조정리: 결합확률이 $p(a,b,s)=g(a,s)h(b,s)$ 꼴로 인수분해되면 $A\perp B\mid S$이다. $p(s)=\sum_{a,b}g(a,s)h(b,s)=G(s)H(s)$(단 $G(s)=\sum_ag(a,s)$, $H(s)=\sum_bh(b,s)$)이므로, $p(a\mid s)=\sum_b p(a,b,s)/p(s)=g(a,s)H(s)/(G(s)H(s))=g(a,s)/G(s)$이고 마찬가지로 $p(b\mid s)=h(b,s)/H(s)$이다. 따라서 $p(a,b\mid s)=g(a,s)h(b,s)/(G(s)H(s))=$==빈칸== 로, 정확히 조건부독립의 정의다.

## 해설
$g(a,s)/G(s)=p(a|s)$이고 $h(b,s)/H(s)=p(b|s)$라서 분자·분모를 다시 묶으면 두 조건부확률의 곱이 나와요.

**정답: $p(a\mid s)\,p(b\mid s)$**

## 예시
사슬 그래프 $X_1-X_2-X_3$(간선은 $\{1,2\},\{2,3\}$뿐, 1과 3은 직접 연결 없음)로 확인해봅니다. 극대 클리크는 $\{1,2\}$와 $\{2,3\}$이고, $\psi_{12}(x_1,x_2)=e^{x_1x_2}$, $\psi_{23}(x_2,x_3)=e^{x_2x_3}$로 두면 $p(x_1,x_2,x_3)=\frac1Z e^{x_1x_2}e^{x_2x_3}$입니다($x_i\in\{0,1\}$).

$X_2=1$로 고정하면 $p(x_1,x_3\mid x_2{=}1)\propto e^{x_1}e^{x_3}$인데, 네 조합의 값은 $(0,0){:}1,\ (0,1){:}e,\ (1,0){:}e,\ (1,1){:}e^2$입니다. 교차비 $\dfrac{p(0,0)p(1,1)}{p(0,1)p(1,0)}=\dfrac{1\cdot e^2}{e\cdot e}=1$인데, $2\times2$ 표에서 교차비가 정확히 1이라는 것은 $X_1$과 $X_3$이 (조건 $X_2=1$ 하에서) 독립이라는 것과 동치입니다. $X_2=0$일 때는 $e^{x_1\cdot0}=e^{x_3\cdot0}=1$이라 네 조합이 모두 같은 값(균등분포)이라 자명하게 독립입니다.

클리크 $\{1,2\},\{2,3\}$만으로 인수분해했을 뿐인데, 그래프에서 2가 1과 3을 분리한다는 사실과 정확히 대응하는 조건부독립 $X_1\perp X_3\mid X_2$가 저절로 튀어나온 것입니다.
