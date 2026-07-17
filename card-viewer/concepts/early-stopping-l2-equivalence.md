---
slug: early-stopping-l2-equivalence
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: 조기종료와 L2 정칙화의 동치성: 이차근사로 본 $T$와 $\lambda$의 대응
hook: 경사하강법을 끝까지 수렴시키지 않고 적당한 시점 $T$에서 멈추는 조기종료(early stopping)는 실무에서 가장 흔한 정칙화 방법 중 하나입니다.
---

## 기본설명
손실 $J(\theta)$가 최적점 $\theta^*$ 근방에서 $J(\theta)\approx J(\theta^*)+\frac12(\theta-\theta^*)^\top H(\theta-\theta^*)$ 로 이차근사되고($H=\nabla^2J(\theta^*)\succ0$), 학습률 $\epsilon$인 경사하강법을 $\theta^{(0)}=0$에서 시작한다고 하자. $H=Q\Lambda Q^\top$ 로 고유분해하면, $T$번 반복 후의 결과 $\theta^{(T)}$와 L2 정칙화계수 $\lambda$로 얻는 리지해 $\theta_{L2}=(H+\lambda I)^{-1}H\theta^*$ 는, 모든 고유값 $\lambda_i$에 대해 $\epsilon\lambda_i\ll1$ 인 영역에서 $$\lambda \approx \frac{1}{\epsilon T}$$ 로 두면 두 해가 각 고유방향에서 근사적으로 일치한다.

## 문제
$H=Q\Lambda Q^\top$ 로 고유분해하고 회전좌표 $\tilde\theta:=Q^\top\theta$, $\tilde\theta^*:=Q^\top\theta^*$ 를 도입하면 $(I-\epsilon H)^T=Q(I-\epsilon\Lambda)^TQ^\top$ 이므로 좌표별로 분리되어 $\tilde\theta_i^{(T)} = $==빈칸==$\tilde\theta_i^*$ 를 얻는다(각 고유방향이 서로 독립적으로 움직인다).

## 해설
$I-(I-\epsilon H)^T$를 고유기저로 대각화하면 $i$번째 고유값 방향에서 $1-(1-\epsilon\lambda_i)^T$ 라는 스칼라 계수가 곱해지기 때문입니다.

**정답: $\big[1-(1-\epsilon\lambda_i)^T\big]$**

## 예시
고유방향 하나만 떼어 놓고 두 수축비율이 실제로 비슷해지는지 숫자로 확인해봅니다.

어떤 고유방향의 곡률이 $\lambda_i=0.001$ (작은 곡률 방향), 목표로 하는 L2 계수가 $\lambda=0.01$, 학습률 $\epsilon=0.1$ 이라 하자. 대응 관계 $\lambda=1/(\epsilon T)$ 로부터 $$T = \frac{1}{\epsilon\lambda} = \frac{1}{0.1\times0.01}=1000$$

이 방향의 조기종료 수축비율은 $\rho_{\text{ES}}=1-(1-\epsilon\lambda_i)^T=1-(0.9999)^{1000}\approx0.0952$ 이고, L2 정칙화의 수축비율은 $\rho_{L2}=\dfrac{\lambda_i}{\lambda_i+\lambda}=\dfrac{0.001}{0.011}\approx0.0909$ 입니다. 두 값이 $0.0952$와 $0.0909$로 근사적으로 일치하여, $\lambda_i\ll\lambda$인 영역에서 $T=1/(\epsilon\lambda)$ 대응이 실제로 성립함을 확인할 수 있습니다.
