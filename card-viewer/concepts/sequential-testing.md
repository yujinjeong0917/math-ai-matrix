---
slug: sequential-testing
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: A/B 테스트
title: 순차검정: 실험 중간에 계속 들여다봐도 안전하게 만들기
related: 표본크기 산정 · Multi-armed Bandit
---

## 도입
고정 표본 검정에서 유의수준 5%는 딱 한 번 정해진 시점에 검정할 때만 보장되는 숫자다. 결과를 반복해서 관찰하고 그때그때 p값이 임계치를 넘는 순간 멈추는 절차는 확률론적으로 랜덤워크가 특정 경계를 넘는 순간을 기다리는 것과 같다. 귀무가설이 참이어도 관찰 횟수를 늘릴수록 어느 시점에는 경계를 넘을 확률이 계속 쌓여서 무한히 들여다볼 수 있다면 결국 거의 확실하게 유의한 순간을 만나게 된다. 이것이 반복 들여다보기가 위험한 근본적인 이유다.

해법 하나는 알파 소비 함수를 쓰는 그룹순차설계다. 전체 실험 기간 동안 몇 번을 확인할지 $K$번으로 미리 정하고 각 확인 시점마다 쓸 수 있는 오류 예산을 나눠 배정한다. 예를 들어 O'Brien-Fleming 방식은 초반 확인 시점에는 아주 엄격한 임계값을 쓰고 뒤로 갈수록 임계값을 완화해서 마지막 확인 시점에서야 나머지 예산 대부분을 쓴다. 초반에 우연히 튀는 결과로 잘못 멈추는 일을 막으면서도 전체 확인 횟수에 걸쳐 누적 오류율은 정확히 목표 수준에 맞춘다.

또 다른 해법은 알와이즈밸리드 p값 또는 mSPRT라 불리는 방식으로 아예 확인 시점을 미리 정하지 않고 아무 때나 멈춰도 안전한 통계량을 만든다. 귀무가설 아래에서 기대값이 1인 음이 아닌 마팅게일 $M_t$를 구성하면 빌의 부등식에 의해 다음이 성립한다.
$$P\left(\exists\, t : M_t \geq \frac{1}{\alpha}\right) \leq \alpha$$
이 부등식은 언제 멈추든 상관없이 성립하기 때문에 담당자가 임의의 시점에 임의로 여러 번 확인해도 전체 위양성 확률은 여전히 $\alpha$ 이하로 유지된다. 고정 표본 검정이 딱 한 번의 관찰만 허용하는 것과 대비되는 지점이다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<text x="160" y="16" font-size="12" text-anchor="middle">고정 임계값을 매번 확인</text>
<rect x="40" y="20" width="240" height="200" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="40" y1="110" x2="280" y2="110" class="dg-line" stroke-width="1.5" stroke-dasharray="4,4"/>
<path d="M60,190 L100,150 L140,100 L170,80 L200,130 L240,170 L260,185" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="170" cy="80" r="5" class="dg-accent" stroke="none"/>
<text x="170" y="68" font-size="11" text-anchor="middle">거짓 유의</text>
<text x="480" y="16" font-size="12" text-anchor="middle">알파 소비 경계</text>
<rect x="360" y="20" width="240" height="200" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<path d="M380,40 L420,55 L460,75 L500,95 L540,110 L580,122" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="4,4"/>
<path d="M380,190 L420,175 L460,185 L500,160 L540,140 L580,123" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="580" cy="122" r="5" class="dg-accent" stroke="none"/>
<text x="540" y="240" font-size="11" text-anchor="middle">최종 확인 시점</text>
</svg>

_고정 임계값은 노이즈만으로도 일찍 넘을 수 있지만 갈수록 좁아지는 경계는 끝에서만 정당하게 넘는다._

## 문제
임의로 고정한 시점 $T$에 대해 $\tau$와 $T$ 중 작은 값을 $\tau\wedge T$라 하면 이는 $T$ 이내에서 반드시 멈추는 정지시각이다. 마팅게일에 대한 선택적 정지 정리에 의해 유계인 정지시각에서의 기댓값은 시작값과 같으므로 $\mathbb{E}[M_{\tau\wedge T}] =$ ==빈칸== 이다.

## 해설
선택적 정지 정리는 유계인 정지시각에서도 마팅게일의 기댓값이 초기값과 같음을 보장하고, 여기서 초기값은 M_0=1이기 때문이에요.

**정답: $1$**

## 예시
2번의 확인 시점을 갖는 O'Brien-Fleming 방식의 대표적인 예시 경계값은 중간 확인에서 $Z_1 \approx 2.80$ 최종 확인에서 $Z_2 \approx 1.98$이다. 양측검정 명목 p값으로 환산하면 중간 확인은 약 0.005 최종 확인은 약 0.048에 해당한다.

중간 시점에는 왠만큼 극단적인 결과가 아니면 절대 멈추지 않도록 문턱을 아주 높여두고 최종 시점에는 거의 표준적인 0.05에 가까운 문턱으로 되돌아온다. 두 확인 시점의 상관관계까지 고려해 계산하면 두 번을 확인해도 전체 위양성 확률은 정확히 5%로 유지된다.
