---
slug: role-based-multi-agent
theme: LLM
domainLabel: LLM/Agent
subLabel: 멀티에이전트 오케스트레이션
title: 역할 분담형 협업: 코더와 리뷰어처럼 역할을 나누기
related: Supervisor 패턴 · 에이전트 메시지 프로토콜 · 궤적 평가
---

## 도입
하나의 에이전트가 코드를 작성하고 그 코드를 스스로 검토하도록 시키면 자기가 방금 만든 논리 안에서 오류를 찾으려는 경향이 생긴다. 같은 프롬프트 같은 문맥에서 이어지는 판단은 처음의 착오를 그대로 반복하기 쉽다. 역할 분담형 협업은 코더 역할과 리뷰어 역할에 서로 다른 시스템 프롬프트와 서로 다른 관점을 부여해서 이 편향을 깨뜨린다. 리뷰어는 코드를 새로 작성한 적이 없으므로 코더가 당연하게 여긴 전제를 의심할 수 있다.

역할은 순차적으로 이어질 수도 있고 병렬로 진행될 수도 있다. 순차적인 경우 코더가 초안을 내면 리뷰어가 피드백을 주고 코더가 다시 수정하는 루프를 반복한다. 병렬인 경우 예를 들어 리서처 역할과 팩트체커 역할이 동시에 같은 자료를 각자 다른 기준으로 살펴본 뒤 결과를 합친다.

이 패턴이 잘 작동하려면 역할 간 경계가 분명해야 한다. 리뷰어가 코더의 역할까지 겸하면 그저 같은 모델이 프롬프트만 바뀐 채 스스로에게 말을 거는 셈이 되어 서로 다른 관점을 만들어내지 못한다. 역할마다 다른 도구 접근 권한이나 다른 평가 기준을 주는 것도 관점을 실제로 갈라놓는 방법이다.

## 명제


## 그림
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<rect x="60" y="80" width="140" height="56" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="130" y="113" text-anchor="middle" font-size="13">코더</text>
<rect x="400" y="80" width="140" height="56" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="470" y="113" text-anchor="middle" font-size="13">리뷰어</text>
<line x1="200" y1="98" x2="400" y2="98" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="300" y="88" text-anchor="middle" font-size="11" class="dg-dim">코드 초안</text>
<line x1="400" y1="120" x2="200" y2="120" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="300" y="140" text-anchor="middle" font-size="11" class="dg-dim">피드백</text>
</svg>

_코더와 리뷰어가 초안과 피드백을 주고받으며 결과물을 다듬는다._

## 문제
자기검토에서는 리뷰어가 코더 자신이며 동일한 시스템 프롬프트와 동일한 문맥을 그대로 이어받는다. 코더가 $H$를 의심하지 않은 것과 정확히 같은 근거로 리뷰어도 $H$를 의심하지 않을 것이므로, 자기검토에서의 조건부확률은 $r_{자기}=$==빈칸== 이다.

## 해설
완전히 동일한 문맥과 프롬프트로 조건화되어 있으므로 리뷰어가 다른 결론에 이를 여지가 없어 확실성, 즉 1이 돼요.

**정답: $1$**

## 예시

