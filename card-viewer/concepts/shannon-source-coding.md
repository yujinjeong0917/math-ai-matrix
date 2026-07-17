---
slug: shannon-source-coding
theme: INFO
domainLabel: 정보이론
subLabel: 엔트로피 · 손실
title: 섀넌 소스코딩 정리: 평균 부호길이의 하한
related: 
---

## 도입
정보를 이진 부호로 압축해서 저장하거나 전송할 때, 부호를 아무리 잘 설계해도 평균 부호길이를 엔트로피 밑으로는 줄일 수 없습니다. 이것이 섀넌의 소스코딩 정리입니다. 부호길이가 지켜야 하는 조합적 제약인 Kraft 부등식과, kl-divergence 항목에서 이미 확인한 KL발산의 비음성을 이어붙이면 이 하한이 자연스럽게 따라 나옵니다.

## 명제
임의의 prefix code(순간복호 가능한 이진 부호)의 부호길이 $\ell(x)$에 대해 기대 부호길이 $L=\sum_xp(x)\ell(x)$는 $L\ge H(X)$를 만족한다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="18" font-size="12" class="dg-dim">효율적 부호: 0, 10, 11 (L=1.5=H)</text>
<circle cx="80" cy="40" r="4" class="dg-accent"/>
<line x1="80" y1="40" x2="40" y2="90" class="dg-line" stroke-width="1.5"/>
<text x="55" y="65" font-size="10">0</text>
<circle cx="40" cy="90" r="4" class="dg-accent"/>
<text x="15" y="105" font-size="10">부호 0 (길이1)</text>
<line x1="80" y1="40" x2="120" y2="90" class="dg-line" stroke-width="1.5"/>
<text x="98" y="65" font-size="10">1</text>
<circle cx="120" cy="90" r="4" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<line x1="120" y1="90" x2="90" y2="140" class="dg-line" stroke-width="1.5"/>
<text x="98" y="115" font-size="10">0</text>
<circle cx="90" cy="140" r="4" class="dg-accent"/>
<text x="55" y="160" font-size="10">부호 10 (길이2)</text>
<line x1="120" y1="90" x2="150" y2="140" class="dg-line" stroke-width="1.5"/>
<text x="140" y="115" font-size="10">1</text>
<circle cx="150" cy="140" r="4" class="dg-accent"/>
<text x="140" y="160" font-size="10">부호 11 (길이2)</text>
<line x1="230" y1="10" x2="230" y2="210" class="dg-line" stroke-width="1"/>
<text x="260" y="18" font-size="12" class="dg-dim">비효율적 부호: 모두 길이 2 (L′=2 &gt; H)</text>
<circle cx="290" cy="40" r="4" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<line x1="290" y1="40" x2="260" y2="90" class="dg-line" stroke-width="1.5"/>
<circle cx="260" cy="90" r="4" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<line x1="260" y1="90" x2="240" y2="140" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<circle cx="240" cy="140" r="4" class="dg-accent"/>
<text x="200" y="160" font-size="9" class="dg-dim">00 (길이2)</text>
<line x1="260" y1="90" x2="280" y2="140" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<circle cx="280" cy="140" r="4" class="dg-accent"/>
<text x="255" y="160" font-size="9" class="dg-dim">01 (길이2)</text>
<line x1="290" y1="40" x2="340" y2="90" class="dg-line" stroke-width="1.5"/>
<circle cx="340" cy="90" r="4" class="dg-accent"/>
<text x="320" y="105" font-size="9" class="dg-dim">11 (길이2)</text>
<text x="420" y="60" font-size="12">L = 1.5 bit</text>
<line x1="420" y1="70" x2="500" y2="70" class="dg-stroke-ink" stroke-width="2"/>
<text x="420" y="100" font-size="12">L′ = 2 bit</text>
<line x1="420" y1="110" x2="560" y2="110" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<text x="420" y="140" font-size="11" class="dg-dim">L 하한 = H(X) = 1.5 bit</text>
</svg>

_prefix code의 이진트리에서 기대 부호길이는 엔트로피를 하한으로 갖는다._

## 문제
부호길이들로부터 새로운 확률분포 하나를 만들어봅니다. 왜 이런 분포가 필요한가 하면, KL발산의 비음성이라는 강력한 도구를 쓰려면 비교할 두 번째 분포가 있어야 하기 때문입니다. $q(x) = 2^{-\ell(x)}/K$로 정의합니다.

이렇게 두면 $\sum_xq(x) = $==빈칸== 이다.

## 해설
$\sum_xq(x)=(1/K)\sum_x2^{-\ell(x)}=K/K=1$입니다. 그러니 $q$는 실제로 성립하는 확률분포입니다.

**정답: $1$**

## 예시
평균 부호길이가 엔트로피보다 짧아질 수 없다는 명제를 실제 부호로 확인해봅니다. 로그는 밑을 2로 사용합니다.

세 기호가 $p=(0.5,0.25,0.25)$의 확률로 나오는 소스를 생각합니다.
$$H(X)=-0.5\log_2 0.5-0.25\log_2 0.25-0.25\log_2 0.25=0.5+0.5+0.5=1.5$$
기호마다 길이 $1,2,2$인 prefix code를 씁니다. 예를 들어 $0,10,11$입니다. 기대 부호길이는 $L=0.5\times1+0.25\times2+0.25\times2=1.5$로 엔트로피와 정확히 같습니다.

**비효율적인 부호.** 대신 세 기호 모두에 길이 2를 고정으로 쓰는 부호를 골랐다고 해봅니다. $L'=0.5\times2+0.25\times2+0.25\times2=2$가 되어 엔트로피 $1.5$보다 커집니다.

아무리 잘 설계한 부호도 $1.5$ 밑으로는 내려가지 않고 잘못 설계한 부호는 그 위에서 낭비를 만듭니다. 아래 증명은 Kraft 부등식과 KL발산의 비음성을 이어붙여 이 하한이 항상 성립함을 보입니다.
