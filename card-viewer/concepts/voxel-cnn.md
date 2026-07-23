---
slug: voxel-cnn
theme: ARCH
domainLabel: 모델 아키텍처 심화
subLabel: 3D · 포인트클라우드
title: 복셀 기반 3D CNN: 점군을 격자로 양자화
related: PointNet · NeRF
---

## 도입
점군을 규칙적인 3D 격자로 양자화하는 과정을 복셀화라 한다. 공간을 $V \times V \times V$ 크기의 정육면체 칸들로 나누고, 각 칸 안에 점이 하나라도 있으면 그 칸을 점유(occupied)로 표시하거나 칸 안 점들의 통계(개수, 평균 특징 등)를 채워 넣는다. 이렇게 만든 3D 텐서에 표준 3D 합성곱을 그대로 적용할 수 있다. 커널이 가로세로에 더해 깊이 축으로도 슬라이딩하는 것 말고는 2D CNN과 원리가 같다.

문제는 해상도다. 격자 한 변의 칸 수를 $V$로 두면 전체 칸 수는 $V^3$으로 늘어난다. 해상도를 2배로 올리면 메모리와 연산량은 8배로 뛴다. 게다가 실제 물체 표면은 3D 공간의 얇은 껍질에 불과해서 대부분의 복셀은 아무 점도 담지 않은 빈 칸이다. 조밀한 격자 전체에 컨볼루션을 돌리는 건 이 빈 칸들까지 전부 계산하는 셈이라 낭비가 크다.

이 낭비를 줄이기 위해 이후 연구들은 점유된 복셀만 골라 계산하는 희소 컨볼루션(sparse convolution)이나, 옥트리처럼 표면 근처만 세밀하게 나누고 빈 공간은 성기게 남기는 적응적 자료구조를 도입했다. 그럼에도 복셀화는 3D 데이터를 CNN이라는 검증된 도구로 다룰 수 있게 해주는 가장 직접적인 다리이며, 자율주행 라이다 처리 파이프라인 등에서 여전히 널리 쓰인다.

## 명제


## 그림
<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="30" width="50" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="90" y="30" width="50" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="140" y="30" width="50" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="40" y="80" width="50" height="50" class="dg-accent"/>
<rect x="90" y="80" width="50" height="50" class="dg-accent"/>
<rect x="140" y="80" width="50" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="40" y="130" width="50" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="90" y="130" width="50" height="50" class="dg-accent"/>
<rect x="140" y="130" width="50" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="220" y="60" font-size="12">점유된 복셀 (표면 근처)</text>
<text x="220" y="85" font-size="12" class="dg-dim">→ 3D 컨볼루션 적용</text>
<text x="220" y="140" font-size="12">빈 복셀은 대부분 계산 낭비</text>
</svg>

_점을 담은 칸만 점유되고 나머지는 대부분 빈 칸으로 남는다._

## 문제
해상도를 $c$배로 올린 격자의 전체 칸 수는 $N(cV)=(cV)^3=$==빈칸== 이다.

## 해설
거듭제곱의 곱셈 법칙에 따라 (cV)^3을 전개하면 c와 V를 각각 세제곱한 c^3V^3이 되기 때문이에요.

**정답: $c^3V^3$**

## 예시
한 변의 길이가 2인 정육면체 공간을 $4\times4\times4$ 격자로 나누는 경우를 계산해본다. 격자 한 칸의 크기는 $2/4=0.5$다. 점 4개의 좌표는 $p_1=(0.3,0.3,0.3)$, $p_2=(1.2,0.7,1.9)$, $p_3=(1.6,1.6,0.4)$, $p_4=(0.9,1.1,1.4)$다. 각 좌표를 칸 크기 $0.5$로 나눈 뒤 내림(floor)하면 그 점이 속한 복셀의 인덱스 $(i,j,k)$가 나온다.
$$p_1 \to \left(\lfloor 0.3/0.5\rfloor,\lfloor 0.3/0.5\rfloor,\lfloor 0.3/0.5\rfloor\right)=(0,0,0)$$
$$p_2 \to \left(\lfloor 1.2/0.5\rfloor,\lfloor 0.7/0.5\rfloor,\lfloor 1.9/0.5\rfloor\right)=(2,1,3)$$
$$p_3 \to \left(\lfloor 1.6/0.5\rfloor,\lfloor 1.6/0.5\rfloor,\lfloor 0.4/0.5\rfloor\right)=(3,3,0)$$
$$p_4 \to \left(\lfloor 0.9/0.5\rfloor,\lfloor 1.1/0.5\rfloor,\lfloor 1.4/0.5\rfloor\right)=(1,2,2)$$
결과적으로 점유(occupied)로 표시되는 칸은 $(0,0,0)$, $(2,1,3)$, $(3,3,0)$, $(1,2,2)$ 네 칸뿐이다. 전체 칸 수는 $4^3=64$개다. 나머지 60개 칸은 모두 점유되지 않은 0으로 남는다.

해상도를 두 배로 올려 $8\times8\times8$ 격자로 나누면 칸 크기는 $2/8=0.25$로 더 세밀해진다. 하지만 전체 칸 수는 $8^3=512$개로 늘어난다. 같은 점군을 담는데도 메모리는 $512/64=8$배로 커진다. 반대로 격자를 더 성기게 두면 메모리는 아끼지만 한 칸 안에 서로 다른 여러 점이 뭉뚱그려져 세부 형상 정보가 뭉개질 위험이 커진다.
