---
slug: ssm-inference-characteristics
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: State-Space 모델
title: SSM의 추론 특성: KV 캐시 없는 상수 메모리
related: Mamba · S4
---

## 도입
Transformer 기반 모델이 추론할 때는 지금까지 나온 모든 토큰의 키와 값 벡터를 KV 캐시라는 형태로 저장해두고 매 스텝 새 토큰의 질의를 이 캐시 전체와 비교한다. 시퀀스 길이가 $n$이면 캐시에 저장해야 하는 양이 $n$에 비례해서 늘어나고 한 토큰을 생성하는 데 드는 연산량도 캐시 전체를 훑어야 하므로 $n$에 비례해서 늘어난다. 전체 시퀀스를 처리하는 데 드는 연산량을 합치면 $O(n^2)$이 된다.

상태공간모델은 구조상 순환식 $h_t=\bar A h_{t-1}+\bar B x_t$로 상태를 갱신한다. 이 상태 벡터의 크기는 시퀀스 길이와 무관하게 미리 정해진 고정된 차원이다. 그래서 추론 중에 저장해야 하는 메모리는 시퀀스가 아무리 길어져도 상태 벡터 하나만큼으로 일정하고 한 스텝을 처리하는 연산량도 상수시간이다.

다만 이 상수 메모리에는 대가가 있다. 상태 벡터의 크기가 고정되어 있다는 것은 과거 정보를 그 고정된 용량 안에 압축해서 담아야 한다는 뜻이다. Transformer는 필요하면 아주 오래된 토큰까지 정확히 다시 꺼내볼 수 있지만 상태공간모델은 압축 과정에서 세부 정보가 흐려질 수 있다. 그래서 정확한 장거리 참조가 중요한 과제에서는 Transformer가, 아주 긴 시퀀스를 빠르고 가볍게 처리해야 하는 상황에서는 상태공간모델 계열이 유리하다는 트레이드오프가 있다.

## 명제


## 그림
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="24" text-anchor="middle" font-size="13">Transformer KV 캐시</text>
<line x1="50" y1="220" x2="270" y2="220" class="dg-line" stroke-width="1.5" />
<line x1="50" y1="220" x2="50" y2="50" class="dg-line" stroke-width="1.5" />
<rect x="70" y="205" width="30" height="15" class="dg-dim" />
<rect x="140" y="160" width="30" height="60" class="dg-dim" />
<rect x="210" y="60" width="30" height="160" class="dg-accent" />
<text x="85" y="235" text-anchor="middle" font-size="12">n=1,000</text>
<text x="155" y="235" text-anchor="middle" font-size="12">n=10,000</text>
<text x="225" y="235" text-anchor="middle" font-size="12">n=100,000</text>
<text x="18" y="45" font-size="12">메모리</text>
<text x="470" y="24" text-anchor="middle" font-size="13">SSM 상태 크기</text>
<line x1="370" y1="220" x2="590" y2="220" class="dg-line" stroke-width="1.5" />
<line x1="370" y1="220" x2="370" y2="50" class="dg-line" stroke-width="1.5" />
<line x1="390" y1="205" x2="570" y2="205" class="dg-stroke-accent" stroke-width="2" />
<circle cx="390" cy="205" r="4" class="dg-accent" />
<circle cx="480" cy="205" r="4" class="dg-accent" />
<circle cx="570" cy="205" r="4" class="dg-accent" />
<text x="390" y="235" text-anchor="middle" font-size="12">n=1,000</text>
<text x="480" y="235" text-anchor="middle" font-size="12">n=10,000</text>
<text x="570" y="235" text-anchor="middle" font-size="12">n=100,000</text>
</svg>

_시퀀스 길이가 늘어날수록 Transformer의 KV 캐시는 선형으로 커지지만 SSM의 상태 크기는 항상 일정합니다._

## 문제
합 $S=1+2+\cdots+n$을 두 배로 만든 뒤 앞에서부터 한 항, 뒤에서부터 한 항씩 짝을 지어보자. 앞에서 $k$번째 항은 $k$이고 뒤에서 $k$번째 항은 $n-k+1$인데, 이 두 항의 합은 ==빈칸== 이다.

## 해설
앞에서 k번째 항 k와 뒤에서 k번째 항 n-k+1을 더하면 k가 상쇄되어 n+1만 남기 때문이에요.

**정답: $n+1$**

## 예시
Transformer 계열이 추론 중에 유지해야 하는 KV 캐시 크기는 레이어 수 $L$, 모델 차원 $d_{\mathrm{model}}$, 시퀀스 길이 $n$, 배치 $b$, 값 하나당 바이트 수 $s$에 대해 대략 $2 \times L \times d_{\mathrm{model}} \times n \times b \times s$로 커진다. $L=12$, $d_{\mathrm{model}}=512$, $b=1$, FP16이라 $s=2$바이트인 모델을 예로 들어보자.

토큰 하나 레이어 하나당 K와 V를 합쳐 $2\times512\times2=2048$바이트가 필요하고 레이어 12개를 곱하면 토큰 하나당 $2048\times12=24576$바이트가 든다. 시퀀스 길이가 $n=1000$이면 캐시 전체 크기는 $24576\times1000=24576000$바이트로 정확히 $24000$KiB 즉 $23.4375$MiB다. 시퀀스 길이가 $n=100000$으로 백 배 늘어나면 캐시 크기도 그대로 백 배 늘어난 $24576\times100000=2457600000$바이트 즉 $2400000$KiB 약 $2.29$GiB가 된다.

같은 모델을 SSM 계열로 바꾸면 상태 크기는 $d_{\mathrm{state}}\times d_{\mathrm{model}}\times L\times s$로 정해지고 시퀀스 길이 $n$과는 무관하다. $d_{\mathrm{state}}=16$이라 하면 상태 크기는 $16\times512\times12\times2=196608$바이트로 정확히 $192$KiB다. 이 값은 $n=1000$일 때도 $n=100000$일 때도 똑같이 $192$KiB로 유지된다.

두 값을 비교하면 $n=1000$에서는 Transformer 캐시가 SSM 상태보다 $24000/192=125$배 크고 $n=100000$에서는 그 격차가 $2400000/192=12500$배로 벌어진다. 시퀀스가 길어질수록 상수 메모리라는 장점이 점점 더 크게 벌어지는 것을 볼 수 있다.
