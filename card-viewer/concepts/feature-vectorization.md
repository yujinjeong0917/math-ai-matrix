---
slug: feature-vectorization
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 콘텐츠 기반 필터링
title: 특징 벡터화: 텍스트와 메타데이터를 숫자로 바꾸기
related: 콘텐츠 유사도 추천 · 신규 아이템 콜드스타트
---

## 도입
고전적인 방법은 TF-IDF다. 문서 $d$에서 단어 $t$의 가중치를 $TFIDF(t,d) = tf(t,d) \times \log\frac{N}{df(t)}$로 계산하는데 $tf(t,d)$는 그 문서 안에서 단어가 등장한 빈도고 $N$은 전체 문서 수 $df(t)$는 그 단어가 등장한 문서 수다. 한 문서 안에서 자주 나오면서도 다른 문서에서는 드물게 나오는 단어일수록 그 문서를 특징짓는 단어로 보고 가중치를 높게 준다. 결과는 어휘 사전 크기만큼 차원을 가지지만 대부분이 0인 희소 벡터가 된다.

최근에는 신경망 기반 임베딩을 더 널리 쓴다. 단어나 문장을 사전학습된 인코더에 통과시키면 의미가 비슷한 표현이 벡터 공간에서도 가깝게 놓이는 조밀한 벡터를 얻는다. TF-IDF는 정확히 같은 단어가 겹쳐야만 유사도를 인식하지만 임베딩은 단어가 달라도 의미가 비슷하면 가깝게 배치되므로 동의어나 바꿔 쓴 표현까지 포착할 수 있다.

텍스트뿐 아니라 카테고리나 가격대 같은 정형 메타데이터도 원핫 인코딩 같은 방식으로 숫자 벡터로 바꾼 뒤 텍스트 벡터와 이어붙여 아이템 하나를 대표하는 특징 벡터를 완성한다. 이렇게 만든 벡터가 이후 콘텐츠 유사도 추천의 재료가 된다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="140" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="90" y="41" text-anchor="middle" font-size="12">제목·설명·태그</text>
<text x="90" y="58" text-anchor="middle" font-size="11" class="dg-dim">원본 텍스트·메타데이터</text>
<line x1="160" y1="45" x2="210" y2="45" class="dg-line" stroke-width="1.5"/>
<rect x="210" y="20" width="140" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="280" y="41" text-anchor="middle" font-size="12">TF-IDF·임베딩</text>
<text x="280" y="58" text-anchor="middle" font-size="11" class="dg-dim">수치 벡터화</text>
<line x1="350" y1="45" x2="400" y2="45" class="dg-line" stroke-width="1.5"/>
<rect x="400" y="20" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="460" y="41" text-anchor="middle" font-size="12">특징 벡터 v</text>
<text x="460" y="58" text-anchor="middle" font-size="11" class="dg-dim">[0.1, 0.0, 0.8, ...]</text>
<rect x="20" y="120" width="120" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="80" y="150" text-anchor="middle" font-size="12">다른 아이템 벡터</text>
<line x1="140" y1="145" x2="400" y2="90" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="270" y="115" text-anchor="middle" font-size="11" class="dg-dim">코사인 유사도 비교</text>
</svg>

_텍스트와 메타데이터를 벡터로 바꾸면 아이템끼리 코사인 유사도로 비교할 수 있다._

## 문제
단어 A의 가중치를 구하려면 먼저 $\log\dfrac{N}{df(A)} = \log\dfrac{100}{100} = \log 1$을 계산해야 하는데, 로그의 밑이 무엇이든 이 값은 ==빈칸==이다.

## 해설
로그함수는 진수가 1일 때 밑에 관계없이 항상 0을 돌려주기 때문이에요.

**정답: $0$**

## 예시

