---
slug: typical-set-aep
theme: INFO
domainLabel: 정보이론
subLabel: 엔트로피 · 손실
title: 전형집합과 점근균등분배성질(AEP)
related: 
---

## 도입
동전을 100만 번 던진 결과는 $2^{1{,}000{,}000}$가지나 있지만, 실제로 나올 법한 결과들은 그중 아주 작은 한 덩어리에 몰려 있습니다. 이 "그럴듯한 결과들의 집합"이 전형집합이고, 그 집합에 확률질량 거의 전부가 몰린다는 것이 점근균등분배성질(AEP)입니다. 이는 정보이론 버전의 대수의 법칙입니다.

## 명제
$X_1,\dots,X_n$이 유한알파벳 $\mathcal X$ 위의 분포 $p$에서 독립동일분포로 뽑혔고 $H(X)=-\sum_x p(x)\log p(x)$라 하자. 전형집합을 $$A_\varepsilon^{(n)}=\Big\{x^n\in\mathcal X^n : \Big|-\tfrac1n\log p(x^n)-H(X)\Big|\le\varepsilon\Big\}$$ 로 정의하면, 임의의 $\varepsilon>0$에 대해 (1) $\Pr(X^n\in A_\varepsilon^{(n)})\to1$ ($n\to\infty$), (2) 충분히 큰 $n$에서 $(1-\varepsilon)2^{n(H(X)-\varepsilon)}\le|A_\varepsilon^{(n)}|\le2^{n(H(X)+\varepsilon)}$ 이 성립한다.

## 그림
<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="440" height="180" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="40" y="40" font-size="11" class="dg-dim">전체 결과공간 X ⁿ: 2ⁿ 가지</text>
<circle cx="230" cy="130" r="70" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<text x="185" y="125" font-size="12">전형집합 Aₑ⁽ⁿ⁾</text>
<text x="185" y="142" font-size="10" class="dg-dim">크기 ≈ 2^(nH(X))</text>
<circle cx="90" cy="60" r="2.5" class="dg-line"/>
<circle cx="130" cy="45" r="2.5" class="dg-line"/>
<circle cx="400" cy="55" r="2.5" class="dg-line"/>
<circle cx="420" cy="170" r="2.5" class="dg-line"/>
<circle cx="70" cy="160" r="2.5" class="dg-line"/>
<text x="330" y="30" font-size="10" class="dg-dim">비전형 결과: 확률질량 ≈0</text>
<text x="200" y="195" font-size="11">확률질량 대부분(1−ε 이상)이 전형집합 안에 몰려 있다</text>
</svg>

_가능한 결과는 지수적으로 많지만 확률질량은 크기 2ⁿᴴ의 작은 전형집합에 집중된다._

## 문제
대수의 법칙(WLLN)을 $Y_i$들의 평균에 적용하면, 표본평균 $-\tfrac1n\log p(X^n)=\tfrac1n\sum_{i=1}^n Y_i$은 $n\to\infty$일 때 확률수렴으로 $-\tfrac1n\log p(X^n)\ \xrightarrow{p}\ $==빈칸== 로 수렴한다.

## 해설
$Y_i=-\log p(X_i)$의 기댓값이 정확히 $H(X)$이므로, 대수의 법칙에 의해 표본평균이 그 기댓값 $H(X)$로 확률수렴해요.

**정답: $H(X)$**

## 예시
$p=\mathrm{Bernoulli}(0.2)$이면 $H(X)=-0.2\log_2 0.2-0.8\log_2 0.8\approx0.7219$비트이다. $\varepsilon=0.05$로 놓고 $n$을 늘려가며 실제로 $\Pr(A_\varepsilon^{(n)})$을 시뮬레이션(각 $n$당 10만 회 시행)하면

$n=20$: $0.218$, $n=100$: $0.466$, $n=500$: $0.837$, $n=2000$: $0.995$

로 $1$에 수렴해간다. 또한 $n=20$에서 전형집합의 정확한 크기를 조합으로 세어보면 $|A_{0.05}^{(20)}|=4845$인데, 상한 $2^{20(0.7219+0.05)}\approx44409$는 실제로 만족되는 것을 확인할 수 있다($4845\le44409$).
