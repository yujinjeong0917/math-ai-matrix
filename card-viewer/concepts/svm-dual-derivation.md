---
slug: svm-dual-derivation
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: SVM 라그랑주 쌍대문제의 유도
hook: svm-margin에서 마진을 최대화하는 문제가 $\min_{w,b}\frac12\|w\|^2$ s.t.
related: SVM 서포트 벡터 마진의 폭
---

## 기본설명
SVM의 원문제 $\min_{w,b}\frac12\|w\|^2$ s.t. $y_i(w^Tx_i+b)\ge1$ ($i=1,\dots,n$)의 라그랑주 쌍대문제는 $\max_\alpha\sum_i\alpha_i-\frac12\sum_i\sum_j\alpha_i\alpha_jy_iy_jx_i^Tx_j$ s.t. $\sum_i\alpha_iy_i=0$, $\alpha_i\ge0$ 이며, 이때 원문제의 최적해는 $w^*=\sum_i\alpha_iy_ix_i$이다.

## 문제
제약이 $n$개 있으므로 각 제약마다 라그랑주 승수 $\alpha_i\ge0$을 하나씩 붙인다. 제약을 어긴 정도 즉 $1-y_i(w^Tx_i+b)$가 양수라면 그만큼 벌점을 주고 음수라면 벌점을 주지 않아야 하므로 이 값에 승수를 곱해 목적함수에 더한다. 이렇게 만든 라그랑지안은 $L(w,b,\alpha)=\dfrac12\|w\|^2+\sum_{i=1}^n\alpha_i\Bigl($==빈칸==$\Bigr)$ 이다.

## 해설
라그랑지안은 목적함수에 각 제약의 위반량과 승수의 곱을 더해 만든다. 제약은 $y_i(w^Tx_i+b)\ge1$ 즉 $1-y_i(w^Tx_i+b)\le0$ 형태로 바꿔 쓸 수 있으므로 벌점항은 정확히 $1-y_i(w^Tx_i+b)$다.

**정답: $1-y_i(w^Tx_i+b)$**

## 예시
추상적인 유도를 따라가기 전에 점이 두 개뿐인 가장 작은 데이터셋으로 $w=\sum_i\alpha_iy_ix_i$가 실제로 무엇을 계산하는지 직접 확인해봅니다.

양성 클래스 점 $x_1=(2,2)$, $y_1=+1$과 음성 클래스 점 $x_2=(0,0)$, $y_2=-1$ 두 개뿐인 데이터셋을 생각합니다. 점이 두 개뿐이라 둘 다 서포트 벡터가 될 수밖에 없습니다.

제약 $\sum_i\alpha_iy_i=0$에서 $\alpha_1-\alpha_2=0$이므로 $\alpha_1=\alpha_2=\alpha$로 둘 수 있습니다. 그러면 $w=\alpha_1y_1x_1+\alpha_2y_2x_2=\alpha(2,2)-\alpha(0,0)=\alpha(2,2)$입니다.

두 점 모두 마진 경계 위에 있어야 하므로 $y_i(w^Tx_i+b)=1$을 각각 적용합니다. $x_2$에서는 $w^Tx_2=0$이므로 $-1\times(0+b)=1$에서 $b=-1$입니다. $x_1$에서는 $w^Tx_1=\alpha\times8$이므로 $1\times(8\alpha-1)=1$에서 $\alpha=0.25$입니다.

그러니 $\alpha_1=\alpha_2=0.25$, $w=0.25(2,2)=(0.5,0.5)$, $b=-1$입니다. 이제 쌍대목적함수 값을 직접 계산해봅니다. $\sum_i\alpha_i=0.25+0.25=0.5$이고 이중합은 $x_1^Tx_1=8$, $x_1^Tx_2=x_2^Tx_1=0$, $x_2^Tx_2=0$이므로 $\sum_i\sum_j\alpha_i\alpha_jy_iy_jx_i^Tx_j=0.25^2\times1\times8=0.5$뿐입니다.
$$\sum_i\alpha_i-\frac12\sum_i\sum_j\alpha_i\alpha_jy_iy_jx_i^Tx_j=0.5-0.25=0.25$$
원문제 목적함수 $\frac12\|w\|^2=\frac12(0.5^2+0.5^2)=0.25$와 정확히 같은 값이 나옵니다. 아래 증명은 이렇게 원문제와 쌍대문제가 만나는 이 계산이 임의의 데이터셋에서 항상 일반적으로 성립함을 보입니다.
