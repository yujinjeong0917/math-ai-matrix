---
slug: em-general-monotone-convergence
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: EM 알고리즘의 단조수렴성: 옌센 부등식과 하한 최적화
related: IRLS: 로지스틱회귀의 뉴턴법
---

## 도입
잠재변수가 있는 모델은 로그우도 $\log p(x\mid\theta)$ 자체를 직접 최적화하기 어려운 경우가 많아요(잠재변수를 적분/합산해야 하니까요). EM 알고리즘은 이 어려운 목적함수 대신 다루기 쉬운 하한(lower bound)을 최적화하는 전략을 씁니다. 그런데 하한만 올렸는데 원래 목적함수인 로그우도도 정말 따라 올라갈까요? 이 절문에 답이 "그렇다"라는 것이 EM의 단조수렴성입니다.

## 명제
관측변수 $x$, 잠재변수 $z$, 파라미터 $\theta$를 갖는 임의의 모델에서 임의의 분포 $q(z)$에 대해 $\mathrm{ELBO}(q,\theta)=\sum_z q(z)\log\frac{p(x,z\mid\theta)}{q(z)}$ 라 하면 $\log p(x\mid\theta)\ge \mathrm{ELBO}(q,\theta)$ 이다(옌센 부등식). E-step에서 $q^{(t)}(z)=p(z\mid x,\theta^{(t)})$로 두고 M-step에서 $\theta^{(t+1)}=\operatorname*{argmax}_\theta \mathrm{ELBO}(q^{(t)},\theta)$ 로 두면, $\log p(x\mid\theta^{(t+1)})\ge \log p(x\mid\theta^{(t)})$, 즉 로그우도는 매 반복마다 감소하지 않는다.

## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="200" x2="600" y2="200" class="dg-line" stroke-width="1.5"/>
<path d="M60,190 Q220,50 600,35" fill="none" class="dg-stroke-ink" stroke-width="2.5"/>
<path d="M120,190 Q210,90 320,140" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<path d="M270,150 Q380,55 480,95" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<line x1="210" y1="200" x2="210" y2="90" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<line x1="380" y1="200" x2="380" y2="55" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<circle cx="210" cy="90" r="4" class="dg-accent"/>
<circle cx="380" cy="55" r="4" class="dg-accent"/>
<text x="60" y="25" font-size="12">로그가능도 log p(x|θ)</text>
<text x="180" y="215" font-size="12" text-anchor="middle">θ(t)</text>
<text x="380" y="215" font-size="12" text-anchor="middle">θ(t+1)</text>
<text x="330" y="130" font-size="11" class="dg-dim">ELBO 하한 (E-step에서 접함)</text>
</svg>

_현재 θ에서 접하는 ELBO 하한을 최대화하면 로그가능도 자체도 단조 상승한다._

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
