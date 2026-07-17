---
slug: gram-schmidt
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: Gram-Schmidt 직교화의 귀납적 정당화
related: 
---

## 도입
선형독립인 벡터 여러 개가 있을 때 이들을 서로 수직인 벡터들로 바꾸는 절차가 Gram-Schmidt 직교화입니다. 방법은 단순합니다. 새 벡터를 만들 때마다 이미 만든 벡터들 방향으로의 사영 성분을 전부 빼버립니다. 이렇게 빼고 남은 나머지, 즉 잔차가 정말로 이전 벡터들 전부와 수직이 된다는 사실을 직접 확인해 봅니다.

## 명제
$v_1=a_1$이고 $k\ge2$에 대해 $v_k=a_k-\sum_{j=1}^{k-1}\frac{a_k\cdot v_j}{v_j\cdot v_j}v_j$로 정의하면, $\{v_1,\dots,v_n\}$은 서로 직교한다.

## 그림
<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="190" x2="280" y2="190" class="dg-line" stroke-width="1"/>
<line x1="60" y1="20" x2="60" y2="210" class="dg-line" stroke-width="1"/>
<line x1="60" y1="190" x2="195" y2="145" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="195,145 183,144 187,155" class="dg-accent"/>
<text x="198" y="140" font-size="12">v₁ = a₁</text>
<line x1="60" y1="190" x2="150" y2="100" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="150,100 145,112 158,110" class="dg-dim"/>
<text x="128" y="88" font-size="12">a₂</text>
<line x1="150" y1="100" x2="168" y2="154" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<rect x="159" y="145" width="8" height="8" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<line x1="168" y1="154" x2="150" y2="100" class="dg-stroke-accent" stroke-width="2.5" stroke-dasharray="7,3"/>
<text x="178" y="130" font-size="11">v₂ = a₂ - proj_{v₁}(a₂)</text>
<circle cx="168" cy="154" r="3" class="dg-dim"/>
<text x="150" y="205" font-size="11" class="dg-dim">사영 성분(빼는 부분)은 v₁ 위에 놓인다</text>
</svg>

_a₂에서 v₁ 방향 사영 성분을 빼고 남은 v₂는 정확히 v₁과 수직이다._

## 문제
이 합 안에는 $j=1,\dots,k-1$까지 여러 항이 있지만 정리할 방법이 있다. $v_1,\dots,v_{k-1}$이 이미 서로 직교한다는 가정을 쓴다. $j\neq i$인 항에서는 $v_j\cdot v_i=0$이므로 그 항 전체가 사라진다. 남는 것은 $j=i$인 항 하나뿐이고, 그 항에서는 분모와 분자에 똑같이 $v_i\cdot v_i$가 있어 약분된다. 그러니 합 전체는 ==빈칸== 하나로 정리된다.

## 해설
$j\neq i$인 항들은 귀납가정 $v_j\cdot v_i=0$ 때문에 전부 0이 되어 사라진다. $j=i$인 항만 남는데, 그 값은 $\dfrac{a_k\cdot v_i}{v_i\cdot v_i}(v_i\cdot v_i)$이고 여기서 $v_i\cdot v_i$가 약분되어 $a_k\cdot v_i$만 남는다.

**정답: $a_k\cdot v_i$**

## 예시
직교화가 정말 되는지 추상적인 귀납 논증 전에 두 벡터로 직접 계산해봅니다.

$a_1=(3,1)$, $a_2=(2,2)$에서 시작합니다. $v_1=a_1=(3,1)$로 둡니다.

$v_2=a_2-\dfrac{a_2\cdot v_1}{v_1\cdot v_1}v_1$을 계산합니다. $a_2\cdot v_1=2\times3+2\times1=8$이고 $v_1\cdot v_1=9+1=10$이므로 계수는 $0.8$입니다. $v_2=(2,2)-0.8(3,1)=(2-2.4,\ 2-0.8)=(-0.4,1.2)$입니다.

실제로 $v_2\cdot v_1=(-0.4)\times3+1.2\times1=-1.2+1.2=0$입니다. $a_2$에서 $v_1$ 방향 성분을 정확히 그만큼 빼냈더니 남은 $v_2$에는 $v_1$ 방향이 조금도 남지 않았습니다.

두 벡터로 직접 확인해봤더니 사영 성분을 뺀 나머지가 정확히 직교했습니다. 아래 증명은 이 직교성이 이 두 벡터만의 우연이 아니라 벡터가 몇 개든 항상 성립함을 보입니다.
