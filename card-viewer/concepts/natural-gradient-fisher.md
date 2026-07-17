---
slug: natural-gradient-fisher
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 기하 · 측도
title: 자연그래디언트와 피셔정보행렬: KL의 이차근사
hook: 두 확률분포가 얼마나 다른지 재는 표준 척도는 KL발산입니다.
related: 
---

## 기본설명
$D_{KL}(p_\theta\|p_{\theta+d\theta})$를 $d\theta$에 대해 이차까지 테일러전개하면 $D_{KL}(p_\theta\|p_{\theta+d\theta}) \approx \frac12 d\theta^TF(\theta)d\theta$이다. 여기서 $F(\theta)=\mathbb{E}_{p_\theta}[\nabla_\theta\log p_\theta(x)\nabla_\theta\log p_\theta(x)^T]$는 피셔정보행렬이다.

## 문제
$d\theta=0$이면 $p_{\theta+d\theta}=p_\theta$이므로 두 분포가 완전히 같다. 자기 자신과의 KL발산은 정의상 항상 0이다.

$f(0) = D_{KL}(p_\theta\|p_\theta) = $==빈칸== 이다.

## 해설
두 분포가 같으면 로그 안의 비율이 항상 1이 되어 적분값 전체가 0이 된다. KL발산의 정의에서 바로 나오는 성질이다.

**정답: $0$**

## 예시
피셔정보행렬이 KL발산의 이차근사와 정말 맞아떨어지는지 가장 단순한 베르누이분포로 확인해봅니다.

$p_\theta(x=1)=\theta$인 베르누이분포를 씁니다. $\theta=0.5$에서 $\theta+d\theta=0.6$으로 살짝 옮겨봅니다.
$$D_{KL}(p_{0.5}\|p_{0.6})=0.5\ln\frac{0.5}{0.6}+0.5\ln\frac{0.5}{0.4}=0.5(-0.18232)+0.5(0.22314)\approx0.02041$$
베르누이분포의 피셔정보는 $F(\theta)=1/(\theta(1-\theta))$이므로 $\theta=0.5$에서 $F(0.5)=1/0.25=4$입니다. 이차근사를 직접 계산하면 다음과 같습니다.
$$\frac12d\theta^2F(0.5)=\frac12(0.1)^2(4)=0.02$$
정확한 KL값 $0.02041$과 이차근사 $0.02$가 소수점 둘째 자리까지 거의 일치합니다. $d\theta$가 더 작아질수록 두 값의 차이는 더 빨리 사라집니다.

아래 증명은 이 근사가 우연히 잘 맞은 것이 아니라 테일러전개의 이차항이 항상 피셔정보행렬로 정확히 결정된다는 사실을 보입니다.
