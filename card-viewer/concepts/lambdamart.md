---
slug: lambdamart
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 랭킹 모델
title: LambdaMART: 순위 변화량을 그래디언트로 바꾸기
related: GBDT 랭킹
---

## 도입
순서가 뒤바뀐 두 아이템 $i$, $j$ 사이의 람다는 다음과 같이 정의됩니다.
$$\lambda_{ij} = -\frac{\sigma}{1+e^{\sigma(s_i-s_j)}}\left|\Delta \mathrm{NDCG}_{ij}\right|$$
$s_i$, $s_j$는 현재 모델이 매긴 점수이고 $|\Delta \mathrm{NDCG}_{ij}|$는 두 아이템의 순위를 맞바꿨을 때 NDCG가 바뀌는 크기입니다. 상위권에서 일어나는 스왑은 이 값이 크고 아무도 잘 보지 않는 하위권 스왑은 이 값이 작습니다. 그래서 그래디언트가 저절로 순위 지표에 실제로 영향을 주는 쌍에 집중됩니다.

포인트별 손실은 모든 아이템의 오차를 똑같은 비중으로 줄이려 합니다. 상위권 순서를 바로잡는 것과 하위권 순서를 바로잡는 것을 구분하지 못한 채 학습 노력을 고르게 흩뿌립니다. LambdaMART는 이 문제를 순위쌍 단위로 재정의해서 고칩니다.

한 아이템의 최종 람다는 그 아이템과 짝지어지는 모든 쌍의 람다를 더한 값입니다.
$$\lambda_i = \sum_j \lambda_{ij}$$
이 값을 일반적인 부스팅의 그래디언트처럼 취급해 트리를 학습시킵니다. MART가 여러 회귀트리를 더하는 부스팅 뼈대를 제공하고 람다가 순위를 고려한 그래디언트를 제공하는 조합입니다.

## 명제


## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="20" font-size="13" text-anchor="middle">상위권 스왑</text>
<rect x="60" y="35" width="180" height="30" class="dg-accent"/>
<text x="150" y="55" font-size="12" text-anchor="middle">1위: 아이템 B</text>
<rect x="60" y="70" width="180" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="150" y="90" font-size="12" text-anchor="middle">2위: 아이템 A</text>
<path d="M250,50 C 280,50 280,85 250,85" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="300" y="72" font-size="12">스왑하면</text>
<text x="300" y="90" font-size="12" class="dg-accent">|ΔNDCG| 큼</text>
<text x="450" y="150" font-size="13" text-anchor="middle">하위권 스왑</text>
<rect x="380" y="165" width="140" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="450" y="183" font-size="11" text-anchor="middle">39위: 아이템 C</text>
<rect x="380" y="195" width="140" height="26" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="450" y="213" font-size="11" text-anchor="middle">40위: 아이템 D</text>
<text x="450" y="240" font-size="12" text-anchor="middle" class="dg-dim">|ΔNDCG| 작음</text>
</svg>

_상위권에서 순서가 뒤집히면 NDCG가 크게 변하므로 그래디언트도 거기에 집중된다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
GBDT를 클릭확률 같은 포인트별 손실로 학습하면 손실이 낮아도 순위 자체는 나쁠 수 있습니다. 1위여야 할 아이템의 점수를 살짝 틀리는 것과 40위쯤 되는 아이템의 점수를 살짝 틀리는 것은 순위표 품질에 미치는 영향이 전혀 다른데 포인트별 손실은 이 차이를 모릅니다.

LambdaMART는 각 트리가 무엇을 고쳐야 하는지를 아예 다르게 정의합니다. 점수를 더 정확히 맞추라고 하는 대신 두 아이템의 순서를 바꾸면 NDCG가 얼마나 좋아지는지를 직접 그래디언트로 씁니다.


## 예시
두 아이템의 현재 점수가 $s_i=2.0$, $s_j=1.0$이고 $\sigma=1$이라 하겠습니다. 시그모이드 항은 $\dfrac{1}{1+e^{s_i-s_j}} = \dfrac{1}{1+e^{1}} \approx 0.269$입니다. 두 아이템이 1위와 5위처럼 상위권에 있어서 $|\Delta \mathrm{NDCG}_{ij}|\approx 0.4$라면 이 쌍의 크기는 $0.269\times0.4\approx 0.108$입니다. 같은 점수차라도 두 아이템이 39위와 40위에 있어서 $|\Delta \mathrm{NDCG}_{ij}|\approx 0.01$이라면 크기는 $0.269\times0.01\approx 0.003$으로 훨씬 작아집니다.
