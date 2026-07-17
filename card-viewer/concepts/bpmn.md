---
slug: bpmn
theme: PM
domainLabel: Process Mining
subLabel: 표현 형식
title: BPMN: 실무에서 가장 널리 쓰는 프로세스 표기법
related: Petri Net · 프로세스 트리
---

## 도입
기본 요소는 세 가지입니다. 이벤트는 동그라미로 시작과 종료 타이머나 메시지 같은 중간 이벤트를 나타냅니다. 태스크는 둥근 네모로 실제 업무 단위를 나타내고 안에 또 다른 흐름을 담은 하위 프로세스가 될 수도 있습니다. 게이트웨이는 마름모로 흐름이 갈라지고 합쳐지는 지점을 나타내는데 X 표시는 하나의 경로만 선택되는 배타적 게이트웨이 + 표시는 모든 경로가 동시에 진행되는 병렬 게이트웨이 O 표시는 조건에 따라 하나 이상의 경로가 선택되는 포괄 게이트웨이입니다.

BPMN은 표현력이 넓고 담당 부서를 나타내는 풀과 레인까지 갖추고 있지만 몇몇 게이트웨이 조합과 이벤트 서브프로세스 조합에는 모두가 동의하는 단 하나의 실행 의미가 정해져 있지 않습니다. 반면 Petri Net의 발화 규칙은 항상 단 하나로 정해집니다. 그래서 프로세스 마이닝 도구들은 보통 Petri Net이나 프로세스 트리처럼 건전성을 확실히 검증할 수 있는 형태로 먼저 모델을 만들고 사람이 보기 편하도록 마지막 단계에서만 BPMN으로 옮겨 그립니다.

풀과 레인은 Petri Net에 기본으로 없는 조직 정보를 채워줍니다. 어떤 태스크는 물류팀이 처리하고 어떤 태스크는 재무팀이 처리하는지를 로그의 담당자 정보와 함께 공간적으로 배치해 보여줄 수 있어서 자원 관점의 분석 결과를 사람에게 설명할 때 특히 자주 쓰입니다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<circle cx="40" cy="120" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="54" y1="120" x2="80" y2="120" class="dg-line" stroke-width="1.5"/>
<rect x="80" y="104" width="90" height="32" rx="10" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="125" y="125" font-size="12" text-anchor="middle">주문접수</text>
<line x1="170" y1="120" x2="210" y2="120" class="dg-line" stroke-width="1.5"/>
<polygon points="230,98 252,120 230,142 208,120" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="230" y="125" font-size="13" text-anchor="middle">X</text>
<line x1="240" y1="105" x2="300" y2="66" class="dg-line" stroke-width="1.5"/>
<text x="255" y="80" font-size="11" class="dg-dim">재고 있음</text>
<rect x="300" y="50" width="90" height="32" rx="10" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="345" y="71" font-size="12" text-anchor="middle">출고</text>
<line x1="240" y1="135" x2="300" y2="174" class="dg-line" stroke-width="1.5"/>
<text x="255" y="165" font-size="11" class="dg-dim">재고 없음</text>
<rect x="300" y="158" width="90" height="32" rx="10" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="345" y="179" font-size="12" text-anchor="middle">발주</text>
<line x1="390" y1="66" x2="440" y2="112" class="dg-line" stroke-width="1.5"/>
<line x1="390" y1="174" x2="440" y2="128" class="dg-line" stroke-width="1.5"/>
<polygon points="460,98 482,120 460,142 438,120" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="460" y="125" font-size="13" text-anchor="middle">X</text>
<line x1="482" y1="120" x2="520" y2="120" class="dg-line" stroke-width="1.5"/>
<circle cx="536" cy="120" r="15" fill="none" class="dg-stroke-ink" stroke-width="3"/>
</svg>

_재고 여부에 따라 배타적 게이트웨이가 출고와 발주 두 경로 중 하나만 선택한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
Petri Net은 정확하지만 동그라미와 네모만 보고 업무 담당자가 바로 이해하기는 어렵습니다. 회사에서 흐름도를 그릴 때 실제로 가장 많이 쓰는 표기법은 BPMN입니다. 시작과 끝을 동그라미로 할 일을 둥근 네모로 갈림길을 마름모로 그리는 표기법이라 처음 보는 사람도 어느 정도 읽어낼 수 있습니다.


## 예시

