---
slug: determinant-invertibility
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 행렬식과 가역성의 동치 (det(A)≠0 ⟺ 자명해)
related: 
---

## 도입
정사각행렬 $A$가 있을 때 역행렬이 존재하는지 알고 싶은 상황은 아주 흔합니다. 선형회귀의 정규방정식에서 $(X^TX)^{-1}$을 구할 때도, 어떤 선형변환이 정보를 잃지 않고 되돌릴 수 있는지 확인할 때도 똑같은 질문이 등장합니다. $\det(A)\neq0$이라는 조건 하나가 이 모든 상황에 대한 답을 줍니다. 이 조건은 $A$가 역행렬을 갖는다는 것과 정확히 같습니다. 또한 $Ax=0$의 해가 오직 $x=0$ 뿐이라는 것과도 정확히 같습니다. 이 동치관계를 직접 확인해 봅니다.

## 명제
$n\times n$ 행렬 $A$에 대해 $\det(A)\neq0$인 것과 $Ax=0$의 해가 $x=0$ 뿐인 것은 동치이다.

## 그림
<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="20" font-size="13" text-anchor="middle">det(A) ≠ 0: 넓이 보존</text>
<polygon points="150,190 230,190 230,110 150,110" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<polygon points="150,190 230,166 278,86 198,110" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="150" y="208" font-size="11" class="dg-dim">단위정사각형</text>
<text x="285" y="90" font-size="11">Ax (평행사변형)</text>
<text x="490" y="20" font-size="13" text-anchor="middle">det(A)=0: 직선으로 붕괴</text>
<polygon points="490,190 570,190 570,110 490,110" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<line x1="490" y1="190" x2="565" y2="40" class="dg-stroke-accent" stroke-width="3"/>
<polygon points="565,40 555,50 567,54" class="dg-accent"/>
<text x="490" y="208" font-size="11" class="dg-dim">단위정사각형</text>
<text x="575" y="60" font-size="11">Ax (넓이 0인 직선)</text>
</svg>

_가역인 A는 정사각형을 넓이가 있는 평행사변형으로 보내고(det≠0), 비가역인 A는 넓이를 완전히 짓눌러 한 직선으로 붕괴시킨다(det=0)._

## 문제
지금 목표는 $\det(A)\neq0$이라는 조건만으로 $A$의 역행렬이 실제로 존재함을 확인하는 것이다. 존재한다고 그냥 가정하지 않고 직접 만들어 보이는 것이 가장 확실한 증명이다. 그래서 여인수로 만든 수반행렬 $\mathrm{adj}(A)$를 쓴다. 이 행렬은 항상 $A\,\mathrm{adj}(A) = \det(A)I$ 라는 항등식을 만족한다는 사실이 알려져 있다. $\det(A)\neq0$이므로 양변을 $\det(A)$로 나누어도 된다. 그러면 $A^{-1} = $==빈칸== 를 얻는다.

## 해설
항등식 $A\,\mathrm{adj}(A)=\det(A)I$의 양변을 $\det(A)$로 나누면 $A\cdot\dfrac{\mathrm{adj}(A)}{\det(A)}=I$가 된다. 이 나눗셈이 가능한 이유는 정확히 $\det(A)\neq0$이라는 가정 때문이다. 그러니 $A^{-1}$은 바로 이 분수 형태의 행렬이다.

**정답: $\dfrac{\mathrm{adj}(A)}{\det(A)}$**

## 예시
동치관계를 일반적으로 증명하기 전에 가역인 행렬과 가역이 아닌 행렬을 나란히 놓고 직접 계산해봅니다.

**가역인 경우.** $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$를 봅니다. $\det(A)=1\times4-2\times3=-2$로 0이 아닙니다. 수반행렬은 $\mathrm{adj}(A)=\begin{pmatrix}4&-2\\-3&1\end{pmatrix}$이고 $A^{-1}=\mathrm{adj}(A)/\det(A)$를 계산하면 $\begin{pmatrix}-2&1\\1.5&-0.5\end{pmatrix}$가 나옵니다. 실제로 $Ax=0$을 풀어보면 $x_1=-2x_2$와 $3x_1+4x_2=0$을 동시에 만족해야 하는데 대입하면 $x_2=0$이 나오고 따라서 $x_1=0$만 남습니다. 자명해뿐입니다.

**가역이 아닌 경우.** $A'=\begin{pmatrix}2&4\\1&2\end{pmatrix}$를 봅니다. 둘째 열이 첫째 열의 2배라 $\det(A')=2\times2-4\times1=0$입니다. 수반행렬은 $\mathrm{adj}(A')=\begin{pmatrix}2&-4\\-1&2\end{pmatrix}$입니다. 이 행렬의 첫째 열 $x_0=(2,-1)$을 $A'$에 곱해보면 $A'x_0=(2\times2+4\times(-1),\ 1\times2+2\times(-1))=(0,0)$이 나옵니다. $x_0\neq0$인데도 $A'x_0=0$이니 자명하지 않은 해가 존재합니다.

행렬식이 0이 되자마자 정확히 그 자리에서 자명하지 않은 해가 튀어나왔습니다. 아래 증명은 이 대응이 이 두 예제만의 우연이 아니라 모든 정사각행렬에서 항상 성립하는 동치관계임을 보입니다.
