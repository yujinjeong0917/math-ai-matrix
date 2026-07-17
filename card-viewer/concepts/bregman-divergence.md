---
slug: bregman-divergence
theme: INFO
domainLabel: 정보이론
subLabel: 발산 · 상호정보
title: Bregman 발산: 볼록함수가 만드는 일반화된 거리
related: 
---

## 도입
유클리드 제곱거리와 KL발산은 서로 완전히 다른 곳에서 온 개념처럼 보이지만, 사실 둘 다 "어떤 볼록함수가 자신의 접선(1차 근사)에서 얼마나 벗어나는가"를 재는 같은 틀에서 나옵니다. 이 틀이 Bregman 발산입니다.

## 명제
$\varphi:\mathbb R^d\to\mathbb R$가 미분가능한 강볼록함수일 때 $$D_\varphi(x,y):=\varphi(x)-\varphi(y)-\nabla\varphi(y)^\top(x-y)$$ 로 정의하면 $D_\varphi(x,y)\ge0$이고 등호는 $x=y$일 때만 성립한다. 나아가 $\varphi(x)=\|x\|^2$이면 $D_\varphi(x,y)=\|x-y\|^2$(유클리드 제곱거리)이고, 확률벡터에서 $\varphi(p)=\sum_i p_i\log p_i$(음의 엔트로피)이면 $D_\varphi(p,q)=\sum_i p_i\log(p_i/q_i)$(KL발산)이다.

## 그림
<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="190" x2="400" y2="190" class="dg-line" stroke-width="1"/>
<path d="M50,180 Q220,10 380,140" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="230" cy="70" r="4" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<text x="238" y="60" font-size="11">y, φ(y)</text>
<line x1="130" y1="140" x2="330" y2="20" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<text x="290" y="15" font-size="10" class="dg-dim">접선(1차근사)</text>
<circle cx="330" cy="105" r="4" class="dg-accent"/>
<text x="336" y="100" font-size="11">x, φ(x)</text>
<line x1="330" y1="55" x2="330" y2="105" class="dg-stroke-accent" stroke-width="2"/>
<text x="342" y="85" font-size="11">D_φ(x,y)</text>
<circle cx="330" cy="55" r="3" class="dg-stroke-accent" fill="none" stroke-width="1.5"/>
<text x="60" y="30" font-size="11" class="dg-dim">φ: 볼록함수</text>
</svg>

_곡선과 y에서 그은 접선 사이의 수직 간격이 Bregman 발산이며, 유클리드거리와 KL발산은 이 틀의 특수한 경우다._

## 문제
위 접선 부등식을 그대로 옮기면 $D_\varphi(x,y)=\varphi(x)-\varphi(y)-\nabla\varphi(y)^\top(x-y)\ge$==빈칸== 이고, 강볼록성에 의해 등호는 $x=y$일 때만 성립한다.

## 해설
접선 부등식 $\varphi(x)\ge\varphi(y)+\nabla\varphi(y)^\top(x-y)$을 그대로 옮기면 좌변에서 우변을 뺀 값(=$D_\varphi(x,y)$)이 $0$ 이상이 돼요.

**정답: $0$**

## 예시
두 특수 사례를 실제 숫자로 확인해봅니다.

**유클리드 사례.** $x=(3,1)$, $y=(1,2)$, $\varphi(v)=\|v\|^2$이면 $\nabla\varphi(y)=2y=(2,4)$이고 $$D_\varphi(x,y)=\|x\|^2-\|y\|^2-\nabla\varphi(y)^\top(x-y)=10-5-(2\times2+4\times(-1))=5$$ 이고 실제로 $\|x-y\|^2=\|(2,-1)\|^2=4+1=5$로 정확히 일치한다.

**KL 사례.** $p=(0.5,0.3,0.2)$, $q=(0.2,0.5,0.3)$, $\varphi(v)=\sum v_i\log v_i$이면 직접 계산했을 때 $D_\varphi(p,q)\approx0.2238$이고, $\mathrm{KL}(p\|q)=\sum p_i\log(p_i/q_i)\approx0.2238$로 소수점 자리까지 일치한다.
