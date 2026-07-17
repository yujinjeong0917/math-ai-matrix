---
slug: metropolis-hastings-detailed-balance
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: 메트로폴리스-헤이스팅스와 상세균형: 왜 목표분포가 정상분포가 되는가
related: 깁스샘플링(특수사례) · 해밀토니안 몬테카를로 · 어닐드 중요도샘플링
---

## 도입
마르코프체인으로 목표분포 $\pi$에서 표본을 뽑고 싶은데, $\pi$는 정규화상수를 모른 채 $\pi(x)\propto \tilde\pi(x)$로만 주어진다고 합시다. 메트로폴리스-헤이스팅스(MH) 알고리즘은 아무 제안분포 $q(x'\mid x)$로 다음 상태 후보 $x'$를 뽑고, 특정 확률 $\alpha(x,x')$로만 그 후보를 수락합니다. 문제는 이 $\alpha$를 어떻게 골라야 체인이 정확히 $\pi$를 정상분포로 갖느냐는 것입니다.

MH의 답은 상세균형(detailed balance)이라는, 정상분포 조건보다 더 강하지만 확인하기는 훨씬 쉬운 조건을 만족시키는 것입니다.

## 명제
제안분포 $q(x'\mid x)$와 수락확률 $\alpha(x,x')=\min\Big(1,\dfrac{\pi(x')q(x\mid x')}{\pi(x)q(x'\mid x)}\Big)$로 정의된 전이커널 $P(x'\mid x)=q(x'\mid x)\alpha(x,x')$ ($x'\ne x$)는 상세균형 $\pi(x)P(x'\mid x)=\pi(x')P(x\mid x')$를 모든 $x,x'$에 대해 만족하며, 따라서 $\pi$는 이 체인의 정상분포이다.

## 그림
<svg viewBox="0 0 420 210" xmlns="http://www.w3.org/2000/svg">
<circle cx="100" cy="115" r="36" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="320" cy="115" r="36" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="100" y="112" font-size="14" text-anchor="middle">x</text>
<text x="100" y="130" font-size="10" text-anchor="middle" class="dg-dim">π(x)</text>
<text x="320" y="112" font-size="14" text-anchor="middle">x'</text>
<text x="320" y="130" font-size="10" text-anchor="middle" class="dg-dim">π(x')</text>
<path d="M130,90 Q210,35 290,90" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="290,90 278,88 282,98" class="dg-accent"/>
<path d="M290,142 Q210,197 130,142" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="6,3"/>
<polygon points="130,142 142,140 140,150" class="dg-line"/>
<text x="210" y="28" font-size="12" text-anchor="middle">π(x)q(x'|x)α(x,x') (실선)</text>
<text x="210" y="205" font-size="12" text-anchor="middle" class="dg-dim">π(x')q(x|x')α(x',x) (점선)</text>
<text x="210" y="118" font-size="13" text-anchor="middle">=</text>
</svg>

_두 방향의 흐름량(실선·점선)이 정확히 같다는 것이 상세균형이며, 이 조건 하나로 $\pi$가 정상분포임이 보장된다._

## 문제
반대 방향의 수락확률은 $\alpha(x',x)=\min\Big(1,\dfrac{\pi(x)q(x'\mid x)}{\pi(x')q(x\mid x')}\Big)$인데, 가정에 의해 이 비율 자체가 $1$ 이하이므로 $\alpha(x',x) = $==빈칸== 이다.

## 해설
min 안의 값이 이미 1 이하이므로 min을 취해도 그 값 그대로 남아요.

**정답: $\dfrac{\pi(x)q(x'\mid x)}{\pi(x')q(x\mid x')}$**

## 예시
추상적인 대수 이전에 두 상태만 있는 사슬로 상세균형을 직접 확인합니다. $\tilde\pi(A)=1,\ \tilde\pi(B)=3$ (참값은 $\pi(A)=1/4,\pi(B)=3/4$)이고 제안분포는 항상 다른 상태를 제안하는 결정적 스왑 $q(B\mid A)=q(A\mid B)=1$이라 합시다.

$A\to B$ 수락확률은 $\alpha(A,B)=\min\big(1,\ \tilde\pi(B)/\tilde\pi(A)\big)=\min(1,3)=1$이고, $B\to A$ 수락확률은 $\alpha(B,A)=\min\big(1,\ \tilde\pi(A)/\tilde\pi(B)\big)=\min(1,1/3)=1/3$입니다.

따라서 $P(B\mid A)=1\cdot1=1$, $P(A\mid B)=1\cdot\frac13=\frac13$입니다. 상세균형을 직접 확인하면
$$\tilde\pi(A)P(B\mid A)=1\cdot1=1,\qquad \tilde\pi(B)P(A\mid B)=3\cdot\frac13=1$$
로 정확히 일치합니다(정규화상수는 양변에 똑같이 곱해질 뿐이라 결과에 영향을 주지 않습니다).
