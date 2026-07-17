---
slug: bias-variance-tradeoff
theme: PROB
domainLabel: 확률 · 통계
subLabel: 통계적 추론
title: 기대제곱오차의 편향-분산 분해
hook: 모델을 복잡하게 만들수록 학습 데이터는 더 잘 맞추지만 새로운 데이터에서는 오히려 성능이 나빠지는 경우가 많습니다.
related: 
---

## 기본설명
$y=f(x)+\varepsilon$ ($E[\varepsilon]=0$, $\mathrm{Var}(\varepsilon)=\sigma^2$)이고 $\hat f(x)$가 학습데이터 $D$에 의존하는 추정량일 때 $E_{D,\varepsilon}\left[(y-\hat f(x))^2\right] = \mathrm{Bias}(\hat f(x))^2 + \mathrm{Var}(\hat f(x)) + \sigma^2$이다.

## 문제
지금 목표는 $y$를 $f(x)+\varepsilon$로 풀어써서 잡음 항을 나머지와 분리하는 것이다. $(y-\hat f)^2 = (f+\varepsilon-\hat f)^2 = (f-\hat f)^2+2\varepsilon(f-\hat f)+\varepsilon^2$으로 전개된다. $\varepsilon$은 학습 데이터 $D$와 무관하게 독립으로 생기는 잡음이고 평균이 0이므로, 교차항의 기댓값 $2E[\varepsilon]E[f-\hat f]$는 0이 되어 사라진다.

교차항이 사라지므로 $E_{D,\varepsilon}[(y-\hat f)^2] = E_D[(f-\hat f)^2] + E[\varepsilon^2] = E_D[(f-\hat f)^2] + $==빈칸== 이다.

## 해설
$\varepsilon$의 평균이 0이므로 $E[\varepsilon^2]$은 정의상 $\mathrm{Var}(\varepsilon)$과 같다. 문제에서 이 분산을 $\sigma^2$로 두었으므로 그대로 $\sigma^2$이 남는다. 이 항은 모델을 아무리 잘 만들어도 없앨 수 없는 잡음이라 잡음항이라 부른다.

**정답: $\sigma^2$**

## 예시
세 조각으로 나뉜다는 게 실제로 숫자를 더했을 때도 맞아떨어지는지 확인해봅니다.

참값이 $f(x)=10$이고 잡음의 분산은 $\sigma^2=1$이라 하겠습니다. 학습 데이터를 세 번 다르게 뽑아 모델을 학습시켰다고 하겠습니다.

**단순한 모델의 경우.** 데이터가 어떻든 항상 8을 예측하는 모델입니다. 세 번의 예측은 $8,\ 8,\ 8$로 전혀 흔들리지 않습니다. 평균은 8이므로 편향은 $8-10=-2$이고 분산은 0입니다.
$$\mathrm{Bias}^2+\mathrm{Var}+\sigma^2 = (-2)^2+0+1 = 5$$
**복잡한 모델의 경우.** 데이터가 바뀔 때마다 예측이 $8,\ 10,\ 12$로 크게 흔들립니다. 평균은 10이므로 편향은 0이지만 분산은 남습니다.
$$\mathrm{Var} = \frac{(8-10)^2+(10-10)^2+(12-10)^2}{3} = \frac{4+0+4}{3} \approx 2.667$$
$$\mathrm{Bias}^2+\mathrm{Var}+\sigma^2 = 0+2.667+1 \approx 3.667$$
단순한 모델은 분산이 0인데도 편향이 커서 전체 오차가 5로 더 큽니다. 복잡한 모델은 편향을 0으로 없앤 대신 분산이 커졌지만 그래도 전체 오차는 3.667로 더 작습니다. 편향과 분산을 줄이는 방향이 서로 반대라 어느 한쪽만 밀어붙이면 손해를 볼 수 있다는 뜻입니다. 아래 증명은 기대제곱오차가 정확히 이 세 조각의 합으로 쪼개진다는 것을 대수적으로 보입니다.
