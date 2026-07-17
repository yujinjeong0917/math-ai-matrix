---
slug: smoothness-interpolation
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 함수의 성질
title: 생성함수의 매끄러움과 잠재공간 보간
related: 
---

## 도입
생성모델의 디코더 $G$는 잠재벡터 $z$를 이미지나 문장 같은 데이터로 바꿉니다. 두 잠재벡터 사이를 직선으로 보간하면서 $G$에 통과시키면 중간 결과들이 부드럽게 이어지길 기대합니다. 이 기대가 성립하려면 $G$가 립시츠 연속으로 매끄러워야 합니다. 그 매끄러움 가정이 보간 경로에 실제로 무엇을 보장하는지 확인해 봅니다.

## 명제
$G$가 $L$-립시츠 연속이고 $z_t=(1-t)z_0+tz_1$, $t\in[0,1]$ 이면 임의의 $s,t\in[0,1]$에 대해 $\|G(z_t)-G(z_s)\|\le L\|z_1-z_0\||t-s|$이다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<text x="30" y="22" font-size="13">잠재공간: 직선 보간</text>
<line x1="40" y1="100" x2="300" y2="100" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="40" cy="100" r="5" class="dg-accent"/>
<circle cx="300" cy="100" r="5" class="dg-accent"/>
<circle cx="120" cy="100" r="3" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="200" cy="100" r="3" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="260" cy="100" r="3" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="30" y="122" font-size="12">z₀</text>
<text x="295" y="122" font-size="12">z₁</text>
<text x="90" y="145" font-size="11" class="dg-dim">z_t=(1-t)z₀+tz₁</text>
<text x="380" y="22" font-size="13">출력공간: G를 통과한 이미지 시퀀스</text>
<line x1="360" y1="70" x2="640" y2="70" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="640,70 628,65 628,75" class="dg-stroke-accent"/>
<text x="490" y="60" font-size="11">G</text>
<rect x="360" y="120" width="35" height="35" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="425" y="120" width="35" height="35" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="490" y="120" width="35" height="35" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="555" y="120" width="35" height="35" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="620" y="120" width="35" height="35" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="60" y="200" class="dg-dim" font-size="12">L-립시츠 G가 직선 보간을 부드럽게 이어지는 이미지 시퀀스로 옮긴다</text>
</svg>

_두 잠재점의 직선 보간이 G를 통과해 출력공간에서 부드러운 이미지 시퀀스로 나타난다._

## 문제
$z_t-z_s$를 정의대로 풀어쓴다. $z_t-z_s = ((1-t)z_0+tz_1) - ((1-s)z_0+sz_1)$ 이다. $z_0$의 계수끼리 $z_1$의 계수끼리 묶으면 $z_t-z_s = (s-t)z_0+(t-s)z_1 = (t-s)($==빈칸==$)$ 이다.

## 해설
$(s-t)z_0+(t-s)z_1$에서 공통인수 $(t-s)$를 밖으로 빼면 $z_0$ 항의 부호가 뒤집혀 $(t-s)(z_1-z_0)$ 형태가 된다.

**정답: $z_1-z_0$**

## 예시
일반적인 부등식을 보기 전에 구체적인 $G$로 보간 경로가 얼마나 튈 수 있는지 직접 계산해봅니다. $z_0=(0,0)$, $z_1=(4,3)$이고 $G(z)=2z$라는 단순한 선형 디코더를 쓰면 $\|z_1-z_0\|=5$이고 $G$는 정확히 $L=2$-립시츠입니다.

$t=0.2$와 $s=0.5$인 두 보간점을 봅니다. $z_t=0.2(4,3)=(0.8,0.6)$이고 $z_s=0.5(4,3)=(2,1.5)$입니다.
$$G(z_t)=(1.6,1.2),\qquad G(z_s)=(4,3)$$
두 출력의 차이는 $(-2.4,-1.8)$이고 그 크기는 다음과 같습니다.
$$\|G(z_t)-G(z_s)\|=\sqrt{2.4^2+1.8^2}=\sqrt{9}=3$$
명제가 말하는 상한 $L\|z_1-z_0\||t-s|=2\times5\times0.3=3$과 정확히 같습니다. $G$가 선형이라 이 경우는 상한에 딱 맞아떨어지는 극단적인 예입니다. 아래 증명은 이 상한이 이 선형 예뿐 아니라 임의의 $L$-립시츠 디코더와 임의의 보간점 쌍에서 항상 성립함을 보입니다.
