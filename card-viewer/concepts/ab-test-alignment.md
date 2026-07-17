---
slug: ab-test-alignment
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 온라인 평가
title: A/B테스트 연계: 오프라인 지표와 실제 효과 사이의 간극 확인하기
related: NDCG · CTR · 체류시간
---

## 도입
오프라인 평가는 이미 수집된 로그 위에서 이루어지므로 과거 정책이 노출조차 시키지 않은 아이템에 대해서는 아무런 정보가 없다는 선택 편향을 안고 있다. 반면 A/B테스트는 사용자를 무작위로 대조군과 실험군으로 나누고 실험군에만 새 모델을 적용해 CTR 체류시간 리텐션 같은 온라인 지표를 두 집단 사이에서 통계적으로 비교한다. 무작위 배정 덕분에 두 집단의 차이는 순수하게 모델 변경의 효과로 해석할 수 있다.

문제는 오프라인 지표 개선과 온라인 지표 개선이 항상 함께 움직이지는 않는다는 점이다. NDCG는 올랐는데 실제 CTR은 그대로거나 오히려 떨어지는 경우가 드물지 않다. 그래서 여러 차례 실험을 거치며 어떤 오프라인 지표의 변화가 어떤 온라인 지표의 변화를 실제로 예측하는지를 축적해두는 작업이 필요하다. 이 상관관계가 쌓이면 다음번에는 A/B테스트 전에 오프라인 지표만 보고도 배포할 가치가 있는지 어느 정도 가늠할 수 있게 된다.

실무에서는 통계적 유의성뿐 아니라 실험 기간과 표본 크기도 함께 설계해야 한다. 표본이 너무 작거나 실험 기간이 짧으면 우연한 변동을 진짜 효과로 잘못 읽을 위험이 커진다.

## 명제


## 그림
<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="95" width="130" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="85" y="116" text-anchor="middle" font-size="12">오프라인 지표</text>
<text x="85" y="132" text-anchor="middle" font-size="12">개선 확인</text>
<line x1="150" y1="120" x2="190" y2="120" class="dg-line" stroke-width="1.5"/>
<rect x="190" y="95" width="130" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="255" y="116" text-anchor="middle" font-size="12">실 트래픽</text>
<text x="255" y="132" text-anchor="middle" font-size="12">A/B 분할</text>
<line x1="320" y1="110" x2="370" y2="52" class="dg-line" stroke-width="1.5"/>
<line x1="320" y1="130" x2="370" y2="168" class="dg-line" stroke-width="1.5"/>
<rect x="370" y="30" width="110" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="425" y="56" text-anchor="middle" font-size="12">A: 기존 모델</text>
<rect x="370" y="146" width="110" height="44" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="425" y="172" text-anchor="middle" font-size="12">B: 신규 모델</text>
<line x1="480" y1="52" x2="530" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="480" y1="168" x2="530" y2="130" class="dg-line" stroke-width="1.5"/>
<rect x="530" y="95" width="130" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="595" y="116" text-anchor="middle" font-size="12">온라인 지표</text>
<text x="595" y="132" text-anchor="middle" font-size="12">비교</text>
<text x="255" y="210" text-anchor="middle" font-size="11" class="dg-dim">CTR·체류시간·리텐션으로 최종 판단</text>
</svg>

_오프라인 지표가 좋아져도 실제 효과는 A/B테스트의 온라인 지표로 다시 확인한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
NDCG 같은 오프라인 지표가 좋아졌다고 해서 실제 서비스에 배포했을 때 사용자 반응도 좋아진다는 보장은 없다. 오프라인 지표는 과거 정책이 이미 골라서 보여준 로그 위에서 계산되기 때문에 한 번도 보여준 적 없는 추천의 진짜 반응은 알 수 없다. A/B테스트는 실제 트래픽 일부를 새 모델로 흘려보내 진짜 반응을 직접 확인하는 절차다.

그래서 오프라인 지표는 배포할 후보를 추리는 용도로 A/B테스트는 그 후보가 실제로 효과가 있는지 확인하는 최종 관문으로 쓰인다.


## 예시

