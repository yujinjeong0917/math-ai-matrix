---
slug: flash-attention-io-complexity
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 수치적 안정성
title: FlashAttention: 어텐션을 타일 단위로 계산하면 왜 메모리와 오차가 함께 줄어드는가
related: KV Cache: 자기회귀 생성의 재계산 제거 · PagedAttention: KV 캐시를 페이지 단위로 관리하기 · 어텐션의 스케일링
---

## 도입
표준 셀프어텐션은 한 쿼리에 대한 점수 $n$개를 전부 모아 $QK^\top$이라는 $n\times n$ 행렬을 통째로 만들고 나서야 소프트맥스를 씌웁니다. 시퀀스 길이 $n$이 커지면 이 점수 행렬을 저장하는 메모리가 $O(n^2)$로 불어나 GPU 메모리를 빠르게 잡아먹습니다. FlashAttention은 점수를 한꺼번에 모으지 않고 키와 값을 작은 블록으로 쪼개 순서대로 훑으면서 그때그때 필요한 통계만 갱신합니다. 그런데 소프트맥스는 분모에 모든 점수의 지수합이 들어가기 때문에 언뜻 보면 전체를 다 봐야만 정확한 값을 낼 수 있을 것 같습니다. 실제로는 지금까지 본 최댓값과 지수합, 가중합 세 가지만 들고 있으면 새 블록이 들어올 때마다 이 값들을 정확히 갱신할 수 있어서 전체를 한 번에 모아 계산한 것과 완전히 같은 결과를 얻습니다.

## 명제
점수를 블록 단위로 순서대로 처리하면서 매 단계마다 지금까지의 최댓값, 지수합, 값의 가중합을 앞서 정의한 방식으로 갱신하면 마지막에 얻는 가중합을 지수합으로 나눈 값은 전체 점수를 한 번에 모아 계산한 소프트맥스 가중평균과 정확히 같다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="30" width="130" height="90" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="40" y="24" font-size="11" class="dg-dim">HBM (큰 저장소, 느림)</text>
<text x="45" y="55" font-size="10">Q, K, V 전체</text>
<text x="45" y="75" font-size="10">(n×d, 메모리에 상주)</text>
<line x1="160" y1="75" x2="220" y2="75" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="220,75 208,69 208,81" class="dg-stroke-accent"/>
<text x="165" y="65" font-size="9" class="dg-dim">블록 단위 로드</text>
<rect x="230" y="30" width="130" height="90" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<text x="240" y="24" font-size="11" class="dg-dim">SRAM (작은 캐시, 빠름)</text>
<text x="245" y="55" font-size="10">K,V 타일 1개</text>
<text x="245" y="75" font-size="10">m, ℓ, O 누적값 갱신</text>
<line x1="200" y1="120" x2="200" y2="150" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<text x="80" y="150" font-size="10">타일마다 SRAM에서 최댓값·지수합·가중합을 갱신</text>
<text x="80" y="170" font-size="10">n×n 점수행렬 전체를 HBM에 올리지 않음 → O(n) 메모리</text>
<rect x="60" y="185" width="24" height="24" class="dg-accent"/>
<rect x="90" y="185" width="24" height="24" class="dg-stroke-ink" fill="none" stroke-width="1.5"/>
<rect x="120" y="185" width="24" height="24" class="dg-stroke-accent" fill="none" stroke-width="1.5" stroke-dasharray="3,2"/>
<text x="150" y="202" font-size="9" class="dg-dim">타일 순서대로 처리되는 점수행렬 블록</text>
</svg>

_전체 점수행렬을 한 번에 올리지 않고 SRAM과 HBM 사이를 타일 단위로 오가며 계산한다._

## 문제
문제는 $\ell$과 $\hat\ell$이 서로 다른 기준값인 $m$과 $\hat m$으로 지수를 취해둔 값이라 그냥 더할 수 없다는 점입니다. 두 값을 같은 기준 $m'$으로 맞춰야 더해도 되는 합이 됩니다. $S$에 속한 각 항에 대해 $e^{s_j-m'}=e^{s_j-m}\cdot e^{m-m'}$로 지수법칙에 따라 분해할 수 있고 $e^{m-m'}$은 $j$와 무관한 공통 인수이므로 합 기호 밖으로 뺄 수 있습니다. 그러니 기존에 들고 있던 $\ell$을 새 기준으로 옮긴 값은 $\sum_{j\in S} e^{s_j-m'} = $==빈칸== 입니다.

## 해설
$e^{s_j-m'}=e^{s_j-m}e^{m-m'}$로 분해되고 $e^{m-m'}$이 모든 항에서 똑같으므로 합 기호 밖으로 뺄 수 있습니다. 남은 $\sum_{j\in S} e^{s_j-m}$이 바로 정의상 $\ell$입니다.

**정답: $e^{m-m'}\ell$**

## 예시
점수 네 개 $s_1=1,s_2=3,s_3=2,s_4=0$과 그에 대응하는 값 $v_1=1,v_2=2,v_3=3,v_4=0$을 두 개의 타일 $\{s_1,s_2\}$, $\{s_3,s_4\}$로 나눠 처리해봅니다.

**타일1.** 국소 최댓값은 $\hat m_1=\max(1,3)=3$입니다. $\exp(1-3)\approx0.1353$이고 $\exp(3-3)=1$이므로 국소 지수합은 $\hat\ell_1=1.1353$이고 국소 가중합은 $\hat O_1=0.1353\times1+1\times2=2.1353$입니다. 아직 이전에 처리한 타일이 없으므로 이 값이 그대로 전역 통계가 됩니다. $m=3$, $\ell=1.1353$, $O=2.1353$입니다.

**타일2.** 국소 최댓값은 $\hat m_2=\max(2,0)=2$입니다. $\exp(2-2)=1$이고 $\exp(0-2)\approx0.1353$이므로 국소 지수합은 $\hat\ell_2=1.1353$이고 국소 가중합은 $\hat O_2=1\times3+0.1353\times0=3$입니다.

새 전역 최댓값은 $m'=\max(3,2)=3$으로 이전과 같습니다. 이전 통계의 보정계수는 $e^{m-m'}=e^0=1$이라 그대로 남고 타일2의 보정계수는 $e^{\hat m_2-m'}=e^{-1}\approx0.3679$입니다.
$$\ell'=1\times1.1353+0.3679\times1.1353\approx1.1353+0.4177=1.5530$$
$$O'=1\times2.1353+0.3679\times3\approx2.1353+1.1036=3.2389$$
최종 출력은 $O'/\ell'\approx3.2389/1.5530\approx2.0856$입니다.

검산 삼아 네 점수를 한 번에 모아 직접 계산해봅니다. 최댓값은 $3$이고 $\exp(1-3),\exp(3-3),\exp(2-3),\exp(0-3)$은 각각 $0.1353,1,0.3679,0.0498$이라 합은 $1.5530$입니다. 가중합은 $0.1353\times1+1\times2+0.3679\times3+0.0498\times0\approx3.2390$이고 $3.2390/1.5530\approx2.0856$으로 나눈 값도 똑같습니다.

아래 증명은 이 일치가 이 숫자들만의 우연이 아니라 임의의 점수와 임의의 타일 나누기에서 항상 성립하는 사실임을 보입니다.
