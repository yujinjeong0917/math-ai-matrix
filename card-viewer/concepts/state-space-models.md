---
slug: state-space-models
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: State-Space Model 재귀식의 고유기저 대각화
related: 
---

## 도입
State-space model은 $h_t=Ah_{t-1}+Bx_t$라는 재귀식으로 시퀀스를 처리합니다. 문제는 이 재귀가 $d$개의 좌표가 행렬 $A$를 통해 서로 얽혀 있어서 한 스텝씩 순서대로 계산할 수밖에 없어 보인다는 점입니다. 그런데 $A$를 대각화할 수 있다면 이야기가 완전히 달라집니다. 서로 얽혀 있던 $d$개의 좌표가 각자 독립인 $d$개의 스칼라 재귀로 풀려버립니다. HiPPO와 S4가 굳이 $A$를 대각화하거나 대각에 가깝게 설계하는 이유가 바로 여기에 있습니다.

## 명제
$A=Q\Lambda Q^{-1}$로 대각화될 때, $z_t=Q^{-1}h_t$로 바꾸면 $h_t=Ah_{t-1}+Bx_t$는 $z_t=\Lambda z_{t-1}+(Q^{-1}B)x_t$라는 좌표별로 독립인 재귀가 된다.

## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="20" font-size="13" text-anchor="middle">원래 좌표: h₁, h₂가 얽힌 재귀</text>
<line x1="60" y1="190" x2="240" y2="190" class="dg-line" stroke-width="1"/>
<line x1="150" y1="210" x2="150" y2="50" class="dg-line" stroke-width="1"/>
<path d="M115,175 Q160,110 195,140 Q225,165 195,90 Q175,50 235,65" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="235,65 222,66 228,76" class="dg-dim"/>
<text x="65" y="185" font-size="11" class="dg-dim">h₁</text>
<text x="155" y="58" font-size="11" class="dg-dim">h₂</text>
<line x1="320" y1="130" x2="380" y2="130" class="dg-line" stroke-width="1.5"/>
<polygon points="380,130 370,125 370,135" class="dg-dim"/>
<text x="350" y="118" font-size="12" text-anchor="middle">Q⁻¹</text>
<text x="490" y="20" font-size="13" text-anchor="middle">고유기저: z⁽¹⁾, z⁽²⁾는 서로 독립</text>
<line x1="490" y1="190" x2="490" y2="55" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="490,55 484,68 496,68" class="dg-accent"/>
<line x1="410" y1="190" x2="605" y2="190" class="dg-line" stroke-width="2.5" stroke-dasharray="6,3"/>
<polygon points="605,190 594,185 594,195" class="dg-dim"/>
<text x="497" y="70" font-size="11">z⁽¹⁾_t = λ₁z⁽¹⁾_{t-1}+b₁x_t</text>
<text x="500" y="205" font-size="11" class="dg-dim">z⁽²⁾_t = λ₂z⁽²⁾_{t-1}+b₂x_t</text>
</svg>

_좌표를 A의 고유기저로 바꾸면 서로 얽혀 있던 재귀가 축마다 완전히 독립인 스칼라 재귀로 풀린다._

## 문제
얽힘을 풀려면 좌표계를 바꿔야 한다. $A$가 $A=Q\Lambda Q^{-1}$로 대각화된다고 하자. $A$가 자연스럽게 대각으로 보이는 좌표계는 $Q$의 열인 고유벡터들이 기준이 되는 좌표계다. 그래서 $h_t=Qz_t$로 두고 새 변수 $z_t=Q^{-1}h_t$를 도입한다. 이걸 원래 재귀식에 대입하면 $Qz_t = AQz_{t-1}+Bx_t$가 된다. 양변 왼쪽에 $Q^{-1}$을 곱해서 $z_t$만 남기면 $z_t = $==빈칸==$\,z_{t-1} + Q^{-1}Bx_t$ 이다.

## 해설
$Qz_t=AQz_{t-1}+Bx_t$의 양변 왼쪽에 $Q^{-1}$을 곱한다. 왼쪽은 $Q^{-1}Q=I$이므로 $z_t$만 남는다. 오른쪽 첫째 항은 $Q^{-1}AQz_{t-1}$이 되고 둘째 항은 $Q^{-1}Bx_t$가 된다. 아직 $Q^{-1}AQ$를 정리하지 않은 상태로 남겨둔 것이다.

**정답: $Q^{-1}AQ$**

## 예시
추상적인 좌표변환을 보기 전에 실제로 얽힌 2차원 재귀 하나를 대각화해서 정말 독립적인 두 재귀로 풀리는지 확인해봅니다.

$A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, $B=\begin{pmatrix}1\\0\end{pmatrix}$이라 합니다. $A$는 대칭이라 고유값 3과 1, 고유벡터 $(1,1)$과 $(1,-1)$을 갖고 이 둘을 정규화하면 $Q=\dfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$이 됩니다. $Q$는 직교행렬이라 $Q^{-1}=Q^T$입니다.

$Q^{-1}B=Q^TB=\dfrac{1}{\sqrt2}(1,1)^T\approx(0.707,0.707)$입니다. 좌표를 바꾸면 재귀는 $z_t^{(1)}=3z_{t-1}^{(1)}+0.707x_t$와 $z_t^{(2)}=1\cdot z_{t-1}^{(2)}+0.707x_t$라는 서로 완전히 독립인 두 스칼라 재귀로 갈라집니다.

$h_0=(0,0)$에서 시작해서 $x_1=1$을 넣으면 원래 재귀로는 $h_1=Ah_0+Bx_1=(1,0)$입니다. 이걸 $Q^T$로 옮기면 $z_1=Q^Th_1\approx(0.707,0.707)$입니다. 방금 구한 독립 재귀식으로 직접 계산해도 $z_1^{(1)}=3\times0+0.707\times1=0.707$이고 $z_1^{(2)}=1\times0+0.707\times1=0.707$로 정확히 같은 값이 나옵니다.

얽혀 있던 2차원 재귀를 두 개의 독립된 스칼라 재귀로 풀었더니 원래 계산과 정확히 맞아떨어졌습니다. 아래 증명은 이 분리가 이 특정 행렬만의 우연이 아니라 대각화 가능한 모든 $A$에서 항상 성립함을 보입니다.
