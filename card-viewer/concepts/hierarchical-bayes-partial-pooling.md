---
slug: hierarchical-bayes-partial-pooling
theme: PROB
domainLabel: 확률 · 통계
subLabel: 통계적 추론
title: 계층적 베이즈모델과 부분풀링(Partial Pooling)
related: James-Stein 추정량
---

## 도입
여러 그룹(학교, 병원, 매장 등)마다 따로 평균을 추정하면 표본이 적은 그룹은 추정치가 심하게 흔들립니다. 반대로 모든 그룹을 하나로 합쳐버리면 그룹 간에 실제로 존재하는 차이를 무시하게 됩니다. 계층적 베이즈모델은 그 중간을 찾습니다. 각 그룹의 모수에 "전체평균 근처에 있을 것"이라는 공통사전분포를 걸어두면, 데이터가 부족하거나 불확실한 그룹일수록 추정치가 전체평균 쪽으로 더 많이 끌려가는 부분풀링(partial pooling)이 자동으로 일어납니다.

## 명제
그룹 $j=1,\dots,J$ 에 대해 데이터모형 $\bar y_j|\theta_j \sim N(\theta_j,V_j)$ ($V_j$는 알려진 분산)이고, 그룹모수에 공통사전분포 $\theta_j\sim N(\mu,\tau^2)$ (그룹마다 서로 독립)를 준다고 하자. 그러면 사후분포 $\theta_j|\bar y_j$는 정규분포이며 그 사후평균은
$$\hat\theta_j = B_j\mu + (1-B_j)\bar y_j,\qquad B_j=\frac{V_j}{V_j+\tau^2}$$
로 주어지는, 완전분리추정($\bar y_j$)과 완전풀링추정($\mu$) 사이의 가중평균, 즉 부분풀링 추정량이다.

## 그림
<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg">
<line x1="216" y1="35" x2="216" y2="200" class="dg-dim" stroke-width="1" stroke-dasharray="3,2"/>
<text x="222" y="30" font-size="12" class="dg-dim">μ(전체평균)=50</text>
<circle cx="16" cy="60" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<text x="28" y="64" font-size="11" class="dg-dim">개별 추정치</text>
<circle cx="130" cy="60" r="6" class="dg-accent"/>
<text x="142" y="64" font-size="11" class="dg-dim">부분풀링 사후평균</text>
<text x="10" y="55" font-size="12">학교1(표본 많음)</text>
<circle cx="304" cy="65" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<line x1="298" y1="65" x2="292" y2="65" class="dg-stroke-accent" stroke-width="2"/>
<line x1="304" y1="65" x2="286.4" y2="65" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="286.4,65 296,61 296,69" class="dg-accent"/>
<circle cx="286.4" cy="65" r="6" class="dg-accent"/>
<text x="304" y="55" font-size="11" class="dg-dim">60→58 (짧은 화살표)</text>
<text x="10" y="125" font-size="12">학교2(표본 적음)</text>
<circle cx="145.6" cy="130" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<line x1="145.6" y1="130" x2="194" y2="130" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="194,130 184,126 184,134" class="dg-accent"/>
<circle cx="194" cy="130" r="6" class="dg-accent"/>
<text x="145.6" y="120" font-size="11" class="dg-dim">42→47.5 (긴 화살표)</text>
<text x="10" y="195" font-size="12">학교3(표본 최소, 예시)</text>
<circle cx="374.4" cy="185" r="6" fill="none" class="dg-line" stroke-width="1.5"/>
<line x1="374.4" y1="185" x2="242.4" y2="185" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="242.4,185 252.4,181 252.4,189" class="dg-accent"/>
<circle cx="242.4" cy="185" r="6" class="dg-accent"/>
<text x="374.4" y="205" font-size="11" class="dg-dim">68→53 (가장 긴 화살표)</text>
</svg>

_열린 원(개별 추정치)에서 채운 원(부분풀링 사후평균)까지의 화살표 길이가 수축의 크기다. 표본이 적은 그룹일수록 전체평균 쪽으로 더 크게 끌려간다._

## 문제
베이즈 정리에 따라 사후밀도는 우도와 사전밀도의 곱에 비례한다. $p(\theta_j|\bar y_j) \propto \exp\!\left(-\dfrac{(\bar y_j-\theta_j)^2}{2V_j}\right)\exp\!\left(-\dfrac{(\theta_j-\mu)^2}{2\tau^2}\right)$ 이다. 두 지수를 더한 뒤 $\theta_j$에 대한 이차식으로 펼치면 $\theta_j^2$의 계수는 $-\dfrac{1}{2V_j}-\dfrac{1}{2\tau^2}$ 이다. 이 계수의 절댓값의 두 배, 즉 $\theta_j$에 대한 사후분포의 정밀도(분산의 역수)는 $\dfrac1{V_j}+\dfrac1{\tau^2}$ 로, 데이터가 주는 정밀도와 사전분포가 주는 정밀도를 단순히 더한 값이다.

즉 사후분산은 $\mathrm{Var}(\theta_j|\bar y_j) = $==빈칸== 이다.

## 해설
정규분포끼리의 곱은 지수 안의 이차항 계수(정밀도)를 그대로 더하는 결과를 낳는다. 데이터가 주는 정밀도 $1/V_j$와 사전분포가 주는 정밀도 $1/\tau^2$을 더한 것이 사후분포의 정밀도이고, 그 역수가 사후분산이다.

**정답: $\dfrac{1}{1/V_j+1/\tau^2}$**

## 예시
부분풀링이 실제로 무엇을 하는지 두 그룹의 숫자로 확인해봅니다.

두 학교의 평균 시험점수를 추정한다고 하겠습니다. 그룹 간 분산(사전분포의 퍼짐 정도)은 $\tau^2=4$이고 전체평균(사전평균)은 $\mu=50$이라 하겠습니다. 학교 1은 학생 수가 많아 관측평균의 분산이 작아 $V_1=1$, 관측된 평균은 $\bar y_1=60$입니다. 학교 2는 학생 수가 적어 관측평균의 분산이 커서 $V_2=9$, 관측된 평균은 $\bar y_2=42$입니다.

학교 1의 수축계수는 $B_1=\dfrac{V_1}{V_1+\tau^2}=\dfrac{1}{1+4}=0.2$이므로,
$$\hat\theta_1 = 0.2\times50 + 0.8\times60 = 10+48 = 58$$
학교 2의 수축계수는 $B_2=\dfrac{V_2}{V_2+\tau^2}=\dfrac{9}{9+4}\approx0.6923$이므로,
$$\hat\theta_2 = 0.6923\times50 + 0.3077\times42 \approx 34.615+12.923 = 47.538$$
학교 1은 데이터가 믿을 만해서(분산이 작아서) 원래 관측값 60에서 58로 살짝만 당겨졌습니다. 학교 2는 데이터가 불확실해서(분산이 커서) 원래 관측값 42에서 47.5로 훨씬 크게 전체평균 쪽으로 당겨졌습니다. 데이터가 부족한 그룹일수록 더 많이 수축된다는 부분풀링의 핵심을 숫자로 확인할 수 있습니다. 아래 증명은 이 사후평균이 정말로 두 극단(완전분리추정, 완전풀링추정) 사이의 가중평균으로 정확히 유도된다는 것을 보입니다.
