---
slug: grammar-constrained-decoding
theme: LLM
domainLabel: LLM/Agent
subLabel: 문법 제약 디코딩
title: Grammar-constrained Decoding: 문법에 맞는 토큰만 고르게 하기
related: JSON mode · 정규식/유한상태 제약 · 구조화 출력의 트레이드오프
---

## 도입
구현은 생성과 동시에 파서 상태를 함께 유지하는 방식으로 이루어진다. 토큰을 하나 생성할 때마다 지금까지의 출력이 정의한 CFG 안에서 어디까지 파싱됐는지를 갱신하고 그 상태에서 문법적으로 다음에 올 수 있는 토큰 집합만 남긴 뒤 나머지의 확률을 0으로 만든다. JSON mode는 이 기법을 JSON이라는 하나의 고정된 문법에만 적용한 특수한 사례라고 볼 수 있다.

JSON mode와 다른 점은 문법을 하드코딩하지 않고 임의로 정의할 수 있다는 데 있다. 중첩 괄호가 정확히 짝을 맞춰야 하는 구조나 재귀적으로 깊어질 수 있는 구조처럼 임의의 형식 규칙을 CFG로 표현하기만 하면 그 형식을 그대로 강제할 수 있다.

대신 비용이 따른다. CFG는 중첩과 재귀를 표현할 수 있어야 하므로 파서가 스택 같은 상태를 들고 다니며 매 토큰마다 파싱 규칙을 다시 적용해야 한다. 뒤에서 볼 정규식 기반 제약이 상태 하나를 참조하는 것만으로 다음 후보를 정할 수 있는 것과 달리 CFG 제약은 이 스택 연산 때문에 토큰당 계산량이 더 크다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="24" font-size="12" class="dg-dim">모델이 제안한 다음 토큰 후보</text>
<rect x="20" y="40" width="100" height="34" class="dg-dim"/><text x="70" y="62" text-anchor="middle" font-size="12">"apple</text>
<rect x="20" y="84" width="100" height="34" class="dg-dim"/><text x="70" y="106" text-anchor="middle" font-size="12">42</text>
<rect x="20" y="128" width="100" height="34" class="dg-dim"/><text x="70" y="150" text-anchor="middle" font-size="12">{</text>
<rect x="20" y="172" width="100" height="34" class="dg-dim"/><text x="70" y="194" text-anchor="middle" font-size="12">,</text>
<rect x="240" y="70" width="160" height="100" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="320" y="112" text-anchor="middle" font-size="12">문법 규칙에</text>
<text x="320" y="130" text-anchor="middle" font-size="12">맞는 토큰만 통과</text>
<line x1="120" y1="57" x2="240" y2="100" class="dg-line" stroke-width="1.5"/>
<line x1="120" y1="101" x2="240" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="120" y1="145" x2="240" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="120" y1="189" x2="240" y2="150" class="dg-line" stroke-width="1.5"/>
<line x1="400" y1="120" x2="480" y2="120" class="dg-stroke-accent" stroke-width="2"/>
<rect x="480" y="100" width="120" height="40" class="dg-accent"/>
<text x="540" y="125" text-anchor="middle" font-size="13">"apple</text>
<text x="540" y="165" text-anchor="middle" font-size="11" class="dg-dim">다음 토큰으로 채택</text>
</svg>

_문법 규칙과 맞지 않는 토큰은 확률이 0이 되어 후보에서 사라진다._

## 문제
explanation에서 예로 든 '중첩 괄호가 정확히 짝을 맞춰야 하는 구조'를 언어 $L = \{ (^n)^n : n \ge 0 \}$ 로 나타내자. 만약 정규식 기반 제약처럼 상태 하나만 참조하는 유한 상태 기계로 $L$을 정확히 인식할 수 있다고 가정하고 그 기계의 상태 수를 $p$라 하자. 반복 보조정리(pumping lemma)에 따르면 길이가 $p$ 이상인 문자열 $s=(^p)^p$는 $s=xyz$로 쪼갤 수 있고 $|xy|\le p$, $|y|\ge 1$이며 $xy^iz \in L$이 모든 $i\ge0$에 대해 성립해야 한다. $s$의 앞쪽 $p$글자가 전부 여는 괄호이고 $|xy|\le p$이므로 $y$는 ==빈칸== 로만 이루어져야 한다.

## 해설
xy의 길이가 p를 넘지 않는데 s의 처음 p글자가 모두 여는 괄호뿐이라서 그 구간에서 잘라낸 y도 여는 괄호로만 채워질 수밖에 없어요.

**정답: $\text{여는 괄호 (}$**

## 예시

