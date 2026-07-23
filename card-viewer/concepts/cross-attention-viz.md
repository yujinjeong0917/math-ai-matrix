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
소프트맥스의 분모는 모든 점수를 지수함수에 넣은 값의 합이다. $\exp(2.0)\approx7.389,\ \exp(1.0)\approx2.718,\ \exp(0.5)\approx1.649,\ \exp(-1.0)\approx0.368$이다. 이 네 값을 모두 더하면 정규화 상수는 $Z=$==빈칸== 이다.

## 해설
네 지수값 7.389, 2.718, 1.649, 0.368을 모두 더하면 소프트맥스의 분모가 나오기 때문이에요.

**정답: $12.124$**

## 예시

