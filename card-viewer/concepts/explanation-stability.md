---
slug: explanation-stability
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 안정성 검증
title: 설명 안정성: 비슷한 입력엔 비슷한 설명이 나와야 한다
related: Sanity Check(Saliency) · 설명 재현성 · 정책 설명 안정성
---

## 도입
안정성을 재는 대표적인 방법은 국소 립시츠 상수다. 입력 $x$ 주변의 작은 이웃 $B(x,\epsilon)$ 안에서 가장 흔들림이 큰 이웃 $x'$을 찾아 설명 사이 거리를 입력 사이 거리로 나눈다.

$$L(x) = \max_{x' \in B(x,\epsilon)} \frac{\lVert \phi(x) - \phi(x') \rVert}{\lVert x - x' \rVert}$$

이 값이 크면 입력이 아주 조금만 움직여도 설명이 크게 흔들린다는 뜻이다. 입력 거리가 0.01인데 설명 벡터 거리가 0.6이라면 $L(x)$는 60에 가까워지고 실사용 기준으로 상당히 불안정한 축에 속한다.

기울기 기반 설명은 ReLU를 쓰는 신경망에서 특히 흔들리기 쉽다. ReLU는 구간마다 기울기가 0 또는 상수로 뚝뚝 끊긴다. 입력이 활성 패턴의 경계를 살짝 넘는 순간 완전히 다른 뉴런 조합에서 기울기가 계산되어 값이 크게 바뀐다. SmoothGrad 같은 방법은 입력에 가우시안 노이즈를 여러 번 더해 나온 saliency map을 평균 내는 방식으로 이 흔들림을 줄인다.

안정성 지표는 두 방향으로 쓰인다. 설명 기법끼리 비교할 때 그리고 배포 전 점검 항목으로 특정 모델과 설명 기법 조합이 실사용에 적합한지 확인할 때다. 같은 병변이 스캔마다 미세하게 다르게 찍히는 의료영상 진단에서는 안정성 검증이 사실상 필수다.

## 명제


## 그림
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="16" font-size="12">안정적인 경우: 비슷한 입력 → 비슷한 설명</text>
<circle cx="50" cy="55" r="6" class="dg-stroke-ink" fill="none" stroke-width="2"/>
<circle cx="50" cy="75" r="6" class="dg-stroke-ink" fill="none" stroke-width="2"/>
<text x="64" y="59" font-size="12">x</text>
<text x="64" y="79" font-size="12">x′</text>
<line x1="56" y1="60" x2="180" y2="57" class="dg-line" stroke-width="1.5"/>
<line x1="56" y1="72" x2="380" y2="57" class="dg-line" stroke-width="1.5"/>
<rect x="180" y="30" width="54" height="54" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="198" y="48" width="18" height="18" class="dg-accent"/>
<rect x="216" y="48" width="18" height="18" class="dg-accent"/>
<text x="180" y="100" font-size="12">φ(x)</text>
<rect x="380" y="30" width="54" height="54" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="398" y="48" width="18" height="18" class="dg-accent"/>
<rect x="416" y="48" width="18" height="18" class="dg-accent"/>
<text x="380" y="100" font-size="12">φ(x′)</text>
<line x1="234" y1="57" x2="380" y2="57" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="260" y="50" font-size="12">거의 동일</text>
<text x="20" y="146" font-size="12">불안정한 경우: 비슷한 입력 → 전혀 다른 설명</text>
<circle cx="50" cy="185" r="6" class="dg-stroke-ink" fill="none" stroke-width="2"/>
<circle cx="50" cy="205" r="6" class="dg-stroke-ink" fill="none" stroke-width="2"/>
<text x="64" y="189" font-size="12">x</text>
<text x="64" y="209" font-size="12">x′</text>
<line x1="56" y1="190" x2="180" y2="187" class="dg-line" stroke-width="1.5"/>
<line x1="56" y1="202" x2="380" y2="187" class="dg-line" stroke-width="1.5"/>
<rect x="180" y="160" width="54" height="54" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="180" y="160" width="18" height="18" class="dg-accent"/>
<text x="180" y="230" font-size="12">φ(x)</text>
<rect x="380" y="160" width="54" height="54" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="416" y="196" width="18" height="18" class="dg-accent"/>
<text x="380" y="230" font-size="12">φ(x′)</text>
<line x1="234" y1="187" x2="380" y2="187" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="260" y="180" font-size="12">전혀 다름</text>
</svg>

_가까운 입력 두 개를 넣었을 때 설명이 여전히 비슷한지 완전히 달라지는지를 비교한다._

## 문제
국소 립시츠 상수의 정의 $L(x) = \max_{x' \in B(x,\epsilon)} \dfrac{\lVert \phi(x) - \phi(x') \rVert}{\lVert x - x' \rVert}$에 따라 $x_1'$에서의 비율부터 구해보자. $0.10/0.02$를 계산하면 $x_1'$에서의 비율은 ==빈칸== 이다.

## 해설
설명 거리 0.10을 입력 거리 0.02로 나누면 이 이웃에서의 흔들림 비율이 나오기 때문이에요.

**정답: $5$**

## 예시

