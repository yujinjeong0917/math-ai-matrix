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
$u_1$의 IoU(교집합/합집합)를 계산하자. 교집합은 창문 영역과 겹치는 3칸이고, 합집합은 창문 영역 4칸에 $u_1$이 바깥에서 추가로 반응한 1칸을 더한 5칸이다. 따라서 $\mathrm{IoU}(u_1,\text{창문}) = $==빈칸== 이다.

## 해설
교집합은 3칸, 합집합은 창문 4칸 중 이미 겹친 3칸을 빼고 u1의 나머지 활성 칸 1칸을 더한 5칸이에요. IoU는 교집합 나누기 합집합이니까 3/5, 즉 0.6이 돼요.

**정답: $\dfrac{3}{5}=0.6$**

## 예시

