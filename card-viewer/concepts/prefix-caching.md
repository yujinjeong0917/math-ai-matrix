---
slug: prefix-caching
theme: LLM
domainLabel: LLM/Agent
subLabel: 프롬프트 캐싱
title: 프리픽스 캐싱: 앞부분이 같으면 그 구간만 재사용하기
related: PagedAttention · 캐시 TTL · 캐시 히트율
---

## 도입
프리픽스 캐싱은 입력 토큰 시퀀스를 앞에서부터 훑으면서 이전에 캐시해둔 시퀀스와 얼마나 겹치는지를 확인한다. 예를 들어 이전 요청의 프리픽스가 시스템 프롬프트 500토큰이었고 이번 요청도 같은 500토큰으로 시작한다면 그 500토큰에 대한 키, 밸류는 이미 계산되어 있으므로 다시 계산하지 않는다. 겹치는 구간이 끝나는 지점부터, 즉 새로 추가된 사용자 질문 부분부터만 새로 순전파를 돌려 키, 밸류를 계산하고 이어붙인다.

이 방식이 필요한 이유는 자기회귀 생성에서 프리필(prefill) 단계, 즉 입력 전체를 한 번 훑어 초기 KV 캐시를 만드는 단계의 비용이 입력 길이에 비례해서 커지기 때문이다. 대화가 길어질수록 매 턴 반복해서 앞부분 전체를 프리필하는 비용이 누적되어 응답이 나오기까지 걸리는 첫 토큰 지연 시간이 계속 늘어난다. 프리픽스 캐싱은 이미 계산해둔 구간의 프리필을 건너뛰어 이 지연을 크게 줄인다.

PagedAttention 같은 블록 단위 KV 캐시 관리와 함께 쓰이면 효과가 더 커진다. 서로 다른 요청이라도 같은 시스템 프롬프트로 시작한다면 그 프리픽스에 해당하는 블록을 여러 요청이 함께 가리키게 해서 계산은 물론 캐시가 차지하는 메모리 자체도 공유할 수 있다. 다만 프리픽스 뒤에 붙는 내용이 조금이라도 달라지면 그 지점부터는 캐시를 재사용할 수 없으므로 자주 바뀌는 내용을 프롬프트 앞쪽에 두지 않는 것이 프리픽스 캐싱의 효과를 살리는 핵심이다.

## 명제


## 그림
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="20" font-size="12">요청 1</text>
<rect x="20" y="30" width="260" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="150" y="54" text-anchor="middle" font-size="12">시스템 프롬프트(프리픽스)</text>
<rect x="280" y="30" width="120" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="340" y="54" text-anchor="middle" font-size="12">질문 1</text>
<text x="420" y="54" font-size="11" class="dg-dim">전체 새로 계산</text>
<text x="20" y="120" font-size="12">요청 2</text>
<rect x="20" y="130" width="260" height="40" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<text x="150" y="154" text-anchor="middle" font-size="12">같은 프리픽스(캐시 재사용)</text>
<rect x="280" y="130" width="120" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="340" y="154" text-anchor="middle" font-size="12">질문 2</text>
<text x="420" y="154" font-size="11" class="dg-dim">여기만 새로 계산</text>
</svg>

_앞부분이 요청마다 동일하면 그 구간의 KV 캐시를 재사용하고 새로 붙은 뒷부분만 계산한다._

## 문제
프리픽스 캐싱을 쓰면 겹치는 $m$개 토큰의 key, value는 이미 계산되어 있으므로 다시 계산할 필요가 없고 새로 추가된 $(L-m)$개 토큰만 계산하면 된다. 따라서 캐싱을 쓸 때 프리필 시간은 $T_1=$==빈칸== 이다.

## 해설
새로 계산해야 하는 토큰이 $(L-m)$개이고 토큰 하나당 평균 계산 시간이 $t_0$이므로 그 둘을 곱한 값이 걸리는 시간이 되기 때문이에요.

**정답: $t_0(L-m)$**

## 예시

