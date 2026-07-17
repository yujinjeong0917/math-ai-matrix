---
slug: gan-saturation
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: GAN 생성자 손실의 그래디언트 포화 비교
related: 
---

## 도입
GAN의 원래 목적함수에서 생성자는 $\log(1-D(G(z)))$를 최소화하도록 학습됩니다. 그런데 학습 초반에는 생성자가 아직 서툴러서 판별자가 가짜를 쉽게 알아챕니다. 즉 $D(G(z))$가 0에 가깝습니다. 하필 이 구간에서 원래 손실의 그래디언트가 거의 사라져버립니다. 그래서 실전에서는 $-\log D(G(z))$라는 손실을 대신 씁니다. 두 손실의 그래디언트 크기를 직접 비교해서 왜 그런지 확인해 봅니다.

## 명제
$D\in(0,1)$일 때 $\left|\dfrac{d}{dD}(-\log D)\right|\Big/\left|\dfrac{d}{dD}\log(1-D)\right| = \dfrac{1-D}{D}$이고, $D\to0$일 때 이 비는 무한히 커진다.

## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="220" x2="520" y2="220" class="dg-line" stroke-width="1.5"/>
<polygon points="520,220 508,215 508,225" class="dg-line"/>
<text x="500" y="240" font-size="12">D</text>
<line x1="50" y1="220" x2="50" y2="30" class="dg-line" stroke-width="1.5"/>
<polygon points="50,30 45,42 55,42" class="dg-line"/>
<text x="15" y="35" font-size="12">|기울기|</text>
<path d="M60,35 Q90,120 150,165 Q220,190 300,195 Q390,200 470,205" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="330" y="185" font-size="12">-log D (대안 손실)</text>
<path d="M60,150 Q200,160 350,175 Q430,190 470,215" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="6,3"/>
<text x="330" y="165" font-size="12">log(1-D) (원래 손실)</text>
<line x1="90" y1="220" x2="90" y2="60" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<text x="65" y="235" font-size="11" class="dg-dim">D≈0 (생성자가 서툴다)</text>
<text x="50" y="255" class="dg-dim" font-size="12">D→0에서 -log D는 가파르고 log(1-D)는 거의 평평함(그래디언트 포화)</text>
</svg>

_log(1-D)와 -log(D)의 기울기를 D에 대해 비교하면 D→0 부근에서 원래 손실만 포화된다._

## 문제
먼저 원래 손실 $L_{sat}(D)=\log(1-D)$ 를 $D$로 미분해 본다. $\log(1-D)$는 $\log u$에 $u=1-D$를 대입한 합성함수이므로 연쇄법칙을 쓴다. 바깥 함수 $\log u$의 도함수는 $1/u$이고 안쪽 함수 $u=1-D$의 도함수는 $-1$이다. 둘을 곱하면 $\dfrac{dL_{sat}}{dD} = $==빈칸== 이다.

## 해설
연쇄법칙으로 $\log(1-D)$의 도함수는 $\dfrac{1}{1-D}\times(-1) = -\dfrac{1}{1-D}$이 된다.

**정답: $-\dfrac{1}{1-D}$**

## 예시
증명에 들어가기 전에 판별자 출력값 두 곳에서 실제로 그래디언트 크기를 계산해서 비교해봅니다. 생성자가 아직 서툰 경우와 어느 정도 균형을 이룬 경우를 나란히 놓습니다.

**생성자가 서툰 경우.** $D=0.01$일 때 두 손실의 도함수를 각각 구합니다.
$$\left|\frac{dL_{sat}}{dD}\right|=\frac{1}{0.99}\approx1.01,\qquad \left|\frac{dL_{nonsat}}{dD}\right|=\frac{1}{0.01}=100$$
대안 손실의 그래디언트가 원래 손실보다 약 $99$배 큽니다. 판별자에게 완전히 속고 있는 바로 그 순간 원래 손실은 거의 아무 신호도 주지 못합니다.

**어느 정도 균형을 이룬 경우.** $D=0.5$일 때는 사정이 다릅니다.
$$\left|\frac{dL_{sat}}{dD}\right|=\frac{1}{0.5}=2,\qquad \left|\frac{dL_{nonsat}}{dD}\right|=\frac{1}{0.5}=2$$
두 손실의 그래디언트 크기가 정확히 같습니다. 두 손실의 차이는 $D$가 낮을 때만 벌어집니다.

아래 증명은 이 $99$배라는 격차가 우연한 숫자가 아니라 $D\to0$일수록 두 그래디언트의 비 $(1-D)/D$가 무한히 커진다는 일반적인 사실에서 나온다는 것을 보입니다.
