---
slug: ucb-confidence-bound
theme: PROB
domainLabel: 확률 · 통계
subLabel: 통계적 추론
title: Hoeffding 부등식과 UCB의 낙관적 탐험
hook: UCB(신뢰상한) 알고리즘은 각 행동의 평균 보상 추정치에 보너스 항을 더해서 그 합이 가장 큰 행동을 고릅니다.
---

## 기본설명
유계 확률변수 $X_1,\dots,X_n\in[0,1]$이 i.i.d.이고 평균 $\mu$를 가질 때, 임의의 $\delta\in(0,1)$에 대해 확률 $1-\delta$ 이상으로 $\mu \le \bar X_n + \sqrt{\dfrac{\log(1/\delta)}{2n}}$ 이 성립한다.

## 문제
지금 목표는 이 실패확률을 우리가 원하는 작은 값 $\delta$로 직접 통제하는 것이다. 그러려면 확률의 상한 $\exp(-2n\varepsilon^2)$이 정확히 $\delta$가 되도록 $\varepsilon$을 역으로 구해야 한다. 양변에 로그를 씌우면 $-2n\varepsilon^2 = \log\delta$이고, 양변에 $-1$을 곱하면 $2n\varepsilon^2 = \log(1/\delta)$이다.

이제 $\varepsilon^2$을 구하고 제곱근을 씌우면 $\varepsilon = $==빈칸== 이다.

## 해설
$2n\varepsilon^2=\log(1/\delta)$의 양변을 $2n$으로 나누면 $\varepsilon^2=\log(1/\delta)/(2n)$이 되고, 여기에 제곱근을 씌우면 $\varepsilon$이 이 형태로 구해진다.

**정답: $\sqrt{\dfrac{\log(1/\delta)}{2n}}$**

## 예시
부등식이 실제로 어떤 크기의 여유를 만들어주는지 숫자로 넣어보면 UCB가 왜 아직 안 해본 행동에 후한지 바로 보입니다.

신뢰수준을 $\delta=0.05$로 두고 두 행동을 비교합니다. **행동 A**는 $n_A=10$번 시도해 평균 $\bar X_A=0.5$를 얻었고 **행동 B**는 $n_B=100$번 시도해 똑같이 평균 $\bar X_B=0.5$를 얻었습니다.

보너스 항 $\sqrt{\log(1/\delta)/(2n)}$ 부터 계산합니다. $\log(1/0.05)=\log 20\approx2.9957$ 입니다.
$$\sqrt{\frac{2.9957}{2\times10}}\approx0.3870,\qquad \sqrt{\frac{2.9957}{2\times100}}\approx0.1224$$
신뢰상한은 $\mu\le\bar X_n+\sqrt{\log(1/\delta)/(2n)}$이므로 행동 A의 신뢰상한은 $0.5+0.3870=0.887$이고 행동 B의 신뢰상한은 $0.5+0.1224=0.622$입니다.

평균은 똑같이 $0.5$인데도 적게 시도한 **행동 A**의 신뢰상한이 훨씬 높습니다. 아직 관측이 적어 참 평균이 더 클 통계적 여지가 남아 있기 때문입니다. 아래 증명은 이 여유분 $\sqrt{\log(1/\delta)/(2n)}$이 Hoeffding 부등식에서 정확히 어떻게 유도되는지 보입니다.
