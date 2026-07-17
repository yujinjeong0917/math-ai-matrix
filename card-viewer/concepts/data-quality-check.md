---
slug: data-quality-check
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 품질 검증
title: 데이터 품질 체크: null 비율과 분포 이상을 자동으로 잡아내기
related: 데이터 계약 · 스키마 진화 관리
---

## 도입
가장 기본적인 체크는 각 컬럼의 null 비율이 평소 범위를 벗어나지 않는지 보는 것입니다. 특정 컬럼의 null 비율이 평소 $1\%$ 미만이었는데 어느 날 $20\%$로 뛰었다면 업스트림에서 뭔가 바뀌었다는 강한 신호입니다. 여기에 값의 범위 검사 즉 나이 컬럼에 음수나 200이 넘는 값이 없는지 카테고리 컬럼에 정의되지 않은 새 값이 섞여 있지 않은지를 함께 확인합니다.

더 나아가면 분포 자체의 변화를 감지하는 검사로 확장됩니다. 값의 평균이나 표준편차가 과거 기록과 비교해 크게 벗어나는지를 통계적으로 검사하거나 두 시점의 분포 차이를 정량화하는 지표로 드리프트를 감지합니다. 개별 값은 규칙을 어기지 않아도 전체 분포가 서서히 옮겨가는 경우는 null 검사나 범위 검사만으로는 잡히지 않기 때문에 분포 비교가 따로 필요합니다.

이런 체크가 파이프라인에 없으면 품질이 나쁜 데이터가 아무 제지 없이 학습 데이터로 흘러들어가고 모델 성능이 서서히 나빠지는 원인을 데이터 쪽에서 찾기까지 오래 걸립니다. 체크를 파이프라인 중간에 게이트로 걸어두면 규칙을 어긴 배치는 다음 단계로 넘어가지 못하고 멈추기 때문에 문제를 원인이 되는 배치 단위까지 좁혀서 확인할 수 있습니다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="75" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="90" y="105" text-anchor="middle" font-size="12">입력 배치</text>
<line x1="150" y1="100" x2="210" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="210" y="55" width="200" height="90" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="310" y="78" text-anchor="middle" font-size="12">품질 체크 게이트</text>
<text x="310" y="96" text-anchor="middle" font-size="11" class="dg-dim">null 비율</text>
<text x="310" y="112" text-anchor="middle" font-size="11" class="dg-dim">값 범위</text>
<text x="310" y="128" text-anchor="middle" font-size="11" class="dg-dim">분포 이상</text>
<line x1="410" y1="80" x2="470" y2="50" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="450" y="40" font-size="11">통과</text>
<rect x="470" y="20" width="120" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="530" y="44" text-anchor="middle" font-size="11">다음 단계</text>
<line x1="410" y1="120" x2="470" y2="150" class="dg-line" stroke-width="1.5"/>
<text x="450" y="170" font-size="11">위반</text>
<rect x="470" y="140" width="120" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="530" y="164" text-anchor="middle" font-size="11">격리 · 알림</text>
</svg>

_입력 배치는 품질 게이트를 통과해야 다음 단계로 넘어갑니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
파이프라인에 들어오는 데이터가 어제와 같은 형태라고 그냥 믿고 넘어가면 null 값이 갑자기 늘어나거나 값의 분포가 이상하게 치우쳐도 누구도 알아채지 못한 채 그 데이터로 모델이 다시 학습됩니다. 데이터 품질 체크는 데이터가 파이프라인을 통과하기 전에 정해둔 규칙에 맞는지를 자동으로 검사하는 단계입니다.

사람이 매번 데이터를 눈으로 훑어볼 수는 없으니 null 비율이나 값의 범위처럼 숫자로 확인 가능한 규칙을 정해두고 그 규칙을 기계가 대신 확인하게 만드는 것입니다.


## 예시

