---
slug: data-contract
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 데이터 계약
title: 데이터 계약: 업스트림이 스키마를 바꾸기 전에 미리 알기
related: 스키마 진화 관리 · 데이터 품질 체크
---

## 도입
데이터 계약은 보통 스키마 정의 파일 형태로 존재합니다. 각 필드의 이름과 타입 · null을 허용하는지 · 값의 범위나 허용되는 집합이 무엇인지를 적어둡니다. 업스트림 팀이 새 코드를 배포하기 전에 이 계약을 어기는 변경인지를 자동으로 검사하는 CI 단계를 두면 스키마가 깨지는 배포 자체를 사전에 막을 수 있습니다.

계약이 없는 상태에서 업스트림이 필드 이름을 바꾸거나 이전에는 항상 값이 있던 필드에 null을 섞어 내보내기 시작하면 다운스트림 파이프라인은 오류를 내지 않고 조용히 잘못된 집계를 만들어내는 경우가 많습니다. 코드가 죽지 않고 그냥 결측치를 0으로 채우거나 조인에 실패한 행을 조용히 버리기 때문입니다. 문제는 대시보드 숫자가 이상하다는 걸 누군가 발견할 때야 드러나고 그 시점에는 이미 며칠 치 집계가 오염된 뒤입니다.

데이터 계약은 이 실패 시점을 앞당깁니다. 업스트림이 계약을 어기는 변경을 배포하려는 순간 CI에서 막히거나 최소한 변경 사실이 다운스트림 팀에 자동으로 통보됩니다. 계약을 지키면서 필드를 늘리거나 줄이는 방법은 스키마 진화 관리가 다루는 영역으로 이어집니다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="85" width="130" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="95" y="115" text-anchor="middle" font-size="12">업스트림</text>
<line x1="160" y1="110" x2="220" y2="110" class="dg-line" stroke-width="1.5"/>
<rect x="220" y="70" width="160" height="80" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="300" y="98" text-anchor="middle" font-size="12">데이터 계약</text>
<text x="300" y="116" text-anchor="middle" font-size="11" class="dg-dim">필드 · 타입 · null 검증</text>
<text x="300" y="134" text-anchor="middle" font-size="11" class="dg-accent">위반 시 배포 차단</text>
<line x1="380" y1="110" x2="450" y2="110" class="dg-line" stroke-width="1.5"/>
<rect x="450" y="85" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="525" y="115" text-anchor="middle" font-size="12">다운스트림</text>
<text x="300" y="180" text-anchor="middle" font-size="11" class="dg-dim">필드 이름 변경 · 타입 변경은 여기서 걸러짐</text>
</svg>

_업스트림과 다운스트림 사이에서 계약이 스키마 위반을 걸러냅니다._

## 문제
이때 관측된 총합은 null이 아닌 $(1-f)n$건의 합 $(1-f)n\mu$에 null이었던 $fn$건이 기여하는 $0$을 더한 값이고, 관측된 평균은 이 총합을 전체 $n$으로 나눈 값이다. 즉 관측 평균은 $\dfrac{(1-f)n\mu+fn\times0}{n}=$==빈칸== 이다.

## 해설
분자에서 $fn\times0$ 항은 사라지고 $(1-f)n\mu$만 남는데, 이를 $n$으로 나누면 $n$이 약분되어 $(1-f)\mu$가 남아요. 즉 관측 평균은 참값 평균에 $(1-f)$를 곱한 값으로 정확히 줄어들어요.

**정답: $(1-f)\mu$**

## 예시

