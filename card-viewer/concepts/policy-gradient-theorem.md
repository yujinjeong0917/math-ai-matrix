---
slug: policy-gradient-theorem
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 정책경사 정리(REINFORCE)의 유도
hook: 강화학습에서는 정책 $\pi_\theta$를 따라 얻는 기대 리턴 $J(\theta)$를 최대화하고 싶습니다.
related: 
---

## 기본설명
$J(\theta)=E_{\tau\sim\pi_\theta}[R(\tau)]$ 에 대해 $\nabla_\theta J(\theta) = E_{\tau\sim\pi_\theta}\left[\left(\sum_t\nabla_\theta\log\pi_\theta(a_t|s_t)\right)R(\tau)\right]$ 이다.

## 문제
이를 위해 로그함수의 미분을 이용한다. 로그함수를 미분하면 $1/x$가 되고 여기에 연쇄법칙으로 안쪽 함수의 도함수를 곱한다는 사실을 쓰면 $\nabla_\theta\log\pi_\theta(\tau) = \dfrac{\nabla_\theta\pi_\theta(\tau)}{\pi_\theta(\tau)}$ 이다. 양변에 $\pi_\theta(\tau)$를 곱해 정리하면 $\nabla_\theta\pi_\theta(\tau) = $==빈칸== 이다.

## 해설
로그미분 공식 $\nabla_\theta\log\pi_\theta(\tau)=\nabla_\theta\pi_\theta(\tau)/\pi_\theta(\tau)$ 의 양변에 $\pi_\theta(\tau)$를 곱하면 그대로 나오는 식이다. 이걸 로그미분 트릭이라 부른다.

**정답: $\pi_\theta(\tau)\nabla_\theta\log\pi_\theta(\tau)$**

## 예시
증명에 들어가기 전에 상태가 하나뿐인 아주 단순한 상황에서 실제로 그래디언트가 어느 방향을 가리키는지 계산해봅니다.

정책이 소프트맥스로 주어지고 두 행동의 로짓이 모두 $\theta_1=\theta_2=0$이라 초기 확률은 $\pi_\theta(a_1)=\pi_\theta(a_2)=0.5$입니다. 정책을 실행해서 행동 $a_1$을 뽑았고 그 궤적의 리턴이 $R(\tau)=4$였다고 합니다.

소프트맥스에서 로그확률의 그래디언트는 뽑힌 행동의 로짓에는 $1-\pi(a_1)$, 뽑히지 않은 행동의 로짓에는 $-\pi(a_2)$로 주어집니다. 여기에 리턴을 곱하면 다음을 얻습니다.
$$\nabla_{\theta_1}J\approx(1-0.5)\times4=2,\qquad \nabla_{\theta_2}J\approx(-0.5)\times4=-2$$
양수인 리턴을 받았으니 $a_1$을 뽑았던 로짓 $\theta_1$은 올라가는 방향으로, 상대적으로 $\theta_2$는 내려가는 방향으로 밀립니다. 다음 스텝에서는 $a_1$을 뽑을 확률이 $0.5$보다 커집니다.

아래 증명은 이 밀어붙이는 방향이 이 한 번의 궤적에서만 통하는 게 아니라 로그미분 트릭을 통해 임의의 정책과 궤적 전체에 대해 정확히 이런 형태로 일반화된다는 것을 보입니다.
