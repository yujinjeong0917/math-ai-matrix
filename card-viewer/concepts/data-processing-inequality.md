---
slug: data-processing-inequality
theme: INFO
domainLabel: 정보이론
subLabel: 발산 · 상호정보
title: 데이터처리부등식의 증명
related: 
---

## 도입
데이터를 아무리 정교하게 가공해도 원래 없던 정보가 새로 생기지는 않습니다. 신경망에서 층을 하나씩 거칠 때마다 입력 $X$에 대해 남아 있는 정보량은 늘어날 수 없습니다. 이 직관을 정확한 부등식으로 만든 것이 데이터처리부등식입니다. 상호정보량의 체인룰과 조건부 상호정보량의 비음성만으로 완전히 증명할 수 있습니다.

## 명제
$X-Y-Z$가 마르코프 체인($Z$가 $Y$를 거쳐서만 $X$와 관계를 맺는다)이면 $I(X;Y) \ge I(X;Z)$ 이다.

## 그림
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="80" cy="100" r="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="105" font-size="14" text-anchor="middle">X</text>
<line x1="110" y1="100" x2="200" y2="100" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="200,100 188,94 188,106" class="dg-stroke-ink"/>
<circle cx="230" cy="100" r="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="230" y="105" font-size="14" text-anchor="middle">Y</text>
<line x1="260" y1="100" x2="350" y2="100" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<polygon points="350,100 338,94 338,106" class="dg-stroke-accent"/>
<circle cx="380" cy="100" r="30" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="380" y="105" font-size="14" text-anchor="middle">Z</text>
<path d="M80,70 Q230,10 380,70" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<text x="230" y="20" font-size="11" class="dg-dim">직접 경로 없음 (Y를 거쳐서만 연결)</text>
<text x="140" y="130" font-size="11">I(X;Y)=0.531</text>
<text x="290" y="130" font-size="11" class="dg-dim">I(X;Z)=0.320</text>
<text x="120" y="175" font-size="12">I(X;Y) ≥ I(X;Z): 가공을 거칠수록 정보는 줄어들 뿐</text>
</svg>

_Y를 거쳐서만 연결된 마르코프 체인에서는 Z로 갈수록 X에 대한 정보가 늘어날 수 없다._

## 문제
이 체인룰의 두 번째 항 $I(X;Z|Y)$를 봅니다. $X-Y-Z$가 마르코프 체인이라는 것은 $Y$를 알고 나면 $X$와 $Z$가 조건부독립이라는 뜻입니다. 조건부독립이면 조건부 상호정보량도 완전히 사라집니다.

$I(X;Z|Y) = $==빈칸== 이다.

## 해설
$Y$가 주어졌을 때 $X,Z$가 조건부독립이라는 것은 정의상 $p(x,z|y)=p(x|y)p(z|y)$라는 뜻입니다. 이 조건 아래서는 조건부 상호정보량이 정확히 0이 됩니다.

**정답: $0$**

## 예시
정보가 가공을 거칠수록 줄어들 수만 있다는 명제를 잡음 채널로 확인해봅니다. 로그는 밑을 2로 사용합니다.

공정한 동전 $X$가 있고 $Y$는 $X$를 확률 $0.1$로 뒤집는 잡음 채널을 거친 결과 $Z$는 $Y$를 다시 같은 확률 $0.1$로 뒤집는 채널을 거친 결과라 하겠습니다. $X-Y-Z$는 마르코프 체인입니다.
$$I(X;Y)=1-H_b(0.1)=1-0.469=0.531$$
이제 $X$에서 $Z$까지 두 단계를 거친 뒤 남은 정보량을 봅니다. 두 채널을 거치며 뒤집힐 확률은 $2\times0.1\times0.9=0.18$로 커집니다.
$$I(X;Z)=1-H_b(0.18)=1-0.680=0.320$$
한 단계만 거친 $I(X;Y)=0.531$비트가 두 단계를 거친 $I(X;Z)=0.320$비트보다 큽니다. 채널을 하나 더 통과할 때마다 $X$에 대한 정보가 새로 생기기는커녕 그대로 줄어들었습니다.

아래 증명은 이 감소가 잡음의 세기와 무관하게 어떤 마르코프 체인에서도 항상 성립하는 사실임을 상호정보량의 체인룰로 보입니다.
