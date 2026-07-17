---
slug: marchenko-pastur-law
theme: LINALG2
domainLabel: 선형대수 심화
subLabel: 랜덤행렬 · 저랭크
title: 마르첸코-파스투르(Marchenko–Pastur) 법칙: 표본공분산 고유값의 극한분포
related: 
---

## 도입
PCA는 표본공분산행렬의 고유벡터를 신호로 해석합니다. 그런데 표본 수 $n$이 변수 개수 $p$에 비해 그리 크지 않다면, 진짜 신호가 하나도 없는 순수한 잡음에서조차 표본공분산행렬의 고유값들이 전부 $1$ 근처에 모이지 않고 넓은 구간에 퍼져버립니다. 마르첸코-파스투르 법칙은 이 퍼짐이 정확히 어떤 모양인지를 알려주는 정리예요. 여기서는 완전한 확률론적 증명 대신, 정리가 말하는 바를 정확히 세우고 $n\approx p$인 정방행렬에 가까운 극단 사례에서 핵심 모멘트 계산으로 그 논거를 확인합니다.

## 명제
$X\in\mathbb{R}^{n\times p}$의 성분이 서로 독립이고 평균 $0$, 분산 $1$(4차 모멘트 $\mu_4$는 유한)인 확률변수들이라 하자. 표본공분산행렬을 $S=\frac1nX^TX$라 하고 $n,p\to\infty$일 때 $p/n\to c\in(0,\infty)$라 하자. 그러면 $S$의 고유값들의 경험분포(empirical spectral distribution)는 마르첸코-파스투르 분포로 수렴하며, 그 분포는 $[(1-\sqrt c)^2,(1+\sqrt c)^2]$ 구간에서 밀도를 가지고(첫 번째 모멘트는 $1$, 두 번째 모멘트는 $1+c$) $c>1$이면 $0$에 $1-1/c$만큼의 점질량을 추가로 갖는다.

## 그림
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="62" y="130" width="28" height="40" class="dg-dim"/>
  <rect x="92" y="50" width="28" height="120" class="dg-dim"/>
  <rect x="122" y="35" width="28" height="135" class="dg-dim"/>
  <rect x="152" y="42" width="28" height="128" class="dg-dim"/>
  <rect x="182" y="60" width="28" height="110" class="dg-dim"/>
  <rect x="212" y="80" width="28" height="90" class="dg-dim"/>
  <rect x="242" y="100" width="28" height="70" class="dg-dim"/>
  <rect x="272" y="115" width="28" height="55" class="dg-dim"/>
  <rect x="302" y="128" width="28" height="42" class="dg-dim"/>
  <rect x="332" y="138" width="28" height="32" class="dg-dim"/>
  <rect x="362" y="146" width="28" height="24" class="dg-dim"/>
  <rect x="392" y="153" width="28" height="17" class="dg-dim"/>
  <rect x="422" y="160" width="28" height="10" class="dg-dim"/>
  <path d="M60,170 C75,90 100,45 150,42 C210,40 260,80 320,120 C370,148 420,163 458,170" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
  <line x1="40" y1="170" x2="520" y2="170" class="dg-line" stroke-width="1.5"/>
  <line x1="160" y1="170" x2="160" y2="34" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="164" y="42" class="dg-dim" font-size="11">"다 1일 것"(착각)</text>
  <text x="150" y="28" font-size="12" text-anchor="middle">MP 밀도</text>
  <text x="42" y="188" font-size="12">(1−√c)²</text>
  <text x="415" y="188" font-size="12">(1+√c)²</text>
  <text x="355" y="112" class="dg-dim" font-size="11">경험 히스토그램</text>
  <text x="500" y="185" class="dg-dim" font-size="11">λ</text>
</svg>

_순수 잡음의 표본공분산 고유값(히스토그램)은 1로 뭉치지 않고, 마르첸코-파스투르 밀도가 예측하는 폭 c만큼 [(1−√c)²,(1+√c)²] 구간에 퍼진다._

## 문제
$S=\frac1nX^TX$의 $i$번째 대각성분은 $S_{ii}=\frac1n\sum_{k=1}^nX_{ki}^2$이다. $X$의 성분들이 평균 $0$, 분산 $1$이므로 $E[X_{ki}^2]=1$이고, 따라서 $E[S_{ii}] = \frac1n\sum_{k=1}^n E[X_{ki}^2] = $==빈칸== 이다. 이는 $i$에 상관없이 항상 같으므로 $m_1=\frac1pE[\mathrm{tr}(S)]$도 같은 값이다.

## 해설
$\frac1n$과 $n$개 항 각각의 기댓값 $1$을 곱해서 더하면 $\frac1n\times n\times1=1$이 돼요. 표본 수 $n$과 무관하게 항상 $1$이라는 게 핵심이에요.

**정답: $1$**

## 예시
$n=p=2$처럼 아주 작은 경우에는 극한법칙 자체가 정확히 나타나진 않지만, 손으로 계산해보면 잡음뿐인 행렬의 고유값이 왜 $1$ 하나로 뭉치지 않는지 직관을 얻을 수 있습니다.

$X=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ (평균 $0$, 분산 $1$인 $\pm1$ 확률변수의 한 실현값이라 하자)이라 하면 $S=\frac12X^TX=\frac12\begin{pmatrix}2&2\\2&2\end{pmatrix}=\begin{pmatrix}1&1\\1&1\end{pmatrix}$이고, 이 행렬의 고유값은 $2$와 $0$입니다. 두 값 모두 $1$이 아닙니다.

$c=p/n=1$일 때 명제가 말하는 극한분포의 지지구간은 $[(1-\sqrt1)^2,(1+\sqrt1)^2]=[0,4]$인데, 방금 얻은 고유값 $0,2$는 정확히 이 구간 안에 있습니다. 다른 부호 조합을 뽑으면 고유값이 또 달라지겠지만(예: $X=\begin{pmatrix}1&-1\\1&1\end{pmatrix}$이면 $X^TX=2I$가 되어 $S=I$, 고유값이 둘 다 $1$), 매번 $[0,4]$ 구간 안에서 요동칩니다.

아래 증명은 $n,p\to\infty$로 보냈을 때 이 요동의 크기(분산)가 정확히 $c$로 수렴한다는 것을 모멘트 계산으로 확인합니다.
