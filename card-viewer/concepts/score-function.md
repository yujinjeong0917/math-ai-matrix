---
slug: score-function
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 미분 · 그래디언트
title: 스코어 함수와 정규화 상수 무관성
related: 
---

## 도입
확률밀도의 로그를 입력으로 미분한 $\nabla_x\log p(x)$를 스코어 함수라 부릅니다. 확산모델이나 에너지 기반 모델은 바로 이 스코어를 신경망으로 근사하도록 학습됩니다. 그런데 확률밀도 $p(x)$를 정확히 알려면 보통 계산하기 아주 어려운 정규화 상수까지 필요합니다. 스코어 함수는 이 정규화 상수를 아예 몰라도 계산할 수 있습니다. 왜 그런지 직접 확인해 봅니다.

## 명제
$p(x)=\tilde p(x)/Z$ ($Z=\int\tilde p(x')dx'$, $x$와 무관한 상수)이면 $\nabla_x\log p(x) = \nabla_x\log\tilde p(x)$ 이다.

## 그림
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="200" cy="150" rx="150" ry="100" fill="none" class="dg-line" stroke-width="1.5"/>
<ellipse cx="200" cy="150" rx="100" ry="65" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<ellipse cx="200" cy="150" rx="50" ry="32" fill="none" class="dg-line" stroke-width="1.5"/>
<circle cx="200" cy="150" r="3" class="dg-accent"/>
<line x1="70" y1="70" x2="120" y2="105" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="120,105 108,102 113,113" class="dg-stroke-accent"/>
<line x1="330" y1="70" x2="278" y2="105" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="278,105 288,100 285,111" class="dg-stroke-accent"/>
<line x1="330" y1="230" x2="278" y2="195" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="278,195 288,198 285,187" class="dg-stroke-accent"/>
<line x1="70" y1="230" x2="120" y2="195" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="120,195 108,197 112,187" class="dg-stroke-accent"/>
<line x1="200" y1="30" x2="200" y2="75" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="200,75 195,64 205,64" class="dg-stroke-accent"/>
<line x1="200" y1="270" x2="200" y2="225" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="200,225 195,236 205,236" class="dg-stroke-accent"/>
<text x="205" y="145" font-size="11">밀도 최고점</text>
<text x="25" y="280" class="dg-dim" font-size="12">화살표: ∇log p(x), 정규화 상수와 무관하게 밀도가 높은 중심을 향함</text>
</svg>

_데이터 분포 위 여러 점에서 ∇log p(x)는 밀도가 높은 쪽을 가리키는 벡터장을 이룬다._

## 문제
먼저 $\log p(x)$를 두 조각으로 쪼개는 것이 다음 목표다. 로그는 나눗셈을 뺄셈으로 바꾸는 성질이 있다. 이 성질을 그대로 적용하면 $\log p(x) = \log\dfrac{\tilde p(x)}{Z} = $==빈칸== 이다.

## 해설
$\log(a/b)=\log a-\log b$라는 로그의 기본 성질을 그대로 적용한 결과다. 분수 하나가 뺄셈 두 항으로 갈라진다.

**정답: $\log\tilde p(x) - \log Z$**

## 예시
증명에 들어가기 전에 정규화 상수를 실제로 계산해보고, 그 값이 스코어 함수 계산에 정말 등장하지 않는지 직접 확인해봅니다.

표준정규분포의 비정규화 밀도 $\tilde p(x)=\exp(-x^2/2)$를 씁니다. 진짜 정규화 상수는 $Z=\sqrt{2\pi}\approx2.5066$입니다.

$x=2$에서 비정규화 밀도만으로 스코어를 구하면 다음과 같습니다.
$$\log\tilde p(x)=-\frac{x^2}{2},\qquad \nabla_x\log\tilde p(2)=-2$$
이번엔 진짜 밀도 $p(x)=\tilde p(x)/Z$로 같은 스코어를 구해봅니다. $\log p(x)=-x^2/2-\log Z$이고 $\log Z\approx0.9189$라는 구체적인 숫자가 붙지만, 이 항은 $x$와 무관한 상수라 미분하면 그대로 사라집니다.
$$\nabla_x\log p(2)=-2-0=-2$$
$Z$의 값이 $2.5066$이든 다른 어떤 값이든 상관없이 두 계산 모두 $-2$로 똑같이 나옵니다.

아래 증명은 이 소거가 가우시안 하나만의 특별한 사정이 아니라 $Z$가 $x$와 무관한 상수이기만 하면 항상 일어나는 일임을 보입니다.
