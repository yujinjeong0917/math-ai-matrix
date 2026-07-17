---
slug: gmm-em-m-step
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: GMM의 M-step: 파라미터 갱신식 유도
related: GMM의 E-step: 책임값의 유도 · k-평균은 왜 GMM의 특수한 경우인가
---

## 도입
gmm-em에서 책임값 $\gamma_{ji}$를 베이즈 정리로 유도했다. E-step은 현재 파라미터를 고정한 채 이 책임값을 계산하는 단계였다. 이제 반대로 책임값을 고정해두고 로그가능도를 최대화하는 파라미터 $\mu_i,\Sigma_i,\alpha_i$를 구하는 M-step을 유도한다. 세 파라미터의 갱신식이 모두 책임값으로 가중한 평균이라는 하나의 공통된 패턴을 따른다는 사실이 드러난다.

## 명제
책임값 $\gamma_{ji}$가 고정되어 있을 때 로그가능도 $LL(D)=\sum_j\ln\left(\sum_i\alpha_i\mathcal N(x_j\mid\mu_i,\Sigma_i)\right)$를 $\mu_i,\Sigma_i,\alpha_i$(단 $\sum_i\alpha_i=1$)에 대해 최대화하면 $\mu_i=\dfrac{\sum_j\gamma_{ji}x_j}{\sum_j\gamma_{ji}}$, $\Sigma_i=\dfrac{\sum_j\gamma_{ji}(x_j-\mu_i)(x_j-\mu_i)^T}{\sum_j\gamma_{ji}}$, $\alpha_i=\dfrac1m\sum_j\gamma_{ji}$를 얻는다.


## 문제
먼저 $\mu_i$에 대한 최적조건을 구한다. 로그가능도 안에는 $\ln(\sum_i\cdots)$처럼 합의 로그가 들어 있어서 연쇄법칙을 적용하면 미분 결과에 자연스럽게 책임값이 계수로 등장한다. 표준적인 다변량 가우시안 로그밀도의 미분 공식 $\partial\ln\mathcal N(x\mid\mu_i,\Sigma_i)/\partial\mu_i=\Sigma_i^{-1}(x-\mu_i)$를 그대로 쓰면 $LL(D)$를 $\mu_i$로 미분한 결과는 $\partial LL(D)/\partial\mu_i=\sum_j\gamma_{ji}\Sigma_i^{-1}(x_j-\mu_i)$이다. 이를 0으로 놓고 양변에 왼쪽에서 가역행렬 $\Sigma_i$를 곱해 $\Sigma_i^{-1}$을 지우면 $\sum_j\gamma_{ji}(x_j-\mu_i) = $==빈칸== 이다.

## 해설
$\sum_j\gamma_{ji}\Sigma_i^{-1}(x_j-\mu_i)=0$의 양변에 왼쪽에서 $\Sigma_i$를 곱하면 $\Sigma_i^{-1}$이 사라지고 $\sum_j\gamma_{ji}(x_j-\mu_i)=0$만 남는다.

**정답: $0$**

## 예시
추상적인 유도 전에 점 두 개 성분 두 개짜리 아주 작은 예에서 이미 책임값이 주어졌다고 가정하고 갱신식이 실제로 무엇을 계산하는지 확인해봅니다.

데이터가 $x_1=2$, $x_2=6$ 두 개뿐이고 E-step에서 이미 계산된 책임값이 $\gamma_{11}=0.9,\ \gamma_{12}=0.1$(점 1이 성분 1과 2에 갖는 책임값)과 $\gamma_{21}=0.3,\ \gamma_{22}=0.7$(점 2가 성분 1과 2에 갖는 책임값)이라고 합니다.

성분 1의 평균부터 갱신해봅니다.
$$\mu_1=\frac{\gamma_{11}x_1+\gamma_{21}x_2}{\gamma_{11}+\gamma_{21}}=\frac{0.9\times2+0.3\times6}{0.9+0.3}=\frac{1.8+1.8}{1.2}=3.0$$
성분 1은 점 1에 더 강하게 걸쳐 있지만(0.9) 점 2에도 조금 걸쳐 있어서(0.3) 새 평균은 점 1 쪽으로 더 끌리면서도 점 2의 영향을 완전히 무시하지 않은 $3.0$이라는 값으로 정해집니다.

이제 성분 1의 혼합비율도 갱신해봅니다. 전체 데이터 수는 $m=2$입니다.
$$\alpha_1=\frac1m\sum_j\gamma_{j1}=\frac{0.9+0.3}{2}=0.6$$
성분 1이 전체 데이터에서 평균적으로 지는 책임은 $0.6$이라는 뜻입니다. 두 점 모두 성분 1에 절반 이상의 책임을 지고 있으니(0.9와 0.3의 평균이 0.6) 이 값이 그대로 반영된 셈입니다. 아래 증명은 이런 계산이 특정 숫자쌍의 우연이 아니라 로그가능도를 최대화하는 일반적인 결과임을 보입니다.
