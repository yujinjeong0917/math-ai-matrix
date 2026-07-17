---
slug: actor-critic-baseline
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: Actor-Critic 베이스라인의 무편향성
related: 
---

## 도입
정책경사 REINFORCE 추정량은 그대로 쓰면 분산이 매우 큽니다. Actor-Critic은 가치함수를 베이스라인으로 빼서 분산을 줄이는데 그렇게 빼도 그래디언트의 기댓값 자체는 전혀 바뀌지 않습니다. 그 이유를 직접 확인해 봅니다.

## 명제
$a$에 의존하지 않는 임의의 베이스라인 $b(s)$에 대해 $E_{a\sim\pi_\theta}[\nabla_\theta\log\pi_\theta(a|s)\cdot b(s)]=0$이다. 따라서 $E[\nabla_\theta\log\pi_\theta(a|s)(Q(s,a)-b(s))] = E[\nabla_\theta\log\pi_\theta(a|s)Q(s,a)]$이다.


## 문제
로그의 미분 공식 $\nabla_\theta\log\pi_\theta(a|s) = \dfrac{\nabla_\theta\pi_\theta(a|s)}{\pi_\theta(a|s)}$ 를 대입하면 앞의 $\pi_\theta(a|s)$와 분모가 약분된다. $\sum_a \pi_\theta(a|s)\cdot\dfrac{\nabla_\theta\pi_\theta(a|s)}{\pi_\theta(a|s)} = \sum_a $==빈칸== 이다.

## 해설
분자분모의 $\pi_\theta(a|s)$가 정확히 약분되어 사라지고 그래디언트 $\nabla_\theta\pi_\theta(a|s)$만 남는다.

**정답: $\nabla_\theta\pi_\theta(a|s)$**

## 예시
기댓값이 0이 된다는 말을 추상적으로 두기보다 행동이 두 개뿐인 경우로 직접 확인해봅니다. $\pi_\theta(a_1|s)=0.6$, $\pi_\theta(a_2|s)=0.4$이고 그래디언트 값이 $\nabla_\theta\log\pi_\theta(a_1|s)=0.8$, $\nabla_\theta\log\pi_\theta(a_2|s)=-1.2$라 하겠습니다.

먼저 베이스라인 없이 그래디언트의 기댓값을 확인합니다.
$$E[\nabla_\theta\log\pi_\theta(a|s)]=0.6(0.8)+0.4(-1.2)=0.48-0.48=0$$
확률로 가중평균을 내면 정확히 0이 됩니다. 이 값에 $a$와 무관한 임의의 베이스라인 $b(s)=5$를 곱해도 여전히 $5\times0=0$일 뿐입니다.

**베이스라인 없이.** $Q(s,a_1)=10$, $Q(s,a_2)=2$라 하면 $E[\nabla_\theta\log\pi_\theta(a|s)Q(s,a)]=0.6(0.8)(10)+0.4(-1.2)(2)=4.8-0.96=3.84$입니다.

**베이스라인을 뺀 뒤.** $b(s)=5$를 빼면 $E[\nabla_\theta\log\pi_\theta(a|s)(Q(s,a)-b(s))]=0.6(0.8)(5)+0.4(-1.2)(-3)=2.4+1.44=3.84$입니다.

두 값이 정확히 3.84로 같습니다. 다만 항 하나하나의 크기는 4.8과 $-0.96$에서 2.4와 1.44로 훨씬 줄어들어 있습니다. 아래 증명은 이 무편향성이 이 숫자들에서만 성립하는 게 아니라 확률의 정규화 조건만으로 항상 성립함을 보입니다.
