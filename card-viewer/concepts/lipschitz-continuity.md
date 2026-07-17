---
slug: lipschitz-continuity
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 함수의 성질
title: 립시츠 연속성과 그래디언트의 상한
related: 
---

## 도입
함수가 $K$-립시츠 연속이라는 것은 입력을 조금 움직였을 때 출력이 $K$배보다 더 빠르게 튀지 않는다는 뜻입니다. 이 성질은 정성적인 안정성 얘기에 그치지 않습니다. 미분 가능한 함수라면 그래디언트의 크기 자체를 $K$로 눌러놓는다는 정량적인 결과로 이어집니다. 왜 그런지 그리고 이것이 안전한 학습률과 어떻게 연결되는지 확인해 봅니다.

## 명제
$f:\mathbb{R}^n\to\mathbb{R}$가 $K$-립시츠 연속이고 미분 가능하면 모든 $x$에서 $\|\nabla f(x)\|\le K$이다.

## 그림
<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="190" x2="380" y2="190" class="dg-line" stroke-width="1.5"/>
<line x1="30" y1="190" x2="30" y2="20" class="dg-line" stroke-width="1.5"/>
<line x1="200" y1="120" x2="340" y2="40" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="200" y1="120" x2="340" y2="200" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="200" y1="120" x2="60" y2="40" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<line x1="200" y1="120" x2="60" y2="200" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<path d="M60,150 Q130,90 200,120 Q270,150 340,80" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="200" cy="120" r="4" class="dg-accent"/>
<text x="205" y="110" font-size="12">x</text>
<text x="315" y="35" font-size="11" class="dg-dim">기울기 +K</text>
<text x="315" y="215" font-size="11" class="dg-dim">기울기 -K</text>
<text x="40" y="210" class="dg-dim" font-size="12">함수 그래프는 이 콘(기울기 ±K) 밖으로 나갈 수 없다</text>
</svg>

_K-립시츠 함수의 그래프는 어느 점에서든 기울기 ±K인 콘 안에서만 움직인다._

## 문제
이 부등식은 임의의 두 점에 대한 것이라 아직 그래디언트와 바로 연결되지 않는다. 그래디언트는 한 점 근처의 국소적인 변화율이다. $y$를 $x$에서 단위벡터 $u$ 방향으로 살짝 옮긴 점 $x+tu$로 좁혀서 본다. 정의의 $y$ 자리에 $x+tu$를 넣으면 $|f(x+tu)-f(x)| \le K\|tu\| = $==빈칸== 이다.

## 해설
$\|tu\|=|t|\|u\|$이고 $u$가 단위벡터라 $\|u\|=1$이다. 그러니 $K\|tu\|=K|t|$가 된다.

**정답: $K|t|$**

## 예시
부등식을 추상적으로 보기 전에 립시츠 상수가 알려진 함수 하나로 그래디언트가 정말 그 상수를 못 넘는지 확인해봅니다. $f(x)=2\sin x$는 $f'(x)=2\cos x$이므로 $K=2$가 자연스러운 후보입니다.

실제로 두 점 $x=0$, $y=\pi/2$에서 정의를 확인합니다.
$$|f(0)-f(\pi/2)|=|0-2|=2,\qquad K|0-\pi/2|=2\times1.571\approx3.14$$
$2\le3.14$이므로 립시츠 조건을 만족합니다. 이제 그래디언트를 직접 봅니다. $x=0$에서 $f'(0)=2\cos0=2$로 상한 $K=2$에 정확히 닿고 $x=\pi/3$에서는 $f'(\pi/3)=2\cos(\pi/3)=1$로 상한보다 작습니다.

어느 점에서도 $|f'(x)|=2|\cos x|\le2=K$를 벗어나지 않습니다. 아래 증명은 이 상한이 이 특정 함수만의 성질이 아니라 립시츠 연속이기만 하면 미분 가능한 모든 함수에서 항상 성립함을 보입니다.
