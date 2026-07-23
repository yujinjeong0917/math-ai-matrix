---
slug: integrated-gradients
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 그래디언트 기반
title: Integrated Gradients: 기준점에서 경로적분으로 기여도 구하기
related: Saliency Map · 선형모델 계수
---

## 도입
기준점 $x'$(검은 이미지나 0 벡터처럼 아무 정보가 없다고 볼 수 있는 입력)에서 실제 입력 $x$까지를 $\alpha \in [0,1]$로 매개변수화한 직선 경로로 잇는다. 성분 $i$에 대한 기여도는 다음과 같다.

$IG_i(x) = (x_i - x_i') \int_0^1 \frac{\partial F(x' + \alpha(x-x'))}{\partial x_i} d\alpha$

이 값들을 모든 성분에 대해 더하면 정확히 모델 출력의 변화량과 같아진다는 완전성(completeness) 성질을 만족한다. $\sum_i IG_i(x) = F(x) - F(x')$. 한 점의 기울기만 보는 saliency map은 이 성질을 보장하지 않는다.

실제 계산은 적분을 리만합으로 근사한다. 경로를 $m$개의 계단으로 나눠 각 계단에서 그래디언트를 구하고 평균 낸 뒤 $(x_i - x_i')$를 곱한다. $m$은 보통 20에서 300 사이로 잡는다. 기준점을 무엇으로 잡느냐도 결과를 바꾼다. 검은 이미지, 0 벡터, 데이터셋 평균 이미지는 모두 서로 다른 없음의 기준을 뜻하고 그만큼 기여도 해석도 달라진다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="150" x2="560" y2="150" class="dg-line" stroke-width="2" stroke-dasharray="6,4"/>
<circle cx="60" cy="150" r="8" class="dg-dim" stroke="none"/>
<circle cx="560" cy="150" r="8" class="dg-accent" stroke="none"/>
<text x="60" y="130" font-size="12" text-anchor="middle">기준점 x'</text>
<text x="560" y="130" font-size="12" text-anchor="middle">입력 x</text>
<circle cx="185" cy="150" r="5" class="dg-dim" stroke="none"/>
<circle cx="310" cy="150" r="5" class="dg-dim" stroke="none"/>
<circle cx="435" cy="150" r="5" class="dg-dim" stroke="none"/>
<line x1="185" y1="150" x2="185" y2="110" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="310" y1="150" x2="310" y2="90" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="435" y1="150" x2="435" y2="70" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="185" y="105" font-size="11" text-anchor="middle" class="dg-dim">∂F/∂x</text>
<text x="310" y="85" font-size="11" text-anchor="middle" class="dg-dim">∂F/∂x</text>
<text x="435" y="65" font-size="11" text-anchor="middle" class="dg-dim">∂F/∂x</text>
<text x="310" y="185" font-size="13" text-anchor="middle">α: 0에서 1까지 경로를 따라 그래디언트를 적분</text>
<line x1="60" y1="205" x2="560" y2="205" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="560,205 550,199 550,211" class="dg-dim" stroke="none"/>
<text x="310" y="225" font-size="12" text-anchor="middle" class="dg-dim">누적 기여도 = IG_i(x)</text>
</svg>

_기준점에서 입력까지 경로를 따라 그래디언트를 적분해 기여도를 구한다._

## 문제
$g(\alpha) = F(\gamma(\alpha))$ 라 두면 연쇄법칙에 의해 $g'(\alpha) = \sum_i \dfrac{\partial F(\gamma(\alpha))}{\partial x_i}\cdot\dfrac{d\gamma_i(\alpha)}{d\alpha}$ 이다. s1의 경로 정의를 성분별로 전개하면 $\gamma_i(\alpha) = x_i' - \alpha x_i' + \alpha x_i$이고, 이를 $\alpha$로 미분하면 $\dfrac{d\gamma_i}{d\alpha} = $==빈칸== 이다.

## 해설
γ_i(α)=x_i'-αx_i'+αx_i를 α로 미분하면 상수항 x_i'는 사라지고 α의 계수인 -x_i'와 x_i만 남아 x_i-x_i'가 돼요.

**정답: $x_i-x_i'$**

## 예시
$F(x) = x^2$라는 함수와 기준점 $x'=0$, 실제 입력 $x=2$를 생각하자. 경로 위 점은 $z(\alpha) = 2\alpha$이고 그 지점의 그래디언트는 $\partial F/\partial x = 2z(\alpha) = 4\alpha$이다. 따라서 $IG(x) = (2-0)\int_0^1 4\alpha\, d\alpha = 2 \times 2 = 4$이다. 실제로 $F(x) - F(x') = 4 - 0 = 4$이므로 완전성 성질이 정확히 성립한다.
