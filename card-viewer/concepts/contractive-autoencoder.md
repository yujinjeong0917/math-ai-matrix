---
slug: contractive-autoencoder
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 수축 오토인코더: 인코더 야코비안 벌점의 유도
related: 언더컴플리트 오토인코더=PCA
---

## 도입
오토인코더가 노이즈에 강건한 표현을 배우게 하려면 어떻게 손실을 설계해야 할까요. 입력에 아주 작은 무작위 섭동을 주고 인코더 출력이 얼마나 흔들리는지를 직접 재는 대신, 그 흔들림을 1차 근사로 계산해서 벌점으로 쓸 수 있습니다. 그 결과가 바로 수축 오토인코더(Contractive Autoencoder, CAE)의 야코비안 노름 벌점입니다.

## 명제
인코더 $h=f(x)$의 야코비안을 $J_f(x)=\partial h/\partial x$라 하자. 등방 가우시안 섭동 $\epsilon\sim N(0,\sigma^2I)$에 대해 $E_\epsilon\|f(x+\epsilon)-f(x)\|^2$를 1차 테일러근사로 전개하면 $\sigma^2\|J_f(x)\|_F^2$가 되며, 여기서 $\|J_f(x)\|_F^2=\sum_{ij}\left(\dfrac{\partial h_i}{\partial x_j}\right)^2$이다. 따라서 CAE의 손실 $L=\|x-g(f(x))\|^2+\lambda\|J_f(x)\|_F^2$에서 두 번째 항은 무한소 등방 입력잡음에 대한 인코더 출력의 기대 민감도를 벌점화한 것과 같다.

## 그림
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
<text x="90" y="30" font-size="12" text-anchor="middle">입력공간</text>
<circle cx="90" cy="110" r="55" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="90" y="180" font-size="11" text-anchor="middle">섭동 원 (반경 σ)</text>
<line x1="160" y1="110" x2="230" y2="110" class="dg-line" stroke-width="2"/>
<polygon points="230,110 220,105 220,115" class="dg-stroke-ink"/>
<text x="165" y="95" font-size="11">인코더 f</text>
<text x="330" y="30" font-size="12" text-anchor="middle">잠재공간</text>
<circle cx="330" cy="110" r="18" class="dg-accent"/>
<text x="330" y="150" font-size="11" text-anchor="middle">더 작은 공 (수축됨)</text>
</svg>

_입력공간의 작은 섭동 원이 인코더를 통과하며 잠재공간에서 더 작은 공으로 수축된다._

## 문제
이 벌점이 어떤 의미인지 보이기 위해 작은 섭동 $\epsilon$에 대해 $f(x+\epsilon)$을 1차 테일러근사하면 $f(x+\epsilon)\approx f(x)+$==빈칸== 이다.

## 해설
1차 테일러 전개의 선형항은 야코비안과 섭동벡터의 곱이에요. $f(x+\epsilon)-f(x)$의 $i$번째 성분이 $\sum_j (\partial h_i/\partial x_j)\epsilon_j$가 되는 걸 벡터로 쓴 것이 $J_f(x)\epsilon$이에요.

**정답: $J_f(x)\epsilon$**

## 예시
은닉유닛이 1개, 입력이 2차원인 시그모이드 인코더 $h=\sigma(w^Tx)$, $w=(1,-1)$를 생각합니다. $x_0=(0,0)$에서 사전활성값은 $w^Tx_0=0$이므로 $h=\sigma(0)=0.5$이고 $h(1-h)=0.25$입니다.

야코비안은 $J_f(x_0)=h(1-h)\,w^T=0.25\,(1,-1)=(0.25,-0.25)$이고 $\|J_f(x_0)\|_F^2=0.25^2+0.25^2=0.125$입니다. 등방잡음의 분산이 $\sigma^2=0.01$이라면 $E_\epsilon\|f(x_0+\epsilon)-f(x_0)\|^2\approx0.01\times0.125=0.00125$로 근사됩니다.
