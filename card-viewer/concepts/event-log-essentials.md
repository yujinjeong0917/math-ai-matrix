---
slug: event-log-essentials
theme: PM
domainLabel: Process Mining
subLabel: 로그 구조 · 품질 이슈
title: 이벤트 로그의 필수 3요소: 케이스ID, 활동명, 타임스탬프
related: 로그 불완전성 · 노이즈 필터링
---

## 도입
케이스ID(case id)는 같은 프로세스 인스턴스에 속한 이벤트들을 묶는 열쇠입니다. 주문 하나, 대출심사 하나, 고객상담 하나가 각각 케이스가 되고 그 케이스 안에서 일어난 여러 이벤트가 같은 케이스ID를 공유합니다. 활동명(activity)은 그 이벤트에서 실제로 무슨 일이 일어났는지를 나타내는 라벨입니다. 접수, 심사, 승인처럼 사람이 읽을 수 있는 업무 단위여야 하고 지나치게 세분화되면 트레이스가 너무 길고 다양해져서 패턴을 찾기 어려워집니다. 타임스탬프(timestamp)는 이벤트가 일어난 시각으로 케이스ID로 묶인 이벤트들을 시간순으로 정렬해 실제 실행 순서를 복원하는 데 씁니다.

이 세 컬럼을 갖춘 로그는 흔히 CSV나 XES(eXtensible Event Stream) 형식으로 저장됩니다. XES는 IEEE 표준으로 케이스와 이벤트를 XML 구조로 표현하며 케이스ID, 활동명, 타임스탬프 외에도 자원(resource, 누가 처리했는지)이나 비용 같은 추가 속성을 표준화된 방식으로 함께 담을 수 있습니다. 활동 하나가 시작과 끝을 모두 기록하는 로그라면 타임스탬프도 시작시각과 종료시각 두 개로 나뉘는데 이 경우 대기시간과 처리시간을 구분해서 볼 수 있어 병목구간 분석의 정밀도가 크게 올라갑니다.

## 명제


## 그림
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="330" height="30" class="dg-dim" stroke="none"/>
<rect x="20" y="20" width="330" height="120" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="130" y1="20" x2="130" y2="140" class="dg-line" stroke-width="1"/>
<line x1="240" y1="20" x2="240" y2="140" class="dg-line" stroke-width="1"/>
<line x1="20" y1="50" x2="350" y2="50" class="dg-line" stroke-width="1"/>
<line x1="20" y1="80" x2="350" y2="80" class="dg-line" stroke-width="1"/>
<line x1="20" y1="110" x2="350" y2="110" class="dg-line" stroke-width="1"/>
<text x="75" y="39" text-anchor="middle" font-size="12">케이스ID</text>
<text x="185" y="39" text-anchor="middle" font-size="12">활동명</text>
<text x="295" y="39" text-anchor="middle" font-size="12">타임스탬프</text>
<text x="75" y="69" text-anchor="middle" font-size="12">C-1001</text>
<text x="185" y="69" text-anchor="middle" font-size="12">접수</text>
<text x="295" y="69" text-anchor="middle" font-size="12">09:02</text>
<text x="75" y="99" text-anchor="middle" font-size="12">C-1002</text>
<text x="185" y="99" text-anchor="middle" font-size="12">접수</text>
<text x="295" y="99" text-anchor="middle" font-size="12">09:05</text>
<text x="75" y="129" text-anchor="middle" font-size="12">C-1001</text>
<text x="185" y="129" text-anchor="middle" font-size="12">심사</text>
<text x="295" y="129" text-anchor="middle" font-size="12">09:40</text>
<rect x="24" y="53" width="322" height="24" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<rect x="24" y="113" width="322" height="24" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="450" y="90" text-anchor="middle" font-size="12">같은 케이스ID를</text>
<text x="450" y="106" text-anchor="middle" font-size="12">시간순으로 묶으면</text>
<text x="450" y="122" text-anchor="middle" font-size="12">하나의 트레이스</text>
</svg>

_같은 케이스ID를 가진 행들을 타임스탬프 순으로 묶으면 하나의 트레이스가 된다._

## 문제
각 활동의 처리시간(processing time)은 종료시각에서 시작시각을 뺀 값입니다: $\text{processing}_1=e_1-s_1=1, \text{processing}_2=e_2-s_2=2, \text{processing}_3=e_3-s_3=1$. 세 처리시간의 합은 $1+2+1=$ ==빈칸== 시간입니다.

## 해설
1과 2, 1을 더하면 4시간이 나오기 때문이에요.

**정답: $4$**

## 예시

