---
slug: mdp-definition
theme: PROB
domainLabel: 확률 · 통계
subLabel: 마르코프 · 확률과정
title: 마르코프 성질과 벨만방정식의 잘 정의됨
related: 
---

## 도입
MDP는 $(S,A,P,R,\gamma)$ 다섯 가지로 정의돼요. 그 중 전이확률 $P$가 오직 현재 상태와 행동에만 의존한다는 마르코프 성질이 사실 이 정의 전체를 지탱하는 기둥이에요. markov-mdp에서는 이 성질을 가정하고 벨만 기대방정식을 유도했어요. 여기서는 한 걸음 더 들어가서, 이 성질이 없다면 상태만의 함수인 가치함수 $V(s)$라는 개념 자체가 왜 무너지는지를 확인해봐요.

## 명제
정책 $\pi$를 고정하고 $H_{t-1}=(s_0,\dots,s_{t-1})$이라 하자. 1단계 마르코프 성질 $P(s_{t+1}\mid s_t,H_{t-1})=P(s_{t+1}\mid s_t)$가 모든 $t$에서 성립하면, 모든 $k\ge1$에서 $P(s_{t+k}\mid s_t,H_{t-1})=P(s_{t+k}\mid s_t)$ 이다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
  <line x1="345" y1="15" x2="345" y2="205" class="dg-line" stroke-width="1" stroke-dasharray="3,4"/>
  <text x="80" y="24" font-size="13" font-weight="700">마르코프: s_t에서만 화살표</text>
  <text x="420" y="24" font-size="13" font-weight="700">비마르코프: 전체 이력에서 화살표</text>
  <circle cx="50" cy="120" r="16" class="dg-dim"/>
  <circle cx="120" cy="120" r="16" class="dg-dim"/>
  <circle cx="190" cy="120" r="16" class="dg-dim"/>
  <circle cx="260" cy="120" r="16" class="dg-dim"/>
  <circle cx="330" cy="120" r="18" class="dg-accent"/>
  <text x="42" y="125" font-size="10">s₀</text>
  <text x="112" y="125" font-size="10">s₁</text>
  <text x="182" y="125" font-size="10">s₂</text>
  <text x="252" y="125" font-size="10">s₃</text>
  <text x="318" y="125" font-size="10" font-weight="700">s_t</text>
  <line x1="66" y1="120" x2="104" y2="120" class="dg-stroke-accent" stroke-width="2.4"/>
  <polygon points="104,120 94,115 94,125" class="dg-accent"/>
  <line x1="136" y1="120" x2="174" y2="120" class="dg-stroke-accent" stroke-width="2.4"/>
  <polygon points="174,120 164,115 164,125" class="dg-accent"/>
  <line x1="206" y1="120" x2="244" y2="120" class="dg-stroke-accent" stroke-width="2.4"/>
  <polygon points="244,120 234,115 234,125" class="dg-accent"/>
  <line x1="276" y1="120" x2="312" y2="120" class="dg-stroke-accent" stroke-width="2.4"/>
  <polygon points="312,120 302,115 302,125" class="dg-accent"/>
  <circle cx="400" cy="120" r="16" class="dg-dim"/>
  <circle cx="470" cy="120" r="16" class="dg-dim"/>
  <circle cx="540" cy="120" r="16" class="dg-dim"/>
  <circle cx="610" cy="120" r="16" class="dg-dim"/>
  <circle cx="680" cy="120" r="18" class="dg-accent"/>
  <text x="392" y="125" font-size="10">s₀</text>
  <text x="462" y="125" font-size="10">s₁</text>
  <text x="532" y="125" font-size="10">s₂</text>
  <text x="602" y="125" font-size="10">s₃</text>
  <text x="668" y="125" font-size="10" font-weight="700">s_t</text>
  <path d="M400,108 C480,50 600,50 668,110" fill="none" class="dg-line" stroke-width="1.4" stroke-dasharray="2,4"/>
  <path d="M470,108 C520,70 610,70 665,112" fill="none" class="dg-line" stroke-width="1.4" stroke-dasharray="3,4"/>
  <path d="M540,110 C580,90 620,90 662,115" fill="none" class="dg-line" stroke-width="1.4" stroke-dasharray="4,3"/>
  <line x1="626" y1="120" x2="662" y2="120" class="dg-line" stroke-width="1.4" stroke-dasharray="2,4"/>
  <polygon points="662,120 654,115 654,125" class="dg-dim"/>
</svg>

_왼쪽은 화살표가 오직 바로 전 상태 s_t에서만 나오는 마르코프 전이, 오른쪽은 s₀부터 전체 이력이 화살표(점선)로 s_t에 영향을 주는 비마르코프 전이다._

## 문제
귀납단계를 밟는다. $k$까지는 성립한다고 가정하고(귀납가정) $k+1$에서도 성립함을 보인다. 먼저 전확률법칙으로 중간 상태 $s_{t+k}$에 대해 나눠 더한다.

$P(s_{t+k+1}\mid s_t,H_{t-1}) = \sum_{s_{t+k}} P(s_{t+k+1}\mid s_{t+k},s_t,H_{t-1})\cdot $==빈칸== 이다.

## 해설
전확률법칙으로 $s_{t+k}$가 가질 수 있는 모든 값에 대해 나눠 더한 것이다. 그 값을 조건으로 걸 확률과, 그 값을 지날 확률을 곱해 더한다.

**정답: $P(s_{t+k}\mid s_t,H_{t-1})$**

## 예시
1스텝 마르코프성만 가정하고 2스텝짜리 전이확률을 직접 계산해보면, 과거 이력이 정말 사라지는지 확인할 수 있습니다.

상태가 $0,1$ 두 가지뿐이고 전이확률이 $P(1|1)=0.7$, $P(0|1)=0.3$, $P(1|0)=0.4$, $P(0|0)=0.6$이라 합시다. 지금 상태가 $s_t=1$일 때 두 스텝 뒤에 $s_{t+2}=1$일 확률을 구해봅니다.

중간 상태 $s_{t+1}$이 $1$이거나 $0$인 두 경로를 전확률법칙으로 나눠 더합니다.
$$P(s_{t+2}=1\mid s_t=1)=P(1|1)P(1|1)+P(1|0)P(0|1)=0.7\times0.7+0.4\times0.3=0.49+0.12=0.61$$
이 계산에는 $s_t=1$ 이전에 어떤 상태들을 거쳐왔는지, 즉 이력 $H_{t-1}$이 무엇이었는지가 전혀 들어가지 않았습니다. 오직 $s_t=1$이라는 사실과 1스텝 전이확률만으로 2스텝 뒤의 확률 $0.61$이 완전히 정해집니다.

이력을 알든 모르든 답이 똑같다는 것은 $k=1$일 때의 마르코프성이 $k=2$에서도 그대로 이어진다는 뜻입니다. 아래 증명은 이 이어짐이 2스텝뿐 아니라 모든 $k$스텝에서 귀납법으로 성립한다는 것을 보이고, 이것이 가치함수 $V(s)$가 상태 하나만으로 잘 정의되는 이유로 이어집니다.
