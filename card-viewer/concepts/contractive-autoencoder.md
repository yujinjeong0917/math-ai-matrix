---
slug: contractive-autoencoder
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 수축 오토인코더: 인코더 야코비안 벌점의 유도
hook: 오토인코더가 노이즈에 강건한 표현을 배우게 하려면 어떻게 손실을 설계해야 할까요.
---

## 기본설명
인코더 $h=f(x)$의 야코비안을 $J_f(x)=\partial h/\partial x$라 하자. 등방 가우시안 섭동 $\epsilon\sim N(0,\sigma^2I)$에 대해 $E_\epsilon\|f(x+\epsilon)-f(x)\|^2$를 1차 테일러근사로 전개하면 $\sigma^2\|J_f(x)\|_F^2$가 되며, 여기서 $\|J_f(x)\|_F^2=\sum_{ij}\left(\dfrac{\partial h_i}{\partial x_j}\right)^2$이다. 따라서 CAE의 손실 $L=\|x-g(f(x))\|^2+\lambda\|J_f(x)\|_F^2$에서 두 번째 항은 무한소 등방 입력잡음에 대한 인코더 출력의 기대 민감도를 벌점화한 것과 같다.

## 문제
이 벌점이 어떤 의미인지 보이기 위해 작은 섭동 $\epsilon$에 대해 $f(x+\epsilon)$을 1차 테일러근사하면 $f(x+\epsilon)\approx f(x)+$==빈칸== 이다.

## 해설
1차 테일러 전개의 선형항은 야코비안과 섭동벡터의 곱이에요. $f(x+\epsilon)-f(x)$의 $i$번째 성분이 $\sum_j (\partial h_i/\partial x_j)\epsilon_j$가 되는 걸 벡터로 쓴 것이 $J_f(x)\epsilon$이에요.

**정답: $J_f(x)\epsilon$**

## 예시
은닉유닛이 1개, 입력이 2차원인 시그모이드 인코더 $h=\sigma(w^Tx)$, $w=(1,-1)$를 생각합니다. $x_0=(0,0)$에서 사전활성값은 $w^Tx_0=0$이므로 $h=\sigma(0)=0.5$이고 $h(1-h)=0.25$입니다.

야코비안은 $J_f(x_0)=h(1-h)\,w^T=0.25\,(1,-1)=(0.25,-0.25)$이고 $\|J_f(x_0)\|_F^2=0.25^2+0.25^2=0.125$입니다. 등방잡음의 분산이 $\sigma^2=0.01$이라면 $E_\epsilon\|f(x_0+\epsilon)-f(x_0)\|^2\approx0.01\times0.125=0.00125$로 근사됩니다.
