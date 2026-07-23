---
slug: aws-ecs-eks
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: ML 특화 서비스
title: ECS/EKS: 컨테이너로 서빙 서버를 오케스트레이션하기
related: EC2 · Auto Scaling · CloudWatch
---

## 도입
ECS는 AWS가 만든 컨테이너 오케스트레이션 서비스입니다. 태스크 정의(task definition)라는 문서에 어떤 컨테이너 이미지를 얼마만큼의 CPU와 메모리로 몇 개 띄울지 적어두면 ECS가 그 상태를 유지합니다. 실행 위치는 직접 관리하는 EC2 인스턴스 위일 수도 있고 서버 관리 자체를 없앤 Fargate 위일 수도 있습니다.

EKS는 오픈소스 표준인 쿠버네티스를 AWS가 관리형으로 제공하는 서비스입니다. 쿠버네티스에서는 컨테이너 묶음을 파드(pod)라 부릅니다. 파드가 몇 개 떠 있어야 하는지 어떤 조건에서 늘리고 줄일지도 선언적으로 정의합니다. ECS보다 설정이 복잡하지만 쿠버네티스 생태계의 다양한 도구를 그대로 쓸 수 있고 AWS 외 다른 클라우드에서도 같은 방식으로 운영할 수 있다는 이식성이 장점입니다.

모델 서빙 관점에서 ECS나 EKS는 모델 버전마다 컨테이너 이미지를 따로 만들어두고 트래픽 비율을 조절하며 새 버전을 서서히 투입하는 배포에 잘 맞습니다. 컨테이너 하나가 죽으면 즉시 새 컨테이너로 교체됩니다. CPU나 GPU 사용률에 따라 컨테이너 개수 자체를 자동으로 늘리고 줄이는 설정도 걸 수 있어 Auto Scaling이 EC2 대수를 조절하듯 컨테이너 개수를 조절하는 셈입니다.

## 명제


## 그림
<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg"><rect x="200" y="20" width="240" height="40" fill="none" class="dg-stroke-accent" stroke-width="2"/><text x="320" y="45" text-anchor="middle" font-size="12">오케스트레이터 (ECS / EKS)</text><line x1="260" y1="60" x2="170" y2="110" class="dg-line" stroke-width="1.5"/><line x1="380" y1="60" x2="470" y2="110" class="dg-line" stroke-width="1.5"/><rect x="60" y="110" width="220" height="150" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="170" y="128" text-anchor="middle" font-size="12">노드 1</text><rect x="80" y="145" width="70" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="115" y="169" text-anchor="middle" font-size="12">컨테이너</text><rect x="170" y="145" width="70" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="205" y="169" text-anchor="middle" font-size="12">컨테이너</text><rect x="360" y="110" width="220" height="150" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="470" y="128" text-anchor="middle" font-size="12">노드 2</text><rect x="380" y="145" width="70" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="415" y="169" text-anchor="middle" font-size="12">컨테이너</text><rect x="470" y="145" width="70" height="40" class="dg-dim" stroke="none"/><rect x="470" y="145" width="70" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="505" y="169" text-anchor="middle" font-size="12">실패</text><path d="M540,185 C 600,195 600,220 505,225" class="dg-stroke-accent" fill="none" stroke-width="1.5"/><rect x="440" y="225" width="70" height="34" fill="none" class="dg-stroke-accent" stroke-width="1.5"/><text x="475" y="246" text-anchor="middle" font-size="12">재시작</text></svg>

_컨테이너 하나가 죽으면 오케스트레이터가 원하는 개수를 유지하도록 새 컨테이너로 교체합니다._

## 문제
전체 요청이 만들어내는 CPU 작업량 자체는 태스크 개수를 몇 개로 조절하든 바뀌지 않고 그대로 유지된다고 가정하자. 이 전체 작업량은 태스크 한 개가 처리하는 부하에 태스크 개수를 곱한 값으로 나타낼 수 있으므로, 지금 상태에서 전체 작업량은 $n\times u=4\times80=$==빈칸==다.

## 해설
4×80을 계산하면 320이 나오고, 이 값은 태스크 개수를 늘리거나 줄여도 전체 요청량이 그대로라면 변하지 않는 값이에요.

**정답: $320$**

## 예시

