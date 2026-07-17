---
slug: latent-space-projection
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: 최소제곱 사영으로 본 잠재공간 압축의 최적성
related: 
---

## 도입
인코더는 고차원 데이터 $x$를 저차원 잠재벡터로 압축합니다. 이 압축이 정보를 최대한 적게 잃으려면 어떤 방식으로 눌러야 할까요. 부분공간 하나를 정해두고 그 위로 데이터를 사영하는 것이 바로 그 답입니다. 정확히는 직교사영이 그 부분공간 안에 있는 모든 점들 중에서 원래 데이터까지의 거리를 가장 짧게 만드는 유일한 선택입니다. 선형 오토인코더나 PCA 기반 압축이 사영이라는 연산을 쓰는 이유가 바로 여기에 있습니다.

## 명제
$Q$의 열이 부분공간 $U$의 정규직교기저($Q^TQ=I$)일 때, $x$에서 $U$까지의 거리를 최소화하는 점은 $\hat x=QQ^Tx$이고 잔차 $x-\hat x$는 $U$와 직교한다.

## 그림
<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="170" x2="330" y2="170" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="330,170 318,165 318,175" class="dg-dim"/>
<text x="335" y="174" font-size="12">U (부분공간, 기저 Q)</text>
<line x1="30" y1="170" x2="250" y2="60" class="dg-line" stroke-width="2"/>
<polygon points="250,60 238,66 244,75" class="dg-dim"/>
<text x="256" y="55" font-size="12">x</text>
<line x1="30" y1="170" x2="250" y2="170" class="dg-stroke-accent" stroke-width="2.5"/>
<circle cx="250" cy="170" r="4" class="dg-accent"/>
<text x="205" y="190" font-size="12">x̂ = QQᵀx</text>
<line x1="250" y1="60" x2="250" y2="170" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<rect x="240" y="160" width="10" height="10" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<text x="255" y="115" font-size="11" class="dg-dim">잔차 x-x̂ ⊥ U</text>
</svg>

_x에서 부분공간 U로 내린 수선의 발이 최적 사영 x̂이고, 남은 잔차는 반드시 U와 직각을 이룬다._

## 문제
거리 대신 그 제곱 $\|x-Qc\|^2$을 최소화하는 $c$를 찾는다. 제곱근보다 제곱이 미분하기 쉽고 최솟값의 위치는 똑같기 때문이다. 전개하면 $\|x-Qc\|^2 = x^Tx - 2c^TQ^Tx + c^TQ^TQc = x^Tx-2c^TQ^Tx+c^Tc$ 이다 ($Q^TQ=I$를 썼다). 이 식을 $c$로 미분해서 0으로 놓으면 $-2Q^Tx+2c = $==빈칸== 이다.

## 해설
함수가 최솟값을 갖는 지점에서는 기울기가 0이 된다는 미적분의 기본 성질을 그대로 쓴 것이다. $c^Tc$를 $c$로 미분하면 $2c$가 되고 $-2c^TQ^Tx$를 미분하면 $-2Q^Tx$가 된다. 이 둘을 더해 0으로 놓았다.

**정답: $0$**

## 예시
사영이 최단거리를 만든다는 명제도 숫자를 넣어 직접 사영해보면 훨씬 분명해집니다.

$\mathbb{R}^3$ 안에서 원점을 지나는 방향 $q=(1/\sqrt2,\ 1/\sqrt2,\ 0)$이 만드는 1차원 부분공간 $U$를 씁니다. $q$는 이미 단위벡터이므로 $Q=q$ 자체가 정규직교기저입니다.
$$x=(3,1,5)$$
사영 좌표는 $c=Q^Tx=q\cdot x=\frac{3+1}{\sqrt2}=2\sqrt2$이고, 이를 다시 공간으로 되돌리면 다음과 같습니다.
$$\hat x=Qc=q\cdot 2\sqrt2=(2,\ 2,\ 0)$$
잔차는 $x-\hat x=(1,-1,5)$입니다. 이 잔차와 $q$의 내적을 계산하면 $\frac{1}{\sqrt2}\cdot1+\frac{1}{\sqrt2}\cdot(-1)+0\cdot5=0$이므로 잔차는 정확히 $U$와 수직입니다.

길이도 맞아떨어집니다. $\|x\|^2=9+1+25=35$이고 $\|\hat x\|^2=4+4=8$이니 $\|x\|^2-\|\hat x\|^2=27$인데, 잔차의 길이를 직접 재도 $1+1+25=27$로 똑같습니다. 아래 증명은 이 수직성과 길이 관계가 특정 벡터가 아니라 임의의 $x$와 임의의 정규직교기저 $Q$에서 항상 성립함을 보입니다.
