---
slug: vanishing-exploding-gradients
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 수치적 안정성
title: 그래디언트 소실과 폭주: (1±ε)^L의 지수적 변화
related: 
---

## 도입
깊은 네트워크를 역전파로 학습시키면 입력에 가까운 층일수록 그래디언트가 이상하게 작아지거나 커지는 현상이 자주 나타납니다. backprop-jacobian 항목에서 본 것처럼 그래디언트는 층마다 야코비안을 하나씩 곱하며 거슬러 올라갑니다. 여기서는 그 곱이 층 수 $L$에 대해 정확히 얼마나 빠르게 커지거나 작아지는지를 수로 확인합니다.

## 명제
$L$겹 스칼라 선형 네트워크에서 각 층의 미분 계수가 같은 값 $c$라 하자. $c=1-\epsilon$ ($0<\epsilon<1$)이면 $|c^L|\le e^{-\epsilon L}$이고, $c=1+\epsilon$ ($\epsilon>0$)이면 $c^L=e^{L\ln(1+\epsilon)}$로 $L$에 대해 지수적으로 커진다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="190" x2="430" y2="190" class="dg-line" stroke-width="1"/>
<line x1="50" y1="190" x2="50" y2="15" class="dg-line" stroke-width="1"/>
<text x="430" y="205" font-size="11" text-anchor="end">층 수 L</text>
<text x="30" y="15" font-size="11">|gₗ|</text>
<line x1="50" y1="120" x2="430" y2="120" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<text x="10" y="124" font-size="9" class="dg-dim">1</text>
<path d="M50,120 C130,60 250,25 430,15" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="330" y="35" font-size="11">c=1.2: (1+ε)^L 폭주</text>
<path d="M50,120 C130,155 250,180 430,188" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="300" y="170" font-size="11" class="dg-dim">c=0.8: (1−ε)^L 소실</text>
<circle cx="230" cy="45" r="3.5" class="dg-accent"/>
<text x="235" y="43" font-size="9">L=5: 2.49배</text>
<circle cx="230" cy="168" r="3.5" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<text x="235" y="180" font-size="9" class="dg-dim">L=5: 0.33배</text>
</svg>

_같은 크기의 층별 편차 ε라도 층 수가 늘어나면 한쪽은 지수적으로 폭주하고 한쪽은 지수적으로 소실한다._

## 문제
$g_{l-1}=w_lg_l$을 $l=L,L-1,\dots,1$까지 차례로 적용하면 매번 새 계수가 하나씩 곱해져 쌓인다.

$g_0 = ($==빈칸==$)g_L$ 이다.

## 해설
s1의 관계를 $L$번 반복 적용하면 매 단계마다 계수가 하나씩 곱해져 쌓인다. 최종적으로 $L$개의 계수가 모두 곱해진 형태로 $g_L$에 작용한 것이 $g_0$이다.

**정답: $w_1w_2\cdots w_L$**

## 예시
지수적으로 준다거나 커진다는 말이 실제로 층 몇 개만 지나도 얼마나 빠른지 $L=5$, $\epsilon=0.2$를 넣어 확인해봅니다.

**소실 쪽.** 각 층의 계수가 $c=1-0.2=0.8$이라 하면 $5$개 층을 지난 뒤 남는 비율은 $c^5=0.8^5=0.32768$입니다. 증명에서 구한 상한은 $e^{-\epsilon L}=e^{-1}\approx0.36788$이니 $0.32768\le0.36788$로 실제 값이 상한 안에 잘 들어옵니다.

층마다 겨우 $20\%$씩만 줄어드는데도 $5$개 층을 지나면 그래디언트는 원래 크기의 $3$분의 $1$ 아래로 떨어집니다.

**폭주 쪽.** 반대로 $c=1+0.2=1.2$라 하면 $c^5=1.2^5=2.48832$이고 이는 $e^{5\ln1.2}=e^{0.91161}\approx2.48832$와 정확히 같습니다. 같은 $20\%$의 편차가 이번엔 그래디언트를 원래 크기의 $2.5$배 가까이로 불려놓습니다.

아래 증명은 이 두 배율이 각각 $e^{-\epsilon L}$과 $e^{L\ln(1+\epsilon)}$라는 정확한 지수식으로 항상 통제된다는 사실을 보입니다.
