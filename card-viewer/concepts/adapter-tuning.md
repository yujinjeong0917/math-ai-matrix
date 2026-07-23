---
slug: adapter-tuning
theme: LLM
domainLabel: LLM/Agent
subLabel: 파라미터효율 튜닝(PEFT)
title: Adapter: 층 사이에 작은 모듈을 끼워 학습하기
related: LoRA · QLoRA
---

## 도입
Adapter 모듈은 보통 트랜스포머 한 블록 안에서 어텐션이나 피드포워드 다음에 삽입된다. 구조는 입력 차원 $d$를 훨씬 작은 병목 차원 $m$으로 줄이는 다운프로젝션, 비선형 활성함수, 다시 $d$로 되돌리는 업프로젝션으로 이루어진 작은 병목형 네트워크다. 출력에는 잔차 연결을 더해 원래 층의 출력에 작은 보정값만 얹는 형태로 만든다.

Adapter가 필요한 이유도 전체 파인튜닝의 비용 문제에서 출발한다. 층 전체를 다시 학습시키는 대신 병목 차원 $m$을 원래 차원 $d$보다 훨씬 작게 잡은 모듈 몇 개만 학습하면 학습 파라미터 수를 전체 모델의 몇 퍼센트 수준으로 낮출 수 있다. 원래 층의 가중치는 전혀 건드리지 않으므로 태스크마다 이 작은 Adapter 모듈만 따로 저장해두고 필요할 때 갈아 끼우는 방식으로 여러 태스크를 하나의 기본 모델 위에서 운영할 수 있다.

다만 Adapter는 순전파 경로 자체에 새 층을 끼워 넣으므로 추론 시 연산 단계가 하나 늘어나 약간의 지연이 생긴다. LoRA는 학습이 끝난 뒤 저랭크 행렬을 원래 가중치에 합쳐버릴 수 있어 이런 추가 지연이 없는 반면 Adapter는 병목 구조 자체에 비선형 활성함수가 들어 있어서 원래 가중치에 합쳐 넣을 수 없다는 차이가 있다.

## 명제


## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<rect x="150" y="10" width="260" height="40" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="280" y="35" text-anchor="middle" font-size="13">어텐션 / FFN 층 (고정)</text>
<line x1="280" y1="50" x2="280" y2="80" class="dg-line" stroke-width="1.5"/>
<rect x="230" y="80" width="100" height="30" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="280" y="100" text-anchor="middle" font-size="12">다운프로젝션 d→m</text>
<line x1="280" y1="110" x2="280" y2="130" class="dg-line" stroke-width="1.5"/>
<rect x="245" y="130" width="70" height="26" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="280" y="148" text-anchor="middle" font-size="12">비선형</text>
<line x1="280" y1="156" x2="280" y2="176" class="dg-line" stroke-width="1.5"/>
<rect x="230" y="176" width="100" height="30" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="280" y="196" text-anchor="middle" font-size="12">업프로젝션 m→d</text>
<path d="M150,30 C 60,30 60,220 230,220" fill="none" class="dg-line" stroke-width="1.5"/>
<line x1="280" y1="206" x2="280" y2="228" class="dg-line" stroke-width="1.5"/>
<circle cx="280" cy="234" r="14" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="280" y="239" text-anchor="middle" font-size="13">+</text>
<text x="370" y="238" font-size="12" class="dg-dim">잔차 연결</text>
</svg>

_원래 층 출력에 작은 병목형 Adapter 모듈의 보정값을 잔차로 더한다._

## 문제
$f(x)=x$일 때는 $h' = h + W_{up}(W_{down}h)$ 로 쓸 수 있다. 행렬 곱셈의 결합법칙에 의해 $W_{up}(W_{down}h) = (W_{up}W_{down})h$ 이므로 $h' = h + (W_{up}W_{down})h$ 이고, 여기서 첫째 항의 $h$는 항등행렬 $I$를 이용해 $Ih$로 쓸 수 있으므로 공통으로 $h$를 묶어내면 $h'=$ ==빈칸== $h$ 형태로 정리된다.

## 해설
Ih+(W_{up}W_{down})h에서 h를 묶어내면 (I+W_{up}W_{down})h가 되기 때문이에요.

**정답: $I+W_{up}W_{down}$**

## 예시

