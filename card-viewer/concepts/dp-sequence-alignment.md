---
slug: dp-sequence-alignment
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 알고리즘 기초
title: 편집거리 DP와 시퀀스 정렬의 최적 부분구조
related: 
---

## 도입
두 시퀀스를 삽입, 삭제, 치환 세 가지 연산만으로 서로 같게 맞추려 할 때 최소한 몇 번의 연산이 필요한지를 편집거리라 부른다. CTC 같은 시퀀스 정렬 문제도 결국 두 시퀀스를 최적으로 맞추는 문제라서 같은 구조를 공유한다.

## 명제
$a=a_1\cdots a_m$, $b=b_1\cdots b_n$의 접두사 $i,j$ 사이의 편집거리 $d(i,j)$는 $d(i,j)=\min\bigl(d(i-1,j)+1,\ d(i,j-1)+1,\ d(i-1,j-1)+\mathrm{cost}(a_i,b_j)\bigr)$ 를 만족한다.

## 그림
<svg viewBox="0 0 380 270" xmlns="http://www.w3.org/2000/svg">
<line x1="110" y1="26" x2="110" y2="236" class="dg-line" stroke-width="1" />
<line x1="152" y1="26" x2="152" y2="236" class="dg-line" stroke-width="1" />
<line x1="194" y1="26" x2="194" y2="236" class="dg-line" stroke-width="1" />
<line x1="236" y1="26" x2="236" y2="236" class="dg-line" stroke-width="1" />
<line x1="278" y1="26" x2="278" y2="236" class="dg-line" stroke-width="1" />
<line x1="320" y1="26" x2="320" y2="236" class="dg-line" stroke-width="1" />
<line x1="110" y1="26" x2="320" y2="26" class="dg-line" stroke-width="1" />
<line x1="110" y1="68" x2="320" y2="68" class="dg-line" stroke-width="1" />
<line x1="110" y1="110" x2="320" y2="110" class="dg-line" stroke-width="1" />
<line x1="110" y1="152" x2="320" y2="152" class="dg-line" stroke-width="1" />
<line x1="110" y1="194" x2="320" y2="194" class="dg-line" stroke-width="1" />
<line x1="110" y1="236" x2="320" y2="236" class="dg-line" stroke-width="1" />
<text x="131" y="18" font-size="11" text-anchor="middle" class="dg-dim">f</text>
<text x="173" y="18" font-size="11" text-anchor="middle" class="dg-dim">o</text>
<text x="215" y="18" font-size="11" text-anchor="middle" class="dg-dim">r</text>
<text x="257" y="18" font-size="11" text-anchor="middle" class="dg-dim">t</text>
<text x="98" y="51" font-size="11" text-anchor="end" class="dg-dim">f</text>
<text x="98" y="93" font-size="11" text-anchor="end" class="dg-dim">o</text>
<text x="98" y="135" font-size="11" text-anchor="end" class="dg-dim">o</text>
<text x="98" y="177" font-size="11" text-anchor="end" class="dg-dim">d</text>
<text x="131" y="51" font-size="12" text-anchor="middle">0</text><text x="173" y="51" font-size="12" text-anchor="middle">1</text><text x="215" y="51" font-size="12" text-anchor="middle">2</text><text x="257" y="51" font-size="12" text-anchor="middle">3</text><text x="299" y="51" font-size="12" text-anchor="middle">4</text>
<text x="131" y="93" font-size="12" text-anchor="middle">1</text><text x="173" y="93" font-size="12" text-anchor="middle">0</text><text x="215" y="93" font-size="12" text-anchor="middle">1</text><text x="257" y="93" font-size="12" text-anchor="middle">2</text><text x="299" y="93" font-size="12" text-anchor="middle">3</text>
<text x="131" y="135" font-size="12" text-anchor="middle">2</text><text x="173" y="135" font-size="12" text-anchor="middle">1</text><text x="215" y="135" font-size="12" text-anchor="middle">0</text><text x="257" y="135" font-size="12" text-anchor="middle">1</text><text x="299" y="135" font-size="12" text-anchor="middle">2</text>
<text x="131" y="177" font-size="12" text-anchor="middle">3</text><text x="173" y="177" font-size="12" text-anchor="middle">2</text><text x="215" y="177" font-size="12" text-anchor="middle">1</text><text x="257" y="177" font-size="12" text-anchor="middle">1</text><text x="299" y="177" font-size="12" text-anchor="middle">2</text>
<text x="131" y="219" font-size="12" text-anchor="middle">4</text><text x="173" y="219" font-size="12" text-anchor="middle">3</text><text x="215" y="219" font-size="12" text-anchor="middle">2</text><text x="257" y="219" font-size="12" text-anchor="middle">2</text><text x="299" y="219" font-size="12" text-anchor="middle">2</text>
<rect x="278" y="194" width="42" height="42" fill="none" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="257" y1="173" x2="292" y2="208" class="dg-stroke-accent" stroke-width="2.5" />
<line x1="299" y1="177" x2="299" y2="208" class="dg-line" stroke-width="1.2" stroke-dasharray="3,3" />
<line x1="261" y1="215" x2="292" y2="215" class="dg-line" stroke-width="1.2" stroke-dasharray="3,3" />
<text x="20" y="255" font-size="11" class="dg-dim">굵은 대각선 = 치환(cost 2, 선택), 점선 = 삭제·삽입(cost 3, 미선택)</text>
</svg>

_d(4,4)는 왼쪽·위·대각선 세 칸 중 최소인 대각선(치환)에서 정해진다._

## 문제
첫째, 마지막 수가 $a_i$를 삭제하는 것이라면 그 앞까지는 $a_1\cdots a_{i-1}$을 $b_1\cdots b_j$로 맞추는 문제여야 한다. 만약 그 앞부분이 최적이 아니라면 더 적은 비용으로 앞부분을 맞추고 마지막에 삭제 한 번을 더해서 전체를 더 싸게 만들 수 있으므로, 전체가 최적이라는 가정과 모순된다. 그러니 앞부분도 최적이어야 한다.

이 경우 전체 비용은 $d(i,j) = $==빈칸== 이다.

## 해설
앞부분을 맞추는 데 최소 비용 $d(i-1,j)$가 들고, 마지막에 삭제 연산 한 번의 비용 1을 더해야 한다. 이보다 싸게 되는 방법이 있다면 그 자체가 $d(i-1,j)$가 최소 비용이라는 정의와 모순이다.

**정답: $d(i-1,j) + 1$**

## 예시
재귀식을 보기 전에 4글자짜리 두 단어의 편집거리를 표 하나에 직접 채워서 확인해본다.

$a=$"food", $b=$"fort"라 하자. 같은 글자면 비용 0, 다르면 삽입 삭제 치환 모두 비용 1로 두고 $d(i,j)$ 표를 채운다.
$$\begin{pmatrix}0&1&2&3&4\\1&0&1&2&3\\2&1&0&1&2\\3&2&1&1&2\\4&3&2&2&2\end{pmatrix}$$
예를 들어 $d(3,3)=1$은 "foo"를 "for"로 바꾸는 데 $o\to r$ 치환 한 번이면 충분하다는 뜻이다. 마지막 글자 $d,t$는 다르므로 $d(4,4)=\min(d(3,4)+1,\ d(4,3)+1,\ d(3,3)+1)=\min(3,3,2)=2$가 된다.

표의 오른쪽 아래 끝 $d(4,4)=2$가 "food"를 "fort"로 바꾸는 최소 연산 횟수다. 실제로 $o\to r$, $d\to t$ 두 번의 치환이면 충분하니 그대로 맞아떨어진다. 아래 증명은 표의 각 칸이 왜 바로 앞 세 칸의 값만으로 채워질 수 있는지를 보인다.
