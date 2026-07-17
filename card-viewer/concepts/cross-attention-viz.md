---
slug: cross-attention-viz
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 어텐션 기반
title: Cross-Attention 시각화: 텍스트와 이미지가 어떻게 정렬되는가
related: Attention Rollout · Grad-CAM
---

## 도입
Stable Diffusion의 텍스트 조건부 U-Net이나 이미지 캡션 트랜스포머를 예로 들면 이미지는 패치들의 공간적 격자로, 텍스트는 토큰들의 시퀀스로 표현된다. cross-attention은 $\mathrm{softmax}(QK^\top/\sqrt{d})$를 계산하는데 이때 Q와 K가 서로 다른 모달리티에서 온다. 그 결과 각 텍스트 토큰마다 이미지 위치들에 대한 확률분포(행의 합이 1)를 얻는다.

시각화할 때는 관심 있는 텍스트 토큰 하나의 행을 꺼내 원래 이미지 패치들의 격자 모양대로 다시 배열하고 히트맵으로 겹쳐 그린다. 캡션의 단어마다 이 작업을 반복하거나 diffusion 모델의 각 디노이징 단계마다 반복하면 예를 들어 개라는 단어가 실제로 개가 있는 픽셀들에 어텐션이 집중되는 모습을 확인할 수 있다.

이런 모델은 보통 여러 층과 여러 헤드에 걸쳐 cross-attention을 여러 번 계산하므로 하나의 지도는 특정 층이나 헤드를 고르거나 여러 개를 평균 낸 것일 뿐 유일한 지도는 아니다. attention rollout에서와 같은 주의점이 여기도 적용된다. 어느 층을 고르느냐에 따라 그림이 달라질 수 있고 어텐션 가중치가 최종 출력에 대한 엄밀한 인과적 설명이라는 보장은 없다. 그럼에도 모델 내부의 정렬 신호를 직접 읽는다는 점에서 유용한 진단 도구다.

## 명제


## 그림
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
<text x="60" y="40" font-size="13" text-anchor="middle">텍스트 토큰</text>
<rect x="20" y="55" width="80" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="60" y="75" font-size="12" text-anchor="middle">"a"</text>
<rect x="20" y="95" width="80" height="30" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="60" y="115" font-size="12" text-anchor="middle">"dog"</text>
<rect x="20" y="135" width="80" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="60" y="155" font-size="12" text-anchor="middle">"on"</text>
<rect x="20" y="175" width="80" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="60" y="195" font-size="12" text-anchor="middle">"grass"</text>
<text x="440" y="40" font-size="13" text-anchor="middle">이미지 패치</text>
<rect x="360" y="55" width="160" height="160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="360" y1="108" x2="520" y2="108" class="dg-line" stroke-width="1"/>
<line x1="360" y1="162" x2="520" y2="162" class="dg-line" stroke-width="1"/>
<line x1="413" y1="55" x2="413" y2="215" class="dg-line" stroke-width="1"/>
<line x1="467" y1="55" x2="467" y2="215" class="dg-line" stroke-width="1"/>
<rect x="413" y="55" width="54" height="53" class="dg-accent"/>
<line x1="100" y1="110" x2="413" y2="80" class="dg-stroke-accent" stroke-width="2"/>
<line x1="100" y1="70" x2="440" y2="150" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="100" y1="190" x2="440" y2="180" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<text x="440" y="235" font-size="12" text-anchor="middle" class="dg-dim">"dog" 토큰의 어텐션이 개가 있는 패치에 집중</text>
</svg>

_텍스트 토큰 하나의 어텐션 행을 이미지 패치 격자 모양으로 펼쳐 겹쳐 보면 정렬 관계가 드러난다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
이미지 캡션 생성 모델이나 텍스트로 이미지를 만드는 생성모델처럼 서로 다른 두 가지 형태의 데이터(글과 그림)를 함께 다루는 모델에는 cross-attention이라는 특수한 어텐션이 있다. 한쪽 모달리티의 토큰(문장의 단어들)이 다른 쪽 모달리티의 위치(이미지의 패치들)를 얼마나 주목하는지를 계산하는 장치다. 이 어텐션을 시각화하면 이 단어를 만들어낼 때 혹은 처리할 때 이미지의 어느 부분에서 정보를 가져왔는지를 아주 구체적으로 답할 수 있다.

같은 시퀀스 안에서 토큰끼리 주목하는 self-attention과 달리 cross-attention은 애초에 단어 집합과 이미지 패치 집합이라는 서로 다른 두 집합 사이의 정렬 행렬을 만들어낸다. 그래서 한 단어에 해당하는 행 하나를 꺼내 이미지의 격자 모양대로 다시 펼치기만 하면 곧바로 이미지 위에 겹쳐 볼 수 있는 히트맵이 나온다. 클래스 점수의 그래디언트로 지도를 만드는 Grad-CAM과 결과물은 비슷하지만 어텐션 가중치 자체에서 곧바로 얻는다는 점이 다르고 클래스 하나에 매이지 않고 함께 처리되는 어떤 단어에 대해서도 지도를 뽑을 수 있다.


## 예시

