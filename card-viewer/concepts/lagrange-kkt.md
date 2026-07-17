---
slug: lagrange-kkt
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 제약 최적화
title: 라그랑주 승수법과 KKT 조건
related: 
---

## 도입
조건을 지키면서 가장 작은 값을 찾는 문제가 있어요. 이런 부등식 제약이 있는 최적화에서 최적해가 반드시 만족해야 하는 조건을 정리한 것이 KKT 조건이에요. SVM의 쌍대문제도 PPO와 TRPO의 제약 최적화도 모두 이 조건 위에 서 있어요.

## 명제
제약이 지나치게 특이하지 않다는 조건(constraint qualification)이 성립할 때 $\min f(x)\ \text{s.t.}\ g(x)\le0$ 의 최적해 $x^*$에서는 어떤 $\mu^*\ge0$이 존재해 $\nabla f(x^*)+\mu^*\nabla g(x^*)=0$과 $\mu^*g(x^*)=0$이 성립한다.

## 그림
<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">
<circle cx="120" cy="150" r="130" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="120" cy="150" r="95" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="6,3"/>
<circle cx="120" cy="150" r="60" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="120" cy="150" r="25" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="6,3"/>
<circle cx="120" cy="150" r="2.5" class="dg-accent"/>
<text x="60" y="35" font-size="12">목적함수 f의 등고선</text>
<path d="M250,40 Q210,150 250,260" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="255" y="270" font-size="12">제약: g(x)=0</text>
<circle cx="250" cy="150" r="4" class="dg-accent"/>
<text x="255" y="145" font-size="11" class="dg-dim">최적해 x*</text>
<line x1="250" y1="145" x2="188" y2="145" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="188,145 200,140 200,150" class="dg-stroke-accent"/>
<text x="192" y="133" font-size="12">∇f</text>
<line x1="250" y1="165" x2="188" y2="165" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="4,3"/>
<polygon points="188,165 200,160 200,170" class="dg-stroke-ink"/>
<text x="192" y="183" font-size="12">∇g</text>
<text x="55" y="290" class="dg-dim" font-size="12">접점에서 ∇f = -μ∇g: 두 그래디언트가 평행</text>
</svg>

_목적함수 등고선과 제약 곡선이 만나는 접점에서 두 그래디언트가 평행하다._

## 문제
이제 최적해 $x^*$에서 무슨 일이 일어나는지 봅니다. 최적해에서는 $x$를 아주 조금 움직여도 목적함수가 더 줄어들지 않아야 합니다. 미분 가능한 함수에서는 이 성질이 기울기가 0이라는 조건으로 나타납니다. 여기서는 $f$ 대신 라그랑지안 $\mathcal{L}$을 최적화하고 있으니 $x$에 대한 기울기도 0이어야 합니다. 다만 이 조건이 성립하려면 제약이 지나치게 특이하지 않아야 합니다. 이걸 constraint qualification이라 부르고 여기서는 이 조건이 성립한다고 가정합니다. 정리하면 $\nabla_x\mathcal{L}(x^*,\mu^*) = $==빈칸== 입니다.

## 해설
함수가 극값을 가지는 지점에서는 기울기가 0이 됩니다. 경사하강법에서 쓰던 조건과 같은 논리입니다. 여기서는 그 대상이 $f$가 아니라 라그랑지안 $\mathcal{L}$일 뿐입니다.

**정답: $0$**

## 예시
증명에 들어가기 전에 아주 단순한 제약 최적화 문제 하나를 직접 풀어보면 KKT 조건이 뭘 말하는지 바로 보입니다. 제약이 실제로 최적해를 붙드는 경우와 그렇지 않은 경우를 나란히 놓고 비교합니다.

**제약이 활성인 경우.** $f(x)=(x-3)^2$을 $g(x)=x-1\le0$이라는 제약 아래 최소화합니다. 제약이 없다면 최적해는 $x=3$이지만 이는 $g(3)=2>0$이라 허용되지 않습니다. 그러니 최적해는 경계 $x^*=1$에 걸립니다.

이 지점에서 $\nabla f(x^*)=2(1-3)=-4$이고 $\nabla g(x^*)=1$입니다. $\nabla f(x^*)+\mu^*\nabla g(x^*)=0$을 풀면 $\mu^*=4$이고, 이는 $\mu^*\ge0$을 만족합니다. 상보슬랙성도 $\mu^*g(x^*)=4\times0=0$으로 성립합니다.

**제약이 느슨한 경우.** 같은 $f$를 $g(x)=x-5\le0$ 아래 최소화하면 무제약 최적해 $x=3$이 이미 $g(3)=-2<0$으로 여유 있게 허용됩니다. 이때는 $\nabla f(3)=0$이므로 $\mu^*=0$일 수밖에 없고, 상보슬랙성도 자연스럽게 $0\times(-2)=0$으로 맞아떨어집니다.

아래 증명은 이 두 경우, 즉 제약이 경계에서 붙드는 경우와 느슨한 경우가 KKT 조건 안에 항상 정확히 이렇게 나뉘어 담긴다는 사실을 보입니다.
