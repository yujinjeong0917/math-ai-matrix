---
slug: job-scheduling
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 스케줄링
title: 잡 스케줄링: 우선순위와 선점으로 작업 순서를 정하기
related: GPU 활용률 모니터링 · 멀티테넌시
---

## 도입
우선순위 큐는 작업마다 중요도 점수를 매기고 자원이 빌 때 점수가 높은 작업부터 먼저 배정하는 방식입니다. 프로덕션 서빙에 바로 영향을 주는 급한 재학습은 높은 우선순위를 주고 밤새 돌려도 되는 탐색성 실험은 낮은 우선순위를 주는 식으로 정책을 정합니다.

우선순위만으로는 이미 실행 중인 낮은 우선순위 작업이 자원을 오래 붙잡고 있는 문제를 풀 수 없습니다. 선점형 스케줄링은 더 높은 우선순위 작업이 도착했을 때 실행 중이던 낮은 우선순위 작업을 중단시키고 그 자원을 넘겨받는 방식입니다. 중단된 작업은 체크포인트에서 다시 이어서 돌거나 대기열 맨 앞으로 돌아가 다음 기회를 기다립니다. 체크포인트 없이 무작정 중단시키면 그동안의 학습 진행이 통째로 날아가기 때문에 선점형 스케줄링은 보통 주기적인 체크포인트 저장과 함께 쓰입니다.

스케줄링 정책이 없으면 클러스터는 먼저 요청한 순서대로만 자원을 내주는 단순 대기열이 됩니다. 급한 작업이 사소한 탐색성 작업 뒤에서 몇 시간을 기다리는 일이 자주 벌어지고 결국 사람이 수동으로 다른 작업을 죽이고 자원을 빼앗는 임기응변이 반복됩니다. 우선순위와 선점 규칙을 스케줄러에 명시해두면 이런 개입 없이도 급한 작업이 합리적인 시간 안에 자원을 받을 수 있습니다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<text x="130" y="24" text-anchor="middle" font-size="12">대기열 (우선순위 순)</text>
<rect x="40" y="40" width="180" height="34" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="130" y="61" text-anchor="middle" font-size="11">높음: 긴급 재학습</text>
<rect x="40" y="84" width="180" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="130" y="105" text-anchor="middle" font-size="11">중간: 정기 학습</text>
<rect x="40" y="128" width="180" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="130" y="149" text-anchor="middle" font-size="11">낮음: 탐색 실험</text>
<line x1="220" y1="57" x2="330" y2="57" class="dg-stroke-accent" stroke-width="1.5"/>
<rect x="330" y="40" width="150" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="405" y="61" text-anchor="middle" font-size="11">GPU 즉시 배정</text>
<path d="M330,150 C 280,180 280,180 220,150" class="dg-stroke-accent" stroke-width="1.5" fill="none"/>
<rect x="330" y="130" width="150" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="405" y="151" text-anchor="middle" font-size="11">실행 중 낮은 작업</text>
<text x="270" y="195" text-anchor="middle" font-size="10" class="dg-dim">선점되어 대기열로 복귀</text>
</svg>

_높은 우선순위 작업이 도착하면 낮은 우선순위 작업을 선점하고 대기열로 되돌립니다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
GPU가 100장뿐인데 학습 작업 요청이 200개 들어오면 누가 먼저 쓸지 순서를 정해야 합니다. 잡 스케줄링은 이 순서를 사람이 매번 판단하는 대신 규칙으로 자동화하는 부분입니다.

급한 작업이 뒤늦게 들어왔는데 앞서 시작한 덜 급한 작업이 자원을 오래 붙잡고 있다면 우선순위와 선점이라는 두 가지 도구로 순서를 조정합니다.


## 예시

