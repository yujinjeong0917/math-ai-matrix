---
slug: gpu-utilization-monitoring
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 자원 관리
title: GPU 활용률 모니터링: 할당한 GPU가 정말 일하고 있는가
related: 멀티테넌시 · 잡 스케줄링 · 유휴 자원 탐지
---

## 도입
가장 널리 보는 지표는 GPU 사용률로 특정 구간 동안 GPU 연산 코어가 실제로 작업 중이었던 시간의 비율입니다. 활용률 $u$는 대략 관측 구간 동안 GPU가 연산을 수행한 시간을 전체 구간 시간으로 나눈 값 $u = t_{busy} / t_{total}$로 이해할 수 있습니다. 여기에 GPU 메모리 사용량을 함께 보는데 연산 사용률은 낮은데 메모리만 꽉 찬 경우는 배치 크기를 무리하게 키워놓고 정작 연산은 데이터 로딩을 기다리며 멈춰 있는 상황을 의심해볼 수 있습니다.

활용률이 낮은 원인은 대개 GPU 자체의 연산 속도 문제가 아니라 그 앞뒤 병목입니다. 디스크나 네트워크에서 데이터를 읽어오는 속도가 GPU 연산 속도를 못 따라가면 GPU는 다음 배치를 받을 때까지 대기 상태로 남습니다. 여러 GPU를 쓰는 분산 학습에서는 GPU끼리 그래디언트를 주고받는 통신 구간에도 연산이 멈춥니다. 활용률 그래프에서 주기적으로 뚝뚝 떨어지는 구간이 보인다면 이런 병목을 의심하고 데이터 파이프라인이나 통신 방식을 먼저 점검하게 됩니다.

이 모니터링이 없으면 벌어지는 일은 단순합니다. 활용률이 나쁜 채로 방치된 작업도 GPU를 점유하고 있다는 이유만으로 자원 요청 목록에서는 다 쓰고 있는 것처럼 보입니다. 팀들은 실제로는 절반도 못 쓰는 GPU를 붙잡고 있으면서 부족하다고 새 GPU를 더 요청하고 클러스터 전체의 실질 자원 효율은 계속 떨어집니다. 활용률을 추적하면 이런 저활용 작업을 찾아내 스케줄링이나 배치 크기 조정으로 실제 처리량을 끌어올릴 여지를 확인할 수 있습니다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="20" x2="50" y2="190" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="50" y1="190" x2="600" y2="190" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="20" y="25" font-size="11" class="dg-dim">100%</text>
<text x="20" y="192" font-size="11" class="dg-dim">0%</text>
<text x="300" y="215" text-anchor="middle" font-size="12">시간</text>
<path d="M50,60 L100,60 L110,150 L140,150 L150,55 L220,55 L230,150 L260,150 L270,50 L350,50 L360,150 L390,150 L400,55 L480,55 L490,150 L520,150 L530,50 L600,50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="125" y="205" text-anchor="middle" font-size="10" class="dg-dim">데이터 대기</text>
<text x="245" y="205" text-anchor="middle" font-size="10" class="dg-dim">데이터 대기</text>
<text x="375" y="205" text-anchor="middle" font-size="10" class="dg-dim">데이터 대기</text>
</svg>

_GPU 활용률이 데이터 대기 구간마다 주기적으로 떨어지는 모습입니다._

## 문제
정의식 $u = t_{busy}/t_{total}$의 양변에 $t_{total}$을 곱하고 $u$로 나누어 $t_{total}$에 대해 정리하면, $t_{total}=$==빈칸== 을 얻습니다.

## 해설
u=t_busy/t_total 양변에 t_total을 곱하면 u·t_total = t_busy이고, 여기서 u로 나누면 t_total = t_busy/u가 나와요.

**정답: $t_{busy}/u$**

## 예시
어떤 학습 작업이 GPU 8대를 일주일 동안 점유하면서 평균 활용률이 $40\%$였다고 하면 실질적으로 쓴 연산 시간은 전체 점유 시간의 $40\%$뿐이고 나머지 $60\%$는 GPU가 대기 상태로 낭비된 시간입니다. 데이터 로딩 파이프라인을 병렬화해서 평균 활용률을 $85\%$까지 끌어올리면 같은 작업을 마치는 데 필요한 실제 GPU 점유 시간이 크게 줄어듭니다.
