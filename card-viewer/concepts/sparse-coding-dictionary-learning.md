---
slug: sparse-coding-dictionary-learning
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: 희소코딩과 사전학습: 교대최적화와 스케일 모호성
related: L2 정규화와 가우시안 사전분포 하의 MAP 추정 · 언더컴플리트 오토인코더=PCA 동치성
---

## 도입
데이터를 몇 개의 "기본 패턴"(사전, dictionary)의 조합으로 표현하되 그 조합이 최대한 희소(sparse)하길 바란다면 어떻게 학습해야 할까요. 사전과 계수를 동시에 최적화하는 문제는 까다롭지만, 하나를 고정하면 나머지는 볼록문제가 되는 성질(biconvexity)을 이용해 번갈아 최적화하면 됩니다.

## 명제
데이터 $\{x_i\}_{i=1}^n\subset\mathbb{R}^d$, 사전 $D\in\mathbb{R}^{d\times p}$ (열 $d_j$가 기저원소), 계수 $a_i\in\mathbb{R}^p$에 대해 희소코딩의 목적함수를 $$J(D,\{a_i\}) = \sum_{i=1}^n \left(\|x_i-Da_i\|_2^2 + \lambda\|a_i\|_1\right),\quad \text{단 } \|d_j\|_2\le1\ \forall j$$ 라 하면, (i) 열 노름 제약이 없으면 $\inf J=0$으로 문제가 퇴화하고, (ii) $D$를 고정하면 각 $a_i$에 대한 부분문제는 볼록(Lasso)이고 $\{a_i\}$를 고정하면 $D$에 대한 부분문제도 (제약집합이 볼록이므로) 볼록이다 — 따라서 교대최소화(alternating minimization)가 매 단계 $J$를 비증가시킨다.

## 그림
<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
<text x="40" y="30" font-size="12">사전 D의 원자들</text>
<line x1="40" y1="150" x2="80" y2="60" class="dg-dim" stroke-width="1.2" stroke-dasharray="3,3"/>
<line x1="40" y1="150" x2="110" y2="90" class="dg-stroke-accent" stroke-width="2.5"/>
<line x1="40" y1="150" x2="60" y2="55" class="dg-dim" stroke-width="1.2" stroke-dasharray="3,3"/>
<line x1="40" y1="150" x2="130" y2="120" class="dg-dim" stroke-width="1.2" stroke-dasharray="3,3"/>
<line x1="40" y1="150" x2="95" y2="170" class="dg-stroke-accent" stroke-width="2.5"/>
<line x1="40" y1="150" x2="20" y2="80" class="dg-dim" stroke-width="1.2" stroke-dasharray="3,3"/>
<text x="105" y="82" font-size="10">d_i (사용됨)</text>
<text x="95" y="185" font-size="10">d_j (사용됨)</text>
<text x="30" y="45" font-size="10" class="dg-dim">나머지 원자는 계수 0</text>
<line x1="220" y1="150" x2="270" y2="150" class="dg-line" stroke-width="2"/>
<polygon points="270,150 260,145 260,155" class="dg-stroke-ink"/>
<text x="225" y="135" font-size="11">= a_i d_i + a_j d_j</text>
<line x1="290" y1="150" x2="380" y2="80" class="dg-stroke-ink" stroke-width="3"/>
<text x="385" y="80" font-size="12">x (데이터)</text>
</svg>

_데이터 벡터 x는 사전 원자 중 소수(굵은 화살표)만의 가중합으로 희소하게 표현된다._

## 문제
만약 열 노름 제약 $\|d_j\|\le1$이 없다면 어떤 일이 생기는지 먼저 본다. 임의의 $c>1$에 대해 $D':=cD$, $a_i':=a_i/c$ 로 바꾸면 재구성항은 $\|x_i-D'a_i'\|^2 = \|x_i-D(c\cdot\frac1c)a_i\|^2 = \|x_i-Da_i\|^2$ 로 그대로지만, 희소 벌점항은 $\lambda\|a_i'\|_1 = $==빈칸== 로 바뀐다.

## 해설
a_i'=a_i/c이므로 L1 노름은 절댓값의 합인데 스칼라를 곱하면 그 절댓값만큼 노름도 스케일돼서 ‖a_i/c‖_1 = (1/c)‖a_i‖_1이 되고, 앞의 λ와 곱하면 (λ/c)·‖a_i‖_1이 돼요.

**정답: $\frac{\lambda}{c}\|a_i\|_1$**

## 예시
$D_0=I_2$ (2×2 항등행렬), $a_0=(2,3)$, $x=D_0a_0=(2,3)$, $\lambda=0.5$ 라 하면 원래 목적함수 값은 $$J = \|x-D_0a_0\|^2+\lambda\|a_0\|_1 = 0+0.5(2+3)=2.5$$ 입니다.

이제 $c=10$으로 $D_c=10D_0$, $a_c=a_0/10=(0.2,0.3)$ 로 바꾸면 재구성은 여전히 완벽합니다($D_ca_c=D_0a_0=x$ 이므로 오차항은 0). 하지만 벌점항은 $$\lambda\|a_c\|_1=0.5(0.2+0.3)=0.25$$ 로 줄어들어 전체 $J=0.25$ 가 되고, $c=100$이면 $J=0.025$ 로 더 줄어듭니다. 열 노름 제약이 없다면 $c\to\infty$에서 $J\to0$으로 무의미하게 퇴화함을 수치로 확인할 수 있습니다.
