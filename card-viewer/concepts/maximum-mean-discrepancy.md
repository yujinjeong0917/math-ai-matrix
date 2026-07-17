---
slug: maximum-mean-discrepancy
theme: INFO
domainLabel: 정보이론
subLabel: 발산 · 상호정보
title: 최대평균불일치(MMD): 커널 임베딩으로 분포를 구별하기
related: 
---

## 도입
두 분포 $P,Q$가 같은지 다른지를 판정하고 싶은데, 표본만 있고 밀도함수는 모릅니다. MMD는 각 분포를 커널이 만드는 무한차원 공간(RKHS)의 한 점(평균 임베딩)으로 옮긴 뒤, 그 두 점 사이의 거리로 분포의 차이를 잽니다. 커널을 잘 고르면(특성커널) 이 거리가 0이라는 것과 두 분포가 같다는 것이 정확히 동치가 됩니다.

## 명제
커널 $k$의 RKHS를 $\mathcal H$, 특징사상을 $\varphi(x)=k(x,\cdot)$라 하고 평균임베딩을 $\mu_P=\mathbb E_{X\sim P}[\varphi(X)]$라 하자. $\mathrm{MMD}(P,Q):=\|\mu_P-\mu_Q\|_{\mathcal H}$ 로 정의하면, $k$가 특성커널(characteristic kernel)일 때 $$\mathrm{MMD}(P,Q)=0 \iff P=Q$$ 가 성립한다.

## 그림
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
<text x="90" y="20" font-size="12" class="dg-dim">입력공간</text>
<ellipse cx="90" cy="90" rx="55" ry="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="65" cy="80" r="3" class="dg-stroke-ink"/>
<circle cx="100" cy="95" r="3" class="dg-stroke-ink"/>
<circle cx="80" cy="105" r="3" class="dg-stroke-ink"/>
<text x="55" y="135" font-size="11">P</text>
<ellipse cx="90" cy="170" rx="60" ry="32" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<circle cx="60" cy="160" r="3" class="dg-accent"/>
<circle cx="110" cy="180" r="3" class="dg-accent"/>
<circle cx="75" cy="190" r="3" class="dg-accent"/>
<text x="55" y="215" font-size="11" class="dg-dim">Q</text>
<line x1="170" y1="120" x2="260" y2="120" class="dg-line" stroke-width="1.5"/>
<polygon points="260,120 248,114 248,126" class="dg-stroke-ink"/>
<text x="185" y="108" font-size="11">φ (커널 특징사상)</text>
<text x="330" y="20" font-size="12" class="dg-dim">RKHS (특징공간)</text>
<circle cx="330" cy="80" r="5" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<text x="340" y="75" font-size="11">μ_P</text>
<circle cx="430" cy="150" r="5" class="dg-accent"/>
<text x="440" y="150" font-size="11" class="dg-dim">μ_Q</text>
<line x1="330" y1="80" x2="430" y2="150" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="3,3"/>
<text x="345" y="120" font-size="11">‖μ_P−μ_Q‖ = MMD(P,Q)</text>
</svg>

_특징공간으로 옮긴 두 평균임베딩 사이의 거리가 MMD이며, 특성커널일 때만 이 거리가 분포의 동일성과 정확히 대응한다._

## 문제
제곱노름을 전개하면 $\|\mu_P-\mu_Q\|_{\mathcal H}^2=\langle\mu_P,\mu_P\rangle-2\langle\mu_P,\mu_Q\rangle+\langle\mu_Q,\mu_Q\rangle$ 이고, 각 내적에 재생성질을 적용하면 $\mathrm{MMD}^2(P,Q)=\mathbb E_{X,X'\sim P}[k(X,X')]-2\,\mathbb E_{X\sim P,Y\sim Q}[k(X,Y)]+$==빈칸== 이다.

## 해설
$\langle\mu_Q,\mu_Q\rangle=\mathbb E_{Y\sim Q}\mathbb E_{Y'\sim Q}\langle\varphi(Y),\varphi(Y')\rangle=\mathbb E_{Y,Y'\sim Q}[k(Y,Y')]$로, $Q$에서 독립적으로 두 번 뽑은 표본끼리의 커널값 기댓값이에요.

**정답: $\mathbb E_{Y,Y'\sim Q}[k(Y,Y')]$**

## 예시
왜 "특성커널"이라는 조건이 꼭 필요한지 반례로 확인해봅니다. $P$는 $\{-1,+1\}$에서 각각 확률 $0.5$, $Q$는 $\{-2,+2\}$에서 각각 확률 $0.5$인 분포라 하자. 둘 다 평균은 $0$이지만 분산은 각각 $1$과 $4$로 서로 다르다.

선형커널 $k(x,y)=xy$를 쓰면 특징사상은 $\varphi(x)=x$이므로 평균임베딩은 그냥 기댓값이다: $\mu_P=\mathbb E_P[X]=0=\mathbb E_Q[X]=\mu_Q$. 즉 $\mathrm{MMD}=0$인데도 $P\neq Q$이다 — 선형커널은 평균만 보고 분산 차이를 전혀 못 본다(특성커널이 아니다).

반면 가우시안(RBF) 커널 $k(x,y)=\exp(-0.5(x-y)^2)$을 쓰면 직접 계산했을 때 $\mathrm{MMD}^2(P,Q)\approx0.450>0$으로 두 분포의 차이를 정확히 잡아낸다(반면 $\mathrm{MMD}^2(P,P)=0$이다).
