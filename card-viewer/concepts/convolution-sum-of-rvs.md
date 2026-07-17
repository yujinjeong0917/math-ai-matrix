---
slug: convolution-sum-of-rvs
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 근사 · 적분
title: 독립 확률변수 합의 밀도: 콘볼루션 정리
related: Log-Sum-Exp 트릭과 수치안정 소프트맥스
---

## 도입
두 개의 독립적인 확률변수를 더하면 그 합의 분포는 어떻게 될까요? 각 변수의 확률밀도함수를 알고 있다면, 합의 밀도함수는 두 밀도함수의 "콘볼루션(합성곱)"으로 정확히 표현됩니다. 이는 신호처리에서 말하는 합성곱과 정확히 같은 연산이며, 신경망의 합성곱 연산과 확률변수의 합이 같은 수학적 뿌리를 공유하는 이유이기도 합니다.

## 명제
$X,Y$가 독립이고 각각 확률밀도함수 $f_X,f_Y$를 가지는 연속 확률변수라 하자. $Z=X+Y$의 확률밀도함수는 $$f_Z(z)=\int_{-\infty}^{\infty} f_X(x)\,f_Y(z-x)\,dx = (f_X*f_Y)(z)$$ 로 주어진다.

## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="150" x2="600" y2="150" class="dg-line" stroke-width="1"/>
<path d="M60,150 Q150,60 240,150" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="90" y="45" font-size="12">f_X(x)</text>
<path d="M120,150 Q210,90 300,150" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="5,3"/>
<text x="260" y="80" font-size="12" class="dg-dim">f_Y(z-x) (슬라이딩)</text>
<path d="M300,40 L340,40" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="340,40 328,35 328,45" class="dg-stroke-accent"/>
<line x1="40" y1="210" x2="600" y2="210" class="dg-line" stroke-width="1"/>
<path d="M50,205 Q270,110 500,205" fill="none" class="dg-stroke-accent" stroke-width="3"/>
<text x="380" y="120" font-size="12">f_Z(z) = (f_X * f_Y)(z)</text>
<line x1="180" y1="150" x2="270" y2="150" class="dg-line" stroke-width="1" stroke-dasharray="1,3"/>
</svg>

_두 밀도함수가 슬라이딩하며 곱해져 적분되면 합의 밀도(합성곱)가 만들어진다._

## 문제
안쪽 적분 $\int_{-\infty}^{z-x} f_Y(y)\,dy$ 는 정의상 $Y$의 누적분포함수를 $z-x$에서 평가한 값, 즉 $F_Y(z-x)$ 이다. 따라서 $F_Z(z)=\int_{-\infty}^{\infty} f_X(x)\,$==빈칸==$\,dx$

## 해설
안쪽 적분 $\int_{-\infty}^{z-x}f_Y(y)\,dy$는 $Y$의 CDF를 $z-x$에서 평가한 값의 정의 그 자체이기 때문입니다.

**정답: $F_Y(z-x)$**

## 예시
두 균등분포의 합이 삼각분포가 된다는 잘 알려진 사실을 콘볼루션 공식으로 직접 확인해봅니다.

$X,Y\sim\mathrm{Uniform}(0,1)$ 이 서로 독립이라 하고 $Z=X+Y$ 라 하자. 공식에 대입하면 $f_Z(z)=\int_0^1 f_Y(z-x)\,dx$ 인데, $f_Y(z-x)=1$이 되려면 $0\le z-x\le1$, 즉 $z-1\le x\le z$ 이어야 한다.

$0\le z\le 1$ 일 때 적분 구간은 $x\in[0,z]$ 로 겹치므로 $f_Z(z)=z$. $1\le z\le2$ 일 때는 $x\in[z-1,1]$ 로 겹치므로 $f_Z(z)=1-(z-1)=2-z$. 이는 정확히 삼각분포의 밀도함수이며, 실제로 수치적분으로 $z=0.3,1.0,1.5$에서 각각 $0.3,\,1.0,\,0.5$가 나와 공식과 정확히 일치함을 확인했습니다.
