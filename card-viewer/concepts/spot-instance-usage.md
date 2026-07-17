---
slug: spot-instance-usage
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 컴퓨트 비용
title: 스팟 인스턴스 활용: 중단될 수 있지만 훨씬 저렴한 컴퓨트
related: 오토스케일링과 비용의 트레이드오프 · 유휴 자원 탐지
---

## 도입
스팟 인스턴스 가격은 수요와 공급에 따라 계속 바뀌고 온디맨드 가격 대비 흔히 $60\%$에서 $90\%$ 정도 낮은 수준에서 형성됩니다. 대신 클라우드 업체가 그 자원을 다시 필요로 하면 짧은 유예 시간만 주고 인스턴스를 회수해갑니다. 유예 시간은 보통 수십 초에서 수 분 수준이라 그 안에 작업 상태를 저장하고 안전하게 종료해야 합니다.

이 회수를 감당하려면 학습 작업이 주기적으로 체크포인트를 저장해야 합니다. 회수 신호를 받으면 마지막 체크포인트 이후 진행분만 손해를 보고 새 인스턴스가 배정되는 즉시 그 체크포인트에서 이어서 학습을 재개합니다. 체크포인트 주기가 너무 길면 회수될 때마다 잃는 진행분이 커지고 너무 짧으면 저장 자체가 오버헤드가 되므로 작업 특성에 맞게 균형을 잡아야 합니다.

체크포인트 없이 스팟 인스턴스를 쓰면 회수될 때마다 처음부터 다시 학습해야 해서 싼 가격이 무색하게 실질 비용과 시간이 오히려 늘어날 수 있습니다. 반대로 체크포인트와 자동 재시작 로직을 갖춰두면 온디맨드보다 훨씬 낮은 가격에 같은 학습을 마칠 수 있고 이 조합이 대규모 하이퍼파라미터 탐색처럼 작업 개수가 많고 개별 작업 중단에 관대한 워크로드에서 특히 유리한 이유입니다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<text x="130" y="20" text-anchor="middle" font-size="12">시간당 비용</text>
<rect x="60" y="30" width="60" height="100" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="90" y="145" text-anchor="middle" font-size="11">온디맨드</text>
<text x="90" y="45" text-anchor="middle" font-size="10" class="dg-dim">100%</text>
<rect x="160" y="100" width="60" height="30" class="dg-accent" stroke="none"/>
<rect x="160" y="100" width="60" height="30" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="190" y="145" text-anchor="middle" font-size="11">스팟</text>
<text x="190" y="115" text-anchor="middle" font-size="10" class="dg-dim">10~40%</text>
<line x1="280" y1="70" x2="280" y2="160" class="dg-line" stroke-width="1"/>
<text x="450" y="20" text-anchor="middle" font-size="12">스팟 인스턴스 생명주기</text>
<rect x="320" y="50" width="90" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="365" y="71" text-anchor="middle" font-size="11">학습 실행</text>
<line x1="410" y1="67" x2="450" y2="67" class="dg-line" stroke-width="1.5"/>
<rect x="450" y="50" width="90" height="34" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="495" y="71" text-anchor="middle" font-size="11">회수 경고</text>
<line x1="495" y1="84" x2="495" y2="120" class="dg-line" stroke-width="1.5"/>
<rect x="450" y="120" width="90" height="34" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="495" y="141" text-anchor="middle" font-size="10">체크포인트 저장</text>
<line x1="450" y1="137" x2="410" y2="137" class="dg-line" stroke-width="1.5"/>
<rect x="320" y="120" width="90" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="365" y="141" text-anchor="middle" font-size="11">인스턴스 회수</text>
<line x1="365" y1="154" x2="365" y2="190" class="dg-line" stroke-width="1.5"/>
<rect x="320" y="190" width="220" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="430" y="211" text-anchor="middle" font-size="11">새 인스턴스에서 체크포인트부터 재개</text>
</svg>

_회수 경고를 받으면 체크포인트를 저장하고 새 인스턴스에서 이어서 재개합니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
클라우드 업체는 남는 컴퓨팅 자원을 정가보다 훨씬 싸게 내놓는 대신 다른 고객이 정가를 내고 그 자원을 요청하면 언제든 회수해갈 수 있다는 조건을 붙입니다. 스팟 인스턴스는 이 조건을 받아들이는 대신 훨씬 낮은 가격에 컴퓨팅을 빌리는 방식입니다.

중간에 갑자기 꺼질 수 있다는 위험만 감당할 수 있다면 같은 예산으로 몇 배 더 많은 실험을 돌릴 수 있는 셈이라 학습 작업처럼 중단해도 이어서 재개할 수 있는 워크로드에 잘 맞습니다.


## 예시
온디맨드 인스턴스가 시간당 3달러이고 스팟 할인율이 $70\%$라면 스팟 요금은 시간당 약 0.9달러 수준입니다. 같은 작업에 인스턴스 시간이 100시간 필요하다면 온디맨드로는 300달러가 들지만 스팟으로는 90달러 안팎이면 됩니다. 다만 중간에 회수되어 재시작이 몇 차례 필요하면 실제 소요 시간과 비용은 이보다 다소 늘어날 수 있습니다.
