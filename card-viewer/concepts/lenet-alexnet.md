---
slug: lenet-alexnet
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: CNN 백본 계보
title: LeNet/AlexNet: 합성곱 신경망의 출발점
related: ResNet · EfficientNet
---

## 도입
LeNet-5는 1998년 얀 르쿤이 우편번호 숫자 인식을 위해 설계한 구조다. 합성곱층과 풀링층을 번갈아 쌓고 마지막에 완전연결층을 붙이는 지금도 익숙한 골격을 처음 제시했다. 활성함수로는 시그모이드나 tanh를 썼고 층 수도 몇 개 되지 않는 작은 네트워크였다.

AlexNet은 2012년 이미지넷 대회에서 기존의 손으로 설계한 특징 추출 방식을 큰 차이로 이기면서 딥러닝이 컴퓨터비전의 주류가 되는 계기를 만들었다. LeNet과 기본 골격은 비슷하지만 층을 훨씬 깊고 넓게 쌓았고 시그모이드 대신 학습이 훨씬 빠른 ReLU 활성함수를 썼다. 또 과적합을 막기 위해 드롭아웃을 도입했고 GPU 두 대를 병렬로 써서 그 정도 규모의 네트워크를 현실적인 시간 안에 학습시켰다.

두 모델이 공통으로 보여준 교훈은 이미지를 다루는 데는 필터를 지역적으로 공유하는 구조가 유리하다는 것과 데이터와 연산량이 충분히 커지면 신경망이 사람이 손으로 설계한 특징보다 더 나은 특징을 스스로 찾아낸다는 것이다. 이 두 교훈이 이후 이어지는 모든 CNN 백본 설계의 출발점이 됐다.

## 명제


## 그림
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="20" font-size="13">LeNet-5 계층별 크기 변화</text>
<rect x="10" y="80" width="60" height="100" class="dg-dim"/>
<rect x="90" y="86" width="60" height="88" class="dg-dim"/>
<rect x="170" y="100" width="60" height="60" class="dg-dim"/>
<rect x="250" y="107" width="60" height="46" class="dg-dim"/>
<rect x="330" y="115" width="60" height="30" class="dg-dim"/>
<rect x="420" y="95" width="20" height="70" class="dg-dim"/>
<rect x="500" y="105" width="20" height="50" class="dg-dim"/>
<rect x="580" y="120" width="20" height="20" class="dg-accent"/>
<line x1="70" y1="130" x2="90" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="150" y1="130" x2="170" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="230" y1="130" x2="250" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="310" y1="130" x2="330" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="390" y1="130" x2="420" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="440" y1="130" x2="500" y2="130" class="dg-line" stroke-width="1.5"/>
<line x1="520" y1="130" x2="580" y2="130" class="dg-line" stroke-width="1.5"/>
<text x="40" y="45" font-size="12" text-anchor="middle">입력</text>
<text x="120" y="45" font-size="12" text-anchor="middle">합성곱1</text>
<text x="200" y="45" font-size="12" text-anchor="middle">풀링1</text>
<text x="280" y="45" font-size="12" text-anchor="middle">합성곱2</text>
<text x="360" y="45" font-size="12" text-anchor="middle">풀링2</text>
<text x="430" y="45" font-size="12" text-anchor="middle">완전연결1</text>
<text x="510" y="45" font-size="12" text-anchor="middle">완전연결2</text>
<text x="590" y="45" font-size="12" text-anchor="middle">출력</text>
<text x="40" y="205" font-size="12" text-anchor="middle">32x32x1</text>
<text x="120" y="205" font-size="12" text-anchor="middle">28x28x6</text>
<text x="200" y="205" font-size="12" text-anchor="middle">14x14x6</text>
<text x="280" y="205" font-size="12" text-anchor="middle">10x10x16</text>
<text x="360" y="205" font-size="12" text-anchor="middle">5x5x16</text>
<text x="430" y="205" font-size="12" text-anchor="middle">400 to 120</text>
<text x="510" y="205" font-size="12" text-anchor="middle">120 to 84</text>
<text x="590" y="205" font-size="12" text-anchor="middle">84 to 10</text>
<text x="10" y="230" font-size="12" class="dg-dim">out = floor((W-F+2P)/S) + 1</text>
</svg>

_합성곱과 풀링을 거칠 때마다 공간 크기가 줄고 마지막에는 완전연결층으로 이어집니다._

## 문제
AlexNet은 LeNet과 같은 합성곱 출력 크기 공식 $\text{out}=\left\lfloor\dfrac{W-F+2P}{S}\right\rfloor+1$을 따르지만 입력 이미지 크기가 훨씬 커서 $227\times227\times3$에서 시작한다. 첫 번째 합성곱층은 $11\times11$ 필터를 패딩 없이 스트라이드 $4$로 적용하므로 $W=227,\,F=11,\,P=0,\,S=4$를 대입하면 출력 크기는 $\left\lfloor\dfrac{227-11}{4}\right\rfloor+1=$==빈칸== 이다.

## 해설
(227-11)/4=54, 54+1=55. 공식에 AlexNet 실제 수치를 대입해야 나오는 값이다.

**정답: $55$**

## 예시
LeNet-5의 각 층에서 공간 크기가 어떻게 바뀌는지 합성곱 출력 크기 공식으로 직접 따라가본다. 필터 크기 $F$ 패딩 $P$ 스트라이드 $S$일 때 출력 한 변의 크기는 다음과 같다.
$$\text{out} = \left\lfloor \frac{W - F + 2P}{S} \right\rfloor + 1$$
입력은 $32\times32\times1$ 크기의 흑백 이미지다. 첫 번째 합성곱은 $5\times5$ 필터를 패딩 없이 스트라이드 $1$로 적용한다.
$$\text{out} = \left\lfloor \frac{32 - 5 + 0}{1} \right\rfloor + 1 = 27 + 1 = 28$$
필터가 $6$개이므로 이 단계의 출력은 $28\times28\times6$이다. 다음은 $2\times2$ 필터를 스트라이드 $2$로 적용하는 풀링이다.
$$\text{out} = \left\lfloor \frac{28 - 2}{2} \right\rfloor + 1 = 13 + 1 = 14$$
출력은 $14\times14\times6$이 된다. 두 번째 합성곱도 $5\times5$ 필터를 패딩 없이 스트라이드 $1$로 적용한다.
$$\text{out} = \left\lfloor \frac{14 - 5}{1} \right\rfloor + 1 = 9 + 1 = 10$$
필터가 $16$개이므로 출력은 $10\times10\times16$이다. 이어지는 두 번째 풀링도 $2\times2$ 필터에 스트라이드 $2$다.
$$\text{out} = \left\lfloor \frac{10 - 2}{2} \right\rfloor + 1 = 4 + 1 = 5$$
출력은 $5\times5\times16$이 된다. 이 텐서를 한 줄로 펼치면 $5\times5\times16=400$개의 값이 된다. 이후로는 완전연결층이 이어져서 $400$개 입력이 $120$개로 그다음 $84$개로 줄고 마지막에 클래스 수인 $10$개로 줄어든다.
