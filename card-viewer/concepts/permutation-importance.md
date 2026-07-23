---
slug: permutation-importance
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 특징 중요도
title: Permutation Importance: 특징을 섞어서 중요도 재기
related: Feature Ablation · 상태특징 중요도
---

## 도입
이미 학습이 끝난 모델 $f$와 평가 데이터 $(X,y)$, 성능 지표 $s$(정확도나 $R^2$ 등)가 있다고 하자. 원본 데이터에서의 점수 $s(f,X,y)$를 기준으로 삼고 특징 $j$번째 열만 무작위로 섞은 데이터 $X_{\pi_j}$에서의 점수를 다시 구해 $\mathrm{PI}_j = s(f,X,y) - \frac{1}{K}\sum_{k=1}^{K} s(f, X_{\pi_j^{(k)}}, y)$로 중요도를 정의한다.

한 번만 섞으면 우연히 운 나쁜 순열이 뽑혀 결과가 들쭉날쭉할 수 있으므로 섞는 과정을 $K$번 반복하고 평균 낸다. $\mathrm{PI}_j$가 크다는 것은 그 특징을 섞었을 때 성능이 많이 떨어졌다는 뜻이므로 모델이 그 특징에 많이 의존하고 있었다는 신호다.

이 방법의 장점은 모델을 재학습할 필요가 없고 트리든 신경망이든 어떤 모델에도 적용된다는 점이다. 다만 두 특징이 서로 강하게 상관되어 있으면 하나를 섞어도 남은 특징이 비슷한 정보를 대신 제공해서 중요도가 실제보다 낮게 나올 수 있다. 또한 섞은 데이터는 특징 간의 원래 결합분포를 깨뜨리기 때문에 모델이 한 번도 본 적 없는 비현실적인 조합을 평가하게 된다는 점도 해석에 주의가 필요한 부분이다.

## 명제


## 그림
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="200" x2="520" y2="200" class="dg-line" stroke-width="1.5"/>
<rect x="90" y="60" width="60" height="140" class="dg-accent"/>
<text x="120" y="50" font-size="12" text-anchor="middle">소득</text>
<text x="120" y="215" font-size="12" text-anchor="middle" class="dg-dim">0.18</text>
<rect x="220" y="150" width="60" height="50" class="dg-accent"/>
<text x="250" y="140" font-size="12" text-anchor="middle">지역</text>
<text x="250" y="215" font-size="12" text-anchor="middle" class="dg-dim">0.04</text>
<rect x="350" y="190" width="60" height="10" class="dg-dim"/>
<text x="380" y="180" font-size="12" text-anchor="middle">가입일</text>
<text x="380" y="215" font-size="12" text-anchor="middle" class="dg-dim">0.01</text>
<text x="60" y="30" font-size="12">특징을 섞었을 때 정확도 하락폭</text>
</svg>

_특징을 섞었을 때 성능이 많이 떨어질수록 그 특징이 중요하다._

## 문제
독립인 확률변수의 합의 분산은 각 분산의 합과 같다는 성질을 이용하면, $\mathrm{Var}\left(\sum_{k=1}^K s^{(k)}\right) = $==빈칸== 이다.

## 해설
독립인 확률변수들의 합의 분산은 각각의 분산을 그대로 더한 것과 같으므로, 분산 $\sigma^2$짜리 항을 $K$개 더하면 $K\sigma^2$이 돼요.

**정답: $K\sigma^2$**

## 예시
분류 정확도가 $0.90$인 모델이 있다고 하자. 소득 열만 무작위로 섞고 $K=5$번 반복해 평균 정확도를 재보니 $0.72$가 나왔다. 이 특징의 순열 중요도는 $\mathrm{PI}_{\text{소득}} = 0.90-0.72=0.18$이다. 같은 방식으로 지역 열을 섞었더니 평균 정확도가 $0.86$으로만 떨어졌다면 $\mathrm{PI}_{\text{지역}}=0.04$로 소득보다 훨씬 덜 중요한 특징이라는 뜻이다.
