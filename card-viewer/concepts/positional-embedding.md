---
slug: positional-embedding
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: 사인·코사인 위치 임베딩의 상대위치 선형성
hook: 트랜스포머는 순서 정보가 없는 구조라서 각 위치에 고유한 벡터인 위치 임베딩을 따로 더해줍니다.
---

## 기본설명
주파수 $\omega$에 대해 $s(pos)=\sin(\omega\,pos)$, $c(pos)=\cos(\omega\,pos)$라 하면 임의의 오프셋 $k$에 대해 $(s(pos+k),c(pos+k))$는 $pos$에 무관한 행렬 $M(k)$를 통해 $(s(pos),c(pos))$의 선형변환으로 표현된다.

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
