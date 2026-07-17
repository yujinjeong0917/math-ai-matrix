---
slug: instrumental-variables
theme: CAUSAL
domainLabel: 인과추론
subLabel: 도구변수 · 준실험
title: 도구변수(IV)의 식별 조건과 추정량
related: 
---

## 도입
처치 $T$가 결과에 함께 영향을 주는 오차 $U$와 상관되어 있으면(내생성), 단순 회귀는 $T$의 효과와 $U$의 효과를 뒤섞어 편향된 값을 냅니다. 도구변수 $Z$는 $T$에는 영향을 주지만 $U$와는 무관하고 $Y$에는 오직 $T$를 거쳐서만 영향을 주는 외부 변수예요. 이 성질을 이용하면 뒤섞인 효과에서 $T\to Y$ 부분만 걸러낼 수 있습니다.

## 명제
선형 상수효과 모형 $Y=\alpha+\beta T+U$ 를 생각하자. 도구 $Z$가 다음 세 조건을 만족한다고 하자: (i) 관련성 $\mathrm{Cov}(Z,T)\neq0$, (ii) 외생성 $\mathrm{Cov}(Z,U)=0$, (iii) 배제제약(exclusion restriction) — $Z$는 $Y$ 방정식에 직접 나타나지 않고 오직 $T$를 통해서만 $Y$에 영향을 준다. 그러면 $\beta = \mathrm{Cov}(Z,Y)/\mathrm{Cov}(Z,T)$ 이다.


## 문제
구조식 $Y=\alpha+\beta T+U$의 양변에 $Z$와의 공분산을 취한다. 공분산은 상수항에 대해서는 $0$이고 선형결합에 대해 분배되므로 $\mathrm{Cov}(Z,Y) = \mathrm{Cov}(Z,\alpha+\beta T+U) = $==빈칸== 이다.

## 해설
공분산은 상수항 $\alpha$에 대해서는 $\mathrm{Cov}(Z,\alpha)=0$이고, 나머지는 선형이라 그대로 분배돼요: $\mathrm{Cov}(Z,\alpha+\beta T+U)=\beta\,\mathrm{Cov}(Z,T)+\mathrm{Cov}(Z,U)$.

**정답: $\beta\,\mathrm{Cov}(Z,T)+\mathrm{Cov}(Z,U)$**

## 예시
추상적 증명 전에 4명짜리 작은 모집단으로 IV 추정량을 직접 계산해봅니다.

도구 $Z\in\{0,1\}$이 무작위로 배정되어 $U$와 무관하다고 합시다 ($Z=0,0,1,1$, 대응하는 $U=-1,1,-1,1$ — $Z$의 각 값에서 $U$의 평균이 $0$이 되도록 짝지어 외생성을 만족시켰습니다). 참 구조식은 $T=2+3Z+U$, $Y=5+2T+U$ (참 $\beta=2$) 라 합시다.
<table><tr><th>단위</th><th>$Z$</th><th>$U$</th><th>$T=2+3Z+U$</th><th>$Y=5+2T+U$</th></tr>
<tr><td>1</td><td>0</td><td>$-1$</td><td>$1$</td><td>$6$</td></tr>
<tr><td>2</td><td>0</td><td>$1$</td><td>$3$</td><td>$12$</td></tr>
<tr><td>3</td><td>1</td><td>$-1$</td><td>$4$</td><td>$12$</td></tr>
<tr><td>4</td><td>1</td><td>$1$</td><td>$6$</td><td>$18$</td></tr></table>
$\bar Z=0.5,\ \bar T=3.5,\ \bar Y=12$ 이고, 표본공분산(모집단 크기로 나눈 버전)을 계산하면
$$\mathrm{Cov}(Z,T) = \tfrac14\big[1.25+0.25+0.25+1.25\big] = 0.75,\qquad \mathrm{Cov}(Z,Y)=\tfrac14\big[3+0+0+3\big]=1.5$$
따라서 $\hat\beta_{IV}=\mathrm{Cov}(Z,Y)/\mathrm{Cov}(Z,T)=1.5/0.75=2$ 로 참값 $\beta=2$와 정확히 일치합니다. (참고로 $\mathrm{Cov}(T,U)$를 계산하면 $1$로 $0$이 아니라서, $T$가 실제로 $U$와 내생적으로 얽혀 있고 단순회귀라면 편향되었을 상황임을 확인할 수 있습니다.) 아래 증명은 이 일치가 우연이 아니라 세 조건이 갖춰지면 항상 성립하는 대수적 사실임을 보입니다.
