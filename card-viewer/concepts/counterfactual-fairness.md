---
slug: counterfactual-fairness
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 반사실 · 소스 추적
title: 반사실 공정성: 보호속성만 바꾸면 예측도 바뀌는가
related: 그룹별 성능 격차 · Equalized Odds 점검 · SHAP 기반 편향 소스 추적
---

## 도입
Kusner 등이 제시한 정의는 인과모델을 전제로 한다. 배경변수 $U$와 구조방정식 $F$로 이루어진 인과모델에서 보호속성 $A$를 개입으로 $a$에서 $a'$로 바꿨을 때 얻는 반사실 예측을 $\hat Y_{A \leftarrow a'}(U)$라 쓴다. 모델이 반사실적으로 공정하다는 것은 실제 관측된 $A=a, X=x$ 조건 아래에서 다음이 모든 $a'$에 대해 성립한다는 뜻이다.
$$P\big(\hat Y_{A \leftarrow a}(U) = y \mid X=x, A=a\big) = P\big(\hat Y_{A \leftarrow a'}(U) = y \mid X=x, A=a\big)$$
단순히 입력에서 보호속성을 빼는 방법은 이 조건을 만족시키지 못하는 경우가 많다. 우편번호처럼 보호속성의 인과적 결과물인 대리 특징이 남아 있으면 모델은 그 대리 특징을 통해 여전히 보호속성 정보를 간접적으로 쓰게 된다. 반사실 공정성을 확인하려면 어떤 특징이 보호속성의 결과인 대리 특징이고 어떤 특징이 보호속성과 무관하게 독립적으로 결정되는 특징인지 인과 그래프로 구분해야 한다.

실무에서는 완전한 인과모델을 구하기 어려운 경우가 많아 근사적으로 접근한다. 보호속성의 후손이 아닌 특징만 모델 입력으로 쓰거나 대리 특징에서 보호속성이 설명하는 부분을 제거한 잔차만 남기는 식이다. 어느 쪽이든 상관관계만으로는 부족하고 어떤 특징이 왜 보호속성과 얽혀 있는지에 대한 도메인 지식이 필요하다.

## 명제


## 그림
<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg">
<circle cx="80" cy="60" r="26" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="80" y="65" text-anchor="middle" font-size="12">A=여성</text>
<line x1="106" y1="60" x2="190" y2="60" class="dg-line" stroke-width="1.5"/>
<circle cx="220" cy="60" r="26" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="220" y="65" text-anchor="middle" font-size="12">우편번호</text>
<line x1="246" y1="60" x2="330" y2="60" class="dg-line" stroke-width="1.5"/>
<circle cx="360" cy="60" r="26" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="360" y="65" text-anchor="middle" font-size="12">Ŷ=승인</text>
<text x="220" y="20" text-anchor="middle" font-size="13">관측된 개체</text>
<circle cx="80" cy="180" r="26" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="80" y="185" text-anchor="middle" font-size="12">A=남성</text>
<line x1="106" y1="180" x2="190" y2="180" class="dg-line" stroke-width="1.5"/>
<circle cx="220" cy="180" r="26" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="220" y="185" text-anchor="middle" font-size="12">우편번호*</text>
<line x1="246" y1="180" x2="330" y2="180" class="dg-line" stroke-width="1.5"/>
<circle cx="360" cy="180" r="26" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="360" y="185" text-anchor="middle" font-size="12">Ŷ=?</text>
<text x="220" y="220" text-anchor="middle" font-size="13">인과 구조대로 다시 계산한 반사실 개체</text>
<text x="480" y="115" text-anchor="middle" font-size="12" class="dg-dim">두 Ŷ가 같아야</text>
<text x="480" y="133" text-anchor="middle" font-size="12" class="dg-dim">반사실적으로 공정</text>
</svg>

_보호속성만 인과적으로 바꿔 다시 계산해도 예측이 같아야 반사실적으로 공정하다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
한 사람을 그대로 복제하되 보호속성 하나만 바꿔본다고 생각해보자. 성별만 바뀐 쌍둥이, 인종만 바뀐 쌍둥이. 모델이 정말 공정하다면 이 가상의 쌍둥이에게도 원래 사람과 똑같은 예측을 내려야 한다. 반사실 공정성은 이 사고실험을 실제로 계산 가능한 조건으로 바꾼 것이다.

까다로운 부분은 보호속성만 바꾸고 나머지는 그대로 둔다는 게 생각보다 단순하지 않다는 점이다. 우편번호나 출신 학교처럼 보호속성과 인과적으로 얽힌 특징들은 보호속성이 바뀌면 같이 바뀌어야 앞뒤가 맞는다.


## 예시
대출모델에서 성별을 입력에서 뺐지만 우편번호가 남아 있고 우편번호가 실제로는 성별과 상관된 거주지역을 반영한다고 하자. 성별만 바꾼 반사실 개체를 만들 때 우편번호를 그대로 두면 모델은 우편번호를 통해 원래 성별 정보를 여전히 참고하게 되어 두 예측이 달라질 수 있다. 우편번호까지 인과적으로 다시 계산해야 진짜 반사실 비교가 된다.
