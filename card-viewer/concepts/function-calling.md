---
slug: function-calling
theme: LLM
domainLabel: LLM/Agent
subLabel: 도구 사용 · 함수 호출
title: Function Calling: 모델이 함수 이름과 인자를 구조화해서 뱉기
related: Tool Use 스키마 설계 · MCP
---

## 도입
개발자는 요청할 때 사용 가능한 함수 목록을 이름과 설명과 인자 스키마 형태로 모델에 함께 전달한다. 모델은 사용자의 질문을 보고 함수를 부를 필요가 있다고 판단하면 자유문 대신 함수 이름과 인자를 채운 구조화된 출력을 낸다. 애플리케이션은 이 출력을 파싱해 실제 함수를 실행하고 그 결과를 새 메시지로 모델에게 되돌려준다. 모델은 그 결과를 바탕으로 이어서 답을 완성하거나 필요하면 또 다른 함수를 부른다.

이 방식이 필요한 이유는 언어모델의 출력이 기본적으로 자유문이기 때문이다. Function Calling 이전에는 모델이 낸 문장에서 정규식이나 규칙으로 의도와 인자를 억지로 뽑아내야 했고 문장 표현이 조금만 달라져도 파싱이 깨졌다. 모델 제공사들은 구조화된 함수 호출 형식을 안정적으로 내도록 별도로 정렬한 모델을 내놓았고 그 결과 모델이 하려는 행동이 사람이 읽는 문장이 아니라 기계가 그대로 실행할 수 있는 형식으로 나오게 됐다.

한 번의 대화 안에서 모델은 여러 번 함수를 연달아 부를 수 있다. 검색 함수로 정보를 찾은 뒤 그 결과를 보고 계산 함수를 부르는 식이다. 언제 함수 호출을 멈추고 최종 답을 낼지도 모델이 스스로 판단한다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="90" width="110" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="75" y="120" text-anchor="middle" font-size="13">사용자 질문</text>
<rect x="180" y="90" width="100" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="230" y="120" text-anchor="middle" font-size="13">모델</text>
<rect x="330" y="90" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="405" y="115" text-anchor="middle" font-size="12">함수 실행</text>
<text x="405" y="132" text-anchor="middle" font-size="12" class="dg-dim">(앱 코드)</text>
<rect x="530" y="90" width="90" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="575" y="120" text-anchor="middle" font-size="13">최종 답</text>
<line x1="130" y1="115" x2="180" y2="115" class="dg-line" stroke-width="1.5"/>
<line x1="280" y1="115" x2="330" y2="115" class="dg-line" stroke-width="1.5"/>
<text x="305" y="80" text-anchor="middle" font-size="12">이름+인자(JSON)</text>
<path d="M405,90 L405,50 L230,50 L230,90" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="317" y="42" text-anchor="middle" font-size="12">실행 결과 반환</text>
<line x1="280" y1="130" x2="530" y2="130" class="dg-line" stroke-width="1.5"/>
<text x="405" y="165" text-anchor="middle" font-size="12" class="dg-dim">답 완성 시</text>
</svg>

_모델은 함수 이름과 인자만 구조화해서 내고 실제 실행과 결과 반환은 애플리케이션이 담당한다._

## 문제
Function Calling 이전에는 모델이 자유문으로 의도를 표현했다고 하자. 같은 의도라도 자연어로는 여러 방식으로 풀어 쓸 수 있는데, 이런 동등한 표현이 정확히 $V$가지 있고 모델이 이 $V$가지 표현 중 하나를 균등하게 골라 낸다고 하자. 개발자는 정규식이나 규칙으로 미리 예상한 표현 방식만 인식하도록 파서를 짜는데, 그렇게 인식 가능한 표현이 $V$가지 중 $r$가지($r<V$)뿐이라면, 모델이 낸 한 번의 출력이 파서에 의해 올바르게 인식될 확률은 ==빈칸== 이다.

## 해설
V가지 표현 중 파서가 인식하는 표현이 r가지이고 모델이 그중 하나를 균등하게 고른다고 가정했으니, 인식 확률은 인식 가능한 경우의 수를 전체 경우의 수로 나눈 비율이에요.

**정답: $\dfrac{r}{V}$**

## 예시

