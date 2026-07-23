---
slug: aws-vpc
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 네트워크 · 스토리지
title: VPC: 계정 안에 격리된 가상 네트워크
related: ELB · EC2 · SageMaker
---

## 도입
VPC 안은 서브넷이라는 더 작은 구역으로 나뉩니다. 퍼블릭 서브넷은 인터넷 게이트웨이를 통해 외부와 직접 통신할 수 있습니다. 프라이빗 서브넷은 외부에서 직접 들어오는 연결이 차단돼 있습니다. 프라이빗 서브넷의 인스턴스가 패키지 다운로드처럼 바깥으로 나가는 연결만 필요할 때는 NAT 게이트웨이를 거쳐 나가되 바깥에서 안으로 들어오는 연결은 여전히 막혀 있습니다.

트래픽을 걸러내는 장치는 두 가지입니다. 보안 그룹은 인스턴스 단위로 붙는 방화벽으로 어떤 포트로 어디서 오는 연결을 허용할지 정합니다. 네트워크 ACL은 서브넷 단위로 붙는 좀 더 성긴 필터입니다. 학습용 GPU 인스턴스라면 보안 그룹에서 사내 네트워크나 특정 관리 서버에서만 접속을 허용하고 나머지는 기본적으로 막아두는 식으로 씁니다.

SageMaker의 학습 작업이나 엔드포인트도 VPC 안에 붙일 수 있습니다. 이렇게 하면 학습 데이터가 인터넷을 거치지 않고 VPC 내부 네트워크만으로 S3나 다른 내부 서비스에 접근하게 만들 수 있습니다. 규제가 엄격한 데이터를 다루는 팀이 자주 선택하는 구성입니다.

## 명제


## 그림
<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="40" width="600" height="220" fill="none" class="dg-stroke-ink" stroke-width="2"/><text x="32" y="58" font-size="12">VPC</text><circle cx="170" cy="20" r="12" class="dg-dim" stroke="none"/><line x1="170" y1="32" x2="170" y2="90" class="dg-line" stroke-width="1.5"/><text x="170" y="14" text-anchor="middle" font-size="12">인터넷</text><rect x="50" y="90" width="250" height="150" class="dg-dim" stroke="none"/><rect x="50" y="90" width="250" height="150" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="62" y="108" font-size="12">퍼블릭 서브넷</text><rect x="70" y="120" width="90" height="34" fill="none" class="dg-stroke-accent" stroke-width="1.5"/><text x="115" y="141" text-anchor="middle" font-size="12">ELB</text><rect x="180" y="120" width="100" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="230" y="141" text-anchor="middle" font-size="12">EC2 서빙</text><rect x="70" y="175" width="120" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="130" y="196" text-anchor="middle" font-size="12">NAT 게이트웨이</text><rect x="330" y="90" width="260" height="150" class="dg-dim" stroke="none"/><rect x="330" y="90" width="260" height="150" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="340" y="108" font-size="12">프라이빗 서브넷</text><rect x="350" y="150" width="150" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="425" y="174" text-anchor="middle" font-size="12">학습 인스턴스</text><line x1="190" y1="192" x2="350" y2="168" class="dg-stroke-accent" stroke-width="1.5"/><text x="255" y="178" text-anchor="middle" font-size="12">아웃바운드만</text></svg>

_퍼블릭 서브넷은 외부와 연결되고 프라이빗 서브넷은 NAT를 통해서만 나갈 수 있습니다._

## 문제
프라이빗 서브넷의 인스턴스는 바깥으로 나가는 연결만 NAT 게이트웨이를 거쳐 허용되고, 바깥에서 안으로 들어오는 연결은 여전히 막혀 있다고 했다. 이는 라우팅 테이블에 인바운드 방향의 인터넷 게이트웨이 경로 자체가 없다는 뜻이므로, 이 경우 $g$의 값은 ==빈칸==이다.

## 해설
NAT 게이트웨이는 나가는 트래픽의 경로만 제공할 뿐 들어오는 방향의 인터넷 게이트웨이 경로를 만들어주지는 않으므로, 인바운드 조건 g는 항상 0이 되기 때문이에요.

**정답: $0$**

## 예시

