---
slug: gibbs-sampling-full-conditional
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: 깁스샘플링은 메트로폴리스-헤이스팅스의 특수사례다: 완전조건부분포와 수락확률 1
related: 메트로폴리스-헤이스팅스(일반형) · 대조발산(내부 MCMC로 깁스 사용)
---

## 도입
깁스샘플링은 다변수 목표분포 $\pi(x_1,\dots,x_d)$에서 표본을 뽑을 때, 매번 한 좌표 $x_i$만 완전조건부분포 $\pi(x_i\mid x_{-i})$에서 다시 뽑고 나머지 좌표는 그대로 두는 절차입니다. 실무에서는 이 방식이 '항상 수락되는' 특별한 알고리즘으로 알려져 있는데, 실제로 그런지 메트로폴리스-헤이스팅스의 틀 안에서 확인해볼 수 있습니다.

## 명제
상태 $x=(x_i,x_{-i})$에서 $i$번째 좌표에 대한 깁스 업데이트는 제안분포 $q(x'\mid x)=\pi(x_i'\mid x_{-i})\cdot\mathbb 1[x_{-i}'=x_{-i}]$를 쓰는 메트로폴리스-헤이스팅스와 같으며, 이때 메트로폴리스-헤이스팅스 수락확률은 항상 $\alpha(x,x')=1$이다.

## 그림
<svg viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="280" x2="400" y2="280" class="dg-line" stroke-width="1"/>
<line x1="40" y1="280" x2="40" y2="30" class="dg-line" stroke-width="1"/>
<text x="405" y="284" font-size="12" class="dg-dim">x₁</text>
<text x="30" y="26" font-size="12" class="dg-dim">x₂</text>
<ellipse cx="230" cy="160" rx="150" ry="90" transform="rotate(-28 230 160)" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="4,3"/>
<ellipse cx="230" cy="160" rx="100" ry="58" transform="rotate(-28 230 160)" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="4,3"/>
<ellipse cx="230" cy="160" rx="50" ry="28" transform="rotate(-28 230 160)" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="110" y1="255" x2="270" y2="255" class="dg-stroke-accent" stroke-width="2.5"/>
<circle cx="110" cy="255" r="4" class="dg-accent"/>
<circle cx="270" cy="255" r="4" class="dg-accent"/>
<line x1="270" y1="255" x2="270" y2="175" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="270" cy="175" r="4" class="dg-accent"/>
<line x1="270" y1="175" x2="195" y2="175" class="dg-stroke-accent" stroke-width="2.5"/>
<circle cx="195" cy="175" r="4" class="dg-accent"/>
<line x1="195" y1="175" x2="195" y2="128" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="195" cy="128" r="4" class="dg-accent"/>
<line x1="195" y1="128" x2="238" y2="128" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="238,128 228,124 228,132" class="dg-accent"/>
<text x="150" y="272" font-size="11" class="dg-dim">x₁ 갱신(실선)</text>
<text x="278" y="220" font-size="11" class="dg-dim">x₂ 갱신(점선)</text>
</svg>

_깁스샘플링은 한 좌표(실선, 수평 이동)와 다른 좌표(점선, 수직 이동)를 번갈아 완전조건부분포에서 다시 뽑아 등고선 중심으로 접근한다._

## 문제
목표분포를 연쇄법칙으로 분해하면 $\pi(x')=\pi(x_i',x_{-i})=$==빈칸==$\cdot\pi(x_{-i})$ 이다(단 $x'_{-i}=x_{-i}$이므로 주변분포 $\pi(x_{-i})$는 원래 상태와 공유된다).

## 해설
결합분포를 조건부분포×주변분포로 쓰면 $\pi(x_i',x_{-i})=\pi(x_i'\mid x_{-i})\pi(x_{-i})$가 돼요.

**정답: $\pi(x_i'\mid x_{-i})$**

## 예시
연속 사후분포 대신, 계산이 눈으로 보이는 작은 이산 결합분포로 확인합니다. 정규화되지 않은 결합분포를 $\tilde\pi(1,1)=1,\ \tilde\pi(1,2)=2,\ \tilde\pi(2,1)=3,\ \tilde\pi(2,2)=4$로 둡니다($Z=10$).

$x=1$로 고정했을 때 완전조건부분포는 $\tilde\pi(1,1)+\tilde\pi(1,2)=3$으로 정규화해서 $\pi(y=1\mid x=1)=1/3,\ \pi(y=2\mid x=1)=2/3$입니다.

현재 상태가 $(x,y)=(1,1)$이고 깁스 단계가 완전조건부에서 $y'=2$를 제안했다고 합시다. 이를 메트로폴리스-헤이스팅스 비율로 계산하면
$$\frac{\tilde\pi(1,2)\cdot\pi(y=1\mid x=1)}{\tilde\pi(1,1)\cdot\pi(y=2\mid x=1)}=\frac{2\cdot(1/3)}{1\cdot(2/3)}=\frac{2/3}{2/3}=1$$
로 정확히 1이 나옵니다. 정규화상수 $Z=10$은 계산 어디에도 등장하지 않는다는 점도 확인할 수 있습니다.
