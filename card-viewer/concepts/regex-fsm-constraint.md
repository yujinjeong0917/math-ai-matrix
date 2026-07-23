---
slug: regex-fsm-constraint
theme: LLM
domainLabel: LLM/Agent
subLabel: 문법 제약 디코딩
title: 정규식/유한상태 제약: 정규식을 오토마타로 바꿔 토큰을 거르기
related: Grammar-constrained Decoding · 구조화 출력의 트레이드오프
---

## 도입
정규식을 오토마타로 바꾸는 컴파일 작업은 생성이 시작되기 전에 딱 한 번만 이루어진다. 생성 도중에는 매 토큰마다 지금 상태에서 정해진 전이 테이블을 조회해 다음 상태와 허용 토큰 집합을 $O(1)$에 가까운 비용으로 얻는다. 새로 파싱을 다시 수행할 필요가 없다.

이 방식이 CFG 기반 문법 제약 디코딩보다 가벼운 이유는 정규언어가 애초에 중첩이나 재귀를 표현하지 못하기 때문이다. 상태는 미리 정해둔 유한한 집합 안에서만 움직이고 그 상태를 기억하는 데 스택 같은 별도 자료구조가 필요 없다. 반면 CFG는 괄호처럼 임의 깊이로 중첩되는 구조를 다뤄야 해서 지금까지 열려 있는 구조를 기억하는 스택을 매 단계 갱신해야 한다. 이 차이가 토큰당 계산 비용의 차이로 이어진다.

대신 표현할 수 있는 형식의 범위는 좁다. 전화번호나 코드처럼 평평한 패턴에는 잘 맞지만 괄호 짝이나 들여쓰기처럼 구조가 계층적으로 깊어지는 형식은 정규언어로 표현할 수 없어서 결국 CFG 기반의 grammar-constrained decoding으로 넘어가야 한다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="60" cy="100" r="26" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="60" y="105" text-anchor="middle" font-size="12">S0</text>
<circle cx="230" cy="100" r="26" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="230" y="105" text-anchor="middle" font-size="12">S1</text>
<circle cx="400" cy="100" r="26" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="400" y="105" text-anchor="middle" font-size="12">S2</text>
<circle cx="570" cy="100" r="26" fill="none" class="dg-stroke-accent" stroke-width="3"/>
<text x="570" y="105" text-anchor="middle" font-size="12">수락</text>
<line x1="86" y1="100" x2="204" y2="100" class="dg-line" stroke-width="1.5"/>
<text x="145" y="90" text-anchor="middle" font-size="11">숫자</text>
<line x1="256" y1="100" x2="374" y2="100" class="dg-line" stroke-width="1.5"/>
<text x="315" y="90" text-anchor="middle" font-size="11">기호</text>
<line x1="426" y1="100" x2="544" y2="100" class="dg-line" stroke-width="1.5"/>
<text x="485" y="90" text-anchor="middle" font-size="11">숫자</text>
<text x="60" y="150" text-anchor="middle" font-size="11" class="dg-dim">시작 상태</text>
<text x="570" y="150" text-anchor="middle" font-size="11" class="dg-dim">패턴 완성</text>
</svg>

_정규식이 만든 오토마타의 각 상태가 다음에 허용되는 토큰 집합을 정해준다._

## 문제
문자열에 새 문자 $a$를 하나 이어붙였을 때 새 상태 $q_{wa}$는 이전 상태 $q_w$와 전이표 $\delta$만으로 $q_{wa}=\delta(q_w,a)$로 즉시 얻어지고 $w$ 전체를 다시 훑을 필요가 없다. 즉 문자 하나를 처리하는 데 드는 시간은 상수 $O(1)$이다. 그렇다면 길이 $n$인 문자열 전체를 끝까지 처리하는 총 비용은 이 상수 비용을 $n$번 더한 것이므로 ==빈칸== 이다.

## 해설
문자 하나당 O(1)의 비용이 드는 연산을 n개의 문자에 대해 반복하므로 총 비용은 그 합인 O(n)이 되고, 이는 토큰 하나당 비용이 여전히 O(1)로 유지된다는 뜻이에요.

**정답: $O(n)$**

## 예시

