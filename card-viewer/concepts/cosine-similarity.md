---
slug: cosine-similarity
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 코사인 유사도의 유계성과 각도 해석
related: 
---

## 도입
두 특징벡터가 얼마나 비슷한 방향을 가리키는지 재고 싶습니다. 벡터의 길이 차이에 흔들리지 않고 순수하게 방향만 비교하려면 내적을 두 벡터의 길이로 나누면 됩니다. 이렇게 정의한 코사인 유사도가 항상 -1과 1 사이에 갇힌다는 사실, 그리고 그 값이 실제로 두 벡터 사이 각도의 코사인과 같다는 사실을 확인해 봅니다.

## 명제
영벡터가 아닌 $u,v\in\mathbb{R}^d$에 대해 코사인 유사도 $\cos(u,v)=\dfrac{u\cdot v}{\|u\|\|v\|}$는 $-1\le\cos(u,v)\le1$을 만족한다.

## 그림
<svg viewBox="0 0 660 210" xmlns="http://www.w3.org/2000/svg">
<circle cx="100" cy="150" r="2" class="dg-dim"/>
<line x1="100" y1="150" x2="142" y2="94" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="142,94 130,96 135,105" class="dg-dim"/>
<line x1="100" y1="150" x2="163" y2="66" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="163,66 151,70 155,79" class="dg-accent"/>
<text x="60" y="185" font-size="12" text-anchor="middle">같은 방향</text>
<text x="60" y="200" font-size="11" class="dg-dim" text-anchor="middle">θ=0°, cos=1</text>
<line x1="320" y1="150" x2="362" y2="94" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="362,94 350,96 355,105" class="dg-dim"/>
<line x1="320" y1="150" x2="376" y2="192" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="376,192 372,180 363,186" class="dg-accent"/>
<path d="M320,130 A20,20 0 0 1 341,145" fill="none" class="dg-line" stroke-width="1"/>
<text x="280" y="198" font-size="12" text-anchor="middle">수직</text>
<text x="405" y="130" font-size="11" class="dg-dim" text-anchor="middle">θ=90°, cos=0</text>
<line x1="540" y1="130" x2="582" y2="74" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="582,74 570,76 575,85" class="dg-dim"/>
<line x1="540" y1="130" x2="498" y2="186" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="498,186 505,175 512,183" class="dg-accent"/>
<text x="540" y="198" font-size="12" text-anchor="middle">정반대 방향</text>
<text x="605" y="130" font-size="11" class="dg-dim" text-anchor="middle">θ=180°, cos=-1</text>
</svg>

_u(검정)와 v(강조)가 이루는 각도에 따라 코사인 유사도는 같은 방향에서 1, 수직에서 0, 정반대에서 -1의 극값을 갖는다._

## 문제
내적의 크기를 누르는 부등식을 직접 만들어본다. 임의의 실수 $t$에 대해 $\|u-tv\|^2$는 노름의 제곱이므로 절대 음수가 될 수 없다. 이 사실을 그대로 전개해서 이용한다. 전개하면 $\|u-tv\|^2 = \|u\|^2 - 2t(u\cdot v) + $==빈칸== 이다.

## 해설
$(u-tv)\cdot(u-tv)$를 그대로 전개하면 $u\cdot u - 2t(u\cdot v) + t^2(v\cdot v)$가 된다. 마지막 항이 $t^2\|v\|^2$다. $t$가 곱해진 항이 두 개 있는데 서로 같아서 하나로 합쳐진다.

**정답: $t^2\|v\|^2$**

## 예시
코사인 유사도가 왜 -1과 1 사이에 갇히는지 몇 가지 방향을 직접 비교해보면 바로 드러납니다.

기준 벡터를 $u=(3,4)$로 둡니다. $\|u\|=5$입니다.

**같은 방향.** $v=(6,8)=2u$라 하면 $u\cdot v=18+32=50$, $\|v\|=10$이므로 $\cos(u,v)=50/50=1$입니다.

**정반대 방향.** $v=(-3,-4)=-u$라 하면 $u\cdot v=-9-16=-25$, $\|v\|=5$이므로 $\cos(u,v)=-25/25=-1$입니다.

**수직인 방향.** $v=(4,-3)$이라 하면 $u\cdot v=12-12=0$이므로 $\cos(u,v)=0$입니다.

세 값 모두 정확히 $-1,\ 0,\ 1$로 구간의 양 끝과 가운데를 채웁니다. 아래 증명은 이 경계값들이 우연이 아니라 임의의 $u,v$에서 코사인 유사도가 항상 이 구간 안에 머무는 이유를 보입니다.
