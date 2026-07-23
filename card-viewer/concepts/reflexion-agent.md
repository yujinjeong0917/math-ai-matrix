---
slug: reflexion-agent
theme: LLM
domainLabel: LLM/Agent
subLabel: 에이전트 설계 패턴
title: Reflexion: 실패 이유를 스스로 반성하고 다시 시도하기
related: Tree of Thoughts · Plan-and-Execute · 에이전트 상태 머신
---

## 도입
Reflexion은 세 부분으로 나뉜다. 행동을 만드는 액터, 결과를 채점하는 평가자, 실패 이유를 언어로 정리하는 반성 모듈이다. 액터가 시도를 만들면 평가자가 성공인지 실패인지 판단한다. 실패라면 반성 모듈이 이번 시도의 궤적을 보고 무엇이 잘못됐는지 문장으로 요약한다. 이 문장은 별도의 메모리에 저장되고 다음 시도를 만들 때 액터의 입력에 함께 들어간다.

이 구조는 단순 재시도의 한계를 메운다. 단순 재시도는 실패한 시도와 다음 시도 사이에 학습 신호가 전혀 없다. 모델 가중치를 바꾸는 것도 아니고 무엇을 고쳐야 하는지 알려주는 것도 아니라서 같은 실수가 반복되기 쉽다. Reflexion은 가중치를 업데이트하는 대신 실패 원인을 자연어 문장으로 만들어 다음 프롬프트에 끼워 넣는다. 파인튜닝 없이도 시도와 시도 사이에 정보가 이어지게 만드는 값싼 방법이다.

이 방식이 잘 작동하려면 평가자가 신뢰할 수 있어야 한다. 코드라면 실제 테스트 실행 결과가 그 신호고 게임이라면 환경이 주는 보상이 그 신호다. 이렇게 명확한 신호가 있을 때 반성문의 품질도 함께 높아진다. 평가 신호가 애매하면 반성 모듈도 엉뚱한 원인을 짚어낼 수 있다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="30" width="130" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="105" y="60" text-anchor="middle" font-size="13">시도 생성</text>
<rect x="240" y="30" width="130" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="305" y="60" text-anchor="middle" font-size="13">평가</text>
<rect x="460" y="30" width="130" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="525" y="60" text-anchor="middle" font-size="13">완료</text>
<rect x="240" y="150" width="130" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="305" y="180" text-anchor="middle" font-size="13">반성문 작성</text>
<rect x="40" y="150" width="130" height="50" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="105" y="180" text-anchor="middle" font-size="13">반성 메모리</text>
<line x1="170" y1="55" x2="240" y2="55" class="dg-line" stroke-width="1.5"/>
<line x1="370" y1="55" x2="460" y2="55" class="dg-line" stroke-width="1.5"/>
<text x="415" y="45" text-anchor="middle" font-size="12">성공</text>
<line x1="305" y1="80" x2="305" y2="150" class="dg-line" stroke-width="1.5"/>
<text x="330" y="118" font-size="12">실패</text>
<line x1="240" y1="175" x2="170" y2="175" class="dg-line" stroke-width="1.5"/>
<line x1="105" y1="150" x2="105" y2="80" class="dg-stroke-accent" stroke-width="2"/>
<text x="10" y="118" font-size="12" class="dg-dim">다음 시도에</text>
</svg>

_실패하면 반성문을 메모리에 남기고 다음 시도에 그 메모리를 다시 사용한다._

## 문제
액터가 시도를 만들고 평가자가 성공과 실패를 판정하는 구조에서, 시도가 실패할 수 있는 서로 다른 오류 양상이 정확히 $k$가지 있고 성공에 이르는 방식은 $1$가지뿐이라고 하자. 액터가 아무 기억 없이 매번 이 $k+1$가지 결과 중 하나를 균등한 확률로 낸다면(단순 재시도), 한 번의 시도가 성공할 확률은 $p=$==빈칸== 이다.

## 해설
성공에 이르는 결과가 전체 k+1가지 중 1가지이고 액터가 이들을 균등하게 고른다고 가정했으니, 성공 확률은 성공 경우의 수를 전체 경우의 수로 나눈 값이에요.

**정답: $\dfrac{1}{k+1}$**

## 예시
과제: 10 미만 소수의 합을 한 줄 파이썬 코드로 구하기.

**시도 1** <code>sum(range(10))</code> 코드를 냈다. 평가자는 실패로 판정했다. 소수가 아니라 그냥 모든 수를 더했기 때문이다.

**반성문** 소수 판별 조건을 넣지 않고 range 전체를 더해서 틀렸다. 각 수가 소수인지 확인하는 조건을 추가해야 한다.

**시도 2** <code>sum(n for n in range(2,10) if all(n%d for d in range(2,n)))</code> 코드를 냈고 테스트를 통과했다.
