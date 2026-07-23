---
slug: unet-diffusion
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: Diffusion 아키텍처
title: U-Net: 노이즈를 예측하는 인코더-디코더
related: Latent Diffusion · 텍스트 조건화
---

## 도입
U-Net은 원래 의료영상을 픽셀 단위로 분할하기 위해 고안된 구조다. 입력을 여러 단계에 걸쳐 다운샘플링하면서 채널 수는 늘리고 공간 크기는 줄여 넓은 범위의 맥락정보를 압축해서 담는다. 이어서 같은 단계 수만큼 업샘플링하면서 원래의 공간 해상도를 되찾는다.

다운샘플링 과정에서는 세밀한 위치 정보가 필연적으로 손실된다. U-Net은 이를 보완하기 위해 인코더의 각 단계 출력을 디코더의 대응하는 단계로 직접 이어붙이는 스킵연결을 둔다. 덕분에 디코더는 전체 맥락과 세부 위치 정보를 동시에 활용해서 출력을 만들 수 있다.

디퓨전 모델에서 이 구조는 노이즈가 섞인 이미지 $x_t$와 현재 타임스텝 $t$를 입력으로 받아 그 안에 섞인 노이즈 $\epsilon_\theta(x_t,t)$를 예측하는 역할을 맡는다. 타임스텝 정보는 보통 사인 코사인로 만든 임베딩을 각 블록에 더해주는 방식으로 주입된다. 예측한 노이즈를 이용해 $x_t$에서 노이즈를 조금 덜어내면 $x_{t-1}$을 얻고 이 과정을 반복하면 순수한 노이즈가 점점 이미지로 바뀐다.

## 명제


## 그림
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="90" height="30" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
      <text x="45" y="50" font-size="11">인코더1</text>
      <rect x="140" y="75" width="80" height="28" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
      <text x="150" y="94" font-size="11">인코더2</text>
      <rect x="245" y="120" width="70" height="28" rx="6" fill="none" class="dg-stroke-accent" stroke-width="2" />
      <text x="255" y="139" font-size="11">병목</text>
      <rect x="360" y="75" width="80" height="28" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
      <text x="368" y="94" font-size="11">디코더2</text>
      <rect x="480" y="30" width="90" height="30" rx="6" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
      <text x="493" y="50" font-size="11">디코더1</text>
      <line x1="75" y1="60" x2="150" y2="80" class="dg-line" stroke-width="1.5" />
      <line x1="180" y1="103" x2="255" y2="122" class="dg-line" stroke-width="1.5" />
      <line x1="315" y1="132" x2="380" y2="108" class="dg-line" stroke-width="1.5" />
      <line x1="410" y1="80" x2="500" y2="55" class="dg-line" stroke-width="1.5" />
      <line x1="120" y1="45" x2="480" y2="45" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="5 4" />
      <line x1="220" y1="89" x2="360" y2="89" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="5 4" />
      <text x="170" y="190" class="dg-dim" font-size="12">스킵연결이 인코더의 세부정보를 디코더로 직접 전달</text>
      <text x="500" y="20" font-size="12">ε(x_t, t)</text>
    </svg>

_인코더에서 압축한 정보를 스킵연결로 디코더에 그대로 건네주는 구조입니다._

## 문제
인코더의 채널수를 $C_0,C_1,\dots,C_N$이라 하고 다운샘플링마다 채널이 두 배로 늘어난다고 하면 $C_{i+1}=2C_i$가 성립한다. 병목 바로 다음 디코더 단계의 채널수를 $D_{N-1}$이라 하면 업샘플링은 병목채널 $C_N$을 절반으로 줄이므로 $D_{N-1}=C_N/2$이다. 여기에 $C_N=2C_{N-1}$을 대입하면 $D_{N-1}=$==빈칸==이다.

## 해설
$D_{N-1}=C_N/2$에 $C_N=2C_{N-1}$을 대입하면 $2C_{N-1}/2=C_{N-1}$로 약분되기 때문이다.

**정답: $C_{N-1}$**

## 예시
U-Net이 다루는 실제 텐서 크기 변화를 구체적인 숫자로 따라가본다. 입력은 $64\times64\times3$ 크기의 이미지다.

첫 번째 인코더 블록은 해상도는 $64\times64$로 유지한 채 채널만 $3$에서 $64$로 늘린다. 이 결과를 $E_1$이라 하면 크기는 $64\times64\times64$다.

다음 다운샘플링에서는 해상도를 절반으로 줄이고 채널을 두 배로 늘린다. 해상도는 $64\to32$ 채널은 $64\to128$이 되어 $E_2$의 크기는 $32\times32\times128$이다.

한 번 더 다운샘플링하면 해상도는 $32\to16$ 채널은 $128\to256$이 되어 $E_3$의 크기는 $16\times16\times256$이다.

마지막 다운샘플링에서 해상도는 $16\to8$ 채널은 $256\to512$가 되고 이 지점이 병목이다. 병목 텐서의 크기는 $8\times8\times512$다.

디코더는 병목에서부터 반대 순서로 해상도를 키우고 채널을 절반으로 줄인다. 첫 업샘플링에서 해상도는 $8\to16$ 채널은 $512\to256$이 되어 $D_3$의 크기는 $16\times16\times256$이다.

이 지점에서 인코더의 같은 해상도 결과인 $E_3$을 이어붙이는 스킵연결이 들어간다. $E_3$의 채널 $256$과 $D_3$의 채널 $256$을 이어붙이면 $16\times16\times512$가 되고 뒤따르는 합성곱이 이를 다시 $16\times16\times256$으로 줄인다.

두 번째 업샘플링에서는 해상도가 $16\to32$ 채널은 $256\to128$이 되어 $D_2$의 크기는 $32\times32\times128$이다.

바로 이 지점의 스킵연결을 자세히 보면 인코더 쪽 $E_2$의 채널 $128$과 디코더 쪽 $D_2$의 채널 $128$을 이어붙여 $32\times32\times256$을 만든다.
$$128 + 128 = 256$$
채널 덧셈이 그대로 드러나는 지점이다. 뒤따르는 합성곱은 이 $256$개 채널을 다시 $128$개로 줄여서 다음 단계로 넘긴다.

세 번째 업샘플링에서는 해상도가 $32\to64$ 채널은 $128\to64$가 되어 $D_1$의 크기는 $64\times64\times64$다. 이 지점에서도 인코더의 $E_1$과 채널 $64$씩을 이어붙여 $64\times64\times128$을 만든 뒤 합성곱으로 다시 $64\times64\times64$로 줄인다.

마지막으로 출력합성곱이 채널을 $64$에서 입력과 같은 $3$으로 되돌려 최종 출력은 $64\times64\times3$ 크기의 예측 노이즈 $\epsilon_\theta(x_t,t)$가 된다.
