---
slug: novelty-effect
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 실험 함정
title: Novelty Effect: 새로워서 좋아 보이는 착시
related: SRM · 순차검정
---

## 도입
novelty effect는 시간에 따라 처치 효과 자체가 변한다는 점에서 표본크기나 유의성과는 다른 종류의 함정이다. 관측된 효과를 시간의 함수로 모델링하면 대략 다음과 같은 지수감쇠 형태로 근사할 수 있다.
$$\Delta_t = \Delta_\infty + (\Delta_0 - \Delta_\infty)\, e^{-t/\tau}$$
$\Delta_0$는 출시 직후의 관측 효과 $\Delta_\infty$는 충분한 시간이 지난 뒤 자리 잡는 정상상태 효과 $\tau$는 감쇠 속도를 나타내는 상수다. 실험을 짧게 돌리면 $\Delta_t$가 $\Delta_0$에 가까운 값으로 관측되어 진짜 장기 효과인 $\Delta_\infty$보다 크게 부풀려진 수치를 보게 된다.

이 함정이 실무에서 위험한 이유는 방향이 늘 과대평가 쪽으로만 작동하지 않는다는 데 있다. change aversion처럼 기능은 진짜 유용한데 습관 형성에 시간이 걸려서 초반에는 오히려 손해로 보이는 경우도 있다. 즉 단순히 초반 수치가 과장됐다고 항상 깎아서 해석해도 안 되고 패턴의 모양 자체를 확인해야 한다.

진단하는 방법은 크게 두 가지다. 하나는 실험을 충분히 길게 돌리면서 일자별 효과 크기 추세를 그려보는 것이고 다른 하나는 출시 이전 경험이 아예 없는 신규 사용자만 따로 떼어 분석하는 것이다. 신규 사용자에게는 비교할 예전 버전에 대한 기억 자체가 없으므로 호기심에서 나오는 novelty effect가 원천적으로 발생하지 않는다. 신규 사용자에서의 효과와 기존 사용자에서의 효과가 크게 다르면 novelty effect가 섞여 있다는 강한 신호다.

## 명제


## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="20" x2="60" y2="200" class="dg-stroke-ink" stroke-width="2"/>
<line x1="60" y1="200" x2="520" y2="200" class="dg-stroke-ink" stroke-width="2"/>
<path d="M80,50 L140,90 L200,120 L260,140 L320,150 L380,155 L440,157 L500,158" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<line x1="60" y1="158" x2="520" y2="158" class="dg-line" stroke-width="1.5" stroke-dasharray="4,4"/>
<text x="20" y="30" font-size="12">업리프트</text>
<text x="460" y="216" font-size="12">경과일</text>
<text x="420" y="150" font-size="11" class="dg-dim">정상상태 수준</text>
<text x="90" y="42" font-size="11">출시 직후</text>
</svg>

_출시 직후 반짝 오른 업리프트가 시간이 지나며 정상상태 수준으로 가라앉는다._

## 문제
$u_t = \Delta_t-\Delta_\infty$로 치환하면 $\dfrac{du_t}{dt} = -\dfrac{1}{\tau}u_t$가 되어 변수분리가 가능하다. 양변을 $u_t$로 나누고 $t$에 대해 적분하면 $\ln|u_t| = -\dfrac{t}{\tau}+C$이고, 양변에 지수함수를 취하면 $u_t =$ ==빈칸== 이다 (단 $A=e^C$).

## 해설
ln|u_t|=-t/τ+C의 양변에 지수함수를 취하면 u_t = e^{-t/τ+C} = e^C·e^{-t/τ}이고 e^C를 A로 두면 이 식이 나오기 때문이에요.

**정답: $Ae^{-t/\tau}$**

## 예시
어떤 신기능의 일자별 업리프트가 1일차 +18% 7일차 +9% 14일차 +4% 28일차 +3%로 관측됐다고 하자. 28일차 수치를 정상상태 근사치로 보면 실험을 하루만 보고 판단했을 경우 진짜 효과보다 약 6배 부풀린 채로 의사결정을 내렸을 것이다.

이럴 때 실무에서는 최소 2에서 4주 관측 후 최근 며칠간의 수치가 더 이상 크게 움직이지 않는지 확인하고 그 안정된 구간의 평균을 최종 효과로 채택하는 방식을 쓴다.
