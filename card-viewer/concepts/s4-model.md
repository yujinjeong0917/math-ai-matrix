---
slug: s4-model
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: State-Space 모델
title: S4: 구조화된 상태공간과 HiPPO 초기화
related: Mamba · SSM 추론 특성
---

## 도입
상태공간모델은 연속시간에서 $h'(t)=Ah(t)+Bx(t)$, $y(t)=Ch(t)$라는 선형 미분방정식으로 시스템을 정의한다. 실제 데이터는 이산적인 시퀀스이므로 스텝 간격 $\Delta$를 두고 이를 이산화해서 $\bar A=\exp(\Delta A)$, $\bar B=(\Delta A)^{-1}(\exp(\Delta A)-I)\Delta B$로 바꾸고 $h_t=\bar A h_{t-1}+\bar B x_t$, $y_t=Ch_t$라는 이산 순환식으로 계산한다.

이 틀에서 성능을 좌우하는 것은 행렬 $A$를 어떻게 고르느냐다. HiPPO 이론은 과거 입력을 특정 직교다항식 기저로 사영했을 때 그 계수를 최적으로 유지하도록 만드는 $A$의 닫힌 형태를 제시한다. 이 행렬로 상태를 초기화하면 상태 벡터가 오래된 정보를 급격히 잊어버리지 않고 효율적으로 압축해서 들고 있을 수 있다.

S4는 여기에 더해 $A$를 대각행렬과 저계수행렬의 합으로 구조화해서 이산 순환식을 시퀀스 전체에 대한 하나의 합성곱 커널로 다시 쓸 수 있게 만든다. 이 커널은 코시커널과 FFT를 이용해 빠르게 계산할 수 있어서 순환식을 한 스텝씩 도는 대신 시퀀스 전체를 한 번에 병렬로 처리하면서도 매우 긴 의존성까지 포착한다.

## 명제


## 그림
<svg viewBox="0 0 620 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="60" width="150" height="55" rx="8" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
      <text x="30" y="82" font-size="11">연속시간</text>
      <text x="30" y="100" class="dg-dim" font-size="11">h'(t)=Ah(t)+Bx(t)</text>
      <line x1="170" y1="87" x2="230" y2="87" class="dg-line" stroke-width="1.5" />
      <text x="172" y="76" class="dg-dim" font-size="11">이산화 Δ</text>
      <rect x="230" y="60" width="180" height="55" rx="8" fill="none" class="dg-stroke-accent" stroke-width="2" />
      <text x="240" y="82" font-size="11">이산 순환식</text>
      <text x="240" y="100" class="dg-dim" font-size="11">h(t)=Āh(t-1)+B̄x(t)</text>
      <line x1="410" y1="87" x2="470" y2="87" class="dg-line" stroke-width="1.5" />
      <rect x="470" y="60" width="130" height="55" rx="8" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
      <text x="490" y="82" font-size="11">출력</text>
      <text x="480" y="100" class="dg-dim" font-size="11">y(t)=Ch(t)</text>
    </svg>

_연속시간 시스템을 이산화해서 순환식으로 계산하는 흐름입니다._

## 문제
$t=1$일 때는 $h_1=\bar A h_0+\bar B x_1$인데 $h_0=0$이므로 $h_1=$==빈칸== 이다.

## 해설
h_0이 0이므로 Ā h_0 항은 사라지고 B̄x_1 항만 남아요.

**정답: $\bar B x_1$**

## 예시
$A=-1$, $B=1$, 스텝 간격 $\Delta=1$인 스칼라 경우를 생각해보자.

이산화하면 $\bar A=e^{\Delta A}=e^{-1}\approx0.368$이고 $\bar B=\dfrac{e^{\Delta A}-1}{A}B\approx0.632$이다. 순환식은 $h_t\approx0.368h_{t-1}+0.632x_t$가 되어 매 스텝 이전 상태를 37퍼센트 남기고 새 입력을 63퍼센트 반영하는 지수평활과 같은 모양이 된다.
