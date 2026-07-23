---
slug: clip-style-alignment-pretraining
theme: LLM
domainLabel: LLM/Agent
subLabel: 비전-언어 모델
title: CLIP류 정렬 사전학습: 이미지와 텍스트를 같은 공간에 나란히 놓기
related: Vision-Language Model · 패치 토큰화
---

## 도입
구조는 두 개의 인코더로 이루어집니다. 이미지 인코더는 이미지를 벡터 하나로 압축하고 텍스트 인코더는 캡션 문장을 같은 차원의 벡터 하나로 압축합니다. 학습 배치 안에 이미지와 캡션 쌍이 $N$개 있다면 이미지 임베딩과 텍스트 임베딩 사이의 코사인 유사도를 모든 조합에 대해 계산해 $N \times N$ 유사도 행렬을 만듭니다. 정답 짝은 대각선 위치이고 나머지는 오답입니다.

손실함수는 이 대각선 위치의 유사도를 키우고 나머지 위치의 유사도를 낮추는 대조학습 형태입니다. 온도 파라미터 $\tau$로 스케일을 조정한 뒤 각 이미지에 대해 정답 텍스트를 고르는 분류 문제처럼 소프트맥스 교차엔트로피를 적용합니다.
$$\mathcal{L} = -\frac{1}{N}\sum_{i=1}^{N} \log \frac{\exp(\mathrm{sim}(I_i, T_i)/\tau)}{\sum_{j=1}^{N}\exp(\mathrm{sim}(I_i, T_j)/\tau)}$$
같은 식을 텍스트 기준으로도 계산해 두 방향의 손실을 더하면 이미지에서 텍스트로 가는 방향과 텍스트에서 이미지로 가는 방향이 동시에 정렬됩니다.

이 방식이 강력한 이유는 라벨링 비용에 있습니다. 분류 모델을 학습하려면 사람이 정해둔 클래스 목록과 그 클래스에 맞춰 라벨을 붙인 이미지가 있어야 합니다. CLIP류 모델은 대신 인터넷에 이미 널려 있는 이미지와 그 옆에 붙은 설명 문장을 그대로 학습 데이터로 씁니다. 새 클래스 목록을 사람이 미리 정하지 않아도 학습이 끝난 뒤 원하는 클래스 이름을 문장으로 적어 텍스트 인코더에 넣고 이미지 임베딩과 유사도만 비교하면 그 클래스에 대한 분류가 바로 가능합니다. 이것이 제로샷 분류이고 다운스트림 작업마다 새로 라벨링된 데이터셋을 모으지 않아도 되는 이유입니다.

## 명제


## 그림
<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="95" width="140" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="110" y="124" font-size="12" text-anchor="middle">이미지 인코더</text>
<line x1="180" y1="120" x2="253" y2="120" class="dg-line" stroke-width="1.5"/>
<polygon points="253,120 245,115 245,125" class="dg-line"/>
<text x="245" y="85" font-size="11" text-anchor="end">I1</text>
<text x="245" y="125" font-size="11" text-anchor="end">I2</text>
<text x="245" y="165" font-size="11" text-anchor="end">I3</text>
<text x="280" y="52" font-size="11" text-anchor="middle">T1</text>
<text x="320" y="52" font-size="11" text-anchor="middle">T2</text>
<text x="360" y="52" font-size="11" text-anchor="middle">T3</text>
<rect x="260" y="60" width="40" height="40" class="dg-accent dg-line" stroke-width="1"/>
<rect x="300" y="60" width="40" height="40" class="dg-dim dg-line" stroke-width="1"/>
<rect x="340" y="60" width="40" height="40" class="dg-dim dg-line" stroke-width="1"/>
<rect x="260" y="100" width="40" height="40" class="dg-dim dg-line" stroke-width="1"/>
<rect x="300" y="100" width="40" height="40" class="dg-accent dg-line" stroke-width="1"/>
<rect x="340" y="100" width="40" height="40" class="dg-dim dg-line" stroke-width="1"/>
<rect x="260" y="140" width="40" height="40" class="dg-dim dg-line" stroke-width="1"/>
<rect x="300" y="140" width="40" height="40" class="dg-dim dg-line" stroke-width="1"/>
<rect x="340" y="140" width="40" height="40" class="dg-accent dg-line" stroke-width="1"/>
<line x1="385" y1="120" x2="437" y2="120" class="dg-line" stroke-width="1.5"/>
<polygon points="437,120 429,115 429,125" class="dg-line"/>
<rect x="440" y="95" width="140" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="510" y="124" font-size="12" text-anchor="middle">텍스트 인코더</text>
<text x="310" y="212" font-size="11" class="dg-dim" text-anchor="middle">대각선 정답 쌍의 유사도는 높이고 나머지는 낮춘다</text>
</svg>

_이미지와 텍스트를 각각 인코딩해 만든 임베딩의 유사도 행렬에서 대각선 정답 쌍만 가깝게 학습한다._

## 문제
분수의 분자와 분모를 똑같이 $\exp(\mathrm{sim}_{ii}/\tau)$로 나누면 $L_i=-\log\frac{1}{\sum_{j=1}^N\exp((\mathrm{sim}_{ij}-\mathrm{sim}_{ii})/\tau)}$ 가 된다. 로그의 성질 $-\log(1/x)=\log x$를 그대로 적용하면 이는 ==빈칸== 로 다시 쓸 수 있다.

## 해설
음의 로그 역수는 로그 자체와 같다는 성질 -log(1/x)=log x를 그대로 적용하면 분모에 있던 합이 그대로 로그 안으로 올라와요.

**정답: $L_i = \log\sum_{j=1}^{N}\exp\big((\mathrm{sim}_{ij}-\mathrm{sim}_{ii})/\tau\big)$**

## 예시

