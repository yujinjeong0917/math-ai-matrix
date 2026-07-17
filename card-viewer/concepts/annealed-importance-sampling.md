---
slug: annealed-importance-sampling
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: 어닐드 중요도샘플링(AIS): 중간분포 열로 분배함수 비율 추정하기
related: 중요도샘플링(일반) · 메트로폴리스-헤이스팅스(전이커널 구성)
---

## 도입
다루기 쉬운 분포 $p_0=f_0/Z_0$에서 다루기 어려운 목표분포 $p_n=f_n/Z_n$까지 한 번에 중요도샘플링을 시도하면, 두 분포가 많이 다를 때 가중치의 분산이 폭발합니다. 어닐드 중요도샘플링(AIS)은 $p_0$에서 $p_n$까지를 잇는 중간분포 열 $p_0,p_1,\dots,p_n$을 만들고, 각 단계마다 그 중간분포를 정상분포로 갖는 전이커널로 조금씩만 이동시켜 가중치를 누적합니다.

## 명제
$f_0,\dots,f_n$이 각각 $Z_j=\int f_j(x)\,dx$로 정규화되는 정상화되지 않은 밀도열이고, $T_j(x,x')$가 $p_j=f_j/Z_j$를 불변분포로 갖는 전이커널($\int p_j(x)T_j(x,x')\,dx=p_j(x')$)이라 하자. $x_0\sim p_0$, $x_j\sim T_j(x_{j-1},\cdot)$ ($j=1,\dots,n-1$)로 생성하고 $w=\prod_{j=0}^{n-1}\dfrac{f_{j+1}(x_j)}{f_j(x_j)}$라 정의하면 $\mathbb E[w]=Z_n/Z_0$이다.

## 그림
<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="190" x2="560" y2="190" class="dg-line" stroke-width="1"/>
<path d="M40,190 Q160,120 280,190" fill="none" class="dg-dim" stroke-width="1.5" stroke-dasharray="2,3"/>
<path d="M110,190 Q230,95 350,190" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<path d="M190,190 Q300,65 410,190" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="7,3"/>
<path d="M260,190 Q370,35 480,190" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="140" y="112" font-size="12" class="dg-dim">p₀(단순분포)</text>
<text x="230" y="88" font-size="12" class="dg-dim">p₁</text>
<text x="300" y="58" font-size="12">p₂</text>
<text x="380" y="28" font-size="12">pₙ(목표분포)</text>
<path d="M160,205 Q195,218 230,205" fill="none" class="dg-line" stroke-width="1.5"/>
<polygon points="230,205 220,202 222,210" class="dg-line"/>
<path d="M235,205 Q270,218 300,205" fill="none" class="dg-line" stroke-width="1.5"/>
<polygon points="300,205 290,202 292,210" class="dg-line"/>
<path d="M310,205 Q340,218 370,205" fill="none" class="dg-line" stroke-width="1.5"/>
<polygon points="370,205 360,202 362,210" class="dg-line"/>
<text x="270" y="225" font-size="11" class="dg-dim">전이커널 T₁, T₂, ... (이동 경로)</text>
</svg>

_단순분포 $p_0$에서 목표분포 $p_n$까지 중간분포열을 거치며, 각 단계의 전이커널로 조금씩만 이동해 가중치를 누적한다._

## 문제
기초단계($k=0$)를 확인한다. 가중치가 곱해지는 항이 없고(공집합 곱은 $1$) 적분할 변수도 없으므로 $h_0(x_0) = p_0(x_0) = $==빈칸== 이다.

## 해설
$p_0=f_0/Z_0$이 정의 그 자체라, 주장 $h_k=f_k/Z_0$이 $k=0$일 때 바로 성립해요.

**정답: $\dfrac{f_0(x_0)}{Z_0}$**

## 예시
지수분포 사이를 잇는 가장 단순한 경로로 확인합니다. $f_0(x)=e^{-x}$ ($Z_0=1$, $\text{Exp}(1)$), 목표 $f_2(x)=e^{-2x}$ ($Z_2=1/2$, $\text{Exp}(2)$)로 두면 참값은 $Z_2/Z_0=0.5$입니다. 중간분포는 기하평균 $f_1(x)=f_0(x)^{0.5}f_2(x)^{0.5}=e^{-1.5x}$ ($\text{Exp}(1.5)$)로 잡습니다(여기서는 전이커널 $T_j$로 각 중간분포에서 바로 재표본하는 독립샘플러를 씁니다 — $p_j$를 불변분포로 갖는 가장 단순한 예입니다).

$x_0=1\sim p_0$, $x_1=0.8\sim p_1$을 뽑았다고 합시다. 가중치를 계산하면
$$w=\frac{f_1(x_0)}{f_0(x_0)}\cdot\frac{f_2(x_1)}{f_1(x_1)}=\frac{e^{-1.5}}{e^{-1}}\cdot\frac{e^{-1.6}}{e^{-1.2}}=e^{-0.5}\cdot e^{-0.4}=e^{-0.9}\approx0.407$$
단일 표본값 $0.407$은 참값 $0.5$ 근처에 있으며(표본이 하나뿐이라 정확히 일치하지는 않습니다), 여러 개의 독립적인 $w$를 평균 내면 그 기댓값이 정확히 $0.5$로 수렴한다는 것이 이어지는 증명의 내용입니다.
