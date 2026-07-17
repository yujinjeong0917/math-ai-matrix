---
slug: ridge-pca-shrinkage
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 릿지회귀와 주성분 수축: 특이값 관점의 축소
related: 주성분분석(PCA)
---

## 도입
선형회귀에 릿지 정칙화를 걸면 계수가 전체적으로 작아진다는 것은 잘 알려져 있습니다. 그런데 모든 방향이 똑같이 줄어드는 것은 아니에요. 데이터의 분산이 작은 방향(주성분 분해에서 작은 특이값에 대응하는 방향)일수록 훨씬 더 세게 눌립니다.

## 명제
설계행렬 $X\in\mathbb{R}^{n\times d}$의 특이값분해를 $X=UDV^T$ ($D=\mathrm{diag}(d_1,\dots,d_d)$)라 하자. 릿지회귀 적합값 $X\hat\beta_{ridge}=X(X^TX+\lambda I)^{-1}X^Ty$는 $X\hat\beta_{ridge}=\sum_{j=1}^d u_j\dfrac{d_j^2}{d_j^2+\lambda}(u_j^Ty)$로 쓸 수 있다. 즉 $j$번째 주성분 방향 $u_j$의 성분은 계수 $\dfrac{d_j^2}{d_j^2+\lambda}\in(0,1)$만큼 수축되며, 이 계수는 $d_j$가 작을수록(그 방향의 데이터 분산이 작을수록) 0에 가까워져 더 강하게 수축된다.

## 그림
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="140" cy="100" rx="90" ry="35" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="140" y="20" font-size="12" text-anchor="middle">원본 (OLS, λ=0)</text>
<line x1="50" y1="100" x2="230" y2="100" class="dg-dim" stroke-width="1"/>
<line x1="140" y1="65" x2="140" y2="135" class="dg-dim" stroke-width="1"/>
<line x1="240" y1="100" x2="290" y2="100" class="dg-line" stroke-width="2"/>
<polygon points="290,100 280,95 280,105" class="dg-stroke-ink"/>
<text x="235" y="85" font-size="10">릿지 수축</text>
<ellipse cx="360" cy="100" rx="55" ry="12" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="360" y="20" font-size="11" text-anchor="middle">릿지 후 (λ&gt;0)</text>
<text x="360" y="135" font-size="9" class="dg-dim" text-anchor="middle">긴 축은 조금, 짧은 축은 많이 수축</text>
</svg>

_특이값이 큰 방향(긴 축)은 조금만, 작은 방향(짧은 축)은 훨씬 강하게 수축된다._

## 문제
$X^TX+\lambda I = VD^2V^T+\lambda VV^T = V(D^2+\lambda I)V^T$이므로 역행렬은 $(X^TX+\lambda I)^{-1}=$==빈칸== 이다.

## 해설
직교행렬 $V$로 낀 대각행렬의 역행렬은 같은 $V$로 다시 끼우고 대각성분만 뒤집으면 돼요. $V^TV=I$이므로 $V(D^2+\lambda I)^{-1}V^T$가 정확한 역행렬이에요.

**정답: $V(D^2+\lambda I)^{-1}V^T$**

## 예시
먼저 숫자로 확인합니다. $X=\begin{pmatrix}2&0\\0&1\\0&0\end{pmatrix}$라 하면 열이 이미 서로 직교하므로 특이값분해는 $D=\mathrm{diag}(2,1)$, $U$의 첫 두 열이 $(1,0,0)^T,(0,1,0)^T$, $V=I_2$입니다.

$\lambda=3$, $y=(1,1,1)^T$라 하면 $X^Ty=(2,1)^T$이고 $X^TX+\lambda I=\mathrm{diag}(7,4)$이므로 $\hat\beta_{ridge}=(2/7,\,1/4)^T$, 즉 $X\hat\beta_{ridge}=(4/7,\,1/4,\,0)^T$입니다.

이를 수축 공식으로 다시 확인하면 $u_1^Ty=1$, $u_2^Ty=1$이고 수축계수는 $d_1^2/(d_1^2+\lambda)=4/7\approx0.571$, $d_2^2/(d_2^2+\lambda)=1/4=0.25$이므로 $X\hat\beta_{ridge}=\frac47u_1+\frac14u_2=(4/7,1/4,0)^T$로 정확히 일치합니다. 특이값이 작은 두 번째 방향($d_2=1$)이 첫 번째 방향($d_1=2$)보다 훨씬 강하게(0.25 대 0.571) 수축되었습니다.
