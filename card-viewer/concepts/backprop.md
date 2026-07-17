---
slug: backprop
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 역전파(체인룰)의 정확성
related: 
---

## 도입
신경망은 여러 층을 겹겹이 쌓은 합성함수예요. 이런 합성함수를 미분할 때 쓰는 도구가 체인룰이에요. 이걸 출력층에서부터 거꾸로 층마다 적용해 나가는 알고리즘이 바로 역전파예요. 거꾸로 곱해가며 전파한다는 이름 그대로예요. 실제로 뭘 곱하는지 하나씩 따라가 봅니다.

## 명제
$h=Wx$, $z=g(h)$, $L=f(z)$일 때 $\frac{\partial L}{\partial W}$는 체인룰로 세 항의 곱으로 분해된다.

## 그림
<svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="70" width="60" height="40" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="45" y="95" font-size="13">x</text>
<rect x="190" y="70" width="60" height="40" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="197" y="95" font-size="12">h=Wx</text>
<rect x="350" y="70" width="60" height="40" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="357" y="95" font-size="12">z=g(h)</text>
<rect x="510" y="70" width="60" height="40" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="517" y="95" font-size="12">L=f(z)</text>
<line x1="90" y1="80" x2="185" y2="80" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="185,80 173,75 173,85" class="dg-stroke-ink"/>
<line x1="250" y1="80" x2="345" y2="80" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="345,80 333,75 333,85" class="dg-stroke-ink"/>
<line x1="410" y1="80" x2="505" y2="80" class="dg-stroke-ink" stroke-width="2"/>
<polygon points="505,80 493,75 493,85" class="dg-stroke-ink"/>
<text x="110" y="65" font-size="11" class="dg-dim">순전파 (값 전달)</text>
<line x1="505" y1="130" x2="410" y2="130" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<polygon points="410,130 422,125 422,135" class="dg-stroke-accent"/>
<line x1="345" y1="130" x2="250" y2="130" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<polygon points="250,130 262,125 262,135" class="dg-stroke-accent"/>
<line x1="185" y1="130" x2="90" y2="130" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<polygon points="90,130 102,125 102,135" class="dg-stroke-accent"/>
<text x="415" y="150" font-size="11">∂L/∂z</text>
<text x="258" y="150" font-size="11">∂z/∂h</text>
<text x="95" y="150" font-size="11">∂h/∂W=x</text>
<text x="150" y="185" class="dg-dim" font-size="12">역전파: 체인룰로 그래디언트를 거꾸로 곱해 전달</text>
</svg>

_순전파의 값 전달(위) 방향과 역전파의 그래디언트 전달(아래) 방향을 함께 보인다._

## 문제
합성함수를 미분할 땐 체인룰을 쓴다. 바깥 함수를 먼저 미분하고 안쪽 함수의 미분을 곱해나가는 규칙이다. $L$은 $z$를 통해서만 $W$에 의존한다. 그러니 가장 바깥쪽부터 한 겹을 벗겨내면 $\frac{\partial L}{\partial W} = \frac{\partial L}{\partial z}\cdot$==빈칸== 이다.

## 해설
$L=f(z)$이고 $z$가 $W$에 의존한다. 체인룰의 첫 단계는 $L$이 $z$에 대해 변하는 정도와 $z$가 $W$에 대해 변하는 정도를 곱하는 것이다. 즉 $\frac{\partial L}{\partial z}\cdot\frac{\partial z}{\partial W}$예요.

**정답: $\frac{\partial z}{\partial W}$**

## 예시
세 겹으로 합성된 함수를 직접 숫자로 미분해보면 체인룰이 정말로 세 조각의 곱으로 딱 떨어지는지 눈으로 확인할 수 있습니다.

$W=2$, $x=3$으로 두면 $h=Wx=6$입니다. $z=g(h)=h^2$로 두면 $z=36$이고, $L=f(z)=5z$로 두면 $L=180$입니다.

세 조각을 각각 미분합니다. $\frac{\partial L}{\partial z}=5$이고 $\frac{\partial z}{\partial h}=2h=12$이고 $\frac{\partial h}{\partial W}=x=3$입니다.

체인룰대로 세 조각을 곱하면 다음과 같습니다.
$$\frac{\partial L}{\partial W}=5\times12\times3=180$$
이 값이 맞는지는 $L$을 $W$만의 식으로 직접 풀어서도 확인할 수 있습니다. $L=5(Wx)^2=5W^2x^2$이므로 $\frac{\partial L}{\partial W}=10Wx^2=10\times2\times9=180$입니다. 세 조각을 따로 곱한 값과 정확히 같습니다.

아래 증명은 이렇게 세 조각으로 쪼개는 방식이 특정 함수에서만 통하는 게 아니라 합성함수라면 항상 성립하는 체인룰의 일반적인 결과임을 보입니다.
