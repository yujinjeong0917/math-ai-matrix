---
slug: latent-diffusion
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: Diffusion 아키텍처
title: Latent Diffusion: 압축된 잠재공간에서 확산하기
related: U-Net · 텍스트 조건화
---

## 도입
latent diffusion은 먼저 오토인코더 계열의 인코더 $E$와 디코더 $D$를 학습시켜 이미지 $x$를 훨씬 낮은 차원의 잠재표현 $z=E(x)$로 압축하고 $D(z)\approx x$가 되도록 만든다. 예를 들어 512×512×3 크기의 이미지를 64×64×4 정도의 잠재표현으로 압축하면 공간 차원이 8분의 1로 줄어든다.

확산과 역확산 과정은 원본 픽셀 $x$가 아니라 이 잠재표현 $z$ 위에서 진행된다. U-Net 기반의 노이즈 예측 네트워크도 압축된 $z_t$를 입력으로 받아 그 안의 노이즈 $\epsilon_\theta(z_t,t)$를 예측한다. 노이즈 제거를 반복해서 얻은 최종 잠재표현 $z_0$은 마지막에 디코더 $D$를 한 번 통과해 실제 이미지로 복원된다.

이 구조 덕분에 반복적으로 노이즈를 예측해야 하는 무거운 연산이 전부 작은 잠재공간에서 이루어지고 큰 해상도로의 변환은 인코딩과 디코딩 각각 한 번씩만 필요하다. Stable Diffusion을 비롯한 널리 쓰이는 텍스트투이미지 모델들이 대부분 이 구조를 기본 골격으로 삼고 있다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="80" width="90" height="60" class="dg-dim"/>
<text x="55" y="45" font-size="12" text-anchor="middle">픽셀 이미지</text>
<text x="55" y="160" font-size="12" text-anchor="middle">512x512x3</text>
<rect x="130" y="85" width="100" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="180" y="114" font-size="12" text-anchor="middle">VAE 인코더</text>
<rect x="260" y="75" width="110" height="70" class="dg-accent"/>
<text x="315" y="95" font-size="12" text-anchor="middle">잠재공간 z</text>
<text x="315" y="112" font-size="12" text-anchor="middle">64x64x4</text>
<text x="315" y="132" font-size="12" text-anchor="middle">노이즈 추가 제거 반복</text>
<rect x="400" y="85" width="100" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="450" y="114" font-size="12" text-anchor="middle">VAE 디코더</text>
<rect x="530" y="80" width="90" height="60" class="dg-dim"/>
<text x="575" y="45" font-size="12" text-anchor="middle">픽셀 이미지</text>
<text x="575" y="160" font-size="12" text-anchor="middle">512x512x3</text>
<line x1="100" y1="110" x2="130" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="230" y1="110" x2="260" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="370" y1="110" x2="400" y2="110" class="dg-line" stroke-width="1.5"/>
<line x1="500" y1="110" x2="530" y2="110" class="dg-line" stroke-width="1.5"/>
</svg>

_이미지를 압축한 잠재공간 안에서만 노이즈를 넣고 빼는 확산 과정을 반복한 뒤 마지막에 픽셀로 복원합니다._

## 문제
두 원소 개수의 비율은 $r=\dfrac{H\times W\times 3}{(H/f)\times(W/f)\times c}$로 쓸 수 있다. 이 분수의 분모에서 $(H/f)\times(W/f)$ 부분부터 정리하면 그 값은 ==빈칸== 이다.

## 해설
H를 f로 나눈 값과 W를 f로 나눈 값을 곱하면 HW는 그대로 남고 f는 두 번 곱해져 분모에 제곱으로 들어가요.

**정답: $\dfrac{HW}{f^2}$**

## 예시
픽셀 공간에서 그대로 디퓨전을 돌릴 때와 압축된 잠재공간에서 돌릴 때의 계산량 차이를 숫자로 비교해본다.

원본 이미지가 $512\times512\times3$ 크기라고 하자. 다운샘플링 비율이 $8$인 VAE 인코더를 쓰면 가로세로 해상도가 다음처럼 줄어든다.
$$512 / 8 = 64$$
채널은 보통 $4$개 정도로 맞춰지므로 잠재표현의 크기는 $64\times64\times4$가 된다.

디퓨전의 U-Net이 매 스텝 처리해야 하는 원소 개수를 픽셀 공간과 잠재공간에서 각각 세어본다. 픽셀 공간에서는 다음만큼의 값을 처리해야 한다.
$$512 \times 512 \times 3 = 786432$$
잠재공간에서는 다음만큼의 값만 처리하면 된다.
$$64 \times 64 \times 4 = 16384$$
두 값의 비율을 구해본다.
$$786432 / 16384 = 48$$
같은 노이즈 예측 연산을 잠재공간에서 수행하면 원소 개수 기준으로 대략 $48$배 더 적은 값을 다루게 되는 셈이고 이는 그만큼 연산량과 메모리 사용량이 줄어든다는 뜻이다.
