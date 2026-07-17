---
slug: gradient-descent
theme: CALC
domainLabel: 미적분 · 최적화
subLabel: 경사기반 옵티마이저
title: 경사하강법의 하강 보장
related: 
---

## 도입
경사하강법은 딥러닝 학습에서 가장 기본적인 방법이에요. 매 스텝마다 기울기가 가리키는 반대 방향으로 조금씩 움직여서 손실을 줄여요. 그런데 그 걸음 폭인 학습률이 너무 크면 오히려 손실이 늘어날 수도 있어요. 여기서는 걸음 폭이 충분히 작으면 손실이 실제로 줄어든다는 걸 확인합니다. 도구는 함수를 근사하는 표준 방법인 테일러 근사예요.

## 명제
$\nabla L$이 립시츠 상수 $K$로 립시츠 연속(그래디언트가 갑자기 확 튀지 않고, $K$ 이상의 속도로는 변하지 않는다는 뜻)이면, $\eta<1/K$일 때 $\theta'=\theta-\eta\nabla L(\theta)$는 $L(\theta')\le L(\theta)$를 만족한다.

## 그림
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="210" cy="160" rx="175" ry="115" fill="none" class="dg-line" stroke-width="1.5"/>
<ellipse cx="210" cy="160" rx="135" ry="88" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="6,3"/>
<ellipse cx="210" cy="160" rx="95" ry="61" fill="none" class="dg-line" stroke-width="1.5"/>
<ellipse cx="210" cy="160" rx="55" ry="34" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="6,3"/>
<circle cx="210" cy="160" r="3" class="dg-accent"/>
<path d="M50,50 L100,88 L145,130 L178,150 L200,158" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<circle cx="50" cy="50" r="4" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<circle cx="100" cy="88" r="3" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="145" cy="130" r="3" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<circle cx="178" cy="150" r="3" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="200,158 188,151 190,162" class="dg-stroke-accent"/>
<text x="20" y="38" font-size="12">θ₀ (시작점)</text>
<text x="215" y="150" font-size="12">최소점</text>
<text x="45" y="270" class="dg-dim" font-size="12">등고선: 손실함수 L(θ)의 레벨셋</text>
</svg>

_손실 등고선 위에서 경사하강법이 내리막 방향으로 스텝을 밟아 최소점에 수렴한다._

## 문제
이제 이 상한식 안의 $\theta'-\theta$ 자리에, 우리가 실제로 쓰는 경사하강법의 갱신식 $\theta'=\theta-\eta\nabla L(\theta)$을 대입할 차례다. 이항만 하면 $\theta'-\theta = $==빈칸== 이다.

## 해설
갱신식을 그대로 옮겨 적으면 나오는 식이에요. 별도의 계산이 필요 없어요.

**정답: $-\eta\nabla L(\theta)$**

## 예시
증명에 들어가기 전에 간단한 손실함수 하나로 실제 스텝을 밟아보면 부등식이 왜 성립하는지 바로 감이 옵니다.

손실함수를 $L(\theta)=\theta^2$ 로 둡니다. 그래디언트는 $\nabla L(\theta)=2\theta$ 이고 이 그래디언트는 $K=2$로 립시츠 연속입니다. 학습률 조건 $\eta<1/K$는 $\eta<0.5$를 뜻합니다.

$\theta=3$에서 시작해서 $\eta=0.2$로 한 스텝 밟아봅니다. 그래디언트는 $\nabla L(3)=6$이고 갱신식은 다음과 같습니다.
$$\theta'=3-0.2\times6=1.8$$
손실값을 비교하면 $L(3)=9$이고 $L(1.8)=3.24$입니다. 실제로 손실이 $5.76$만큼 줄었습니다.

증명에서 얻는 2차 상한식도 이 숫자와 정확히 맞아떨어집니다. $\frac{K\eta}{2}=0.2$이므로 $1-\frac{K\eta}{2}=0.8$이고, 상한식이 예측하는 감소량은 $\eta\left(1-\frac{K\eta}{2}\right)\|\nabla L(3)\|^2=0.2\times0.8\times36=5.76$입니다. 함수가 정확히 이차식이라 상한식이 등호로 딱 맞습니다.

아래 증명은 이 감소가 이 함수 하나만의 우연이 아니라 립시츠 조건과 작은 학습률만 있으면 항상 성립하는 사실임을 보입니다.
