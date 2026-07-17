---
slug: active-learning-information-gain
theme: INFO
domainLabel: 정보이론
subLabel: 발산 · 상호정보
title: 능동학습의 정보이론적 기준: 기대 정보이득(BALD)
hook: 라벨링 예산이 정해진 상황에서 다음에 어떤 샘플에 라벨을 붙일지 고르는 문제가 능동학습입니다.
related: 
---

## 기본설명
입력 $x$, 라벨 $y$, 파라미터 $\theta$의 사후분포 $p(\theta\mid D)$가 주어졌을 때, 다음 라벨링 대상을 고르는 기준인 상호정보 $I(y;\theta\mid x,D)$는 $$I(y;\theta\mid x,D)=H\big[\mathbb E_{\theta}p(y\mid x,\theta)\big]-\mathbb E_{\theta}\big[H[p(y\mid x,\theta)]\big]$$ 로 계산할 수 있으며, 이는 "라벨링 후 파라미터 불확실성이 평균적으로 얼마나 줄어드는가"를 재는 것과 정확히 같은 양이다.

## 문제
한 방향은 "라벨링으로 파라미터 불확실성이 얼마나 줄어드는가"를 직접 재는 식이다. $I(y;\theta\mid x,D) = H(\theta\mid D) - $==빈칸== 이다.

## 해설
관측될 $y$ 값마다 사후분포를 갱신한 뒤 그 파라미터 엔트로피 $H(\theta|x,y,D)$를 구하고, 아직 $y$를 모르니 $y$에 대해 기댓값을 취해야 "평균적으로 줄어드는 불확실성"이 돼요.

**정답: $\mathbb E_{y\sim p(y\mid x,D)}\big[H(\theta\mid x,y,D)\big]$**

## 예시
파라미터가 단 두 값 $\theta\in\{0,1\}$ 중 하나이고 사전분포가 균등($p(\theta=0)=p(\theta=1)=0.5$)이라 하자. 두 모델의 예측이 $p(y=1\mid x,\theta=0)=0.3$, $p(y=1\mid x,\theta=1)=0.8$로 서로 다르다고 하자.

예측분포는 $p(y=1\mid x,D)=0.5\times0.3+0.5\times0.8=0.55$이고, 이진엔트로피로 $H[p(y\mid x,D)]=H_b(0.55)\approx0.9928$비트이다. 각 $\theta$에서의 엔트로피는 $H_b(0.3)\approx0.8813$, $H_b(0.8)\approx0.7219$이므로 평균은 $0.5\times0.8813+0.5\times0.7219\approx0.8016$이다. 따라서 $I(y;\theta\mid x,D)\approx0.9928-0.8016=0.1912$비트이다. 거꾸로 사후분포 갱신을 통해 $H(\theta\mid D)-\mathbb E_y[H(\theta\mid x,y,D)]$를 직접 계산해도 (수치로 확인하면) 똑같이 $0.1912$비트가 나온다.
