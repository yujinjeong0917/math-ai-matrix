---
slug: conjugate-priors-three-families
theme: PROB
domainLabel: 확률 · 통계
subLabel: 분포 · 추정
title: 켤레사전분포 3종: 베타-이항, 디리클레-다항, 가우시안-가우시안
related: 잠재디리클레할당(LDA) · 베이지안 선형회귀 사후분포
---

## 도입
베이즈 갱신은 사전분포에 우도를 곱하고 정규화하는 절차인데, 대부분의 경우 그 결과가 어떤 이름 붙은 분포족인지조차 알기 어렵습니다. 그런데 사전분포와 우도가 '짝'을 잘 이루면 사후분포가 사전분포와 정확히 같은 분포족에 속하는 경우가 있고, 이를 켤레성(conjugacy)이라 부릅니다. 계산이 닫힌 형태로 끝나기 때문에 베이지안 모델링에서 가장 널리 쓰이는 구조입니다.

## 명제
다음 세 쌍은 모두 켤레이다. (1) $\theta\sim\mathrm{Beta}(\alpha,\beta)$, $x\mid\theta\sim\mathrm{Binomial}(n,\theta)$ 이면 $\theta\mid x\sim\mathrm{Beta}(\alpha+x,\beta+n-x)$. (2) $\pi\sim\mathrm{Dir}(\alpha)$, $x\mid\pi\sim\mathrm{Multinomial}(n,\pi)$ 이면 $\pi\mid x\sim\mathrm{Dir}(\alpha+x)$. (3) $\mu\sim N(\mu_0,\tau_0^2)$, $x_i\mid\mu\overset{iid}\sim N(\mu,\sigma^2)$($\sigma^2$ 기지)이면 $\mu\mid x_{1:n}\sim N(\mu_n,\tau_n^2)$, $\tau_n^2=(1/\tau_0^2+n/\sigma^2)^{-1}$, $\mu_n=\tau_n^2(\mu_0/\tau_0^2+n\bar x/\sigma^2)$.

## 그림
<svg viewBox="0 0 900 260" xmlns="http://www.w3.org/2000/svg">
<text x="40" y="20" font-size="13">베타-이항</text>
<line x1="30" y1="200" x2="250" y2="200" class="dg-line" stroke-width="1"/>
<path d="M40,200 Q140,60 240,200" fill="none" class="dg-dim" stroke-width="2" stroke-dasharray="6,4"/>
<path d="M60,200 Q172,32 232,200" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="70" y="80" font-size="11" class="dg-dim">사전 Beta(2,2)</text>
<text x="150" y="45" font-size="11">사후 Beta(9,5)</text>
<text x="320" y="20" font-size="13">디리클레-다항</text>
<line x1="320" y1="200" x2="600" y2="200" class="dg-line" stroke-width="1"/>
<rect x="335" y="150" width="18" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
<rect x="358" y="127" width="18" height="73" class="dg-accent"/>
<rect x="405" y="150" width="18" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
<rect x="428" y="145" width="18" height="55" class="dg-accent"/>
<rect x="475" y="150" width="18" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
<rect x="498" y="163" width="18" height="37" class="dg-accent"/>
<text x="330" y="220" font-size="11">범주1</text>
<text x="400" y="220" font-size="11">범주2</text>
<text x="470" y="220" font-size="11">범주3</text>
<text x="320" y="120" font-size="11" class="dg-dim">점선=사전 Dir(1,1,1)</text>
<text x="320" y="135" font-size="11">채움=사후 Dir(4,3,2)</text>
<text x="640" y="20" font-size="13">가우시안-가우시안</text>
<line x1="630" y1="200" x2="880" y2="200" class="dg-line" stroke-width="1"/>
<path d="M640,200 Q715,55 790,200" fill="none" class="dg-dim" stroke-width="2" stroke-dasharray="6,4"/>
<path d="M735,200 Q800,35 855,200" fill="none" class="dg-stroke-accent" stroke-width="2.5"/>
<text x="640" y="80" font-size="11" class="dg-dim">사전 N(0,1)</text>
<text x="770" y="45" font-size="11">사후 N(1,0.5)</text>
</svg>

_세 켤레쌍 모두 사전분포(점선)에 관측을 반영하면 사후분포(굵은선/채움)가 좁아지고 이동한다._

## 문제
이 커널은 베타분포의 정의와 정확히 같은 형태이므로 정규화하면 사후분포는 $\theta\mid x\sim\mathrm{Beta}($==빈칸==$)$ 이다.

## 해설
베타분포 $\mathrm{Beta}(a,b)$의 커널은 $\theta^{a-1}(1-\theta)^{b-1}$이므로 지수를 비교하면 $a-1=x+\alpha-1,\ b-1=n-x+\beta-1$에서 $a=\alpha+x,\ b=\beta+n-x$를 얻습니다.

**정답: $\alpha+x,\ \beta+n-x$**

## 예시
세 가지 켤레성을 구체적 숫자로 각각 확인해본다.

**베타-이항.** 사전분포 $\theta\sim\mathrm{Beta}(2,2)$ 에서 $n=10$번 시행 중 $x=7$번 성공했다면, 공식대로 사후분포는 $\mathrm{Beta}(2+7,\,2+10-7)=\mathrm{Beta}(9,5)$ 이다.

**디리클레-다항.** $K=3$개 범주에 사전분포 $\pi\sim\mathrm{Dir}(1,1,1)$, 관측이 $n=6$번 시행에서 $(x_1,x_2,x_3)=(3,2,1)$이었다면 사후분포는 $\mathrm{Dir}(1+3,\,1+2,\,1+1)=\mathrm{Dir}(4,3,2)$ 이다.

**가우시안-가우시안.** 사전분포 $\mu\sim N(0,1)$, 관측분산 $\sigma^2=4$, $n=4$개 관측의 평균이 $\bar x=2$라면 $\tau_n^2=1/(1/1+4/4)=1/2$, $\mu_n=\tfrac12\left(0/1+4\cdot2/4\right)=\tfrac12\cdot2=1$ 이므로 사후분포는 $N(1,\,0.5)$ 이다.
