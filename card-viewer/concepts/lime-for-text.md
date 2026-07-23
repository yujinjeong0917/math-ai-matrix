---
slug: lime-for-text
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 교란 기반 설명
title: LIME for Text: 단어를 지워보며 근거를 찾기
related: Partition SHAP · Integrated Gradients(텍스트)
---

## 도입
LIME은 입력 문장을 단어가 있는지 없는지를 나타내는 이진벡터 $z' \in \{0,1\}^d$로 바꾼다. 이 벡터를 무작위로 뒤섞어 일부 단어를 지운 교란 샘플 $z$를 여러 개 만들고 각각을 원래 블랙박스 모델에 넣어 예측값 $f(z)$를 얻는다. 그다음 원문장과 얼마나 비슷한 교란인지(지운 단어 수가 적을수록 더 가깝다)에 따라 가중치 $\pi_x(z)$를 매기고 이 가중치를 반영한 선형회귀로 대리모델 $g$를 학습한다.

$\xi(x) = \arg\min_{g \in G} \sum_{z} \pi_x(z)\,\big(f(z) - g(z')\big)^2 + \Omega(g)$

여기서 $\Omega(g)$는 대리모델을 너무 복잡하게 만들지 않도록 거는 규제항이다. 학습된 선형모델의 계수가 곧 각 단어의 기여도가 된다. 모델 전체를 하나의 해석 가능한 형태로 통째로 근사하려던 이전 방식들은 국소적인 결정 경계를 제대로 못 담아냈는데 LIME은 딱 관심 있는 지점 주변만 근사한다는 점에서 이 문제를 피한다.

텍스트에서는 교란 공간이 연속적인 픽셀이나 특징값이 아니라 이산적인 단어 집합이라는 점이 이미지나 표 데이터와 다르다. 어떤 단어를 얼마나 자주 지울지, 교란 샘플을 몇 개나 뽑을지, 근접도 가중치를 어떻게 정의할지에 따라 같은 문장이라도 결과가 조금씩 달라질 수 있다는 한계가 있다. 이 불안정성은 이후 게임이론에 기반해 값이 유일하게 정해지는 SHAP 계열 방법들이 등장하는 배경이 된다.

## 명제


## 그림
<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="26" font-size="12">원문장</text>
<text x="90" y="26" font-size="13">연기는</text>
<text x="150" y="26" font-size="13">좋았지만</text>
<text x="220" y="26" font-size="13">스토리가</text>
<text x="290" y="26" font-size="13">지루했다</text>
<text x="460" y="26" font-size="12">f(x) = 0.81 (부정)</text>
<text x="20" y="62" font-size="12" class="dg-dim">교란 1</text>
<text x="90" y="62" font-size="13" class="dg-dim">[지움]</text>
<text x="150" y="62" font-size="13">좋았지만</text>
<text x="220" y="62" font-size="13">스토리가</text>
<text x="290" y="62" font-size="13">지루했다</text>
<text x="460" y="62" font-size="12">f(z) = 0.78</text>
<text x="20" y="98" font-size="12" class="dg-dim">교란 2</text>
<text x="90" y="98" font-size="13">연기는</text>
<text x="150" y="98" font-size="13">좋았지만</text>
<text x="220" y="98" font-size="13" class="dg-dim">[지움]</text>
<text x="290" y="98" font-size="13">지루했다</text>
<text x="460" y="98" font-size="12">f(z) = 0.55</text>
<text x="20" y="134" font-size="12" class="dg-dim">교란 3</text>
<text x="90" y="134" font-size="13">연기는</text>
<text x="150" y="134" font-size="13">좋았지만</text>
<text x="220" y="134" font-size="13">스토리가</text>
<text x="290" y="134" font-size="13" class="dg-dim">[지움]</text>
<text x="460" y="134" font-size="12">f(z) = 0.21</text>
<line x1="20" y1="150" x2="560" y2="150" class="dg-line" stroke-width="1.5"/>
<text x="20" y="170" font-size="12" class="dg-dim">단어별 가중치(선형회귀 계수 근사)</text>
<line x1="90" y1="264" x2="90" y2="182" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="90" y1="264" x2="560" y2="264" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="90" y="188" width="18" height="18" class="dg-dim"/>
<text x="118" y="201" font-size="12">연기는 (0.03)</text>
<rect x="90" y="212" width="156" height="18" class="dg-dim"/>
<text x="256" y="225" font-size="12">스토리가 (0.26)</text>
<rect x="90" y="236" width="360" height="18" class="dg-accent"/>
<text x="460" y="249" font-size="12">지루했다 (0.60)</text>
</svg>

_단어를 하나씩 지워가며 예측 변화를 관찰하고 그 변화에 선형모델을 맞춰 단어별 가중치를 근사한다._

## 문제
$f(1,1,1)$의 식에서 $f(0,1,1)$의 식을 변끼리 빼면 $z_2,z_3$ 항은 서로 상쇄되고 $\beta_1$ 항만 남는다: $\beta_1=f(1,1,1)-f(0,1,1)=0.81-0.78=$==빈칸==이다.

## 해설
두 식에서 다른 것은 $z_1$ 성분뿐이므로 차를 내면 나머지 계수는 소거되고 $\beta_1$만 남는데, 그 값이 곧 두 예측값의 차예요.

**정답: $0.03$**

## 예시
원문장 "연기는 좋았지만 스토리가 지루했다"의 부정 확률은 $f(x)=0.81$이다. 각 단어를 하나씩 지운 뒤 확률 변화를 보면 "연기는"을 지웠을 때는 $0.81 \to 0.78$로 거의 안 바뀌고 "스토리가"를 지웠을 때는 $0.81 \to 0.55$로 크게 떨어지고 "지루했다"를 지웠을 때는 $0.81 \to 0.21$로 가장 크게 떨어진다. 변화 폭이 클수록 그 단어에 실린 가중치가 크다는 뜻이므로 "지루했다"가 이 예측의 핵심 근거였다고 읽을 수 있다.
