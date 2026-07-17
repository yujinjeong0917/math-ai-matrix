---
slug: classical-mds
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 고전적 다차원척도법(Classical MDS): 이중중심화로 좌표 복원하기
related: 에카르트-영 정리 · 특이값분해(SVD)
---

## 도입
점들의 좌표는 모르고 점들 사이의 거리(비유사도)만 주어졌다고 합시다. 그래도 그 거리들과 똑같은 거리를 만들어내는 좌표를 복원할 수 있을까요? 놀랍게도 가능합니다. 거리 행렬을 '이중중심화'하면 원래 좌표들의 내적행렬(그람행렬)이 정확히 복원되고, 그 고유분해가 곧 좌표가 됩니다.

## 명제
$n$개의 점 $x_1,\dots,x_n\in\mathbb{R}^p$가 중심화되어 있다고 하자($\sum_ix_i=0$). 제곱거리행렬을 $D^{(2)}_{ij}=\|x_i-x_j\|^2$, 중심화행렬을 $J=I-\frac1n\mathbf1\mathbf1^T$라 하면 $$B:=-\frac12JD^{(2)}J$$는 원래 좌표들의 그람행렬 $B=XX^T$ ($X$의 $i$번째 행이 $x_i^T$)와 정확히 같다. 따라서 $B$를 고유분해 $B=Q\Lambda Q^T$ ($\Lambda$는 0 이상의 고유값)한 뒤 $\hat X=Q_{:,1:d}\Lambda_{1:d}^{1/2}$로 두면, 원래 거리들을 그대로 재현하는(또는 $\operatorname{rank}(B)>d$이면 최선으로 근사하는) $d$차원 좌표를 얻는다.

## 그림
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
<text x="130" y="25" font-size="12" text-anchor="middle">거리만 주어짐</text>
<circle cx="70" cy="150" r="4" class="dg-stroke-ink"/>
<circle cx="190" cy="150" r="4" class="dg-stroke-ink"/>
<circle cx="130" cy="60" r="4" class="dg-stroke-ink"/>
<line x1="70" y1="150" x2="190" y2="150" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="115" y="168" font-size="10" class="dg-dim">3</text>
<line x1="70" y1="150" x2="130" y2="60" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="85" y="105" font-size="10" class="dg-dim">4</text>
<line x1="190" y1="150" x2="130" y2="60" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="165" y="105" font-size="10" class="dg-dim">5</text>
<text x="130" y="195" font-size="11" class="dg-dim">좌표는 미지수</text>
<line x1="260" y1="120" x2="320" y2="120" class="dg-line" stroke-width="2"/>
<polygon points="320,120 310,115 310,125" class="dg-stroke-ink"/>
<text x="265" y="105" font-size="10">이중중심화 B=-½JD²J → 고유분해</text>
<text x="440" y="25" font-size="12" text-anchor="middle">복원된 2D 좌표</text>
<circle cx="380" cy="150" r="4" class="dg-stroke-accent"/>
<circle cx="500" cy="150" r="4" class="dg-stroke-accent"/>
<circle cx="440" cy="60" r="4" class="dg-stroke-accent"/>
<line x1="380" y1="150" x2="500" y2="150" class="dg-stroke-accent" stroke-width="2"/>
<line x1="380" y1="150" x2="440" y2="60" class="dg-stroke-accent" stroke-width="2"/>
<line x1="500" y1="150" x2="440" y2="60" class="dg-stroke-accent" stroke-width="2"/>
<text x="440" y="195" font-size="11">같은 거리(3,4,5)를 갖는 실제 좌표</text>
</svg>

_점 사이 거리만으로 이중중심화를 거치면 실제 2D 좌표가 복원된다._

## 문제
$B:=XX^T$를 미지의 그람행렬이라 하면 $b_{ij}=x_i^Tx_j$이고, 제곱거리는 $\|x_i-x_j\|^2=\|x_i\|^2+\|x_j\|^2-2x_i^Tx_j=b_{ii}+b_{jj}-2b_{ij}$로 쓸 수 있다. $\mathbf b$를 $B$의 대각성분을 모은 벡터라 하면 행렬 전체로는 $D^{(2)}=$==빈칸== 이다.

## 해설
$(\mathbf b\mathbf1^T)_{ij}=b_{ii}$, $(\mathbf1\mathbf b^T)_{ij}=b_{jj}$이므로 이 세 항의 조합이 $b_{ii}+b_{jj}-2b_{ij}$와 정확히 일치합니다.

**정답: $\mathbf b\mathbf1^T + \mathbf1\mathbf b^T - 2B$**

## 예시
세 점 $(0,0),(3,0),(0,4)$(변의 길이가 3,4,5인 직각삼각형)의 좌표는 모른다고 하고, 제곱거리행렬만 주어졌다고 해봅니다.
$$D^{(2)}=\begin{pmatrix}0&9&16\\9&0&25\\16&25&0\end{pmatrix}$$
중심화행렬 $J=I-\frac13\mathbf1\mathbf1^T$로 이중중심화를 하면
$$B=-\frac12JD^{(2)}J\approx\begin{pmatrix}2.778&-0.222&-2.556\\-0.222&5.778&-5.556\\-2.556&-5.556&8.111\end{pmatrix}$$
를 얻습니다. 이 행렬을 고유분해하면 고유값은 약 $12.96,\ 3.70,\ 0$입니다(세 번째가 정확히 0인 것은 $J$의 랭크가 $n-1=2$라 세 점이 항상 2차원 평면 안에 놓일 수 있음을 보여줍니다). 상위 두 고유벡터로 좌표를 복원하면 원래 삼각형과 회전·반사 관계에 있을 뿐, 점들 사이의 거리는 원래의 $D^{(2)}$와 정확히 일치합니다.
