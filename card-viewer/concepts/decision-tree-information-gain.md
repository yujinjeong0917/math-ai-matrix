---
slug: decision-tree-information-gain
theme: INFO
domainLabel: 정보이론
subLabel: 엔트로피 · 손실
title: 정보이득의 비음성과 엔트로피의 오목성
related: 
---

## 도입
의사결정나무는 각 분기마다 정보이득이 가장 큰 속성을 골라서 데이터를 나눕니다. 그런데 애초에 나누는 행동 자체가 손해를 볼 수도 있는 걸까요. 다행히 그렇지 않습니다. 어떤 속성으로 나누어도 자식 노드들의 엔트로피를 가중평균한 값은 부모 노드의 엔트로피를 넘어서지 않습니다. 그 뿌리에는 엔트로피 함수가 오목함수라는 사실이 있습니다.

## 명제
집합 $S$를 속성 $A$로 분할해 $S_v$들로 나눌 때 가중치 $w_v=|S_v|/|S|$에 대해 정보이득 $IG(S,A)=H(S)-\sum_v w_vH(S_v)$는 항상 $0$ 이상이다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="18" font-size="12" class="dg-dim">분기: 부모→자식</text>
<circle cx="110" cy="45" r="26" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="110" y="42" font-size="11" text-anchor="middle">S</text>
<text x="110" y="56" font-size="9" text-anchor="middle" class="dg-dim">H=0.811</text>
<line x1="95" y1="68" x2="55" y2="120" class="dg-line" stroke-width="1.5"/>
<line x1="125" y1="68" x2="165" y2="120" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="55" cy="145" r="24" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="55" y="142" font-size="11" text-anchor="middle">S₁</text>
<text x="55" y="153" font-size="9" text-anchor="middle" class="dg-dim">H=0</text>
<circle cx="165" cy="145" r="24" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="165" y="142" font-size="11" text-anchor="middle">S₂</text>
<text x="165" y="153" font-size="9" text-anchor="middle" class="dg-dim">H=1</text>
<text x="10" y="200" font-size="11">가중평균 H = 0.5×0+0.5×1 = 0.5 ≤ H(S)</text>
<line x1="260" y1="10" x2="260" y2="210" class="dg-line" stroke-width="1"/>
<text x="300" y="18" font-size="12" class="dg-dim">엔트로피의 오목성</text>
<line x1="300" y1="190" x2="670" y2="190" class="dg-line" stroke-width="1"/>
<line x1="300" y1="190" x2="300" y2="30" class="dg-line" stroke-width="1"/>
<path d="M300,190 Q485,-10 670,190" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="345" y1="150" x2="600" y2="150" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="345" cy="150" r="3.5" class="dg-accent"/>
<circle cx="600" cy="150" r="3.5" class="dg-accent"/>
<circle cx="472" cy="55" r="3.5" class="dg-accent"/>
<line x1="472" y1="55" x2="472" y2="150" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<text x="472" y="45" font-size="10" text-anchor="middle">가중평균 위치</text>
<text x="480" y="170" font-size="9" class="dg-dim">현(chord)</text>
</svg>

_오목한 엔트로피 곡선은 현보다 위에 있어 자식 노드의 가중평균 엔트로피가 부모를 넘지 못한다._

## 문제
이 부등식을 보이려면 부모 노드의 클래스 분포와 자식 노드들의 클래스 분포가 어떤 관계인지부터 정리해야 합니다. 엔트로피는 분포 하나에 대해 정의되는 값이라 부모의 분포를 자식 분포들로 표현할 수 있어야 비교가 가능해지기 때문입니다. 클래스 $c$를 가진 데이터 개수를 세어보면 $S$ 안에서 클래스 $c$의 비율은 각 자식 $S_v$ 안에서의 비율을 그 크기 비율 $w_v$로 가중평균한 것과 정확히 같습니다.

분포를 벡터 $p,p_v$로 나타내면 $p = $==빈칸== 이다.

## 해설
각 $S_v$에 속한 클래스 $c$의 개수를 전부 더하면 $S$ 안의 클래스 $c$ 개수가 되고 이를 $|S|$로 나누면 정확히 $\sum_v w_vp_v$의 $c$번째 성분과 같아집니다. 부모의 분포는 자식 분포들의 가중평균이라는 뜻입니다.

**정답: $\sum_v w_vp_v$**

## 예시
정보이득이 항상 0 이상이라는 명제를 작은 데이터셋으로 직접 계산해봅니다. 로그는 밑을 2로 사용합니다.

데이터 4개 중 클래스 A가 3개 B가 1개인 노드 $S$를 생각합니다. 분포는 $p=(0.75,0.25)$입니다.
$$H(S)=-0.75\log_2 0.75-0.25\log_2 0.25\approx 0.311+0.5=0.811$$
이 노드를 어떤 속성으로 둘로 나눕니다. 자식 $S_1$은 A만 2개 모여 순수한 노드이고 $S_2$는 A 1개와 B 1개가 섞여 있습니다. 두 자식 모두 크기가 같아 가중치는 $w_1=w_2=0.5$입니다.
$$H(S_1)=0,\qquad H(S_2)=-0.5\log_2 0.5-0.5\log_2 0.5=1$$
가중평균 엔트로피는 $0.5\times0+0.5\times1=0.5$입니다. 부모의 엔트로피 $0.811$에서 이 값을 빼면 정보이득은 $0.811-0.5=0.311$로 여전히 양수입니다.

아래 증명은 어떤 속성으로 어떻게 나누어도 이 차이가 음수로 뒤집히는 일이 절대 없다는 것을 엔트로피의 오목성으로 보입니다.
