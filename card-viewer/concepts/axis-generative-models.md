---
slug: axis-generative-models
theme: AXIS
domainLabel: 매트릭스 읽는 법
subLabel: 매트릭스 열 · AI 4갈래
title: 생성모델 — VAE·GAN·Diffusion·Autoregressive(LLM)
related: VAE 인코더가 logσ²를 출력하는 이유 · GAN 목적함수의 최적 판별자 · 확산모델 정방향과정의 닫힌형 주변분포 · 오토리그레시브 생성의 확률 연쇄법칙
---

## 도입
Classical ML·딥러닝·RL은 전부 "데이터를 보고 무언가를 맞히는" 쪽이에요. 정답 레이블을 맞히거나, 다음 행동을 고르거나, 어쨌든 입력에 대응하는 출력 하나를 내놓는 게 목표죠. 생성모델은 반대예요. 데이터가 어떤 확률분포에서 나왔다고 보고, 그 분포 자체를 흉내 내서 그 분포에서 새로운 샘플을 뽑아내는 걸 목표로 해요.

문제는 실제 데이터의 분포가 너무 복잡해서 수식으로 다루기 쉬운 형태가 아니라는 거고, 그래서 이 분포를 다루기 쉬운 형태로 쪼개는 방법이 크게 네 가지로 갈렸어요. VAE는 각 데이터를 잠재변수의 확률분포로 인코딩하고 그 분포에서 다시 디코딩하는 변분추론 기반 접근이라, 분포를 직접 다루되 계산 가능한 하한(ELBO)으로 근사해서 풀어요.

GAN은 아예 다르게 풀어서, 생성자와 판별자가 서로 속고 속이는 게임이론적 구도로 명시적인 분포 수식 없이 암묵적으로 분포를 배워요. Diffusion은 데이터에 노이즈를 서서히 씌웠다가 그 과정을 거꾸로 되돌리는 법을 배우는데, 이 되돌리는 과정을 확률미분방정식과 점수함수(score function) 추정이라는 도구로 풀어요.

Autoregressive는 확률의 연쇄법칙 하나로 끝까지 밀어붙여서, 전체 데이터의 결합확률을 다음 걸 하나씩 순서대로 맞히는 조건부확률들의 곱으로 쪼개는데, 지금의 LLM이 바로 이 계열이에요. 네 접근 모두 결국 "분포를 어떻게 다루기 쉬운 형태로 쪼갤 것인가"라는 같은 질문에 대한 서로 다른 답인 셈이에요.

## 명제


## 그림
<svg viewBox="0 0 880 240" xmlns="http://www.w3.org/2000/svg">
<line x1="220" y1="20" x2="220" y2="230" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="440" y1="20" x2="440" y2="230" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="660" y1="20" x2="660" y2="230" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<text x="110" y="18" font-size="13" text-anchor="middle">VAE</text>
<text x="330" y="18" font-size="13" text-anchor="middle">GAN</text>
<text x="550" y="18" font-size="13" text-anchor="middle">Diffusion</text>
<text x="770" y="18" font-size="13" text-anchor="middle">Autoregressive(LLM)</text>
<circle cx="25" cy="140" r="6" class="dg-accent"/>
<rect x="45" y="118" width="44" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="67" y="144" font-size="12" text-anchor="middle">E</text>
<line x1="31" y1="140" x2="43" y2="140" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="43,140 34,136 34,144" class="dg-stroke-ink"/>
<circle cx="122" cy="140" r="7" class="dg-accent"/>
<line x1="89" y1="140" x2="114" y2="140" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="114,140 105,136 105,144" class="dg-stroke-ink"/>
<rect x="145" y="118" width="44" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="167" y="144" font-size="12" text-anchor="middle">D</text>
<line x1="130" y1="140" x2="143" y2="140" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="143,140 134,136 134,144" class="dg-stroke-ink"/>
<circle cx="207" cy="140" r="6" class="dg-accent"/>
<line x1="189" y1="140" x2="200" y2="140" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="200,140 191,136 191,144" class="dg-stroke-ink"/>
<text x="18" y="163" font-size="11">x</text>
<text x="122" y="122" font-size="11">z</text>
<text x="207" y="163" font-size="11">x̂</text>
<text x="110" y="207" font-size="11" class="dg-dim" text-anchor="middle">인코더→잠재분포→디코더</text>
<circle cx="245" cy="140" r="6" class="dg-accent"/>
<text x="245" y="122" font-size="11">z</text>
<rect x="265" y="118" width="44" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="287" y="144" font-size="12" text-anchor="middle">G</text>
<line x1="251" y1="140" x2="263" y2="140" class="dg-stroke-ink" stroke-width="1.5"/>
<polygon points="263,140 254,136 254,144" class="dg-stroke-ink"/>
<circle cx="345" cy="105" r="5" class="dg-accent"/>
<text x="352" y="102" font-size="11">가짜</text>
<line x1="305" y1="123" x2="338" y2="109" class="dg-stroke-ink" stroke-width="1.3"/>
<polygon points="338,109 328,109 332,117" class="dg-stroke-ink"/>
<rect x="365" y="118" width="44" height="44" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="387" y="144" font-size="12" text-anchor="middle">D</text>
<line x1="349" y1="108" x2="363" y2="122" class="dg-stroke-ink" stroke-width="1.3"/>
<polygon points="363,122 359,113 351,117" class="dg-stroke-ink"/>
<circle cx="345" cy="175" r="5" class="dg-accent"/>
<text x="352" y="182" font-size="11">진짜</text>
<line x1="349" y1="172" x2="363" y2="140" class="dg-stroke-ink" stroke-width="1.3"/>
<polygon points="363,140 359,150 351,145" class="dg-stroke-ink"/>
<path d="M309,113 Q337,88 365,113" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="365,113 353,110 358,120" class="dg-stroke-accent"/>
<path d="M365,148 Q337,176 309,148" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="5,3"/>
<polygon points="309,148 321,145 318,155" class="dg-line"/>
<text x="330" y="207" font-size="11" class="dg-dim" text-anchor="middle">생성자 ↔ 판별자 경쟁</text>
<circle cx="465" cy="140" r="6" class="dg-accent"/>
<circle cx="515" cy="140" r="6" class="dg-accent"/>
<circle cx="565" cy="140" r="6" class="dg-accent"/>
<circle cx="615" cy="140" r="6" class="dg-accent"/>
<path d="M471,132 Q490,118 509,132" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<polygon points="509,132 499,128 500,136" class="dg-line"/>
<path d="M521,132 Q540,118 559,132" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<polygon points="559,132 549,128 550,136" class="dg-line"/>
<path d="M571,132 Q590,118 609,132" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="3,2"/>
<polygon points="609,132 599,128 600,136" class="dg-line"/>
<path d="M509,148 Q490,164 471,148" fill="none" class="dg-stroke-accent" stroke-width="1.6"/>
<polygon points="471,148 481,145 480,153" class="dg-stroke-accent"/>
<path d="M559,148 Q540,164 521,148" fill="none" class="dg-stroke-accent" stroke-width="1.6"/>
<polygon points="521,148 531,145 530,153" class="dg-stroke-accent"/>
<path d="M609,148 Q590,164 571,148" fill="none" class="dg-stroke-accent" stroke-width="1.6"/>
<polygon points="571,148 581,145 580,153" class="dg-stroke-accent"/>
<text x="465" y="163" font-size="11" class="dg-dim" text-anchor="middle">x₀</text>
<text x="615" y="163" font-size="11" class="dg-dim" text-anchor="middle">x_T</text>
<text x="550" y="207" font-size="11" class="dg-dim" text-anchor="middle">점선=노이즈 추가, 실선=디노이즈</text>
<rect x="685" y="125" width="30" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="700" y="145" font-size="11" text-anchor="middle">w₁</text>
<rect x="730" y="125" width="30" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="745" y="145" font-size="11" text-anchor="middle">w₂</text>
<rect x="775" y="125" width="30" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="790" y="145" font-size="11" text-anchor="middle">w₃</text>
<rect x="820" y="125" width="30" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="835" y="145" font-size="11" text-anchor="middle">w₄</text>
<line x1="715" y1="140" x2="728" y2="140" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="728,140 719,136 719,144" class="dg-stroke-accent"/>
<line x1="760" y1="140" x2="773" y2="140" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="773,140 764,136 764,144" class="dg-stroke-accent"/>
<line x1="805" y1="140" x2="818" y2="140" class="dg-stroke-accent" stroke-width="2"/>
<polygon points="818,140 809,136 809,144" class="dg-stroke-accent"/>
<text x="770" y="207" font-size="11" class="dg-dim" text-anchor="middle">P(wₜ | w&lt;ₜ) 순차 생성</text>
</svg>

_왼쪽부터 VAE(인코더-디코더), GAN(생성자-판별자 경쟁), Diffusion(노이즈 추가·제거), Autoregressive(순차적 다음 토큰 예측) 네 갈래의 생성 흐름 비교._

## 문제
결합확률의 연쇄법칙은 두 확률변수에 대해 $P(A,B)=P(A)P(B\mid A)$가 성립한다는 사실에서 출발한다. 이걸 $T$개의 변수 $x_1,\ldots,x_T$로 확장하면, 결합확률 $p(x_1,\ldots,x_T)$는 조건부확률들의 곱 ==빈칸== 로 쓸 수 있다.

## 해설
$P(A,B)=P(A)P(B\mid A)$를 세 개, 네 개로 계속 확장 적용하면, 각 변수를 그 앞의 모든 변수로 조건부화한 확률들의 곱으로 쪼갤 수 있어요. 이게 바로 오토리그레시브 모델이 다음 토큰을 하나씩 예측하는 근거예요.

**정답: $\prod_{t=1}^{T} p(x_t \mid x_1,\ldots,x_{t-1})$**

## 예시
vae-encoder는 인코더가 잠재변수 하나를 딱 찍어 내놓는 대신 평균과 로그분산을 함께 내놓아서, 잠재공간을 확률분포로 다루는 이유를 보여줘요. 이 확률적 인코딩 덕분에 디코더가 매끄럽게 이어진 잠재공간에서 새로운 샘플을 만들어낼 수 있어요.

gan-minimax-objective는 생성자와 판별자가 서로 겨루는 목적함수의 최적 판별자가 무엇인지 보여주는데, 이 균형점에서 생성자의 분포가 실제 데이터 분포와 같아진다는 걸 확인할 수 있어요. diffusion-forward-process는 노이즈를 씌우는 정방향 과정이 왜 닫힌 형태의 주변분포를 갖는지 보여주고, 이 성질 덕분에 학습 중 임의의 시점 노이즈를 한 번에 계산할 수 있어요.

autoregressive-chain-rule은 결합확률을 조건부확률들의 곱으로 쪼개는 연쇄법칙 자체를 다루는데, 지금 LLM이 다음 토큰을 하나씩 예측하는 방식이 바로 이 연쇄법칙의 직접적인 응용이에요.
