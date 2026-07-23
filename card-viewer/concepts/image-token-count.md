---
slug: image-token-count
theme: LLM
domainLabel: LLM/Agent
subLabel: 이미지 토큰화
title: 이미지 토큰 수: 해상도가 커질수록 컨텍스트를 많이 먹는다
related: 패치 토큰화 · 타일링
---

## 도입
패치 토큰화에서 본 것처럼 토큰 수는 대략 $(H/p)\times(W/p)$입니다. 가로세로를 각각 $k$배 키우면 토큰 수는 $k^2$배로 늘어납니다. 해상도는 가로세로 두 방향으로 함께 커지기 때문에 선형으로 보이는 해상도 증가가 실제로는 제곱으로 토큰 수를 늘리는 셈입니다.

이렇게 늘어난 이미지 토큰은 단순히 자리만 차지하는 게 아닙니다. 셀프어텐션의 계산량은 시퀀스 길이의 제곱에 비례하므로 이미지 토큰이 늘면 이미지 토큰들 사이 그리고 이미지 토큰과 텍스트 토큰 사이의 어텐션 계산량도 함께 불어납니다. 결국 해상도를 올리는 선택은 이미지를 더 선명하게 보여주는 대신 컨텍스트 예산과 계산 비용을 함께 지불하는 거래입니다.

그래서 실제 서비스에서는 이미지를 무한정 원래 해상도로 넣지 않습니다. 모델이 지원하는 최대 해상도로 리사이즈하거나 아주 큰 이미지는 타일링으로 다루는 절충을 택합니다.

## 명제


## 그림
<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">
<text x="250" y="20" font-size="12" text-anchor="middle">해상도가 2배면 토큰 수는 4배</text>
<line x1="60" y1="200" x2="460" y2="200" class="dg-line" stroke-width="1.5"/>
<rect x="140" y="160" width="70" height="40" class="dg-dim" stroke="none"/>
<rect x="140" y="160" width="70" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="300" y="40" width="70" height="160" class="dg-accent" stroke="none"/>
<rect x="300" y="40" width="70" height="160" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="175" y="216" font-size="11" text-anchor="middle">336×336</text>
<text x="175" y="230" font-size="11" class="dg-dim" text-anchor="middle">576 토큰</text>
<text x="335" y="216" font-size="11" text-anchor="middle">672×672</text>
<text x="335" y="230" font-size="11" class="dg-dim" text-anchor="middle">2304 토큰</text>
</svg>

_해상도를 두 배로 올리면 면적이 네 배가 되어 패치 토큰 수도 네 배로 늘어난다._

## 문제
원래 가로 패치 수를 $N_w=W/p$, 세로 패치 수를 $N_h=H/p$라고 둡시다. 이미지를 가로세로 각각 $k$배로 키우면 새 너비는 $kW$가 되고, 새 가로 패치 수는 $kW/p$입니다. 이를 $N_w$를 이용해서 다시 쓰면 ==빈칸== 입니다.

## 해설
$kW/p$에서 $W/p$ 부분이 그대로 $N_w$이므로 $k$를 앞으로 묶어내면 $k \times N_w$가 되기 때문이에요.

**정답: $k N_w$**

## 예시
CLIP ViT-L/14를 그대로 쓰는 경우 흔한 입력 해상도는 $336\times336$이고 패치 크기는 $14$입니다. 한 변의 패치 수는 $336 \div 14 = 24$이므로 전체 패치 토큰 수는 다음과 같습니다.
$$N_{\mathrm{patch}} = 24 \times 24 = 576$$
이미지를 가로세로 두 배인 $672\times672$로 키우면 한 변의 패치 수는 $672 \div 14 = 48$이 되고 전체 토큰 수는 $48\times48=2304$입니다. 해상도가 2배 늘었을 뿐인데 토큰 수는 $2304 \div 576 = 4$ 즉 4배로 늘어난 것입니다. 대화 컨텍스트가 8000토큰이라면 576개는 전체의 약 7퍼센트지만 2304개는 약 29퍼센트를 이미지 하나가 차지하게 됩니다.
