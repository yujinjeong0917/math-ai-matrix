---
slug: knowledge-distillation
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 모델 압축
title: 지식증류: 큰 모델의 지식을 작은 모델로 옮기기
related: 양자화 · 프루닝
---

## 도입
지식증류는 교사 모델의 출력을 그대로 정답처럼 쓰지 않고 온도(temperature) $T$로 부드럽게 만든 소프트맥스를 씁니다. 클래스 $i$의 확률은 다음과 같이 계산됩니다.$$p_i = \frac{\exp(z_i/T)}{\sum_j \exp(z_j/T)}$$$T=1$이면 보통의 소프트맥스와 같지만 $T$를 키우면 확률 분포가 평평해져 1등 클래스뿐 아니라 2등, 3등 클래스의 상대적인 크기 차이까지 잘 드러납니다. 이렇게 드러나는 클래스 간 유사성 정보를 흔히 다크 날리지(dark knowledge)라 부릅니다.

학생 모델의 손실함수는 두 항으로 구성됩니다. 하나는 정답 라벨과 비교하는 일반적인 교차 엔트로피이고 다른 하나는 같은 온도로 부드럽게 만든 학생의 출력과 교사의 출력 사이의 차이(주로 KL 발산)입니다. 두 항을 가중합해 학생이 정답도 맞히면서 동시에 교사의 확률 분포 형태도 따라가도록 학습시킵니다.

지식증류는 모델 구조를 바꾸지 않는 양자화나 프루닝과 달리 아예 더 작은 구조를 가진 별도의 학생 모델을 새로 학습시킨다는 점이 다릅니다. 그래서 세 방법은 종종 함께 쓰입니다. 큰 교사 모델의 지식을 작은 학생 구조로 증류한 뒤 그 학생 모델을 다시 양자화하거나 프루닝해 더 가볍게 만드는 식입니다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="50" width="150" height="140" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="105" y="115" text-anchor="middle" font-size="13">교사 모델</text>
<text x="105" y="135" text-anchor="middle" font-size="12" class="dg-dim">크고 정확함</text>
<line x1="180" y1="120" x2="250" y2="120" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="250,120 238,114 238,126" class="dg-accent"/>
<rect x="270" y="80" width="24" height="90" class="dg-accent"/>
<rect x="304" y="120" width="24" height="50" class="dg-dim"/>
<rect x="338" y="160" width="24" height="10" class="dg-dim"/>
<text x="316" y="185" text-anchor="middle" font-size="11">부드러운 확률 분포</text>
<line x1="370" y1="120" x2="440" y2="120" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="440,120 428,114 428,126" class="dg-accent"/>
<rect x="450" y="85" width="130" height="70" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="515" y="115" text-anchor="middle" font-size="13">학생 모델</text>
<text x="515" y="133" text-anchor="middle" font-size="12" class="dg-dim">작고 빠름</text>
</svg>

_교사 모델이 내놓는 부드러운 확률 분포를 학생 모델이 함께 학습합니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
정확도가 높은 큰 모델을 그대로 서비스에 올리기에는 느리고 비용이 많이 드는 경우가 많습니다. 그렇다고 작은 모델을 정답 라벨만으로 처음부터 학습시키면 큰 모델만큼의 성능이 잘 나오지 않습니다. 지식증류는 이미 학습된 큰 모델(교사)이 내놓는 출력을 작은 모델(학생)이 흉내 내도록 학습시켜 이 간극을 줄이는 방법입니다.

정답 라벨은 고양이 사진에 대해 고양이라는 답 하나만 알려주지만 교사 모델은 고양이일 확률이 90퍼센트, 개일 확률이 8퍼센트, 자동차일 확률이 0.01퍼센트라는 식으로 더 풍부한 정보를 담은 확률 분포를 내놓습니다. 학생은 이 분포까지 함께 배우면서 정답 라벨만으로는 얻을 수 없던 힌트를 얻습니다.


## 예시

