---
slug: multi-head-attention-concat
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 멀티헤드 어텐션: 왜 하나의 큰 어텐션 대신 여러 개의 작은 어텐션을 이어붙이는가
related: 소프트맥스 어텐션이 만드는 확률분포 · Transformer(2017) · Multi/Grouped-Query Attention
---

## 도입
셀프어텐션 한 번은 쿼리와 키의 내적으로 얻은 하나의 가중치 행렬 $A$로 값 벡터들을 섞습니다. 그런데 트랜스포머는 이 어텐션을 한 번만 쓰지 않고 차원을 쪼개 여러 헤드로 나눠 각자 독립적으로 계산한 다음 이어붙입니다. 총 파라미터 수는 크게 늘리지 않으면서 왜 굳이 이렇게 쪼갤까요. 답은 하나의 공유된 가중치 행렬 $A$로는 모든 쿼리가 오직 한 가지 방식으로만 값들을 섞을 수 있는 반면 헤드를 나누면 서로 다른 어텐션 패턴 여러 개를 동시에 표현할 수 있다는 데 있습니다.

## 명제
총 파라미터 수가 같을 때 $h$개의 헤드로 나눈 어텐션이 표현하는 함수족은 단일 헤드 어텐션이 표현하는 함수족을 진부분집합으로 포함한다.

## 그림
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
<text x="94" y="20" font-size="12" text-anchor="middle">단일 헤드: 공유된 A 하나</text>
<rect x="40" y="50" width="36" height="36" class="dg-accent"/>
<rect x="76" y="50" width="36" height="36" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="112" y="50" width="36" height="36" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="40" y="86" width="36" height="36" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="76" y="86" width="36" height="36" class="dg-accent"/>
<rect x="112" y="86" width="36" height="36" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="40" y="122" width="36" height="36" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="76" y="122" width="36" height="36" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="112" y="122" width="36" height="36" class="dg-accent"/>
<text x="94" y="180" font-size="11" class="dg-dim">모든 위치가 한 가지 방식으로만 섞임</text>
<text x="220" y="108" font-size="16" text-anchor="middle">≠</text>
<text x="428" y="20" font-size="12" text-anchor="middle">멀티헤드: 헤드마다 다른 패턴</text>
<rect x="300" y="50" width="32" height="32" class="dg-accent"/>
<rect x="332" y="50" width="32" height="32" class="dg-accent"/>
<rect x="364" y="50" width="32" height="32" class="dg-accent"/>
<rect x="300" y="82" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="332" y="82" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="364" y="82" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="300" y="114" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="332" y="114" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="364" y="114" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<text x="348" y="180" font-size="11" class="dg-dim">head₁: 앞쪽 위치에 집중</text>
<rect x="460" y="50" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="492" y="50" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="524" y="50" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<line x1="524" y1="50" x2="556" y2="82" class="dg-stroke-accent" stroke-width="2.5"/>
<rect x="460" y="82" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="492" y="82" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<line x1="492" y1="82" x2="524" y2="114" class="dg-stroke-accent" stroke-width="2.5"/>
<rect x="524" y="82" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="460" y="114" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<line x1="460" y1="114" x2="492" y2="146" class="dg-stroke-accent" stroke-width="2.5"/>
<rect x="492" y="114" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="524" y="114" width="32" height="32" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<text x="508" y="180" font-size="11" class="dg-dim">head₂: 반대 대각선에 집중</text>
</svg>

_하나의 공유된 어텐션 행렬은 한 가지 방식으로만 섞을 수 있지만, 헤드를 나누면 서로 다른 어텐션 패턴 여러 개를 동시에 표현할 수 있다._

## 문제
먼저 멀티헤드가 단일헤드를 특수한 경우로 포함하는지부터 봅니다. 모든 헤드의 쿼리, 키 가중치를 서로 다른 $A^{(j)}$ 대신 하나의 공통된 행렬 $A$를 공유하도록 고른다고 하겠습니다. 즉 $A^{(1)}=\cdots=A^{(h)}=A$라 하겠습니다. 그러면 각 헤드의 출력은 $\mathrm{head}_j=AXW_V^{(j)}$로 똑같은 $AX$가 왼쪽에 곱해진 형태가 됩니다. $h$개를 나란히 이어붙인 행렬은 모든 블록에 $AX$가 공통이므로 그 공통인수를 앞으로 뺄 수 있습니다. $[\mathrm{head}_1\ \cdots\ \mathrm{head}_h] = $==빈칸== 입니다.

## 해설
모든 헤드가 같은 $A$를 공유하므로 각 블록 $AXW_V^{(j)}$에서 $AX$가 공통입니다. 공통으로 곱해지는 인수를 블록마다 따로 두지 않고 앞으로 뺄 수 있으므로 $h$개의 블록을 나란히 이어붙인 것이 $AX$ 뒤에 $W_V^{(j)}$들을 나란히 이어붙인 것과 같아집니다.

**정답: $AX[W_V^{(1)}\ \cdots\ W_V^{(h)}]$**

## 예시
$d=4$, 헤드 수 $h=2$, 헤드당 차원 $d_h=d/h=2$로 둡니다. 먼저 파라미터 수를 셉니다.

단일헤드는 $W_Q,W_K,W_V,W_O$가 모두 $4\times4$ 행렬이므로 각각 $16$개씩 총 $4\times16=64$개의 파라미터를 씁니다.

멀티헤드는 각 헤드의 $W_Q^{(j)},W_K^{(j)},W_V^{(j)}$가 $4\times2$ 행렬이라 각각 $8$개씩 헤드 하나당 $3\times8=24$개를 씁니다. 헤드가 둘이니 $2\times24=48$개이고 마지막에 이어붙인 $4$차원 벡터를 다시 $4$차원으로 되돌리는 $W_O$가 $4\times4=16$개를 더합니다. 합치면 $48+16=64$개로 단일헤드와 정확히 같습니다.

이제 한 토큰에 대한 계산 결과를 직접 이어붙여봅니다. 헤드1의 출력이 $(0.7,-0.3)$이고 헤드2의 출력이 $(1.2,0.4)$라 하면 이어붙인 벡터는 $(0.7,-0.3,1.2,0.4)$입니다.

여기에 출력 사영행렬 $W_O=\begin{pmatrix}1&0&1&0\\0&1&0&1\\1&0&-1&0\\0&1&0&-1\end{pmatrix}$를 곱합니다.
$$W_O\begin{pmatrix}0.7\\-0.3\\1.2\\0.4\end{pmatrix}=\begin{pmatrix}0.7+1.2\\-0.3+0.4\\0.7-1.2\\-0.3-0.4\end{pmatrix}=\begin{pmatrix}1.9\\0.1\\-0.5\\-0.7\end{pmatrix}$$
네 개의 출력 성분 $(1.9,0.1,-0.5,-0.7)$ 각각에 두 헤드의 값이 $W_O$를 통해 섞여 들어갑니다. 이어붙이기 자체는 단순한 벡터 결합이지만 그 뒤에 곱해지는 $W_O$가 헤드별 정보를 다시 하나로 엮어내는 역할을 합니다. 아래 증명은 이렇게 헤드를 나눈 구조가 같은 파라미터 수의 단일헤드보다 표현할 수 있는 함수가 항상 많거나 같다는 사실을 보입니다.
