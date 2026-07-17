---
slug: mutual-information-feature-selection
theme: INFO
domainLabel: 정보이론
subLabel: 발산 · 상호정보
title: 상호정보량의 비음성과 특징 선택
related: 
---

## 도입
특징 선택에서는 목표변수 $Y$와 상호정보량 $I(X;Y)$가 큰 특징 $X$를 고릅니다. 이 값이 항상 0 이상이고 오직 독립일 때만 0이 된다는 사실 덕분에, 상호정보량이 큰 특징일수록 실제로 유용한 정보를 담고 있다고 믿을 수 있습니다. kl-divergence에서 이미 증명한 KL발산의 비음성을 그대로 재사용하면 이 사실이 바로 따라 나옵니다.

## 명제
$I(X;Y) = H(Y) - H(Y|X) \ge 0$ 이며 등호는 $X,Y$가 서로 독립일 때만 성립한다.

## 그림
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="180" cy="100" r="70" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
  <circle cx="260" cy="100" r="70" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="5,3" />
  <text x="140" y="70" font-size="12">H(X)</text>
  <text x="290" y="70" font-size="12">H(Y)</text>
  <text x="210" y="105" class="dg-dim" font-size="11">I(X;Y)=0.278</text>
  <text x="130" y="180" font-size="11" class="dg-dim">H(Y|X)=0.722 (겹치지 않는 Y 영역)</text>
</svg>

_두 원의 겹친 영역이 상호정보량이며, X를 알아도 남는 불확실성이 H(Y|X)다._

## 문제
이 정의를 그대로 풀어봅니다. 로그 안 분수의 분자 $p(x,y)$를 $p(x)p(y|x)$로 바꿔 쓰면 분모의 $p(x)$와 약분되어 조건부확률만 남습니다.

$\log\dfrac{p(x,y)}{p(x)p(y)} = \log\dfrac{p(y|x)}{p(y)} = \log p(y|x) - $==빈칸== 이다.

## 해설
로그 나눗셈은 뺄셈으로 바뀌므로 $\log(p(y|x)/p(y))=\log p(y|x)-\log p(y)$입니다.

**정답: $\log p(y)$**

## 예시
상호정보량이 0 이상이라는 명제를 작은 결합분포로 확인해봅니다. 로그는 밑을 2로 사용합니다.

특징 $X$와 목표 $Y$가 모두 이진값이고 결합분포가 $p(0,0)=0.4$ $p(0,1)=0.1$ $p(1,0)=0.1$ $p(1,1)=0.4$라 하겠습니다. 두 변수는 뚜렷하게 얽혀 있습니다.

주변분포는 $p(y=0)=p(y=1)=0.5$이므로 $H(Y)=1$입니다.
$$H(Y|X=0)=-0.8\log_2 0.8-0.2\log_2 0.2\approx0.722$$
$X=1$일 때도 대칭이라 같은 값이 나오므로 $H(Y|X)=0.722$입니다.
$$I(X;Y)=H(Y)-H(Y|X)=1-0.722=0.278$$
$X$를 알고 나면 $Y$에 대한 불확실성이 $1$비트에서 $0.722$비트로 줄어들었고 그 차이 $0.278$비트가 바로 상호정보량입니다. 이 값이 특징 선택에서 $X$가 $Y$를 예측하는 데 실제로 쓸모가 있다는 신호입니다.

아래 증명은 이 값이 항상 0 이상이며 오직 $X,Y$가 독립일 때만 0이 된다는 사실을 KL발산의 비음성으로 보입니다.
