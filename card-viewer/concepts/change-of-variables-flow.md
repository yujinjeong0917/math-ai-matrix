---
slug: change-of-variables-flow
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 정규화 흐름의 변수변환 공식: 확률밀도가 야코비안 행렬식만큼 늘어나거나 줄어드는 이유
related: 재매개변수화 트릭 · 확산모델 정방향과정의 닫힌형 주변분포
---

## 도입
정규화 흐름은 데이터 $x$를 가역이고 미분 가능한 함수 $f$로 잠재변수 $z=f(x)$로 옮깁니다. $z$ 쪽의 분포 $p_z$는 표준정규분포처럼 다루기 쉬운 형태로 골라둡니다. 그런데 $x$의 분포 $p_x$를 알고 싶다면 $p_z$를 그대로 가져다 쓸 수 없습니다. $f$가 국소적으로 공간을 늘리거나 줄이는 정도만큼 확률밀도도 반대로 줄거나 늘어나야 하기 때문입니다. 이 보정 계수가 정확히 야코비안 행렬식의 절댓값이라는 사실을 확률질량 보존 조건에서 유도해봅니다.

## 명제
$f:\mathbb{R}^n\to\mathbb{R}^n$가 가역이고 미분 가능하며 $z=f(x)$라 하자. $p_z$가 $z$의 확률밀도라면 $p_x(x) = p_z(f(x))\left|\det\dfrac{df}{dx}(x)\right|$ 이다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="30" width="180" height="160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="76" y1="30" x2="76" y2="190" class="dg-line" stroke-width="1"/>
<line x1="112" y1="30" x2="112" y2="190" class="dg-line" stroke-width="1"/>
<line x1="148" y1="30" x2="148" y2="190" class="dg-line" stroke-width="1"/>
<line x1="184" y1="30" x2="184" y2="190" class="dg-line" stroke-width="1"/>
<line x1="40" y1="70" x2="220" y2="70" class="dg-line" stroke-width="1"/>
<line x1="40" y1="110" x2="220" y2="110" class="dg-line" stroke-width="1"/>
<line x1="40" y1="150" x2="220" y2="150" class="dg-line" stroke-width="1"/>
<rect x="112" y="70" width="36" height="40" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<text x="40" y="20" font-size="12">x 공간: 균일한 격자</text>
<line x1="232" y1="110" x2="300" y2="110" class="dg-stroke-accent" stroke-width="2"/>
<path d="M292,102 L302,110 L292,118" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="228" y="95" font-size="12">z = f(x), 가역·미분가능</text>
<path d="M470,30 Q460,110 470,190" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<path d="M660,30 Q670,110 660,190" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="470" y1="30" x2="660" y2="30" class="dg-stroke-ink" stroke-width="2"/>
<line x1="470" y1="190" x2="660" y2="190" class="dg-stroke-ink" stroke-width="2"/>
<path d="M500,30 Q495,110 500,190" fill="none" class="dg-line" stroke-width="1"/>
<path d="M525,30 Q520,110 525,190" fill="none" class="dg-line" stroke-width="1"/>
<path d="M565,30 Q572,110 565,190" fill="none" class="dg-line" stroke-width="1"/>
<path d="M615,30 Q628,110 615,190" fill="none" class="dg-line" stroke-width="1"/>
<line x1="470" y1="82" x2="660" y2="76" class="dg-line" stroke-width="1"/>
<line x1="470" y1="138" x2="660" y2="144" class="dg-line" stroke-width="1"/>
<path d="M525,82 L565,76 L565,138 L525,144 Z" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<text x="470" y="20" font-size="12">z 공간: 뒤틀린 격자</text>
<text x="470" y="208" font-size="11" class="dg-dim">칸 면적 변화 비율 = |det df/dx(x)|</text>
</svg>

_같은 격자 칸이 f를 지나며 늘어나거나 좁아진 만큼 확률밀도가 반대로 줄거나 늘어난다._

## 문제
이 식을 풀려면 먼저 $dz$가 $dx$와 어떤 관계인지부터 알아야 한다. $f$를 $x$ 근처에서 국소적으로 선형근사하면 미분의 정의에 따라 아주 작은 변화 $dx$가 만들어내는 $dz$는 도함수를 곱한 값이다. $dz = $==빈칸== 이다.

## 해설
미분의 정의 $f'(x)=\lim_{dx\to0}(f(x+dx)-f(x))/dx$에서 분모를 이항하면 $f(x+dx)-f(x)\approx f'(x)dx$를 얻는다. 이 좌변이 바로 $z$의 변화량 $dz$다.

**정답: $f'(x)\,dx$**

## 예시
일반적인 $n$차원 공식을 보기 전에 $1$차원 아핀변환 하나로 공식이 실제로 맞아떨어지는지 확인해봅니다. 잠재변수 $z$의 분포를 표준정규분포 $p_z(z)=\frac{1}{\sqrt{2\pi}}\exp(-z^2/2)$로 두고 변환을 $z=f(x)=2x+1$로 잡습니다.

먼저 도함수를 구합니다. $f'(x)=2$이므로 야코비안 행렬식의 절댓값은 모든 $x$에서 $|f'(x)|=2$로 상수입니다.

공식대로 $x=0$에서 $p_x(0)$를 계산합니다. $f(0)=1$이므로 $p_z(f(0))=p_z(1)=\frac{1}{\sqrt{2\pi}}\exp(-1/2)\approx0.241971$입니다.
$$p_x(0) = p_z(f(0))\,|f'(0)| \approx 0.241971\times2 = 0.483941$$
이 값이 맞는지 다른 방식으로 검산합니다. $z=2x+1$이고 $z\sim N(0,1)$이면 $x=(z-1)/2$는 $z$의 아핀변환이라 $x$도 정규분포를 따르고 평균은 $-0.5$ 분산은 $0.25$입니다. 이 정규분포의 밀도를 $x=0$에서 직접 계산합니다.
$$\frac{1}{\sqrt{2\pi\times0.25}}\exp\!\left(-\frac{(0-(-0.5))^2}{2\times0.25}\right) = \frac{1}{\sqrt{0.5\pi}}\exp(-0.5) \approx 0.797885\times0.606531 \approx 0.483941$$
두 계산이 소수점 여섯 자리까지 정확히 일치합니다. 아래 증명은 이 일치가 이 특정 아핀변환뿐 아니라 가역이고 미분 가능한 임의의 $f$에서 항상 성립함을 보입니다.
