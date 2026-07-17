---
slug: skipgram-implicit-matrix-factorization
theme: LINALG
domainLabel: 선형대수
subLabel: 벡터 · 행렬 연산
title: Skip-gram과 암묵적 PMI 행렬분해 (Levy & Goldberg)
hook: word2vec의 Skip-gram with Negative Sampling(SGNS)은 신경망처럼 보이지만, 그 학습 목표를 수학적으로 뜯어보면 단어-문맥 쌍의
related: 가중치 공유: 입력 임베딩과 출력 소프트맥스
---

## 기본설명
단어 $w$, 문맥 $c$에 대해 $\#(w,c)$를 말뭉치에서 $(w,c)$ 쌍이 등장한 횟수, $\#(w),\#(c)$를 각각의 전체 등장 횟수, $|D|$를 전체 (단어,문맥) 쌍의 개수라 하자. 음성표본 $k$개를 쓰는 SGNS의 목적함수를 각 $(w,c)$ 쌍에 대한 국소 목적함수로 분해했을 때, 이를 최대화하는 단어벡터·문맥벡터의 내적은 $v_w\cdot v_c = \mathrm{PMI}(w,c) - \log k$ 이다. 즉 SGNS가 학습하는 행렬 $M_{wc}:=v_w\cdot v_c$는 이동된(shifted) PMI 행렬 $\mathrm{PMI}(w,c)-\log k$의 저랭크 분해다.

## 문제
$f$를 $x$에 대해 미분하면 ($\sigma'(x)=\sigma(x)\sigma(-x)$, $\frac{d}{dx}\log\sigma(x)=\sigma(-x)$, $\frac{d}{dx}\log\sigma(-x)=-\sigma(x)$ 를 이용) $f'(x) = \#(w,c)\,\sigma(-x) - k\cdot\#(w)\frac{\#(c)}{|D|}\,$==빈칸== 이다.

## 해설
log σ(-x)를 x로 미분하면 -σ(x)가 나오는데, 앞에 k#(w)#(c)/|D|가 곱해져 있으니 부호가 반영되어 그 계수 뒤에 σ(x)가 곱해져요.

**정답: $\sigma(x)$**

## 예시
말뭉치에서 $\#(w,c)=20$, $\#(w)=50$, $\#(c)=40$, 전체 쌍의 수 $|D|=1000$, 음성표본 개수 $k=5$ 라 하겠습니다.
$$\mathrm{PMI}(w,c)=\log\frac{\#(w,c)|D|}{\#(w)\#(c)}=\log\frac{20\times1000}{50\times40}=\log10\approx2.303$$
따라서 SGNS가 학습해야 하는 최적 내적값은 $$v_w\cdot v_c = \mathrm{PMI}(w,c)-\log k = \log10-\log5=\log2\approx0.693$$ 이고, 실제로 국소 목적함수 $f(x)$를 수치적으로 최적화해도 $x\approx0.693$에서 최댓값을 얻어 이론값과 정확히 일치합니다.
