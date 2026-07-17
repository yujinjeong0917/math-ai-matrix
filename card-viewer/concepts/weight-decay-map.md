---
slug: weight-decay-map
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 제약 최적화
title: 가중치 감쇠와 릿지회귀의 닫힌형 해 (MAP 관점)
related: 
---

## 도입
가중치 감쇠는 학습 중 손실에 $\lambda\|\beta\|^2$ 항을 더해서 가중치가 너무 커지지 않게 누르는 기법입니다. 그런데 왜 하필 이 벌점이어야 할까요. 한 가지 정확한 답이 있습니다. 가중치가 0 근처에 있을 거라는 가우시안 사전믿음 아래에서 사후확률을 최대화하는 MAP 추정이 정확히 이 벌점으로 이어집니다. 그리고 그 최적해는 닫힌 형태로 정확히 풀립니다.

## 명제
$y|X,\beta\sim N(X\beta,\sigma^2I)$, $\beta\sim N(0,\tau^2I)$ 일 때 MAP 추정량은 $\hat\beta=(X^TX+\lambda I)^{-1}X^Ty$ ($\lambda=\sigma^2/\tau^2$) 이다.

## 그림
<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg">
<circle cx="70" cy="290" r="130" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="70" cy="290" r="90" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="70" cy="290" r="50" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<circle cx="70" cy="290" r="3" class="dg-accent"/>
<ellipse cx="330" cy="110" rx="130" ry="80" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<ellipse cx="330" cy="110" rx="90" ry="55" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<ellipse cx="330" cy="110" rx="50" ry="30" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="330" cy="110" r="3" class="dg-accent"/>
<line x1="70" y1="290" x2="330" y2="110" class="dg-line" stroke-width="1" stroke-dasharray="2,3"/>
<circle cx="205" cy="197" r="5" class="dg-accent"/>
<text x="205" y="185" font-size="12" text-anchor="middle">MAP 해 (축소됨)</text>
<text x="330" y="95" font-size="12" text-anchor="middle">OLS 해</text>
<text x="70" y="315" font-size="12" text-anchor="middle">원점 (사전믿음 중심)</text>
</svg>

_가우시안 사전(원점 중심 원)이 손실 등고선과 결합해 MAP 추정치를 원점 쪽으로 당긴다._

## 문제
사후분포를 최대화하는 것은 mle 항목에서 확인한 것과 같은 이유로 사후분포의 로그를 최대화하는 것과 같다. 로그는 강한 증가함수라 최댓값의 위치를 바꾸지 않는다. 가우시안 밀도의 로그는 지수 안의 이차식만 남고 나머지는 $\beta$와 무관한 상수다. 그러니 로그사후분포에서 $\beta$에 의존하는 항만 남기면 $\log p(\beta|X,y) \propto -\dfrac{1}{2\sigma^2}\|y-X\beta\|^2 - $==빈칸== 이다.

## 해설
가우시안 사전 $N(0,\tau^2I)$의 로그밀도는 $-\|\beta\|^2/(2\tau^2)$에 $\beta$와 무관한 상수를 더한 것이다. 이 이차항이 바로 가중치 감쇠 벌점의 정체다.

**정답: $\dfrac{1}{2\tau^2}\|\beta\|^2$**

## 예시
증명에 들어가기 전에 사전믿음이 없을 때와 있을 때의 추정값을 나란히 계산해서 가중치 감쇠가 실제로 무슨 일을 하는지 봅니다.

특징이 하나뿐인 데이터 $X=(1,2)^T$, $y=(2,5)^T$를 씁니다. $X^TX=1^2+2^2=5$이고 $X^Ty=1\times2+2\times5=12$입니다.

**사전믿음이 없는 경우.** 보통의 최소제곱 추정값은 다음과 같습니다.
$$\hat\beta_{ols}=\frac{X^Ty}{X^TX}=\frac{12}{5}=2.4$$
**가우시안 사전믿음이 있는 경우.** $\sigma^2=\tau^2=1$이라 $\lambda=\sigma^2/\tau^2=1$입니다. MAP 추정값은 다음과 같습니다.
$$\hat\beta_{map}=\frac{X^Ty}{X^TX+\lambda}=\frac{12}{6}=2$$
가중치가 $0$ 근처에 있을 거라는 사전믿음이 추정값을 $2.4$에서 $2$로 정확히 $0$ 쪽으로 눌렀습니다.

아래 증명은 이 눌림이 이 숫자 하나만의 우연이 아니라 가우시안 사전믿음 아래 MAP 추정이 항상 이런 닫힌 형태의 축소로 이어진다는 사실을 보입니다.
