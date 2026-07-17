---
slug: equalized-odds-check
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 격차 진단
title: Equalized Odds 점검: 집단마다 오류율이 같은가
hook: 참양성률과 위양성률을 집단별로 정의한다.
related: 그룹별 성능 격차 · 반사실 공정성 · SHAP 기반 편향 소스 추적
---

## 기본설명
참양성률과 위양성률을 집단별로 정의한다.
$$\mathrm{TPR}_a = P(\hat Y=1 \mid Y=1, A=a), \qquad \mathrm{FPR}_a = P(\hat Y=1 \mid Y=0, A=a)$$
Equalized Odds는 이 두 값이 모든 집단 $a$에서 같아야 한다는 조건이다. 실무에서는 완전히 같기를 기대하기 어려우므로 집단 간 차이를 갭으로 측정한다.
$$\Delta_{\mathrm{TPR}} = |\mathrm{TPR}_a - \mathrm{TPR}_b|, \qquad \Delta_{\mathrm{FPR}} = |\mathrm{FPR}_a - \mathrm{FPR}_b|$$
두 갭이 모두 작아야 통과다. TPR만 맞추면 위양성이 한쪽 집단에 몰려 있어도 드러나지 않고 FPR만 맞추면 그 반대가 생긴다.

Equalized Odds와 disparate impact가 동시에 만족되기는 어렵다. 두 집단의 실제 기저율이 다르면 승인율을 맞추는 것과 오류율을 맞추는 것이 수학적으로 동시에 성립할 수 없다는 결과가 여러 공정성 지표 비교 연구에서 나왔다. 실무에서는 어떤 지표를 우선할지 문제 맥락에 따라 먼저 정해야 한다.

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
승인율만 비교하면 놓치는 게 있다. 실제로 상환을 잘할 사람과 못할 사람이 두 집단에서 다른 비율로 섞여 있을 수도 있기 때문이다. Equalized Odds는 승인율 자체가 아니라 모델이 맞고 틀리는 방식이 집단마다 같은지를 본다. 실제로 갚을 사람을 갚을 거라고 맞히는 비율과 못 갚을 사람을 잘못 승인해버리는 비율이 두 집단에서 비슷한가를 따진다.

정답 라벨이 있어야 계산할 수 있다는 점이 disparate impact와 다르다. 대출이면 실제 상환 여부, 채용이면 실제 업무 성과처럼 나중에 확인 가능한 결과가 있어야 오류율을 계산할 수 있다.


## 예시
집단 A는 $\mathrm{TPR}=0.82$, $\mathrm{FPR}=0.10$이고 집단 B는 $\mathrm{TPR}=0.65$, $\mathrm{FPR}=0.22$라고 하자.
$$\Delta_{\mathrm{TPR}} = |0.82-0.65| = 0.17, \qquad \Delta_{\mathrm{FPR}} = |0.10-0.22| = 0.12$$
승인율 자체는 얼추 비슷해 보여도 실제로 상환할 사람을 잘 잡아내는 비율과 상환 못 할 사람을 잘못 승인하는 비율 모두 집단 B에서 더 나쁘다. Disparate impact만 봤다면 놓쳤을 격차다.
