---
slug: map-estimation
theme: PROB
domainLabel: 확률 · 통계
subLabel: 통계적 추론
title: MAP 추정과 MLE로의 환원
hook: MLE는 데이터만 보고 파라미터를 추정합니다.
---

## 기본설명
사후확률 $P(\theta|x)\propto P(x|\theta)P(\theta)$일 때 $\hat\theta_{MAP}=\arg\max_\theta[\log P(x|\theta)+\log P(\theta)]$이며, $P(\theta)$가 균등분포이면 $\hat\theta_{MAP}=\hat\theta_{MLE}$이다.

## 문제
지금 목표는 사후확률이 가장 큰 파라미터를 고르는 MAP 추정의 목적함수를 베이즈 정리로부터 정확히 유도하는 것이다. 베이즈 정리에 따르면 $P(\theta|x) = \dfrac{P(x|\theta)P(\theta)}{P(x)}$이다. 분모 $P(x)$는 관측된 데이터로 이미 정해진 값이라 $\theta$가 무엇이든 바뀌지 않는 상수다.

$\theta$에 대해 최댓값을 찾을 때는 상수인 분모를 무시해도 argmax의 위치는 바뀌지 않으므로 $\hat\theta_{MAP}=\arg\max_\theta P(\theta|x) = \arg\max_\theta $==빈칸== 이다.

## 해설
분모 $P(x)$는 $\theta$와 무관한 상수이므로 argmax를 구할 때는 분자 $P(x|\theta)P(\theta)$만 남겨도 최댓값의 위치가 그대로 보존된다.

**정답: $P(x|\theta)P(\theta)$**

## 예시
사전분포가 균등하면 MAP가 정말 MLE와 똑같아지는지 숫자로 확인해봅니다.

동전을 10번 던져 앞면이 7번 나왔다고 하겠습니다. 우도는 $L(\theta)=\theta^7(1-\theta)^3$입니다. 앞면 확률 $\theta$에 아무 정보도 없다고 보고 $[0,1]$ 구간의 균등분포를 사전분포로 씁니다. 균등분포는 어떤 $\theta$에서도 같은 상수값 $c$를 가지므로 사후확률은 다음과 같습니다.
$$P(\theta|x) \propto \theta^7(1-\theta)^3 \times c$$
상수 $c$는 어떤 $\theta$를 고르든 값이 그대로이므로 최댓값의 위치에 아무 영향을 주지 않습니다. 그러니 $\theta^7(1-\theta)^3$을 미분해서 0으로 놓고 풀면 됩니다.
$$\frac{d}{d\theta}\left[7\log\theta+3\log(1-\theta)\right]=\frac7\theta-\frac{3}{1-\theta}=0 \ \Rightarrow\ 7(1-\theta)=3\theta \ \Rightarrow\ \theta=0.7$$
MAP 추정치가 관측된 앞면 비율인 $7/10=0.7$과 정확히 일치합니다. 이는 데이터만 보고 계산한 MLE와도 완전히 같은 값입니다. 아래 증명은 이 일치가 이 숫자 조합에서만 우연히 나온 게 아니라 사전분포가 균등하기만 하면 항상 성립하는 사실임을 보입니다.
