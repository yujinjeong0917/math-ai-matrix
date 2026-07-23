---
slug: tree-of-thoughts
theme: LLM
domainLabel: LLM/Agent
subLabel: 에이전트 설계 패턴
title: Tree of Thoughts: 여러 추론 경로를 트리로 펼쳐보고 고르기
related: Reflexion · Plan-and-Execute
---

## 도입
Tree of Thoughts는 문제 풀이 과정을 하나의 이어진 문장이 아니라 트리로 다룬다. 각 노드는 지금까지의 중간 추론 상태이고 한 노드에서 다음 단계로 넘어갈 때 모델이 여러 후보 다음 생각을 동시에 만들어낸다. 각 후보는 별도의 평가 단계에서 얼마나 가능성 있어 보이는지 점수를 받는다. 점수가 낮은 후보는 가지치기로 버려지고 남은 후보들만 다음 단계로 확장된다. 이 과정을 반복하며 너비 우선이나 깊이 우선 같은 탐색 전략으로 트리를 넓혀가다가 목표에 도달한 경로 중 가장 좋은 것을 최종 답으로 고른다.

이 방식은 하나의 연쇄만 따라가는 사고 방식의 한계를 메운다. 한 줄로 이어지는 추론은 한 번 잘못된 단계를 밟으면 되돌릴 방법이 없다. 앞 단계가 이미 다음 프롬프트에 그대로 들어가 버렸기 때문이다. Tree of Thoughts는 여러 경로를 동시에 열어두고 각 경로를 평가한 뒤 버릴 것은 버리기 때문에 초반의 실수를 나중에 고칠 기회가 생긴다. 전통적인 탐색 알고리즘이 하던 일을 언어모델의 추론 과정에 그대로 옮겨온 셈이다.

대가는 비용이다. 후보 수를 $b$개씩 매 단계 만들고 깊이 $d$까지 탐색하면 대략 $b^d$에 비례하는 만큼 모델 호출이 늘어난다. 그래서 실전에서는 후보 수와 탐색 깊이를 작게 제한하거나 평가 점수가 확실히 낮은 가지는 일찍 쳐내는 식으로 비용을 관리한다.

## 명제


## 그림
<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
<line x1="300" y1="44" x2="170" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="300" y1="44" x2="300" y2="110" class="dg-stroke-accent" stroke-width="2"/>
<line x1="300" y1="44" x2="430" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="300" y1="110" x2="230" y2="190" class="dg-line" stroke-width="1.5"/>
<line x1="300" y1="110" x2="370" y2="190" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="300" cy="30" r="16" class="dg-accent"/>
<circle cx="170" cy="110" r="12" class="dg-dim"/>
<circle cx="300" cy="110" r="12" class="dg-accent"/>
<circle cx="430" cy="110" r="12" class="dg-dim"/>
<circle cx="230" cy="190" r="10" class="dg-dim"/>
<circle cx="370" cy="190" r="10" class="dg-accent"/>
<text x="300" y="14" text-anchor="middle" font-size="12">시작</text>
<text x="170" y="140" text-anchor="middle" font-size="12" class="dg-dim">가지치기</text>
<text x="430" y="140" text-anchor="middle" font-size="12" class="dg-dim">가지치기</text>
<text x="230" y="215" text-anchor="middle" font-size="12" class="dg-dim">가지치기</text>
<text x="370" y="215" text-anchor="middle" font-size="12">최종 경로</text>
</svg>

_여러 후보 생각을 만들고 평가해 점수가 낮은 가지는 버리고 유망한 경로만 끝까지 확장한다._

## 문제
explanation에서 설명한 대로 매 단계마다 $b$개의 후보를 만들고 가지치기 없이 깊이 $d$까지 모두 펼쳐 평가한다고 하자. 깊이 $i-1$의 각 후보가 $b$개의 자식을 낳으므로 깊이 $i$에서 새로 생기는 후보 수는 $b^{i-1}$에 $b$를 곱한 $b^{i}$개이고, 따라서 깊이 $1$부터 $d$까지 만들어지는 후보를 모두 모델 호출로 센 총 횟수는 등비수열의 합 $\sum_{i=1}^{d} b^{i}$이다. 등비수열 합 공식 $a(r^{n}-1)/(r-1)$에 첫째항 $a=b$, 공비 $r=b$, 항 개수 $n=d$를 대입하면 이 총합은 ==빈칸== 이다.

## 해설
첫째항 b, 공비 b인 등비수열의 합 공식 a(r^n-1)/(r-1)에 그대로 대입하면 얻는 식이에요.

**정답: $\dfrac{b(b^{d}-1)}{b-1}$**

## 예시
목표: 4, 9, 10, 13 네 수로 24를 만들기.

첫 단계에서 모델은 후보 셋을 만든다. 13 빼기 9는 4, 10 더하기 4는 14, 13 더하기 4는 17. 각 후보를 평가해보면 13 빼기 9로 4를 만드는 경로가 남은 수 4 4 10과 함께 24를 만들기 가장 쉬워 보인다는 평가를 받는다. 나머지 두 후보는 가지치기로 버려진다.

남은 경로에서 4 곱하기 4는 16이고 16 더하기 10은 26이라 실패다. 10 빼기 4는 6이고 6 곱하기 4는 24라 성공이다. 이 경로가 최종 답으로 선택된다.
