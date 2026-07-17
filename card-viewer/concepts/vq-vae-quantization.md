---
slug: vq-vae-quantization
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 그래프 · 탐색
title: VQ-VAE 최근접 양자화의 왜곡 최소성
related: 
---

## 도입
VQ-VAE의 인코더는 연속적인 잠재벡터 $z$를 만들지만, 디코더에 넣기 전에 이 값을 코드북 $\{e_1,\dots,e_K\}$ 안의 벡터 하나로 반드시 바꿔치기해야 한다. 이 바꿔치기를 양자화라 부르고, VQ-VAE는 $z$와 가장 가까운 코드북 벡터를 고르는 최근접 규칙을 쓴다.

## 명제
고정된 코드북 $\{e_1,\dots,e_K\}$에 대해 $q(z)=\arg\min_k\|z-e_k\|^2$로 정의된 최근접 양자화는, 그 코드북 안에서 왜곡 $\|z-e\|^2$를 가장 작게 만드는 선택이다.

## 그림
<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
<line x1="42" y1="137" x2="122" y2="217" class="dg-line" stroke-width="1" stroke-dasharray="3,3" />
<line x1="110" y1="70" x2="190" y2="150" class="dg-line" stroke-width="1" stroke-dasharray="3,3" />
<line x1="105" y1="110" x2="60" y2="200" class="dg-line" stroke-width="1" stroke-dasharray="4,3" />
<line x1="105" y1="110" x2="195" y2="65" class="dg-line" stroke-width="1" stroke-dasharray="4,3" />
<line x1="105" y1="110" x2="105" y2="155" class="dg-stroke-accent" stroke-width="2.5" />
<circle cx="60" cy="200" r="7" class="dg-accent" />
<circle cx="105" cy="155" r="7" class="dg-accent" />
<circle cx="195" cy="65" r="7" class="dg-accent" />
<circle cx="105" cy="110" r="6" fill="none" class="dg-stroke-ink" stroke-width="2" />
<text x="35" y="216" font-size="11">e₁=(0,0)</text>
<text x="112" y="150" font-size="11">e₂=(1,1)</text>
<text x="200" y="60" font-size="11">e₃=(3,3)</text>
<text x="112" y="108" font-size="11">z=(1,2)</text>
<text x="20" y="20" font-size="11" class="dg-dim">점선 = 보로노이 경계, z는 가장 가까운 e₂로 양자화(굵은 선)</text>
</svg>

_잠재벡터 z는 왜곡이 가장 작은(=1) 코드북 벡터 e₂에 최근접 배정된다._

## 문제
왜곡을 재는 기준부터 분명히 한다. 코드북에서 벡터 $e_k$를 골랐을 때 그 대가로 치르는 손실을 $z$와 $e_k$ 사이의 유클리드 거리의 제곱으로 정의한다.

즉 코드북 인덱스 $k$를 고를 때의 왜곡은 $D(k) = $==빈칸== 이다.

## 해설
왜곡은 원래 값 z와 대체한 값 $e_k$ 사이의 거리를 제곱해서 잰다. 정의를 그대로 옮겨 쓴 것이다.

**정답: $\|z-e_k\|^2$**

## 예시
arg min 논증을 보기 전에 실제 좌표를 가진 코드북에 잠재벡터를 직접 대입해서 어떤 코드가 뽑히는지 확인해본다.

잠재벡터 $z=(1,2)$가 있고 코드북은 $e_1=(0,0),\ e_2=(1,1),\ e_3=(3,3)$ 세 개라 하자. 각 코드까지의 왜곡을 계산한다.
$$\|z-e_1\|^2=1^2+2^2=5,\quad \|z-e_2\|^2=0^2+1^2=1,\quad \|z-e_3\|^2=2^2+1^2=5$$
$e_2$의 왜곡이 1로 가장 작다. 최근접 규칙 $q(z)=\arg\min_k\|z-e_k\|^2$은 이 세 값을 비교해서 그대로 $e_2$를 고른다. $e_1$이나 $e_3$을 대신 골랐다면 왜곡이 5로 다섯 배나 커졌을 것이다. 아래 증명은 이렇게 후보를 비교해서 최솟값을 고르는 절차가 왜 코드북 안에서 항상 최적의 선택이 되는지를 보인다.
