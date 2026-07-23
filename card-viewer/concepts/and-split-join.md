---
slug: and-split-join
theme: PM
domainLabel: Process Mining
subLabel: 동시성 · 검증
title: AND-split/AND-join: 여러 흐름이 동시에 갈라지고 합쳐지기
related: XOR 분기 · 데드락 · 라이브락 검증
---

## 도입
페트리넷에서 트랜지션 $t$가 AND-split이라는 것은 $t$의 출력 자리(place) 집합 $t^\bullet$의 원소가 두 개 이상이라는 뜻입니다. $t$가 발화하면 $t^\bullet$에 속한 모든 자리에 동시에 토큰이 하나씩 놓이고 이후 두 흐름은 서로 다른 트랜지션들을 거치며 독립적으로 진행됩니다. AND-join은 반대로 입력 자리 집합 $^\bullet t$의 원소가 두 개 이상인 트랜지션입니다. $t$는 $^\bullet t$에 속한 모든 자리에 토큰이 있어야만 발화 가능(enabled) 상태가 되므로 먼저 도착한 흐름은 다른 흐름이 따라올 때까지 대기하게 됩니다.

BPMN 표기에서는 같은 개념을 병렬 게이트웨이(parallel gateway)라 부르는데 페트리넷의 AND-split/AND-join과 정확히 대응합니다. 실제 이벤트 로그에서 AND 구조를 확인하려면 두 활동이 서로 다른 순서로 나타나는 트레이스가 둘 다 관찰돼야 합니다. 이메일발송 다음 재고차감이 나오는 케이스와 재고차감 다음 이메일발송이 나오는 케이스가 둘 다 로그에 있으면 두 활동 사이에는 고정된 선후관계가 없다는 뜻이고 이는 병렬로 실행 가능한 구조라는 신호입니다. Alpha Algorithm 같은 발견 알고리즘은 이 병행 관계(concurrency relation)를 로그에서 감지해 AND-split/AND-join 게이트웨이를 모델에 삽입합니다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<circle cx="60" cy="120" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="140" y="104" width="18" height="32" class="dg-accent"/>
<circle cx="300" cy="60" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="300" cy="180" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<rect x="420" y="104" width="18" height="32" class="dg-accent"/>
<circle cx="580" cy="120" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="76" y1="120" x2="140" y2="120" class="dg-line" stroke-width="1.5"/>
<line x1="158" y1="108" x2="290" y2="62" class="dg-line" stroke-width="1.5"/>
<line x1="158" y1="132" x2="290" y2="178" class="dg-line" stroke-width="1.5"/>
<line x1="316" y1="62" x2="420" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="316" y1="178" x2="420" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="438" y1="120" x2="564" y2="120" class="dg-line" stroke-width="1.5"/>
<text x="60" y="155" text-anchor="middle" font-size="12">결제 완료</text>
<text x="149" y="94" text-anchor="middle" font-size="12">AND-split</text>
<text x="429" y="94" text-anchor="middle" font-size="12">AND-join</text>
<text x="300" y="40" text-anchor="middle" font-size="12">이메일 발송</text>
<text x="300" y="205" text-anchor="middle" font-size="12">재고 차감</text>
<text x="300" y="120" text-anchor="middle" font-size="12" class="dg-dim">두 흐름 동시 진행</text>
</svg>

_결제 완료 트랜지션이 두 흐름으로 동시에 갈라졌다가 둘 다 끝나야 다음 단계로 합쳐진다._

## 문제
$t_0$가 발화한 뒤 $t_j$가 발화하기까지 관찰되는 활동 순서(트레이스)는 $a_1,\ldots,a_m$과 $b_1,\ldots,b_n$을 합친 길이 $m+n$짜리 수열이다. 두 흐름 사이에는 어떤 선후관계도 강제되지 않으므로(병행 관계) 이 수열에서 자유로운 것은 오직 $a$ 활동들이 전체 $m+n$자리 중 어디를 차지하느냐뿐이다. 따라서 서로 다른 트레이스의 개수는 전체 $m+n$자리 중 $a$활동이 들어갈 $m$개 자리를 고르는 경우의 수인 ==빈칸==와 같다.

## 해설
두 흐름의 순서를 각각 유지한 채 섞는 경우의 수는 전체 $m+n$자리 중 한쪽 흐름이 차지할 자리를 고르는 조합의 수와 같아요.

**정답: $\binom{m+n}{m}$**

## 예시

