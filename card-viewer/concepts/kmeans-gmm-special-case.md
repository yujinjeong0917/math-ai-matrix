---
slug: kmeans-gmm-special-case
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: k-평균은 왜 GMM의 특수한 경우인가
related: GMM의 E-step: 책임값의 유도 · GMM의 M-step: 파라미터 갱신식 유도
---

## 도입
gmm-em에서 각 데이터가 성분 $k$에서 나왔을 책임값 $\gamma_k(x)$를 베이즈 정리로 유도했다. 이 책임값은 보통 0과 1 사이 어디든 걸칠 수 있는 부드러운 값이다. 그런데 모든 성분의 공분산을 같은 등방 공분산 $\sigma^2I$로 묶어두고 $\sigma^2$을 0으로 보내면 이 부드러운 소속이 정확히 하나의 성분에만 완전히 쏠리는 딱딱한 소속으로 변한다. 그 극한에서 GMM의 EM 반복이 정확히 k-평균 알고리즘과 같아진다는 사실을 확인한다.

## 명제
GMM의 모든 성분이 $\Sigma_i=\sigma^2I$라는 공통의 등방 공분산을 갖는다고 제약하고 $\sigma^2\to0$인 극한을 취하면 책임값 $\gamma_{ji}$는 가장 가까운 평균에 대한 하드 0/1 배정으로 수렴하고 그 결과 로그가능도를 최대화하는 EM 반복은 k-평균의 목적함수 $E=\sum_{i=1}^k\sum_{x\in C_i}\|x-\mu_i\|_2^2$를 최소화하는 반복과 정확히 같아진다.

## 그림
<svg viewBox="0 0 940 260" xmlns="http://www.w3.org/2000/svg">
  <line x1="310" y1="20" x2="310" y2="220" class="dg-line" stroke-width="1" stroke-dasharray="2,4"/>
  <line x1="630" y1="20" x2="630" y2="220" class="dg-line" stroke-width="1" stroke-dasharray="2,4"/>
  <text x="60" y="24" font-size="12" font-weight="700">σ² 큼: 부드러운 겹침</text>
  <text x="380" y="24" font-size="12" font-weight="700">σ² 중간: 겹침 축소</text>
  <text x="700" y="24" font-size="12" font-weight="700">σ²→0: 보로노이 직선경계</text>
  <ellipse cx="100" cy="140" rx="95" ry="65" fill="none" class="dg-stroke-ink" stroke-width="1.6"/>
  <ellipse cx="215" cy="140" rx="95" ry="65" fill="none" class="dg-line" stroke-width="1.6" stroke-dasharray="6,4"/>
  <circle cx="100" cy="140" r="3" class="dg-dim"/>
  <circle cx="215" cy="140" r="3" class="dg-dim"/>
  <text x="85" y="120" font-size="10">μ₁</text>
  <text x="205" y="120" font-size="10">μ₂</text>
  <ellipse cx="420" cy="140" rx="55" ry="38" fill="none" class="dg-stroke-ink" stroke-width="1.6"/>
  <ellipse cx="520" cy="140" rx="55" ry="38" fill="none" class="dg-line" stroke-width="1.6" stroke-dasharray="6,4"/>
  <circle cx="420" cy="140" r="3" class="dg-dim"/>
  <circle cx="520" cy="140" r="3" class="dg-dim"/>
  <text x="405" y="120" font-size="10">μ₁</text>
  <text x="510" y="120" font-size="10">μ₂</text>
  <ellipse cx="750" cy="140" rx="16" ry="12" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
  <ellipse cx="850" cy="140" rx="16" ry="12" fill="none" class="dg-line" stroke-width="1.8" stroke-dasharray="6,4"/>
  <circle cx="750" cy="140" r="3" class="dg-dim"/>
  <circle cx="850" cy="140" r="3" class="dg-dim"/>
  <text x="735" y="120" font-size="10">μ₁</text>
  <text x="838" y="120" font-size="10">μ₂</text>
  <line x1="800" y1="30" x2="800" y2="220" class="dg-stroke-accent" stroke-width="2.6"/>
  <text x="765" y="240" font-size="10" class="dg-dim">직선 경계(k-평균)</text>
  <text x="380" y="255" font-size="12" font-weight="700">σ² 감소 →</text>
</svg>

_σ²를 줄여가면 겹치던 가우시안 등고선(실선/파선)이 점점 좁아지다가 극한에서 두 점 사이 수직이등분선(굵은 실선)이라는 보로노이 직선경계로 변한다._

## 문제
먼저 다변량 가우시안 밀도에 $\Sigma_i=\sigma^2I$를 대입한다. 일반적인 공분산 $\Sigma_i$ 아래에서 밀도는 $\mathcal N(x\mid\mu_i,\Sigma_i)=\dfrac{1}{(2\pi)^{n/2}|\Sigma_i|^{1/2}}\exp\left(-\dfrac12(x-\mu_i)^T\Sigma_i^{-1}(x-\mu_i)\right)$인데 $\Sigma_i=\sigma^2I$를 넣으면 $|\Sigma_i|^{1/2}=(\sigma^2)^{n/2}$이고 이차형식도 $\|x-\mu_i\|^2/\sigma^2$로 단순해진다. 그러니 $\mathcal N(x\mid\mu_i,\sigma^2I) = $==빈칸== 이다.

## 해설
$|\sigma^2I|=(\sigma^2)^n$이므로 $|\Sigma_i|^{1/2}=(\sigma^2)^{n/2}$이고 $(2\pi)^{n/2}(\sigma^2)^{n/2}=(2\pi\sigma^2)^{n/2}$로 합쳐진다. 이차형식도 $\Sigma_i^{-1}=I/\sigma^2$이므로 $\|x-\mu_i\|^2/\sigma^2$로 정리된다.

**정답: $\dfrac{1}{(2\pi\sigma^2)^{n/2}}\exp\left(-\dfrac{\|x-\mu_i\|^2}{2\sigma^2}\right)$**

## 예시
추상적인 극한 논증 전에 두 성분짜리 1차원 GMM에서 $\sigma^2$를 줄여가며 책임값이 실제로 어떻게 날카로워지는지 숫자로 확인해봅니다.

두 성분의 평균이 $\mu_1=0$, $\mu_2=4$이고 혼합비율은 같다고 합니다. 데이터점 $x=1.8$을 관측했다고 하면 $\|x-\mu_1\|^2=3.24$, $\|x-\mu_2\|^2=4.84$로 두 평균 중 어느 쪽에도 완전히 쏠리지 않는 애매한 위치입니다.

**$\sigma^2=4$인 경우.** $\gamma_{j1}=\dfrac{\exp(-3.24/8)}{\exp(-3.24/8)+\exp(-4.84/8)}\approx\dfrac{0.667}{0.667+0.546}\approx0.550$이고 $\gamma_{j2}\approx0.450$입니다. 두 값이 거의 반반으로 나뉩니다.

**$\sigma^2=1$인 경우.** $\gamma_{j1}\approx\dfrac{0.198}{0.198+0.089}\approx0.690$, $\gamma_{j2}\approx0.310$으로 이미 한쪽으로 조금 더 기울었습니다.

**$\sigma^2=0.25$인 경우.** $\gamma_{j1}\approx\dfrac{0.00153}{0.00153+0.00006}\approx0.961$, $\gamma_{j2}\approx0.039$로 거의 완전히 $\mu_1$ 쪽으로 쏠립니다.

$\sigma^2$를 4에서 1, 0.25로 줄여가는 것만으로 책임값이 0.550 대 0.450이던 것이 0.961 대 0.039까지 날카로워집니다. 아래 증명은 $\sigma^2\to0$의 극한에서 이 값이 결국 정확히 1과 0으로 수렴하고 그 결과 EM 반복 전체가 k-평균과 같아짐을 일반적으로 보입니다.
