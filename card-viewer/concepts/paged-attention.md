---
slug: paged-attention
theme: LLM
domainLabel: LLM/Agent
subLabel: KV 캐시 · 메모리
title: PagedAttention: KV 캐시를 페이지 단위로 관리하기
related: Multi/Grouped-Query Attention · 프리픽스 캐싱
---

## 도입
PagedAttention은 각 시퀀스의 KV 캐시를 고정 크기 블록(페이지) 여러 개로 쪼개 관리한다. 논리적으로는 하나의 연속된 캐시처럼 보이지만 실제 물리 메모리에서는 블록마다 서로 다른 위치에 흩어져 있을 수 있고 블록 테이블이 논리 위치와 물리 위치를 연결해준다. 새 토큰이 생성될 때마다 필요한 만큼만 새 블록을 할당하므로 시퀀스 길이를 미리 최대치로 예약해둘 필요가 없다.

이 방식이 필요한 이유는 순진한 KV 캐시 구현의 메모리 단편화 문제 때문이다. 요청마다 최대 시퀀스 길이만큼 연속된 공간을 미리 잡아두면 실제 생성 길이가 그보다 짧을 때 남는 공간은 다른 요청이 쓸 수 없이 버려진다. 요청마다 필요한 길이가 제각각이라 연속된 빈 공간을 찾기도 점점 어려워진다. 페이지 단위로 나누면 필요한 만큼만 그때그때 블록을 배정하고 요청이 끝나면 블록을 즉시 회수해 다른 요청에 재사용할 수 있어 메모리 낭비가 거의 사라진다.

블록 단위 관리는 부가 이득도 준다. 여러 요청이 같은 프리픽스, 예를 들어 같은 시스템 프롬프트를 공유한다면 그 프리픽스에 해당하는 블록을 여러 요청이 함께 가리키게 해서 캐시 자체를 복제하지 않고 공유할 수 있다. 결과적으로 PagedAttention은 같은 GPU 메모리로 훨씬 많은 요청을 동시에 처리할 수 있게 해주는 서빙 엔진의 핵심 기법으로 자리잡았다.

## 명제


## 그림
<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="18" font-size="12">기존 방식: 최대 길이만큼 통짜 예약</text>
<rect x="20" y="28" width="320" height="36" class="dg-dim" stroke="none"/>
<rect x="20" y="28" width="90" height="36" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="65" y="50" text-anchor="middle" font-size="11">사용중</text>
<text x="230" y="50" text-anchor="middle" font-size="11" class="dg-dim">낭비되는 예약 공간</text>
<text x="20" y="100" font-size="12">PagedAttention: 논리 시퀀스</text>
<rect x="20" y="110" width="40" height="30" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="40" y="130" text-anchor="middle" font-size="11">P0</text>
<rect x="65" y="110" width="40" height="30" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="85" y="130" text-anchor="middle" font-size="11">P1</text>
<rect x="110" y="110" width="40" height="30" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="130" y="130" text-anchor="middle" font-size="11">P2</text>
<text x="20" y="180" font-size="12">물리 메모리: 블록 테이블로 매핑, 흩어져 있어도 무방</text>
<rect x="60" y="190" width="40" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="210" text-anchor="middle" font-size="11">P1</text>
<rect x="180" y="190" width="40" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="200" y="210" text-anchor="middle" font-size="11">P0</text>
<rect x="300" y="190" width="40" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="320" y="210" text-anchor="middle" font-size="11">P2</text>
<path d="M40,140 C 40,170 200,175 200,190" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="3,3"/>
<path d="M85,140 C 85,160 80,170 80,190" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="3,3"/>
<path d="M130,140 C 130,165 320,175 320,190" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="3,3"/>
</svg>

_논리적으로 이어진 시퀀스도 물리 메모리에서는 블록 테이블을 통해 흩어진 페이지에 매핑된다._

## 문제
$M_{naive}-M_{used}$를 $m$으로 묶어 정리하면 낭비되는 메모리의 총합은 $\text{Waste}_{naive} = $==빈칸== 이다.

## 해설
$BL_{max}m - m\sum_i \ell_i$에서 공통인 $m$을 묶어내고 합 기호 안에 $L_{max}-\ell_i$를 남기면 얻어지는 식이기 때문이에요.

**정답: $m\sum_{i=1}^{B}(L_{max}-\ell_i)$**

## 예시

