---
slug: langevin-sampling
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: Langevin 샘플링과 정상분포
related: 
---

## 도입
Diffusion 모델의 역과정은 노이즈 낀 샘플에서 점점 원래 데이터 분포를 향해 걸어갑니다. 그 걸음의 방향은 스코어함수라 부르는 $\nabla\log p(x)$가 정해줍니다. 이 방향으로 무작위성을 조금 섞어 계속 걸으면 정말로 원하는 분포 $p(x)$에 도달할까요.

## 명제
랑주뱅 확률미분방정식 $dx_t = \frac12\nabla\log p(x_t)\,dt + dW_t$의 정상분포는 $p(x)$이다.

## 그림
<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg">
  <circle cx="240" cy="165" r="115" fill="none" class="dg-line" stroke-width="1.2" stroke-dasharray="3,4"/>
  <circle cx="240" cy="165" r="78" fill="none" class="dg-line" stroke-width="1.2" stroke-dasharray="3,4"/>
  <circle cx="240" cy="165" r="42" fill="none" class="dg-stroke-ink" stroke-width="1.4" stroke-dasharray="3,4"/>
  <circle cx="240" cy="165" r="4" class="dg-accent"/>
  <text x="248" y="150" font-size="11" class="dg-dim">p(x) 최댓값</text>
  <line x1="240" y1="45" x2="240" y2="85" class="dg-stroke-accent" stroke-width="2"/>
  <polygon points="240,85 235,73 245,73" class="dg-accent"/>
  <line x1="360" y1="165" x2="320" y2="165" class="dg-stroke-accent" stroke-width="2"/>
  <polygon points="320,165 332,160 332,170" class="dg-accent"/>
  <line x1="240" y1="285" x2="240" y2="245" class="dg-stroke-accent" stroke-width="2"/>
  <polygon points="240,245 235,257 245,257" class="dg-accent"/>
  <line x1="120" y1="165" x2="160" y2="165" class="dg-stroke-accent" stroke-width="2"/>
  <polygon points="160,165 148,160 148,170" class="dg-accent"/>
  <text x="245" y="40" font-size="10">∇log p</text>
  <path d="M380,70 Q350,95 355,115 Q315,130 320,150 Q290,145 285,175 Q260,168 250,172" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="2,3"/>
  <circle cx="380" cy="70" r="4" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
  <text x="385" y="65" font-size="10" class="dg-dim">시작(잡음 섞인 걸음)</text>
</svg>

_밀도 등고선(점선) 위에서 스코어함수 ∇log p는 항상 고밀도 중심을 향하고, 잡음 섞인 궤적(가는 점선)은 그 방향을 따라 결국 중심에 정착한다._

## 문제
지금 목표는 우변의 첫째 항 $\nabla\cdot(bp)$를 실제로 계산하는 것이다. $b=\frac12\nabla\log p$이므로 $bp = \frac12 p\nabla\log p$이다. 로그의 미분 정의 $\nabla\log p = \nabla p/p$를 쓰면 $p$와 분모의 $p$가 약분된다.

그러면 $p\nabla\log p = p\cdot\frac{\nabla p}{p} = $==빈칸== 이다.

## 해설
$\nabla\log p = \nabla p / p$라는 로그 미분의 정의를 그대로 대입하면 분모의 $p$가 약분되어 $\nabla p$만 남는다.

**정답: $\nabla p$**

## 예시
스코어함수가 어느 방향을 가리키는지부터 숫자로 확인해봅니다.

목표 분포를 표준정규분포 $p(x)=\frac{1}{\sqrt{2\pi}}e^{-x^2/2}$라 하겠습니다. 이 분포는 $x=0$에서 가장 밀도가 높고 $x$가 커질수록 밀도가 급격히 낮아집니다. 실제로 $p(0)\approx0.399$인데 $p(2)\approx0.054$로 훨씬 작습니다.

이제 $x=2$인 지점에서 랑주뱅 방정식의 결정론적 이동 방향 $b(x)=\frac12\nabla\log p(x)=-\frac{x}{2}$를 계산해봅니다.
$$b(2) = -\frac{2}{2} = -1$$
부호가 음수이므로 $x=2$에 있는 입자는 매 순간 $x$가 작아지는 쪽, 즉 밀도가 더 높은 $x=0$ 방향으로 밀려납니다. 밀도가 낮은 곳에 있을수록 스코어함수는 더 강하게 밀도가 높은 쪽을 가리키는 셈입니다. 여기에 무작위 흔들림 $dW_t$를 조금씩 섞어가며 계속 이 방향으로 걸으면 입자들은 결국 $p(x)$가 큰 곳에 더 자주 머물게 됩니다. 아래 증명은 이 직관을 포커-플랑크 방정식으로 정확히 확인해서, 이렇게 걸었을 때 도달하는 정상분포가 정말 $p(x)$ 그 자체임을 보입니다.
