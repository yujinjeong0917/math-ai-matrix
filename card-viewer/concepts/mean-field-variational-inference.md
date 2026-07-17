---
slug: mean-field-variational-inference
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 평균장 변분추론과 좌표상승(CAVI) 갱신식
related: 기댓값전파(Expectation Propagation) · 지수족의 로그분배함수와 충분통계량의 평균
---

## 도입
사후분포 $p(z|x)$가 계산 불가능할 때, 근사분포 $q(z)$를 완전히 독립인 인자들의 곱 $q(z)=\prod_i q_i(z_i)$로 제한하면(평균장 가정) 문제가 훨씬 쉬워집니다. 나머지 인자를 고정한 채 한 인자 $q_j$만 최적화하는 좌표상승을 반복하면(CAVI, Coordinate Ascent Variational Inference), 각 인자의 최적형태가 닫힌 식으로 나온다는 것이 핵심입니다.

## 명제
$q(z)=\prod_{i=1}^{M} q_i(z_i)$ 로 완전분해된 근사사후분포에서 ELBO $\mathcal{L}(q)=E_q[\log p(x,z)]-E_q[\log q(z)]$를 $q_j$에 대해서만 최적화하면, 다른 인자를 고정했을 때의 최적해는
$$q_j^*(z_j) \propto \exp\big(E_{i\neq j}[\log p(x,z)]\big)$$
이다. 여기서 $E_{i\neq j}[\cdot]$는 $\prod_{i\neq j}q_i(z_i)$에 대한 기댓값이다.

## 그림
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="120" x2="370" y2="120" class="dg-line" stroke-width="1"/>
<line x1="200" y1="15" x2="200" y2="225" class="dg-line" stroke-width="1"/>
<text x="374" y="124" font-size="12" class="dg-dim">z₁</text>
<text x="206" y="26" font-size="12" class="dg-dim">z₂</text>
<ellipse cx="200" cy="120" rx="140" ry="45" transform="rotate(-38 200 120)" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<ellipse cx="200" cy="120" rx="65" ry="65" fill="none" class="dg-stroke-accent" stroke-width="2.5" stroke-dasharray="6,3"/>
<text x="285" y="55" font-size="12">실제 결합분포(ρ=0.8, 기울어진 타원, 실선)</text>
<text x="212" y="190" font-size="12" class="dg-dim">평균장 근사(축정렬 원, 점선, 분산 과소추정)</text>
</svg>

_상관이 있는 결합분포는 기울어진 타원 등고선을 갖지만, 완전분해를 가정한 평균장 근사는 축에 정렬된 원으로만 표현되어 상관구조와 전체 불확실성을 과소추정한다._

## 문제
지금 목표는 ELBO를 $q_j$만의 함수로 분리하는 것이다. $E_q[\log p(x,z)]=\int q_j(z_j)\,\tilde E_{i\neq j}[\log p(x,z)]\,dz_j$ 로 쓸 수 있는데, 여기서 $\tilde E_{i\neq j}[\log p(x,z)]$는 $\prod_{i\neq j}q_i(z_i)$에 대해 평균 낸, $z_j$만의 함수다. 마찬가지로 엔트로피 항 $E_q[\log q(z)]=\sum_i\int q_i\log q_i\,dz_i$ 중에서도 $q_j$에 의존하는 항은 $j$번째 항 하나뿐이고, 나머지는 상수로 흡수된다.

이를 ELBO 정의에 대입하면, $q_j$만의 함수로 본 ELBO는 $\mathcal{L}[q_j] = \int q_j(z_j)\tilde E_{i\neq j}[\log p(x,z)]\,dz_j - $==빈칸==$ + \text{const}$ 이다.

## 해설
나머지 인자들의 엔트로피 항 $\sum_{i\neq j}\int q_i\log q_i\,dz_i$ 는 $q_j$와 무관하므로 상수로 흡수되고, $j$번째 엔트로피 항 $\int q_j\log q_j\,dz_j$ 만 $q_j$에 의존하는 항으로 남는다.

**정답: $\int q_j(z_j)\log q_j(z_j)\,dz_j$**

## 예시
완전분해 가정이 실제로 무엇을 잃는지, 상관된 이변량 가우시안 하나로 확인해봅니다.

목표분포가 평균 $0$, 공분산행렬 $\begin{pmatrix}1&\rho\\\rho&1\end{pmatrix}$ 인 이변량 정규분포 $p(z_1,z_2)$ 이고 $\rho=0.8$이라 하겠습니다. 이 결합분포의 조건부분포는 $p(z_1|z_2)=N(\rho z_2,\,1-\rho^2)=N(0.8z_2,\,0.36)$ 로 잘 알려져 있습니다.

평균장 근사 $q(z_1,z_2)=q_1(z_1)q_2(z_2)$에 아래 증명에서 유도할 좌표상승 갱신식을 적용하면, $q_1$의 최적형태는 $q_2$의 평균만 그대로 넘겨받아 $q_1^*(z_1)=N(0.8\,E_{q_2}[z_2],\,0.36)$ 이 됩니다. 대칭성 때문에 반복 갱신의 고정점에서는 $E_{q_1}[z_1]=E_{q_2}[z_2]=0$이 되어 최종적으로 $q_1^*=q_2^*=N(0,\,0.36)$을 얻습니다.

평균은 참값(각 주변분포의 평균 $0$)과 정확히 일치합니다. 그런데 분산은 $0.36$으로, 실제 $z_1$의 주변분포가 갖는 분산 $1$보다 훨씬 작습니다. 인자들을 독립이라 가정해버리면 변수들이 서로 정보를 나눠 가지며 만들어내는 불확실성의 일부를 근사분포가 놓친다는, 평균장 변분추론의 잘 알려진 한계가 이 숫자에서 그대로 드러납니다. 아래 증명은 이 $q_1^*$의 형태가 우연이 아니라 좌표상승 공식을 그대로 대입한 결과임을 일반적으로 유도합니다.
