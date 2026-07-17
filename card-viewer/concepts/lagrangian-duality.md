---
slug: lagrangian-duality
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 제약 최적화
title: 라그랑주 쌍대성과 약쌍대성 정리
hook: 제약 있는 최적화 문제는 직접 풀기 어려울 때가 많습니다.
---

## 기본설명
$p^*=\min_x f(x)\ \text{s.t.}\ g_i(x)\le0,\ h_j(x)=0$ 이고 $q(\lambda,\mu)=\inf_x\mathcal L(x,\lambda,\mu)$, $d^*=\sup_{\lambda\ge0,\mu}q(\lambda,\mu)$ 이면 $d^*\le p^*$ 이다.

## 문제
임의의 실행가능한 점 $\bar x$를 하나 고정한다. 모든 $i$에 대해 $g_i(\bar x)\le0$이고 모든 $j$에 대해 $h_j(\bar x)=0$이다. 이 점에서 라그랑지안 값을 계산해 본다. 등호 제약항은 $h_j(\bar x)=0$이라 전부 사라진다. 남은 부등호 제약항은 $\lambda_i\ge0$이고 $g_i(\bar x)\le0$이니 곱한 값 $\lambda_ig_i(\bar x)$가 항상 0 이하다. 이런 항을 다 더한 것도 0 이하다. 그러면 $\mathcal L(\bar x,\lambda,\mu) = f(\bar x) + \sum_i\lambda_ig_i(\bar x) \le $==빈칸== 이다.

## 해설
$\sum_i\lambda_ig_i(\bar x)\le0$이므로 이 항을 $f(\bar x)$에 더해봤자 값이 커질 수 없다. 그러니 $\mathcal L(\bar x,\lambda,\mu)\le f(\bar x)$가 된다.

**정답: $f(\bar x)$**

## 예시
증명에 들어가기 전에 lagrange-kkt 항목에서 다뤘던 문제를 다시 가져와서 쌍대함수 값이 실제로 원문제의 최적값을 넘어서지 않는지 직접 계산해봅니다.

$f(x)=(x-3)^2$을 $g(x)=x-1\le0$ 아래 최소화하는 문제입니다. 최적해는 경계 $x^*=1$이고 원문제의 최적값은 $p^*=f(1)=4$입니다.

쌍대함수 $q(\lambda)=\inf_x\left[(x-3)^2+\lambda(x-1)\right]$를 구합니다. 안쪽을 $x$로 미분해 0으로 놓으면 $x=3-\lambda/2$가 나오고 이를 대입해 정리하면 다음을 얻습니다.
$$q(\lambda)=2\lambda-\frac{\lambda^2}{4}$$
몇 개의 $\lambda$ 값을 넣어봅니다. $q(1)=1.75$, $q(2)=3$, $q(6)=3$, 모두 $p^*=4$를 넘지 않습니다. $q$를 최대로 만드는 지점은 $\lambda=4$이고 그때 $q(4)=4$로 $p^*$와 정확히 같아집니다.

아래 증명은 $q(\lambda)\le p^*$라는 이 부등식이 특정 $\lambda$에서만 성립하는 게 아니라 $\lambda\ge0$인 모든 경우에 항상 성립한다는 사실을 보입니다.
