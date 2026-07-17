---
slug: n-step-td-return
theme: PROB
domainLabel: 확률 · 통계
subLabel: 마르코프 · 확률과정
title: n스텝 리턴: 1스텝 시간차와 몬테카를로 사이의 다이얼
related: 벨만 기대방정식의 1스텝 재귀 · 편향과 분산의 일반적 분해
---

## 도입
markov-mdp 항목에서 본 벨만 기대방정식은 지금 당장의 보상 하나에 다음 상태의 가치추정치를 더해 갱신 목표로 삼습니다. 이 방식은 가치함수 추정치 $V$가 아직 부정확할 때 그 부정확함을 그대로 물려받는다는 단점이 있습니다. 반대로 에피소드가 끝날 때까지 실제로 받은 보상만 모두 더하는 몬테카를로 방식은 $V$의 부정확함에서는 자유롭지만, 그만큼 우연히 나온 보상들의 흔들림을 고스란히 떠안습니다. n스텝 리턴은 이 두 극단 사이를 잇는 하나의 다이얼입니다.

## 명제
$G_t^{(n)} = r_t+\gamma r_{t+1}+\cdots+\gamma^{n-1}r_{t+n-1}+\gamma^nV(s_{t+n})$로 정의하면, $\pi$를 따르는 궤적에서 $E_\pi\!\left[G_t^{(n)}\,\middle|\,s_t=s\right] = V^\pi(s) + \gamma^n\,E_\pi\!\left[V(s_{t+n})-V^\pi(s_{t+n})\,\middle|\,s_t=s\right]$이다.

## 그림
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
<text x="55" y="20" font-size="12">1-step TD</text>
<circle cx="110" cy="30" r="7" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="110" y1="37" x2="110" y2="90" class="dg-line" stroke-width="1.5"/>
<text x="118" y="68" font-size="11">r_t</text>
<rect x="102" y="90" width="16" height="16" class="dg-accent"/>
<text x="55" y="130" font-size="11" class="dg-dim">V(s_t+1)로</text>
<text x="55" y="145" font-size="11" class="dg-dim">부트스트랩</text>
<text x="300" y="20" font-size="12">n-step 리턴</text>
<circle cx="340" cy="30" r="7" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="340" y1="37" x2="340" y2="70" class="dg-line" stroke-width="1.5"/>
<circle cx="340" cy="70" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="340" y1="76" x2="340" y2="110" class="dg-line" stroke-width="1.5"/>
<circle cx="340" cy="110" r="6" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="340" y1="116" x2="340" y2="150" class="dg-line" stroke-width="1.5" stroke-dasharray="3,2"/>
<text x="348" y="55" font-size="11">r_t</text>
<text x="348" y="95" font-size="11">r_t+1</text>
<text x="348" y="135" font-size="11">⋮</text>
<rect x="332" y="150" width="16" height="16" class="dg-accent"/>
<text x="300" y="180" font-size="11" class="dg-dim">V(s_t+n)로 부트스트랩</text>
<text x="545" y="20" font-size="12">몬테카를로</text>
<circle cx="590" cy="30" r="7" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="590" y1="37" x2="590" y2="65" class="dg-line" stroke-width="1.5"/>
<circle cx="590" cy="65" r="5" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="590" y1="70" x2="590" y2="98" class="dg-line" stroke-width="1.5"/>
<circle cx="590" cy="98" r="5" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="590" y1="103" x2="590" y2="131" class="dg-line" stroke-width="1.5"/>
<circle cx="590" cy="131" r="5" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="590" y1="136" x2="590" y2="164" class="dg-line" stroke-width="1.5"/>
<circle cx="590" cy="164" r="5" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="590" y1="169" x2="590" y2="197" class="dg-line" stroke-width="1.5"/>
<rect x="580" y="197" width="20" height="20" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="598" y="60" font-size="10">r</text>
<text x="530" y="222" font-size="11" class="dg-dim">에피소드 종료, 부트스트랩 없음</text>
</svg>

_1-step은 즉시 부트스트랩, 몬테카를로는 끝까지 실제 보상만 사용, n-step은 그 사이의 다이얼이다._

## 문제
지금 목표는 실제 보상 $n$개를 더한 부분합의 기댓값이 무엇과 같은지 구하는 것이다. markov-mdp 항목의 한 스텝 전개를 $n$번 반복하면, 참 가치함수 $V^\pi(s)$에서 $n$스텝 뒤 상태의 참 가치를 할인해서 뺀 나머지가 정확히 그 사이 $n$개의 실제 보상의 기댓값과 같다는 관계를 얻는다. 이는 $k=0$부터 $k=n-1$까지 순서대로 한 항씩 떼어내는 것을 $n$번 반복한 결과다.

이 관계를 식으로 쓰면 $E_\pi\!\left[\sum_{k=0}^{n-1}\gamma^kr_{t+k}\,\middle|\,s_t=s\right] = V^\pi(s) - $==빈칸== 이다.

## 해설
참 가치함수의 정의를 $n$번째 스텝까지의 실제 보상 부분과 그 뒤에 남는 꼬리 부분으로 나눈 것이다. 꼬리 부분은 $n$스텝 뒤 상태에서 시작하는 리턴의 기댓값, 즉 $V^\pi(s_{t+n})$이고 여기에 $\gamma^n$이 곱해져 있다. 이 꼬리를 원래 식에서 빼면 남는 것이 실제 보상 $n$개의 기댓값이다.

**정답: $\gamma^n\,E_\pi[V^\pi(s_{t+n})\mid s_t=s]$**

## 예시
보상열 하나를 놓고 $n=1$, $n=3$, $n=\infty$(전체 리턴)가 서로 얼마나 다른 값을 주는지 직접 계산해봅니다.

어떤 궤적에서 시점 $t$부터 다섯 스텝의 보상이 $r_t,\dots,r_{t+4} = 2,\ 1,\ 3,\ 0,\ 4$로 관측되었고 다섯 번째 스텝 뒤에 에피소드가 끝난다고 하겠습니다. 할인율은 $\gamma=0.9$입니다. 현재 가치함수 추정치는 $V(s_{t+1})=6$, $V(s_{t+3})=5$라 하겠습니다.

먼저 1스텝 리턴을 구합니다.
$$G_t^{(1)} = r_t+\gamma V(s_{t+1}) = 2+0.9\times6 = 2+5.4 = 7.4$$
3스텝 리턴은 실제 보상 세 개를 더한 뒤 나머지를 $V(s_{t+3})$으로 부트스트랩합니다.
$$G_t^{(3)} = r_t+\gamma r_{t+1}+\gamma^2r_{t+2}+\gamma^3V(s_{t+3}) = 2+0.9+2.43+3.645 = 8.975$$
전체 리턴, 즉 $n=\infty$에 해당하는 몬테카를로 리턴은 부트스트랩 없이 실제로 관측된 보상 다섯 개를 전부 더합니다.
$$G_t^{(\infty)} = r_t+\gamma r_{t+1}+\gamma^2r_{t+2}+\gamma^3r_{t+3}+\gamma^4r_{t+4} = 2+0.9+2.43+0+2.6244 = 7.9544$$
세 값 $7.4,\ 8.975,\ 7.9544$가 서로 다릅니다. $G_t^{(1)}$은 $V(s_{t+1})=6$ 하나에 크게 의존하는데, $s_{t+1}$ 이후 실제로 이어진 보상들이 만들어낸 값은 $1+0.9\times3+0.9^2\times0+0.9^3\times4=6.616$으로 $6$보다 커서, $V(s_{t+1})$이 실제보다 낮게 잡혀 있었던 셈이고 그래서 결과가 실제보다 작게 나왔습니다. $G_t^{(3)}$은 $V(s_{t+3})=5$에 의존하는데, $s_{t+3}$ 이후 실제로 이어진 보상들이 만들어낸 값은 $0+0.9\times4=3.6$으로 $5$보다 작아서, 이번엔 반대로 $V(s_{t+3})$이 실제보다 높게 잡혀 있었던 셈이고 그래서 결과가 오히려 더 크게 튀었습니다. $G_t^{(\infty)}$은 어떤 $V$에도 의존하지 않고 오직 실제로 일어난 보상들에만 의존합니다. 다만 이 값은 그 궤적 단 한 번의 결과일 뿐이라, 같은 상태에서 다시 에피소드를 굴리면 보상들이 달라져 전혀 다른 숫자가 나올 수 있습니다. 아래 증명은 $n$이 커질수록 $V$의 부정확함이 기여하는 정도가 정확히 $\gamma^n$의 비율로 줄어든다는 것을 보입니다.
