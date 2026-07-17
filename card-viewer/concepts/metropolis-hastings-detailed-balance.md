---
slug: metropolis-hastings-detailed-balance
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: 메트로폴리스-헤이스팅스와 상세균형: 왜 목표분포가 정상분포가 되는가
hook: 마르코프체인으로 목표분포 $\pi$에서 표본을 뽑고 싶은데, $\pi$는 정규화상수를 모른 채 $\pi(x)\propto \tilde\pi(x)$로만 주어진다고 합시다.
related: 깁스샘플링(특수사례) · 해밀토니안 몬테카를로 · 어닐드 중요도샘플링
---

## 기본설명
제안분포 $q(x'\mid x)$와 수락확률 $\alpha(x,x')=\min\Big(1,\dfrac{\pi(x')q(x\mid x')}{\pi(x)q(x'\mid x)}\Big)$로 정의된 전이커널 $P(x'\mid x)=q(x'\mid x)\alpha(x,x')$ ($x'\ne x$)는 상세균형 $\pi(x)P(x'\mid x)=\pi(x')P(x\mid x')$를 모든 $x,x'$에 대해 만족하며, 따라서 $\pi$는 이 체인의 정상분포이다.

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
