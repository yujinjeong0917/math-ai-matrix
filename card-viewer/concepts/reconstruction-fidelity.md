---
slug: reconstruction-fidelity
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 대리모델 신뢰도
title: 재구성 충실도: 설명대로 다시 만들면 똑같이 나오는가
related: 반사실 이미지 생성 · 대리모델 충실도
---

## 도입
전형적인 오토인코더는 입력 $x$를 인코더로 잠재벡터 $z=e(x)$로 압축하고 디코더로 $\hat x=d(z)$를 복원한다. 잠재 차원 $k$가 속성 $A$를 담당한다는 설명이 붙었다면 이 설명이 맞는지는 $z$의 $k$번째 성분만 바꾼 뒤 디코딩한 결과 $d(z_{k\to v})$가 실제로 속성 $A$만 바뀐 그럴듯한 이미지로 나오는지 보면 확인된다.

$$\text{Reconstruction Error} = \lVert x - \hat x \rVert^2$$

기본 재구성오차 외에 설명이 걸린 속성에 대해서는 별도의 속성 예측기 $c$를 하나 더 붙여 $c(d(z_{k\to v}))$가 의도한 속성값 $v$와 얼마나 가까운지도 함께 잰다. 재구성오차는 작은데 속성 예측이 의도와 다르게 나온다면 이미지는 그럴듯하게 복원되지만 그 차원이 지목한 속성과는 무관하다는 뜻이라 설명 자체가 틀렸다고 봐야 한다.

반사실 이미지 생성과 개념은 맞닿아 있지만 목적이 다르다. 반사실 이미지 생성은 예측을 뒤집는 새로운 이미지를 만드는 게 목표이고 재구성 충실도는 이미 나온 설명이 얼마나 정확한지 사후 검증하는 게 목표다.

## 명제


## 그림
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="70" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="60" y="64" font-size="12" text-anchor="middle">입력 x</text>
<line x1="90" y1="100" x2="120" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="120" y="80" width="80" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="160" y="104" font-size="12" text-anchor="middle">인코더</text>
<line x1="200" y1="100" x2="225" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="230" y="100" width="14" height="30" class="dg-dim"/>
<rect x="248" y="90" width="14" height="40" class="dg-dim"/>
<rect x="266" y="80" width="14" height="50" class="dg-accent"/>
<rect x="284" y="105" width="14" height="25" class="dg-dim"/>
<text x="257" y="150" font-size="12" text-anchor="middle">z</text>
<text x="273" y="70" font-size="12" text-anchor="middle">차원 k</text>
<line x1="310" y1="100" x2="335" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="335" y="80" width="80" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="375" y="104" font-size="12" text-anchor="middle">디코더</text>
<line x1="415" y1="100" x2="445" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="450" y="70" width="60" height="60" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="480" y="64" font-size="12" text-anchor="middle">복원 x̂</text>
<path d="M480,130 C 350,190 200,190 60,130" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="270" y="200" font-size="12" text-anchor="middle">재구성오차 비교</text>
</svg>

_잠재 차원을 바꿔 디코딩한 결과가 의도한 속성만 바뀐 그럴듯한 이미지로 나오는지 확인한다._

## 문제
$z_{k\to v}$는 $z$와 오직 $k$번째 성분의 값만 $v$로 바뀌고 나머지 성분은 모두 같다. 유클리드 노름의 정의에 따르면 두 벡터의 거리는 각 성분 차이의 제곱을 모두 더한 뒤 제곱근을 씌운 것인데, 여기서는 $k$번째 성분을 제외한 모든 차이가 0이므로 $\lVert z_{k\to v}-z\rVert$는 ==빈칸==이다.

## 해설
k번째 성분만 v-z_k만큼 다르고 나머지는 0이므로, 유클리드 노름 공식에 그 값의 제곱만 남아 제곱근을 씌우면 절댓값 |v-z_k|가 되기 때문이에요.

**정답: $|v-z_k|$**

## 예시

