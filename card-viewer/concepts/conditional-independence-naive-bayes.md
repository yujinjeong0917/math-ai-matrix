---
slug: conditional-independence-naive-bayes
theme: PROB
domainLabel: 확률 · 통계
subLabel: 확률의 기초
title: 나이브베이즈의 조건부독립 가정과 분류규칙
related: 
---

## 도입
나이브베이즈 분류기는 특성 $x_1,\dots,x_d$가 클래스 $y$를 알고 나면 서로 독립이라고 가정합니다. 현실에서는 특성끼리 어느 정도 얽혀 있는 경우가 많으니 이 가정은 사실 순진합니다. 그래서 이름도 나이브(순진한)베이즈입니다. 그런데도 이 가정 덕분에 계산이 극적으로 단순해지고, 실전에서도 놀랄 만큼 잘 작동하는 경우가 많습니다. 확률의 연쇄법칙에서 출발해 이 가정이 어떻게 분류규칙을 단순화시키는지 직접 따라가 봅니다.

## 명제
특성 $x_1,\dots,x_d$가 클래스 $y$가 주어졌을 때 조건부독립이면 $P(y|x_1,\dots,x_d) \propto P(y)\prod_{i=1}^dP(x_i|y)$이다.

## 그림
<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
  <circle cx="250" cy="40" r="24" fill="none" class="dg-stroke-ink" stroke-width="2"/>
  <text x="243" y="46" font-size="14" font-weight="700">y</text>
  <circle cx="70" cy="175" r="20" fill="none" class="dg-stroke-ink" stroke-width="1.6"/>
  <circle cx="190" cy="175" r="20" fill="none" class="dg-stroke-ink" stroke-width="1.6"/>
  <circle cx="310" cy="175" r="20" fill="none" class="dg-stroke-ink" stroke-width="1.6"/>
  <circle cx="430" cy="175" r="20" fill="none" class="dg-stroke-ink" stroke-width="1.6"/>
  <text x="62" y="180" font-size="12">x₁</text>
  <text x="182" y="180" font-size="12">x₂</text>
  <text x="300" y="180" font-size="12">x₃</text>
  <text x="420" y="180" font-size="12">x_d</text>
  <line x1="235" y1="58" x2="90" y2="158" class="dg-stroke-accent" stroke-width="2"/>
  <polygon points="90,158 100,150 105,163" class="dg-accent"/>
  <line x1="245" y1="64" x2="205" y2="156" class="dg-stroke-accent" stroke-width="2"/>
  <polygon points="205,156 210,143 220,152" class="dg-accent"/>
  <line x1="255" y1="64" x2="295" y2="156" class="dg-stroke-accent" stroke-width="2"/>
  <polygon points="295,156 290,143 280,152" class="dg-accent"/>
  <line x1="265" y1="58" x2="410" y2="158" class="dg-stroke-accent" stroke-width="2"/>
  <polygon points="410,158 400,150 395,163" class="dg-accent"/>
  <line x1="90" y1="175" x2="170" y2="175" class="dg-line" stroke-width="1.2" stroke-dasharray="3,4"/>
  <text x="118" y="170" font-size="13" class="dg-dim">✕</text>
  <line x1="210" y1="175" x2="290" y2="175" class="dg-line" stroke-width="1.2" stroke-dasharray="3,4"/>
  <text x="238" y="170" font-size="13" class="dg-dim">✕</text>
  <line x1="330" y1="175" x2="410" y2="175" class="dg-line" stroke-width="1.2" stroke-dasharray="3,4"/>
  <text x="358" y="170" font-size="13" class="dg-dim">✕</text>
  <text x="150" y="205" font-size="11" class="dg-dim">특성끼리는 연결이 없다(조건부독립)</text>
</svg>

_클래스 노드 y에서 특성 x₁…x_d로만 화살표가 뻗고, 특성끼리는 어떤 연결도 없다(✕)는 것이 나이브베이즈의 그래픽모델이다._

## 문제
지금 목표는 분자에 남은 $P(x_1,\dots,x_d|y)$를 더 다루기 쉬운 형태로 풀어쓰는 것이다. 아직 조건부독립 가정은 쓰지 않는다. 대신 여러 사건이 동시에 일어날 확률을 순서대로 조건부확률의 곱으로 풀어내는 확률의 연쇄법칙을 쓴다. 이 법칙은 항상 성립하는 항등식이며 어떤 가정도 필요 없다.

연쇄법칙을 그대로 적용하면 $P(x_1,\dots,x_d|y) = $==빈칸== 이다.

## 해설
연쇄법칙은 $P(x_1|y)P(x_2|x_1,y)P(x_3|x_1,x_2,y)\cdots$처럼 각 특성이 그 앞의 특성들과 $y$ 모두를 조건으로 갖는 조건부확률의 곱으로 결합확률을 풀어낸다. 이 등식은 조건부확률의 정의만으로 항상 성립하며 독립성 가정이 전혀 필요 없다.

**정답: $\prod_{i=1}^d P(x_i|x_1,\dots,x_{i-1},y)$**

## 예시
조건부독립 가정이 실제로 분류규칙을 어떻게 단순화시키는지 숫자로 확인해봅니다.

메일이 스팸인 사전확률은 $P(y=\text{스팸})=0.4$, 정상일 확률은 $P(y=\text{정상})=0.6$이라 하겠습니다. 메일에 특성 $x_1$(특가라는 단어)과 $x_2$(안녕이라는 단어)가 등장했습니다. 각 클래스에서의 조건부확률은 $P(x_1|\text{스팸})=0.7$, $P(x_2|\text{스팸})=0.2$, $P(x_1|\text{정상})=0.1$, $P(x_2|\text{정상})=0.3$입니다.

조건부독립 가정을 쓰면 $P(x_1,x_2|y)=P(x_1|y)P(x_2|y)$이므로 각 클래스의 결합확률을 곱셈만으로 구할 수 있습니다.
$$P(y=\text{스팸})\,P(x_1|\text{스팸})\,P(x_2|\text{스팸}) = 0.4\times0.7\times0.2 = 0.056$$
$$P(y=\text{정상})\,P(x_1|\text{정상})\,P(x_2|\text{정상}) = 0.6\times0.1\times0.3 = 0.018$$
두 값을 더해서 정규화하면 실제 확률을 얻습니다.
$$P(\text{스팸}|x_1,x_2) = \frac{0.056}{0.056+0.018} \approx 0.757,\qquad P(\text{정상}|x_1,x_2) \approx 0.243$$
특성이 여러 개라도 곱셈 몇 번과 덧셈 한 번으로 사후확률까지 구할 수 있었습니다. 특성끼리 정말 독립인지 따로 확인할 필요조차 없었습니다. 아래 증명은 이 곱셈 구조가 연쇄법칙과 조건부독립 가정만으로 항상 성립한다는 것을 보입니다.
