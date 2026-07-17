---
slug: convolution-translation-equivariance
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 기하 · 측도
title: 합성곱의 이동등변성: 입력을 옮기면 출력도 똑같이 옮겨가는 이유
related: 그래프신경망의 순열 등변성과 비교 · 데이터가 놓인 저차원 구조와의 관계
---

## 도입
합성곱 신경망에서 필터 하나가 이미지의 어느 위치에 있든 같은 패턴을 알아본다는 성질은 필터를 위치마다 따로 학습하지 않아도 되는 이유입니다. 이 성질을 등변성이라 부릅니다. 불변성과는 다른 개념입니다. 입력을 옮기면 출력도 정확히 그만큼 옮겨간다는 뜻이지 출력이 전혀 바뀌지 않는다는 뜻이 아닙니다. 이동연산과 합성곱이라는 두 연산의 순서를 바꿔도 결과가 같다는 사실을 인덱스를 직접 대입해서 확인하면 이 등변성이 왜 항상 성립하는지 선명해집니다.

## 명제
이동연산자를 $(S_kx)[n]=x[n-k]$로, 1차원 합성곱을 $(f*x)[n]=\sum_mf[m]x[n-m]$으로 정의하면 모든 정수 $k$에 대해 $f*(S_kx)=S_k(f*x)$이다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<text x="115" y="18" font-size="12" text-anchor="middle">입력 x → 이동 → 합성곱</text>
<rect x="30" y="30" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="55" y="30" width="20" height="20" class="dg-accent"/>
<rect x="80" y="30" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="105" y="30" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="130" y1="40" x2="170" y2="40" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<polygon points="170,40 158,34 158,46" class="dg-stroke-accent"/>
<rect x="180" y="30" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="205" y="30" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="230" y="30" width="20" height="20" class="dg-accent"/>
<rect x="255" y="30" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="30" y="65" font-size="9" class="dg-dim">S_k x (k=1칸 이동)</text>
<line x1="145" y1="80" x2="145" y2="105" class="dg-line" stroke-width="1.5"/>
<polygon points="145,105 139,93 151,93" class="dg-stroke-ink"/>
<text x="150" y="95" font-size="9" class="dg-dim">필터 f 합성곱</text>
<rect x="30" y="115" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="55" y="115" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="80" y="115" width="20" height="20" class="dg-accent"/>
<rect x="105" y="115" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="30" y="150" font-size="9" class="dg-dim">f*(S_k x)</text>
<line x1="145" y1="160" x2="200" y2="160" class="dg-stroke-accent" stroke-width="2"/>
<text x="150" y="150" font-size="9">= S_k(f*x)</text>
<rect x="215" y="115" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="240" y="115" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="265" y="115" width="20" height="20" class="dg-accent"/>
<rect x="290" y="115" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="215" y="150" font-size="9" class="dg-dim">f*x를 그대로 k만큼 이동</text>
<text x="30" y="195" font-size="11">두 경로의 결과가 정확히 일치 (근사 아님, 모든 k에서 등식)</text>
</svg>

_이동한 뒤 합성곱한 결과와 합성곱한 뒤 이동한 결과가 정확히 같다는 것이 등변성이다._

## 문제
왼쪽 경우부터 본다. 이동된 신호 $S_kx$에 합성곱을 적용한 식을 정의대로 그대로 풀어쓴다. $(S_kx)[n-m]$은 이동연산자의 정의에서 $n$ 자리에 $n-m$을 넣은 것이므로 $x[(n-m)-k]$가 된다. 따라서 $(f*(S_kx))[n] = \sum_mf[m]\,$==빈칸==이다.

## 해설
이동연산자의 정의 $(S_kx)[i]=x[i-k]$에서 $i$ 자리에 $n-m$을 그대로 대입한 결과다. $(n-m)-k$를 풀어 쓰면 $n-m-k$가 되고 이것이 합 안에서 $x$의 인자로 남는다.

**정답: $x[n-m-k]$**

## 예시
등변성이 정말 성립하는지 추상적 증명 전에 짧은 신호로 직접 확인해봅니다.

신호를 $x=(1,2,3,0,0)$로 두고 인덱스 범위 밖은 전부 0으로 채웁니다. 3탭 필터는 $f[0]=1$, $f[1]=0$, $f[2]=-1$로 둡니다. 그러면 $(f*x)[n]=x[n]-x[n-2]$입니다.
$$y[n]=x[n]-x[n-2]$$
$n=0$부터 $6$까지 차례로 계산하면 $y=(1,2,2,-2,-3,0,0)$입니다. 예를 들어 $y[2]=x[2]-x[0]=3-1=2$이고 $y[4]=x[4]-x[2]=0-3=-3$입니다.

이번에는 신호를 오른쪽으로 한 칸 이동시킵니다. $x_1[n]=x[n-1]$이라 하면 $x_1=(0,1,2,3,0,0,0)$입니다. 이 이동된 신호에 같은 필터를 적용합니다.
$$z[n]=x_1[n]-x_1[n-2]$$
계산하면 $z=(0,1,2,2,-2,-3,0)$입니다. 예를 들어 $z[3]=x_1[3]-x_1[1]=3-1=2$이고 $z[4]=x_1[4]-x_1[2]=0-2=-2$입니다.

이제 원래 결과 $y$를 그대로 한 칸 이동시킨 $S_1y$와 비교합니다. $S_1y[n]=y[n-1]$이므로 $S_1y=(0,1,2,2,-2,-3,0)$입니다. $z$와 성분마다 정확히 일치합니다.

먼저 이동한 뒤 합성곱한 결과와 먼저 합성곱한 뒤 이동한 결과가 완전히 같았습니다. 아래 증명은 이 일치가 이 특정 신호와 $k=1$만의 우연이 아니라 임의의 신호와 임의의 이동량 $k$에서 항상 성립함을 보입니다.
