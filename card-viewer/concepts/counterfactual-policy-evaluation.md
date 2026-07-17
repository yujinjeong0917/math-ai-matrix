---
slug: counterfactual-policy-evaluation
theme: CAUSAL
domainLabel: 인과추론
subLabel: 그래프 인과모형
title: 반사실 정책평가: 중요도가중 off-policy 추정
related: 
---

## 도입
이미 운영 중인 추천시스템(행동정책 $\pi_b$)이 수집한 로그 데이터만 가지고, 아직 배포하지 않은 새로운 정책(타깃 정책 $\pi_e$)의 기대 성과를 추정하고 싶다. 각 로그에는 어떤 맥락에서 어떤 행동을 선택했고 어떤 보상을 받았는지만 있을 뿐, 다른 행동을 선택했다면 어떤 보상을 받았을지는 기록되어 있지 않다 — 잠재결과 프레임워크의 언어로 말하면 관측된 보상 $R$은 실제로 취해진 행동 $A$에 대응하는 반사실 보상 하나일 뿐이다. 반사실 정책평가는 이 로그로부터 다른 정책의 가치를 복원하는 문제다.

## 명제
맥락 $X$, 행동 $A$, 보상 $R$로 이루어진 데이터가 행동정책 $\pi_b$ 하에서 $(X,A,R)\sim\pi_b$로 수집되었다고 하자. 보상함수를 $r(x,a):=E[R\mid X=x,A=a]$라 하고, 모든 $x$에 대해 $\pi_e(a\mid x)>0 \Rightarrow \pi_b(a\mid x)>0$(양의성/오버랩)이 성립한다고 하자. 그러면 중요도가중 추정량 $\hat V_{IS}(\pi_e) = E_{(X,A,R)\sim\pi_b}\big[\frac{\pi_e(A\mid X)}{\pi_b(A\mid X)}R\big]$은 타깃 정책의 참값 $V(\pi_e)=E_X[\sum_a\pi_e(a\mid X)r(X,a)]$의 불편추정량이다: $E[\hat V_{IS}(\pi_e)] = V(\pi_e)$.


## 문제
타깃 정책의 가치는 $V(\pi_e) = E_{X}\big[\sum_a \pi_e(a\mid X)\,r(X,a)\big]$로 정의된다. $\pi_b$로 수집된 데이터만으로 이를 추정하기 위한 중요도가중(importance sampling) 추정량은 $\hat V_{IS}(\pi_e) = $==빈칸== 이다.

## 해설
관측된 보상 $R$에 목표정책과 행동정책의 확률 비율(중요도 가중치) $\pi_e(A\mid X)/\pi_b(A\mid X)$을 곱해 기댓값을 취하면, 행동정책 데이터의 분포를 목표정책 분포 쪽으로 재가중할 수 있습니다.

**정답: $E_{(X,A,R)\sim\pi_b}\!\left[\dfrac{\pi_e(A\mid X)}{\pi_b(A\mid X)}\,R\right]$**

## 예시
맥락 $X\in\{\text{morning},\text{evening}\}$, 행동 $A\in\{1,2\}$인 상황을 생각하자. $P(X{=}\text{morning})=P(X{=}\text{evening})=0.5$이고, 참 보상함수는 $r(\text{morning},1)=10,\ r(\text{morning},2)=6,\ r(\text{evening},1)=4,\ r(\text{evening},2)=8$이다.

행동정책: $\pi_b(1\mid\text{morning})=0.7,\ \pi_b(2\mid\text{morning})=0.3,\ \pi_b(1\mid\text{evening})=0.4,\ \pi_b(2\mid\text{evening})=0.6$.
타깃정책: $\pi_e(1\mid\text{morning})=0.5,\ \pi_e(2\mid\text{morning})=0.5,\ \pi_e(1\mid\text{evening})=0.9,\ \pi_e(2\mid\text{evening})=0.1$.

타깃 정책의 참값은 $$V(\pi_e)=0.5(0.5\times10+0.5\times6)+0.5(0.9\times4+0.1\times8)=0.5\times8+0.5\times4.4=6.2$$ 이다. 중요도가중치는 $w(\text{morning},1)=0.5/0.7\approx0.714,\ w(\text{morning},2)=0.5/0.3\approx1.667,\ w(\text{evening},1)=0.9/0.4=2.25,\ w(\text{evening},2)=0.1/0.6\approx0.167$이며, 행동정책의 확률로 가중평균하면 $$0.7\times0.714\times10+0.3\times1.667\times6=5+3=8\ (\text{아침})$$ $$0.4\times2.25\times4+0.6\times0.167\times8=3.6+0.8=4.4\ (\text{저녁})$$ 로 각 맥락에서 정확히 목표정책 기준 값과 같아지고, 전체 평균은 $0.5\times8+0.5\times4.4=6.2=V(\pi_e)$로 일치한다.
