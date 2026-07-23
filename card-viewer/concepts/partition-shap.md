---
slug: partition-shap
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 교란 기반 설명
title: Partition SHAP: 문장을 계층적으로 쪼개 Shapley값 근사하기
related: LIME for Text · TreeSHAP
---

## 도입
Shapley값은 원래 특징 $i$를 제외한 나머지 특징들의 모든 부분집합 $S$에 대해 $i$가 들어왔을 때와 안 들어왔을 때의 예측 차이를 조합 가짓수로 가중 평균한 값이다.

$\phi_i = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!\,(|N|-|S|-1)!}{|N|!}\big[f(S \cup \{i\}) - f(S)\big]$

특징이 $M$개면 이 합은 $2^{M}$에 가까운 항을 따져야 해서 문장 하나에도 감당하기 어렵다. Partition SHAP은 단어 전체를 계층적 클러스터링으로 이진트리로 묶어두고 이 트리 구조를 벗어나는 조합은 아예 따지지 않는다. 각 내부 노드에서는 그 노드가 가진 몫을 왼쪽 자식과 오른쪽 자식 두 그룹 사이에서만 나누는 두 참가자짜리 게임을 풀면 되고 이 계산을 자식 노드로 내려가며 재귀적으로 반복한다.

이렇게 하면 평가해야 하는 모델 호출 수가 지수적으로 늘던 것에서 트리의 깊이와 노드 수에 비례하는 수준으로 크게 줄어든다. 대신 트리가 실제 언어 구조를 잘 반영하지 못하면(엉뚱한 곳에서 문장을 둘로 쪼개면) 근사값이 정확한 Shapley값에서 벗어날 수 있다는 대가를 치른다. 이미지에서 슈퍼픽셀을 영역별로 계층적으로 묶어 처리하는 것과 같은 발상을 텍스트의 단어와 구 구조에 적용한 방법이라고 볼 수 있다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<text x="320" y="18" font-size="12" text-anchor="middle">이 영화는 정말 지루하고 별로였다</text>
<line x1="300" y1="26" x2="180" y2="66" class="dg-line" stroke-width="1.5"/>
<line x1="340" y1="26" x2="470" y2="66" class="dg-line" stroke-width="1.5"/>
<text x="160" y="80" font-size="12" text-anchor="middle">이 영화는 정말</text>
<text x="480" y="80" font-size="12" text-anchor="middle">지루하고 별로였다</text>
<line x1="140" y1="86" x2="90" y2="126" class="dg-line" stroke-width="1.5"/>
<line x1="180" y1="86" x2="230" y2="126" class="dg-line" stroke-width="1.5"/>
<line x1="460" y1="86" x2="410" y2="126" class="dg-line" stroke-width="1.5"/>
<line x1="500" y1="86" x2="550" y2="126" class="dg-line" stroke-width="1.5"/>
<circle cx="90" cy="122" r="4" class="dg-dim" stroke="none"/>
<circle cx="230" cy="122" r="4" class="dg-dim" stroke="none"/>
<circle cx="410" cy="122" r="4" class="dg-accent" stroke="none"/>
<circle cx="550" cy="122" r="4" class="dg-accent" stroke="none"/>
<text x="90" y="140" font-size="12" text-anchor="middle">이 영화는</text>
<text x="230" y="140" font-size="12" text-anchor="middle">정말</text>
<text x="410" y="140" font-size="12" text-anchor="middle">지루하고</text>
<text x="550" y="140" font-size="12" text-anchor="middle">별로였다</text>
<line x1="20" y1="170" x2="620" y2="170" class="dg-line" stroke-width="1"/>
<text x="320" y="192" font-size="12" text-anchor="middle" class="dg-dim">리프(단어) 단위까지 내려가며 좌우 분배를 반복해 기여도를 확정한다</text>
</svg>

_문장을 절반씩 재귀적으로 쪼개며 각 분기에서 좌우 그룹의 기여도를 나누고 마지막에 단어 단위 값을 얻는다._

## 문제
이 두 식을 더하면 $\phi_L+\phi_R = \frac12[v(\{L\})+v(\{R\})-2v(\emptyset)] + \frac12[2v(\{L,R\})-v(\{L\})-v(\{R\})]$이다. 우변을 전개해서 $v(\{L\})$과 $v(\{R\})$ 항을 정리하면 이 항들은 서로 정확히 상쇄되고, 남는 식은 ==빈칸== 뿐이다.

## 해설
우변에서 $\frac12v(\{L\})$과 $-\frac12v(\{L\})$, $\frac12v(\{R\})$과 $-\frac12v(\{R\})$이 각각 상쇄되고 $-v(\emptyset)$과 $v(\{L,R\})$만 남기 때문이에요.

**정답: $v(\{L,R\})-v(\emptyset)$**

## 예시
단어 8개짜리 문장의 정확한 Shapley값을 구하려면 대략 $2^8=256$가지 부분집합 조합을 따져야 한다. 이진트리로 절반씩 쪼개면 내부 노드는 $8-1=7$개가 되고 각 노드에서는 좌우 두 그룹의 조합 4가지(둘 다 없음, 왼쪽만, 오른쪽만, 둘 다)만 보면 되므로 대략 $7 \times 4=28$번의 모델 호출로 근사값을 얻을 수 있다. 정확도는 트리 구조가 실제 의미 단위를 얼마나 잘 반영하는지에 달려 있다.
