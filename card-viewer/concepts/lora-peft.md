---
slug: lora-peft
theme: LLM
domainLabel: LLM/Agent
subLabel: 파라미터효율 튜닝(PEFT)
title: LoRA: 원가중치는 고정하고 저랭크 행렬만 학습하기
related: QLoRA · Adapter
---

## 도입
LoRA는 사전학습된 가중치 행렬 $W_0$를 고정한 채 그 옆에 저랭크 분해 행렬 $B$와 $A$를 새로 둔다. 파인튜닝된 가중치는 $W = W_0 + BA$로 표현되는데 $B$는 $d \times r$, $A$는 $r \times k$ 크기이고 랭크 $r$은 $d$나 $k$보다 훨씬 작게 잡는다. 학습 중에는 $W_0$의 그래디언트를 구할 필요가 없고 $B$와 $A$만 역전파로 갱신하면 된다.

이 방식이 필요한 이유는 전체 파인튜닝의 메모리 비용 때문이다. Adam 같은 옵티마이저는 파라미터마다 모멘텀과 분산 추정치를 따로 저장하므로 학습 가능한 파라미터 하나당 실제로는 그 몇 배에 달하는 메모리가 필요하다. 수십억 개 파라미터를 통째로 학습하면 옵티마이저 상태만으로도 GPU 메모리가 금방 바닥난다. LoRA는 학습 가능한 파라미터 수를 원래 가중치의 일부 수준으로 줄여서 이 옵티마이저 상태 비용을 함께 줄인다.

LoRA가 통하는 배경에는 파인튜닝으로 생기는 가중치 변화량이 실제로는 낮은 차원의 부분공간 안에서 대부분 설명된다는 관찰이 있다. $W_0$를 완전히 자유롭게 바꿀 필요 없이 몇 개의 방향만 조정해도 원하는 태스크에 맞출 수 있다는 뜻이다. 추론 시점에는 $BA$를 $W_0$에 미리 더해 하나의 행렬로 합쳐버릴 수 있어서 추가 연산이나 지연 없이 원래 모델과 같은 구조로 서빙할 수 있다.

랭크 $r$을 어디에 적용할지도 선택 사항이다. 보통 어텐션의 쿼리와 밸류 투영 행렬에만 LoRA를 붙여도 효과가 크고 $r$을 4에서 64 사이로만 잡아도 전체 파인튜닝과 비슷한 성능에 근접하는 경우가 많다.

## 명제


## 그림
<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="124" font-size="13">입력 x</text>
<line x1="60" y1="120" x2="110" y2="62" class="dg-line" stroke-width="1.5"/>
<line x1="60" y1="120" x2="110" y2="185" class="dg-line" stroke-width="1.5"/>
<rect x="110" y="40" width="200" height="44" fill="none" class="dg-stroke-ink" stroke-width="2" stroke-dasharray="5,3"/>
<text x="210" y="67" text-anchor="middle" font-size="13">W0 (원가중치, 고정)</text>
<line x1="310" y1="62" x2="420" y2="62" class="dg-line" stroke-width="1.5"/>
<line x1="420" y1="62" x2="420" y2="105" class="dg-line" stroke-width="1.5"/>
<rect x="110" y="163" width="90" height="44" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="155" y="190" text-anchor="middle" font-size="13">A (r×k)</text>
<line x1="200" y1="185" x2="240" y2="185" class="dg-line" stroke-width="1.5"/>
<rect x="240" y="163" width="90" height="44" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="285" y="190" text-anchor="middle" font-size="13">B (d×r)</text>
<line x1="330" y1="185" x2="420" y2="185" class="dg-line" stroke-width="1.5"/>
<line x1="420" y1="185" x2="420" y2="135" class="dg-line" stroke-width="1.5"/>
<circle cx="420" cy="120" r="16" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="420" y="125" text-anchor="middle" font-size="14">+</text>
<line x1="436" y1="120" x2="490" y2="120" class="dg-line" stroke-width="1.5"/>
<text x="540" y="124" font-size="13">출력 h</text>
</svg>

_원가중치 W0는 고정한 채 저랭크 행렬 A, B의 곱을 더해 출력을 만든다._

## 문제
전체 파인튜닝의 학습 메모리를 바이트 단위로 계산하면 $M_{full} = 12 \times 16777216 =$ ==빈칸== 바이트이다.

## 해설
12에 16777216을 곱하면 나오는 값이에요.

**정답: $201326592$**

## 예시
은닉차원이 4096인 정사각 가중치 행렬 하나를 전체 파인튜닝하면 학습 파라미터는 $4096 \times 4096 = 16777216$개다. 같은 자리에 랭크 $r=8$인 LoRA를 붙이면 학습 파라미터는 $A$가 $8 \times 4096$, $B$가 $4096 \times 8$이므로 합쳐서 $4096 \times 8 \times 2 = 65536$개다.

전체 파인튜닝 파라미터 16,777,216개와 비교하면 LoRA의 65,536개는 약 $0.39\%$ 수준이다. 옵티마이저 상태까지 이 파라미터 수에 비례해서 줄어드므로 학습 메모리도 그만큼 크게 줄어든다.
