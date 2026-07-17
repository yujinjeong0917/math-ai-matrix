---
slug: gnn-message-passing
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 그래프 · 탐색
title: 그래프신경망 메시지패싱의 순열 등변성
related: 
---

## 도입
그래프 데이터는 벡터나 이미지와 달리 노드에 정해진 순서가 없다. 같은 그래프를 노드 번호만 다르게 매겨서 표현해도 사실은 같은 그래프다. 그래서 그래프신경망의 한 층은, 노드 순서를 뒤바꿔서 넣으면 출력도 정확히 같은 방식으로 뒤바뀌어 나와야 한다. 이 성질을 순열 등변성이라 부르며, GNN이 그래프라는 순서 없는 구조를 다루면서도 일관되게 작동하는 근본적인 이유다.

## 명제
순열행렬 $P$와 메시지패싱 층 $f(A,X)=\sigma(AXW)$에 대해 $f(PAP^T,PX) = Pf(A,X)$ 가 성립한다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="16" font-size="12" text-anchor="middle" class="dg-dim">원래 순서 (A,B,C)</text>
<line x1="150" y1="45" x2="90" y2="130" class="dg-line" stroke-width="1.5" />
<line x1="150" y1="45" x2="210" y2="130" class="dg-line" stroke-width="1.5" />
<circle cx="150" cy="35" r="16" fill="none" class="dg-stroke-accent" stroke-width="2" />
<circle cx="90" cy="140" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="210" cy="140" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="150" y="40" font-size="12" text-anchor="middle">A</text>
<text x="90" y="145" font-size="12" text-anchor="middle">B</text>
<text x="210" y="145" font-size="12" text-anchor="middle">C</text>
<text x="150" y="185" font-size="11" text-anchor="middle">f(A,X)=(5,1,1)ᵀ</text>
<line x1="290" y1="110" x2="410" y2="110" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3" />
<polygon points="410,110 400,105 400,115" class="dg-dim" />
<text x="350" y="100" font-size="11" text-anchor="middle">P (A↔B 재배열)</text>
<text x="550" y="16" font-size="12" text-anchor="middle" class="dg-dim">재배열 순서 (B,A,C)</text>
<line x1="550" y1="45" x2="490" y2="130" class="dg-line" stroke-width="1.5" />
<line x1="550" y1="45" x2="610" y2="130" class="dg-line" stroke-width="1.5" />
<circle cx="550" cy="35" r="16" fill="none" class="dg-stroke-accent" stroke-width="2" />
<circle cx="490" cy="140" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<circle cx="610" cy="140" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="550" y="40" font-size="12" text-anchor="middle">A</text>
<text x="490" y="145" font-size="12" text-anchor="middle">B</text>
<text x="610" y="145" font-size="12" text-anchor="middle">C</text>
<text x="550" y="185" font-size="11" text-anchor="middle">f(PAPᵀ,PX)=(1,5,1)ᵀ=Pf(A,X)</text>
</svg>

_같은 별 모양 그래프, 노드 이름만 맞바꿔도(A↔B) 출력값은 그대로 같은 방식으로 재배열된다._

## 문제
이 등식을 확인하려면 순열행렬 자체의 성질부터 짚어야 한다. 순열행렬은 각 행과 각 열에 1이 정확히 하나씩 있고 나머지 성분은 모두 0인 행렬이다. 이런 행렬은 자신의 전치행렬과 곱하면 항상 항등행렬이 되는 직교행렬이기도 하다.

즉 순열행렬 $P$는 ==빈칸==$=I$ 를 만족한다.

## 해설
순열행렬은 열들이 서로 다른 표준기저벡터라서 정규직교 집합을 이룬다. 그래서 $P^TP$를 계산하면 항등행렬이 나온다. 이는 직교행렬의 정의와 정확히 같다.

**정답: $P^TP$**

## 예시
등변성 등식을 보기 전에 노드 3개짜리 작은 그래프에 순서를 바꿔 넣어서 정말 결과가 같은 방식으로 바뀌는지 직접 계산해본다.

노드 $A,B,C$가 있고 $A$가 $B,C$ 둘 다와 연결된 별 모양 그래프를 쓴다. 특징은 $x_A=1,\ x_B=2,\ x_C=3$이고 $W=1$, $\sigma$는 항등함수로 둔다.
$$f(A,X)=AXW=(5,\ 1,\ 1)^T$$
이제 $A$와 $B$의 순서를 맞바꾸는 순열 $P$를 적용해본다. 노드 순서가 $(B,A,C)$로 바뀌면 특징도 $PX=(2,1,3)^T$로, 인접행렬도 그 순서에 맞게 $PAP^T$로 바뀐다.
$$f(PAP^T,PX)=(PAP^T)(PX)W=(1,\ 5,\ 1)^T$$
한편 원래 결과 $f(A,X)=(5,1,1)^T$의 성분을 그대로 같은 순서 $(B,A,C)$로 재배열한 $Pf(A,X)$도 정확히 $(1,5,1)^T$이다. 노드를 재배열해서 계산한 결과와 원래 결과를 재배열한 것이 똑같이 나온다. 아래 증명은 이 일치가 이 특정 그래프에서만 성립하는 게 아니라 임의의 그래프와 순열에서 항상 성립하는 사실임을 보인다.
