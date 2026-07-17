---
slug: patch-tokenization
theme: LLM
domainLabel: LLM/Agent
subLabel: 이미지 토큰화
title: 패치 토큰화: 이미지를 조각내서 토큰처럼 다루기
related: 이미지 토큰 수 · 타일링
---

## 도입
ViT(Vision Transformer)는 이미지를 겹치지 않는 고정 크기 패치 예를 들어 $16\times16$ 픽셀 조각으로 나눕니다. 각 패치의 픽셀 값을 한 줄로 펼쳐 벡터로 만들고 선형투영 하나를 거쳐 모델의 임베딩 차원으로 옮깁니다. 이렇게 만들어진 벡터 하나하나가 트랜스포머 입장에서는 텍스트의 토큰 임베딩과 똑같은 역할을 합니다. 이미지 크기 $H\times W$를 패치 크기 $p$로 나누면 만들어지는 패치 개수는 다음과 같습니다.
$$N_{\mathrm{patch}} = \left\lceil \frac{H}{p} \right\rceil \times \left\lceil \frac{W}{p} \right\rceil$$
CNN은 합성곱 연산 자체에 인접한 픽셀끼리 더 강하게 연결된다는 공간적 지역성과 위치가 달라져도 같은 패턴을 인식한다는 이동 불변성이 구조적으로 박혀 있습니다. 반면 셀프어텐션은 모든 토큰 쌍을 동등하게 비교하는 연산이라 이런 공간적 가정이 전혀 없습니다. 그래서 이미지를 트랜스포머에 넣으려면 먼저 이미지를 토큰 시퀀스라는 형태로 바꿔주는 절차가 필요했고 그 절차가 패치 토큰화입니다.

또한 어텐션 연산 자체는 입력 순서를 신경 쓰지 않는 순열 불변 연산이라 패치들을 그냥 나열하기만 하면 어떤 패치가 이미지의 어느 위치에 있었는지 정보가 사라집니다. 그래서 각 패치 토큰에 위치 임베딩을 더해 원래 격자 위의 좌표 정보를 되살려 줍니다. 논문 기준 $224\times224$ 이미지를 패치 크기 $16$으로 나누면 $224/16=14$이므로 한 변에 14개 전체 $14\times14=196$개의 패치 토큰이 만들어집니다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="18" font-size="12">이미지를 패치로 분할</text>
<rect x="20" y="30" width="160" height="160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="60" y1="30" x2="60" y2="190" class="dg-line" stroke-width="1.5"/>
<line x1="100" y1="30" x2="100" y2="190" class="dg-line" stroke-width="1.5"/>
<line x1="140" y1="30" x2="140" y2="190" class="dg-line" stroke-width="1.5"/>
<line x1="20" y1="70" x2="180" y2="70" class="dg-line" stroke-width="1.5"/>
<line x1="20" y1="110" x2="180" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="20" y1="150" x2="180" y2="150" class="dg-line" stroke-width="1.5"/>
<rect x="100" y="70" width="40" height="40" class="dg-accent" stroke="none"/>
<line x1="190" y1="110" x2="248" y2="110" class="dg-line" stroke-width="1.5"/>
<polygon points="248,110 240,105 240,115" class="dg-line"/>
<text x="219" y="99" font-size="11" class="dg-dim" text-anchor="middle">펼쳐서 투영</text>
<rect x="258" y="98" width="22" height="22" class="dg-accent" stroke="none"/>
<rect x="286" y="98" width="22" height="22" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="314" y="98" width="22" height="22" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="342" y="98" width="22" height="22" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="370" y="98" width="22" height="22" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="398" y="98" width="22" height="22" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="426" y="98" width="22" height="22" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="454" y="98" width="22" height="22" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="490" y="115" font-size="14">...</text>
<line x1="504" y1="109" x2="536" y2="109" class="dg-line" stroke-width="1.5"/>
<polygon points="536,109 528,104 528,114" class="dg-line"/>
<rect x="540" y="50" width="90" height="120" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="585" y="105" font-size="12" text-anchor="middle">Transformer</text>
<text x="585" y="122" font-size="11" class="dg-dim" text-anchor="middle">인코더</text>
<text x="370" y="140" font-size="11" class="dg-dim" text-anchor="middle">패치 토큰 시퀀스</text>
</svg>

_이미지를 고정 크기 패치로 나누고 각 패치를 펼쳐 투영한 뒤 하나의 토큰처럼 트랜스포머에 넣는다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
트랜스포머는 원래 순서가 있는 벡터들의 나열 즉 토큰 시퀀스를 입력으로 받도록 만들어졌습니다. 문장은 단어나 subword로 자연스럽게 쪼개져 토큰이 되지만 이미지는 그런 구분이 없는 픽셀의 2차원 격자일 뿐입니다.

패치 토큰화는 이미지를 작은 정사각형 조각으로 자른 다음 각 조각을 트랜스포머가 원래 다루던 토큰처럼 취급합니다. 사진 한 장을 여러 개의 작은 퍼즐 조각으로 잘라 한 줄로 늘어놓는 것과 비슷합니다.


## 예시

