---
slug: aws-elb
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 네트워크 · 스토리지
title: ELB: 여러 서버로 요청을 고르게 나누는 로드밸런서
related: Auto Scaling · EC2 · VPC
---

## 도입
ELB는 주기적으로 각 대상 서버에 상태 확인(health check) 요청을 보냅니다. 정상 응답이 오지 않는 서버는 자동으로 대상 목록에서 빠지고 다시 정상으로 돌아오면 목록에 재등록됩니다. 무거운 모델을 올린 인스턴스가 요청 처리 도중 응답 불가 상태에 빠지더라도 그 서버로는 새 요청이 가지 않게 막아줍니다.

분산 방식은 순서대로 돌리는 라운드로빈 방식도 있고 각 서버의 현재 연결 수나 응답 시간을 참고해 더 여유 있는 서버로 보내는 방식도 있습니다. 추론 요청마다 처리 시간 편차가 큰 모델 서빙에서는 단순 순서 배분보다 부하 기반 배분이 응답 지연을 고르게 만드는 데 유리합니다.

Auto Scaling과 결합하면 ELB가 새로 추가된 인스턴스를 자동으로 대상 목록에 편입시키고 줄어든 인스턴스를 자동으로 제외시킵니다. 트래픽에 따라 서버 대수가 실시간으로 바뀌어도 ELB 하나의 주소만 바라보면 되는 구조가 만들어집니다. 여러 모델 버전을 동시에 띄워 트래픽 일부만 새 버전으로 보내는 카나리 배포도 ELB의 라우팅 규칙으로 구현하는 경우가 많습니다.

## 명제


## 그림
<svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="120" r="18" class="dg-dim" stroke="none"/><text x="60" y="160" text-anchor="middle" font-size="12">클라이언트</text><line x1="78" y1="120" x2="160" y2="115" class="dg-line" stroke-width="1.5"/><rect x="160" y="90" width="110" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/><text x="215" y="120" text-anchor="middle" font-size="13">ELB</text><line x1="270" y1="105" x2="380" y2="65" class="dg-line" stroke-width="1.5"/><rect x="380" y="40" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="455" y="62" text-anchor="middle" font-size="12">서버 A</text><text x="455" y="80" text-anchor="middle" font-size="12">정상</text><line x1="270" y1="115" x2="380" y2="145" class="dg-line" stroke-width="1.5"/><rect x="380" y="120" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="455" y="142" text-anchor="middle" font-size="12">서버 B</text><text x="455" y="160" text-anchor="middle" font-size="12">정상</text><rect x="380" y="200" width="150" height="50" class="dg-dim" stroke="none"/><rect x="380" y="200" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/><text x="455" y="222" text-anchor="middle" font-size="12">서버 C</text><text x="455" y="240" text-anchor="middle" font-size="12">응답없음, 제외됨</text></svg>

_상태 확인을 통과한 서버로만 요청이 분산됩니다._

## 문제
새 요청이 대기열 길이 $n$인 서버로 보내지면, 그 요청은 앞선 $n$개의 요청이 각각 $T$만큼 걸리는 동안 기다린 뒤에야 자신의 처리가 시작되고, 자신도 $T$만큼 처리되어야 끝난다. 그러므로 이 요청이 도착부터 완료까지 걸리는 전체 응답시간은 $nT+T=$==빈칸== 로 정리된다.

## 해설
대기시간 nT와 자기 자신의 처리시간 T를 더하면 공통인수 T로 묶여서 (n+1)T가 돼요.

**정답: $(n+1)T$**

## 예시

