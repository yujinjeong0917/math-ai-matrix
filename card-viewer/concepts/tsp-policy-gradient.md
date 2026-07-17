---
slug: tsp-policy-gradient
theme: DISC2
domainLabel: 이산수학 심화
subLabel: 부호이론 · 조합최적화
title: 외판원문제와 정책그래디언트: TSP as MDP
related: 
---

## 도입
외판원문제(TSP)는 도시 수가 늘어나면 가능한 투어의 수가 $(n-1)!/2$로 폭발해 완전탐색은 물론 정확한 동적계획법(Held–Karp, $O(n^2 2^n)$)조차 감당하기 어려워집니다. 하지만 '다음에 어떤 도시로 갈지'를 순차적으로 결정하는 문제로 바라보면, 강화학습의 정책그래디언트로 표본 몇 개만 뽑아 정책을 점점 더 짧은 투어 쪽으로 이동시킬 수 있습니다.

## 명제
TSP를 상태 $s_t=(\text{현재 도시},\text{방문집합})$, 행동 $a_t=\text{다음 도시}$, 보상 $r(s_t,a_t)=-d(\cdot,\cdot)$인 MDP로 정식화하고 정책 $\pi_\theta$의 목적함수를 $J(\theta)=\mathbb{E}_{\tau\sim\pi_\theta}[R(\tau)]$(음의 기대 투어길이)라 하면, $\nabla_\theta J(\theta)=\mathbb{E}_\tau\left[R(\tau)\sum_t\nabla_\theta\log\pi_\theta(a_t\mid s_t)\right]$이다(REINFORCE). 이 추정량은 불편(unbiased)이며 표본 롤아웃만으로 계산 가능하므로, 모든 투어를 나열하지 않고도 기대 투어길이를 개선하는 방향으로 정책을 갱신할 수 있다.


## 문제
$\theta$에 대한 로그미분 항등식 $\nabla_\theta \pi_\theta(\tau) = \pi_\theta(\tau)\nabla_\theta \log\pi_\theta(\tau)$를 이용하면, 목적함수 $J(\theta)=\mathbb{E}_{\tau\sim\pi_\theta}[R(\tau)]=\int R(\tau)\pi_\theta(\tau)\,d\tau$의 그래디언트는 $\nabla_\theta J(\theta)=\int R(\tau)\pi_\theta(\tau)\nabla_\theta\log\pi_\theta(\tau)\,d\tau = $==빈칸== 로 다시 쓸 수 있다.

## 해설
확률밀도 π_θ(τ)를 곱한 적분은 기댓값의 정의 그 자체예요.

**정답: $\mathbb{E}_{\tau\sim\pi_\theta}[R(\tau)\nabla_\theta\log\pi_\theta(\tau)]$**

## 예시
도시 $A,B,C,D$에 거리 $d(A,B)=2,d(A,C)=9,d(A,D)=10,d(B,C)=6,d(B,D)=4,d(C,D)=3$이 주어졌다고 합시다. 서로 다른 투어는 $3$개뿐입니다: $A\text{-}B\text{-}C\text{-}D\text{-}A$는 $2+6+3+10=21$, $A\text{-}B\text{-}D\text{-}C\text{-}A$는 $2+4+3+9=18$, $A\text{-}C\text{-}B\text{-}D\text{-}A$는 $9+6+4+10=29$로, 최적은 길이 $18$입니다. 도시가 늘어나면 이런 나열 자체가 불가능해지므로, 표본 기반 정책그래디언트가 어떻게 대안이 되는지 확인합니다.
