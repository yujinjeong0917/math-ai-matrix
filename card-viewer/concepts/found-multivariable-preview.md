---
slug: found-multivariable-preview
theme: FOUND
domainLabel: 예비수학
subLabel: 예비수학 13순위 · 현 교육과정 밖 영역
title: 다변수 함수에 대한 최소한의 사전 감
related: 경사하강법의 하강 보장 · 헤시안과 2차 최적성 조건 · 행렬미적분의 연쇄법칙: 그래디언트의 전치 야코비안 전파
---

## 도입
변수 하나짜리 함수 $f(x)$의 그래프는 평면 위의 곡선이에요. 그런데 AI 모델의 손실함수는 파라미터가 수백만, 수십억 개인 함수라서 변수도 그만큼 많아요. 이런 함수를 다변수 함수라고 부르는데, 사실 현재 고교 교육과정에는 다변수 함수가 아예 들어있지 않아요. 그러니 이걸 몰라도 전혀 이상한 일이 아니고, 부끄러워할 이유도 없어요. 다만 미적분 최적화를 시작하기 전에 그림 하나 정도는 미리 가지고 있으면 훨씬 덜 당황하게 돼요.

변수가 하나면 그래디언트(기울기)도 숫자 하나예요. 그런데 변수가 여러 개면 그래디언트는 변수 하나마다 하나씩 나와서, 결국 화살표 다발(벡터)의 형태가 돼요. 각 성분은 그 변수를 조금 늘리면 함수값이 얼마나 빨리 커지는가를 나타내고, 전체 화살표를 합친 방향이 함수값이 가장 빨리 커지는 방향이에요.

## 명제


## 그림
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
<circle cx="200" cy="150" r="30" fill="none" class="dg-line" stroke-width="1"/>
<circle cx="200" cy="150" r="60" fill="none" class="dg-line" stroke-width="1"/>
<circle cx="200" cy="150" r="90" fill="none" class="dg-line" stroke-width="1"/>
<circle cx="200" cy="150" r="120" fill="none" class="dg-line" stroke-width="1"/>
<line x1="200" y1="150" x2="300" y2="150" class="dg-stroke-accent" stroke-width="1.8"/>
<polygon points="300,150 289,145 289,155" class="dg-stroke-accent"/>
<line x1="200" y1="150" x2="270.7" y2="220.7" class="dg-stroke-accent" stroke-width="1.8"/>
<polygon points="270.7,220.7 260,213 268,206" class="dg-stroke-accent"/>
<line x1="200" y1="150" x2="200" y2="250" class="dg-stroke-accent" stroke-width="1.8"/>
<polygon points="200,250 195,239 205,239" class="dg-stroke-accent"/>
<line x1="200" y1="150" x2="129.3" y2="220.7" class="dg-stroke-accent" stroke-width="1.8"/>
<polygon points="129.3,220.7 140,213 132,206" class="dg-stroke-accent"/>
<line x1="200" y1="150" x2="100" y2="150" class="dg-stroke-accent" stroke-width="1.8"/>
<polygon points="100,150 111,145 111,155" class="dg-stroke-accent"/>
<line x1="200" y1="150" x2="129.3" y2="79.3" class="dg-stroke-accent" stroke-width="1.8"/>
<polygon points="129.3,79.3 140,87 132,94" class="dg-stroke-accent"/>
<line x1="200" y1="150" x2="200" y2="50" class="dg-stroke-accent" stroke-width="1.8"/>
<polygon points="200,50 195,61 205,61" class="dg-stroke-accent"/>
<line x1="200" y1="150" x2="270.7" y2="79.3" class="dg-stroke-accent" stroke-width="1.8"/>
<polygon points="270.7,79.3 260,87 268,94" class="dg-stroke-accent"/>
<circle cx="200" cy="150" r="3" class="dg-dim"/>
<text x="60" y="25" font-size="12" class="dg-dim">등고선 f(x,y)=x²+y²</text>
<text x="285" y="140" font-size="11" class="dg-dim">∇f (중심에서 바깥으로)</text>
</svg>

_f(x,y)=x²+y²의 등고선은 동심원이고, 그래디언트는 중심에서 바깥으로 뻗는 방향을 가리킨다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
등고선 지도를 생각하면 쉬워요. 산 정상 쪽으로 갈수록 등고선 간격이 좁아지는데, 그래디언트는 그 지점에서 가장 가파르게 올라가는 방향을 가리키는 화살표예요. 변수가 둘이면 화살표도 성분 두 개짜리, 변수가 백만 개면 화살표도 성분 백만 개짜리로 커질 뿐, 각 방향으로 얼마나 가파른가를 모아놓은 거라는 본질은 똑같아요.


## 예시
가장 간단한 2변수 함수 $f(x,y)=x^2+y^2$로 확인해봅니다. 이 함수는 원점에서 멀어질수록 커지는 그릇 모양이에요.

함수값이 같은 점들을 이은 선을 등고선이라고 하는데, $f(x,y)=4$인 등고선을 구하면 $x^2+y^2=4$가 되어 반지름 $2$인 원이 나와요. $f(x,y)=9$라면 반지름 $3$인 원이고요. 등고선이 원 모양으로 겹겹이 퍼진다는 게 이 함수의 특징이에요.

그래디언트는 $\nabla f(x,y)=(2x,\ 2y)$예요. 점 $(1,1)$에서는 $\nabla f(1,1)=(2,2)$가 되는데, 이 벡터는 원점에서 $(1,1)$ 방향으로 뻗어나가는 화살표와 같은 방향이에요. 실제로 $(2,3)$에서 계산해도 $\nabla f(2,3)=(4,6)$으로 역시 원점에서 바깥쪽을 가리켜요.

즉 이 함수의 그래디언트는 등고선(원)에 수직이면서 항상 중심에서 바깥쪽으로 뻗는 방향을 가리켜요. 변수가 $x,y$ 두 개뿐이라 화살표도 성분 두 개짜리지만, 변수가 백만 개면 그래디언트도 성분 백만 개짜리 화살표 다발이 될 뿐 아이디어는 완전히 같아요.
