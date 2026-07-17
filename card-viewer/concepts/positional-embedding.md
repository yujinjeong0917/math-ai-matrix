---
slug: positional-embedding
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 사인·코사인 위치 임베딩의 상대위치 선형성
related: 
---

## 도입
트랜스포머는 순서 정보가 없는 구조라서 각 위치에 고유한 벡터인 위치 임베딩을 따로 더해줍니다. 그런데 왜 학습되는 임베딩 표 대신 굳이 사인과 코사인이라는 주기함수를 쓸까요. 그 답은 이 함수들로 만든 임베딩이 상대적인 위치 차이를 순수하게 선형변환만으로 표현할 수 있다는 성질에 있습니다. 이 성질을 직접 확인해 봅니다.

## 명제
주파수 $\omega$에 대해 $s(pos)=\sin(\omega\,pos)$, $c(pos)=\cos(\omega\,pos)$라 하면 임의의 오프셋 $k$에 대해 $(s(pos+k),c(pos+k))$는 $pos$에 무관한 행렬 $M(k)$를 통해 $(s(pos),c(pos))$의 선형변환으로 표현된다.

## 그림
<svg viewBox="0 0 340 290" xmlns="http://www.w3.org/2000/svg">
<circle cx="160" cy="150" r="110" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<path d="M160,40 A110,110 0 0 1 270,150" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="6,3"/>
<circle cx="160" cy="40" r="5" class="dg-accent"/>
<circle cx="270" cy="150" r="5" class="dg-accent"/>
<text x="160" y="26" font-size="11" text-anchor="middle">pos=0</text>
<text x="288" y="154" font-size="11">pos+k</text>
<path d="M215,55 A110,110 0 0 1 255,205" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="6,3"/>
<rect x="209" y="49" width="12" height="12" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="249" y="199" width="12" height="12" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="192" y="42" font-size="11">pos=π/6</text>
<text x="264" y="222" font-size="11">pos+k</text>
<text x="80" y="278" font-size="11" class="dg-dim" text-anchor="middle">좌표는 (sin(ω·pos), cos(ω·pos))</text>
<text x="160" y="150" font-size="10" class="dg-dim" text-anchor="middle">두 호 모두 각도 ωk 회전 — pos와 무관</text>
</svg>

_서로 다른 위치 pos=0과 pos=π/6에서 출발해도 오프셋 k만큼의 회전은 항상 같은 각도이며, pos에 의존하지 않는다._

## 문제
$s(pos+k)=\sin(\omega(pos+k))$부터 전개한다. 괄호 안이 합으로 되어 있으니 삼각함수의 덧셈정리를 쓰는 것이 자연스럽다. 덧셈정리를 적용하면 $\sin(\omega(pos+k)) = \sin(\omega\,pos)\cos(\omega k) + $==빈칸== 이다.

## 해설
$\sin(A+B)=\sin A\cos B+\cos A\sin B$라는 표준 덧셈정리를 $A=\omega\,pos$, $B=\omega k$로 놓고 그대로 적용한 결과다.

**정답: $\cos(\omega\,pos)\sin(\omega k)$**

## 예시
회전행렬 하나가 위치와 상관없이 항상 같은 오프셋을 만들어내는지 두 위치에서 직접 확인해봅니다.

주파수 $\omega=1$, 오프셋 $k=\pi/2$로 둡니다. 이때 회전행렬은 $M(k)=\begin{pmatrix}\cos(\pi/2)&\sin(\pi/2)\\-\sin(\pi/2)&\cos(\pi/2)\end{pmatrix}=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$입니다.

**$pos=0$인 경우.** $(s(0),c(0))=(0,1)$이고 $M(k)$를 곱하면 $(0\cdot0+1\cdot1,\ -1\cdot0+0\cdot1)=(1,0)$입니다. 실제로 $(s(\pi/2),c(\pi/2))=(1,0)$이니 정확히 일치합니다.

**$pos=\pi/6$인 경우.** $(s(\pi/6),c(\pi/6))=(1/2,\ \sqrt3/2)$이고 $M(k)$를 곱하면 $(\sqrt3/2,\ -1/2)$입니다. 실제로 $pos+k=2\pi/3$에서 $(s(2\pi/3),c(2\pi/3))=(\sqrt3/2,-1/2)$이니 역시 정확히 일치합니다.

서로 다른 $pos$에서 출발했는데도 같은 행렬 $M(k)$ 하나로 오프셋 $k$만큼의 이동이 똑같이 재현됩니다. 아래 증명은 이 행렬이 임의의 $\omega$, $pos$, $k$에서도 언제나 $pos$와 무관하게 정의됨을 보입니다.
