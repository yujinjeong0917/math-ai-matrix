---
slug: bayes-factor-occam-razor
theme: STAT
domainLabel: 추론통계
subLabel: 모델선택 이론
title: 베이즈 인수와 오캄의 면도날: 주변우도의 자동 복잡도 벌점
related: AIC/BIC의 점근적 유도 · MAP 추정
---

## 도입
두 모델을 베이즈적으로 비교할 때는 주변우도(evidence) $p(D\mid M)=\int p(D\mid\theta,M)p(\theta\mid M)\,d\theta$의 비, 즉 베이즈 인수를 본다. 신기하게도 이 양은 파라미터를 늘려서 데이터에 더 유연하게 맞출 수 있는 복잡한 모델을 자동으로 벌점화한다. 별도의 정보기준을 손으로 더할 필요가 없다. 그 이유는 복잡한 모델이 사전분포의 확률질량을 더 넓은 파라미터 공간에 펼쳐야 하고, 그중 실제 데이터를 잘 설명하는 영역은 일부에 불과하기 때문이다. 이 현상을 라플라스 근사로 뜯어보면 주변우도가 '최적 적합도 × 오캄 인수(Occam factor)'로 갈라지는 것을 볼 수 있다.

## 명제
aic-bic-derivation에서와 같은 라플라스 근사를 1차원 파라미터 $\theta$, 균등사전분포 $p(\theta)=1/\Delta\theta_{\text{prior}}$(폭 $\Delta\theta_{\text{prior}}$인 구간 위에서 균등) 아래 적용하면, 주변우도는 $p(D\mid M)\approx p(D\mid\hat\theta)\times\dfrac{\Delta\theta_{\text{posterior}}}{\Delta\theta_{\text{prior}}}$로 쓸 수 있다. 여기서 $\Delta\theta_{\text{posterior}}=\sqrt{2\pi}\,\sigma_{\text{post}}$는 우도가 유효하게 몰려있는 사후폭이다. 파라미터가 $k$개면 이 오캄 인수는 각 차원의 곱 $\prod_{i=1}^k(\Delta\theta_{\text{posterior},i}/\Delta\theta_{\text{prior},i})$이 되며, 데이터가 실제로 필요로 하지 않는 여분의 파라미터를 추가할수록(그 파라미터의 사후폭이 사전폭에 비해 좁혀지지 않을수록) 이 곱은 작아져 주변우도를 낮춘다.


## 문제
$1$차원($k=1$) 균등사전분포 $p(\theta)=1/\Delta\theta_{\text{prior}}$의 경우를 먼저 본다. 이때 $\log p(\hat\theta)=-\log\Delta\theta_{\text{prior}}$이고, 라플라스 근사의 나머지 항 $\frac12\log(2\pi)-\frac12\log|H|=\log\sqrt{2\pi/|H|}$을 사후 표준편차 $\sigma_{\text{post}}=1/\sqrt{|H|}$로 다시 쓰면 $\sqrt{2\pi/|H|}=\sqrt{2\pi}\,\sigma_{\text{post}}=$==빈칸== 이다.

## 해설
정의상 사후폭 Δθ_posterior를 √(2π)σ_post로 두었으므로, 그대로 대입하면 이 표현이 됩니다.

**정답: $\Delta\theta_{\text{posterior}}$**

## 예시
구체적인 숫자로 오캄 인수가 실제로 얼마나 강하게 복잡한 모델을 벌점화하는지 확인해봅니다.

모델 $M_1$은 파라미터 $\theta$ 하나, 사전분포는 $[-1,1]$ 위의 균등분포이므로 $\Delta\theta_{\text{prior}}=2$입니다. 데이터를 맞춘 결과 최적 적합도 $p(D\mid\hat\theta)=e^{-5}\approx0.00674$이고 사후폭은 $\sigma_{\text{post}}=0.1$이라 합시다. 오캄 인수는 $\Delta\theta_{\text{posterior}}/\Delta\theta_{\text{prior}}=(0.1\sqrt{2\pi})/2\approx0.1253$이고, 증거는 $p(D\mid M_1)\approx0.00674\times0.1253\approx0.000844$입니다.

모델 $M_2$는 $M_1$에 파라미터 $\phi$ 하나를 더 추가한 모델입니다. $\phi$의 사전분포도 $[-1,1]$ 위 균등($\Delta\phi_{\text{prior}}=2$)이고, 이 추가 파라미터 덕분에 최적 적합도가 살짝 좋아져 $p(D\mid\hat\theta,\hat\phi)=e^{-4.9}\approx0.00745$가 되었지만, $\phi$가 데이터에 크게 필요하지 않아 사후폭은 $\sigma_{\phi,\text{post}}=0.01$로 아주 좁습니다. 오캄 인수는 $0.1253\times(0.01\sqrt{2\pi}/2)\approx0.1253\times0.01253\approx0.00157$이고, 증거는 $p(D\mid M_2)\approx0.00745\times0.00157\approx0.0000117$입니다.

$M_2$가 최적 적합도는 근소하게 더 좋지만($e^{-4.9}>e^{-5}$), 여분의 파라미터가 만든 오캄 인수 벌점이 훨씬 커서 $p(D\mid M_1)\approx0.000844$가 $p(D\mid M_2)\approx0.0000117$보다 약 $72$배 더 큽니다. 주변우도는 자동으로 더 단순한 모델을 선호합니다.
