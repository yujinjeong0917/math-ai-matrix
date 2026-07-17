---
slug: natural-gradient-fisher
theme: NUMERIC
domainLabel: 수치해석 · 기하
subLabel: 기하 · 측도
title: 자연그래디언트와 피셔정보행렬: KL의 이차근사
related: 
---

## 도입
두 확률분포가 얼마나 다른지 재는 표준 척도는 KL발산입니다. 파라미터를 $\theta$에서 $\theta+d\theta$로 아주 살짝 바꿨을 때 이 KL발산이 어떤 모양으로 커지는지 알면, 파라미터공간의 걸음과 분포공간의 실제 변화 사이의 관계를 정확히 잡을 수 있습니다. 그 답이 바로 피셔정보행렬입니다.

## 명제
$D_{KL}(p_\theta\|p_{\theta+d\theta})$를 $d\theta$에 대해 이차까지 테일러전개하면 $D_{KL}(p_\theta\|p_{\theta+d\theta}) \approx \frac12 d\theta^TF(\theta)d\theta$이다. 여기서 $F(\theta)=\mathbb{E}_{p_\theta}[\nabla_\theta\log p_\theta(x)\nabla_\theta\log p_\theta(x)^T]$는 피셔정보행렬이다.

## 그림
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="40" x2="60" y2="180" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<line x1="60" y1="40" x2="200" y2="40" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<line x1="60" y1="180" x2="200" y2="180" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<line x1="200" y1="40" x2="200" y2="180" class="dg-line" stroke-width="1" stroke-dasharray="2,2"/>
<text x="60" y="30" font-size="10" class="dg-dim">파라미터공간 격자 (유클리드)</text>
<circle cx="130" cy="110" r="3" class="dg-stroke-ink"/>
<line x1="130" y1="110" x2="180" y2="70" class="dg-line" stroke-width="1.5"/>
<text x="185" y="65" font-size="10" class="dg-dim">∇J(θ)</text>
<text x="250" y="30" font-size="10" class="dg-dim">KL 계량으로 본 같은 격자</text>
<ellipse cx="330" cy="110" rx="90" ry="35" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3"/>
<ellipse cx="330" cy="110" rx="55" ry="21" fill="none" class="dg-stroke-accent" stroke-width="1.5" stroke-dasharray="4,3"/>
<circle cx="330" cy="110" r="3" class="dg-accent"/>
<line x1="330" y1="110" x2="368" y2="87" class="dg-line" stroke-width="1.5"/>
<text x="372" y="83" font-size="10" class="dg-dim">∇J(θ)</text>
<line x1="330" y1="110" x2="373" y2="130" class="dg-stroke-accent" stroke-width="2.5"/>
<polygon points="373,130 361,127 366,138" class="dg-stroke-accent"/>
<text x="378" y="145" font-size="10">F(θ)⁻¹∇J(θ)</text>
<text x="60" y="205" font-size="11">자연그래디언트는 곡률(피셔정보)을 보정한 방향</text>
</svg>

_같은 유클리드 그래디언트도 KL 계량의 곡률에 맞춰 보정하면 자연그래디언트 방향이 된다._

## 문제
$d\theta=0$이면 $p_{\theta+d\theta}=p_\theta$이므로 두 분포가 완전히 같다. 자기 자신과의 KL발산은 정의상 항상 0이다.

$f(0) = D_{KL}(p_\theta\|p_\theta) = $==빈칸== 이다.

## 해설
두 분포가 같으면 로그 안의 비율이 항상 1이 되어 적분값 전체가 0이 된다. KL발산의 정의에서 바로 나오는 성질이다.

**정답: $0$**

## 예시
피셔정보행렬이 KL발산의 이차근사와 정말 맞아떨어지는지 가장 단순한 베르누이분포로 확인해봅니다.

$p_\theta(x=1)=\theta$인 베르누이분포를 씁니다. $\theta=0.5$에서 $\theta+d\theta=0.6$으로 살짝 옮겨봅니다.
$$D_{KL}(p_{0.5}\|p_{0.6})=0.5\ln\frac{0.5}{0.6}+0.5\ln\frac{0.5}{0.4}=0.5(-0.18232)+0.5(0.22314)\approx0.02041$$
베르누이분포의 피셔정보는 $F(\theta)=1/(\theta(1-\theta))$이므로 $\theta=0.5$에서 $F(0.5)=1/0.25=4$입니다. 이차근사를 직접 계산하면 다음과 같습니다.
$$\frac12d\theta^2F(0.5)=\frac12(0.1)^2(4)=0.02$$
정확한 KL값 $0.02041$과 이차근사 $0.02$가 소수점 둘째 자리까지 거의 일치합니다. $d\theta$가 더 작아질수록 두 값의 차이는 더 빨리 사라집니다.

아래 증명은 이 근사가 우연히 잘 맞은 것이 아니라 테일러전개의 이차항이 항상 피셔정보행렬로 정확히 결정된다는 사실을 보입니다.
