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
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
모델 서빙 서버 하나를 EC2 인스턴스 위에 직접 올리면 그 서버가 죽었을 때 누군가 알아채고 새로 띄워야 합니다. 여러 대를 운영하면 어떤 서버에 어떤 버전이 올라가 있는지도 사람이 일일이 챙겨야 합니다. 컨테이너는 애플리케이션과 그 실행 환경을 통째로 하나의 상자에 담아 어디서든 똑같이 실행되게 만든 기술입니다. ECS와 EKS는 이 컨테이너 상자들을 여러 서버에 걸쳐 자동으로 배치하고 죽으면 다시 띄우고 트래픽에 맞춰 개수를 조절해주는 관리자 역할을 합니다.

왜 이런 관리자가 필요한가 하면 모델 서빙 컨테이너가 열 개 스무 개로 늘어나면 어떤 서버에 몇 개가 떠 있는지 사람이 손으로 관리하는 것이 곧 불가능해지기 때문입니다. ECS나 EKS는 원하는 상태만 적어두면 그 상태를 자동으로 유지해줍니다.


## 예시

