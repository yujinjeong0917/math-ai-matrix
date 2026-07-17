---
slug: cross-validation
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: 교차검증(k-fold)의 분산 감소
related: 
---

## 도입
홀드아웃 검증은 데이터를 딱 한 번만 나눠서 검증합니다. 그런데 어느 부분이 검증셋으로 뽑히느냐에 따라 추정한 성능이 운 좋게 좋거나 운 나쁘게 나쁠 수 있습니다. k-fold 교차검증은 데이터를 $k$개 조각으로 나눠 돌아가며 $k$번 검증한 뒤 평균을 냅니다. 이렇게 얻은 평균 추정치는 한 번짜리 홀드아웃보다 정말로 더 안정적일까요.

## 명제
각 폴드의 오차 추정치 $L_1,\dots,L_k$가 평균 $\mu$, 분산 $\sigma^2$, 서로 간 상관계수 $\rho$를 가질 때 $k$-fold 평균 $\bar L=\frac1k\sum_iL_i$의 분산은 $\mathrm{Var}(\bar L)=\rho\sigma^2+\frac{1-\rho}{k}\sigma^2$이며 이는 단일 홀드아웃의 분산 $\sigma^2$보다 항상 작거나 같다.

## 그림
<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="16" font-size="12" class="dg-dim">라운드</text>
  <text x="130" y="16" font-size="11">폴드1</text>
  <text x="190" y="16" font-size="11">폴드2</text>
  <text x="250" y="16" font-size="11">폴드3</text>
  <text x="310" y="16" font-size="11">폴드4</text>
  <text x="370" y="16" font-size="11">폴드5</text>
  <g>
    <text x="10" y="45" font-size="11">1</text>
    <rect x="120" y="26" width="55" height="26" class="dg-accent" stroke="none"/>
    <rect x="180" y="26" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="240" y="26" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="300" y="26" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="360" y="26" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
  </g>
  <g>
    <text x="10" y="89" font-size="11">2</text>
    <rect x="120" y="70" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="180" y="70" width="55" height="26" class="dg-accent" stroke="none"/>
    <rect x="240" y="70" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="300" y="70" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="360" y="70" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
  </g>
  <g>
    <text x="10" y="133" font-size="11">3</text>
    <rect x="120" y="114" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="180" y="114" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="240" y="114" width="55" height="26" class="dg-accent" stroke="none"/>
    <rect x="300" y="114" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="360" y="114" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
  </g>
  <g>
    <text x="10" y="177" font-size="11">4</text>
    <rect x="120" y="158" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="180" y="158" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="240" y="158" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="300" y="158" width="55" height="26" class="dg-accent" stroke="none"/>
    <rect x="360" y="158" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
  </g>
  <g>
    <text x="10" y="221" font-size="11">5</text>
    <rect x="120" y="202" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="180" y="202" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="240" y="202" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="300" y="202" width="55" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.2" stroke-dasharray="4,3"/>
    <rect x="360" y="202" width="55" height="26" class="dg-accent" stroke="none"/>
  </g>
  <text x="430" y="45" font-size="10" class="dg-dim">검증</text>
  <text x="430" y="52" font-size="10" class="dg-dim">(채움)</text>
</svg>

_5-fold 교차검증에서 매 라운드 정확히 한 조각(채운 칸)만 검증용으로 바뀌며 대각선을 따라 회전한다. 나머지는 점선 테두리의 학습 조각이다._

## 문제
지금 목표는 $\bar L$의 분산을 실제로 계산하는 것이다. 여러 확률변수를 더한 합의 분산을 구하려면 각 변수 자신의 분산뿐 아니라 서로 다른 변수끼리의 공분산까지 전부 더해야 한다는 분산의 일반 공식을 쓴다. $\mathrm{Cov}(L_i,L_j)=\rho\sigma^2$ ($i\neq j$)이고 $\mathrm{Var}(L_i)=\sigma^2$이다.

이 공식을 그대로 적용하면 $\mathrm{Var}\left(\sum_{i=1}^kL_i\right) = \sum_i\mathrm{Var}(L_i) + \sum_{i\neq j}\mathrm{Cov}(L_i,L_j) = $==빈칸== 이다.

## 해설
분산항은 $k$개이므로 $k\sigma^2$이다. 공분산항은 서로 다른 순서쌍 $(i,j)$의 개수만큼, 즉 $k(k-1)$개 있고 각각 $\rho\sigma^2$이므로 합쳐서 $k(k-1)\rho\sigma^2$이다.

**정답: $k\sigma^2 + k(k-1)\rho\sigma^2$**

## 예시
k-fold 평균이 정말로 홀드아웃보다 안정적인지 숫자를 넣어 확인해봅니다.

각 폴드의 오차 추정치가 분산 $\sigma^2=4$를 갖고 폴드끼리 상관계수 $\rho=0.2$ 정도로 겹친다고 하겠습니다. 폴드 수는 $k=5$입니다. 단일 홀드아웃의 분산은 그대로 $\sigma^2=4$입니다. 이제 5-fold 평균의 분산을 공식에 대입해봅니다.
$$\mathrm{Var}(\bar L) = \rho\sigma^2 + \frac{1-\rho}{k}\sigma^2 = 0.2\times4 + \frac{0.8}{5}\times4 = 0.8+0.64=1.44$$
$1.44$는 홀드아웃의 분산 $4$보다 훨씬 작습니다. 폴드끼리 겹치는 정도 $\rho$가 0에 더 가까웠다면 분산은 $\sigma^2/k=4/5=0.8$까지도 줄어들 수 있었습니다. 반대로 폴드들이 데이터를 완전히 겹쳐 쓴다면 $\rho\to1$이 되어 분산은 다시 $\sigma^2$에 가까워집니다. 아래 증명은 이 부등식 $\mathrm{Var}(\bar L)\le\sigma^2$이 특정 숫자에서만 성립하는 게 아니라 $\rho\le1$이기만 하면 항상 성립한다는 것을 보입니다.
