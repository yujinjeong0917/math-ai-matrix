---
slug: deadlock-livelock-verification
theme: PM
domainLabel: Process Mining
subLabel: 동시성 · 검증
title: 데드락 · 라이브락 검증: 멈추거나 영원히 도는 상태 찾아내기
related: AND-split/AND-join · XOR 분기
---

## 도입
페트리넷의 상태는 마킹(marking)이라 부르는 자리들의 토큰 분포로 표현됩니다. 초기 마킹 $m_0$에서 트랜지션을 하나씩 발화시키며 도달할 수 있는 모든 마킹을 모으면 도달가능성 그래프(reachability graph)가 만들어집니다. 어떤 마킹 $m$에서 발화 가능한 트랜지션이 하나도 없는데 $m$이 정해둔 최종 마킹 $m_f$도 아니라면 그 $m$은 데드락입니다. 워크플로우넷에서는 보통 최종 마킹을 종료 자리에 토큰이 하나만 있는 상태로 정의하므로 데드락은 종료 자리에 도달하지 못한 채 모든 흐름이 막힌 상태를 뜻합니다.

라이브락은 도달가능성 그래프 위의 순환 구조로 나타납니다. $m_0$에서 출발한 발화열이 몇 개의 마킹을 계속 오가기만 하고 $m_f$를 포함하지 않는 강연결요소(strongly connected component)에 갇혀버리면 그 흐름은 영원히 종료되지 않습니다. 트랜지션 자체는 계속 발화되므로 데드락처럼 완전히 멈춘 상태는 아니지만 결과적으로 종료라는 목적지에는 도달하지 못한다는 점에서 데드락과 같은 결함군으로 묶입니다.

van der Aalst가 정의한 사운드니스(soundness)는 워크플로우넷이 이런 결함에서 자유로운지를 검증하는 표준 기준입니다. 도달가능한 모든 마킹에서 $m_f$로 가는 경로가 존재한다는 완료가능성(option to complete), $m_f$에 도달했을 때 다른 자리에는 토큰이 남아있지 않다는 적절한 종료(proper completion), 어떤 트랜지션도 영원히 발화 기회를 얻지 못하지는 않는다는 조건을 모두 만족해야 사운드하다고 인정됩니다. ProM이나 PM4Py 같은 도구는 발견한 모델의 도달가능성 그래프를 직접 계산해 이 조건을 자동으로 점검하는 기능을 제공합니다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<circle cx="60" cy="130" r="16" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="60" y="164" text-anchor="middle" font-size="12">m0</text>
<circle cx="230" cy="60" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="420" cy="60" r="16" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="420" cy="60" r="10" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="420" y="34" text-anchor="middle" font-size="12">정상 종료 mf</text>
<circle cx="230" cy="130" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="420" cy="130" r="14" fill="none" class="dg-dim" stroke-width="1.5"/>
<text x="420" y="160" text-anchor="middle" font-size="12" class="dg-dim">데드락(진행 불가)</text>
<circle cx="230" cy="210" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="420" cy="210" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="325" y="244" text-anchor="middle" font-size="12">라이브락(무한 순환)</text>
<line x1="74" y1="122" x2="216" y2="66" class="dg-line" stroke-width="1.5"/>
<line x1="244" y1="60" x2="404" y2="60" class="dg-line" stroke-width="1.5"/>
<line x1="76" y1="130" x2="216" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="244" y1="130" x2="406" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="72" y1="144" x2="220" y2="204" class="dg-line" stroke-width="1.5"/>
<line x1="244" y1="210" x2="406" y2="210" class="dg-stroke-accent" stroke-width="1.5"/>
<path d="M420,196 C 350,165 300,165 232,196" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
</svg>

_도달가능성 그래프에서 데드락은 더 나아갈 곳이 없는 상태, 라이브락은 종료 상태로 가지 못하고 맴도는 순환이다._

## 문제
먼저 OTC가 성립한다고 가정하고, 어떤 도달 가능한 마킹 $m \neq m_f$가 데드락이라고 가정해 모순을 끌어내 보자. $m$이 데드락이면 $m$에서 발화 가능한 트랜지션이 하나도 없으므로 $m$에서 도달 가능한 마킹의 집합은 ==빈칸==뿐이다.

## 해설
발화 가능한 트랜지션이 하나도 없으면 $m$에서 더 나아갈 수 있는 마킹이 없으므로 $R(m)$은 $m$ 자기 자신만 포함해요.

**정답: $\{m\}$**

## 예시

