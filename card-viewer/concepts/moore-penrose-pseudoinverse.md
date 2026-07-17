---
slug: moore-penrose-pseudoinverse
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 무어-펜로즈 유사역행렬과 최소노름해
related: 특이값분해(SVD) · 선형회귀 정규방정식
---

## 도입
정사각행렬이 아니거나 랭크가 부족한 행렬은 보통의 역행렬을 가지지 않습니다. 그런데 $Ax=b$가 해를 여러 개 가지거나(과소결정·랭크부족) 아예 정확히 풀리지 않을 때도(과결정) '가장 그럴듯한' 해를 대수적으로 딱 하나 골라내고 싶을 때가 많습니다. SVD를 이용하면 이 역할을 하는 유사역행렬을 구성할 수 있습니다.

## 명제
$A\in\mathbb{R}^{m\times n}$의 특이값분해를 $A=U\Sigma V^T$(특이값 $\sigma_1\ge\cdots\ge\sigma_r>0$, 랭크 $r$)라 하고, $\Sigma^+\in\mathbb{R}^{n\times m}$을 $\Sigma$를 전치한 뒤 0이 아닌 대각성분을 역수로 바꾼 행렬이라 하자. $A^+:=V\Sigma^+U^T$라 두면, $Ax=b$가 해를 가질 때 $x^*=A^+b$는 그 해들 중 유클리드 노름 $\|x\|$이 가장 작은 유일한 해이다. 이는 열이 모두 독립인 과결정계에서 최소제곱해를 구하는 정규방정식(linear-regression-normal-equation)과 달리, 랭크부족 또는 과소결정(해가 무한히 많은) 상황을 다룬다.

## 그림
<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="110" x2="390" y2="110" class="dg-dim" stroke-width="1"/>
<line x1="210" y1="20" x2="210" y2="200" class="dg-dim" stroke-width="1"/>
<line x1="60" y1="190" x2="360" y2="40" class="dg-stroke-ink" stroke-width="2"/>
<text x="330" y="55" font-size="12">해집합 {x0+z : z∈ker A}</text>
<circle cx="210" cy="110" r="3" class="dg-stroke-ink"/>
<text x="200" y="128" font-size="11" class="dg-dim">원점</text>
<circle cx="255" cy="88" r="6" class="dg-accent"/>
<text x="262" y="80" font-size="12">x* = A⁺b (최소노름해)</text>
<line x1="210" y1="110" x2="255" y2="88" class="dg-stroke-accent" stroke-width="2.5"/>
<line x1="255" y1="88" x2="300" y2="66" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<circle cx="300" cy="66" r="4" class="dg-stroke-ink"/>
<text x="300" y="55" font-size="10" class="dg-dim">다른 해 (노름 더 큼)</text>
<path d="M 240,105 L 250,105 L 250,95" fill="none" class="dg-stroke-ink" stroke-width="1.2"/>
</svg>

_해가 무한한 아핀 직선 위에서 원점에 가장 가까운 점이 최소노름해 x*=A⁺b이다._

## 문제
SVD $A=U\Sigma V^T$에서 $\ker(A)$는 특이값이 0인 방향들, 즉 $v_{r+1},\dots,v_n$이 생성하는 부분공간과 같다(이 방향들은 $A$가 완전히 눌러버리는 방향이다). 한편 $A^+b=V\Sigma^+U^Tb=\sum_{i=1}^r\dfrac{u_i^Tb}{\sigma_i}v_i$로 쓸 수 있는데, 이 식은 $v_1,\dots,v_r$만의 선형결합이므로 $A^+b\in$==빈칸== 이다.

## 해설
합이 $i=1$부터 $r$까지만 돌아가므로 $A^+b$는 오직 $v_1,\dots,v_r$의 선형결합입니다.

**정답: $\operatorname{span}(v_1,\dots,v_r)$**

## 예시
추상적인 증명 전에 랭크가 부족한 $2\times2$ 행렬로 최소노름해를 직접 확인해봅니다.
$$A=\begin{pmatrix}1&2\\2&4\end{pmatrix},\qquad b=\begin{pmatrix}5\\10\end{pmatrix}$$
$A$의 두 행은 서로 배수 관계라 랭크가 1이고, $Ax=b$를 만족하는 $x$는 무수히 많습니다. 이를테면 $x=(1,2)^T$도 $x=(7,-1)^T$도 모두 $Ax=b$를 만족합니다(직접 대입하면 $A(1,2)^T=(5,10)^T$, $A(7,-1)^T=(5,10)^T$).

이 행렬은 $A=vv^T$ ($v=(1,2)^T$) 꼴이라 특이값분해가 $\sigma_1=5$, $\sigma_2=0$, $u_1=v_1=v/\|v\|=(1,2)/\sqrt5$로 아주 간단합니다. 유사역행렬은 $$A^+=\frac{1}{\sigma_1}v_1u_1^T=\begin{pmatrix}0.04&0.08\\0.08&0.16\end{pmatrix}$$이고, $x^*=A^+b=(1,2)^T$입니다. 실제로 $\|(1,2)^T\|=\sqrt5\approx2.24$인데 반해 다른 해 $(7,-1)^T$의 노름은 $\sqrt{50}\approx7.07$로 훨씬 크므로, $A^+b$가 더 작은 노름의 해임을 확인할 수 있습니다.
