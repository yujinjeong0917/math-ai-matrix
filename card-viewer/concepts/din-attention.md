---
slug: din-attention
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 딥러닝 랭킹
title: DIN: 과거 행동에 어텐션을 걸어 관심사를 짚어내기
related: Wide&Deep · Transformer 기반 랭킹
---

## 도입
과거 행동 임베딩 $e_1,\dots,e_T$와 후보 아이템 임베딩 $e_c$가 있을 때 각 과거 행동의 가중치는 둘을 함께 보는 작은 신경망으로 계산됩니다.
$$a_t = f_{attn}(e_t, e_c)$$
보통 $[e_t,\ e_c,\ e_t-e_c,\ e_t\odot e_c]$를 입력으로 받습니다. 이 가중치로 가중합한 벡터가 이번 채점에서 쓸 사용자 표현입니다.
$$v_u = \sum_{t=1}^{T} a_t e_t$$
Wide&Deep을 비롯한 이전 딥러닝 랭킹 모델들은 이력을 평균이나 합으로 미리 풀링해서 하나의 고정 벡터로 만들었습니다. 이 벡터는 지금 채점하는 후보가 무엇인지와 무관하게 항상 같습니다. 등산화와 소설을 둘 다 산 사용자는 텐트를 채점할 때는 등산 취향으로, 책장을 채점할 때는 독서 취향으로 보여야 하는데 고정된 하나의 벡터로는 이 둘을 구분할 수 없습니다.

DIN의 가중치 $a_t$는 후보마다 새로 계산되기 때문에 $v_u$ 자체가 후보에 따라 달라집니다. 같은 사용자의 같은 이력이라도 어떤 아이템을 채점하느냐에 따라 다르게 반영됩니다. 여기서 쓰는 가중치는 Transformer의 셀프어텐션처럼 소프트맥스로 정규화해 전체 합을 1로 강제하지 않는 단순한 가중합 형태를 씁니다. 이력이 길 때 관련 있는 항목의 가중치가 서로 경쟁하며 억눌리는 것을 피하기 위한 설계입니다.

## 명제


## 그림
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<circle cx="60" cy="60" r="14" class="dg-dim"/>
<text x="60" y="90" font-size="11" text-anchor="middle">폰케이스</text>
<circle cx="150" cy="60" r="14" class="dg-accent"/>
<text x="150" y="90" font-size="11" text-anchor="middle">등산화</text>
<circle cx="240" cy="60" r="14" class="dg-dim"/>
<text x="240" y="90" font-size="11" text-anchor="middle">소설</text>
<circle cx="330" cy="60" r="14" class="dg-accent"/>
<text x="330" y="90" font-size="11" text-anchor="middle">텐트조명</text>
<text x="195" y="20" font-size="12" text-anchor="middle">사용자 과거 행동</text>
<rect x="470" y="130" width="100" height="40" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="520" y="154" font-size="12" text-anchor="middle">후보: 텐트</text>
<line x1="60" y1="74" x2="470" y2="140" class="dg-line" stroke-width="0.75"/>
<line x1="150" y1="74" x2="470" y2="140" class="dg-stroke-accent" stroke-width="3"/>
<line x1="240" y1="74" x2="470" y2="145" class="dg-line" stroke-width="0.75"/>
<line x1="330" y1="74" x2="470" y2="150" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="400" y="110" font-size="11" text-anchor="middle" class="dg-dim">굵을수록 어텐션 가중치 큼</text>
</svg>

_후보 아이템과 관련 있는 과거 행동일수록 굵은 연결로 더 큰 가중치를 받는다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
한 사용자의 클릭 이력에는 휴대폰 케이스도 있고 등산화도 있고 소설책도 있을 수 있습니다. 이 이력을 전부 평균 내서 사용자 벡터 하나로 뭉뚱그리면 그 벡터는 어느 관심사도 뚜렷이 대표하지 못하는 흐릿한 값이 됩니다. 지금 채점하려는 후보 아이템과 무관한 과거 행동까지 똑같은 비중으로 섞여 들어가기 때문입니다.

DIN은 이력을 미리 하나로 뭉치지 않습니다. 대신 후보 아이템이 바뀔 때마다 그 후보와 관련 있는 과거 행동에는 더 큰 가중치를, 무관한 행동에는 작은 가중치를 매겨 사용자 벡터를 그때그때 다시 만듭니다.


## 예시

