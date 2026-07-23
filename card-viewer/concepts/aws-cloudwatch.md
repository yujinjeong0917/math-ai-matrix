---
slug: aws-cloudwatch
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: ML 특화 서비스
title: CloudWatch: 지표와 로그를 모아보는 관측 서비스
related: Auto Scaling · SageMaker · ELB
---

## 도입
CloudWatch는 크게 지표(metrics)와 로그(logs)와 알람(alarms) 세 가지로 이루어집니다. 지표는 CPU 사용률이나 요청 수처럼 시간에 따라 값이 바뀌는 숫자 데이터고 EC2와 Lambda와 SageMaker 엔드포인트 같은 서비스가 자동으로 내보냅니다. 로그는 애플리케이션이 실행 중에 남기는 텍스트 기록으로 오류 메시지나 요청 상세 내용을 담습니다. 지표는 추세를 보는 데 쓰이고 로그는 정확히 무슨 일이 있었는지 파고드는 데 쓰입니다.

알람은 지표가 정한 기준을 넘을 때 자동으로 반응하는 규칙입니다. SageMaker 엔드포인트의 평균 지연 시간이 일정 시간 동안 기준치를 넘으면 알람이 울리도록 설정할 수 있습니다. 알람은 단순히 사람에게 알리는 것을 넘어 Auto Scaling 정책을 직접 트리거해서 인스턴스나 컨테이너 개수를 조절하게 만들 수도 있습니다. Auto Scaling의 목표 추적 정책 뒤에서 그 판단 근거가 되는 지표를 공급하는 것이 바로 CloudWatch입니다.

대시보드는 여러 지표를 한 화면에 모아 보여주는 시각화 도구입니다. 학습 작업의 GPU 사용률과 서빙 엔드포인트의 지연 시간과 오류율을 나란히 배치해두면 전체 파이프라인 상태를 한눈에 파악할 수 있습니다. 결국 CloudWatch는 EC2와 Lambda와 SageMaker와 ECS/EKS처럼 앞서 다룬 모든 서비스가 지금 잘 돌아가고 있는지 확인하는 공통 관측 창구입니다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="70" width="150" height="90" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="105" y="100" text-anchor="middle" font-size="12">EC2</text><text x="105" y="120" text-anchor="middle" font-size="12">Lambda</text><text x="105" y="140" text-anchor="middle" font-size="12">SageMaker</text><line x1="180" y1="115" x2="250" y2="115" class="dg-line" stroke-width="1.5"/><rect x="250" y="80" width="150" height="70" fill="none" class="dg-stroke-accent" stroke-width="2"/><text x="325" y="110" text-anchor="middle" font-size="12">CloudWatch</text><text x="325" y="130" text-anchor="middle" font-size="12">지표 · 로그</text><line x1="400" y1="115" x2="460" y2="115" class="dg-line" stroke-width="1.5"/><rect x="460" y="80" width="140" height="70" fill="none" class="dg-stroke-accent" stroke-width="2"/><text x="530" y="110" text-anchor="middle" font-size="12">알람</text><text x="530" y="130" text-anchor="middle" font-size="12">임계값 초과</text><line x1="500" y1="150" x2="450" y2="195" class="dg-line" stroke-width="1.5"/><rect x="390" y="195" width="120" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="450" y="219" text-anchor="middle" font-size="12">Auto Scaling</text><line x1="560" y1="150" x2="580" y2="195" class="dg-line" stroke-width="1.5"/><rect x="530" y="195" width="100" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="580" y="219" text-anchor="middle" font-size="12">알림 전송</text></svg>

_여러 서비스의 지표와 로그가 모여 알람과 자동 대응으로 이어집니다._

## 문제
$t=3$에서는 지연 시간이 $700$ms로 $300$ms를 크게 넘지만, 바로 다음 분인 $t=4$의 지연 시간은 $280$ms로 다시 $300$ms 아래로 내려간다. 그러므로 $t=3$부터 시작된 초과 연속 길이는 ==빈칸==분에서 끊긴다.

## 해설
t=3 한 번만 300ms를 넘고 바로 다음 t=4는 다시 300ms 아래로 내려가므로 연속 초과 길이는 1분에 그쳐요. 5분 연속 조건을 채우지 못해 이 지점에서는 알람이 울리지 않아요.

**정답: $1$**

## 예시
평균 지연 시간이 5분 동안 300ms를 넘으면 알람이 울리도록 설정했다고 하면 실제 지연 시간이 250ms에서 350ms로 오른 시점부터 5분이 지나야 알람이 발생합니다. 짧은 순간적인 튐에는 반응하지 않고 지속되는 문제만 잡아내려는 설계입니다.
