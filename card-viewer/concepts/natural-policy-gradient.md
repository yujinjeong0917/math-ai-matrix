---
slug: natural-policy-gradient
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 기하 · 측도
title: 자연정책경사: 신뢰영역 아래에서의 라그랑주 방향
hook: 정책을 개선할 때 그냥 그래디언트 $\nabla J(\theta)$ 방향으로 움직이면, natural-gradient-fisher 항목에서 본 것처럼 파라미터공간의 작은 걸음이 분포공간에서는 방향에 따라 다르게 부풀려질 수 있습니다.
---

## 기본설명
$\max_{d\theta} \nabla J(\theta)^Td\theta\ \text{s.t.}\ \frac12d\theta^TF(\theta)d\theta\le\epsilon$ 의 최적해 방향은 $d\theta^* \propto F(\theta)^{-1}\nabla J(\theta)$이다.

## 문제
이건 lagrange-kkt 항목에서 다룬 것과 똑같은 형태의 제약 최적화다. 라그랑주 승수 $\lambda\ge0$을 도입해서 제약을 등호로 정리한 식에 곱해 목적함수에 더한다.

$\mathcal{L}(d\theta,\lambda) = \nabla J(\theta)^Td\theta - \lambda($==빈칸==$)$ 이다.

## 해설
제약 $\frac12d\theta^TF(\theta)d\theta\le\epsilon$을 등호가 지켜지는 형태로 바꾸면 $\frac12d\theta^TF(\theta)d\theta-\epsilon\le0$이다. lagrange-kkt 항목과 같은 방식으로 이 식에 벌점 계수를 곱해 목적함수에 더한 것이다.

**정답: $\frac12d\theta^TF(\theta)d\theta - \epsilon$**

## 예시
피셔정보행렬이 그래디언트 방향을 실제로 어떻게 바꾸는지 대각행렬 하나로 확인해봅니다.
$$F(\theta)=\begin{pmatrix}4&0\\0&1\end{pmatrix},\qquad \nabla J(\theta)=\begin{pmatrix}1\\1\end{pmatrix}$$
그냥 그래디언트를 따라간다면 방향은 $(1,1)$이라 두 파라미터를 똑같은 비중으로 움직입니다. 그런데 첫째 파라미터는 곡률이 $4$로 커서 조금만 움직여도 분포가 크게 바뀌는 방향입니다.

자연그래디언트 방향은 $F(\theta)^{-1}\nabla J(\theta)$입니다.
$$F(\theta)^{-1}\nabla J(\theta)=\begin{pmatrix}1/4&0\\0&1\end{pmatrix}\begin{pmatrix}1\\1\end{pmatrix}=\begin{pmatrix}0.25\\1\end{pmatrix}$$
곡률이 큰 첫째 방향의 성분은 $1$에서 $0.25$로 줄어들고 곡률이 작은 둘째 방향은 그대로 $1$입니다. 분포공간에서 같은 크기만큼만 움직이도록 걸음이 자동으로 재조정된 것입니다.

아래 증명은 이 재조정이 이 대각행렬에서만 성립하는 게 아니라 라그랑주 조건을 통해 임의의 $F(\theta)$에서 항상 $F(\theta)^{-1}\nabla J(\theta)$ 방향으로 정확히 결정됨을 보입니다.
