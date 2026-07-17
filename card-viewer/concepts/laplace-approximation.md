---
slug: laplace-approximation
theme: PROB
domainLabel: 확률 · 통계
subLabel: 통계적 추론
title: 라플라스 근사: 사후분포의 국소 가우시안화
hook: 사후분포 $p(\theta\mid D)$의 정확한 형태를 구하려면 정규화 상수 $Z=\int p(D\mid\theta)p(\theta)\,d\theta$까지 계산해야 하는데, 이 적분이 닫힌 형태로 안 풀리는 경우가 대부분입니다.
---

## 기본설명
$\pi(\theta)=p(D\mid\theta)p(\theta)$를 정규화 전 사후밀도라 하고, $\theta^*=\arg\max_\theta \pi(\theta)$가 정의역 내부의 정상점(임계점)이라 하자. $H=-\nabla^2\log\pi(\theta^*)$(로그밀도의 음의 헤시안, $\theta^*$가 최댓값이므로 양의정부호)라 하면, $\pi(\theta)\approx \pi(\theta^*)\exp\!\big(-\tfrac12(\theta-\theta^*)^TH(\theta-\theta^*)\big)$이고 따라서 $p(\theta\mid D)\approx\mathcal N(\theta^*,\,H^{-1})$이며 정규화 상수는 $Z\approx \pi(\theta^*)(2\pi)^{d/2}|H|^{-1/2}$로 근사된다.

## 문제
$\log\pi(\theta)$를 $\theta^*$ 주변에서 2차까지 테일러 전개하면 $\log\pi(\theta)\approx \log\pi(\theta^*) + \nabla\log\pi(\theta^*)^T(\theta-\theta^*) - \tfrac12(\theta-\theta^*)^TH(\theta-\theta^*)$인데, 정상점 조건에 의해 1차항은 $==빈칸==$이다.

## 해설
$\theta^*$가 최댓값을 주는 정상점이므로 그레이디언트가 0이라서 1차항이 사라져요. 그래서 2차항(곡률)만 근사에 남습니다.

**정답: $0$**

## 예시
라플라스 근사가 실제로 얼마나 잘 맞는지, 정답을 알고 있는 사례에서 확인해 봅시다. 포아송 우도에 감마사전분포를 쓰면 사후분포가 정확히 감마분포가 되는데, 사후분포를 $\mathrm{Gamma}(\alpha{=}6,\beta{=}1)$이라 하면 정규화 전 밀도는 $\pi(\lambda)=\lambda^5e^{-\lambda}$이고 정확한 정규화 상수는 $Z=\Gamma(6)=5!=120$입니다.

최빈값을 구하면 $\frac{d}{d\lambda}\log\pi(\lambda)=\frac{5}{\lambda}-1=0$에서 $\lambda^*=5$이고, 음의 2차미분은 $H=\frac{5}{(\lambda^*)^2}=\frac{5}{25}=0.2$입니다. 라플라스 근사식에 대입하면
$$Z\approx (\lambda^*)^5e^{-\lambda^*}\sqrt{\frac{2\pi}{H}}=5^5e^{-5}\sqrt{2\pi/0.2}\approx 118.02$$
정확값 $120$과 비교하면 상대오차는 약 $1.65\%$에 불과합니다. 실제로 이 계산은 스털링 근사 $n!\approx \sqrt{2\pi n}(n/e)^n$을 라플라스 근사로 유도한 것과 정확히 같은 식이에요 — 스털링 근사 자체가 라플라스 근사의 특수한 사례입니다.
