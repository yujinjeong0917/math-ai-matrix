---
slug: gptq-awq-quantization
theme: LLM
domainLabel: LLM/Agent
subLabel: 스케일링 · 양자화
title: GPTQ/AWQ: LLM 가중치를 저비트로 정밀하게 눌러 담기
related: QLoRA · 스펙큘레이티브 디코딩
---

## 도입
GPTQ는 층 하나씩 순서대로 가중치를 양자화하면서 한 값을 양자화할 때 생기는 오차를 아직 양자화하지 않은 나머지 가중치들에 보정값으로 나누어 반영한다. 이차 근사(헤시안 기반) 정보를 이용해 어떤 방향으로 오차를 흘려보내야 전체 출력에 미치는 영향이 최소가 되는지를 계산하고 그 방향으로 나머지 가중치를 살짝 조정한다. 이렇게 하면 값 하나하나를 독립적으로 반올림할 때보다 훨씬 적은 오차로 4비트 수준까지 압축할 수 있다.

AWQ는 접근이 다르다. 모든 가중치가 출력에 똑같이 중요한 게 아니라 활성화 값이 크게 나타나는 채널에 대응하는 가중치 소수가 출력 품질에 특히 큰 영향을 미친다는 관찰에서 출발한다. AWQ는 이런 중요한 채널을 찾아 양자화 전에 스케일을 조정해서 그 채널의 가중치가 양자화 격자에서 더 세밀하게 표현되도록 만들고 상대적으로 덜 중요한 채널은 좀 더 거칠게 눌러 담는다. GPTQ처럼 값 하나하나를 순서대로 보정하지 않아도 되어 양자화 자체에 걸리는 시간이 더 짧다는 실무적 장점도 있다.

이런 정교한 양자화 방법이 필요한 이유는 단순 반올림 방식의 INT8이나 INT4로는 비트 수를 줄일수록 품질 저하가 급격해지기 때문이다. GPTQ와 AWQ는 오차를 재분배하거나 중요한 값을 보호하는 방식으로 4비트급 압축에서도 원본과 비슷한 성능을 유지한다. 결과적으로 700억 개 파라미터급 모델도 fp16 기준 약 140GB에서 4비트 기준 약 35GB 수준으로 줄어들어 훨씬 적은 GPU 메모리로 서빙할 수 있게 된다.

## 명제


## 그림
<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="190" x2="480" y2="190" class="dg-line" stroke-width="1.5"/>
<rect x="80" y="30" width="60" height="160" class="dg-dim" stroke="none"/>
<text x="110" y="205" text-anchor="middle" font-size="12">fp16</text>
<text x="110" y="20" text-anchor="middle" font-size="12">약 140GB</text>
<rect x="220" y="110" width="60" height="80" class="dg-dim" stroke="none"/>
<text x="250" y="205" text-anchor="middle" font-size="12">INT8</text>
<text x="250" y="100" text-anchor="middle" font-size="12">약 70GB</text>
<rect x="360" y="150" width="60" height="40" class="dg-accent" stroke="none"/>
<text x="390" y="205" text-anchor="middle" font-size="12">GPTQ/AWQ 4bit</text>
<text x="390" y="140" text-anchor="middle" font-size="12">약 35GB</text>
</svg>

_비트 수를 줄일수록 모델이 차지하는 메모리도 비례해서 줄어든다(700억 파라미터 모델 기준)._

## 문제
오차를 그냥 두고 $w_2$는 그대로 둔 채 출력을 계산하면 $\hat w_1x_1+w_2x_2$가 되는데, 원래 출력 $y$와 비교한 차이, 즉 $(\hat w_1x_1+w_2x_2)-y$는 ==빈칸== 이다.

## 해설
$\hat w_1x_1+w_2x_2$에서 $y=w_1x_1+w_2x_2$를 빼면 $w_2x_2$끼리 상쇄되고 $(\hat w_1-w_1)x_1=-\epsilon_1x_1$만 남기 때문이에요.

**정답: $-\epsilon_1x_1$**

## 예시

