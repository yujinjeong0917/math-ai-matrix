---
slug: clairaut-schwarz-symmetry
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 혼합편미분의 대칭성: Clairaut-Schwarz 정리
related: 헤시안과 2차 최적성 조건
---

## 도입
$x$로 먼저 미분하고 $y$로 미분하는 것과, $y$로 먼저 미분하고 $x$로 미분하는 것, 순서를 바꿔도 결과가 같을까요? 놀랍게도 (연속성이라는 온화한 가정 아래) 답은 "그렇다"이고, 이 사실이 바로 헤시안 행렬이 항상 대칭행렬인 이유예요.

## 명제
$f:\mathbb{R}^2\to\mathbb{R}$가 점 $(a,b)$ 근방에서 혼합편미분 $f_{xy}$와 $f_{yx}$를 가지고 이 둘이 $(a,b)$에서 연속이면 $f_{xy}(a,b)=f_{yx}(a,b)$ 이다.


## 문제
$g(x)=f(x,b+k)-f(x,b)$ 라 두면 $\Delta(h,k)=g(a+h)-g(a)$ 이다. 평균값정리(MVT)에 의해 어떤 $\theta\in(0,1)$가 있어 $\Delta(h,k)=h\,g'(a+\theta h)=h\big[$==빈칸==$\big]$ 이다.

## 해설
$g'(x)=f_x(x,b+k)-f_x(x,b)$이므로 $x=a+\theta h$를 대입하면 이 식이 나와요.

**정답: $f_x(a+\theta h,b+k)-f_x(a+\theta h,b)$**

## 예시
$f(x,y)=x^2y^3$ 으로 직접 두 방향의 혼합편미분을 계산해 비교해봅시다.

먼저 $x$로 미분한 뒤 $y$로 미분: $f_x=2xy^3$, $f_{xy}=\partial_y(2xy^3)=6xy^2$.

먼저 $y$로 미분한 뒤 $x$로 미분: $f_y=3x^2y^2$, $f_{yx}=\partial_x(3x^2y^2)=6xy^2$.

점 $(x,y)=(2,1)$에서 두 값 모두 $f_{xy}(2,1)=f_{yx}(2,1)=6\cdot2\cdot1^2=12$ 로 정확히 일치합니다.
