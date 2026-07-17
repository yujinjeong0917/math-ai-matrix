---
slug: bootstrap-bagging
theme: PROB
domainLabel: 확률 · 통계
subLabel: 표집 · 불확실성
title: 부트스트랩(배깅)의 63.2% 규칙
related: 
---

## 도입
배깅은 원본 데이터에서 복원추출로 크기 $n$인 표본을 여러 번 뽑아 각각 모델을 학습시키는 기법입니다. 복원추출이다 보니 한 번 뽑을 때 같은 데이터가 여러 번 뽑힐 수도 있고 아예 한 번도 안 뽑히는 데이터도 생깁니다. 이렇게 뽑히지 않은 데이터를 OOB(out-of-bag) 데이터라 부르고 검증용으로 재활용합니다. 표본 크기 $n$이 커지면 한 데이터가 뽑히지 않을 확률은 어떤 값에 가까워질까요.

## 명제
크기 $n$인 데이터에서 크기 $n$인 부트스트랩 표본을 복원추출로 뽑을 때, 특정 데이터 하나가 표본에 전혀 뽑히지 않을 확률은 $n\to\infty$일 때 $1/e$로 수렴한다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="20" font-size="12" class="dg-dim">원본 데이터</text>
  <text x="10" y="205" font-size="12" class="dg-dim">부트스트랩 표본(복원추출 8회)</text>
  <line x1="220" y1="170" x2="220" y2="50" class="dg-stroke-accent" stroke-width="2.5"/>
  <line x1="220" y1="170" x2="220" y2="50" class="dg-stroke-accent" stroke-width="2.5" transform="translate(3,0)"/>
  <line x1="220" y1="170" x2="220" y2="50" class="dg-stroke-accent" stroke-width="2.5" transform="translate(-3,0)"/>
  <line x1="60" y1="170" x2="60" y2="50" class="dg-stroke-ink" stroke-width="1.6"/>
  <line x1="380" y1="170" x2="380" y2="50" class="dg-stroke-accent" stroke-width="2.5" transform="translate(3,0)"/>
  <line x1="380" y1="170" x2="380" y2="50" class="dg-stroke-accent" stroke-width="2.5" transform="translate(-3,0)"/>
  <line x1="540" y1="170" x2="540" y2="50" class="dg-stroke-ink" stroke-width="1.6"/>
  <line x1="620" y1="170" x2="620" y2="50" class="dg-stroke-ink" stroke-width="1.6"/>
  <g>
    <circle cx="60" cy="50" r="12" class="dg-dim"/>
    <circle cx="140" cy="50" r="12" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
    <circle cx="220" cy="50" r="15" class="dg-accent"/>
    <circle cx="300" cy="50" r="12" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
    <circle cx="380" cy="50" r="14" class="dg-accent"/>
    <circle cx="460" cy="50" r="12" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
    <circle cx="540" cy="50" r="12" class="dg-dim"/>
    <circle cx="620" cy="50" r="12" class="dg-dim"/>
  </g>
  <text x="55" y="55" font-size="11">1</text>
  <text x="135" y="55" font-size="11">2</text>
  <text x="215" y="56" font-size="12" font-weight="700">3</text>
  <text x="295" y="55" font-size="11">4</text>
  <text x="375" y="56" font-size="12" font-weight="700">5</text>
  <text x="455" y="55" font-size="11">6</text>
  <text x="535" y="55" font-size="11">7</text>
  <text x="615" y="55" font-size="11">8</text>
  <text x="205" y="30" font-size="11" font-weight="700">×3 중복</text>
  <text x="360" y="30" font-size="11" font-weight="700">×2 중복</text>
  <text x="118" y="95" font-size="10" class="dg-dim">OOB</text>
  <text x="278" y="95" font-size="10" class="dg-dim">OOB</text>
  <text x="438" y="95" font-size="10" class="dg-dim">OOB</text>
  <g>
    <rect x="50" y="163" width="20" height="14" class="dg-dim"/>
    <rect x="210" y="163" width="20" height="14" class="dg-dim"/>
    <rect x="370" y="163" width="20" height="14" class="dg-dim"/>
    <rect x="530" y="163" width="20" height="14" class="dg-dim"/>
    <rect x="610" y="163" width="20" height="14" class="dg-dim"/>
  </g>
  <text x="55" y="174" font-size="10">3</text>
  <text x="215" y="174" font-size="10">1</text>
  <text x="375" y="174" font-size="10">7</text>
  <text x="533" y="174" font-size="10">3</text>
  <text x="613" y="174" font-size="10">5</text>
</svg>

_원본 점 8개 중 3번·5번은 복원추출로 여러 번 뽑혀 굵은 강조선으로 표시되고, 2·4·6번은 한 번도 뽑히지 않아 점선 원(OOB)으로 남는다._

## 문제
지금 목표는 부트스트랩 표본을 뽑을 때 특정 데이터 하나가 단 한 번도 뽑히지 않을 확률이 $n$이 커지면서 어떤 값으로 향하는지 확인하는 것이다. 이걸 보려면 먼저 한 번의 추출에서 그 데이터가 뽑히지 않을 확률부터 구해야 한다. 데이터는 모두 $n$개이고 매번 그중 하나를 균등한 확률로 복원추출한다.

특정 데이터 하나가 한 번의 추출에서 뽑힐 확률은 $\frac1n$이므로 뽑히지 않을 확률은 $q = $==빈칸== 이다.

## 해설
전체 확률은 1이다. 뽑힐 확률 $1/n$을 빼면 뽑히지 않을 확률이 남는다. 여사건의 확률을 구하는 가장 기본적인 방법이다.

**정답: $1-\frac{1}{n}$**

## 예시
극한값 $1/e$로 정말 수렴하는지 $n$을 키워가며 직접 확인해봅니다.

특정 데이터 하나가 크기 $n$인 부트스트랩 표본에 한 번도 뽑히지 않을 확률은 $P_n=(1-1/n)^n$입니다. $n$을 늘려가며 이 값을 계산해봅니다.
$$n=5:\ (0.8)^5\approx0.328,\qquad n=20:\ (0.95)^{20}\approx0.358,\qquad n=100:\ (0.99)^{100}\approx0.366$$
$n$이 커질수록 값이 점점 한 방향으로 다가갑니다. 실제로 극한값은 $1/e\approx0.368$입니다.
$$0.328 \to 0.358 \to 0.366 \to \cdots \to \frac1e\approx0.368$$
표본 크기가 5만 되어도 이미 극한값에 상당히 가까워지고, 100쯤 되면 거의 차이가 없어집니다. 아래 증명은 이 수렴이 특정 $n$에서 우연히 가까워 보이는 게 아니라 $n\to\infty$일 때 정확히 $1/e$로 향한다는 사실을 지수극한 공식으로 보입니다.
