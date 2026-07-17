---
slug: beta-vae
theme: INFO
domainLabel: 정보이론
subLabel: 엔트로피 · 손실
title: 베타-VAE와 정보병목의 라그랑주 해석
related: 
---

## 도입
베타-VAE는 KL항 앞에 계수 $\beta$를 붙여서 $\mathbb{E}[\log p(x|z)] - \beta\cdot D_{KL}(q(z|x)\|p(z))$를 최적화합니다. $\beta$를 키우면 잠재변수가 더 정보를 적게 갖게 되고 그만큼 표현이 서로 분리되기 쉬워진다고 알려져 있습니다. 이 현상은 사실 lagrange-kkt에서 본 라그랑주 승수법의 정확한 결과이고, information-bottleneck과도 곧바로 이어집니다.

## 명제
재구성 품질을 정보량 $D$의 오목함수 $R(D)$로 나타낼 때, 라그랑지안 $\mathcal{L}(D,\beta)=R(D)-\beta D$를 최대화하는 최적 정보량 $D^*(\beta)$는 $\beta$가 커질수록 커지지 않는다(즉 정보병목이 조여진다).

## 그림
<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="190" x2="470" y2="190" class="dg-line" stroke-width="1"/>
<line x1="50" y1="190" x2="50" y2="20" class="dg-line" stroke-width="1"/>
<text x="470" y="205" font-size="11" text-anchor="end">D (정보량)</text>
<text x="30" y="20" font-size="11">R(D)</text>
<path d="M50,110 Q160,10 380,45" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="230" cy="65" r="4" class="dg-accent"/>
<line x1="130" y1="105" x2="330" y2="25" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<text x="335" y="22" font-size="10">기울기 = β</text>
<line x1="230" y1="65" x2="230" y2="190" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<text x="230" y="205" font-size="10" text-anchor="middle">D*(β)</text>
<circle cx="150" cy="86" r="4" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<line x1="150" y1="86" x2="150" y2="190" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<text x="150" y="205" font-size="10" text-anchor="middle" class="dg-dim">D*(β′), β′&gt;β</text>
<text x="60" y="40" font-size="11" class="dg-dim">R(D): 오목함수</text>
</svg>

_β가 커질수록 접선의 기울기가 커지고 최적 접점 D*는 왼쪽으로, 즉 더 작은 값으로 이동한다._

## 문제
제약이 있는 문제 $\max_DR(D)\ \text{s.t.}\ D\le C$의 라그랑지안을 lagrange-kkt와 같은 방식으로 만듭니다. 제약을 등호로 정리한 식에 벌점 계수 $\beta\ge0$을 곱해서 목적함수에 더합니다.

$\mathcal{L}(D,\beta) = R(D) - \beta($==빈칸==$)$ 이다.

## 해설
제약 $D\le C$를 등호가 지켜지는 형태 $D-C\le0$으로 바꾸고 그 식에 벌점 계수 $\beta$를 곱해 목적함수에 더합니다. lagrange-kkt 항목에서 쓴 것과 같은 구성입니다.

**정답: $D - C$**

## 예시
$\beta$를 키우면 최적 정보량 $D^*$가 커지지 않는다는 명제를 구체적인 함수로 확인해봅니다.

재구성 품질 함수로 $R(D)=-\frac12(D-4)^2+8$을 예로 씁니다. $D\in[0,4]$에서 이 함수는 오목하고 증가하는 함수입니다. 도함수는 $R'(D)=4-D$입니다.

라그랑주 조건 $R'(D^*)=\beta$에 대입하면 $D^*=4-\beta$를 얻습니다.

$\beta=1$이면 $D^*=3$이고 $\beta=3$이면 $D^*=1$입니다. $\beta$를 1에서 3으로 세 배 키우자 $D^*$는 3에서 1로 줄어들었습니다.

아래 증명은 이 함수 하나에서 관찰한 감소 경향이 $R$이 오목하기만 하면 항상 성립하는 일반적인 사실임을 보입니다.
