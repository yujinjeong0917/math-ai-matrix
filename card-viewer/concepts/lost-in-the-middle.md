---
slug: lost-in-the-middle
theme: LLM
domainLabel: LLM/Agent
subLabel: 긴 컨텍스트 배치
title: Lost-in-the-middle: 중간에 넣은 정보는 잘 기억되지 않는다
related: 정보 배치 전략 · 컨텍스트 순서 민감도
---

## 도입
이 현상은 모델 내부의 주의(attention) 배분과 관련이 깊다. 트랜스포머는 모든 토큰을 동등하게 참고할 것 같지만 실제로는 프롬프트 시작 부분과 가장 최근에 나온 부분에 더 강하게 반응하는 경향을 보인다. 시작 부분은 지시문이나 핵심 맥락이 오는 자리라 학습 중에도 중요한 정보로 취급됐을 가능성이 크고 끝부분은 답변을 만들기 직전에 참고하는 자리라 자연스럽게 주의가 쏠린다. 두 효과 어디에도 속하지 못하는 중간 구간의 정보는 상대적으로 희석된다.

이 문제는 검색이 잘 됐는지와는 별개다. 20개 청크를 검색해서 정답이 포함된 청크를 정확히 찾아냈더라도 그 청크를 프롬프트 중간에 그대로 붙여넣으면 모델이 놓칠 수 있다. 그래서 RAG 시스템을 평가할 때는 검색 정확도와 별개로 생성 단계에서 그 정보를 실제로 활용했는지를 따로 확인해야 한다. 특정 문장을 긴 문서 중간에 심어두고 모델이 찾아내는지 보는 needle-in-a-haystack 테스트가 이를 확인하는 대표적인 방법이다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<line x1="70" y1="40" x2="70" y2="210" class="dg-line" stroke-width="1.5"/>
<line x1="70" y1="210" x2="590" y2="210" class="dg-line" stroke-width="1.5"/>
<path d="M100,70 Q220,205 330,195 Q440,205 560,70" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<circle cx="100" cy="70" r="6" class="dg-accent"/>
<circle cx="330" cy="195" r="6" class="dg-dim"/>
<circle cx="560" cy="70" r="6" class="dg-accent"/>
<text x="100" y="55" text-anchor="middle" font-size="12">회상률 높음</text>
<text x="330" y="230" text-anchor="middle" font-size="12" class="dg-dim">회상률 낮음</text>
<text x="560" y="55" text-anchor="middle" font-size="12">회상률 높음</text>
<text x="100" y="245" text-anchor="middle" font-size="12">시작</text>
<text x="330" y="245" text-anchor="middle" font-size="12">중간</text>
<text x="560" y="245" text-anchor="middle" font-size="12">끝</text>
<text x="30" y="30" font-size="12" class="dg-dim">회상률</text>
</svg>

_정보가 프롬프트의 양 끝에 있을 때 회상률이 가장 높고 중간에 있을 때 가장 낮다._

## 문제
$w(i)$가 어디서 가장 작아지는지 보려면 $i$를 연속변수로 보고 미분해야 한다. $w(i)=e^{-\lambda(i-1)}+e^{-\lambda(n-i)}$를 $i$에 대해 미분하면 $w'(i)=$==빈칸== 이다.

## 해설
첫 항은 $i$에 대한 지수이므로 미분하면 $-\lambda$가 곱해지고, 둘째 항은 $-i$에 대한 지수이므로 미분하면 부호가 반대인 $+\lambda$가 곱해져요.

**정답: $-\lambda e^{-\lambda(i-1)} + \lambda e^{-\lambda(n-i)}$**

## 예시
정답 문서를 20개 청크 중 어디에 두느냐만 바꿔가며 정답률을 재보면 대략 이런 모양이 나온다.

맨 앞 1번째 청크에 두면 정답률 92%. 한가운데 10번째 청크에 두면 정답률 61%. 맨 뒤 20번째 청크에 두면 정답률 89%다.

검색은 매번 똑같이 성공했지만 정답 문서의 위치만 바뀌었을 뿐인데 정답률이 30%p 가까이 흔들린다.
