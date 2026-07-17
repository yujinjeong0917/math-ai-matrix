---
slug: l1-l2-regularization
theme: LINALG
domainLabel: 선형대수
subLabel: 노름 · 사영
title: L2 정규화와 가우시안 사전분포 하의 MAP 추정
related: 
---

## 도입
L2 정규화는 흔히 가중치가 너무 커지지 않도록 억누르는 벌점항으로 소개됩니다. 이 벌점항은 순전히 임의로 고른 것이 아닙니다. 가중치에 대해 평균이 0인 가우시안 사전분포를 두고 베이즈 정리로 사후확률을 최대화하는 MAP 추정을 하면, 그 결과가 정확히 L2 정규화항이 붙은 손실함수와 같아집니다. 정규화 계수 $\lambda$가 무엇을 뜻하는지도 이 관점에서 훨씬 선명해집니다.

## 명제
가중치 $w$에 대한 사전분포가 $w\sim N(0,\tau^2I)$이면, MAP 추정 $w_{MAP}=\arg\max_w p(w|D)$는 $\arg\min_w(\mathrm{NLL}(w)+\frac{1}{2\tau^2}\|w\|^2)$와 같다.

## 그림
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="18" font-size="13" text-anchor="middle">L2: 원형 제약(가우시안 사전분포)</text>
<line x1="60" y1="140" x2="260" y2="140" class="dg-line" stroke-width="1"/>
<line x1="150" y1="40" x2="150" y2="240" class="dg-line" stroke-width="1"/>
<circle cx="150" cy="140" r="55" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<ellipse cx="230" cy="90" rx="25" ry="15" transform="rotate(-20 230 90)" fill="none" class="dg-line" stroke-width="1.2" stroke-dasharray="3,2"/>
<ellipse cx="230" cy="90" rx="50" ry="30" transform="rotate(-20 230 90)" fill="none" class="dg-line" stroke-width="1.2" stroke-dasharray="3,2"/>
<ellipse cx="230" cy="90" rx="75" ry="45" transform="rotate(-20 230 90)" fill="none" class="dg-line" stroke-width="1.2" stroke-dasharray="3,2"/>
<circle cx="230" cy="90" r="3" class="dg-dim"/>
<text x="238" y="80" font-size="10" class="dg-dim">데이터만의 최적해</text>
<circle cx="196" cy="111" r="6" class="dg-accent"/>
<text x="200" y="130" font-size="11">w*_L2 (원점 쪽으로 수축)</text>
<text x="490" y="18" font-size="13" text-anchor="middle">L1: 마름모꼴 제약(라플라스 사전분포)</text>
<line x1="400" y1="140" x2="600" y2="140" class="dg-line" stroke-width="1"/>
<line x1="490" y1="40" x2="490" y2="240" class="dg-line" stroke-width="1"/>
<polygon points="490,85 545,140 490,195 435,140" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<ellipse cx="570" cy="90" rx="25" ry="15" transform="rotate(-20 570 90)" fill="none" class="dg-line" stroke-width="1.2" stroke-dasharray="3,2"/>
<ellipse cx="570" cy="90" rx="50" ry="30" transform="rotate(-20 570 90)" fill="none" class="dg-line" stroke-width="1.2" stroke-dasharray="3,2"/>
<ellipse cx="570" cy="90" rx="75" ry="45" transform="rotate(-20 570 90)" fill="none" class="dg-line" stroke-width="1.2" stroke-dasharray="3,2"/>
<circle cx="570" cy="90" r="3" class="dg-dim"/>
<text x="578" y="80" font-size="10" class="dg-dim">데이터만의 최적해</text>
<circle cx="490" cy="85" r="6" class="dg-accent"/>
<text x="497" y="82" font-size="11">w*_L1 (한 성분이 정확히 0)</text>
</svg>

_L2 제약은 둥근 경계 어디서나 접해 원점 쪽으로 부드럽게 수축시키지만, L1의 뾰족한 꼭짓점은 축 위에서 자주 접해 일부 가중치를 정확히 0으로 만든다._

## 문제
$p(D|w)p(w)$는 두 확률을 곱한 식이라 미분해서 최댓값을 찾기 번거롭다. 로그는 곱을 합으로 바꾸면서도 강한 증가함수라 최댓값의 위치를 그대로 보존한다. 로그를 씌운 뒤 최대화해도 결과는 같다. $\arg\max_w p(D|w)p(w) = \arg\max_w[\log p(D|w) + $==빈칸==$]$ 이다.

## 해설
$\log(ab)=\log a+\log b$라는 로그의 기본 성질을 그대로 적용한 것이다. 곱해져 있던 두 확률이 로그를 거치면서 더해지는 두 항으로 바뀐다.

**정답: $\log p(w)$**

## 예시
MAP 추정이 정말 L2 정규화항으로 바뀌는지 추상적인 논증 전에 스칼라 하나로 직접 확인해봅니다.

가중치가 스칼라 $w$ 하나뿐이고 사전분포의 분산이 $\tau^2=0.5$라 합니다. 그러면 정규화 계수는 $\lambda=1/(2\tau^2)=1$입니다.

데이터만 보고 구한 음의 로그우도가 $\mathrm{NLL}(w)=(w-4)^2$ 형태라고 합시다. 정규화가 없다면 이 식을 최소화하는 $w$는 그대로 $4$입니다. 데이터만 놓고 본 최적값입니다.

이제 사전분포를 반영한 목적함수 $(w-4)^2+\lambda w^2=(w-4)^2+w^2$를 최소화합니다. 미분해서 0으로 놓으면 $2(w-4)+2w=0$이 되고 $4w=8$이므로 $w^*=2$입니다.

정규화가 없을 때는 $4$였던 추정값이 가우시안 사전분포를 더하자 $0$ 쪽으로 절반 끌려와 $2$가 되었습니다. 아래 증명은 이 끌림이 이 특정 숫자만의 우연이 아니라 $\lambda=1/(2\tau^2)$라는 정확한 비율로 항상 일어남을 보입니다.
