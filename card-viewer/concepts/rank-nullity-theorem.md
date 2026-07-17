---
slug: rank-nullity-theorem
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 랭크-널리티 정리(차원정리)
related: 
---

## 도입
선형사상은 정의역의 정보를 일부는 완전히 없애버리고(핵, kernel) 나머지는 상(image)으로 보존합니다. 놀랍게도 '없앤 차원'과 '보존한 차원'을 더하면 언제나 원래 정의역의 차원과 정확히 같습니다.

## 명제
$V,W$가 유한차원 벡터공간이고 $\Phi:V\to W$가 선형사상이라 하자. 그러면 $\dim(\ker\Phi)+\dim(\operatorname{Im}\Phi)=\dim V$이다.

## 그림
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="30" width="180" height="160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="120" y="20" font-size="12" text-anchor="middle">정의역 V</text>
<rect x="45" y="45" width="150" height="55" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="120" y="76" font-size="12" text-anchor="middle">ker Φ (핵)</text>
<rect x="45" y="115" width="150" height="60" class="dg-accent"/>
<text x="120" y="148" font-size="12" text-anchor="middle">여집합 (n-k차원)</text>
<line x1="215" y1="145" x2="330" y2="145" class="dg-line" stroke-width="2"/>
<polygon points="330,145 320,140 320,150" class="dg-stroke-ink"/>
<text x="235" y="130" font-size="11">Φ</text>
<line x1="215" y1="70" x2="260" y2="70" class="dg-dim" stroke-width="1.5" stroke-dasharray="3,3"/>
<polygon points="260,70 253,66 253,74" class="dg-dim"/>
<text x="220" y="60" font-size="10" class="dg-dim">Φ(ker)=0</text>
<rect x="340" y="30" width="180" height="160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="430" y="20" font-size="12" text-anchor="middle">공역 W</text>
<rect x="355" y="115" width="150" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="430" y="148" font-size="12" text-anchor="middle">Im Φ (상, k'차원)</text>
</svg>

_정의역이 핵과 여집합으로 나뉘고, 여집합만 사상되어 상을 이룬다._

## 문제
기저확장정리(임의의 부분공간의 기저는 전체 공간의 기저로 확장할 수 있다)에 의해 $v_1,\dots,v_k$를 $V$ 전체의 기저 $v_1,\dots,v_k,v_{k+1},\dots,v_n$ ($n=\dim V$)으로 확장할 수 있다. 목표는 $\{\Phi(v_{k+1}),\dots,\Phi(v_n)\}$이 $\operatorname{Im}\Phi$의 기저임을 보여 $\dim(\operatorname{Im}\Phi)=$==빈칸== 임을 얻는 것이다.

## 해설
기저 후보의 개수가 $n-k$개이므로, 이것이 실제로 기저임을 보이면 상의 차원이 $n-k$가 됩니다.

**정답: $n-k$**

## 예시
$\Phi:\mathbb{R}^3\to\mathbb{R}^2$을 $\Phi(x,y,z)=(x+y,\,y+z)$로 정의합니다(행렬로는 $\begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$).

핵을 구하려면 $x+y=0$, $y+z=0$을 풀어야 하는데, $y=-x$, $z=-y=x$이므로 핵은 $(1,-1,1)$ 방향 하나로 생성되는 1차원 부분공간입니다(실제로 $\Phi(1,-1,1)=(1-1,-1+1)=(0,0)$). 두 행 $(1,1,0)$과 $(0,1,1)$은 서로 배수가 아니므로 상은 $\mathbb{R}^2$ 전체, 즉 2차원입니다. 따라서 $\dim(\ker\Phi)+\dim(\operatorname{Im}\Phi)=1+2=3=\dim\mathbb{R}^3$으로 명제가 확인됩니다.
