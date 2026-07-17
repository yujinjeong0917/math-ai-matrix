---
slug: elbo-derivation
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: ELBO: 로그가능도의 옌센 하한
related: 
---

## 도입
생성모델에서 데이터의 로그가능도 $\log p(x)$를 직접 계산하는 것은 잠재변수 $z$에 대한 적분이 껴 있어 대개 불가능합니다. 대신 계산 가능한 하한을 최적화하는 전략을 씁니다. 그 하한이 ELBO입니다. 이 하한이 왜 실제로 $\log p(x)$보다 작거나 같은지 오목함수에 대한 옌센 부등식으로 확인해 봅니다.

## 명제
임의의 분포 $q(z|x)$에 대해 $\log p(x) \ge E_q[\log p(x|z)] - D_{KL}(q(z|x)\|p(z))$.

## 그림
<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="60" x2="360" y2="60" class="dg-stroke-ink" stroke-width="2"/>
<text x="140" y="50" font-size="13">log p(x)</text>
<line x1="40" y1="130" x2="360" y2="130" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="6,3"/>
<text x="60" y="150" font-size="12">ELBO = E_q[log p(x|z)] - D_KL(q‖p(z))</text>
<line x1="380" y1="60" x2="380" y2="130" class="dg-line" stroke-width="1.5"/>
<polygon points="380,60 375,72 385,72" class="dg-line"/>
<polygon points="380,130 375,118 385,118" class="dg-line"/>
<text x="30" y="100" font-size="12">= D_KL(q(z|x)‖p(z|x))</text>
<text x="40" y="185" class="dg-dim" font-size="12">ELBO는 항상 로그가능도 아래: 간격이 근사분포 q와 실제 사후분포의 KL발산</text>
</svg>

_로그가능도와 그 아래 ELBO 하한 사이의 간격은 정확히 KL발산이다._

## 문제
이 적분을 그대로 다루기는 어렵다. 임의로 고른 분포 $q(z|x)$를 분자와 분모에 동시에 곱해 넣어도 값은 바뀌지 않는다. $p(x) = \int q(z|x)\dfrac{p(x,z)}{q(z|x)}\,dz$ 이다. 이 적분은 $z\sim q(z|x)$일 때 $p(x,z)/q(z|x)$의 기댓값과 같은 모양이다. $p(x) = $==빈칸== 이다.

## 해설
$\int q(z|x)g(z)\,dz$ 꼴은 $q(z|x)$를 확률밀도로 갖는 기댓값의 정의다. 여기서 $g(z)=p(x,z)/q(z|x)$를 그대로 넣은 것이다.

**정답: $E_q\!\left[\frac{p(x,z)}{q(z|x)}\right]$**

## 예시
부등식을 추상적으로 보기 전에 잠재변수가 둘뿐인 작은 예로 ELBO가 실제로 로그가능도보다 작은지 직접 계산해봅니다. $z\in\{0,1\}$이고 $p(z=0)=p(z=1)=0.5$, $p(x|z=0)=0.8$, $p(x|z=1)=0.2$라 하겠습니다.

먼저 진짜 값을 구합니다. $p(x)=0.8(0.5)+0.2(0.5)=0.5$이므로 $\log p(x)=\log0.5\approx-0.693$입니다.

이제 참 사후분포와 다른 $q(z|x)=(0.7,0.3)$을 골라 ELBO를 계산합니다.
$$E_q[\log p(x|z)]=0.7\log0.8+0.3\log0.2\approx0.7(-0.223)+0.3(-1.609)\approx-0.639$$
$$D_{KL}(q\|p(z))=0.7\log\frac{0.7}{0.5}+0.3\log\frac{0.3}{0.5}\approx0.2356-0.1533\approx0.082$$
두 값을 합치면 $\mathrm{ELBO}\approx-0.639-0.082=-0.721$이고 실제로 $-0.721\le-0.693$이 성립합니다. $q$를 참 사후분포와 다르게 골랐더니 그 격차만큼 로그가능도보다 작아진 것입니다. 아래 증명은 이 격차가 옌센 부등식에서 나온다는 것을 일반적으로 보입니다.
