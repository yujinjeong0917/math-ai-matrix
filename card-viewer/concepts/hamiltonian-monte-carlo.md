---
slug: hamiltonian-monte-carlo
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: 해밀토니안 몬테카를로(HMC): 립프로그 적분기의 부피보존과 가역성
related: 메트로폴리스-헤이스팅스(일반형)
---

## 도입
메트로폴리스-헤이스팅스는 무작위 행보(random walk) 제안을 쓰면 고차원에서 이동거리가 짧고 수락률도 낮아 비효율적입니다. 해밀토니안 몬테카를로(HMC)는 위치 $x$에 인공적인 운동량 $p$를 덧붙여, 물리학의 해밀토니안 역학을 따라 움직이게 함으로써 먼 거리를 높은 수락률로 이동합니다.

목표분포 $\pi(x)\propto e^{-U(x)}$에 대해 결합분포 $\pi(x,p)\propto e^{-H(x,p)}$, $H(x,p)=U(x)+\frac12 p^\top M^{-1}p$를 정의합니다($p$는 평균 0, 공분산 $M$인 보조 가우시안 변수). 해밀턴 방정식을 정확히 풀면 $H$가 보존되어 수락확률이 항상 1이 되지만, 실제로는 이산화된 립프로그(leapfrog) 적분기를 씁니다.

## 명제
스텝 크기 $\varepsilon$의 립프로그 적분기 $(x,p)\mapsto(x^*,p^*)$는 (i) 위상공간에서 부피를 보존하고(야코비안 행렬식이 $\pm1$), (ii) 운동량 부호를 뒤집으면 자기 자신의 역함수가 되는 가역적 사상이다. 이 두 성질 덕분에 립프로그 제안을 메트로폴리스 보정과 결합했을 때 수락확률은 $\alpha=\min(1,e^{-(H(x^*,p^*)-H(x,p))})$이며, 심플렉틱 적분기는 에너지 오차 $H(x^*,p^*)-H(x,p)$가 스텝 크기의 고차($O(\varepsilon^2)$)로만 커져 수락확률이 1에 가까워진다.

## 그림
<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="160" x2="370" y2="160" class="dg-line" stroke-width="1"/>
<line x1="200" y1="300" x2="200" y2="30" class="dg-line" stroke-width="1"/>
<text x="352" y="176" font-size="12" class="dg-dim">x(위치)</text>
<text x="206" y="42" font-size="12" class="dg-dim">p(운동량)</text>
<circle cx="200" cy="160" r="105" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="4,3"/>
<text x="200" y="55" font-size="11" text-anchor="middle" class="dg-dim">에너지 등고선 H=const(점선)</text>
<polygon points="305,160 274.3,85.7 200,55 125.7,85.7 95,160 125.7,234.3 200,265 274.3,234.3" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<rect x="301" y="156" width="8" height="8" class="dg-accent"/>
<rect x="270.3" y="81.7" width="8" height="8" class="dg-accent"/>
<rect x="196" y="51" width="8" height="8" class="dg-accent"/>
<rect x="121.7" y="81.7" width="8" height="8" class="dg-accent"/>
<rect x="91" y="156" width="8" height="8" class="dg-accent"/>
<rect x="121.7" y="230.3" width="8" height="8" class="dg-accent"/>
<rect x="196" y="261" width="8" height="8" class="dg-accent"/>
<rect x="270.3" y="230.3" width="8" height="8" class="dg-accent"/>
<polygon points="274.3,85.7 262,92 268,100" class="dg-accent"/>
<text x="205" y="300" font-size="11" class="dg-dim">립프로그 궤적(실선, 사각 = 스텝)</text>
</svg>

_립프로그 적분기는 위상공간의 에너지 등고선(점선)을 따라 사각 마커로 표시된 이산 스텝을 거쳐 부드럽게 돈다._

## 문제
예컨대 첫 부분단계 $(x,p)\mapsto(x,\,p-\frac\varepsilon2\nabla U(x))$의 야코비안 행렬은 $x$가 그대로 유지되므로 대각성분이 모두 $1$인 삼각행렬이 되고, 그 행렬식은 $\det = $==빈칸== 이다.

## 해설
삼각행렬의 행렬식은 대각성분의 곱인데, $\partial x/\partial x=1,\ \partial p^*/\partial p=1$이고 비대각 성분(이 경우 $\partial p^*/\partial x$)은 행렬식에 기여하지 않아요.

**정답: $1$**

## 예시
1차원 조화진동자 $U(x)=x^2/2$ (목표분포는 표준정규분포), 질량 $1$을 예로 립프로그 한 스텝을 직접 계산합니다. 초기값 $x_0=1,\ p_0=0$, 스텝 크기 $\varepsilon=1$로 놓습니다.
$$p_{1/2}=p_0-\tfrac{\varepsilon}{2}x_0=0-0.5\cdot1=-0.5,\qquad x_1=x_0+\varepsilon p_{1/2}=1+1\cdot(-0.5)=0.5$$
$$p_1=p_{1/2}-\tfrac{\varepsilon}{2}x_1=-0.5-0.5\cdot0.5=-0.75$$
해밀토니안 값은 $H_0=\frac12x_0^2+\frac12p_0^2=0.5$이고 $H_1=\frac12x_1^2+\frac12p_1^2=0.125+0.28125=0.40625$로, 큰 스텝 크기($\varepsilon=1$)임에도 에너지 오차는 $|H_1-H_0|\approx0.094$로 작습니다. 스텝을 더 잘게 쪼갤수록($\varepsilon\to0$) 이 오차는 $O(\varepsilon^2)$로 더 작아지고, 수락확률 $\min(1,e^{-(H_1-H_0)})$은 1에 더 가까워집니다.
