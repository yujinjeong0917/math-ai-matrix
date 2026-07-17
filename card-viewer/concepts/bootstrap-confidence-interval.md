---
slug: bootstrap-confidence-interval
theme: STAT
domainLabel: 추론통계
subLabel: 신뢰구간 · 순차분석
title: 부트스트랩 신뢰구간: 재표집 분포와 백분위수법
hook: MLE의 점근정규성처럼 표집분포를 분석적으로 유도하기 어려운 통계량도 많습니다(중앙값, 상관계수, 복잡한 함수 등).
related: 
---

## 기본설명
$X_1,\dots,X_n\stackrel{iid}\sim F$, 통계량 $\hat\theta=T(X_1,\dots,X_n)$이라 하자. 경험분포 $\hat F_n$(각 관측값에 확률 $1/n$을 부여하는 분포)에서 복원추출로 크기 $n$인 재표집을 $B$번 반복해 얻은 $\hat\theta^*_1,\dots,\hat\theta^*_B$의 경험분포는, $B\to\infty$일 때 $\hat\theta$의 (조건부) 재표집분포 $P^*(T(X_1^*,\dots,X_n^*)\le t\mid\hat F_n)$로 수렴한다. 이 분포의 $\alpha/2$, $1-\alpha/2$ 분위수로 만든 구간(백분위수법)은, $\hat F_n$이 $F$를 잘 근사하는 한 근사적으로 신뢰수준 $1-\alpha$의 신뢰구간이 된다.

## 문제
왜 $\hat F_n$이 $F$의 좋은 근사인가? Glivenko–Cantelli 정리에 의하면 $n\to\infty$일 때 $\sup_x|\hat F_n(x)-F(x)|\to$==빈칸==(거의 확실히) 이다. 즉 표본이 커질수록 경험분포는 균등하게 참 분포에 수렴하므로, $\hat F_n$에서 재표집한 통계량의 분포는 $F$에서 직접 뽑았을 때의 참 표집분포에 점점 가까워진다.

## 해설
Glivenko–Cantelli 정리(경험분포함수의 기본정리)는 경험분포함수가 참 분포함수에 균등하게(sup-norm으로) 거의 확실히 수렴한다는 것으로, 그 극한값이 0입니다.

**정답: $0$**

## 예시
극단적으로 작은 표본으로 부트스트랩 절차를 손으로 완전히 재현해봅니다. 원자료가 $n=3$개, $\{2,4,9\}$이고 관심 통계량은 표본평균 $\hat\theta=(2+4+9)/3=5$라 합시다.

복원추출로 크기 3인 재표집을 뽑는 경우의 수는 $3^3=27$가지이고 모두 동일 확률(각 $1/27$)입니다. 어떤 값을 몇 번 뽑았는지(중복 허용 조합)에 따라 평균이 정해지므로, 가능한 평균과 그 확률을 전부 나열할 수 있습니다.
<table style="border-collapse:collapse;margin:0.5em 0;">
<tr><td style="padding:2px 10px;border-bottom:1px solid #8884;">재표집 평균</td><td style="padding:2px 10px;border-bottom:1px solid #8884;">확률</td><td style="padding:2px 10px;border-bottom:1px solid #8884;">누적확률</td></tr>
<tr><td style="padding:2px 10px;">2</td><td style="padding:2px 10px;">1/27</td><td style="padding:2px 10px;">0.037</td></tr>
<tr><td style="padding:2px 10px;">8/3≈2.667</td><td style="padding:2px 10px;">3/27</td><td style="padding:2px 10px;">0.148</td></tr>
<tr><td style="padding:2px 10px;">10/3≈3.333</td><td style="padding:2px 10px;">3/27</td><td style="padding:2px 10px;">0.259</td></tr>
<tr><td style="padding:2px 10px;">4</td><td style="padding:2px 10px;">1/27</td><td style="padding:2px 10px;">0.296</td></tr>
<tr><td style="padding:2px 10px;">13/3≈4.333</td><td style="padding:2px 10px;">3/27</td><td style="padding:2px 10px;">0.407</td></tr>
<tr><td style="padding:2px 10px;">5</td><td style="padding:2px 10px;">6/27</td><td style="padding:2px 10px;">0.630</td></tr>
<tr><td style="padding:2px 10px;">17/3≈5.667</td><td style="padding:2px 10px;">3/27</td><td style="padding:2px 10px;">0.741</td></tr>
<tr><td style="padding:2px 10px;">20/3≈6.667</td><td style="padding:2px 10px;">3/27</td><td style="padding:2px 10px;">0.852</td></tr>
<tr><td style="padding:2px 10px;">22/3≈7.333</td><td style="padding:2px 10px;">3/27</td><td style="padding:2px 10px;">0.963</td></tr>
<tr><td style="padding:2px 10px;">9</td><td style="padding:2px 10px;">1/27</td><td style="padding:2px 10px;">1.000</td></tr>
</table>
90% 백분위수법 신뢰구간을 만들려면 누적확률이 처음 $0.05$를 넘는 값(하한)과 처음 $0.95$를 넘는 값(상한)을 찾으면 됩니다. 표를 보면 하한은 $8/3\approx2.667$(누적 0.148), 상한은 $22/3\approx7.333$(누적 0.963)이므로 $CI\approx(2.667,\ 7.333)$ 입니다. $n=3$이라 구간이 매우 거칠지만, 절차 자체는 $n$이 수백~수천이고 $B$가 커도 완전히 동일합니다.
