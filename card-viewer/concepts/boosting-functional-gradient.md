---
slug: boosting-functional-gradient
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 근사 · 적분
title: 부스팅과 함수공간 경사하강법: AdaBoost에서 그래디언트 부스팅까지
related: SGD의 확률적 수렴(Robbins-Monro 조건)
---

## 도입
약한 분류기 여러 개를 순차적으로 더해서 강한 분류기를 만드는 부스팅은 언뜻 보면 임의적인 휴리스틱처럼 보입니다. 그런데 이 과정을 "매 단계마다 손실함수를 가장 빠르게 줄이는 방향으로 함수를 한 걸음 옮긴다"는 관점으로 보면, 부스팅은 사실 함수공간에서의 경사하강법이라는 것이 드러납니다. AdaBoost는 그 경사하강법을 지수손실이라는 특정 손실함수에 적용했을 때 나오는 특수한 경우일 뿐입니다.

## 명제
가법모델 $F_m(x)=\sum_{k=1}^m \beta_k h_k(x)$를 전방향 단계적 방식(forward stagewise)으로 구성하되, 매 단계 $(\beta_m,h_m)=\arg\min_{\beta,h}\sum_{i=1}^n L(y_i, F_{m-1}(x_i)+\beta h(x_i))$ 를 풀어 추가한다고 하자. 손실함수로 지수손실 $L(y,F)=\exp(-yF)$, $y\in\{-1,1\}$, $h(x)\in\{-1,1\}$를 쓰면, 위 최소화 문제의 해는 정확히 AdaBoost의 가중치 갱신 규칙과 일치한다. 더 일반적으로, 미분가능한 손실 $L$에 대해 $h_m$을 훈련점에서의 음의 그래디언트 $-\partial L(y_i,F(x_i))/\partial F(x_i)\big|_{F=F_{m-1}}$에 최소제곱으로 맞추는 것은 함수공간에서 $J(F)=\sum_i L(y_i,F(x_i))$의 최급강하 방향을 따르는 것과 동일하며, 지수손실을 넣으면 이 일반 절차가 AdaBoost로 환원된다.

## 그림
<svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="75" width="90" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="85" y="105" font-size="13" text-anchor="middle">F0</text>
<path d="M130,100 L220,100" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="220,100 208,94 208,106" class="dg-stroke-accent"/>
<text x="175" y="88" font-size="11" text-anchor="middle">+β1h1</text>
<path d="M150,130 Q175,155 200,130" fill="none" class="dg-dim" stroke-width="1.5" stroke-dasharray="3,2"/>
<rect x="230" y="75" width="90" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="275" y="105" font-size="13" text-anchor="middle">F1</text>
<path d="M320,100 L410,100" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="410,100 398,94 398,106" class="dg-stroke-accent"/>
<text x="365" y="88" font-size="11" text-anchor="middle">+β2h2</text>
<path d="M340,130 Q365,155 390,130" fill="none" class="dg-dim" stroke-width="1.5" stroke-dasharray="3,2"/>
<rect x="420" y="75" width="90" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="465" y="105" font-size="13" text-anchor="middle">F2</text>
<path d="M510,100 L600,100" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="600,100 588,94 588,106" class="dg-stroke-accent"/>
<text x="555" y="88" font-size="11" text-anchor="middle">+β3h3</text>
<path d="M530,130 Q555,155 580,130" fill="none" class="dg-dim" stroke-width="1.5" stroke-dasharray="3,2"/>
<rect x="610" y="75" width="110" height="50" fill="none" class="dg-stroke-accent" stroke-width="3"/>
<text x="665" y="105" font-size="13" text-anchor="middle">F3=Σβkhk</text>
<text x="180" y="185" font-size="11" class="dg-dim" text-anchor="middle">잔차/음의 그래디언트에 순차 적합</text>
</svg>

_매 단계 약한 학습기가 이전 잔차(음의 그래디언트)를 적합해 누적 모델에 더해진다._

## 문제
$h(x_i)\in\{-1,1\}$, $y_i\in\{-1,1\}$이므로 $-y_i\beta h(x_i)$는 맞힌 경우($y_i=h(x_i)$) $-\beta$, 틀린 경우($y_i\neq h(x_i)$) $+\beta$ 값을 갖는다. 따라서 $\beta>0$일 때 $J(\beta,h)=$==빈칸== 로 두 그룹의 합으로 쪼개 쓸 수 있다. 여기서 $\mathrm{err}(h)=\sum_i w_i^{(m)}\mathbf{1}[y_i\neq h(x_i)]$, $W=\sum_i w_i^{(m)}$ 이다.

## 해설
맞힌 데이터들의 가중치 합은 $W-\mathrm{err}(h)$이고 여기에 $e^{-\beta}$가, 틀린 데이터들의 가중치 합인 $\mathrm{err}(h)$에는 $e^{\beta}$가 곱해지므로 이렇게 두 항으로 나뉩니다.

**정답: $e^{-\beta}\big(W-\mathrm{err}(h)\big)+e^{\beta}\,\mathrm{err}(h)$**

## 예시
추상적인 유도에 들어가기 전에, 데이터 3개짜리 장난감 예제로 AdaBoost의 가중치 갱신을 직접 계산해봅니다.

레이블이 $y=(1,1,-1)$이고, 첫 번째 약한 분류기의 예측이 $h=(1,-1,-1)$이라고 합시다. 즉 1번, 3번 데이터는 맞히고 2번 데이터는 틀립니다. 초기 가중치는 균등하게 $w_i^{(1)}=1/3$입니다.

가중오차율은 $\mathrm{errRate}=w_2^{(1)}=1/3$이고, 이로부터
$$\beta_1=\frac12\ln\frac{1-1/3}{1/3}=\frac12\ln 2\approx 0.3466$$
가 나옵니다. 이 $\beta_1$으로 가중치를 갱신하면(맞힌 데이터는 $e^{-\beta_1}=2^{-1/2}\approx0.7071$배, 틀린 데이터는 $e^{\beta_1}=2^{1/2}\approx1.4142$배 하고 정규화)
$$w^{(2)}=(0.25,\ 0.5,\ 0.25)$$
가 됩니다. 틀렸던 2번 데이터의 가중치가 $1/3\to0.5$로 커지고 맞힌 데이터들의 가중치는 $1/3\to0.25$로 줄어, 다음 약한 분류기가 틀렸던 데이터에 더 집중하도록 유도됩니다.
