---
slug: time-series-transformer
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: 시계열
title: 시계열 Transformer: 순서를 잃지 않는 어텐션
related: TCN · LSTM/GRU
---

## 도입
RNN 계열은 한 스텝씩 순서대로 처리하기 때문에 순서 정보가 계산 구조 자체에 들어있다. 반면 셀프어텐션은 시퀀스의 모든 시점 쌍 사이의 관련도를 병렬로 한 번에 계산하는 집합 연산에 가깝다. 그래서 입력에 위치정보를 별도로 더해주지 않으면 시점의 순서를 전혀 구분하지 못한다.

시계열 Transformer는 사인 코사인 함수로 만든 고정 위치인코딩이나 학습되는 위치임베딩을 입력에 더해서 이 문제를 해결한다. 여기에 더해 요일이나 시간대처럼 주기적으로 반복되는 달력 정보를 별도의 임베딩으로 추가하는 경우도 많다. 이렇게 만든 입력을 셀프어텐션에 넣으면 $\mathrm{Attention}(Q,K,V)=\mathrm{softmax}(QK^T/\sqrt{d_k})V$ 계산을 통해 과거의 모든 시점을 한 번에 참고하면서 예측에 중요한 시점에 더 큰 가중치를 준다.

순수한 셀프어텐션은 시퀀스 길이 $n$에 대해 $O(n^2)$의 연산량과 메모리가 필요해서 아주 긴 시계열에는 그대로 쓰기 어렵다. Informer나 Autoformer 같은 후속 모델들은 어텐션 계산을 희소하게 줄이거나 시계열의 추세와 계절성을 먼저 분해한 뒤 어텐션을 적용하는 식으로 이 문제를 완화한다.

## 명제


## 그림
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="25" font-size="12">표준 Transformer: 정수 위치 인덱스</text>
<line x1="90" y1="45" x2="330" y2="45" class="dg-line" stroke-width="1.5"/>
<line x1="90" y1="40" x2="90" y2="50" class="dg-line" stroke-width="1.5"/>
<line x1="170" y1="40" x2="170" y2="50" class="dg-line" stroke-width="1.5"/>
<line x1="250" y1="40" x2="250" y2="50" class="dg-line" stroke-width="1.5"/>
<line x1="330" y1="40" x2="330" y2="50" class="dg-line" stroke-width="1.5"/>
<text x="86" y="63" font-size="12">0</text>
<text x="166" y="63" font-size="12">1</text>
<text x="246" y="63" font-size="12">2</text>
<text x="322" y="63" font-size="12">3</text>
<text x="20" y="95" font-size="12">시계열: 실제 타임스탬프 (불규칙 간격)</text>
<line x1="90" y1="115" x2="330" y2="115" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="90" y1="110" x2="90" y2="120" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="135" y1="110" x2="135" y2="120" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="150" y1="110" x2="150" y2="120" class="dg-stroke-accent" stroke-width="1.5"/>
<circle cx="150" cy="115" r="4" class="dg-accent"/>
<line x1="240" y1="110" x2="240" y2="120" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="78" y="133" font-size="12">t=0</text>
<text x="118" y="133" font-size="12">t=1.5</text>
<text x="138" y="133" font-size="12">t=2.0</text>
<text x="226" y="133" font-size="12">t=5.0</text>
<line x1="90" y1="120" x2="90" y2="160" class="dg-line" stroke-width="1.5"/>
<line x1="135" y1="120" x2="135" y2="160" class="dg-line" stroke-width="1.5"/>
<line x1="150" y1="120" x2="150" y2="160" class="dg-line" stroke-width="1.5"/>
<line x1="240" y1="120" x2="240" y2="160" class="dg-line" stroke-width="1.5"/>
<rect x="65" y="160" width="210" height="45" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="187" font-size="12">시간 인식 위치인코딩 PE(Δt)</text>
<line x1="275" y1="182" x2="330" y2="182" class="dg-line" stroke-width="1.5"/>
<rect x="330" y="160" width="150" height="45" rx="6" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="352" y="187" font-size="12">셀프어텐션</text>
<text x="65" y="225" font-size="12">예: t=2.0 지점은 직전 관측과 Δt=0.5 차이</text>
</svg>

_실제 시각 간격 Δt를 표준 정수 위치 대신 위치인코딩에 직접 반영해 셀프어텐션에 넣는 과정을 보여준다._

## 문제
시계열 Transformer의 위치인코딩은 $\omega_i=1/10000^{2i/d_{\text{model}}}$로 정의되는 각주파수를 써서 $PE(pos,2i)=\sin(\omega_i\,pos)$, $PE(pos,2i+1)=\cos(\omega_i\,pos)$로 정의된다. 모델 차원 $d_{\text{model}}=4$, $i=0$인 성분만 보면 $\omega_0=10000^0=1$이므로 $PE(pos,0)=\sin(pos)$, $PE(pos,1)=\cos(pos)$가 된다. 셀프어텐션 자체는 순서를 모르는 집합 연산이므로, 이 위치인코딩이 $pos$가 아니라 이동량 $k$만으로 정해지는 선형 변환을 통해 상대적 시간차를 실어 나르는지 $pos=1,\,k=2$인 경우로 확인해본다. 이때 $PE(1,0)=\sin(1)\approx$==빈칸== 이고 $PE(1,1)=\cos(1)\approx0.5403$이다.

## 해설
sin(1)≈0.8415. 이후 각도 합 공식으로 PE(pos+k)를 계산할 때 쓸 출발값으로, 직접 삼각함수를 계산해야 나온다.

**정답: $0.8415$**

## 예시
Transformer는 셀프어텐션 자체에 순서 개념이 없어서 위치정보를 따로 더해줘야 한다. 표준 Transformer는 단어가 몇 번째인지 나타내는 정수 위치 $pos=0,1,2,3,\dots$을 그대로 사인 코사인 함수에 넣는다.

그런데 시계열은 관측 간격이 일정하지 않은 경우가 흔하다. 예를 들어 네 번의 관측이 각각 $t=0, 1.5, 2.0, 5.0$이라는 실제 시각에 이뤄졌다고 하자. 표준 방식대로라면 이 네 시점에 그냥 정수 위치 $pos=0,1,2,3$을 매겨서 마치 매 시점이 균일한 간격으로 벌어진 것처럼 취급하게 된다.

시간 인식 위치인코딩은 정수 위치 대신 직전 관측과의 실제 시간 간격 $\Delta t_k = t_k - t_{k-1}$을 인코딩 함수에 직접 넣는다. 위 시계열에서 각 시점의 간격은 다음과 같다.
$$\Delta t = [\,0,\ 1.5,\ 0.5,\ 3.0\,]$$
모델 차원 $d_{\mathrm{model}}=4$, $i=0$인 성분 하나만 계산해본다. 이 경우 $10000^{2i/d_{\mathrm{model}}}=10000^0=1$이므로 인코딩은 그대로 $\Delta t_k$의 사인 코사인 값이 된다. 세 번째 관측인 $k=3$은 실제 간격이 $\Delta t_3=0.5$이고 이때 값은 다음과 같다.
$$PE(\Delta t_3, 0) = \sin(0.5) \approx 0.4794, \quad PE(\Delta t_3, 1) = \cos(0.5) \approx 0.8776$$
같은 성분을 표준 방식의 정수 위치 $pos=2$로 계산하면 값이 완전히 달라진다. 이 위치는 세 번째 토큰을 0부터 세었을 때의 인덱스다.
$$PE(2, 0) = \sin(2) \approx 0.9093, \quad PE(2, 1) = \cos(2) \approx -0.4161$$
정수 위치는 세 번째 관측이 항상 두 시간 단위만큼 지나서 도착한 것처럼 인코딩한다. 하지만 실제로는 직전 관측과 $0.5$ 시간 단위밖에 떨어져 있지 않았다. 시간 인식 인코딩은 이 차이를 그대로 반영해서 촘촘하게 몰린 관측과 듬성듬성 떨어진 관측을 어텐션이 구분할 수 있게 해준다.
