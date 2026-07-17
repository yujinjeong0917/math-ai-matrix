---
slug: kv-cache
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: Transformer 계열
title: KV Cache: 자기회귀 생성의 재계산 제거
related: GPT 계열 · Transformer(2017)
---

## 도입
셀프어텐션에서 매 스텝 새로 계산해야 하는 건 사실 새로 생성된 토큰의 쿼리뿐이다. 인과적 마스크 때문에 이 쿼리는 자기 자신을 포함해 이전의 모든 K, V와 어텐션을 계산해야 하는데, 이전 토큰들의 K, V는 이전 스텝에서 이미 구한 값과 정확히 같다. 캐시가 없다면 매 스텝마다 시퀀스 전체 길이만큼의 K, V를 처음부터 다시 계산해야 해서 $n$번째 토큰까지 생성하는 데 드는 전체 연산량이 $O(n^2)$로 늘어난다. 캐시를 쓰면 매 스텝 새 토큰 하나의 K, V만 계산하면 되므로 스텝당 연산량이 시퀀스 길이에 거의 비례하지 않는다.

다만 공짜는 아니다. 캐시는 레이어마다, 헤드마다, 지금까지 생성된 모든 토큰 위치마다 K와 V 벡터를 계속 들고 있어야 하므로 시퀀스가 길어질수록 메모리 사용량이 선형으로 늘어난다. 대략적인 크기는 $2 \times L \times d_{\mathrm{model}} \times n \times b \times s$로 잡을 수 있다. $L$은 레이어 수, $d_{\mathrm{model}}$은 모델 차원, $n$은 시퀀스 길이, $b$는 배치 크기, $s$는 값 하나당 바이트 수, 앞의 2는 K와 V 두 벡터를 뜻한다. 긴 문맥을 다루는 서빙에서 KV 캐시 메모리가 GPU 메모리의 병목이 되는 경우가 흔한 이유가 여기 있다.

그래서 이후 연구들은 이 메모리 비용을 줄이는 방향으로 발전했다. 여러 쿼리 헤드가 K, V 헤드를 공유하는 멀티쿼리/그룹쿼리 어텐션(MQA/GQA)이 대표적이다. 캐시 하나를 유지하는 대신 헤드 수를 줄여서 캐시 크기 자체를 줄이는 접근이다. KV 캐시는 연산과 메모리를 맞바꾼 것이고, 자기회귀 생성을 실제 서비스 속도로 돌리기 위한 사실상 표준 기법이다.

## 명제


## 그림
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="30" font-size="12">캐시된 K, V</text>
<rect x="20" y="50" width="60" height="50" class="dg-dim"/>
<rect x="90" y="50" width="60" height="50" class="dg-dim"/>
<rect x="160" y="50" width="60" height="50" class="dg-dim"/>
<rect x="230" y="50" width="60" height="50" class="dg-dim"/>
<text x="50" y="80" font-size="11" text-anchor="middle">t1</text>
<text x="120" y="80" font-size="11" text-anchor="middle">t2</text>
<text x="190" y="80" font-size="11" text-anchor="middle">t3</text>
<text x="260" y="80" font-size="11" text-anchor="middle">t4</text>
<line x1="310" y1="75" x2="350" y2="75" class="dg-line" stroke-width="1.5"/>
<rect x="360" y="50" width="60" height="50" class="dg-accent"/>
<text x="390" y="80" font-size="11" text-anchor="middle">t5</text>
<text x="360" y="130" font-size="12">새 토큰의 K, V만 계산해 이어붙인다</text>
</svg>

_이전 토큰의 K, V는 캐시에 남기고 새 토큰의 K, V만 새로 계산한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
GPT 같은 모델은 문장을 한 토큰씩 만든다. 그런데 다음 토큰을 만들 때마다 지금까지 나온 문장 전체를 처음부터 다시 어텐션 계산에 통과시킨다면, 100번째 토큰을 만들 때 앞의 99개 토큰에 대한 계산을 또 반복하는 셈이다. 이미 계산해둔 값을 매번 새로 구하는 건 명백한 낭비다.

KV Cache는 이 낭비를 없앤다. 어텐션에서 각 토큰이 만들어내는 키(K)와 값(V) 벡터는 그 토큰이 이후에 다시 나타나도 바뀌지 않으므로, 한 번 계산한 K, V를 저장해두고 새 토큰이 생길 때마다 그 토큰의 K, V만 새로 계산해서 캐시에 이어붙이면 된다.


## 예시
레이어 32개, 모델 차원 4096, 시퀀스 길이 2048, 배치 1, FP16(값 하나당 2바이트)인 모델의 KV 캐시 크기를 계산해본다.
$$2 \times 32 \times 4096 \times 2048 \times 1 \times 2 = 1073741824 \text{ bytes}$$
정확히 1,073,741,824바이트, 즉 1GiB다. 문맥 길이가 두 배로 늘거나 배치가 두 배로 늘면 이 값도 그만큼 그대로 두 배로 커진다.
