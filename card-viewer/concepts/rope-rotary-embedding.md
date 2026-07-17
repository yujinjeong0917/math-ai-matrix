---
slug: rope-rotary-embedding
theme: LINALG
domainLabel: 선형대수
subLabel: 고유값 · 분해
title: RoPE: 회전행렬로 상대위치를 내적에 새겨넣기
hook: 사인 코사인 위치인코딩은 위치 정보를 토큰 임베딩에 더해서 주입합니다.
related: 사인 코사인 위치 임베딩의 상대위치 선형성 · Transformer(2017) · GPT 계열
---

## 기본설명
고정된 각도 $\theta$와 2차원 벡터 $q,k$에 대해 $\tilde q_m=R(m\theta)q$, $\tilde k_n=R(n\theta)k$라 하면 $\tilde q_m^\top\tilde k_n = q^\top R((n-m)\theta)k$이고 우변은 $m,n$ 각각이 아니라 오직 $n-m$에만 의존한다.

## 문제
회전행렬에는 두 가지 성질이 필요합니다. 첫째는 전치와 역행렬의 관계입니다. 회전행렬은 직교행렬이므로 전치가 곧 역행렬입니다. 각도 $\phi$만큼 돌린 회전을 되돌리는 역회전은 정확히 $-\phi$만큼 돌리는 것이므로 $R(\phi)^{-1}=R(-\phi)$입니다. 그러니 $R(\phi)^\top = $==빈칸== 입니다.

## 해설
직교행렬은 전치가 역행렬과 같다는 성질을 가집니다. 각도 $\phi$만큼 돌린 회전의 역회전은 $-\phi$만큼 돌리는 것이므로 $R(\phi)^{-1}=R(-\phi)$이고 결국 $R(\phi)^\top=R(-\phi)$가 됩니다.

**정답: $R(-\phi)$**

## 예시
각도 $\theta=60^\circ=\pi/3$을 고정하고 $q=(1,0)$, $k=(0,1)$이라는 단순한 벡터쌍으로 확인해봅니다. 회전행렬은 $R(\phi)=\begin{pmatrix}\cos\phi&-\sin\phi\\\sin\phi&\cos\phi\end{pmatrix}$입니다.

**$m=1$, $n=3$인 경우.** $m\theta=60^\circ$이므로 $\tilde q_1=R(60^\circ)q=(\cos60^\circ,\sin60^\circ)=(0.5,\ 0.8660)$입니다. $n\theta=180^\circ$이므로 $\tilde k_3=R(180^\circ)k=(0,-1)$입니다. 내적은 $\tilde q_1^\top\tilde k_3=0.5\times0+0.8660\times(-1)=-0.8660$입니다.

상대위치 공식으로도 확인해봅니다. $(n-m)\theta=2\times60^\circ=120^\circ$이므로 $q^\top R(120^\circ)k=(1,0)\begin{pmatrix}-0.5&-0.8660\\0.8660&-0.5\end{pmatrix}\begin{pmatrix}0\\1\end{pmatrix}=(1,0)\begin{pmatrix}-0.8660\\-0.5\end{pmatrix}=-0.8660$으로 정확히 같습니다.

**$m=6$, $n=8$인 경우.** 상대위치는 여전히 $n-m=2$입니다. $m\theta=360^\circ$이므로 $R(360^\circ)=I$이고 $\tilde q_6=q=(1,0)$입니다. $n\theta=480^\circ$인데 $480^\circ-360^\circ=120^\circ$이므로 $R(480^\circ)=R(120^\circ)$이고 $\tilde k_8=R(120^\circ)k=(-0.8660,-0.5)$입니다. 내적은 $\tilde q_6^\top\tilde k_8=1\times(-0.8660)+0\times(-0.5)=-0.8660$으로 앞의 경우와 완전히 같습니다.

$m,n$의 실제 값은 $1,3$에서 $6,8$로 전부 바뀌었지만 차이가 $2$로 같으니 내적값도 정확히 같게 나왔습니다. 아래 증명은 이 일치가 우연이 아니라 임의의 $m,n,\theta$에서 항상 성립하는 사실임을 보입니다.
