---
slug: backprop-jacobian
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 야코비안 행렬 곱과 그래디언트의 고유값 감쇠
related: 
---

## 도입
신경망은 여러 층을 겹겹이 통과하는 벡터함수의 합성입니다. 역전파는 이 합성함수의 체인룰을 출력에서 입력 방향으로 거슬러 적용하는 알고리즘입니다. 스칼라 하나가 아니라 벡터 전체가 층을 통과하니 각 층의 미분은 이제 숫자 하나가 아니라 야코비안이라는 행렬이 됩니다. 이 행렬들을 층마다 계속 곱해나가다 보면 신기한 일이 벌어집니다. 각 야코비안의 고유값이 1보다 작으면 그래디언트가 층을 거칠수록 기하급수적으로 작아집니다. 1보다 크면 폭발합니다. 이것이 딥러닝에서 흔히 말하는 그래디언트 소실과 폭주의 정체입니다.

## 명제
각 층의 야코비안 $J_l$이 대칭이고 고유값의 절댓값이 모두 $\rho$ 이하이면, $L$개 층을 통과한 그래디언트는 $\|g_0\|\le\rho^L\|g_L\|$을 만족한다.

## 그림
<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="175" x2="540" y2="175" class="dg-line" stroke-width="1"/>
<line x1="80" y1="175" x2="80" y2="50" class="dg-stroke-accent" stroke-width="3"/>
<polygon points="80,50 73,63 87,63" class="dg-accent"/>
<text x="80" y="38" font-size="12" text-anchor="middle">g_L</text>
<line x1="220" y1="175" x2="220" y2="112" class="dg-stroke-accent" stroke-width="3"/>
<polygon points="220,112 213,125 227,125" class="dg-accent"/>
<text x="220" y="100" font-size="12" text-anchor="middle">g_{L-1}</text>
<line x1="360" y1="175" x2="360" y2="143" class="dg-stroke-accent" stroke-width="3"/>
<polygon points="360,143 353,156 367,156" class="dg-accent"/>
<text x="360" y="131" font-size="12" text-anchor="middle">g_1</text>
<line x1="500" y1="175" x2="500" y2="159" class="dg-stroke-accent" stroke-width="3"/>
<polygon points="500,159 493,172 507,172" class="dg-accent"/>
<text x="500" y="147" font-size="12" text-anchor="middle">g_0</text>
<line x1="98" y1="112" x2="202" y2="112" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<polygon points="202,112 192,107 192,117" class="dg-dim"/>
<line x1="238" y1="143" x2="342" y2="143" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<polygon points="342,143 332,138 332,148" class="dg-dim"/>
<line x1="378" y1="159" x2="482" y2="159" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<polygon points="482,159 472,154 472,164" class="dg-dim"/>
<text x="150" y="196" font-size="11" class="dg-dim">×J_Lᵀ (≤ρ배)</text>
<text x="290" y="196" font-size="11" class="dg-dim">×J_2ᵀ (≤ρ배)</text>
<text x="430" y="196" font-size="11" class="dg-dim">×J_1ᵀ (≤ρ배)</text>
</svg>

_고유값이 ρ<1인 야코비안을 한 층씩 거칠 때마다 그래디언트 길이가 ρ배 이하로 줄어, L개 층을 지나면 ρ^L배까지 감쇠한다._

## 문제
지금 목표는 한 층을 거슬러 올라갈 때 그래디언트가 어떻게 바뀌는지를 정확한 식으로 쓰는 것이다. $L$은 $x_l$을 거쳐서만 $x_{l-1}$에 의존하므로 체인룰을 쓴다. 다만 이번엔 $x_l$이 벡터이므로 스칼라 체인룰이 아니라 야코비안과 벡터의 곱으로 나타난다. 관례상 그래디언트를 열벡터로 쓰기 때문에 곱하는 순서를 맞추려면 야코비안을 전치해서 곱해야 한다. $g_{l-1} = \dfrac{\partial L}{\partial x_{l-1}} = $==빈칸== 이다.

## 해설
$x_l=f_l(x_{l-1})$이므로 $x_l$의 각 성분이 $x_{l-1}$의 여러 성분에 동시에 의존한다. 이 다변수 체인룰을 행렬로 정리하면 $\partial x_l/\partial x_{l-1}$인 야코비안 $J_l$의 전치를 그래디언트 $g_l$에 곱한 형태가 된다. 전치가 붙는 이유는 순전파에서 $x_{l-1}\to x_l$로 가는 변환을 그래디언트에서는 거꾸로 돌려주어야 하기 때문이다.

**정답: $J_l^Tg_l$**

## 예시
추상적인 부등식을 보기 전에 실제 숫자로 그래디언트가 층을 거치며 얼마나 줄어드는지 따라가봅니다.

모든 층의 야코비안이 같은 대각행렬 $J=\begin{pmatrix}0.5&0\\0&0.4\end{pmatrix}$라 하고 $\rho=0.5$로 둡니다. 대각행렬은 자기 자신이 전치이므로 대칭행렬 조건도 그대로 만족합니다.

출력 쪽 그래디언트를 $g_3=(1,1)$이라 하면 $\|g_3\|=\sqrt2\approx1.414$입니다. 한 층씩 거슬러 올라가며 곱해봅니다. $g_2=Jg_3=(0.5,0.4)$, $g_1=Jg_2=(0.25,0.16)$, $g_0=Jg_1=(0.125,0.064)$입니다.

$g_0$의 노름은 $\|g_0\|\approx0.140$입니다. 명제가 말하는 상한은 $\rho^3\|g_3\|=0.125\times1.414\approx0.177$입니다. 실제 값 $0.140$이 이 상한 아래에 있습니다.

세 층을 거치는 동안 그래디언트의 길이가 $1.414$에서 $0.140$까지 줄어들었습니다. 아래 증명은 이 감쇠가 이 특정 대각행렬만의 우연이 아니라 고유값이 $\rho$ 이하인 모든 대칭 야코비안에서 항상 보장됨을 보입니다.
