---
slug: context-window-llm
theme: LLM
domainLabel: LLM/Agent
subLabel: 컨텍스트 관리
title: 컨텍스트 윈도우: 입력 토큰 길이의 제한과 트레이드오프
related: 프롬프트 압축 · 대화 요약
---

## 도입
표준 트랜스포머의 어텐션은 시퀀스 안의 모든 토큰 쌍 사이의 관계를 계산합니다. 토큰 수를 $n$이라 하면 어텐션 계산량과 메모리는 대략 $O(n^2)$로 늘어납니다. 그래서 컨텍스트 윈도우를 단순히 늘리기만 하면 비용이 제곱으로 불어나고, 이것이 초기 모델들의 윈도우가 수천 토큰 수준에 머물렀던 주된 이유입니다.

이후 KV 캐시 최적화, 슬라이딩 윈도우 어텐션, 위치 인코딩 개선 등으로 실질적인 윈도우가 수만에서 수십만 토큰까지 늘었지만 여전히 유한한 예산이라는 사실은 바뀌지 않습니다. 실무에서는 이 예산을 시스템 지시문, 대화 이력, 검색 결과, 출력 여유분으로 나눠 배분해야 하고 어느 하나가 커지면 다른 항목을 줄여야 합니다.

윈도우가 커져도 안에 든 정보를 고르게 잘 쓰는 것은 별개 문제입니다. 컨텍스트 중간에 놓인 정보는 양 끝에 놓인 정보보다 모델이 잘 놓치는 경향이 관찰되어 있고 이를 lost-in-the-middle이라 부릅니다. 그래서 컨텍스트 윈도우를 다루는 실전 기법은 단순히 더 길게가 아니라 무엇을 넣고 무엇을 뺄지, 어디에 배치할지를 판단하는 프롬프트 압축, 대화 요약, 정보 배치 전략과 함께 움직입니다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<text x="40" y="24" font-size="12" class="dg-dim">컨텍스트 윈도우(최대 토큰 수)</text>
<rect x="40" y="40" width="560" height="50" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="40" y="40" width="90" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="85" y="70" font-size="11" text-anchor="middle">시스템</text>
<rect x="130" y="40" width="280" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="270" y="65" font-size="11" text-anchor="middle">대화 이력</text>
<text x="270" y="80" font-size="11" text-anchor="middle">+ 검색결과</text>
<rect x="410" y="40" width="190" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="505" y="70" font-size="11" text-anchor="middle" class="dg-accent">출력 여유분</text>
<path d="M40,110 L10,140" class="dg-line" stroke-width="1.5" fill="none"/>
<polygon points="10,140 20,138 16,128" class="dg-dim"/>
<text x="20" y="160" font-size="12" class="dg-dim">밀려나는 오래된 토큰</text>
</svg>

_고정된 토큰 예산 안에서 시스템, 이력, 출력이 자리를 나눠 쓰고 넘치면 오래된 부분이 밀려납니다._

## 문제
컨텍스트 길이를 원래의 $c$배로 늘리면($n\to cn$), 계산량은 $n^2$에서 $(cn)^2=$==빈칸== 로 늘어난다.

## 해설
$(cn)^2$을 전개하면 $c^2$과 $n^2$의 곱인 $c^2n^2$이 됩니다. 즉 늘어난 배수는 원래 배수의 제곱이에요.

**정답: $c^2 n^2$**

## 예시
윈도우가 128,000토큰이고 시스템 프롬프트가 500토큰, 검색 문서가 3,000토큰을 쓴다면 대화 이력과 출력에 쓸 수 있는 예산은 $128000 - 500 - 3000 = 124500$ 토큰으로 줄어듭니다. 대화가 길어질수록 이 예산을 두고 이력과 출력이 경쟁하게 됩니다.
