---
slug: vc-dimension-linear-classifier
theme: PROB
domainLabel: 확률 · 통계
subLabel: 계산학습이론
title: VC 차원: 2차원 선형분류기는 왜 3인가
related: 유한 가설공간의 PAC 학습가능성 · Sauer's Lemma와 증가함수 · VC 차원 기반 일반화 바운드
---

## 도입
선형분류기가 표현할 수 있는 패턴의 다양성을 한 숫자로 요약한 것이 VC 차원입니다. 2차원 평면에서 직선 하나로 나눌 수 있는 점의 배치가 무한히 많아 보이지만, 이 표현력에는 사실 명확한 한계가 있습니다. 점이 몇 개까지는 어떤 라벨링이든 직선 하나로 실현할 수 있지만, 그 수를 하나만 넘겨도 실현 불가능한 라벨링이 반드시 나타납니다. 그 한계가 정확히 어디인지를 직접 확인해 봅니다.

## 명제
2차원 평면 위의 선형분류기(직선)로 이루어진 가설공간의 VC 차원은 정확히 3이다. 즉 일직선 위에 있지 않은 점 3개는 항상 shatter되지만, 어떤 배치의 점 4개도 shatter되지 않는다.

## 그림
<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
  <line x1="345" y1="15" x2="345" y2="225" class="dg-line" stroke-width="1" stroke-dasharray="3,4"/>
  <text x="60" y="24" font-size="13" font-weight="700">점 3개: 어떤 라벨링도 직선으로 분리</text>
  <text x="420" y="24" font-size="13" font-weight="700">점 4개(XOR 배치): 분리 불가능</text>
  <line x1="45" y1="195" x2="290" y2="55" class="dg-stroke-accent" stroke-width="2.4"/>
  <circle cx="90" cy="150" r="9" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
  <circle cx="170" cy="90" r="9" class="dg-dim"/>
  <circle cx="240" cy="160" r="9" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
  <text x="78" y="175" font-size="10">−</text>
  <text x="163" y="70" font-size="10" font-weight="700">+</text>
  <text x="228" y="185" font-size="10">−</text>
  <line x1="450" y1="70" x2="600" y2="190" class="dg-line" stroke-width="1.3" stroke-dasharray="4,3"/>
  <line x1="600" y1="70" x2="450" y2="190" class="dg-line" stroke-width="1.3" stroke-dasharray="4,3"/>
  <circle cx="450" cy="70" r="9" class="dg-dim"/>
  <circle cx="600" cy="70" r="9" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
  <circle cx="600" cy="190" r="9" class="dg-dim"/>
  <circle cx="450" cy="190" r="9" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
  <text x="440" y="55" font-size="10" font-weight="700">A +</text>
  <text x="605" y="55" font-size="10">B −</text>
  <text x="605" y="210" font-size="10" font-weight="700">C +</text>
  <text x="425" y="210" font-size="10">D −</text>
  <text x="512" y="135" font-size="16" font-weight="700">✕</text>
  <text x="470" y="228" font-size="10" class="dg-dim">대각선이 이미 교차 → 분리선 없음</text>
</svg>

_왼쪽은 일직선 위에 있지 않은 점 3개의 임의 라벨링을 직선(굵은 실선)으로 분리한 예. 오른쪽은 대각으로 교차하는 라벨링(A,C=+ / B,D=−)의 점 4개가 어떤 직선으로도 분리되지 않음(✕)을 보여준다._

## 문제
먼저 3개 점을 shatter할 수 있는지 본다. 일직선 위에 있지 않은 점 세 개, 즉 삼각형을 이루는 점 $P_1,P_2,P_3$를 고른다. 이 세 점에 대해 가능한 라벨링의 개수부터 세어본다. 각 점이 $+1$ 또는 $-1$ 두 가지 값을 가질 수 있으므로 전체 라벨링의 개수는 $2^3=$==빈칸== 가지다.

## 해설
라벨링은 세 점 각각에 독립적으로 $+1$ 또는 $-1$을 배정하는 것이므로 경우의 수는 $2\times2\times2=2^3$이다. 이를 계산하면 $8$가지다.

**정답: $8$**

## 예시
추상적인 논증에 들어가기 전에 실제 좌표를 놓고 몇 가지 라벨링이 어떻게 분리되는지 확인해봅니다.

점 $P_1=(0,0)$, $P_2=(2,0)$, $P_3=(1,2)$를 놓습니다. 세 점 모두 $+1$인 라벨링은 세 점보다 훨씬 아래를 지나는 직선, 예를 들어 $y=-1$의 위쪽 반평면 전체를 $+1$로 두면 그대로 실현됩니다. $P_1$ 하나만 $-1$이고 $P_2,P_3$가 $+1$인 라벨링은 직선 $x+y=0.5$로 실현됩니다. $P_1$에서는 $x+y=0$으로 $0.5$보다 작고, $P_2$에서는 $x+y=2$, $P_3$에서는 $x+y=3$으로 둘 다 $0.5$보다 큽니다. $x+y<0.5$인 쪽을 $-1$, $x+y>0.5$인 쪽을 $+1$로 두면 정확히 원하는 라벨링이 나옵니다.

이번엔 4개 점으로는 실현되지 않는 라벨링을 확인합니다. 단위정사각형의 네 꼭짓점 $A=(0,0)$, $B=(1,0)$, $C=(1,1)$, $D=(0,1)$을 놓습니다. 대각선으로 마주보는 $A,C$에는 $+1$을, $B,D$에는 $-1$을 주는 라벨링을 시도해봅니다. $A,C$를 한쪽에 두고 $B,D$를 반대쪽에 두는 직선은 아무리 찾아도 나오지 않습니다. 대각선 $AC$와 $BD$가 정사각형 한가운데서 서로 교차하고 있어서, 어떤 직선을 그어도 그 직선의 한쪽에는 $A,C$ 중 하나와 $B,D$ 중 하나가 항상 함께 남기 때문입니다.

점 3개에서는 어떤 라벨링이든 실현되지만 점 4개에서는 실현되지 않는 라벨링이 곧바로 나타납니다. 아래 증명은 이 경계가 이 특정 좌표뿐 아니라 임의의 점 배치에서 항상 3에서 그어짐을 보입니다.
