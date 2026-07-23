---
slug: context-placement-strategy
theme: LLM
domainLabel: LLM/Agent
subLabel: 긴 컨텍스트 배치
title: 정보 배치 전략: 중요한 건 앞이나 뒤에 놓기
related: Lost-in-the-middle · 컨텍스트 순서 민감도 · 컨텍스트 토큰 예산 관리
---

## 도입
이 전략은 모델의 주의 편향을 없애려는 시도가 아니라 그 편향을 그대로 이용하는 방식이다. lost-in-the-middle이 보여주듯 시작과 끝은 회상률이 높은 구간이므로 정말 중요한 정보를 그 구간에 배치해서 손해를 최소화한다. 반대로 배경 설명이나 참고용 자료처럼 놓쳐도 치명적이지 않은 내용은 중간에 채운다.

실무에서는 여기에 재정렬(rerank) 단계를 더한다. 검색 결과를 관련도 순서 그대로 나열하면 가장 중요한 청크가 우연히 컨텍스트 한가운데에 놓일 수 있다. 그래서 관련도가 가장 높은 청크를 맨 앞이나 맨 끝으로 옮기고 나머지를 중간에 배치하는 재정렬을 거친 뒤에 프롬프트를 조립한다.

다만 이 전략은 근본적인 해결책이 아니라 완화책이다. 정말 중요한 정보가 너무 많아서 시작과 끝 구간만으로는 다 담을 수 없다면 배치를 아무리 잘해도 일부는 여전히 중간에 놓일 수밖에 없다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="70" width="560" height="60" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="40" y="70" width="120" height="60" class="dg-accent"/>
<rect x="160" y="70" width="320" height="60" class="dg-dim"/>
<rect x="480" y="70" width="120" height="60" class="dg-accent"/>
<text x="100" y="105" text-anchor="middle" font-size="12">핵심 지시</text>
<text x="320" y="105" text-anchor="middle" font-size="12">참고 자료 다수</text>
<text x="540" y="105" text-anchor="middle" font-size="12">질문·핵심 재강조</text>
<text x="40" y="50" font-size="13">프롬프트 시작</text>
<text x="600" y="50" text-anchor="end" font-size="13">프롬프트 끝</text>
<text x="320" y="160" text-anchor="middle" font-size="12" class="dg-dim">회상률이 낮은 구간에는 덜 중요한 내용을 둔다</text>
</svg>

_핵심 지시와 질문은 양 끝에, 부수적인 참고 자료는 중간에 배치한다._

## 문제
가장 단순한 경우로 두 위치 $a,b$ ($w(a) > w(b)$인 서로 다른 위치)에 중요도가 다른 두 조각 $v_1 > v_2$를 배정하는 상황만 떼어서 보자. 배정 (i): $v_1\to a,\, v_2\to b$이면 $S_1 = v_1 w(a) + v_2 w(b)$이다. 배정 (ii)처럼 두 조각의 자리를 맞바꾸면, 즉 $v_1\to b,\, v_2\to a$이면 $S_2 = $==빈칸== 이다.

## 해설
두 조각의 자리를 서로 바꿨으므로 $v_1$은 이제 $w(b)$와, $v_2$는 $w(a)$와 곱해져요.

**정답: $v_1 w(b) + v_2 w(a)$**

## 예시

