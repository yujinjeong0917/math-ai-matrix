---
slug: generalized-advantage-estimation
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: GAE: n스텝 어드밴티지들을 지수가중으로 섞어 편향과 분산을 조절하기
hook: actor-critic-baseline에서 본 것처럼 정책경사에는 베이스라인을 뺀 어드밴티지가 곱해집니다.
---

## 기본설명
$n$스텝 어드밴티지를 $A^{(n)}_t=\sum_{l=0}^{n-1}\gamma^lr_{t+l}+\gamma^nV(s_{t+n})-V(s_t)$라 하고, $\delta_t=r_t+\gamma V(s_{t+1})-V(s_t)$라 하자. GAE를 $A^{\text{GAE}}_t=(1-\lambda)\sum_{n=1}^\infty\lambda^{n-1}A^{(n)}_t$로 정의하면 $A^{\text{GAE}}_t=\sum_{l=0}^\infty(\gamma\lambda)^l\delta_{t+l}$이다.

## 문제
섞기 전에 먼저 $A^{(n)}_t$ 자체를 시간차 오차들의 합으로 다시 쓸 수 있는지 본다. $\sum_{l=0}^{n-1}\gamma^l\delta_{t+l}$을 $\delta_{t+l}=r_{t+l}+\gamma V(s_{t+l+1})-V(s_{t+l})$로 풀어 보상항과 가치항을 따로 모으면, 가치항들은 $l=1,\dots,n-1$ 구간에서 $\gamma^{l+1}V(s_{t+l+1})$과 $-\gamma^lV(s_{t+l})$이 인덱스를 하나씩 맞바꿔 서로 상쇄되고 양 끝만 남는다. 남는 것은 시작의 $-V(s_t)$와 끝의 $\gamma^nV(s_{t+n})$뿐이다. $\sum_{l=0}^{n-1}\gamma^l\delta_{t+l} = \sum_{l=0}^{n-1}\gamma^lr_{t+l} - V(s_t) + $==빈칸== 입니다.

## 해설
가치항들을 인덱스별로 나열하면 $\gamma V(s_{t+1}),\gamma^2V(s_{t+2}),\dots$가 더해지는 동시에 $-V(s_{t+1}),-V(s_{t+2}),\dots$가 다음 항의 뺄셈으로 나타나 정확히 상쇄됩니다. 맨 앞의 $-V(s_t)$와 맨 뒤의 $\gamma^nV(s_{t+n})$만 상쇄되지 않고 살아남습니다.

**정답: $\gamma^nV(s_{t+n})$**

## 예시
재귀식으로 GAE를 직접 계산해보고, 정의를 그대로 따라간 값과 맞아떨어지는지 확인해봅니다.

할인율 $\gamma=0.9$, $\lambda=0.5$입니다. 세 시점의 보상은 $r_0=1$, $r_1=2$, $r_2=3$이고, 상태가치는 $V(s_0)=5$, $V(s_1)=4$, $V(s_2)=6$입니다. $s_3$는 에피소드가 끝나는 종단상태라 $V(s_3)=0$입니다.

먼저 시간차 오차들을 구합니다.
$$\delta_0=1+0.9\times4-5=-0.4,\quad\delta_1=2+0.9\times6-4=3.4,\quad\delta_2=3+0.9\times0-6=-3$$
재귀식 $A^{\text{GAE}}_0=\delta_0+(\gamma\lambda)\delta_1+(\gamma\lambda)^2\delta_2$에 $\gamma\lambda=0.45$를 대입합니다.
$$A^{\text{GAE}}_0 = -0.4+0.45\times3.4+0.2025\times(-3) = -0.4+1.53-0.6075 = 0.5225$$
이번엔 정의를 그대로 따라가서 $n$스텝 어드밴티지들을 직접 구하고 지수가중으로 섞어봅니다. $A^{(1)}_0=\delta_0=-0.4$입니다. $A^{(2)}_0=r_0+\gamma r_1+\gamma^2V(s_2)-V(s_0)=1+1.8+4.86-5=2.66$입니다. $A^{(3)}_0=r_0+\gamma r_1+\gamma^2r_2+\gamma^3V(s_3)-V(s_0)=1+1.8+2.43+0-5=0.23$입니다. 종단상태 이후로는 보상도 부트스트랩값도 더 늘지 않으므로 $n\ge3$인 모든 $A^{(n)}_0$은 $0.23$으로 고정됩니다.
$$A^{\text{GAE}}_0=(1-\lambda)\Big[A^{(1)}_0+\lambda A^{(2)}_0\Big]+\lambda^2A^{(3)}_0 = 0.5\times[-0.4+0.5\times2.66]+0.25\times0.23$$
$$=0.5\times0.93+0.0575=0.465+0.0575=0.5225$$
두 방식 모두 정확히 $0.5225$로 일치합니다. $\lambda=0$이었다면 $A^{\text{GAE}}_0=\delta_0=-0.4$로 1스텝 시간차 어드밴티지 그대로였을 것이고, $\lambda=1$이었다면 $A^{\text{GAE}}_0=\delta_0+\gamma\delta_1+\gamma^2\delta_2=0.23$으로 종단상태까지의 몬테카를로 어드밴티지 그대로였을 것입니다. 아래 증명은 이 재귀식이 이 특정 숫자들에서만 성립하는 우연이 아니라 임의의 보상과 가치함수에서 항상 성립하는 항등식임을 보입니다.
