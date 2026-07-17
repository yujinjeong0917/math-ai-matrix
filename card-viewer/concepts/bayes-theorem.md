---
slug: bayes-theorem
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 베이즈 정리
related: 
---

## 도입
평소에 믿던 확률인 사전확률이 있어요. 여기에 새로 관찰한 증거를 더하면 믿음은 어떻게 업데이트될까요. 베이즈 정리는 이 질문에 정확한 공식으로 답해요. 나이브베이즈 분류기부터 베이지안 딥러닝까지 확률적 추론이라는 이름이 붙은 거의 모든 방법의 뿌리가 여기에 있어요.

## 명제
사건 $A,B$($P(B)>0$)에 대해 $P(A|B) = \dfrac{P(B|A)P(A)}{P(B)}$.

## 그림
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
  <line x1="55" y1="110" x2="210" y2="55" class="dg-stroke-ink" stroke-width="2"/>
  <line x1="55" y1="110" x2="210" y2="175" class="dg-stroke-ink" stroke-width="2"/>
  <line x1="220" y1="50" x2="400" y2="25" class="dg-stroke-accent" stroke-width="3"/>
  <line x1="220" y1="50" x2="400" y2="80" class="dg-line" stroke-width="1.3" stroke-dasharray="5,4"/>
  <line x1="220" y1="170" x2="400" y2="145" class="dg-stroke-accent" stroke-width="3"/>
  <line x1="220" y1="170" x2="400" y2="200" class="dg-line" stroke-width="1.3" stroke-dasharray="5,4"/>
  <circle cx="50" cy="110" r="4" class="dg-dim"/>
  <text x="10" y="105" font-size="12">시작</text>
  <text x="70" y="40" font-size="12">사전확률</text>
  <text x="225" y="42" font-size="12">질병 A (0.01)</text>
  <text x="225" y="195" font-size="12">건강 Aᶜ (0.99)</text>
  <text x="280" y="8" font-size="12">우도</text>
  <text x="405" y="20" font-size="12" font-weight="700">양성 B (0.9)</text>
  <text x="405" y="98" font-size="11">음성 (0.1)</text>
  <text x="405" y="140" font-size="12" font-weight="700">양성 B (0.05)</text>
  <text x="405" y="218" font-size="11">음성 (0.95)</text>
  <polygon points="400,25 388,20 388,30" class="dg-accent"/>
  <polygon points="400,145 388,140 388,150" class="dg-accent"/>
</svg>

_사전확률 갈래(A/Aᶜ) 뒤에 우도 갈래(양성/음성)가 이어진다. 실선·굵은선(양성)과 점선(음성)으로 흑백에서도 경로가 구분된다._

## 문제
두 식을 자세히 보면 공통점이 있습니다. 둘 다 $P(A\cap B)$를 담고 있습니다. 이것은 두 사건이 동시에 일어날 확률입니다. 이 공통항을 다리 삼아 두 식을 하나로 잇는 것이 다음 목표입니다. 그러려면 먼저 두 번째 식을 $P(A\cap B)$ 하나만 남도록 정리해야 합니다. $P(B|A)=\dfrac{P(A\cap B)}{P(A)}$ 의 양변에 $P(A)$를 곱하면 $P(A\cap B) = $==빈칸== 입니다.

## 해설
$P(B|A)=P(A\cap B)/P(A)$ 라는 정의식 양변에 $P(A)$를 곱하기만 하면 나오는 식입니다. 새로운 계산이 아니라 식의 모양만 바꾼 것입니다.

**정답: $P(B|A)P(A)$**

## 예시
공식만 봐서는 감이 잘 안 옵니다. 숫자를 직접 넣어봅니다.

사건 $A$를 어떤 질병에 걸린 경우, 사건 $B$를 검사에서 양성이 나온 경우라 하겠습니다. 이 질병의 유병률은 1%이고 검사의 민감도는 90%입니다. 건강한 사람이 잘못 양성 판정을 받는 위양성률은 5%라 하겠습니다. 숫자로 쓰면 $P(A)=0.01$, $P(B|A)=0.9$, $P(B|A^c)=0.05$ 입니다.

먼저 전확률법칙으로 양성이 나올 전체 확률 $P(B)$부터 구합니다.
$$P(B) = 0.9\times0.01 + 0.05\times0.99 = 0.009+0.0495=0.0585$$
이제 베이즈 정리를 그대로 적용합니다.
$$P(A|B) = \dfrac{0.9\times0.01}{0.0585} = \dfrac{0.009}{0.0585} \approx 0.154$$
양성 판정을 받아도 실제로 질병일 확률은 약 15.4%밖에 되지 않습니다. 검사가 꽤 정확해 보여도 유병률 자체가 낮으면 사전확률의 영향이 그만큼 크게 남습니다. 아래 증명은 이 계산이 우연이 아니라 조건부확률의 정의에서 항상 성립하는 공식임을 보입니다.
