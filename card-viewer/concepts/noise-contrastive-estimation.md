---
slug: noise-contrastive-estimation
theme: INFO
domainLabel: 정보이론
subLabel: 발산 · 상호정보
title: 잡음대조추정(NCE): 밀도추정을 이진분류로 바꾸기
hook: 분배함수(정규화 상수) $Z(\theta)=\int\tilde p_\theta(x)\,dx$를 계산할 수 없는 비정규화 모델 $\tilde p_\theta$를 최대우도로 학습하기는 어렵습니다.
related: 
---

## 기본설명
정규화 상수까지 포함해 자유롭게 학습되는 파라미터 함수 $p_\theta(x)$(더 이상 적분이 $1$이라는 제약을 걸지 않는다)와, 알려진 잡음분포 $p_n$(단, $p_d(x)>0$인 곳에서 $p_n(x)>0$)에서 데이터 하나당 $\nu$개씩 뽑은 잡음표본이 있다고 하자. 분류기 사후확률을 $h(x;\theta)=\dfrac{p_\theta(x)}{p_\theta(x)+\nu p_n(x)}$ 라 하고, 목적함수를 $$J(\theta)=\mathbb E_{p_d}[\log h(x;\theta)]+\nu\,\mathbb E_{p_n}[\log(1-h(x;\theta))]$$ 라 하면, $\theta$가 임의의 음이 아닌 함수를 표현할 만큼 유연한 비모수적 극한에서 $J$를 최대화하는 해는 $p_\theta(x)=p_d(x)$ (참 데이터분포)이다.

## 문제
$J(\theta)=\int\Big[p_d(x)\log\dfrac{f}{f+\nu p_n(x)}+\nu p_n(x)\log\dfrac{\nu p_n(x)}{f+\nu p_n(x)}\Big]dx$ 에서 $f=p_\theta(x)$라 쓰면, 적분 안의 피적분함수가 서로 다른 $x$끼리 $f$값을 공유하지 않으므로 각 $x$에서 $f$를 독립변수로 놓고 편미분할 수 있다. $\dfrac{\partial}{\partial f}\Big[p_d(x)\log\dfrac{f}{f+\nu p_n(x)}+\nu p_n(x)\log\dfrac{\nu p_n(x)}{f+\nu p_n(x)}\Big]=\dfrac{p_d(x)}{f}-$==빈칸== 이다.

## 해설
$\log\frac{f}{f+\nu p_n}$을 $f$로 미분하면 $\frac1f-\frac1{f+\nu p_n}$이고, $\log\frac{\nu p_n}{f+\nu p_n}$을 미분하면 $-\frac1{f+\nu p_n}$이에요. 여기에 각각 $p_d(x)$, $\nu p_n(x)$를 곱해 더하면 $\frac{p_d(x)}{f}-\frac{p_d(x)+\nu p_n(x)}{f+\nu p_n(x)}$가 나와요.

**정답: $\frac{p_d(x)+\nu p_n(x)}{f+\nu p_n(x)}$**

## 예시
한 점 $x$에서 정류점 조건이 실제로 $f(x)=p_d(x)$에서 성립하는지 숫자로 확인해봅니다. $p_d(x)=0.3$, $p_n(x)=0.4$, $\nu=2$라 하자. $f=p_d(x)=0.3$을 대입하면 아래에서 유도할 정류점 조건 $$\frac{p_d(x)}{f}=\frac{p_d(x)+\nu p_n(x)}{f+\nu p_n(x)}$$ 의 좌변은 $0.3/0.3=1$, 우변은 $(0.3+2\times0.4)/(0.3+2\times0.4)=1.1/1.1=1$로 정확히 일치한다.
