---
slug: attention-rollout
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 어텐션 기반
title: Attention Rollout: 층을 거친 어텐션을 하나로 누적하기
related: Cross-Attention 시각화 · 정책 어텐션 시각화
---

## 도입
층 $l$의 (행 방향으로 정규화된) 어텐션 행렬을 $A^{(l)}$이라 하자. 잔차연결 때문에 각 토큰은 다른 토큰을 참고하는 것 외에 자기 자신의 표현도 그대로 이어받는다. 이를 반영해 어텐션 행렬과 항등행렬을 절반씩 섞고 다시 정규화한 $\hat A^{(l)} = 0.5 A^{(l)} + 0.5 I$를 쓴다.

Rollout은 첫 층부터 마지막 층까지 이 행렬들을 순서대로 곱한 것이다. $\mathrm{Rollout} = \hat A^{(L)} \hat A^{(L-1)} \cdots \hat A^{(1)}$. 이 곱셈 결과의 $(i,j)$ 성분은 출력 위치 $i$의 표현 중 얼마만큼이 여러 층에 걸친 모든 경로를 통해 입력 위치 $j$로부터 왔는지를 나타낸다.

이 값은 정확한 정보량 회계라기보다 발견적인 근사치다. 어텐션 가중치가 곧 모델의 판단 근거라는 가정 자체에 반박하는 연구도 있다(Attention is not Explanation). 그럼에도 단일 층의 어텐션만 보는 것보다는 모델이 실제로 여러 층을 거쳐 계산하는 구조를 훨씬 충실히 반영하고 이미 순전파 과정에서 계산된 어텐션 행렬만 있으면 되므로 추가로 그래디언트를 계산할 필요 없이 저렴하게 구할 수 있다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<text x="120" y="30" font-size="13" text-anchor="middle">층 2 어텐션 Â⁽²⁾</text>
<rect x="60" y="45" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="120" y="45" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="90" y="80" font-size="12" text-anchor="middle">0.6</text>
<text x="150" y="80" font-size="12" text-anchor="middle" class="dg-dim">0.4</text>
<rect x="60" y="105" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="120" y="105" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="90" y="140" font-size="12" text-anchor="middle" class="dg-dim">0.3</text>
<text x="150" y="140" font-size="12" text-anchor="middle">0.7</text>
<text x="260" y="105" font-size="18" text-anchor="middle">×</text>
<text x="360" y="30" font-size="13" text-anchor="middle">층 1 어텐션 Â⁽¹⁾</text>
<rect x="300" y="45" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="360" y="45" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="330" y="80" font-size="12" text-anchor="middle">0.7</text>
<text x="390" y="80" font-size="12" text-anchor="middle" class="dg-dim">0.3</text>
<rect x="300" y="105" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="360" y="105" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="330" y="140" font-size="12" text-anchor="middle" class="dg-dim">0.2</text>
<text x="390" y="140" font-size="12" text-anchor="middle">0.8</text>
<text x="440" y="105" font-size="18" text-anchor="middle">=</text>
<text x="540" y="30" font-size="13" text-anchor="middle">누적 Rollout</text>
<rect x="480" y="45" width="60" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<rect x="540" y="45" width="60" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="510" y="80" font-size="12" text-anchor="middle">0.50</text>
<text x="570" y="80" font-size="12" text-anchor="middle">0.50</text>
<rect x="480" y="105" width="60" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<rect x="540" y="105" width="60" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="510" y="140" font-size="12" text-anchor="middle">0.35</text>
<text x="570" y="140" font-size="12" text-anchor="middle">0.65</text>
<text x="320" y="200" font-size="12" text-anchor="middle" class="dg-dim">각 층의 어텐션을 곱해 여러 층을 거친 누적 영향력을 구한다</text>
</svg>

_각 층의 어텐션 행렬을 순서대로 곱해 여러 층을 거친 누적 영향력을 구한다._

## 문제
$\mathrm{Rollout}^{(3)}$의 첫 번째 행 첫 번째 열 성분은 $\hat A^{(3)}$의 첫 행 $(0.9,\ 0.1)$과 $\mathrm{Rollout}^{(2)}$의 첫째 열 $(0.50,\ 0.35)$을 성분별로 곱해 더한 값이다. 즉 $0.9\times0.50+0.1\times0.35$를 계산하면 $(\mathrm{Rollout}^{(3)})_{11}=$==빈칸== 이다.

## 해설
0.9×0.50=0.45와 0.1×0.35=0.035를 더하면 이 값이 나오기 때문이에요.

**정답: $0.485$**

## 예시
토큰이 두 개이고 층이 두 개인 단순한 경우를 생각하자. 잔차연결까지 반영한 층 1의 어텐션이 $\hat A^{(1)} = \begin{pmatrix}0.7 & 0.3 \\ 0.2 & 0.8\end{pmatrix}$이고 층 2가 $\hat A^{(2)} = \begin{pmatrix}0.6 & 0.4 \\ 0.3 & 0.7\end{pmatrix}$라고 하자. Rollout은 $\hat A^{(2)} \hat A^{(1)}$로 계산한다. 첫 번째 행은 $(0.6\times0.7+0.4\times0.2,\ 0.6\times0.3+0.4\times0.8)=(0.50,\ 0.50)$이고 두 번째 행은 $(0.3\times0.7+0.7\times0.2,\ 0.3\times0.3+0.7\times0.8)=(0.35,\ 0.65)$이다. 두 층만 거쳤는데도 이미 토큰 1의 최종 영향력 배분이 층 1 단독일 때의 (0.7, 0.3)과는 달라졌다.
