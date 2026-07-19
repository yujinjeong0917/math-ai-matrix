---
slug: pca
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 주성분분석(PCA)의 최적 방향
related: 
---

## 도입
데이터를 한 방향으로 압축해서 보고 싶습니다. 그런데 정보를 가장 많이 남기는 방향은 어떻게 고를까요. PCA의 답은 단순해요. 데이터가 가장 넓게 퍼진 방향을 고르면 돼요. 분산이 가장 큰 방향을 고르는 거예요. 그리고 그 방향은 공분산행렬의 고유벡터 중 하나로 정확히 떨어집니다.

:::def 사영분산
단위벡터 $w$ 방향으로 데이터를 사영했을 때, 그 사영값들이 퍼진 정도(분산)를 $w^T\Sigma w$로 정의한다. $w$가 가리키는 방향이 데이터가 넓게 퍼진 방향일수록 이 값이 커진다.
:::

## 명제
중심화된 데이터 행렬 $X\in\mathbb{R}^{n\times d}$의 공분산행렬을 $\Sigma=\frac{1}{n}X^TX$ 라 하자. $\|w\|=1$인 $w$ 중 사영분산 $w^T\Sigma w$를 최대화하는 것은 $\Sigma$의 최대 고유값에 대응하는 고유벡터이다.

## 그림
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="120" x2="370" y2="120" class="dg-line" stroke-width="1"/>
<line x1="200" y1="15" x2="200" y2="225" class="dg-line" stroke-width="1"/>
<ellipse cx="200" cy="120" rx="115" ry="42" transform="rotate(-38 200 120)" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
<circle cx="110" cy="185" r="4" class="dg-accent"/>
<circle cx="140" cy="168" r="4" class="dg-accent"/>
<circle cx="165" cy="150" r="4" class="dg-accent"/>
<circle cx="185" cy="145" r="4" class="dg-accent"/>
<circle cx="200" cy="122" r="4" class="dg-accent"/>
<circle cx="215" cy="112" r="4" class="dg-accent"/>
<circle cx="235" cy="100" r="4" class="dg-accent"/>
<circle cx="255" cy="90" r="4" class="dg-accent"/>
<circle cx="280" cy="75" r="4" class="dg-accent"/>
<circle cx="295" cy="60" r="4" class="dg-accent"/>
<circle cx="175" cy="110" r="4" class="dg-accent"/>
<circle cx="225" cy="145" r="4" class="dg-accent"/>
<line x1="115" y1="192" x2="288" y2="55" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="288,55 276,60 282,68" class="dg-accent"/>
<line x1="168" y1="98" x2="232" y2="150" class="dg-line" stroke-width="1.5" stroke-dasharray="3,3"/>
<text x="30" y="18" font-size="12" class="dg-dim">2D 데이터 산점도와 공분산 타원</text>
<text x="215" y="45" font-size="12">최대분산 방향(고유값 4)</text>
<text x="236" y="168" font-size="11" class="dg-dim">단축(고유값 2)</text>
</svg>

_공분산 타원의 장축은 데이터가 가장 넓게 퍼진 방향, 즉 최대 고유값에 대응하는 고유벡터와 일치한다._

## 문제
지금 목표는 $w^T\Sigma w$를 최대화하는 것이다. 다만 아무 $w$나 되는 게 아니라 $\|w\|=1$이라는 제약을 지켜야 한다. 목적함수만 놓고 미분해서는 이 제약을 반영할 수 없다. 그래서 제약이 있는 최댓값 문제를 풀 때 쓰는 표준 도구인 라그랑주 승수법을 쓴다. 제약을 어기면 벌점을 주는 새 변수 $\lambda$를 도입해서 목적함수와 제약을 하나의 식으로 합친다. 이렇게 만든 식을 라그랑지안이라 부르고 $L(w,\lambda) = w^T\Sigma w - \lambda($==빈칸==$)$ 로 쓴다.

## 해설
괄호 안에는 제약이 지켜졌는지를 0이 되는 식으로 적어요. 우리 제약은 $\|w\|=1$이에요. 이걸 $w^Tw-1=0$ 형태로 바꿔서 그대로 넣은 거예요. 이렇게 등호로 정리한 제약식을 등호 제약항이라고 불러요.

**정답: $w^Tw - 1$**

## 예시
추상적인 최적화 논증에 들어가기 전에 공분산행렬 하나를 직접 손에 쥐고 계산해보면 명제가 말하는 바가 훨씬 선명해집니다.

공분산행렬이 다음과 같다고 합시다.
$$\Sigma=\begin{pmatrix}3&1\\1&3\end{pmatrix}$$
이 행렬의 고유값은 4와 2이고 각각의 고유벡터는 $(1,1)/\sqrt2$와 $(1,-1)/\sqrt2$입니다. 실제로 $\Sigma(1,1)^T=(4,4)^T=4(1,1)^T$이고 $\Sigma(1,-1)^T=(2,-2)^T=2(1,-1)^T$이므로 고유값 방정식이 그대로 성립합니다.

이제 단위벡터 몇 개를 골라 사영분산 $w^T\Sigma w$를 직접 재봅니다. $w=(1,0)$이면 $w^T\Sigma w=3$입니다. $w=(1,1)/\sqrt2$이면 $w^T\Sigma w=4$입니다. $w=(1,-1)/\sqrt2$이면 $w^T\Sigma w=2$입니다.

세 값 중 가장 큰 것은 4이고 이때 쓴 방향이 정확히 가장 큰 고유값 4에 대응하는 고유벡터입니다. 반대로 가장 작은 값 2도 가장 작은 고유값에 대응하는 고유벡터에서 나왔습니다. 아래 증명은 이 대응이 우연이 아니라 라그랑주 승수법으로 언제나 성립함을 보입니다.
