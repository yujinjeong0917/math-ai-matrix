---
slug: hessian-second-order-optimality
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 함수의 성질
title: 헤시안과 2차 최적성 조건: 극소·극대·안장점의 판정
related: 강볼록성과 유일 최소값 · 혼합편미분의 대칭성
---

## 도입
1차 조건 $\nabla f(x^*)=0$만으로는 그 점이 극소인지, 극대인지, 아니면 어느 쪽도 아닌 안장점인지 구분할 수 없어요. 등고선이 완전히 평평해 보이는 임계점 근처에서 실제로 함수가 어떻게 휘는지를 알려주는 것이 바로 헤시안(2차 미분행렬)의 고유값이에요.

## 명제
$f$가 임계점 $x^*$($\nabla f(x^*)=0$) 근방에서 두 번 연속미분가능하고 헤시안이 $H(x^*)$라 하자. (1) $H(x^*)\succ0$(모든 고유값 $>0$)이면 $x^*$는 국소최소점이다. (2) $H(x^*)\prec0$(모든 고유값 $<0$)이면 $x^*$는 국소최대점이다. (3) $H(x^*)$가 양의 고유값과 음의 고유값을 모두 가지면(부정부호, indefinite) $x^*$는 안장점이다.

## 그림
<svg viewBox="0 0 780 240" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="130" cy="120" rx="90" ry="62" fill="none" class="dg-stroke-ink" stroke-width="1.2"/>
<ellipse cx="130" cy="120" rx="63" ry="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<ellipse cx="130" cy="120" rx="38" ry="26" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="130" cy="120" r="4" class="dg-accent"/>
<text x="130" y="200" font-size="12" text-anchor="middle">양의정부호 (그릇형)</text>
<text x="130" y="216" font-size="11" text-anchor="middle" class="dg-dim">국소최소</text>
<ellipse cx="390" cy="120" rx="90" ry="62" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="5,4"/>
<ellipse cx="390" cy="120" rx="63" ry="44" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="5,4"/>
<ellipse cx="390" cy="120" rx="38" ry="26" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="5,4"/>
<rect x="386" y="116" width="8" height="8" class="dg-accent"/>
<text x="390" y="200" font-size="12" text-anchor="middle">음의정부호 (돔형)</text>
<text x="390" y="216" font-size="11" text-anchor="middle" class="dg-dim">국소최대</text>
<path d="M580,60 Q650,120 720,60" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<path d="M580,180 Q650,120 720,180" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<path d="M620,45 Q650,120 620,195" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<path d="M680,45 Q650,120 680,195" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="650" cy="120" r="4" class="dg-accent"/>
<text x="650" y="200" font-size="12" text-anchor="middle">부정부호</text>
<text x="650" y="216" font-size="11" text-anchor="middle" class="dg-dim">안장점</text>
</svg>

_헤시안 고유값의 부호 패턴이 임계점을 최소·최대·안장점으로 나눈다._

## 문제
$H=H(x^*)\succ0$이라 하자. 대칭행렬의 스펙트럼분해로 $H=Q\Lambda Q^T$($\Lambda$는 고유값 대각행렬)이고, 단위벡터 $u=h/\|h\|$에 대해 $h^THh=\|h\|^2\,u^THu\ge $==빈칸==$\ \|h\|^2$ 이 성립한다(가장 작은 고유값으로 아래에서 누른다).

## 해설
$u^THu=\sum_i\lambda_i(q_i^Tu)^2\ge\lambda_{\min}\sum_i(q_i^Tu)^2=\lambda_{\min}\|u\|^2=\lambda_{\min}$이 돼요. 모든 고유값 중 가장 작은 값 $\lambda_{\min}$으로 이차형식을 아래에서 누를 수 있어요.

**정답: $\lambda_{\min}$**

## 예시
두 개의 대조적인 2차함수로 판정 기준을 직접 확인해봅시다.

$f(x,y)=x^2+y^2$: 임계점 $(0,0)$에서 헤시안은 $H=\begin{pmatrix}2&0\\0&2\end{pmatrix}$, 고유값은 $2,2$로 모두 양수입니다. 실제로 원점 주변 어느 방향으로 움직여도 $f$가 증가하므로 국소(사실은 전역)최소점입니다.

$g(x,y)=x^2-y^2$: 임계점 $(0,0)$에서 헤시안은 $H=\begin{pmatrix}2&0\\0&-2\end{pmatrix}$, 고유값은 $2,-2$로 부호가 섞여 있습니다. 실제로 $x$축을 따라가면 $g(t,0)=t^2>0$로 증가하고, $y$축을 따라가면 $g(0,t)=-t^2<0$로 감소합니다. 같은 점 근방에서 늘기도 하고 줄기도 하니 안장점입니다.
