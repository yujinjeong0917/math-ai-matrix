---
slug: axis-numerical-analysis
theme: AXIS
domainLabel: 매트릭스 읽는 법
subLabel: 매트릭스 행 · 수학 대분류
title: 수치해석 · 기하 — 이론이 부동소수점에서 버티는가
related: 조건수와 선형시스템의 오차 민감도 · 매니폴드 가정과 국소 자유도 · LU분해: 가우스소거법의 행렬 형태 · 켤레기울기법(CG)
---

## 도입
종이 위에서 손으로 푸는 수식과 컴퓨터 안의 부동소수점 연산은 사실 다른 세계예요. 이론적으로는 정확히 맞는 식도 실수를 유한한 자리수로 잘라 저장하는 순간부터 아주 작은 오차를 갖게 되고, 그 오차는 계산을 반복할수록 쌓여가요.

수치해석은 이 오차가 얼마나 빨리 커지는지, 그리고 그걸 억제하려면 계산을 어떻게 짜야 하는지를 다루는 수학이에요. 큰 행렬을 있는 그대로 역행렬로 뒤집는 건 계산량도 $O(n^3)$ 규모로 크고 오차에도 취약해서, 실제로는 반복법으로 답에 조금씩 다가가는 방식을 훨씬 많이 써요.

딥러닝 학습이 실제로 발산하지 않고 수렴하는 이유의 상당 부분도 여기서 설명돼요. 그래디언트가 소실되거나 폭주하지 않게 하는 것, 학습이 흔들리지 않게 안정화하는 것 전부 수치해석이 다루는 문제예요.

기초 매트릭스에서는 수치적 안정성과 기하·측도 두 중분류로 나뉘어요. 조건수가 왜 오차 민감도를 결정하는지, 매니폴드 가정이 왜 고차원 데이터를 다루는 전제가 되는지가 여기 들어가요.

심화 매트릭스로 가면 직접법, 고유값 알고리즘, 반복법, 안정성과 조건화, 고속변환·합성곱(num2) 다섯 갈래로 갈라져요. LU분해나 QR분해 같은 직접법, 거듭제곱법 같은 고유값 알고리즘, 켤레기울기법 같은 반복법이 사실은 전부 "큰 선형시스템을 어떻게 하면 안 터지게 풀 것인가"라는 같은 질문에 대한 서로 다른 답이에요.

## 명제


## 그림
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
<line x1="345" y1="20" x2="345" y2="240" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<text x="170" y="20" font-size="13" text-anchor="middle">수렴하는 경우</text>
<text x="515" y="20" font-size="13" text-anchor="middle">발산하는 경우</text>
<line x1="40" y1="220" x2="300" y2="220" class="dg-line" stroke-width="1.2"/>
<line x1="40" y1="70" x2="300" y2="70" class="dg-line" stroke-width="1" stroke-dasharray="5,3"/>
<text x="305" y="73" font-size="11" class="dg-dim">x*(고정점)</text>
<path d="M60,200 H100 V150 H140 V115 H180 V90 H220 V78 H260 V72" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="60" cy="200" r="4" class="dg-accent"/>
<circle cx="100" cy="150" r="4" class="dg-accent"/>
<circle cx="140" cy="115" r="4" class="dg-accent"/>
<circle cx="180" cy="90" r="4" class="dg-accent"/>
<circle cx="220" cy="78" r="4" class="dg-accent"/>
<circle cx="260" cy="72" r="4" class="dg-accent"/>
<line x1="370" y1="220" x2="660" y2="220" class="dg-line" stroke-width="1.2"/>
<line x1="370" y1="190" x2="660" y2="190" class="dg-line" stroke-width="1" stroke-dasharray="5,3"/>
<text x="600" y="185" font-size="11" class="dg-dim">목표값</text>
<path d="M390,200 H430 V175 H470 V130 H510 V70 H550 V20" fill="none" class="dg-stroke-accent" stroke-width="2.3"/>
<circle cx="390" cy="200" r="4" class="dg-accent"/>
<circle cx="430" cy="175" r="4" class="dg-accent"/>
<circle cx="470" cy="130" r="4" class="dg-accent"/>
<circle cx="510" cy="70" r="4" class="dg-accent"/>
<circle cx="550" cy="20" r="4" class="dg-accent"/>
<line x1="550" y1="20" x2="550" y2="6" class="dg-stroke-accent" stroke-width="2.3"/>
<polygon points="550,6 545,16 555,16" class="dg-stroke-accent"/>
<text x="560" y="15" font-size="11" class="dg-dim">발산 → ∞</text>
</svg>

_같은 형태의 반복법이라도 왼쪽처럼 계단 폭이 줄며 고정점에 수렴하기도 하고, 오른쪽처럼 폭이 커지며 발산하기도 한다._

## 문제
조건수 $\kappa(A)$가 큰 시스템일수록 입력의 아주 작은 오차가 출력에서는 훨씬 크게 벌어진다. 이 관계는 $Ax=b$의 해에 대해 상대오차 부등식 $\dfrac{\|\delta x\|}{\|x\|}\le \kappa(A)\cdot\dfrac{\|\delta b\|}{\|b\|}$ 로 표현된다. 만약 $\kappa(A)=10^6$이고 입력의 상대오차가 $10^{-8}$ 수준이라면, 해의 상대오차는 최대 ==빈칸== 수준까지 커질 수 있다.

## 해설
부등식 우변에 숫자를 대입하면 $10^6\times 10^{-8}=10^{-2}$이 나와요. 입력 오차는 아주 작았는데도 조건수가 크면 출력 오차가 눈에 띄게 커질 수 있다는 걸 구체적인 수치로 보여줘요.

**정답: $10^{-2}$**

## 예시
수치적 안정성 쪽에서는 condition-number가 조건수가 큰 시스템일수록 입력의 아주 작은 오차가 출력에서는 훨씬 크게 벌어진다는 걸 보여줘요.

기하·측도 쪽에서는 manifold-hypothesis가 고차원 데이터도 실제로는 훨씬 낮은 차원의 매니폴드 위에 놓여 있다는 가정을 다뤄요.

심화 매트릭스에서는 lu-decomposition이 큰 선형시스템을 직접 푸는 법을, conjugate-gradient가 같은 시스템을 반복법으로 근사하는 법을 보여주고, floating-point-error는 그 계산 과정에서 오차가 어떻게 누적되는지를 다뤄요.
