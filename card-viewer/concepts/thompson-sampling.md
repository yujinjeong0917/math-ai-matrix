---
slug: thompson-sampling
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 밴딧 기반 추천
title: Thompson Sampling: 사후분포에서 뽑아서 탐색하기
related: Contextual Bandit
---

## 도입
클릭 여부처럼 베르누이 보상을 다룰 때는 팔마다 클릭확률에 대한 사후분포를 베타분포로 관리합니다.
$$\theta_a \sim \mathrm{Beta}(\alpha_a,\beta_a)$$
사전분포를 $\mathrm{Beta}(1,1)$로 시작해서 클릭이 나오면 $\alpha_a$를 하나 늘리고 클릭이 없으면 $\beta_a$를 하나 늘립니다. 베타분포와 베르누이 우도는 켤레 관계라 관측을 반영해도 사후분포는 계속 베타분포 형태를 유지합니다.

매 라운드 모든 팔에서 $\theta_a$를 하나씩 뽑고 그 값을 마치 진짜 클릭률인 것처럼 취급해 가장 큰 팔을 고릅니다. 베타분포의 분산은 대략 $1/(\alpha_a+\beta_a)$ 크기로 관측이 쌓일수록 줄어들기 때문에 탐색량이 증거의 양에 맞춰 자동으로 조절됩니다.

epsilon-greedy의 탐색 확률은 그 팔에 대한 증거가 얼마나 쌓였는지와 무관하게 고정돼 있어서 이미 확실히 나쁜 팔도 계속 같은 비율로 뽑습니다. Thompson Sampling의 탐색은 순전히 분포의 폭에서 나옵니다. 확실히 나쁘다고 판단된 팔은 좁고 낮은 분포를 갖게 되어 자연스럽게 덜 뽑히고 아직 충분히 안 뽑아본 팔만 계속 넓은 분포로 탐색됩니다.

## 명제


## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="200" x2="520" y2="200" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="280" y="225" font-size="12" text-anchor="middle">클릭확률 θ</text>
<path d="M 150,200 C 170,200 175,40 210,40 C 245,40 250,200 270,200" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="210" y="30" font-size="11" text-anchor="middle">팔 A (충분히 시도됨)</text>
<path d="M 60,200 C 150,200 150,110 280,110 C 410,110 410,200 500,200" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="410" y="100" font-size="11" text-anchor="middle">팔 B (거의 안 써봄)</text>
<circle cx="215" cy="70" r="4" class="dg-accent"/>
<text x="215" y="60" font-size="10" text-anchor="middle" class="dg-dim">샘플</text>
<circle cx="450" cy="120" r="4" class="dg-accent"/>
<text x="450" y="140" font-size="10" text-anchor="middle" class="dg-dim">샘플(운좋게 높음)</text>
</svg>

_충분히 시도된 팔은 좁은 분포에서, 아직 덜 써본 팔은 넓은 분포에서 값을 뽑는다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
epsilon-greedy는 이미 나쁘다고 확인된 팔에도 똑같은 확률로 무작위 탐색을 낭비합니다. 증거가 아무리 쌓여도 탐색 비율 자체는 고정돼 있습니다. Thompson Sampling은 각 팔이 얼마나 좋을지에 대한 확률분포를 관리하다가 매 라운드 각 분포에서 값을 하나씩 뽑아 가장 높게 뽑힌 팔을 고릅니다.

증거가 많이 쌓인 팔은 분포가 좁아서 뽑히는 값도 진짜 성능 근처에 몰립니다. 증거가 적은 팔은 분포가 넓어서 어쩌다 높은 값이 뽑히기도 합니다. 그 우연이 바로 그 팔을 한 번 더 시도해보게 만드는 자연스러운 탐색입니다.


## 예시
팔 A가 지금까지 클릭 8번, 무클릭 2번이었다면 사후분포는 $\mathrm{Beta}(1+8,\,1+2)=\mathrm{Beta}(9,3)$이고 평균은 $9/(9+3)=0.75$ 근처에 좁게 몰려 있습니다. 팔 B는 클릭 1번 무클릭 1번뿐이라 사후분포는 $\mathrm{Beta}(2,2)$이고 평균은 $0.5$지만 분산이 훨씬 커서 어떤 라운드에는 $0.75$보다 큰 값이 뽑히기도 합니다. 그 라운드에는 평균은 더 낮아 보이는 팔 B가 선택되면서 탐색이 자연스럽게 일어납니다.
