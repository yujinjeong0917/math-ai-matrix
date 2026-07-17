---
slug: maximum-mean-discrepancy
theme: INFO
domainLabel: 정보이론
subLabel: 발산 · 상호정보
title: 최대평균불일치(MMD): 커널 임베딩으로 분포를 구별하기
hook: 두 분포 $P,Q$가 같은지 다른지를 판정하고 싶은데, 표본만 있고 밀도함수는 모릅니다.
---

## 기본설명
커널 $k$의 RKHS를 $\mathcal H$, 특징사상을 $\varphi(x)=k(x,\cdot)$라 하고 평균임베딩을 $\mu_P=\mathbb E_{X\sim P}[\varphi(X)]$라 하자. $\mathrm{MMD}(P,Q):=\|\mu_P-\mu_Q\|_{\mathcal H}$ 로 정의하면, $k$가 특성커널(characteristic kernel)일 때 $$\mathrm{MMD}(P,Q)=0 \iff P=Q$$ 가 성립한다.

## 문제
제곱노름을 전개하면 $\|\mu_P-\mu_Q\|_{\mathcal H}^2=\langle\mu_P,\mu_P\rangle-2\langle\mu_P,\mu_Q\rangle+\langle\mu_Q,\mu_Q\rangle$ 이고, 각 내적에 재생성질을 적용하면 $\mathrm{MMD}^2(P,Q)=\mathbb E_{X,X'\sim P}[k(X,X')]-2\,\mathbb E_{X\sim P,Y\sim Q}[k(X,Y)]+$==빈칸== 이다.

## 해설
$\langle\mu_Q,\mu_Q\rangle=\mathbb E_{Y\sim Q}\mathbb E_{Y'\sim Q}\langle\varphi(Y),\varphi(Y')\rangle=\mathbb E_{Y,Y'\sim Q}[k(Y,Y')]$로, $Q$에서 독립적으로 두 번 뽑은 표본끼리의 커널값 기댓값이에요.

**정답: $\mathbb E_{Y,Y'\sim Q}[k(Y,Y')]$**

## 예시
왜 "특성커널"이라는 조건이 꼭 필요한지 반례로 확인해봅니다. $P$는 $\{-1,+1\}$에서 각각 확률 $0.5$, $Q$는 $\{-2,+2\}$에서 각각 확률 $0.5$인 분포라 하자. 둘 다 평균은 $0$이지만 분산은 각각 $1$과 $4$로 서로 다르다.

선형커널 $k(x,y)=xy$를 쓰면 특징사상은 $\varphi(x)=x$이므로 평균임베딩은 그냥 기댓값이다: $\mu_P=\mathbb E_P[X]=0=\mathbb E_Q[X]=\mu_Q$. 즉 $\mathrm{MMD}=0$인데도 $P\neq Q$이다 — 선형커널은 평균만 보고 분산 차이를 전혀 못 본다(특성커널이 아니다).

반면 가우시안(RBF) 커널 $k(x,y)=\exp(-0.5(x-y)^2)$을 쓰면 직접 계산했을 때 $\mathrm{MMD}^2(P,Q)\approx0.450>0$으로 두 분포의 차이를 정확히 잡아낸다(반면 $\mathrm{MMD}^2(P,P)=0$이다).
