---
slug: shannon-channel-capacity
theme: INFO2
domainLabel: 정보이론 심화
subLabel: 레이트-왜곡 · 채널용량
title: 섀넌의 채널용량 정리
related: 
---

## 도입
통신선에 잡음이 섞여 들어오면 아무리 좋은 부호를 써도 오류를 완전히 없앨 수는 없을 것 같습니다. 그런데 섀넌은 그렇지 않다고 말합니다. 잡음이 있어도 전송률이 어떤 문턱값 아래이기만 하면 오류확률을 원하는 만큼 $0$에 가깝게 만드는 부호가 반드시 존재한다는 거예요. 문제는 그 문턱값이 왜 하필 상호정보량의 최댓값 $C=\max_{p(x)} I(X;Y)$인가 하는 것입니다.

## 명제
이산 무기억 채널 $(\mathcal{X}, p(y|x), \mathcal{Y})$의 용량을 $C = \max_{p(x)} I(X;Y)$라 하자. 전송률 $R$인 부호열 $(2^{nR}, n)$의 오류확률 $P_e^{(n)}$이 $n\to\infty$일 때 $0$으로 수렴한다면 $R \le C$이다.

## 그림
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="70" cy="100" r="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="70" y="105" font-size="14" text-anchor="middle">X</text>
<line x1="100" y1="100" x2="200" y2="100" class="dg-line" stroke-width="1.5"/>
<polygon points="200,100 188,94 188,106" class="dg-stroke-ink"/>
<rect x="210" y="65" width="140" height="70" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<text x="280" y="95" font-size="11" text-anchor="middle">잡음채널</text>
<text x="280" y="112" font-size="11" text-anchor="middle">p(y|x)</text>
<line x1="350" y1="100" x2="450" y2="100" class="dg-line" stroke-width="1.5"/>
<polygon points="450,100 438,94 438,106" class="dg-stroke-ink"/>
<circle cx="490" cy="100" r="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="490" y="105" font-size="14" text-anchor="middle">Y</text>
<text x="140" y="80" font-size="10" class="dg-dim">전송률 R</text>
<text x="180" y="30" font-size="12">R ≤ C = max_p(x) I(X;Y)</text>
<text x="180" y="175" font-size="11" class="dg-dim">R &gt; C: 오류확률이 0으로 갈 수 없음</text>
</svg>

_잡음 채널을 지나는 정보의 최대 전송률이 상호정보량의 최댓값, 즉 채널용량이다._

## 문제
$W$가 $2^{nR}$개 값 위에서 균등분포이므로 $H(W) = nR$이다. 엔트로피와 상호정보량의 관계로 $nR = H(W) = H(W|Y^n) + ($==빈칸==$)$ 로 쓸 수 있다.

## 해설
엔트로피는 항상 조건부엔트로피와 상호정보량의 합으로 쪼개져요 ($H(W)=H(W|Y^n)+I(W;Y^n)$). 여기서는 그 항등식을 그대로 적용한 것뿐입니다.

**정답: $I(W;Y^n)$**

## 예시
추상적인 부등식에 들어가기 전에 가장 단순한 채널로 감을 잡아봅니다.

이진대칭채널(BSC)에서 비트가 뒤집힐 확률이 $p=0.1$이라고 합시다. 이 채널의 용량은 $C = 1 - H_b(0.1)$이고, $H_b(0.1) = -0.1\log_2 0.1 - 0.9\log_2 0.9 \approx 0.469$ 비트이므로 $C\approx 0.531$ 비트/사용입니다.
$$C = 1 - H_b(0.1) \approx 1 - 0.469 = 0.531 \text{ bits}$$
이 말은, 전송률을 $R=0.5$ 비트/사용으로 잡으면 오류확률을 원하는 만큼 $0$에 가깝게 만드는 부호가 존재하지만, $R=0.6$처럼 $C$를 넘겨버리면 부호를 아무리 정교하게 짜도 오류확률이 어떤 양수 아래로는 절대 내려가지 않는다는 뜻입니다. 아래 증명은 후자, 즉 $R>C$가 왜 불가능한지(역정리)를 보입니다.
