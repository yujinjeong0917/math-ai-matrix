---
slug: gaussian-process-regression
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 가우시안 프로세스 회귀: 무한차원으로 확장한 가우시안 조건화
related: 가우시안 조건부분포(Schur complement) · 베이지안 선형회귀 사후분포
---

## 도입
베이지안 선형회귀는 파라미터 $w$ 위에 사전분포를 둡니다. 가우시안 프로세스는 한 걸음 더 나아가 함수 $f$ 자체 위에(무한차원) 사전분포를 두는데, 신기하게도 유한개의 관측점에서는 여전히 유한차원 가우시안 조건화 공식을 그대로 쓸 수 있습니다.

## 명제
$f\sim GP(0,k)$, $y_i=f(x_i)+\varepsilon_i$($\varepsilon_i\overset{iid}\sim N(0,\sigma^2)$)일 때, $K=K(X,X)$, $k_*=K(X,x_*)$, $k_{**}=k(x_*,x_*)$ 라 하면 $$f_*\mid X,y,x_*\sim N\big(k_*^T(K+\sigma^2I)^{-1}y,\ k_{**}-k_*^T(K+\sigma^2I)^{-1}k_*\big)$$ 로 닫힌형 사후예측분포를 얻는다.

## 그림
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="190" x2="600" y2="190" class="dg-line" stroke-width="1"/>
<polyline points="60,72 120,92 190,75 260,112 340,77 420,97 500,75 545,70" fill="none" class="dg-dim" stroke-width="1.5" stroke-dasharray="5,3"/>
<polyline points="60,145 120,108 190,145 260,128 340,147 420,113 500,145 545,150" fill="none" class="dg-dim" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="60" y1="72" x2="76" y2="87" class="dg-dim" stroke-width="1"/>
<line x1="90" y1="79" x2="106" y2="94" class="dg-dim" stroke-width="1"/>
<line x1="150" y1="82" x2="166" y2="97" class="dg-dim" stroke-width="1"/>
<line x1="220" y1="90" x2="236" y2="105" class="dg-dim" stroke-width="1"/>
<line x1="290" y1="97" x2="306" y2="112" class="dg-dim" stroke-width="1"/>
<line x1="360" y1="90" x2="376" y2="105" class="dg-dim" stroke-width="1"/>
<line x1="440" y1="103" x2="456" y2="118" class="dg-dim" stroke-width="1"/>
<line x1="510" y1="85" x2="526" y2="100" class="dg-dim" stroke-width="1"/>
<path d="M40,110 Q80,105 120,100 Q190,90 260,120 Q340,140 420,105 Q500,95 580,110" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<circle cx="120" cy="100" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="260" cy="120" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="420" cy="105" r="5" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="40" y="20" font-size="12">평균함수(굵은 선)와 신뢰구간(해칭 밴드)</text>
<text x="440" y="20" font-size="11" class="dg-dim">관측점 근처는 좁고 먼 곳은 넓음</text>
</svg>

_관측점(원)을 지나는 평균함수 주변으로 신뢰구간이 관측점 근처에서는 좁고 멀어질수록 넓어진다._

## 문제
이 결합분포는 앞서 유한차원 가우시안의 조건부분포(Schur complement) 결과에서 '조건을 거는 블록'을 $y$, '조건부를 구할 블록'을 $f_*$로 놓은 특수한 경우다. 그 결과의 표기 $\Sigma_{xx},\Sigma_{xy},\Sigma_{yy}$ 를 지금 문제에 맞게 대응시키면 $\Sigma_{xx}=k_{**}$, $\Sigma_{xy}=k_*^T$, $\Sigma_{yx}=k_*$, $\Sigma_{yy}=$==빈칸==

## 해설
결합분포의 $(y,y)$ 블록이 바로 $\Sigma_{yy}$에 대응하고, 위에서 썼듯이 이 블록은 커널행렬에 잡음분산을 더한 $K+\sigma^2I$입니다.

**정답: $K+\sigma^2I$**

## 예시
RBF 커널 $k(x,x')=\exp(-(x-x')^2/2)$, 관측잡음 $\sigma^2=0.1$을 쓰고, 학습점 하나 $x_1=0,\,y_1=1$만 있다고 하자. 테스트점 $x_*=1$에서 $K=k(0,0)=1$, $k_*=k(0,1)=e^{-0.5}\approx0.6065$, $k_{**}=k(1,1)=1$이다.

공식에 대입하면 사후평균은 $k_*(K+\sigma^2)^{-1}y_1 = 0.6065/1.1\approx0.551$이고, 사후분산은 $k_{**}-k_*^2/(K+\sigma^2)=1-0.6065^2/1.1\approx0.666$이다. 즉 $f_*\mid y \sim N(0.551,\,0.666)$으로, 학습점에서 멀어질수록(=관측과의 커널유사도가 낮아질수록) 사후평균은 사전평균 0 쪽으로, 사후분산은 사전분산 $k_{**}=1$ 쪽으로 되돌아간다.
