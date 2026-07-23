---
slug: dynamic-context-assembly
theme: LLM
domainLabel: LLM/Agent
subLabel: 컨텍스트 구성 기법
title: 동적 컨텍스트 조립: 요청마다 필요한 조각을 새로 모으기
related: 시스템/유저/어시스턴트 역할 분리 · 컨텍스트 토큰 예산 관리 · 정보 배치 전략
---

## 도입
조립 파이프라인은 보통 몇 단계로 나뉜다. 먼저 질문과 관련된 문서를 검색하고 필요하면 계산기나 외부 API 같은 도구를 호출해 결과를 얻는다. 여기에 최근 대화 이력을 가져오고 앞서 정한 역할 구분과 배치 규칙에 따라 이 조각들을 하나의 메시지 묶음으로 합친다.

이 과정이 필요한 이유는 프롬프트에 들어갈 정보 상당수가 요청 시점이 되기 전까지는 존재하지 않기 때문이다. 도구 실행 결과나 방금 사용자가 보낸 메시지는 미리 프롬프트에 박아둘 수 없다. 정적인 프롬프트로는 이런 실시간 정보를 담을 방법이 없으므로 매 요청마다 다시 조립하는 절차가 필수가 된다.

이 구조는 디버깅 방식도 바꾼다. 답변이 이상하다는 문제 제보를 받으면 시스템 프롬프트만 봐서는 원인을 알 수 없다. 그 요청 순간에 실제로 조립됐던 프롬프트 전체를 그대로 로그로 남겨두어야 나중에 재현하고 원인을 찾을 수 있다.

## 명제


## 그림
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="95" y="50" text-anchor="middle" font-size="12">검색 결과</text>
<rect x="20" y="90" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="95" y="120" text-anchor="middle" font-size="12">도구 실행 결과</text>
<rect x="20" y="160" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="95" y="190" text-anchor="middle" font-size="12">최근 대화 이력</text>
<line x1="170" y1="45" x2="330" y2="100" class="dg-line" stroke-width="1.5"/>
<line x1="170" y1="115" x2="330" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="170" y1="185" x2="330" y2="120" class="dg-line" stroke-width="1.5"/>
<rect x="330" y="70" width="240" height="90" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="450" y="110" text-anchor="middle" font-size="13">이번 요청에서</text>
<text x="450" y="128" text-anchor="middle" font-size="13">새로 조립된 프롬프트</text>
</svg>

_매 요청마다 서로 다른 조각을 모아 그때그때 프롬프트를 새로 만든다._

## 문제
$P_0$가 재조립 없이 모든 요청에 그대로 쓰인다고 가정하자(귀류법). $P_0$에 하드코딩된 값을 $d_i$라 하면, $\mathcal D$의 $m$개 원소 중 실제 요청값과 $d_i$가 정확히 일치하는 경우의 수는 ==빈칸== 가지이다.

## 해설
$P_0$는 오직 하나의 값 $d_i$만 담고 있으므로 그것과 일치하는 원소는 $d_i$ 자기 자신 하나뿐이에요.

**정답: $1$**

## 예시

