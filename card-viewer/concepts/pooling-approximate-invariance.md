---
slug: pooling-approximate-invariance
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 기하 · 측도
title: 풀링의 근사적 이동불변성과 합성곱의 정확한 등변성 비교
related: Tangent Prop과 매니폴드 접선 불변성
---

## 도입
합성곱은 입력이 이동하면 출력도 정확히 같은 만큼 이동하는 "등변성(equivariance)"을 모든 이동량에 대해 정확하게 만족합니다. 반면 맥스풀링 같은 연산은 그 위에 얹혀서 "작은" 이동에 대해서는 출력이 거의 바뀌지 않는 "근사적 불변성"을 주지만, 이동량이 어떤 한계(풀링창 안에서 최댓값 위치가 창 경계에서 떨어진 여유, margin)를 넘으면 출력이 바뀔 수 있습니다. 두 성질은 이름은 비슷해 보여도 근본적으로 다릅니다: 하나는 항상 정확하고, 다른 하나는 국소적이고 조건부입니다.

## 명제
(등변성) 필터 $w$에 대한 특징맵 $z[n]=(x*w)[n]=\sum_m w[m]x[n-m]$과 이동된 입력 $x'[n]=x[n-k]$($k\in\mathbb{Z}$)에 대해, 항상 정확히 $z'[n] := (x'*w)[n] = z[n-k]$이다(모든 $k$, 근사 없음). (근사적 불변성) 고정 창 $W=[a,a+p-1]$ 위의 맥스풀링 $y=\max_{n\in W} z[n]$을 생각하고, $z$가 $W$ 안의 유일한 전역 최댓값을 $n^*$에서 가지며(값 $M$), 이동에 의해 참조되는 확장된 범위 안의 다른 모든 값이 $M$보다 작다고 하자. 좌우 여유를 $L=n^*-a,\ R=a+p-1-n^*$라 하면, $|k|\le\min(L,R)$인 모든 이동에 대해 이동된 신호 $z'[n]=z[n-k]$의 같은 창 위 최댓값은 정확히 $M$으로 불변이다. 그러나 $|k|$가 이 여유를 넘으면 최댓값이 바뀔 수 있다 — 즉 풀링의 불변성은 창과 최댓값 위치에 의존하는 근사적/국소적 성질이다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<text x="120" y="18" font-size="12" text-anchor="middle">합성곱: 정확한 등변성 (모든 k)</text>
<rect x="30" y="40" width="180" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="35" y="60" font-size="9">특징맵 z: 0 1 1 3 9 2 1 0</text>
<line x1="120" y1="80" x2="120" y2="105" class="dg-line" stroke-width="1.5"/>
<polygon points="120,105 114,93 126,93" class="dg-stroke-ink"/>
<text x="130" y="95" font-size="9" class="dg-dim">이동 k=1,2,...</text>
<rect x="30" y="115" width="180" height="30" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<text x="35" y="135" font-size="9" class="dg-dim">z' = z를 그대로 k만큼 이동</text>
<text x="30" y="170" font-size="10">항상 정확히 같은 모양이 옮겨갈 뿐 (근사 없음)</text>
<line x1="240" y1="10" x2="240" y2="210" class="dg-line" stroke-width="1"/>
<text x="470" y="18" font-size="12" text-anchor="middle">풀링: 근사적/국소적 불변성 (여유 안에서만)</text>
<rect x="260" y="40" width="180" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="330" y="40" width="30" height="30" class="dg-accent"/>
<text x="265" y="60" font-size="9">창 W: [1,3,9,2], 최댓값 M=9 (n*=2)</text>
<text x="470" y="60" font-size="10" class="dg-dim">여유 min(L,R)=1</text>
<line x1="350" y1="80" x2="350" y2="105" class="dg-line" stroke-width="1.5" stroke-dasharray="3,3"/>
<text x="355" y="95" font-size="9" class="dg-dim">k=1: 최댓값 그대로 9</text>
<rect x="260" y="115" width="180" height="30" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<rect x="290" y="115" width="30" height="30" class="dg-stroke-accent" fill="none" stroke-width="2"/>
<text x="265" y="135" font-size="9" class="dg-dim">k=2: 최댓값 3으로 바뀜</text>
<text x="260" y="170" font-size="10">여유(min(L,R))를 넘으면 불변성이 깨짐</text>
</svg>

_합성곱은 모든 이동에 대해 정확히 등변이지만, 풀링은 여유 안의 작은 이동에서만 근사적으로 불변이다._

## 문제
한편 원래 정의에서 $n$ 대신 $n-k$를 대입하면 $z[n-k] = \sum_m w[m]x[(n-k)-m] = \sum_m w[m]x[n-m-k]$인데, 이는 s1에서 구한 $z'[n]$의 식과 정확히 같은 합이다. 따라서 $z'[n] = $==빈칸== 이다 — 모든 정수 $k$와 모든 $n$에 대해 근사 없이 정확히 성립한다.

## 해설
s1의 z'[n] 식과 이 단계에서 구한 z[n-k]의 식이 합의 항 하나하나까지 동일하기 때문이에요.

**정답: $z[n-k]$**

## 예시
구체적인 특징맵 $z[n]$ (인덱스 $n=-2,\dots,5$)을 생각합니다.
$$n:\ -2,-1,0,1,2,3,4,5 \qquad z[n]:\ 0,1,1,3,9,2,1,0$$
풀링 창을 $W=\{0,1,2,3\}$으로 고정하면 이 창 안의 값은 $[1,3,9,2]$이고 최댓값은 $M=9$ (위치 $n^*=2$)입니다. 왼쪽 여유는 $L=2-0=2$, 오른쪽 여유는 $R=3-2=1$이므로 $\min(L,R)=1$입니다.

이동량 $k=1$ (여유 이내): $z'[n]=z[n-1]$이므로 $z'[0]=z[-1]=1,\ z'[1]=z[0]=1,\ z'[2]=z[1]=3,\ z'[3]=z[2]=9$. 창 $W$ 위 최댓값은 여전히 $9$ — 불변입니다.

이동량 $k=2$ (여유 초과): $z'[0]=z[-2]=0,\ z'[1]=z[-1]=1,\ z'[2]=z[0]=1,\ z'[3]=z[1]=3$. 창 위 최댓값은 이제 $3$으로 바뀝니다 — 근사적 불변성이 깨집니다.

반면 풀링 이전의 특징맵 자체는 등변성에 의해 어떤 $k$에 대해서도 그냥 $z$가 통째로 $k$만큼 이동한 것($z'[n]=z[n-k]$)일 뿐, 값 자체가 임의로 "바뀌는" 것이 아닙니다 — 이 차이가 등변성과 근사적 불변성을 구분하는 핵심입니다.
