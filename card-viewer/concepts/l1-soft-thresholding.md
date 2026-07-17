---
slug: l1-soft-thresholding
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 제약 최적화
title: L1 정칙화의 근접연산자: 연화임계값(Soft-Thresholding)
related: 강볼록성과 유일 최소값
---

## 도입
L2 정칙화(릿지)는 계수를 작게 줄이기만 할 뿐 정확히 0으로 만들지는 못해요. 그런데 L1 정칙화(라쏘)는 계수를 정확히 0으로 만들어서 변수선택 효과를 냅니다. 왜 절댓값 하나 바꿨을 뿐인데 이런 질적 차이가 생길까요. 그 답은 $|x|$가 $x=0$에서 미분가능하지 않다는 사실, 정확히는 $x=0$에서의 부분미분(subdifferential)이 구간 전체 $[-1,1]$이라는 사실에 있어요.

## 명제
$\lambda>0$, $v\in\mathbb{R}$에 대해 $$x^*=\operatorname*{argmin}_{x\in\mathbb{R}}\ \Big\{\tfrac12(x-v)^2+\lambda|x|\Big\}$$ 는 연화임계값 함수 $x^*=S_\lambda(v)=\operatorname{sign}(v)\max(|v|-\lambda,0)$ 로 주어진다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="110" x2="320" y2="110" class="dg-line" stroke-width="1"/>
<line x1="180" y1="20" x2="180" y2="200" class="dg-line" stroke-width="1"/>
<path d="M50,180 L150,110 L210,110 L310,40" fill="none" class="dg-stroke-accent" stroke-width="3"/>
<line x1="150" y1="30" x2="150" y2="190" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<line x1="210" y1="30" x2="210" y2="190" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<line x1="50" y1="180" x2="310" y2="40" class="dg-dim" stroke-width="1" stroke-dasharray="1,3"/>
<text x="45" y="18" font-size="12">L1 연화임계값 $S_\lambda(v)$</text>
<text x="145" y="205" font-size="11" text-anchor="middle" class="dg-dim">-λ</text>
<text x="215" y="205" font-size="11" text-anchor="middle" class="dg-dim">λ</text>
<text x="150" y="105" font-size="11" text-anchor="middle" class="dg-dim">0 근처 평평</text>
<line x1="420" y1="110" x2="660" y2="110" class="dg-line" stroke-width="1"/>
<line x1="540" y1="20" x2="540" y2="200" class="dg-line" stroke-width="1"/>
<path d="M430,170 L650,50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="430" y1="170" x2="650" y2="50" class="dg-dim" stroke-width="1" stroke-dasharray="1,3"/>
<circle cx="540" cy="110" r="3" class="dg-accent"/>
<text x="425" y="18" font-size="12">L2 선형 수축</text>
<text x="540" y="125" font-size="11" text-anchor="middle" class="dg-dim">v=0에서만 정확히 0</text>
</svg>

_L1 근접연산자는 |v|≤λ 구간 전체를 0으로 보내지만(왼쪽), L2는 원점 하나만 0이 된다(오른쪽)._

## 문제
$x>0$인 구간에서는 $g'(x)=(x-v)+\lambda$ 이고 이를 $0$으로 놓으면 $x=$==빈칸== 를 얻는다. 이 해가 실제로 $x>0$ 가정과 모순되지 않으려면 $v>\lambda$ 이어야 한다.

## 해설
$(x-v)+\lambda=0$을 $x$에 대해 풀면 $x=v-\lambda$가 돼요. 이 값이 실제로 양수이려면 $v>\lambda$가 필요해요.

**정답: $v-\lambda$**

## 예시
세 가지 구체적인 숫자로 공식을 먼저 확인해봅시다.

$v=3,\ \lambda=2$: $|v|=3>\lambda$이므로 $x^*=3-2=1$. 정류점 조건 $(x-v)+\lambda\,\mathrm{sign}(x)=0$에 $x=1$을 넣으면 $(1-3)+2(1)=0$으로 확인됩니다.

$v=1,\ \lambda=2$: $|v|=1\le\lambda$이므로 $x^*=0$. $x=0$에서 부분미분 조건 $0\in(0-v)+\lambda[-1,1]=[-1-2,-1+2]=[-3,1]$을 확인하면 $0$이 이 구간 안에 있으므로 최적성이 성립합니다.

$v=-4,\ \lambda=1$: $|v|=4>\lambda$이므로 $x^*=\mathrm{sign}(-4)\cdot(4-1)=-3$. 확인: $(-3-(-4))+1\cdot(-1)=1-1=0$.
