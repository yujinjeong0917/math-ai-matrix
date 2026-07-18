---
slug: found-function-definition-intuition
theme: FOUND
domainLabel: 예비수학
subLabel: 예비수학 1부 · 수학의 언어 · 역함수가 존재하는 조건
title: 함수란 무엇인가
related: 방정식과 부등식 다시 보기 · 행렬 연산과 역행렬의 직관
---

## 도입
함수를 "$x$를 넣으면 $y$가 나오는 상자"로만 기억하고 있다면, 나중에 나오는 "가역적이다", "전단사다" 같은 말이 갑자기 낯설게 느껴질 수 있어요. 그런데 이 말들은 사실 아주 단순한 질문 하나에서 시작해요. 이 함수가 만든 결과를 보고, 원래 무엇을 넣었는지 되짚어갈 수 있는가.

정의역 $A$의 원소를 공역 $B$의 원소로 딱 하나씩 대응시키는 게 함수 $f:A\to B$예요. 이 대응을 거꾸로 되짚어가려면 두 가지가 필요해요. 서로 다른 입력이 같은 출력으로 겹치면 안 되고(단사, injective), 공역의 모든 원소가 어떤 입력의 결과여야 해요(전사, surjective). 이 둘을 모두 만족하는 함수를 전단사(bijective)라고 불러요.

이 감각은 나중에 정사각행렬이 역행렬을 가지려면 왜 그 행렬이 정의하는 변환이 전단사여야 하는지(정보 손실 없이 되돌릴 수 있어야 하는지)로 그대로 이어져요.

## 명제
함수 $f:A\to B$에 대해, $f$의 역함수 $f^{-1}:B\to A$(즉 $f^{-1}\circ f=\mathrm{id}_A$이고 $f\circ f^{-1}=\mathrm{id}_B$를 만족하는 함수)가 존재하는 것은 $f$가 전단사(단사이면서 전사)인 것과 동치이다.

## 그림
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
<text x="90" y="30" font-size="13" text-anchor="middle">A</text>
<text x="310" y="30" font-size="13" text-anchor="middle">B</text>
<circle cx="90" cy="70" r="4" class="dg-accent"/>
<circle cx="90" cy="120" r="4" class="dg-accent"/>
<circle cx="90" cy="170" r="4" class="dg-accent"/>
<circle cx="310" cy="70" r="4" class="dg-accent"/>
<circle cx="310" cy="120" r="4" class="dg-accent"/>
<circle cx="310" cy="170" r="4" class="dg-accent"/>
<line x1="94" y1="70" x2="306" y2="70" class="dg-stroke-accent" stroke-width="1.6"/>
<polygon points="306,70 296,65 296,75" class="dg-stroke-accent"/>
<line x1="94" y1="120" x2="306" y2="120" class="dg-stroke-accent" stroke-width="1.6"/>
<polygon points="306,120 296,115 296,125" class="dg-stroke-accent"/>
<line x1="94" y1="170" x2="306" y2="170" class="dg-stroke-accent" stroke-width="1.6"/>
<polygon points="306,170 296,165 296,175" class="dg-stroke-accent"/>
<line x1="306" y1="205" x2="94" y2="205" class="dg-line" stroke-width="1.4" stroke-dasharray="5,3"/>
<polygon points="94,205 104,200 104,210" class="dg-line"/>
<text x="200" y="220" font-size="11" class="dg-dim" text-anchor="middle">g=f⁻¹ (되돌리는 화살표)</text>
</svg>

_f가 전단사면 각 화살표를 거꾸로 되돌리는 대응 g=f⁻¹이 항상 함수로 존재한다._

## 문제
($\Rightarrow$) 먼저 단사임을 보인다. $g$가 $f$의 역함수이므로 모든 $a\in A$에 대해 $g(f(a))=a$이다. 이제 $f(a_1)=f(a_2)$라 하자. 양변에 $g$를 적용하면 $g(f(a_1))=g(f(a_2))$인데, 좌변은 $a_1$, 우변은 $a_2$이므로 $a_1=$==빈칸== 이다. 즉 출력이 같으면 입력도 같아야 하므로 $f$는 단사다.

## 해설
g(f(a))=a라는 역함수의 정의를 g(f(a₁))과 g(f(a₂)) 양쪽에 그대로 적용하면 좌변은 a₁, 우변은 a₂가 나와요. 두 값이 같다고 했으니 a₁=a₂가 성립해요.

**정답: $a_2$**

## 예시
$A=B=\{1,2,3\}$ 위에서 세 가지 대응을 비교해봅니다.

$f_1(1)=1,\,f_1(2)=2,\,f_1(3)=2$는 단사가 아니에요. $f_1(2)=f_1(3)=2$로 서로 다른 입력 $2,3$이 같은 출력 $2$를 내니까, 출력 $2$만 보고는 입력이 $2$였는지 $3$이었는지 되짚을 수 없어요. 역함수를 만들 수 없습니다.

$f_2(1)=1,\,f_2(2)=1,\,f_2(3)=3$도 마찬가지로 단사가 아니에요($f_2(1)=f_2(2)=1$). 게다가 출력 $2$에 도달하는 입력이 아예 없어서 전사도 아니에요.

$f_3(1)=2,\,f_3(2)=3,\,f_3(3)=1$은 세 입력이 세 출력에 하나씩 겹치지 않게 대응돼요(단사이자 전사, 전단사). 이 경우엔 역함수를 바로 만들 수 있어요. $f_3(1)=2$였으니 $f_3^{-1}(2)=1$, $f_3(2)=3$이었으니 $f_3^{-1}(3)=2$, $f_3(3)=1$이었으니 $f_3^{-1}(1)=3$이 돼요. 출력만 보고 정확히 어떤 입력이었는지 항상 유일하게 되짚어갈 수 있는 거예요.
