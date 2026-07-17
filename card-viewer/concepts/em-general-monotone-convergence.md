---
slug: em-general-monotone-convergence
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: EM 알고리즘의 단조수렴성: 옌센 부등식과 하한 최적화
hook: 잠재변수가 있는 모델은 로그우도 $\log p(x\mid\theta)$ 자체를 직접 최적화하기 어려운 경우가 많아요(잠재변수를 적분/합산해야 하니까요).
---

## 기본설명
관측변수 $x$, 잠재변수 $z$, 파라미터 $\theta$를 갖는 임의의 모델에서 임의의 분포 $q(z)$에 대해 $\mathrm{ELBO}(q,\theta)=\sum_z q(z)\log\frac{p(x,z\mid\theta)}{q(z)}$ 라 하면 $\log p(x\mid\theta)\ge \mathrm{ELBO}(q,\theta)$ 이다(옌센 부등식). E-step에서 $q^{(t)}(z)=p(z\mid x,\theta^{(t)})$로 두고 M-step에서 $\theta^{(t+1)}=\operatorname*{argmax}_\theta \mathrm{ELBO}(q^{(t)},\theta)$ 로 두면, $\log p(x\mid\theta^{(t+1)})\ge \log p(x\mid\theta^{(t)})$, 즉 로그우도는 매 반복마다 감소하지 않는다.

## 문제
로그는 오목함수이므로 옌센 부등식(오목함수에서는 "평균의 함숫값 $\ge$ 함숫값의 평균")을 $q(z)$를 가중치로 하는 기댓값에 적용하면 $\log\sum_z q(z)\dfrac{p(x,z\mid\theta)}{q(z)}\ \ge\ $==빈칸== $=\mathrm{ELBO}(q,\theta)$ 를 얻는다.

## 해설
옌센 부등식은 로그를 합 바깥에서 안으로 넣으면(로그의 기댓값을 취하면) 부등호가 생긴다는 뜻이에요. 이게 바로 ELBO의 정의식이에요.

**정답: $\sum_z q(z)\log\frac{p(x,z\mid\theta)}{q(z)}$**

## 예시
EM 한 번 전체를 돌리기 전에, 증명의 핵심인 옌센 부등식 한 단계만 구체적인 숫자로 확인해봅시다.

이산 잠재변수 $z\in\{1,2\}$에서 $q=(0.5,0.5)$, 그리고 결합확률의 비율이 $p(x,z)/q(z)$에 해당하는 값이 $(0.3,0.7)$이라 합시다(둘을 더하면 $1$이 되도록 맞춘 값이라 생각하면 됩니다).

좌변(로그 안에서 먼저 평균): $\log\big(0.5\times0.3+0.5\times0.7\big)=\log(1)=0$.

우변(평균 안에서 먼저 로그): $0.5\log(0.6)+0.5\log(1.4)\approx 0.5(-0.5108)+0.5(0.3365)\approx -0.0872$.

실제로 $0\ge -0.0872$이므로 옌센 부등식이 성립하는 것이 확인됩니다. 로그가 오목함수이기 때문에 "평균의 로그"가 "로그의 평균"보다 항상 크거나 같은 것이죠.
