---
slug: interleaving
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 오프라인-온라인 지표 괴리
title: Interleaving: 두 랭킹을 섞어서 실제 클릭으로 우열 가리기
related: 지표 괴리 · Replay 평가
---

## 도입
가장 널리 쓰는 방식은 team-draft interleaving이다. 스포츠 팀을 짤 때 번갈아 선수를 뽑는 것처럼 동전을 던져 이번 자리는 A 목록에서 채울지 B 목록에서 채울지를 정하고 아직 최종 목록에 없는 아이템 중 해당 목록의 최상위 아이템을 가져온다. 같은 아이템이 A, B 양쪽 상위권에 있으면 한 번만 채택하고 다음 자리로 넘어간다. 이렇게 만든 하나의 통합 목록을 사용자에게 보여주되 각 아이템이 A팀 소속인지 B팀 소속인지는 내부적으로 기록해둔다.

사용자가 클릭을 하면 그 클릭이 A팀 아이템에서 나왔는지 B팀 아이템에서 나왔는지를 집계한다. 여러 사용자에 걸쳐 A팀 클릭 수와 B팀 클릭 수를 비교해 어느 쪽이 더 많은 클릭을 받았는지로 승패를 정한다. 동전을 던져 어느 팀이 먼저 뽑을지를 매번 무작위로 정하기 때문에 항상 먼저 뽑는 쪽이 유리해지는 위치 편향이 상쇄된다.

balanced interleaving처럼 두 팀의 기여도를 더 세밀하게 맞추는 변형도 있지만 핵심 아이디어는 같다. 같은 노출 기회 안에서 두 랭킹을 직접 경쟁시켜 클릭이라는 실제 행동으로 우열을 가리는 것이다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<text x="30" y="18" font-size="12" class="dg-dim">랭킹 A</text>
<rect x="30" y="28" width="90" height="26" class="dg-dim"/><text x="75" y="45" text-anchor="middle" font-size="11">a1</text>
<rect x="30" y="58" width="90" height="26" class="dg-dim"/><text x="75" y="75" text-anchor="middle" font-size="11">a2</text>
<rect x="30" y="88" width="90" height="26" class="dg-dim"/><text x="75" y="105" text-anchor="middle" font-size="11">a3</text>
<text x="270" y="18" font-size="12" class="dg-dim">랭킹 B</text>
<rect x="270" y="28" width="90" height="26" class="dg-dim"/><text x="315" y="45" text-anchor="middle" font-size="11">b1</text>
<rect x="270" y="58" width="90" height="26" class="dg-dim"/><text x="315" y="75" text-anchor="middle" font-size="11">b2</text>
<rect x="270" y="88" width="90" height="26" class="dg-dim"/><text x="315" y="105" text-anchor="middle" font-size="11">b3</text>
<text x="460" y="18" font-size="12">통합 목록</text>
<rect x="460" y="28" width="90" height="26" class="dg-accent"/><text x="505" y="45" text-anchor="middle" font-size="11">a1</text>
<rect x="460" y="58" width="90" height="26" fill="none" class="dg-stroke-accent" stroke-width="2"/><text x="505" y="75" text-anchor="middle" font-size="11">b1</text>
<rect x="460" y="88" width="90" height="26" class="dg-accent"/><text x="505" y="105" text-anchor="middle" font-size="11">a2</text>
<rect x="460" y="118" width="90" height="26" fill="none" class="dg-stroke-accent" stroke-width="2"/><text x="505" y="135" text-anchor="middle" font-size="11">b2</text>
<text x="505" y="165" text-anchor="middle" font-size="11" class="dg-dim">채워진 칸 = A팀, 테두리만 = B팀</text>
<text x="505" y="182" text-anchor="middle" font-size="11" class="dg-dim">클릭이 어느 팀 칸에서 나왔는지로 승패 결정</text>
</svg>

_동전을 던져 각 자리를 A 또는 B 목록에서 채우고 실제 클릭으로 승패를 가른다._

## 문제
동전이 공평(fair)하므로 $P(A\text{ 선공}) = P(B\text{ 선공}) =$==빈칸== 이다.

## 해설
동전이 공평하다는 가정에서 두 결과가 나올 확률은 같아야 하고 그 합이 1이므로 각각 1/2이에요.

**정답: $\dfrac{1}{2}$**

## 예시
100명의 사용자에게 interleaving 결과를 보여줬더니 A팀 아이템에서 나온 클릭이 62회, B팀 아이템에서 나온 클릭이 38회였다고 하자. 총 클릭 100회 중 A팀 비율이 62%로 B팀보다 뚜렷하게 높으므로 이 실험에서는 랭킹 A가 더 우수하다고 판단한다. 같은 차이를 순수 A/B 테스트로 확인하려면 사용자 간 편차 때문에 훨씬 많은 트래픽이 필요했을 것이다.
