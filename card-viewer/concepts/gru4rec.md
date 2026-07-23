---
slug: gru4rec
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 세션 기반 추천
title: GRU4Rec: RNN으로 세션 안의 클릭 순서를 학습하기
related: 세션 기반 추천 · Next-item Prediction
---

## 도입
GRU 셀은 매 시점 입력 $x_t$와 이전 은닉 상태 $h_{t-1}$을 받아 새 은닉 상태 $h_t$를 만든다. 입력 $x_t$는 직전에 클릭한 아이템의 임베딩이다. 업데이트 게이트 $z_t = \sigma(W_z x_t + U_z h_{t-1})$는 새 후보 상태를 얼마나 반영해 이전 상태를 대체할지, 리셋 게이트 $r_t = \sigma(W_r x_t + U_r h_{t-1})$는 후보 상태를 계산할 때 이전 상태를 얼마나 무시할지를 정한다. 후보 상태는 $\tilde h_t = \tanh(W x_t + U(r_t \odot h_{t-1}))$로 계산하고 최종 은닉 상태는 $h_t = (1 - z_t)\odot h_{t-1} + z_t \odot \tilde h_t$로 두 상태를 게이트 비율만큼 섞는다. 이 은닉 상태가 지금까지의 클릭 순서를 압축한 세션 표현이다.

출력층은 은닉 상태 $h_t$를 카탈로그 전체 아이템에 대한 점수로 변환하고 점수가 가장 높은 아이템들을 다음 클릭 후보로 내놓는다. 아이템 수가 수만에서 수백만 개에 이르기 때문에 매 스텝 전체 카탈로그에 대해 손실을 계산하는 대신 미니배치 안의 다른 세션이 클릭한 아이템을 부정 샘플로 활용하는 샘플링 방식을 쓴다. 손실함수로는 BPR 계열의 페어와이즈 순위 손실이나 TOP1처럼 정답 아이템 점수를 부정 샘플보다 높이는 방향의 손실을 사용한다.

학습 효율을 위해 GRU4Rec은 세션 여러 개를 같은 미니배치 안에서 나란히 흘려보내다가 짧은 세션이 끝나면 그 자리를 새 세션으로 바로 채우는 세션 병렬 미니배치 기법을 쓴다. 세션 길이가 제각각이라 패딩을 많이 넣어야 하는 일반적인 RNN 배치 방식보다 계산 낭비가 훨씬 적다.

## 명제


## 그림
<svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="55" width="70" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="75" y="85" text-anchor="middle" font-size="12">GRU</text>
<text x="75" y="45" text-anchor="middle" font-size="11" class="dg-dim">x = A</text>
<line x1="110" y1="80" x2="170" y2="80" class="dg-line" stroke-width="1.5"/>
<text x="140" y="73" text-anchor="middle" font-size="10" class="dg-dim">h1</text>
<rect x="170" y="55" width="70" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="205" y="85" text-anchor="middle" font-size="12">GRU</text>
<text x="205" y="45" text-anchor="middle" font-size="11" class="dg-dim">x = B</text>
<line x1="240" y1="80" x2="300" y2="80" class="dg-line" stroke-width="1.5"/>
<text x="270" y="73" text-anchor="middle" font-size="10" class="dg-dim">h2</text>
<rect x="300" y="55" width="70" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="335" y="85" text-anchor="middle" font-size="12">GRU</text>
<text x="335" y="45" text-anchor="middle" font-size="11" class="dg-dim">x = C</text>
<line x1="370" y1="80" x2="430" y2="80" class="dg-line" stroke-width="1.5"/>
<text x="400" y="73" text-anchor="middle" font-size="10" class="dg-dim">h3</text>
<rect x="430" y="55" width="150" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="505" y="78" text-anchor="middle" font-size="12">전체 아이템 점수</text>
<text x="505" y="94" text-anchor="middle" font-size="11" class="dg-dim">다음 클릭 = D 확률 최대</text>
</svg>

_은닉 상태가 클릭 순서를 누적하며 매 시점 다음 아이템 점수를 계산한다._

## 문제
먼저 일반 RNN에서 $\tanh$의 미분 공식 $\tanh'(x) = 1-\tanh^2(x)$과 연쇄법칙을 적용하면, $\dfrac{\partial h_t^{\mathrm{RNN}}}{\partial h_{t-1}}$은 ==빈칸== 이다.

## 해설
$h_t^{\mathrm{RNN}}=\tanh(Wx_t+Uh_{t-1})$을 $h_{t-1}$로 미분하면 바깥의 tanh 미분과 안쪽 $U$가 연쇄법칙으로 곱해진 형태가 나와요.

**정답: $\mathrm{diag}\big(1-(h_t^{\mathrm{RNN}})^2\big)\,U$**

## 예시

