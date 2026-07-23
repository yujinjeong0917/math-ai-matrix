---
slug: ice-score
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 우선순위화
title: ICE 스코어: 영향력, 확신도, 실행난이도를 곱해 우선순위 매기기
related: PIE 프레임워크 · 인풋 지표 트리
---

## 도입
ICE는 Impact, Confidence, Ease 세 요소의 곱이다. $\mathrm{ICE} = I \times C \times E$이며 보통 각 요소를 1점에서 10점 사이로 매긴다. Impact는 성공했을 때 지표에 미칠 영향의 크기, Confidence는 효과가 있을 것이라는 근거의 강도, Ease는 실행이 얼마나 쉬운지를 뜻하며 어려울수록 낮은 점수를 준다.

곱셈 구조를 쓰는 이유는 세 요소 중 하나라도 아주 낮으면 전체 점수도 낮아야 합리적이기 때문이다. 아무리 임팩트가 커도 성공 확신이 전혀 없거나 구현이 극도로 어렵다면 그 아이디어를 우선순위 상위에 둘 이유가 없다. 반대로 덧셈으로 세 점수를 합치면 한 요소가 낮아도 다른 두 요소가 높으면 점수가 부풀려져서 이런 걸러내기 효과가 사라진다.

ICE는 RICE 프레임워크에서 Reach(영향을 받는 사용자 규모)를 뺀 더 가벼운 버전으로 볼 수 있다. Reach까지 정확히 추정하려면 데이터 분석이 필요하지만 ICE는 팀원들이 감으로 빠르게 점수를 매겨도 되도록 설계되어 스프린트 계획이나 브레인스토밍처럼 속도가 중요한 자리에 적합하다. 다만 점수가 주관적이라 사람마다 기준이 다르고 특히 Ease를 실제보다 낙관적으로 매기는 경향이 흔해서 여러 명이 각자 점수를 매긴 뒤 평균을 쓰는 방식이 권장된다.

## 명제


## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="200" x2="420" y2="200" class="dg-line" stroke-width="1.5"/>
<rect x="60" y="80" width="60" height="120" class="dg-dim"/>
<text x="90" y="70" font-size="12" text-anchor="middle">Impact 8</text>
<text x="145" y="145" font-size="16" text-anchor="middle">×</text>
<rect x="170" y="95" width="60" height="105" class="dg-dim"/>
<text x="200" y="85" font-size="12" text-anchor="middle">Confidence 7</text>
<text x="255" y="145" font-size="16" text-anchor="middle">×</text>
<rect x="280" y="110" width="60" height="90" class="dg-dim"/>
<text x="310" y="100" font-size="12" text-anchor="middle">Ease 6</text>
<text x="365" y="145" font-size="16" text-anchor="middle">=</text>
<rect x="400" y="70" width="130" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="465" y="105" font-size="16" text-anchor="middle">ICE 336</text>
</svg>

_세 항목 점수를 곱해 하나의 점수로 우선순위를 정한다._

## 문제
덧셈 구조에서 아이디어 A의 총점은 $\mathrm{Sum}_A=I+C+E=8+7+6=$==빈칸==이다.

## 해설
세 점수 8, 7, 6을 그냥 더하면 21이 나와요.

**정답: $21$**

## 예시
아이디어 A는 Impact 8, Confidence 7, Ease 6으로 평가받아 $\mathrm{ICE} = 8 \times 7 \times 6 = 336$이다. 아이디어 B는 Impact 9로 더 높지만 Confidence가 4로 낮아 $\mathrm{ICE} = 9 \times 4 \times 9 = 324$에 그친다.

총점은 A가 336으로 B의 324보다 근소하게 높아 A를 먼저 테스트하는 것이 합리적이다. Impact만 보면 B가 앞서 보이지만 곱셈 구조가 확신도 낮은 아이디어의 순위를 자연스럽게 끌어내린 것이다.
