---
slug: denoising-autoencoder-score
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 디노이징 오토인코더와 스코어 함수: 노이즈가 가르쳐주는 것
hook: 데이터에 일부러 노이즈를 섞은 다음, 그 오염된 관측만 보고 원래 데이터를 복원하도록 신경망을 학습시키면 무슨 일이 벌어질까요.
---

## 기본설명
데이터 $x\sim p(x)$에 등방 가우시안 노이즈 $\varepsilon\sim\mathcal N(0,\sigma^2I)$를 더한 오염관측을 $\tilde x=x+\varepsilon$이라 하고, 이때 $\tilde x$의 주변밀도를 $p_\sigma(\tilde x)=\int p(x)\mathcal N(\tilde x;x,\sigma^2I)\,dx$라 하자. 제곱오차 $L(g)=\mathbb E_{x,\varepsilon}\big[\|g(\tilde x)-x\|^2\big]$를 최소화하는 복원함수 $g^*$는 $$g^*(\tilde x)-\tilde x=\sigma^2\nabla_{\tilde x}\log p_\sigma(\tilde x)$$ 를 만족한다.

## 문제
$\tilde x$를 고정하고 조건부 기댓값으로 손실을 분해하면 $\mathbb E_{x|\tilde x}\big[\|g(\tilde x)-x\|^2\big]=\|g(\tilde x)-\mathbb E[x|\tilde x]\|^2+\mathrm{Var}(x|\tilde x)$ 로 쓸 수 있다. 우변의 둘째 항은 $g$와 무관하므로, 각 $\tilde x$에서 손실을 최소화하는 최적해는 $g^*(\tilde x) = $==빈칸== 이다.

## 해설
분해식의 첫째 항 $\|g(\tilde x)-\mathbb E[x|\tilde x]\|^2$은 $g(\tilde x)=\mathbb E[x|\tilde x]$일 때만 0이 되고, 나머지 분산 항은 $g$로 어찌할 수 없으므로 손실을 최소로 만드는 선택은 조건부 평균 그 자체예요.

**정답: $\mathbb E[x\mid \tilde x]$**

## 예시
추상적인 적분 논증에 들어가기 전에, 데이터가 $x=-1$과 $x=1$에 확률 $0.5$씩 몰려 있는 (두 점) 분포이고 $\sigma^2=1$인 경우로 명제를 직접 확인해봅니다.

오염관측 $\tilde x=0.5$에서 사후 가중치를 계산하면 $p_\sigma(0.5)\approx 0.240791$이고, 조건부 평균은 $\mathbb E[x\mid\tilde x=0.5]\approx 0.462117$입니다. 따라서 $g^*(0.5)-0.5\approx -0.037883$입니다.

한편 $p_\sigma(\tilde x)=0.5\,\mathcal N(\tilde x;-1,1)+0.5\,\mathcal N(\tilde x;1,1)$의 로그를 $\tilde x=0.5$에서 수치미분하면 $\nabla_{\tilde x}\log p_\sigma(0.5)\approx -0.037883$으로 정확히 같은 값이 나옵니다(직접 재계산해 확인). $\sigma^2=1$이므로 $\sigma^2\nabla_{\tilde x}\log p_\sigma(0.5)=g^*(0.5)-0.5$가 그대로 성립합니다.
