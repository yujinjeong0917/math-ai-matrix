---
slug: bottleneck-analysis
theme: PM
domainLabel: Process Mining
subLabel: 분석 · 예측
title: 병목구간 분석: 어디서 가장 오래 기다리는가
related: 예측 모니터링 · Token Replay
---

## 도입
활동 $a$가 끝난 시각과 다음 활동 $b$가 시작된 시각의 차이를 모든 케이스에 대해 모으면 그 구간의 대기시간 분포가 나옵니다. 평균 대기시간은 $\overline{\Delta t}_{a \to b} = \frac1n \sum_k \left( \mathrm{start}(b)_k - \mathrm{complete}(a)_k \right)$로 구하지만 평균만 보면 가끔 며칠씩 걸리는 극단적인 케이스가 묻힐 수 있어 상위 퍼센타일도 함께 확인합니다.

이렇게 구간별 통계를 낸 뒤 발견된 모델이나 직접후행 그래프 위에 대기시간을 색이나 굵기로 입혀서 시각화합니다. 실무자는 가장 두껍거나 진하게 표시된 구간을 그대로 병목으로 지목합니다.

같은 구간이라도 특정 팀 담당자가 여러 프로세스의 요청을 동시에 처리하느라 밀리는 자원 경합 때문인지 외부 승인처럼 원래 구조적으로 오래 걸리는 대기인지는 따로 구분해야 합니다. 자원 경합이면 인력을 늘리는 쪽이 답이고 구조적 대기라면 프로세스 자체를 다시 설계해야 하므로 원인 구분이 곧 해결책의 방향을 정합니다. 이 분석의 정확도는 앞선 발견과 적합성 검사 단계가 실제 흐름을 얼마나 잘 반영했는지에 그대로 의존합니다.

## 명제


## 그림
<svg viewBox="0 0 620 180" xmlns="http://www.w3.org/2000/svg">
<circle cx="60" cy="90" r="18" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="60" y="95" font-size="12" text-anchor="middle">접수</text>
<circle cx="230" cy="90" r="18" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="230" y="95" font-size="12" text-anchor="middle">승인</text>
<circle cx="400" cy="90" r="18" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="400" y="95" font-size="12" text-anchor="middle">처리</text>
<circle cx="560" cy="90" r="18" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="560" y="95" font-size="12" text-anchor="middle">완료</text>
<line x1="78" y1="90" x2="212" y2="90" class="dg-line" stroke-width="1.5"/>
<text x="145" y="75" font-size="12" text-anchor="middle" class="dg-dim">0.4일</text>
<line x1="248" y1="90" x2="382" y2="90" class="dg-stroke-accent" stroke-width="6"/>
<text x="315" y="70" font-size="13" text-anchor="middle">평균 대기 4.2일</text>
<line x1="418" y1="90" x2="542" y2="90" class="dg-line" stroke-width="1.5"/>
<text x="480" y="75" font-size="12" text-anchor="middle" class="dg-dim">0.3일</text>
</svg>

_승인에서 처리로 넘어가는 구간의 평균 대기시간이 다른 구간보다 훨씬 길다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
모델을 발견하고 적합성까지 확인했다면 이제 실무에서 가장 궁금한 질문이 남습니다. 실제로 어디서 시간이 가장 많이 새고 있는가입니다. 병목구간 분석은 이벤트에 찍힌 시각 정보를 이용해 케이스들이 어느 구간에서 가장 오래 기다렸는지를 찾아냅니다. 활동 자체를 처리하는 시간보다 한 활동이 끝나고 다음 활동이 시작되기까지 대기하는 시간이 병목의 주범인 경우가 훨씬 많습니다.


## 예시
접수부터 승인까지 평균 대기시간이 0.4일 승인부터 처리까지가 4.2일 처리부터 완료까지가 0.3일이라면 승인과 처리 사이 구간이 전체 소요시간 4.9일 가운데 대부분을 차지하는 병목입니다.
