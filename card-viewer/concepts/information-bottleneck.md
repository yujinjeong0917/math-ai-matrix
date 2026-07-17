---
slug: information-bottleneck
theme: INFO
domainLabel: 정보이론
subLabel: 발산 · 상호정보
title: 정보병목의 라그랑지안과 압축-예측 트레이드오프
related: 
---

## 도입
정보병목 이론은 입력 $X$를 압축한 표현 $Z$가 목표 $Y$를 예측하는 데 필요한 정보만 남기도록 만들고 싶어합니다. $I(X;Z)$는 작게, $I(Z;Y)$는 크게 만드는 두 힘의 경합을 라그랑지안 하나로 표현한 것이 정보병목의 목적함수입니다. lagrange-kkt와 beta-vae에서 쓴 것과 같은 방식으로 이 목적함수를 유도하고, 뒤에 나올 data-processing-inequality를 빌려와 왜 이 경합이 $Z$가 정말 관련 있는 정보만 남기도록 강제하는지 설명합니다.

## 명제
$Y-X-Z$ 마르코프 체인에서 정보병목 문제 "$I(X;Z)$ 최소화, $I(Z;Y)\ge I_0$ 제약"의 라그랑지안은 $\mathcal{L} = I(X;Z) - \beta I(Z;Y)$ (상수항 제외) 이며 $I(Z;Y)$는 $I(X;Y)$를 넘어설 수 없다.

## 그림
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="90" cy="100" r="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="90" y="105" font-size="14" text-anchor="middle">X</text>
<path d="M124,100 L230,100" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="230,100 218,94 218,106" class="dg-stroke-ink"/>
<circle cx="280" cy="100" r="22" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<text x="280" y="105" font-size="13" text-anchor="middle">Z</text>
<text x="230" y="80" font-size="10" class="dg-dim">I(X;Z) 압축</text>
<path d="M302,100 L410,100" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="410,100 398,94 398,106" class="dg-stroke-ink"/>
<circle cx="460" cy="100" r="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="460" y="105" font-size="14" text-anchor="middle">Y</text>
<text x="330" y="80" font-size="10" class="dg-dim">I(Z;Y) 예측</text>
<text x="150" y="30" font-size="11" class="dg-dim">Z는 X보다 좁게 그려 압축을 표현</text>
<text x="90" y="160" font-size="11">min I(X;Z) − β·I(Z;Y), 단 I(Z;Y) ≤ I(X;Y)</text>
</svg>

_Z는 X를 압축하면서도 Y 예측에 필요한 정보만 남기려 한다._

## 문제
제약이 있는 문제이니 lagrange-kkt와 beta-vae에서 쓴 것과 같은 도구인 라그랑주 승수법을 씁니다. 제약을 등호로 정리한 식에 승수 $\beta\ge0$을 곱해서 목적함수에 더합니다.

$\mathcal{L}(p(z|x),\beta) = I(X;Z) - \beta($==빈칸==$)$ 이다.

## 해설
제약 $I(Z;Y)\ge I_0$를 $I(Z;Y)-I_0\ge0$ 형태로 바꾸고 이 식에 벌점 계수 $\beta$를 곱해 목적함수에서 뺀 것입니다. 부등식 제약이라 부호가 목적함수를 최소화하는 문제에 맞게 붙었습니다.

**정답: $I(Z;Y) - I_0$**

## 예시
압축과 예측의 트레이드오프를 숫자로 먼저 그려봅니다. 로그는 밑을 2로 사용합니다.

목표변수와의 상호정보량 상한이 $I(X;Y)=2$비트로 고정되어 있다고 하겠습니다. 인코더 두 개를 비교합니다.

**압축하지 않는 인코더.** $Z=X$로 그대로 통과시키면 $I(X;Z)=5$ $I(Z;Y)=2$로 상한에 정확히 도달합니다.

**압축하는 인코더.** $Z'$가 $X$의 정보를 많이 버려 $I(X;Z')=1$이 되면 예측력도 줄어 $I(Z';Y)=0.6$이 됩니다. 이 값도 상한 $2$를 넘지 않습니다.

$\beta=2$로 두고 목적함수 $\mathcal{L}=I(X;Z)-\beta I(Z;Y)$를 계산합니다.
$$\mathcal{L}(Z)=5-2\times2=1,\qquad \mathcal{L}(Z')=1-2\times0.6=-0.2$$
목적함수는 작을수록 좋으므로 $-0.2$인 압축된 인코더가 더 낫습니다. 예측력을 조금만 포기하고 정보량을 훨씬 많이 줄인 쪽이 이겼습니다.

아래 증명은 $I(Z;Y)$가 왜 $I(X;Y)$라는 상한을 절대 넘을 수 없는지를 데이터처리부등식으로 보이고 이 경합이 라그랑지안 하나로 정확히 표현됨을 확인합니다.
