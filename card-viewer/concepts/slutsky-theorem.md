---
slug: slutsky-theorem
theme: STAT
domainLabel: 추론통계
subLabel: 점근이론
title: Slutsky 정리: 분포수렴과 확률수렴을 결합하는 규칙
hook: 점근이론에서는 한쪽 항은 정규분포 등으로 분포수렴하고 다른 쪽 항은 상수로 확률수렴하는 상황이 자주 나옵니다.
related: 델타법 · 중심극한정리
---

## 기본설명
$X_n\xrightarrow{d}X$이고 $Y_n\xrightarrow{p}c$ (상수)이면 다음이 성립한다: (a) $X_n+Y_n\xrightarrow{d}X+c$, (b) $X_nY_n\xrightarrow{d}cX$, (c) $c\ne0$이면 $X_n/Y_n\xrightarrow{d}X/c$.

## 문제
임의의 $\varepsilon>0$을 고정하자. 만약 $|Y_n-c|<\varepsilon$이면서 $X_n+Y_n\le x$라면 $X_n\le x-Y_n<x-c+\varepsilon$이 성립하므로, 사건 $\{X_n+Y_n\le x\}$는 $\{X_n\le x-c+\varepsilon\}$이거나 $\{|Y_n-c|\ge\varepsilon\}$인 경우에 포함된다. 따라서 확률의 부분가법성에 의해 $P(X_n+Y_n\le x)\le$==빈칸== 이다.

## 해설
사건이 두 사건의 합집합에 포함되면 그 확률은 두 사건 확률의 합보다 클 수 없습니다(부분가법성). 방금 확인한 포함관계를 그대로 확률에 옮긴 것입니다.

**정답: $P(X_n\le x-c+\varepsilon)+P(|Y_n-c|\ge\varepsilon)$**

## 예시
Slutsky 정리가 실무에서 가장 흔히 쓰이는 장면은 모표준편차 $\sigma$를 표본표준편차 $S_n$으로 대체하는 스튜던트화(studentization)입니다. 숫자로 그 효과를 먼저 확인해봅니다.

$\mu=10$, $\sigma=2$인 모집단에서 $n=100$인 표본을 뽑았더니 $\bar X_n=10.3$, $S_n=2.05$가 나왔다고 합시다.

$\sigma$를 알고 있다면 $X_n=\dfrac{\sqrt n(\bar X_n-\mu)}{\sigma}=\dfrac{10\times0.3}{2}=1.5$를 계산해 표준정규분포와 비교할 것입니다.

그런데 실제로는 $\sigma$를 모르므로 $S_n=2.05$로 대체한 $\dfrac{\sqrt n(\bar X_n-\mu)}{S_n}=\dfrac{10\times0.3}{2.05}\approx1.463$을 대신 씁니다. $S_n$이 $\sigma$에 확률적으로 가까워질수록($n\to\infty$일 때 $S_n\xrightarrow{p}\sigma$) 두 값의 차이는 점점 작아지고, Slutsky 정리는 $n\to\infty$일 때 이 대체가 극한분포를 표준정규분포 그대로 유지한다는 것을 보장해줍니다.
