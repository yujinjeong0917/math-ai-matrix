---
slug: aws-sagemaker
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: ML 특화 서비스
title: SageMaker: 학습부터 배포까지 관리하는 ML 플랫폼
related: S3 · EC2 · CloudWatch
---

## 도입
SageMaker의 핵심은 학습과 호스팅을 분리된 두 단계로 다룬다는 점입니다. 학습 작업(training job)을 실행하면 SageMaker가 지정한 인스턴스만큼 컴퓨팅 자원을 임시로 띄우고 S3에서 학습 데이터를 내려받아 학습 코드를 실행한 뒤 결과 모델 아티팩트를 다시 S3에 올리고 인스턴스를 종료합니다. 학습이 끝나는 순간 컴퓨팅 비용도 함께 끝나는 구조입니다.

학습이 끝난 모델은 엔드포인트(endpoint)로 배포해 실시간 추론 서비스를 만들 수 있습니다. 엔드포인트는 뒤에서 지정한 인스턴스를 상시 띄워두고 요청이 오면 즉시 응답하는 형태로 EC2와 ELB를 SageMaker가 대신 구성해주는 셈입니다. 실시간 응답이 필요 없는 대량의 데이터는 배치 변환(batch transform)으로 한 번에 처리하고 끝나면 자원을 반납해 비용을 아낍니다.

하이퍼파라미터 튜닝 기능은 여러 학습 작업을 동시에 여러 조합으로 돌려 가장 좋은 조합을 자동으로 찾아줍니다. 사람이 값을 하나씩 바꿔가며 실험을 반복하는 대신 탐색 범위만 정해주면 여러 학습 작업이 병렬로 실행되고 결과가 비교됩니다. 결국 SageMaker는 EC2와 S3와 ELB와 Auto Scaling처럼 앞서 나온 요소들을 학습과 서빙이라는 ML 워크플로우에 맞춰 미리 조립해둔 상위 계층 서비스입니다.

## 명제


## 그림
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="85" width="110" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="75" y="115" text-anchor="middle" font-size="12">S3 (데이터)</text><line x1="130" y1="110" x2="180" y2="110" class="dg-line" stroke-width="1.5"/><rect x="180" y="65" width="140" height="90" fill="none" class="dg-stroke-accent" stroke-width="2"/><text x="250" y="105" text-anchor="middle" font-size="12">학습 작업</text><text x="250" y="122" text-anchor="middle" font-size="12">임시 인스턴스</text><line x1="320" y1="110" x2="370" y2="110" class="dg-line" stroke-width="1.5"/><rect x="370" y="85" width="110" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="425" y="115" text-anchor="middle" font-size="12">S3 (모델)</text><line x1="480" y1="110" x2="530" y2="110" class="dg-line" stroke-width="1.5"/><text x="505" y="98" text-anchor="middle" font-size="12">배포</text><rect x="530" y="65" width="130" height="90" fill="none" class="dg-stroke-accent" stroke-width="2"/><text x="595" y="100" text-anchor="middle" font-size="12">엔드포인트</text><text x="595" y="118" text-anchor="middle" font-size="12">상시 서빙</text><text x="595" y="45" text-anchor="middle" font-size="12">실시간 추론 요청</text><line x1="595" y1="52" x2="595" y2="65" class="dg-line" stroke-width="1.5"/></svg>

_학습 데이터부터 실시간 엔드포인트까지 한 흐름으로 이어집니다._

## 문제
5개 작업이 정확히 같은 시각에 동시에 시작해 서로의 완료를 기다리지 않고 독립적으로 진행된다. 이때 전체 튜닝이 끝나는 시점은 가장 늦게 끝나는 작업의 완료 시점과 같은데, 모든 조합이 동일한 학습 시간을 사용하므로 이 완료 시점은 s2에서 설정한 각 작업 하나의 소요 시간과 같다. 따라서 튜닝 전체의 실제 경과 시간은 ==빈칸==시간이다.

## 해설
s2에서 각 조합의 학습 작업은 기준 작업과 동일하게 인스턴스 4대를 3시간씩 사용한다고 했고, 5개 작업이 동시에 시작해 서로 기다리지 않으므로 전체가 끝나는 시점은 이 3시간과 같아요. 병렬 실행에서는 작업 개수가 늘어도 경과 시간이 늘지 않아요.

**정답: $3$**

## 예시
학습 작업에 인스턴스 4대를 3시간 동안 쓰면 컴퓨팅 사용량은 $4 \times 3 = 12$ 인스턴스시간입니다. 학습이 끝나자마자 인스턴스가 반납되므로 실제 비용도 이 12시간에 해당하는 만큼만 발생하고 그 이후에는 추가 비용이 없습니다.
