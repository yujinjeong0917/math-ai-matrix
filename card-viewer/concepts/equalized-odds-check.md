---
slug: equalized-odds-check
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 격차 진단
title: Equalized Odds 점검: 집단마다 오류율이 같은가
related: 그룹별 성능 격차 · 반사실 공정성 · SHAP 기반 편향 소스 추적
---

## 도입
참양성률과 위양성률을 집단별로 정의한다.
$$\mathrm{TPR}_a = P(\hat Y=1 \mid Y=1, A=a), \qquad \mathrm{FPR}_a = P(\hat Y=1 \mid Y=0, A=a)$$
Equalized Odds는 이 두 값이 모든 집단 $a$에서 같아야 한다는 조건이다. 실무에서는 완전히 같기를 기대하기 어려우므로 집단 간 차이를 갭으로 측정한다.
$$\Delta_{\mathrm{TPR}} = |\mathrm{TPR}_a - \mathrm{TPR}_b|, \qquad \Delta_{\mathrm{FPR}} = |\mathrm{FPR}_a - \mathrm{FPR}_b|$$
두 갭이 모두 작아야 통과다. TPR만 맞추면 위양성이 한쪽 집단에 몰려 있어도 드러나지 않고 FPR만 맞추면 그 반대가 생긴다.

Equalized Odds와 disparate impact가 동시에 만족되기는 어렵다. 두 집단의 실제 기저율이 다르면 승인율을 맞추는 것과 오류율을 맞추는 것이 수학적으로 동시에 성립할 수 없다는 결과가 여러 공정성 지표 비교 연구에서 나왔다. 실무에서는 어떤 지표를 우선할지 문제 맥락에 따라 먼저 정해야 한다.

## 명제


## 그림
<svg viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="220" x2="540" y2="220" class="dg-line" stroke-width="1.5"/>
<rect x="90" y="97" width="50" height="123" class="dg-dim"/>
<rect x="160" y="122.5" width="50" height="97.5" class="dg-accent"/>
<text x="115" y="87" text-anchor="middle" font-size="12">0.82</text>
<text x="185" y="112.5" text-anchor="middle" font-size="12">0.65</text>
<text x="150" y="240" text-anchor="middle" font-size="12">참양성률(TPR)</text>
<rect x="330" y="205" width="50" height="15" class="dg-dim"/>
<rect x="400" y="187" width="50" height="33" class="dg-accent"/>
<text x="355" y="198" text-anchor="middle" font-size="12">0.10</text>
<text x="425" y="180" text-anchor="middle" font-size="12">0.22</text>
<text x="390" y="240" text-anchor="middle" font-size="12">위양성률(FPR)</text>
<text x="290" y="30" text-anchor="middle" font-size="13">회색 = 집단 A, 강조 = 집단 B</text>
</svg>

_TPR과 FPR 갭이 모두 작아야 두 집단의 오류율이 같다고 말할 수 있다._

## 문제
전확률 법칙에 따라 집단 A의 전체 승인율은 $P(\hat Y=1\mid A)=0.82\times 0.7+0.10\times 0.3=0.574+0.03=$ ==빈칸== 이다.

## 해설
0.574와 0.03을 더한 값이 0.604이기 때문이에요.

**정답: $0.604$**

## 예시
집단 A는 $\mathrm{TPR}=0.82$, $\mathrm{FPR}=0.10$이고 집단 B는 $\mathrm{TPR}=0.65$, $\mathrm{FPR}=0.22$라고 하자.
$$\Delta_{\mathrm{TPR}} = |0.82-0.65| = 0.17, \qquad \Delta_{\mathrm{FPR}} = |0.10-0.22| = 0.12$$
승인율 자체는 얼추 비슷해 보여도 실제로 상환할 사람을 잘 잡아내는 비율과 상환 못 할 사람을 잘못 승인하는 비율 모두 집단 B에서 더 나쁘다. Disparate impact만 봤다면 놓쳤을 격차다.
