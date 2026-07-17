---
slug: linear-independence-basis
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 기저가 주는 좌표 표현의 유일성
related: 
---

## 도입
특징벡터들을 모아 하나의 좌표계처럼 쓰고 싶습니다. 그러려면 그 벡터들이 공간 전체를 뒤덮으면서도 서로 겹치는 정보가 없어야 합니다. 공간을 전부 뒤덮는 성질을 스팬한다고 부르고 겹치는 정보가 없는 성질을 선형독립이라 부릅니다. 이 두 조건을 모두 만족하는 벡터 묶음을 기저라 부릅니다. 기저를 쓰면 공간 안의 모든 벡터가 단 하나의 좌표로만 표현된다는 사실을 확인해 봅니다.

## 명제
$\{v_1,\dots,v_n\}$이 벡터공간 $V$의 기저이면 임의의 $x\in V$는 $x=\sum_i c_iv_i$ 형태로 유일하게 표현된다.

## 그림
<svg viewBox="0 0 300 230" xmlns="http://www.w3.org/2000/svg">
<line x1="10" y1="200" x2="290" y2="200" class="dg-line" stroke-width="1"/>
<line x1="90" y1="20" x2="90" y2="220" class="dg-line" stroke-width="1"/>
<line x1="90" y1="200" x2="120" y2="200" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="120,200 110,196 110,204" class="dg-dim"/>
<text x="122" y="196" font-size="11">v₁</text>
<line x1="90" y1="200" x2="120" y2="170" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="120,170 109,171 114,180" class="dg-dim"/>
<text x="122" y="165" font-size="11">v₂</text>
<line x1="90" y1="200" x2="180" y2="50" class="dg-stroke-accent" stroke-width="3"/>
<polygon points="180,50 168,54 173,64" class="dg-accent"/>
<text x="184" y="46" font-size="12">x = c₁v₁ + c₂v₂</text>
<line x1="90" y1="200" x2="30" y2="200" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="30" y1="200" x2="180" y2="50" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="90" y1="200" x2="240" y2="50" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="240" y1="50" x2="180" y2="50" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="5" y="215" font-size="10" class="dg-dim">c₁v₁ (c₁=-2)</text>
<text x="200" y="215" font-size="10" class="dg-dim">c₂v₂ (c₂=5)</text>
</svg>

_평행사변형법: 벡터 x는 기저 v₁, v₂ 방향 성분 c₁v₁, c₂v₂로 유일하게 분해된다._

## 문제
이 유일성 논증에서 나중에 쓸 도구를 먼저 정확히 정의해 둔다. 선형독립이라는 성질은 벡터들을 섞어서 0을 만드는 방법이 계수를 전부 0으로 두는 것 말고는 없다는 뜻이다. 정의대로 적으면, $\sum_ia_iv_i=0$을 만족시키는 계수 조합은 모든 $i$에서 $a_i = $==빈칸== 인 경우 하나뿐이다.

## 해설
선형독립의 정의 그 자체다. 벡터들의 선형결합이 0이 되는 방법이 자명한 경우, 즉 모든 계수가 0인 경우 말고는 없다는 뜻이다. 만약 계수가 전부 0이 아니어도 0을 만들 수 있다면 그중 하나는 나머지의 조합으로 표현 가능하다는 뜻이 되어 독립이 깨진다.

**정답: $0$**

## 예시
좌표가 유일하다는 명제도 실제로 좌표를 구해보고 다른 좌표가 없는지 확인해보면 감이 잡힙니다.

$\mathbb{R}^2$의 기저 $v_1=(1,0)$, $v_2=(1,1)$을 씁니다. 벡터 $x=(3,5)$를 이 기저로 표현하면 $x=c_1v_1+c_2v_2$에서 둘째 성분으로 $c_2=5$가 바로 정해지고 첫째 성분에서 $c_1+c_2=3$이므로 $c_1=-2$입니다.
$$x=-2v_1+5v_2=(-2,0)+(5,5)=(3,5)$$
이제 다른 좌표 $d_1,d_2$로도 같은 $x$를 표현할 수 있다고 가정해봅니다. 두 표현을 빼면 $(c_1-d_1)v_1+(c_2-d_2)v_2=0$인데, $v_1,v_2$가 선형독립이므로 이 조합이 0이 되려면 계수가 전부 0이어야 합니다. 즉 $d_1=-2$, $d_2=5$로 강제되어 처음 구한 좌표와 똑같습니다.

아래 증명은 이 유일성이 이 기저와 이 벡터에서만 성립하는 것이 아니라 임의의 기저와 임의의 벡터에서 항상 성립함을 보입니다.
