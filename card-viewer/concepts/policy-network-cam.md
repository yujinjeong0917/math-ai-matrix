---
slug: policy-network-cam
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 구조 특화 설명
title: 정책 네트워크 CAM: 에이전트가 화면의 어디를 보는가
related: Grad-CAM · 정책 그래디언트 saliency · 정책 어텐션 시각화
---

## 도입
Grad-CAM과 같은 절차를 그대로 따른다. 선택한 합성곱층의 채널별 특징맵 $A^k$를 목표 행동의 점수로 미분해 채널별 중요도를 구하고 이를 가중합한 뒤 ReLU를 씌운다. 목표 행동의 점수로는 정책기반 방법이면 행동의 로그확률 $\log \pi(a|s)$를, 가치기반 방법이면 그 행동의 $Q(s,a)$를 쓴다. $\alpha_k^a = \frac{1}{Z}\sum_{ij} \partial Q(s,a)/\partial A^k_{ij}$, $L^a = \mathrm{ReLU}(\sum_k \alpha_k^a A^k)$.

이미지 분류는 클래스가 수천 개일 수 있지만 게임 에이전트는 보통 몇 개 안 되는 행동 중 하나를 고른다. 그래서 같은 화면에서 서로 다른 후보 행동에 대한 지도를 나란히 비교하는 게 특히 유용하다. 왼쪽으로 이동과 오른쪽으로 이동에 대한 지도가 서로 다른 영역을 짚는다면 정책이 공간 배치를 실제로 활용하고 있다는 뜻이고 두 지도가 거의 구분되지 않는다면 행동 선택이 이미지의 공간 정보보다는 몇몇 수치 채널에 더 의존하고 있을 수 있다는 신호다.

이 방법은 화면처럼 공간 구조를 가진 입력에만 적용할 수 있다. 센서 값처럼 벡터로 된 상태를 쓰는 정책에는 합성곱층 자체가 없어 이 방법을 쓸 수 없고 그런 경우에는 정책 그래디언트 saliency나 트랜스포머 기반 정책이라면 정책 어텐션 시각화가 대안이 된다.

## 명제


## 그림
<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="40" width="220" height="160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="150" y="26" font-size="13" text-anchor="middle">행동: 왼쪽</text>
<circle cx="100" cy="120" r="30" class="dg-accent" stroke="none"/>
<text x="150" y="220" font-size="12" text-anchor="middle" class="dg-dim">왼쪽 장애물에 집중</text>
<rect x="340" y="40" width="220" height="160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="450" y="26" font-size="13" text-anchor="middle">행동: 오른쪽</text>
<circle cx="500" cy="120" r="30" class="dg-accent" stroke="none"/>
<text x="450" y="220" font-size="12" text-anchor="middle" class="dg-dim">오른쪽 장애물에 집중</text>
</svg>

_같은 화면이라도 후보 행동을 바꾸면 활성화맵이 서로 다른 영역으로 옮겨간다._

## 문제
이 가정을 $\sum_k \alpha_k^{a_1}A^k$에 대입하면 모든 항에 공통으로 곱해진 상수 $c$를 합 기호 밖으로 뺄 수 있으므로 $\sum_k \alpha_k^{a_1}A^k = $==빈칸== 를 얻는다. 편의상 $v := \sum_k \alpha_k^{a_2}A^k$로 쓰자.

## 해설
각 항이 α_k^{a1}A^k = c·α_k^{a2}A^k 형태니까 공통 인수 c를 시그마 밖으로 꺼낼 수 있어요. 그러면 c 곱하기 (α_k^{a2}A^k들의 합)이 남아요.

**정답: $c\sum_k \alpha_k^{a_2}A^k$**

## 예시

