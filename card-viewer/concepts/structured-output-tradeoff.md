---
slug: structured-output-tradeoff
theme: LLM
domainLabel: LLM/Agent
subLabel: 문법 제약 디코딩
title: 구조화 출력의 트레이드오프: 형식을 조이면 표현력과 속도가 준다
related: Grammar-constrained Decoding · 정규식/유한상태 제약
---

## 도입
속도 쪽 비용은 계산 구조에서 나온다. 문법 제약 디코딩은 매 토큰마다 지금 상태에서 허용되는 토큰 집합을 다시 계산해야 하고 문법이 복잡할수록 이 계산도 무거워진다. 정규식 기반 제약처럼 상태 전이 하나만 조회하면 되는 경우는 부담이 작지만 CFG처럼 스택을 갱신해야 하는 경우는 출력이 길어질수록 누적되는 오버헤드도 커진다.

표현력 쪽 비용은 스키마가 애초에 상상하지 못한 상황에서 드러난다. 신뢰도를 상 중 하 세 단계 열거형으로만 받도록 강제해두면 확신이 서지 않는 이유를 함께 설명하고 싶어도 그럴 자리가 없다. 스키마가 현실의 모든 경우를 미리 다 담지 못하면 모델은 억지로 가장 가까운 값을 고르거나 스키마 자체를 어기려다 실패하는 쪽으로 몰린다.

그래서 실무에서는 다운스트림 코드가 실제로 요구하는 만큼만 제약을 걸고 나머지는 열어두는 편이 낫다. 자유 서술을 담을 수 있는 선택적 필드 하나를 스키마에 남겨두거나 아주 엄격한 문법 제약 대신 타입 검증 파싱과 재시도 조합으로 느슨하게 걸러내는 방법도 같은 균형을 잡는 방식이다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="20" x2="60" y2="200" class="dg-line" stroke-width="1.5"/>
<line x1="60" y1="200" x2="590" y2="200" class="dg-line" stroke-width="1.5"/>
<path d="M80,50 C220,70 400,140 570,180" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<path d="M80,90 C220,120 400,160 570,195" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="210" y="68" font-size="11" class="dg-accent">형식 오류율</text>
<text x="210" y="135" font-size="11">표현력·속도</text>
<text x="325" y="225" text-anchor="middle" font-size="12" class="dg-dim">제약 강도 (약함 → 강함)</text>
</svg>

_제약이 강해질수록 형식 오류율은 떨어지지만 표현력과 속도도 함께 떨어진다._

## 문제
확률의 공리에 의해 $\sum_{\omega\in\Omega}p(\omega)=1$이고 이를 $S$와 그 여집합 $\Omega\setminus S$로 쪼개면 $Z+\sum_{\omega\in\Omega\setminus S}p(\omega)=1$이 된다. 이유까지 설명하고 싶은 응답처럼 스키마 밖에 실제로 확률을 배정하던 응답이 하나라도 있다면 $\sum_{\omega\in\Omega\setminus S}p(\omega)>0$이고 이를 위 식에 대입해 정리하면 $Z$의 범위는 ==빈칸== 로 좁혀진다.

## 해설
Z와 스키마 밖 확률의 합이 더해서 1이 되고 후자가 양수라고 가정했으므로 Z는 1보다 작아야 하며, 확률들의 합인 이상 0보다는 커야 해서 0과 1 사이 값으로 제한돼요.

**정답: $0 < Z < 1$**

## 예시

