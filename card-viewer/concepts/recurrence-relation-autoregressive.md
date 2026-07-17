---
slug: recurrence-relation-autoregressive
theme: DISC
domainLabel: 이산수학 · 그래프
subLabel: 알고리즘 기초
title: 오토리그레시브 재귀와 KV 캐시의 수학적 근거
related: 
---

## 도입
오토리그레시브 생성은 $p(x_t|x_{<t})$를 매 스텝 다시 계산해야 할 것 같지만, 실제로는 이전 스텝에서 이미 계산해 둔 값들을 그대로 재사용할 수 있다. 트랜스포머의 셀프어텐션에서 이것이 왜 가능한지, 인과적 마스킹(causal mask)의 구조로부터 확인해본다.

## 명제
인과적 마스킹을 쓰는 오토리그레시브 트랜스포머에서 위치 $i$의 은닉상태 $h_i^{(l)}$은 모든 층 $l$에서 $x_1,\dots,x_i$에만 의존하고, 그로부터 계산되는 키·값벡터 $K_i,V_i$는 시퀀스를 뒤로 더 이어붙여도 값이 바뀌지 않는다.

## 그림
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<text x="112" y="16" font-size="12" text-anchor="middle" class="dg-dim">인과적 마스킹 (쿼리 i가 키 j를 볼 수 있음: j≤i)</text>
<rect x="40" y="30" width="36" height="36" class="dg-accent" /><rect x="76" y="30" width="36" height="36" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="2,2" /><rect x="112" y="30" width="36" height="36" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="2,2" /><rect x="148" y="30" width="36" height="36" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="2,2" />
<rect x="40" y="66" width="36" height="36" class="dg-accent" /><rect x="76" y="66" width="36" height="36" class="dg-accent" /><rect x="112" y="66" width="36" height="36" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="2,2" /><rect x="148" y="66" width="36" height="36" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="2,2" />
<rect x="40" y="102" width="36" height="36" class="dg-accent" /><rect x="76" y="102" width="36" height="36" class="dg-accent" /><rect x="112" y="102" width="36" height="36" class="dg-accent" /><rect x="148" y="102" width="36" height="36" fill="none" class="dg-dim" stroke-width="1" stroke-dasharray="2,2" />
<rect x="40" y="138" width="36" height="36" class="dg-accent" /><rect x="76" y="138" width="36" height="36" class="dg-accent" /><rect x="112" y="138" width="36" height="36" class="dg-accent" /><rect x="148" y="138" width="36" height="36" class="dg-accent" />
<line x1="40" y1="30" x2="184" y2="30" class="dg-line" stroke-width="1" /><line x1="40" y1="66" x2="184" y2="66" class="dg-line" stroke-width="1" /><line x1="40" y1="102" x2="184" y2="102" class="dg-line" stroke-width="1" /><line x1="40" y1="138" x2="184" y2="138" class="dg-line" stroke-width="1" /><line x1="40" y1="174" x2="184" y2="174" class="dg-line" stroke-width="1" />
<line x1="40" y1="30" x2="40" y2="174" class="dg-line" stroke-width="1" /><line x1="76" y1="30" x2="76" y2="174" class="dg-line" stroke-width="1" /><line x1="112" y1="30" x2="112" y2="174" class="dg-line" stroke-width="1" /><line x1="148" y1="30" x2="148" y2="174" class="dg-line" stroke-width="1" /><line x1="184" y1="30" x2="184" y2="174" class="dg-line" stroke-width="1" />
<text x="20" y="195" font-size="10" class="dg-dim">채움=허용, 점선=마스킹됨</text>
<line x1="420" y1="60" x2="470" y2="60" class="dg-stroke-ink" stroke-width="1.5" />
<rect x="420" y="42" width="60" height="36" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="450" y="64" font-size="11" text-anchor="middle">K₁,V₁</text>
<rect x="490" y="42" width="60" height="36" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="520" y="64" font-size="11" text-anchor="middle">K₂,V₂</text>
<rect x="560" y="42" width="60" height="36" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="590" y="64" font-size="11" text-anchor="middle">K₃,V₃</text>
<rect x="630" y="42" width="55" height="36" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="4,3" />
<text x="657" y="64" font-size="11" text-anchor="middle">K₄,V₄</text>
<text x="420" y="26" font-size="11" class="dg-dim">캐시(재사용, 실선) + 신규(점선)</text>
<line x1="450" y1="80" x2="640" y2="130" class="dg-line" stroke-width="1.2" />
<line x1="520" y1="80" x2="640" y2="130" class="dg-line" stroke-width="1.2" />
<line x1="590" y1="80" x2="640" y2="130" class="dg-line" stroke-width="1.2" />
<line x1="657" y1="78" x2="640" y2="130" class="dg-stroke-accent" stroke-width="2" />
<rect x="580" y="130" width="120" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5" />
<text x="640" y="150" font-size="11" text-anchor="middle">t=4 어텐션 출력</text>
</svg>

_왼쪽: 쿼리 i는 j≤i인 키만 본다(하삼각). 오른쪽: 이전 K,V는 캐시에서 재사용하고 새 토큰의 K₄,V₄만 새로 계산._

## 문제
귀납가정에 의해 이 참조 대상인 $h_j^{(l)}$들은 각각 $x_1,\dots,x_j$에만 의존한다. $j\le i$이므로 $x_1,\dots,x_j$는 전부 $x_1,\dots,x_i$의 부분집합이다.

그러니 이 값들만으로 계산되는 $h_i^{(l+1)}$도 결국 ==빈칸== 에만 의존한다.

## 해설
$h_i^{(l+1)}$은 $j\le i$인 $h_j^{(l)}$들의 함수이고, 그 각각은 $x_1,\dots,x_j\subseteq\{x_1,\dots,x_i\}$에만 의존한다. 여러 부분집합에만 의존하는 값들을 조합해도 결과는 그 합집합인 $x_1,\dots,x_i$에만 의존한다.

**정답: $x_1,\dots,x_i$**

## 예시
귀납법 증명을 보기 전에 토큰 하나의 은닉표현이 뒤에 오는 토큰과 정말 무관한지 작은 예로 확인해본다.

"나는"이라는 첫 토큰의 은닉표현이 $h_1=(0.42,-0.17)$로 계산되었다고 하자. 인과적 마스킹 때문에 위치 1은 자기 자신만 볼 수 있으므로 이 값은 오직 "나는"이라는 토큰 자체에서만 나온다.

이제 문장을 "나는 오늘"로, 다시 "나는 오늘 학교"로 늘려가며 $h_1$을 다시 계산해도 위치 1은 여전히 뒤에 오는 "오늘"이나 "학교"를 들여다볼 수 없다.
$$h_1^{(t=1)}=h_1^{(t=2)}=h_1^{(t=3)}=(0.42,-0.17)$$
그러니 여기서 계산되는 키와 값 $K_1=W_Kh_1,\ V_1=W_Vh_1$도 문장이 아무리 길어져도 똑같은 값으로 남는다. 매 스텝 다시 계산하는 대신 처음 계산한 값을 그대로 저장해 재사용해도 결과가 달라지지 않는다는 뜻이다. 아래 증명은 이 불변성이 위치 1뿐 아니라 모든 층 모든 위치에서 인과적 마스킹만으로 항상 성립하는 사실임을 보인다.
