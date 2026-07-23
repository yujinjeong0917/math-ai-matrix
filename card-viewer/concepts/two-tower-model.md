---
slug: two-tower-model
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 임베딩기반 검색
title: Two-Tower 모델: 사용자와 아이템을 각자의 탑에서 임베딩하기
related: ANN 검색 · Matrix Factorization · Wide&Deep
---

## 도입
점수는 두 탑이 각자 만든 벡터의 내적입니다.
$$s(u,i) = f_\theta(x_u)^\top g_\phi(x_i)$$
$f_\theta$는 사용자 피처 $x_u$를 받는 사용자탑이고 $g_\phi$는 아이템 피처 $x_i$를 받는 아이템탑입니다. Matrix Factorization의 $p_u^\top q_i$와 형태는 같지만 벡터가 ID를 찾아보는 테이블이 아니라 피처를 인코딩하는 신경망에서 나온다는 점이 다릅니다. 학습은 보통 같은 배치 안의 다른 아이템을 부정샘플로 쓰는 소프트맥스 손실을 씁니다.
$$\mathcal{L} = -\log \frac{\exp(s(u,i^+))}{\sum_{j} \exp(s(u,i_j))}$$
Wide&Deep이나 DIN처럼 사용자 피처와 아이템 피처를 처음부터 한데 합쳐 층을 쌓는 랭킹 모델은 정확도가 높지만 사용자 하나를 채점하려면 후보 아이템마다 신경망을 다시 통과시켜야 합니다. 후보가 수백만 개라면 요청마다 이 계산을 감당할 수 없습니다.

Two-Tower는 두 탑을 마지막 내적 전까지 완전히 분리해둡니다. 대신 피처를 섞어 상호작용을 학습하는 표현력은 일부 포기합니다. 그 대가로 아이템탑은 전체 카탈로그에 대해 오프라인에서 한 번만 돌려 벡터를 미리 저장해둘 수 있고 요청이 올 때는 사용자탑만 실행해서 저장된 아이템 벡터들과 최근접 이웃 검색으로 비교하면 됩니다. 그래서 Two-Tower는 후보를 좁히는 첫 단계로 쓰이고 좁혀진 후보를 다시 세밀하게 줄세우는 일은 피처를 섞는 무거운 랭킹 모델이 맡습니다.

## 명제


## 그림
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="160" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="110" y="42" font-size="12" text-anchor="middle">사용자 피처</text>
<line x1="110" y1="54" x2="110" y2="80" class="dg-line" stroke-width="1.5"/>
<rect x="30" y="80" width="160" height="34" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="110" y="102" font-size="12" text-anchor="middle">사용자 타워</text>
<line x1="110" y1="114" x2="110" y2="150" class="dg-line" stroke-width="1.5"/>
<circle cx="110" cy="168" r="16" class="dg-accent"/>
<text x="110" y="200" font-size="12" text-anchor="middle">u 벡터</text>
<rect x="430" y="20" width="160" height="34" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="510" y="42" font-size="12" text-anchor="middle">아이템 피처</text>
<line x1="510" y1="54" x2="510" y2="80" class="dg-line" stroke-width="1.5"/>
<rect x="430" y="80" width="160" height="34" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<text x="510" y="102" font-size="12" text-anchor="middle">아이템 타워</text>
<line x1="510" y1="114" x2="510" y2="150" class="dg-line" stroke-width="1.5"/>
<circle cx="510" cy="168" r="16" class="dg-accent"/>
<text x="510" y="200" font-size="12" text-anchor="middle">i 벡터</text>
<line x1="126" y1="172" x2="290" y2="220" class="dg-stroke-ink" stroke-width="1.5"/>
<line x1="494" y1="172" x2="330" y2="220" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="310" y="240" font-size="13" text-anchor="middle">내적 s(u,i) = u·i</text>
</svg>

_사용자탑과 아이템탑이 서로 다른 피처에서 독립적으로 벡터를 만들고 내적으로 점수를 낸다._

## 문제
이 식을 $s(u,i^+)$로 미분합니다. $\mathcal{L} = -s(u,i^+) + \log\sum_k\exp(s(u,i_k))$에서 앞항은 $s(u,i^+)$에 대해 선형이고 뒷항은 로그와 지수함수의 합성이므로 각각 미분한 뒤 더하면 $\dfrac{\partial \mathcal{L}}{\partial s(u,i^+)}=$==빈칸== 입니다.

## 해설
앞항 -s(u,i^+)의 미분은 -1이고, 뒷항은 로그와 지수함수의 연쇄법칙에 의해 exp(s(u,i^+))/∑_k exp(s(u,i_k)) = p_{i^+}가 되어, 두 결과를 더하면 이 값이 나와요.

**정답: $p_{i^+}-1$**

## 예시

