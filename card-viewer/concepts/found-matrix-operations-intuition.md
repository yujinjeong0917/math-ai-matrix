---
slug: found-matrix-operations-intuition
theme: FOUND
domainLabel: 예비수학
subLabel: 예비수학 2순위 · 행렬곱·항등행렬·역행렬
title: 행렬 연산과 역행렬의 직관
related: 행렬식과 가역성의 동치 (det(A)≠0 ⟺ 자명해) · 비선형성 없는 순전파의 붕괴 · 벡터의 기하적 의미
---

## 도입
행렬을 처음 배우면 대부분 숫자를 표 모양으로 늘어놓고 곱하는 계산 규칙부터 외우게 돼요. 그런데 그 계산이 실제로 무엇을 하는 건지는 잘 안 다뤄요. 2015 개정 교육과정에서는 행렬이 고등학교에서 아예 빠졌다가 2022 개정부터 공통수학1로 돌아와 다시 전원 필수가 됐는데, 그 사이 세대는 행렬을 학교에서 배운 적이 없고 최근 세대도 계산 절차 위주라 '왜' 부분은 얕은 경우가 많아요.

행렬을 가장 유용하게 보는 방법은 숫자표가 아니라 변환(transformation)으로 보는 거예요. 행렬 $A$를 벡터 $x$에 곱하는 $Ax$는 $x$라는 점을 다른 위치로 옮기는 함수 하나를 적용한 것과 같아요. 그래서 두 행렬을 곱한 $AB$는 "$B$라는 변환을 먼저 하고 그 다음 $A$라는 변환을 적용하는" 함수 합성과 정확히 같은 뜻이에요.

항등행렬 $I$는 아무것도 안 바꾸는 변환이고, 역행렬 $A^{-1}$이 존재한다는 건 $A$라는 변환을 적용한 다음 $A^{-1}$을 적용하면 정확히 원래 자리로 돌아온다는 뜻이에요. 즉 $A$가 정보를 하나도 잃지 않고 되돌릴 수 있는 변환이라는 거예요. 반대로 역행렬이 없는 행렬은 서로 다른 두 점을 같은 곳으로 눌러버려서 결과만 보고는 원래 자리를 복원할 방법이 없어요.

이 감각이 없으면 신경망의 순전파 $Wx+b$는 그냥 숫자를 곱하고 더하는 기계적 계산으로만 보여요. 변환의 관점으로 보면 $Wx+b$는 입력 벡터 $x$를 가중치 $W$가 정의하는 새 공간으로 옮기고 편향 $b$만큼 평행이동하는, 아주 자연스러운 절차예요.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<rect x="60" y="80" width="100" height="100" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="110" y="135" font-size="13" text-anchor="middle">단위</text>
<text x="110" y="152" font-size="13" text-anchor="middle">정사각형</text>
<polygon points="520,80 620,80 600,180 500,180" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="560" y="135" font-size="13" text-anchor="middle">평행사변형</text>
<path d="M 170 100 Q 340 55 495 100" fill="none" class="dg-stroke-ink" stroke-width="1.8"/>
<polygon points="495,100 483,95 483,105" class="dg-stroke-ink"/>
<text x="330" y="55" font-size="13" text-anchor="middle">A</text>
<path d="M 500 160 Q 340 210 170 160" fill="none" class="dg-line" stroke-width="1.8" stroke-dasharray="6,3"/>
<polygon points="170,160 182,155 182,165" class="dg-line"/>
<text x="330" y="222" font-size="13" text-anchor="middle" class="dg-dim">A⁻¹</text>
</svg>

_행렬 A는 정사각형을 평행사변형으로 보내고, 역행렬 A⁻¹은 그 변환을 되돌려 원래 자리로 돌아온다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
행렬을 곱하는 건 공간을 변형하는 함수를 적용하는 것과 같고, 역행렬이 있다는 건 그 변형을 정보 손실 없이 되돌릴 수 있다는 뜻이에요. 신경망의 $Wx+b$도 결국 이 변환을 층마다 반복해서 쌓는 것뿐이에요.


## 예시
$A=\begin{pmatrix}2&1\\1&1\end{pmatrix}$라는 변환과 벡터 $x=(3,1)$을 놓고 $Ax$를 직접 계산해볼게요.
$$Ax = \begin{pmatrix}2&1\\1&1\end{pmatrix}\begin{pmatrix}3\\1\end{pmatrix} = \begin{pmatrix}2\times3+1\times1\\1\times3+1\times1\end{pmatrix} = \begin{pmatrix}7\\4\end{pmatrix}$$
$x=(3,1)$이 $Ax=(7,4)$로 옮겨졌어요. 이제 이 변환을 되돌리는 역행렬을 구해볼게요. $A$의 행렬식은 $2\times1-1\times1=1$이니까 $0$이 아니고, 그래서 역행렬이 존재해요.
$$A^{-1} = \frac{1}{1}\begin{pmatrix}1&-1\\-1&2\end{pmatrix} = \begin{pmatrix}1&-1\\-1&2\end{pmatrix}$$
이 $A^{-1}$을 방금 옮겨진 결과 $(7,4)$에 다시 곱해서 원래 자리로 돌아오는지 확인해볼게요.
$$A^{-1}(Ax) = \begin{pmatrix}1&-1\\-1&2\end{pmatrix}\begin{pmatrix}7\\4\end{pmatrix} = \begin{pmatrix}1\times7-1\times4\\-1\times7+2\times4\end{pmatrix} = \begin{pmatrix}3\\1\end{pmatrix}$$
정확히 처음 벡터 $x=(3,1)$로 돌아왔어요. $A$라는 변환이 $x$를 어디로 보냈든, $A^{-1}$을 적용하면 그 정보를 잃지 않고 정확히 되짚어 갈 수 있다는 뜻이에요. 만약 $A$의 행렬식이 $0$이었다면 서로 다른 두 벡터를 같은 곳으로 겹쳐 보냈을 거고, 그러면 결과만 보고는 원래 어디서 왔는지 구별할 방법이 없어져요.
