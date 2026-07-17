---
slug: speculative-decoding
theme: LLM
domainLabel: LLM/Agent
subLabel: 스케일링 · 양자화
title: 스펙큘레이티브 디코딩: 작은 모델이 초안 쓰고 큰 모델이 검증하기
related: GPTQ/AWQ · PagedAttention
---

## 도입
스펙큘레이티브 디코딩은 작은 초안 모델(draft model)이 다음 몇 토큰, 이를테면 $k$개를 순차적으로 빠르게 생성한 뒤 이 $k$개 토큰 전체를 큰 목표 모델(target model)에 한 번의 순전파로 통과시켜 각 위치에서 목표 모델이 실제로 예측했을 확률을 얻는다. 목표 모델의 확률 분포와 초안 모델의 확률 분포를 비교해서 초안 토큰을 받아들일지 기각할지를 토큰 위치마다 순서대로 판정한다. 앞쪽 토큰부터 확인하다가 하나라도 기각되면 그 지점에서 목표 모델의 분포로 새 토큰을 하나 뽑고 그 뒤 초안은 버린다.

이 검증 방식은 단순히 초안이 맞았는지를 근사적으로 확인하는 게 아니라 수용 확률을 목표 모델과 초안 모델의 확률 비로 계산해서 최종적으로 나오는 토큰 분포가 목표 모델 혼자 생성했을 때의 분포와 수학적으로 동일하도록 설계되어 있다. 속도를 얻는 대신 출력 품질이나 분포가 달라지는 손해는 보지 않는다.

스펙큘레이티브 디코딩이 필요한 이유는 자기회귀 생성의 근본적인 순차 의존성 때문이다. 토큰을 하나 만들 때마다 큰 모델의 순전파를 한 번씩 돌려야 하므로 GPU 연산력에 여유가 있어도 지연 시간은 줄지 않는다. 반면 여러 토큰을 한꺼번에 검증하는 순전파 한 번은 토큰 하나를 생성하는 순전파 한 번과 비교해 GPU 연산량은 늘지만 걸리는 시간은 비슷한 경우가 많다. 초안이 자주 맞아떨어지는 만큼 큰 모델의 순전파 호출 횟수 자체를 줄일 수 있어 전체 생성 속도가 빨라진다.

속도 향상 폭은 초안 모델이 목표 모델의 출력을 얼마나 잘 예측하는지에 달려 있다. 초안이 자주 틀리면 기각이 잦아져 오히려 검증에 드는 순전파 비용만 늘어날 수 있으므로 초안 모델은 목표 모델과 비슷한 경향을 보이면서도 충분히 빠른 소형 모델로 골라야 한다.

## 명제


## 그림
<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="20" font-size="12">초안 모델이 순차로 빠르게 생성</text>
<rect x="20" y="30" width="50" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="45" y="52" text-anchor="middle" font-size="12">t1</text>
<rect x="80" y="30" width="50" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="105" y="52" text-anchor="middle" font-size="12">t2</text>
<rect x="140" y="30" width="50" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="165" y="52" text-anchor="middle" font-size="12">t3</text>
<rect x="200" y="30" width="50" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="225" y="52" text-anchor="middle" font-size="12">t4</text>
<line x1="135" y1="64" x2="135" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="20" y="100" width="230" height="40" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="135" y="124" text-anchor="middle" font-size="12">목표 모델이 한 번에 검증</text>
<line x1="135" y1="140" x2="135" y2="170" class="dg-line" stroke-width="1.5"/>
<rect x="20" y="170" width="50" height="34" class="dg-accent" stroke="none"/>
<text x="45" y="192" text-anchor="middle" font-size="12">t1 수용</text>
<rect x="80" y="170" width="50" height="34" class="dg-accent" stroke="none"/>
<text x="105" y="192" text-anchor="middle" font-size="12">t2 수용</text>
<rect x="140" y="170" width="50" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="165" y="192" text-anchor="middle" font-size="12">t3 기각</text>
<rect x="200" y="170" width="70" height="34" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="235" y="192" text-anchor="middle" font-size="12">목표모델이 대체</text>
</svg>

_초안 토큰 중 앞부분은 그대로 받아들이고 어긋나는 지점부터는 목표 모델이 새로 뽑는다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
큰 언어모델은 토큰을 한 번에 하나씩만 만들어낸다. 다음 토큰을 만들려면 반드시 이전 토큰까지의 계산이 끝나야 하므로 아무리 GPU가 여유가 있어도 생성 속도는 토큰 하나하나를 순서대로 만드는 속도에 묶인다.

스펙큘레이티브 디코딩은 작고 빠른 모델에게 몇 토큰을 먼저 미리 써보게 하고 진짜 크고 정확한 모델은 그 초안을 한 번에 검증만 하게 한다. 초안이 맞으면 여러 토큰을 한 번의 검증으로 확정할 수 있어 큰 모델이 토큰마다 처음부터 생성하는 것보다 빨라진다.


## 예시

