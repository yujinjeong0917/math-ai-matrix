---
slug: s-learner-t-learner
theme: CAUSAL
domainLabel: 인과추론
subLabel: 이질적 효과와 개인화
title: S-러너와 T-러너: 두 메타러너의 일치성과 취약점
hook: CATE $\tau(x)=E[Y(1)-Y(0)\mid X=x]$를 실제로 추정하려면 회귀모델이 필요합니다.
related: 이질적 처치효과(CATE) · X-러너 · Double/Debiased ML
---

## 기본설명
$\mu_t(x):=E[Y\mid X=x,T=t]$, $t\in\{0,1\}$ 라 하자. S-러너는 결합모델 $\hat\mu(x,t)$를 전체 표본으로 학습해 $\hat\tau_S(x):=\hat\mu(x,1)-\hat\mu(x,0)$로 추정하고, T-러너는 $\hat\mu_1$을 처치군 표본만으로, $\hat\mu_0$을 대조군 표본만으로 각각 학습해 $\hat\tau_T(x):=\hat\mu_1(x)-\hat\mu_0(x)$로 추정한다. 무교란성과 중첩조건 아래 $\hat\mu(x,t)\xrightarrow{p}\mu_t(x)$(S-러너) 및 각 $t$에서 $\hat\mu_t(x)\xrightarrow{p}\mu_t(x)$(T-러너)이면 $\hat\tau_S(x),\hat\tau_T(x)\xrightarrow{p}\tau(x)$ 로 둘 다 CATE의 일치추정량이다. 그러나 $\hat\mu_t(x)$가 국소 표본평균 형태의 추정량이면 $\mathrm{Var}(\hat\tau_T(x))=\mathrm{Var}(\hat\mu_1(x))+\mathrm{Var}(\hat\mu_0(x))$ 이므로, 처치군과 대조군의 국소 표본크기가 불균형하면 T-러너의 분산이 급격히 커진다.

## 문제
S-러너는 $(X,T)$를 함께 입력으로 받는 하나의 회귀모델 $\hat\mu(x,t)$를 전체 표본으로 학습한다. 만약 $\hat\mu(x,t)\xrightarrow{p}E[Y\mid X=x,T=t]$로 수렴한다면, 무교란성에 의해 $E[Y\mid X=x,T=t]=E[Y(t)\mid X=x]=\mu_t(x)$이므로 $\hat\tau_S(x)=\hat\mu(x,1)-\hat\mu(x,0)\xrightarrow{p}$==빈칸== 이다.

## 해설
$\hat\mu(x,t)$가 참값 $E[Y\mid X=x,t]$로 수렴하고, 무교란성에 의해 이는 $\mu_t(x)$와 같으므로 두 항의 차는 정의상 $\tau(x)$예요.

**정답: $\mu_1(x)-\mu_0(x)=\tau(x)$**

## 예시
앞선 CATE 예제의 두 그룹($X=0$: 경증, $X=1$: 중증, $\tau(0)=2,\ \tau(1)=6$)에 실제 유한표본을 채워보자.

$X=0$ 층(균형있게 5명씩 배정): 처치군 결과 $\{11,12,13,12,12\}$(평균 $12$), 대조군 결과 $\{9,10,10,11,10\}$(평균 $10$) $\Rightarrow\ \hat\tau_T(0)=12-10=2$로 참값 $\tau(0)=2$와 정확히 일치한다.

$X=1$ 층(처치가 단 $2$명에게만 배정되고 대조군은 $8$명): 처치군 결과 $\{20,36\}$(평균 $28$), 대조군 결과 $\{17,18,19,20,21,22,23,24\}$(평균 $20.5$) $\Rightarrow\ \hat\tau_T(1)=28-20.5=7.5$로 참값 $\tau(1)=6$에서 $1.5$나 벗어난다.

같은 20개 관측치를 상호작용항 없이 $Y\sim 1+X+T$로 통째로 적합(S-러너)하면 $T$의 계수는 약 $4.15$가 나온다 — $2$와 $6$ 사이 어딘가로 뭉개진 값으로, 처치와 공변량의 교차항을 모델에 넣지 않으면 이질성 자체를 표현하지 못한다는 것을 보여준다.
