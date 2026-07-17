---
slug: slow-feature-analysis
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: Slow Feature Analysis: 느림 목적함수의 일반화 고유값문제 환원
related: 판별분석(LDA)
---

## 도입
센서로 들어오는 원시 신호는 빠르게 요동치지만, 그 신호가 나타내는 "의미"(예: 물체의 위치)는 보통 천천히 변합니다. Slow Feature Analysis(SFA)는 원시 신호로부터 가장 느리게 변하는 성분을 뽑아내는 방법입니다. 목적함수만 보면 새로워 보이지만, 이 문제도 결국 일반화 고유값문제로 환원됩니다.

## 명제
시계열 $x(t)\in\mathbb{R}^d$가 평균 0이라 하고 $C=\langle x(t)x(t)^T\rangle_t$, $\dot C=\langle \dot x(t)\dot x(t)^T\rangle_t$ (여기서 $\dot x(t)=x(t+1)-x(t)$)라 하자. 선형특징 $y(t)=w^Tx(t)$에 대해 단위분산 제약 $w^TCw=1$ 하에서 시간적 변화율의 분산 $\langle \dot y(t)^2\rangle_t=w^T\dot Cw$를 최소화하는 $w$는 일반화 고유값문제 $\dot Cw=\lambda Cw$의 최소 고유값에 대응하는 고유벡터이며, 서로 다른 고유값에 대응하는 고유벡터들은 $w_i^TCw_j=0$을 만족해 자동으로 비상관 제약도 충족한다.

## 그림
<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="55" x2="450" y2="55" class="dg-dim" stroke-width="1"/>
<path d="M 30,55 Q 45,25 60,55 Q 75,85 90,55 Q 105,25 120,55 Q 135,85 150,55 Q 165,25 180,55 Q 195,85 210,55 Q 225,25 240,55 Q 255,85 270,55 Q 285,25 300,55 Q 315,85 330,55 Q 345,25 360,55 Q 375,85 390,55 Q 405,25 420,55 Q 435,85 450,55" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<text x="35" y="30" font-size="12">원신호 x(t): 빠르게 진동</text>
<line x1="30" y1="150" x2="450" y2="150" class="dg-dim" stroke-width="1"/>
<path d="M 30,150 Q 130,110 240,150 Q 350,190 450,150" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="35" y="180" font-size="12">추출된 특징 y(t): 천천히 변화</text>
<line x1="240" y1="20" x2="240" y2="185" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<text x="245" y="15" font-size="10" class="dg-dim">시간 t →</text>
</svg>

_빠르게 진동하는 원신호와 그로부터 추출된 천천히 변하는 특징을 같은 시간축 위에서 비교한다._

## 문제
라그랑지안은 $L(w,\lambda)=w^T\dot Cw-\lambda(w^TCw-1)$이다. $w$에 대해 미분하여 0으로 놓으면 $2\dot Cw-2\lambda Cw=$==빈칸== 이다.

## 해설
정류점(임계점) 조건은 그래디언트가 0이 되는 것이므로 우변은 0이에요.

**정답: $0$**

## 예시
$C=\begin{pmatrix}2&0\\0&1\end{pmatrix}$, $\dot C=\begin{pmatrix}1&0\\0&4\end{pmatrix}$인 경우를 봅니다. 두 좌표가 이미 비상관이라 가정한 것입니다.

일반화 고유값문제 $\dot Cw=\lambda Cw$는 대각행렬끼리라 좌표축 방향이 그대로 고유벡터입니다. $w=(1,0)$ 방향은 $\lambda=\dot C_{11}/C_{11}=1/2$, $w=(0,1)$ 방향은 $\lambda=\dot C_{22}/C_{22}=4$입니다. 단위분산 제약을 맞추기 위해 $w_1=(1,0)/\sqrt2$로 정규화하면 $w_1^TCw_1=1$이고 실제 느림 값 $w_1^T\dot Cw_1=1/2$로 고유값과 일치합니다. 두 번째 좌표는 분산이 더 작은데도($1<2$) 변화율은 더 커서($4>1$) 상대적으로 훨씬 빠른 성분이며, 실제로 SFA는 이 좌표를 제쳐두고 첫 번째 좌표를 가장 느린 특징으로 선택합니다.
