---
slug: schema-evolution
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 데이터 계약
title: 스키마 진화 관리: 필드가 늘거나 줄어도 하위 시스템이 안 깨지게 하기
related: 데이터 계약 · 데이터 품질 체크
---

## 도입
안전한 진화의 기본 규칙은 하위 호환을 유지하는 변경과 깨는 변경을 구분하는 것입니다. 새 필드를 선택적으로 추가하는 것은 대체로 안전합니다. 기존 코드는 그 필드를 몰라도 계속 동작합니다. 반면 필드 이름을 바꾸거나 타입을 바꾸거나 필수였던 필드를 삭제하는 것은 깨는 변경입니다. 이런 변경은 한 번에 밀어넣지 않고 새 필드를 먼저 추가해 두고 옛 필드와 한동안 병행 제공한 다음 모든 소비자가 새 필드로 옮겨간 뒤에야 옛 필드를 제거하는 단계적 절차를 거칩니다.

이 절차 없이 필드를 즉시 삭제하면 그 필드를 참조하던 다운스트림 코드가 예외를 던지거나 해당 컬럼이 없다는 이유로 파이프라인 전체가 실패합니다. 반대로 필수 필드를 아무 공지 없이 추가하면 기존 데이터를 읽던 코드는 문제없이 동작하지만 새로 그 필드를 필요로 하는 소비자 입장에서는 과거 데이터에 그 필드가 비어 있어 처리 로직을 분기해야 하는 부담이 생깁니다.

스키마 레지스트리를 두고 버전마다 스키마를 등록하며 새 버전이 이전 버전과 호환되는지를 자동으로 검사하는 방식이 널리 쓰입니다. 호환성 검사를 통과하지 못하는 변경은 배포 자체가 막히기 때문에 데이터 계약이 정적으로 정의한 규칙을 실제 배포 과정에서 지속적으로 강제하는 역할을 합니다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="100" x2="600" y2="100" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="100" cy="100" r="6" class="dg-dim" stroke="none"/>
<text x="100" y="130" text-anchor="middle" font-size="11">기존 필드만 존재</text>
<circle cx="280" cy="100" r="6" class="dg-accent" stroke="none"/>
<text x="280" y="80" text-anchor="middle" font-size="11">새 필드 추가</text>
<text x="280" y="130" text-anchor="middle" font-size="10" class="dg-dim">옛 필드와 병행 제공</text>
<circle cx="440" cy="100" r="6" class="dg-accent" stroke="none"/>
<text x="440" y="80" text-anchor="middle" font-size="11">모든 소비자 이전 완료</text>
<circle cx="580" cy="100" r="6" class="dg-dim" stroke="none"/>
<text x="580" y="130" text-anchor="middle" font-size="11">옛 필드 제거</text>
</svg>

_새 필드는 옛 필드와 병행 제공된 뒤 모든 소비자가 옮겨가야 제거됩니다._

## 문제
소비자가 스키마 $S_r=(F_r,D_r)$로 어떤 데이터 $d$를 읽는다고 하자. $d$에 없는 필드라도 그 필드가 $D_r$에 속해 있다면 기본값으로 채워 읽을 수 있지만, 그 필드가 필수 필드 $F_r\setminus D_r$에 속하는데 $d$에 없다면 채울 방법이 없어 읽기가 실패한다. 즉 읽기가 성공하려면 ==빈칸== 조건이 만족돼야 한다.

## 해설
실패하는 경우는 기본값도 없고 데이터에도 없는 경우뿐이므로, 필수 필드 집합 $F_r\setminus D_r$의 모든 원소가 데이터에 실제로 존재하는 필드 집합 $\text{fields}(d)$ 안에 포함되어야 읽기가 성공해요.

**정답: $F_r\setminus D_r \subseteq \text{fields}(d)$**

## 예시

