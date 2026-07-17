---
slug: fisher-information-kl-local-expansion
theme: INFO2
domainLabel: 정보이론 심화
subLabel: 정보기하 · PAC-베이즈
title: 피셔정보와 KL 발산의 국소근사
hook: 파라미터를 아주 조금 움직였을 때 확률분포가 얼마나 달라지는지 재고 싶습니다.
---

## 기본설명
매끄러운 파라메트릭 분포족 $p_\theta(x)$에 대해 $\theta$ 근방에서 $KL(p_\theta \,\|\, p_{\theta+d\theta}) = \frac{1}{2} d\theta^T I(\theta) d\theta + o(\|d\theta\|^2)$ 가 성립한다. 여기서 $I(\theta)_{ij} = \mathbb{E}_\theta\!\left[\frac{\partial \log p_\theta(x)}{\partial \theta_i}\frac{\partial \log p_\theta(x)}{\partial \theta_j}\right]$ 는 피셔정보행렬이다.

## 문제
$d\theta$에 대해 $1$차 미분하면 $\dfrac{\partial f}{\partial d\theta_i}\Big|_{d\theta=0} = -\mathbb E_\theta[\partial_i \log p_\theta(x)]$ 이다. 그런데 $\partial_i p_\theta(x) = p_\theta(x)\,\partial_i \log p_\theta(x)$ 이므로 $\mathbb E_\theta[\partial_i \log p_\theta(x)] = \int \partial_i p_\theta(x)\,dx = \partial_i\!\int p_\theta(x)\,dx$ 이고, 확률분포는 전체적분이 항상 $1$이므로 이는 $($==빈칸==$)$ 이다. 따라서 $1$차항은 모두 사라진다.

## 해설
어떤 $\theta$에서도 확률분포 전체의 적분은 상수 $1$이에요. 상수를 미분하면 $0$이니까, 스코어함수의 기댓값은 항상 $0$이라는 유명한 항등식이 나옵니다.

**정답: $\partial_i (1) = 0$**

## 예시
가장 단순한 경우로 감을 잡아봅니다. $p_\theta(x) = \mathcal N(\theta, 1)$, 평균이 파라미터인 정규분포족입니다.

평균만 다른 두 정규분포 사이의 KL 발산은 잘 알려진 닫힌 형태를 갖습니다.
$$KL\big(\mathcal N(\theta,1)\,\|\,\mathcal N(\theta+d\theta,1)\big) = \frac{(d\theta)^2}{2}$$
예를 들어 $d\theta=0.1$이면 $KL=0.005$입니다. 이 분포족의 피셔정보는 $I(\theta)=1$로 상수입니다(평균 하나짜리 등분산 정규분포이기 때문입니다). 명제가 말하는 근사값은 $\frac12 (d\theta)^2 \cdot 1 = \frac{(d\theta)^2}{2}$로, 정규분포의 경우에는 근사가 아니라 정확히 일치합니다. 고차항이 전부 사라지는 특수한 경우인 셈이에요.
