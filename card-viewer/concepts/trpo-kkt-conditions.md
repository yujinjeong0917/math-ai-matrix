---
slug: trpo-kkt-conditions
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 제약 최적화
title: TRPO 신뢰영역 제약의 KKT 정상성 조건
related: 라그랑주 승수법과 KKT 조건 · PPO 클리핑 · DPO의 닫힌형 최적정책
---

## 도입
정책을 한 번에 너무 크게 바꾸면 대리목적함수의 근사가 깨지면서 학습이 무너질 수 있습니다. TRPO는 정책이 한 스텝에 얼마나 바뀔 수 있는지를 KL발산으로 제한하는 신뢰영역 제약을 둡니다. 이 문제도 결국 lagrange-kkt 항목에서 본 것과 똑같은 형태의 제약 최적화입니다. 같은 KKT 논리를 그대로 적용해서 최적해가 어떤 조건을 만족하는지 확인해 봅니다.

## 명제
$\min_\theta -L(\theta)\ \text{s.t.}\ g(\theta)\le0$ ($g(\theta)=E_s[\mathrm{KL}(\pi_{\theta_{old}}\|\pi_\theta)]-\delta$) 의 최적해 $\theta^*$에서는 $\mu^*\ge0$이 존재해 $\nabla_\theta L(\theta^*)=\mu^*\nabla_\theta g(\theta^*)$ 이고 $\mu^*g(\theta^*)=0$ 이다.


## 문제
제약이 지나치게 특이하지 않다는 조건이 성립한다고 가정하면, 최적해 $\theta^*$에서는 $\theta$를 아주 조금 움직여도 라그랑지안이 더 줄어들지 않아야 한다. 미분 가능한 함수에서 이 성질은 기울기가 0이라는 조건으로 나타난다. $\nabla_\theta\mathcal L(\theta^*,\mu^*) = $==빈칸== 이다.

## 해설
lagrange-kkt 항목과 완전히 같은 논리다. 제약 있는 최적해에서는 목적함수 $-L$이 아니라 라그랑지안 $\mathcal L$의 기울기가 0이 되어야 한다.

**정답: $0$**

## 예시
증명에 들어가기 전에 lagrange-kkt 항목에서와 같은 방식으로 정책 파라미터 하나짜리 장난감 문제를 풀어서 KKT 조건이 실제로 어떻게 나오는지 확인해봅니다.

대리목적함수를 $L(\theta)=-(\theta-5)^2$로 두고 이를 최대화하려 합니다. 신뢰영역 제약은 $g(\theta)=\theta-2\le0$입니다. 제약이 없다면 $\theta=5$에서 $L$이 최댓값 $0$을 가지지만 $g(5)=3>0$이라 신뢰영역을 벗어납니다.

그러니 최적해는 경계 $\theta^*=2$에 걸립니다. 이 지점에서 $\nabla_\theta L(\theta^*)=-2(2-5)=6$이고 $\nabla_\theta g(\theta^*)=1$입니다.

KKT 정상성 조건 $\nabla_\theta L(\theta^*)=\mu^*\nabla_\theta g(\theta^*)$에 대입하면 다음을 얻습니다.
$$6=\mu^*\times1 \implies \mu^*=6$$
$\mu^*=6\ge0$이고 상보슬랙성도 $\mu^*g(\theta^*)=6\times(2-2)=0$으로 맞아떨어집니다. 정책이 신뢰영역 경계에 딱 붙잡혀서 더 나아가지 못하는 상황을 숫자로 확인한 셈입니다.

아래 증명은 이 계산이 이 장난감 문제 하나만의 우연이 아니라 임의의 대리목적함수와 KL 제약에 대해 항상 같은 형태의 KKT 조건으로 귀결된다는 사실을 보입니다.
