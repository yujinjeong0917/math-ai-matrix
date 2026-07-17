---
slug: latent-space-geometry
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 기하 · 측도
title: 잠재공간의 기하: 직선보간은 측지선이 아니다
related: 
---

## 도입
VAE나 diffusion의 잠재공간에서 두 코드 $z_0,z_1$을 이을 때 흔히 직선으로 보간합니다. 그런데 디코더 $g$는 비선형함수라서 잠재공간의 직선이 출력공간에서도 최단경로로 이어진다는 보장은 없습니다. 잠재공간을 디코더가 당겨온 리만 다양체로 보면 이 사실을 정확히 확인할 수 있습니다.

## 명제
$g:\mathbb{R}^d\to\mathbb{R}^D$가 매끄러운 디코더이고 $z_{lin}(t)=(1-t)z_0+tz_1$이 직선보간일 때, 출력경로의 길이 $L[z_{lin}]=\int_0^1\|\frac{d}{dt}g(z_{lin}(t))\|dt$는 $g$가 이 구간에서 아핀이 아닌 한 $\|g(z_1)-g(z_0)\|$보다 항상 크다. 즉 $z_{lin}$은 측지선이 아니다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<text x="120" y="20" font-size="12" text-anchor="middle">잠재공간 z</text>
<line x1="60" y1="110" x2="180" y2="110" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="60" cy="110" r="4" class="dg-accent"/>
<circle cx="180" cy="110" r="4" class="dg-accent"/>
<text x="55" y="130" font-size="10">z₀</text>
<text x="175" y="130" font-size="10">z₁</text>
<text x="70" y="95" font-size="9" class="dg-dim">직선보간 z_lin(t)</text>
<line x1="230" y1="10" x2="230" y2="210" class="dg-line" stroke-width="1"/>
<text x="340" y="20" font-size="12" text-anchor="middle">출력공간 g(z)</text>
<path d="M270,150 Q345,20 420,90" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="270" cy="150" r="4" class="dg-accent"/>
<circle cx="420" cy="90" r="4" class="dg-accent"/>
<text x="260" y="170" font-size="10">g(z₀)</text>
<text x="415" y="75" font-size="10">g(z₁)</text>
<line x1="270" y1="150" x2="420" y2="90" class="dg-line" stroke-width="1.5" stroke-dasharray="3,3"/>
<text x="330" y="145" font-size="10" class="dg-dim">직선거리 ‖g(z₁)−g(z₀)‖</text>
<text x="290" y="45" font-size="10">직선보간의 상 (측지선 아님, 더 김)</text>
</svg>

_잠재공간의 직선보간은 비선형 디코더를 거치며 굽은 경로가 되어 최단경로보다 길어진다._

## 문제
$\mathbb{R}^D$의 임의의 두 점 $p,q$를 잇는 매끄러운 곡선 $\sigma(t)$($\sigma(0)=p,\sigma(1)=q$)의 길이는 항상 두 점 사이의 직선거리 이상이라는 사실은 삼각부등식에서 바로 나온다.

$\int_0^1\|\sigma'(t)\|dt \ge$==빈칸== 이다.

## 해설
곡선의 이동 벡터를 잘게 쪼개 다 더한 것이 곡선의 길이인데, 삼각부등식으로 이 합은 시작점과 끝점을 잇는 직선벡터의 길이보다 작을 수 없다. 곡선이 구불거릴수록 실제 이동거리는 직선거리보다 길어진다.

**정답: $\|q-p\|$**

## 예시
디코더가 비선형이면 직선보간이 최단경로가 아니라는 사실을 아주 단순한 곡선 하나로 확인해봅니다.

디코더를 $g(z)=(z,z^2)$이라 하고 $z_0=0$, $z_1=1$을 잇는 직선보간 $z_{lin}(t)=t$를 씁니다. 출력경로는 $g(z_{lin}(t))=(t,t^2)$로 포물선을 그립니다.

먼저 직선거리부터 봅니다.
$$\|g(z_1)-g(z_0)\|=\|(1,1)-(0,0)\|=\sqrt2\approx1.41421$$
실제 경로의 길이는 $\frac{d}{dt}g(z_{lin}(t))=(1,2t)$이므로 다음 적분입니다.
$$L=\int_0^1\sqrt{1+4t^2}\,dt\approx1.47895$$
$1.47895>1.41421$이니 포물선을 따라가는 실제 경로가 직선거리보다 확실히 더 깁니다. $g$가 직선이 아니라 곡선이기 때문에 생기는 초과분입니다.

아래 증명은 이 초과분이 이 포물선에서만 생기는 게 아니라 디코더가 아핀이 아닌 한 항상 나타난다는 사실을 일반적으로 보입니다.
