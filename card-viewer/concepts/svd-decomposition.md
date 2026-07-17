---
slug: svd-decomposition
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: 특이값분해(SVD): 임의의 행렬을 세 변환으로
related: 고유값분해(대칭행렬) · 무어-펜로즈 유사역행렬 · 에카르트-영 정리
---

## 도입
대칭행렬만 대각화할 수 있다는 사실은 아쉽습니다. 데이터 행렬처럼 정사각형도 아니고 대칭도 아닌 행렬이 훨씬 흔하니까요. 그런데 정사각·대칭이라는 조건 없이도, 임의의 행렬을 회전(또는 반사) — 축 방향으로 늘이거나 줄이기 — 다시 회전, 이렇게 세 단계로 분해할 수 있습니다. 이것이 특이값분해(SVD)입니다.

## 명제
임의의 행렬 $A\in\mathbb{R}^{m\times n}$에 대해 직교행렬 $U\in\mathbb{R}^{m\times m}$, $V\in\mathbb{R}^{n\times n}$와 대각성분이 $\sigma_1\ge\sigma_2\ge\cdots\ge0$인 대각행렬 $\Sigma\in\mathbb{R}^{m\times n}$이 존재하여 $A=U\Sigma V^T$로 쓸 수 있다. 이 분해는 $A$가 정사각행렬이거나 대칭일 필요가 전혀 없다는 점에서, 대칭행렬에서만 정의되는 고유대각화(eigen-diagonalization)와 근본적으로 다르다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<circle cx="90" cy="110" r="45" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="90" y1="65" x2="90" y2="155" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="45" y1="110" x2="135" y2="110" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<text x="60" y="185" font-size="12" text-anchor="middle">단위원</text>
<line x1="150" y1="110" x2="200" y2="110" class="dg-line" stroke-width="1.5"/>
<polygon points="200,110 190,105 190,115" class="dg-stroke-ink"/>
<text x="150" y="95" font-size="11">V^T (회전)</text>
<ellipse cx="330" cy="110" rx="45" ry="20" fill="none" class="dg-stroke-ink" stroke-width="2" transform="rotate(0 330 110)"/>
<line x1="285" y1="110" x2="375" y2="110" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="330" y1="90" x2="330" y2="130" class="dg-dim" stroke-width="1" stroke-dasharray="3,3"/>
<text x="330" y="185" font-size="12" text-anchor="middle">Σ (축방향 스케일링)</text>
<line x1="390" y1="110" x2="440" y2="110" class="dg-line" stroke-width="1.5"/>
<polygon points="440,110 430,105 430,115" class="dg-stroke-ink"/>
<text x="390" y="95" font-size="11">U (회전)</text>
<g transform="rotate(-25 570 110)">
<ellipse cx="570" cy="110" rx="45" ry="20" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
</g>
<text x="570" y="185" font-size="12" text-anchor="middle">최종 상 (=A×단위원)</text>
</svg>

_임의의 행렬 A는 회전(V^T) → 축방향 스케일링(Σ) → 다시 회전(U) 세 단계로 분해된다._

## 문제
스펙트럴 정리에 의해 $A^TA$는 정규직교 고유벡터 기저 $v_1,\dots,v_n$과 고유값 $\lambda_1\ge\cdots\ge\lambda_n\ge0$을 가진다. 특이값을 $\sigma_i=$==빈칸== 로 정의한다.

## 해설
특이값은 관례적으로 음이 아닌 값으로 정의하는데, $\lambda_i\ge0$이므로 제곱근을 취하면 됩니다.

**정답: $\sqrt{\lambda_i}$**

## 예시
추상적인 구성 논증에 들어가기 전에 2×2 행렬 하나로 SVD를 직접 손으로 계산해 봅니다.

$$A=\begin{pmatrix}2&2\\-1&1\end{pmatrix}$$

먼저 $A^TA$를 계산합니다.
$$A^TA=\begin{pmatrix}2&-1\\2&1\end{pmatrix}\begin{pmatrix}2&2\\-1&1\end{pmatrix}=\begin{pmatrix}5&3\\3&5\end{pmatrix}$$
이 대칭행렬의 고유값은 8과 2이고, 각각의 고유벡터는 $v_1=(1,1)/\sqrt2$, $v_2=(1,-1)/\sqrt2$입니다. 따라서 특이값은 $\sigma_1=\sqrt8=2\sqrt2$, $\sigma_2=\sqrt2$입니다. $u_i=Av_i/\sigma_i$로 계산하면 $u_1=(1,0)$, $u_2=(0,-1)$을 얻고, 실제로 $$U\Sigma V^T=\begin{pmatrix}1&0\\0&-1\end{pmatrix}\begin{pmatrix}2\sqrt2&0\\0&\sqrt2\end{pmatrix}\begin{pmatrix}1/\sqrt2&1/\sqrt2\\1/\sqrt2&-1/\sqrt2\end{pmatrix}=\begin{pmatrix}2&2\\-1&1\end{pmatrix}=A$$가 성립함을 확인할 수 있습니다.
