---
slug: gan-minimax-objective
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 제약 최적화
title: GAN 목적함수의 최적 판별자
related: 
---

## 도입
GAN은 판별자와 생성자가 서로 겨루는 게임입니다. $\min_G\max_DV(D,G)$ 라는 이 식에서 안쪽의 $\max_D$부터 먼저 풀면 어떤 일이 벌어질까요. 생성자를 고정해 두고 판별자만 최선을 다해 최적화했을 때, 그 이상적인 판별자가 정확히 어떤 함수인지 닫힌 형태로 구할 수 있습니다. 이 결과가 GAN 목적함수 전체를 이해하는 첫 번째 열쇠입니다.

## 명제
$V(D,G)=E_{p_{data}}[\log D(x)]+E_{p_g}[\log(1-D(x))]$ 를 고정된 $G$에 대해 $D$로 최대화하면 $D^*(x)=\dfrac{p_{data}(x)}{p_{data}(x)+p_g(x)}$ 이다.

## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="200" x2="520" y2="200" class="dg-line" stroke-width="1.5"/>
<text x="500" y="220" font-size="12">x</text>
<path d="M60,190 Q170,40 260,190" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="130" y="55" font-size="12">p_data(x)</text>
<path d="M180,190 Q290,70 400,190" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="6,3"/>
<text x="330" y="85" font-size="12">p_g(x)</text>
<path d="M60,130 Q220,90 260,80 Q340,95 460,140" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="350" y="118" font-size="12">D*(x)=p_data/(p_data+p_g)</text>
<line x1="230" y1="200" x2="230" y2="30" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<text x="190" y="25" font-size="11" class="dg-dim">두 분포가 겹치는 지점 (D*≈0.5)</text>
</svg>

_실제분포와 생성분포가 겹친 그림 위에 최적 판별자 D*(x)=p_data/(p_data+p_g) 곡선을 함께 그린다._

## 문제
$x$ 하나를 고정하고 $a=p_{data}(x)$, $b=p_g(x)$라 두겠다. 피적분함수 $a\log D+b\log(1-D)$를 $D$에 대한 보통의 일변수함수로 보고 미분해서 0으로 놓는다. $\log D$의 도함수는 $1/D$이고 $\log(1-D)$의 도함수는 연쇄법칙으로 $-1/(1-D)$다. $\dfrac{a}{D} - \dfrac{b}{1-D} = $==빈칸== 이다.

## 해설
이 지점 $x$에서 $D$에 대해 최댓값을 갖는 조건, 즉 도함수가 0이 되는 조건을 그대로 적은 것이다.

**정답: $0$**

## 예시
증명에 들어가기 전에 특정 지점 $x$에서 실제 확률값 몇 개를 넣어 최적 판별자 값을 직접 계산해봅니다.

**판별자가 아직 구별할 수 있는 경우.** 어떤 지점 $x$에서 $p_{data}(x)=0.8$, $p_g(x)=0.2$라 합니다. 공식대로면 최적 판별자는 다음과 같습니다.
$$D^*(x)=\frac{0.8}{0.8+0.2}=0.8$$
실제로 $D=0.8$이 최댓값 지점인지는 도함수로 확인할 수 있습니다. $\frac{0.8}{0.8}-\frac{0.2}{0.2}=1-1=0$으로 정확히 0이 됩니다.

**생성자가 완벽해진 경우.** $p_{data}(x)=p_g(x)=0.5$라면 최적 판별자는 다음과 같습니다.
$$D^*(x)=\frac{0.5}{0.5+0.5}=0.5$$
진짜와 가짜를 반반으로도 구분하지 못하는 상태입니다. 이것이 GAN이 이르고자 하는 내시균형입니다.

아래 증명은 이 공식이 특정 확률값 두 쌍만의 우연이 아니라 임의의 $p_{data}(x)$와 $p_g(x)$에 대해 항상 이런 형태로 나온다는 사실을 보입니다.
