---
slug: eckart-young-low-rank
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 에카르트-영 정리: SVD 절단이 최적의 저랭크 근사인 이유
related: 특이값분해(SVD) · 주성분분석(PCA)의 최적 방향
---

## 도입
행렬을 압축하려면 랭크를 낮춰야 합니다. 그런데 원래 행렬 $A$와 가장 가까우면서 랭크가 $k$ 이하인 행렬은 어떻게 찾을까요? 답은 놀랍도록 간단합니다. SVD에서 가장 큰 특이값 $k$개만 남기고 나머지를 0으로 자르면 됩니다. 이것이 에카르트-영(Eckart-Young) 정리입니다.

## 명제
$A=U\Sigma V^T=\sum_{i=1}^r\sigma_iu_iv_i^T$ ($\sigma_1\ge\cdots\ge\sigma_r>0$)이고 $k<r$이라 하자. $A_k:=\sum_{i=1}^k\sigma_iu_iv_i^T$라 두면, 랭크가 $k$ 이하인 모든 행렬 $B$ 중에서 $A_k$가 프로베니우스 노름 $\|A-B\|_F$를 최소화하며 그 최솟값은 $\|A-A_k\|_F=\sqrt{\sum_{i=k+1}^r\sigma_i^2}$이다. 이는 분산을 최대화하는 방향을 찾는 PCA의 논증과는 다른 증명 경로로, '가장 가까운 근사'라는 목표에서 직접 출발한다.

## 그림
<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="180" x2="440" y2="180" class="dg-line" stroke-width="1.5"/>
<line x1="50" y1="180" x2="50" y2="30" class="dg-line" stroke-width="1.5"/>
<rect x="70" y="50" width="30" height="130" class="dg-accent"/>
<rect x="115" y="90" width="30" height="90" class="dg-accent"/>
<rect x="160" y="120" width="30" height="60" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<rect x="205" y="150" width="30" height="30" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<rect x="250" y="165" width="30" height="15" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<line x1="150" y1="35" x2="150" y2="185" class="dg-stroke-ink" stroke-width="2"/>
<text x="100" y="30" font-size="12" text-anchor="middle">σ1,σ2 유지 (k=2)</text>
<text x="255" y="30" font-size="11" class="dg-dim" text-anchor="middle">σ3,σ4,... 절단 (점선)</text>
<text x="60" y="200" font-size="11">σ1</text>
<text x="105" y="200" font-size="11">σ2</text>
<text x="150" y="200" font-size="11">σ3</text>
<text x="195" y="200" font-size="11">σ4</text>
<text x="240" y="200" font-size="11">σ5</text>
<text x="330" y="80" font-size="13">A ≈ A_k</text>
<text x="330" y="100" font-size="12" class="dg-dim">‖A-A_k‖_F = √(Σ_{i&gt;k} σ_i²)</text>
</svg>

_상위 k개 특이값만 남기고 절단선 오른쪽(점선 막대)을 버리는 것이 최적의 저랭크 근사다._

## 문제
폰 노이만 대각합 부등식(von Neumann's trace inequality, 널리 알려진 보조정리로 여기서는 결과만 인용한다)에 따르면 같은 크기의 두 행렬의 내적은 $\operatorname{tr}(A^TB)\le$==빈칸== 로 위로 제한된다(특이값을 각각 내림차순으로 나열해 대응시킨 곱의 합).

## 해설
$B$의 특이값이 $k$개까지만 0이 아니므로 합이 $i=1$부터 $k$까지만 남습니다.

**정답: $\sum_{i=1}^k \sigma_i(A)\sigma_i(B)$**

## 예시
$A=\begin{pmatrix}2&2\\-1&1\end{pmatrix}$의 SVD는 $\sigma_1=2\sqrt2$, $\sigma_2=\sqrt2$, $u_1=(1,0)$, $v_1=(1,1)/\sqrt2$였습니다(특이값분해 문서 참고). 랭크-1 절단은
$$A_1=\sigma_1u_1v_1^T=2\sqrt2\begin{pmatrix}1\\0\end{pmatrix}\begin{pmatrix}1/\sqrt2&1/\sqrt2\end{pmatrix}=\begin{pmatrix}2&2\\0&0\end{pmatrix}$$
이고, 오차는
$$A-A_1=\begin{pmatrix}0&0\\-1&1\end{pmatrix},\qquad\|A-A_1\|_F=\sqrt{0^2+0^2+(-1)^2+1^2}=\sqrt2=\sigma_2$$
입니다. 정리대로 오차가 정확히 버려진 특이값 $\sigma_2=\sqrt2$와 일치합니다. 다른 어떤 랭크-1 행렬로 $A$를 근사해도 이보다 프로베니우스 노름을 더 줄일 수 없습니다.
