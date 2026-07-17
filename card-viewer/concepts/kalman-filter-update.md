---
slug: kalman-filter-update
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 칼만필터 업데이트: 정밀도 융합과 칼만이득의 유도
related: 우드베리 항등식
---

## 도입
사전 믿음과 새로운 측정값이 둘 다 가우시안이라면, 이 둘을 합친 사후 믿음도 가우시안이고 그 평균·공분산을 닫힌 형태로 계산할 수 있습니다. 두 가지 동치인 형태가 있는데, 하나는 '정밀도(공분산의 역)를 그냥 더하는' 직관적인 형태이고, 다른 하나는 실제 칼만필터 구현에서 쓰이는 '칼만이득' 형태입니다. 두 형태를 잇는 다리가 바로 우드베리 항등식(Schur complement)입니다.

## 명제
사전분포 $x\sim\mathcal N(m_0,P_0)$이고 측정모델이 $z=Hx+v$, $v\sim\mathcal N(0,R)$이라 하자. 사후분포 $p(x\mid z)$는 가우시안 $\mathcal N(m_1,P_1)$이고, 정밀도융합 형태로는 $P_1^{-1}=P_0^{-1}+H^TR^{-1}H$, $m_1=P_1(P_0^{-1}m_0+H^TR^{-1}z)$이며, 이는 칼만이득 $K:=P_0H^T(HP_0H^T+R)^{-1}$을 이용한 형태 $$m_1=m_0+K(z-Hm_0),\qquad P_1=(I-KH)P_0$$와 동치이다.

## 그림
<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="160" x2="450" y2="160" class="dg-dim" stroke-width="1"/>
<path d="M 60,160 Q 150,10 240,160" fill="none" class="dg-stroke-ink" stroke-width="1.8" stroke-dasharray="6,3"/>
<text x="100" y="45" font-size="11">사전 N(m0,P0)</text>
<path d="M 190,160 Q 280,60 370,160" fill="none" class="dg-line" stroke-width="1.8" stroke-dasharray="1,3"/>
<text x="300" y="90" font-size="11">측정 N(z,R)</text>
<path d="M 210,160 Q 275,25 340,160" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="245" y="20" font-size="12">사후 N(m1,P1) — 더 좁음</text>
</svg>

_사전분포와 측정분포를 곱하면 더 뾰족한(분산이 작은) 사후 가우시안이 된다._

## 문제
$x$에 대한 이차항 계수만 모으면 사후분포의 정밀도(공분산의 역)가 나오는데, 이는 $P_1^{-1}=$==빈칸== 이다(사전 정밀도와 측정이 주는 정밀도를 단순히 더한 것이라 '정밀도 융합'이라 부른다).

## 해설
가우시안 곱의 지수를 전개하면 이차항의 계수가 두 정밀도의 합으로 나옵니다.

**정답: $P_0^{-1} + H^T R^{-1} H$**

## 예시
$m_0=0$, $P_0=4$인 사전분포에 측정값 $z=3$, 측정잡음분산 $R=1$이 들어왔다고 합시다.

정밀도융합 형태로 계산하면 $P_1^{-1}=\frac14+1=\frac54$이므로 $P_1=0.8$이고, $m_1=P_1\big(\frac{0}{4}+\frac31\big)=0.8\times3=2.4$입니다.

칼만이득 형태로 계산하면 $K=\dfrac{P_0}{P_0+R}=\dfrac{4}{5}=0.8$이고, $m_1=0+0.8\times(3-0)=2.4$, $P_1=(1-0.8)\times4=0.8$로 정확히 같은 값을 얻습니다.
