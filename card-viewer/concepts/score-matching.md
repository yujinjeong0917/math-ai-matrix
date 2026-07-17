---
slug: score-matching
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 스코어매칭: 분배함수 없이 밀도모델을 학습하는 법
related: 디노이징 오토인코더가 학습하는 것은 데이터 분포의 스코어다
---

## 도입
정규화되지 않은 에너지모델 $p_\theta(x)\propto \tilde p_\theta(x)$을 최대우도로 학습하려면 분배함수(정규화상수) $Z_\theta=\int\tilde p_\theta(x)dx$를 알아야 하는데, 이 적분은 대개 계산 불가능합니다. Hyvärinen의 스코어매칭은 아예 확률밀도 자체가 아니라 그 로그의 그래디언트인 "스코어" $\nabla_x\log p_\theta(x)$를 데이터의 스코어와 맞추자는 아이디어입니다. 스코어는 로그의 미분이므로 분배함수의 로그($x$에 무관한 상수)가 미분되어 사라지고, 부분적분을 한 번 쓰면 데이터의 스코어조차 몰라도 되는 놀라운 형태로 목적함수가 재작성됩니다.

## 명제
모델 스코어를 $s_\theta(x)=\nabla_x\log p_\theta(x)$, 데이터 스코어를 $s_{\text{data}}(x)=\nabla_x\log p_{\text{data}}(x)$ 라 하자(1차원, $p_{\text{data}}$가 매끄럽고 $|x|\to\infty$에서 $p_{\text{data}}(x)\to0$). 스코어매칭 목적함수 $$J(\theta)=\frac12\,\mathbb E_{p_{\text{data}}}\big[(s_\theta(x)-s_{\text{data}}(x))^2\big]$$ 은 $\theta$에 무관한 상수를 제외하면 $$J(\theta) = \mathbb E_{p_{\text{data}}}\left[\frac12 s_\theta(x)^2 + s_\theta'(x)\right] + \text{const}$$ 와 같으며, 우변은 $p_{\text{data}}$나 정규화상수 $Z_\theta$ 없이 오직 모델의 스코어 $s_\theta$와 그 도함수만으로 계산 가능하다.

## 그림
<svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="240" cy="140" rx="55" ry="35" class="dg-accent" opacity="0.3"/>
<ellipse cx="240" cy="140" rx="55" ry="35" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<path d="M240,60 L240,95" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="240,95 235,84 245,84" class="dg-stroke-accent"/>
<path d="M240,220 L240,185" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="240,185 235,196 245,196" class="dg-stroke-accent"/>
<path d="M110,140 L165,140" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="165,140 154,135 154,145" class="dg-stroke-accent"/>
<path d="M370,140 L315,140" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="315,140 326,135 326,145" class="dg-stroke-accent"/>
<path d="M155,65 L195,105" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="195,105 184,101 191,92" class="dg-stroke-accent"/>
<path d="M325,215 L285,175" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="285,175 289,186 296,179" class="dg-stroke-accent"/>
<text x="240" y="145" font-size="11" text-anchor="middle">p_data</text>
<text x="240" y="248" font-size="12" text-anchor="middle">∇log p(x)는 밀도가 높은 쪽을 향한다</text>
<text x="240" y="264" font-size="11" text-anchor="middle" class="dg-dim">정규화상수 Z 없이도 계산 가능</text>
</svg>

_스코어 벡터장은 정규화상수 없이도 각 점을 데이터 밀도가 높은 쪽으로 이끈다._

## 문제
가운데 교차항 $\mathbb E_{p_{\text{data}}}[s_\theta(x)s_{\text{data}}(x)]=\int p_{\text{data}}(x)\,s_\theta(x)\,s_{\text{data}}(x)\,dx$ 을 다룬다. 스코어의 정의 $s_{\text{data}}(x)=\dfrac{p_{\text{data}}'(x)}{p_{\text{data}}(x)}$ 를 쓰면 $p_{\text{data}}(x)s_{\text{data}}(x)=$==빈칸== 로 정리되어, 교차항은 $\int p_{\text{data}}'(x)\,s_\theta(x)\,dx$ 가 된다.

## 해설
$s_{\text{data}}(x)=p_{\text{data}}'(x)/p_{\text{data}}(x)$의 정의에서 양변에 $p_{\text{data}}(x)$를 곱하면 바로 $p_{\text{data}}'(x)$가 남기 때문입니다.

**정답: $p_{\text{data}}'(x)$**

## 예시
구체적인 모델로 이 재작성이 실제로 올바른 $\theta$를 복원하는지 확인해봅니다.

모델을 $p_\theta(x)\propto\exp(-\theta x^2/2)$ (평균 0, 정밀도 $\theta$인 가우시안)로 두면 $\log p_\theta(x)=-\theta x^2/2-\log Z_\theta$ 이므로 $s_\theta(x)=-\theta x$, $s_\theta'(x)=-\theta$ 이다. 데이터가 표준정규분포 $p_{\text{data}}=\mathcal N(0,1)$(참값 $\theta^*=1$)를 따른다고 하자.

재작성된 목적함수에 대입하면 $\mathbb E[x^2]=1$이므로
$$J(\theta) = \mathbb E\left[\frac12\theta^2x^2 - \theta\right] + \text{const} = \frac{\theta^2}{2} - \theta + \text{const}$$
이를 $\theta$로 미분해 0으로 두면 $\theta-1=0$, 즉 $\theta=1$에서 최소가 됩니다. 이는 데이터를 생성한 참값 $\theta^*=1$과 정확히 일치하며, 스코어매칭이 정규화상수를 몰라도 올바른 파라미터를 찾아낸다는 것을 확인해줍니다.
