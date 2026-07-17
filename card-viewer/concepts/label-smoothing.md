---
slug: label-smoothing
theme: INFO
domainLabel: 정보이론
subLabel: 엔트로피 · 손실
title: 라벨 스무딩: 정답 원-핫을 살짝 무너뜨리면 왜 과신을 막는가
hook: 분류 문제에서 정답 라벨은 보통 정답 클래스만 $1$이고 나머지는 모두 $0$인 원-핫 벡터로 주어져요.
---

## 기본설명
$K$개 클래스, 정답 클래스 $c$에 대해 원-핫 목표를 $y'_k=(1-\epsilon)y_k+\epsilon/K$로 스무딩하고 $q=\mathrm{softmax}(z)$라 하면, 교차엔트로피 $L=-\sum_k y'_k\log q_k$를 최소화하는 로짓에서 정답 클래스와 다른 클래스의 로짓 차이는 $\log\!\left(\dfrac{(1-\epsilon)K}{\epsilon}+1\right)$로 유한하게 묶인다.

## 문제
$y'_c$와 $y'_k$($k\neq c$)를 각각 대입하면 $L = -\left(1-\epsilon+\dfrac{\epsilon}{K}\right)\log q_c - \sum_{k\neq c}\dfrac{\epsilon}{K}\log q_k$ 이다. 여기서 정답 클래스 항에 있는 $\epsilon/K\log q_c$를 나머지 클래스의 합과 한데 묶으면, $K$개 클래스 전체에 공통으로 $\epsilon/K$가 곱해진 합이 하나로 정리된다: $L = $==빈칸== 이다.

## 해설
정답 클래스 항 $-(1-\epsilon+\epsilon/K)\log q_c$를 $-(1-\epsilon)\log q_c$와 $-(\epsilon/K)\log q_c$ 두 조각으로 나눈다. 뒤 조각을 나머지 클래스들의 합 $-\sum_{k\neq c}(\epsilon/K)\log q_k$와 합치면 $k=c$부터 $k=K$까지 전체 클래스에 대한 합 $-(\epsilon/K)\sum_{k=1}^K\log q_k$가 된다.

**정답: $-(1-\epsilon)\log q_c - \dfrac{\epsilon}{K}\sum_{k=1}^{K}\log q_k$**

## 예시
$K=10$개 클래스, 정답 클래스가 $c$라 하고 스무딩 계수를 $\epsilon=0.1$로 잡아 실제 숫자로 확인해봅니다.

목표분포는 $y'_c=1-0.1+0.1/10=0.9+0.01=0.91$이고 나머지 아홉 클래스는 각각 $y'_j=0.1/10=0.01$입니다. 합을 확인하면 $0.91+9\times0.01=0.91+0.09=1$로 맞습니다.

아래 증명에서 보이듯 손실이 최소가 되는 지점에서는 $q_k^*=y'_k$가 되므로, 그 지점의 정답-오답 확률비는 $q_c^*/q_j^*=0.91/0.01=91$이고 로짓 차이는 자연로그로 $\log91\approx4.511$입니다.

스무딩 계수를 $\epsilon=0.01$로 훨씬 작게 잡으면 어떻게 될까요. $y'_c=0.991$, $y'_j=0.001$이 되고 확률비는 $991$, 로짓 차이는 $\log991\approx6.899$로 더 커집니다. $\epsilon$을 계속 $0$에 가깝게 줄이면 확률비도 로짓 차이도 한없이 커집니다. $\epsilon=0$인 순수한 원-핫 목표에서는 이 상한 자체가 무한대로 발산한다는 뜻입니다. 아래 증명은 $\epsilon>0$인 한 이 로짓 차이가 항상 유한한 값으로 묶인다는 것을 일반적으로 보입니다.
