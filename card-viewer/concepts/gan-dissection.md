---
slug: gan-dissection
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 구조 특화 설명
title: GAN Dissection: 뉴런 하나가 만드는 개념 찾기
related: Grad-CAM · Cross-Attention 시각화
---

## 도입
먼저 상관관계를 점수화한다. 특정 층의 유닛(채널) $u$가 강하게 반응하는 위치의 집합과 세그멘테이션망이 찾아낸 어떤 개념(나무, 창문, 하늘 등)의 영역을 여러 생성 이미지에 걸쳐 겹침 정도(IoU)로 비교해 그 유닛이 어떤 개념과 가장 잘 맞는지를 찾는다.

다음으로 인과 관계를 검증한다. 후보 유닛의 활성화를 모든 위치에서 0으로 고정한 채 다시 이미지를 생성해 목표 개념의 영역이 얼마나 줄어드는지를 재거나 반대로 그 유닛을 강제로 높은 값에 고정해 개념이 얼마나 넓게 나타나는지를 잰다. 겹침 점수도 높고 개입에 따른 변화도 큰 유닛만이 실제로 해당 개념을 담당하는 유닛으로 인정된다.

모든 유닛이 이렇게 깔끔하게 하나의 개념에 대응하지는 않는다. 특별한 지도 없이 학습됐음에도 상당수의 유닛이 사람이 알아볼 수 있는 부분 개념으로 스스로 분화한다는 관찰 자체가 이 방법의 핵심 전제이고 나머지 유닛들은 뚜렷한 단일 개념 없이 여러 패턴에 걸쳐 반응한다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="40" width="200" height="100" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="130" y="30" font-size="13" text-anchor="middle">생성기 내부 유닛들</text>
<rect x="45" y="55" width="30" height="30" class="dg-dim"/>
<rect x="85" y="55" width="30" height="30" class="dg-dim"/>
<rect x="125" y="55" width="30" height="30" class="dg-accent"/>
<rect x="165" y="55" width="30" height="30" class="dg-dim"/>
<rect x="45" y="95" width="30" height="30" class="dg-dim"/>
<rect x="85" y="95" width="30" height="30" class="dg-dim"/>
<rect x="125" y="95" width="30" height="30" class="dg-dim"/>
<rect x="165" y="95" width="30" height="30" class="dg-dim"/>
<text x="140" y="115" font-size="11" text-anchor="middle">유닛 u</text>
<line x1="230" y1="90" x2="330" y2="90" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="330,85 342,90 330,95" class="dg-accent" stroke="none"/>
<rect x="360" y="40" width="220" height="100" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="470" y="30" font-size="13" text-anchor="middle">생성된 이미지</text>
<path d="M400,120 C410,80 450,70 480,90 C500,100 470,130 440,130 Z" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<text x="470" y="118" font-size="11" text-anchor="middle" class="dg-dim">나무 영역</text>
<text x="320" y="175" font-size="12" text-anchor="middle">유닛 u 끄기 → 나무만 사라짐</text>
<text x="320" y="195" font-size="12" text-anchor="middle" class="dg-dim">유닛 u 강제로 켜기 → 아무 곳에나 나무 생성</text>
</svg>

_특정 유닛을 끄면 해당 개념만 사라지고 강제로 켜면 아무 곳에나 그 개념이 나타난다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
GAN은 무작위 노이즈 하나로부터 사실적인 이미지를 만들어내는데 이 과정은 생성기 내부의 수많은 합성곱 채널을 거치며 이뤄진다. GAN Dissection은 아주 직접적인 질문을 던진다. 이 채널들 중 특정 채널 하나가 나무를 그리는 일이나 창문을 그리는 일처럼 사람이 알아볼 수 있는 하나의 개념을 전담하고 있는가. 이를 확인하려면 이미지를 실제로 분할해주는 별도의 세그멘테이션망으로 생성된 이미지에서 나무나 창문 같은 영역을 찾아낸 뒤 특정 채널이 강하게 반응하는 위치와 그 영역이 얼마나 겹치는지를 여러 이미지에 걸쳐 확인한다.

더 나아가 이 발견을 인과적으로 검증할 수도 있다. 나무를 담당한다고 의심되는 채널을 강제로 꺼버리면 다시 생성한 이미지에서 나무가 사라지고 반대로 그 채널을 모든 위치에서 강제로 켜두면 원래는 나무가 나올 수 없는 자리에도 나무가 그려진다. 단순히 상관관계를 관찰하는 데서 그치지 않고 그 채널을 직접 조작해 개념을 지우거나 그려 넣을 수 있다는 점이 이 방법을 특별하게 만든다.


## 예시

