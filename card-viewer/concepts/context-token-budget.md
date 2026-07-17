---
slug: context-token-budget
theme: LLM
domainLabel: LLM/Agent
subLabel: 컨텍스트 구성 기법
title: 컨텍스트 토큰 예산 관리: 한정된 토큰을 어디에 나눠 쓸까
related: 동적 컨텍스트 조립 · 정보 배치 전략
---

## 도입
토큰 예산은 대략 $T_{\text{system}} + T_{\text{history}} + T_{\text{retrieval}} + T_{\text{output}} \le T_{\text{max}}$ 형태의 부등식으로 생각할 수 있다. 요청을 보내기 전에 토크나이저로 각 조각의 토큰 수를 미리 세어보고 이 부등식을 넘지 않도록 조립 단계에서 조각을 줄이거나 자른다.

예산을 안 짜면 어디부터 잘릴지 예측할 수 없다는 게 문제다. API가 알아서 자를 경우 흔히 오래된 대화 턴부터 잘리는데 이게 항상 안전한 선택은 아니다. 대화 초반에 사용자가 밝힌 중요한 전제가 잘려나가면 이후 답변이 그 전제를 잊어버린 것처럼 흘러갈 수 있다. 그래서 이력은 요약으로 압축하고 검색 결과는 관련도 상위 몇 개로만 자르는 식으로 어떤 부분을 먼저 줄일지 직접 정하는 편이 낫다.

토큰 예산은 성능 문제만이 아니라 비용 문제이기도 하다. 대부분의 API는 토큰 수만큼 과금하므로 예산을 관리하는 일은 곧 요청 하나의 비용 상한을 관리하는 일과 같다.

## 명제


## 그림
<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg">
<text x="40" y="30" font-size="13">모델의 최대 토큰 한도</text>
<rect x="40" y="60" width="560" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="40" y="60" width="35" height="50" class="dg-dim"/>
<rect x="75" y="60" width="105" height="50" class="dg-dim"/>
<rect x="180" y="60" width="280" height="50" class="dg-accent"/>
<rect x="460" y="60" width="140" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="58" y="140" text-anchor="middle" font-size="11">시스템</text>
<text x="128" y="140" text-anchor="middle" font-size="11">대화 이력</text>
<text x="320" y="140" text-anchor="middle" font-size="11">검색 결과</text>
<text x="530" y="140" text-anchor="middle" font-size="11">출력 여유분</text>
</svg>

_한정된 토큰 한도 안에서 각 구성요소가 쓸 몫을 미리 정해둔다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
모델이 아무리 긴 컨텍스트를 지원해도 무한하지는 않다. 시스템 프롬프트와 대화 이력과 검색 결과를 다 합쳤는데 모델의 최대 토큰 수를 넘기면 요청 자체가 거부되거나 오래된 내용부터 잘려나간다.

그래서 각 구성요소에 토큰을 얼마나 배분할지 미리 정해둬야 한다. 시스템 프롬프트에 몇 토큰 대화 이력에 몇 토큰 검색 결과에 몇 토큰 그리고 모델이 답변을 쓸 공간까지 남겨두고 나머지를 나눠 쓰는 식이다. 예산을 안 짜두면 검색 결과를 욕심껏 채워넣다가 정작 모델이 답을 쓸 자리가 모자라는 상황이 벌어진다.


## 예시
모델의 최대 토큰이 8000이라고 하면 예산을 이렇게 나눌 수 있다.

시스템 프롬프트 500토큰. 대화 이력 1500토큰. 검색 결과 4000토큰. 나머지 2000토큰은 모델의 답변 출력용으로 비워둔다.

검색 결과를 5000토큰까지 채우고 싶어도 출력 여유분을 지키려면 상위 청크 몇 개만 남기고 나머지는 잘라내야 한다.
