---
slug: de-finetti-exchangeability
theme: PROB
domainLabel: 확률 · 통계
subLabel: 확률의 기초
title: De Finetti 교환가능성 정리: 폴리아 항아리의 조건부 iid 표현
related: 켤레사전분포 3종
---

## 도입
여러 번 동전을 던졌는데 각 결과가 완전히 독립은 아니고 서로 살짝 얽혀 있다고 해봅시다(앞이 나올수록 다음에도 앞이 나오기 쉬워지는 식으로). 그런데도 던진 "순서"는 상관없고 몇 번 앞이 나왔는지만 중요하다면(교환가능성), 이 얽힌 과정을 "동전의 편향 $\theta$를 한 번 무작위로 뽑고, 그다음엔 그 $\theta$로 독립적으로 던진다"는 훨씬 단순한 2단계 과정으로 정확히 다시 쓸 수 있습니다. 폴리아 항아리(Pólya urn) 모델이 이 사실을 유한한 시행 횟수에서도 완전히 엄밀하게 보여주는 대표적인 예시입니다.

## 명제
빨간 공 $a$개, 파란 공 $b$개로 시작해 매번 무작위로 한 개를 뽑아 색을 기록($X_i=1$이면 빨강)하고 뽑은 공과 같은 색 공 하나를 더 넣어 돌려주는 과정을 $N$번 반복하자. 이때 $(X_1,\dots,X_N)$의 결합분포는 정확히 $\Theta\sim\mathrm{Beta}(a,b)$를 뽑은 뒤 $\Theta=\theta$ 조건에서 $X_1,\dots,X_N\stackrel{iid}{\sim}\mathrm{Bernoulli}(\theta)$로 생성한 것과 동일하다. 즉 $P(X_1=x_1,\dots,X_N=x_N)=\int_0^1\Big[\prod_{i=1}^N\theta^{x_i}(1-\theta)^{1-x_i}\Big]\,\mathrm{Beta}(\theta;a,b)\,d\theta$.

## 그림
<svg viewBox="0 0 900 250" xmlns="http://www.w3.org/2000/svg">
<circle cx="65" cy="20" r="6" class="dg-accent"/>
<text x="78" y="24" font-size="11" class="dg-dim">빨강 공</text>
<circle cx="145" cy="20" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<text x="158" y="24" font-size="11" class="dg-dim">파랑 공</text>
<path d="M70,110 L70,180 Q70,200 90,200 L190,200 Q210,200 210,180 L210,110" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="95" cy="135" r="6" class="dg-accent"/>
<circle cx="125" cy="135" r="6" class="dg-accent"/>
<circle cx="155" cy="135" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="110" cy="170" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="170" cy="170" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<line x1="140" y1="110" x2="140" y2="72" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="140,72 135,82 145,82" class="dg-accent"/>
<circle cx="140" cy="60" r="8" class="dg-accent"/>
<text x="150" y="64" font-size="12">X₁=1(빨강)</text>
<text x="140" y="222" font-size="12" text-anchor="middle" class="dg-dim">t=1: 빨강2,파랑3</text>
<path d="M215,145 L385,145" fill="none" class="dg-line" stroke-width="1.5"/>
<polygon points="385,145 375,140 375,150" class="dg-line"/>
<text x="300" y="163" font-size="11" text-anchor="middle" class="dg-dim">기록 후 같은 색 공 추가</text>
<path d="M390,110 L390,180 Q390,200 410,200 L510,200 Q530,200 530,180 L530,110" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="410" cy="135" r="6" class="dg-accent"/>
<circle cx="440" cy="135" r="6" class="dg-accent"/>
<circle cx="470" cy="135" r="6" class="dg-accent"/>
<circle cx="500" cy="135" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="420" cy="170" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="480" cy="170" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<line x1="460" y1="110" x2="460" y2="72" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="460,72 455,82 465,82" class="dg-accent"/>
<circle cx="460" cy="60" r="8" class="dg-accent"/>
<text x="470" y="64" font-size="12">X₂=1(빨강)</text>
<text x="460" y="222" font-size="12" text-anchor="middle" class="dg-dim">t=2: 빨강3,파랑3</text>
<path d="M535,145 L705,145" fill="none" class="dg-line" stroke-width="1.5"/>
<polygon points="705,145 695,140 695,150" class="dg-line"/>
<text x="620" y="163" font-size="11" text-anchor="middle" class="dg-dim">기록 후 같은 색 공 추가</text>
<path d="M710,110 L710,180 Q710,200 730,200 L830,200 Q850,200 850,180 L850,110" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="730" cy="130" r="6" class="dg-accent"/>
<circle cx="758" cy="130" r="6" class="dg-accent"/>
<circle cx="786" cy="130" r="6" class="dg-accent"/>
<circle cx="814" cy="130" r="6" class="dg-accent"/>
<circle cx="742" cy="165" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="772" cy="165" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="802" cy="165" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<line x1="780" y1="110" x2="780" y2="72" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="4,2"/>
<polygon points="780,72 775,82 785,82" class="dg-line"/>
<circle cx="780" cy="60" r="8" fill="none" class="dg-line" stroke-width="2"/>
<text x="790" y="64" font-size="12">X₃=0(파랑)</text>
<text x="780" y="222" font-size="12" text-anchor="middle" class="dg-dim">t=3: 빨강4,파랑3</text>
</svg>

_공 하나를 뽑아 색을 기록하고 같은 색 공을 하나 더 넣어 돌려주는 폴리아 항아리 과정. 순서에 의존하는 것처럼 보이지만 결합분포는 교환가능하다._

## 문제
연쇄법칙으로 $(x_1,\dots,x_N)$의 결합확률을 전부 곱하면, $s=\sum x_i$라 할 때 분자에는 빨강이 나올 때마다 $a,a+1,a+2,\dots$가, 파랑이 나올 때마다 $b,b+1,b+2,\dots$가 순서대로 곱해지고 분모에는 매 단계 $a+b,a+b+1,\dots,a+b+N-1$이 곱해진다. 상승계승 $x^{(k)}=x(x+1)\cdots(x+k-1)$ 표기를 쓰면 $P(x_1,\dots,x_N)=$ $==빈칸==$이다.

## 해설
분자는 빨강이 나올 때마다 곱해지는 $a,a+1,\dots,a+s-1$(즉 $a^{(s)}$)와 파랑이 나올 때마다 곱해지는 $b,b+1,\dots,b+(N-s)-1$(즉 $b^{(N-s)}$)의 곱이고, 분모는 매 단계 공통으로 곱해지는 $(a+b)^{(N)}$이에요.

**정답: $\dfrac{a^{(s)}\,b^{(N-s)}}{(a+b)^{(N)}}$**

## 예시
$a=2,b=3$(항아리에 빨강 2개, 파랑 3개)로 시작해 $N=3$번 뽑아 순서 $(X_1,X_2,X_3)=(1,1,0)$이 나올 확률을 두 가지 방법으로 계산해 비교해 봅시다.

**항아리 규칙으로 직접 계산:** 1번째 뽑기에서 빨강 확률 $2/5$. 빨강이 나왔으니 항아리는 (빨강3,파랑3)이 되어 2번째 빨강 확률은 $3/6=1/2$. 이제 항아리는 (빨강4,파랑3)이 되어 3번째 파랑 확률은 $3/7$. 곱하면 $\frac{2}{5}\cdot\frac12\cdot\frac37=\frac{3}{35}\approx0.0857$.

**베타-베르누이 혼합적분으로 계산:** $s=2$(빨강 2개)이므로 $\int_0^1\theta^2(1-\theta)^1\cdot\frac{\theta^{1}(1-\theta)^{2}}{B(2,3)}d\theta=\frac{B(4,4)}{B(2,3)}$. $B(4,4)=\frac{3!\cdot3!}{7!}=\frac{36}{5040}=\frac{1}{140}$, $B(2,3)=\frac{1!\cdot2!}{4!}=\frac{2}{24}=\frac{1}{12}$이므로 $\frac{1/140}{1/12}=\frac{12}{140}=\frac{3}{35}$.

두 계산이 정확히 $3/35$로 일치합니다 — 순차적으로 얽혀 있는 항아리 과정이 "베타 사전분포에서 $\theta$ 하나를 뽑아 독립 베르누이를 생성"하는 것과 완전히 같은 결합분포를 낸다는 것을 숫자로 확인한 것입니다.
