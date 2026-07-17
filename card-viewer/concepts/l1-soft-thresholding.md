---
slug: l1-soft-thresholding
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 제약 최적화
title: L1 정칙화의 근접연산자: 연화임계값(Soft-Thresholding)
hook: L2 정칙화(릿지)는 계수를 작게 줄이기만 할 뿐 정확히 0으로 만들지는 못해요.
related: 강볼록성과 유일 최소값
---

## 기본설명
$\lambda>0$, $v\in\mathbb{R}$에 대해 $$x^*=\operatorname*{argmin}_{x\in\mathbb{R}}\ \Big\{\tfrac12(x-v)^2+\lambda|x|\Big\}$$ 는 연화임계값 함수 $x^*=S_\lambda(v)=\operatorname{sign}(v)\max(|v|-\lambda,0)$ 로 주어진다.

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
