---
slug: growth-loop
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 루프 구조
title: 그로스 루프: 출력이 다시 입력이 되는 순환 구조
related: 사이클 타임 · 바이럴 계수 K
---

## 도입
루프는 보통 네 단계로 나눠 본다. 입력은 지금 있는 사용자 규모, 행동은 사용자가 콘텐츠를 만들거나 친구를 초대하는 행위, 출력은 그 행동이 만들어낸 신규 방문이나 노출, 그리고 그 출력이 다시 입력으로 재투입되는 연결이다. 퍼널과 근본적으로 다른 점은 종착점의 위치다. 퍼널은 전환에서 끝나지만 루프의 종착점은 다음 루프의 시작점과 같다.

이 재투입 구조 때문에 루프는 선형이 아니라 복리로 커진다. 한 바퀴 돌 때마다 입력이 순증가율 $k$배로 불어난다면 $n$번째 바퀴 이후의 규모는 $N_n = N_0 \times k^n$을 따른다. $k > 1$이면 루프가 스스로 확장하고 $k < 1$이면 외부 유입 없이는 서서히 죽는다.

어떤 자원이 순환하느냐에 따라 루프 종류도 나뉜다. 사용자가 만든 콘텐츠가 검색엔진에 노출되어 새 방문자를 데려오는 콘텐츠 루프, 초대 자체가 동력인 바이럴 루프, 광고 수익으로 다시 광고를 사는 유료 루프, 고객 성공 사례가 다음 영업 자료가 되는 영업 루프가 대표적이다. 퍼널 최적화만으로는 이미 들어온 사용자를 더 잘 전환시키는 데는 강하지만 애초에 사용자를 어떻게 계속 데려올지에 대한 설계 원칙을 주지 못한다. 루프는 신규 유입 자체를 제품 구조 안에 내장시킨다.

## 명제


## 그림
<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg">
<rect x="190" y="20" width="100" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="240" y="45" font-size="12" text-anchor="middle">입력 (기존 사용자)</text>
<rect x="330" y="150" width="120" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="390" y="175" font-size="12" text-anchor="middle">행동 (초대·공유)</text>
<rect x="30" y="150" width="120" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="90" y="175" font-size="12" text-anchor="middle">출력 (신규 방문)</text>
<line x1="280" y1="55" x2="345" y2="150" class="dg-line" stroke-width="1.5"/>
<polygon points="345,150 332,140 336,155" class="dg-dim"/>
<line x1="330" y1="170" x2="150" y2="170" class="dg-line" stroke-width="1.5"/>
<polygon points="150,170 163,163 163,177" class="dg-dim"/>
<path d="M90,150 Q140,70 195,50" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<polygon points="195,50 182,53 190,63" class="dg-accent"/>
<text x="130" y="105" font-size="12">재투입</text>
<text x="240" y="230" font-size="13" text-anchor="middle">N_n = N_0 × k^n (k &gt; 1이면 확장)</text>
</svg>

_출력이 다시 입력으로 재투입되면서 루프가 스스로 반복된다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
전통적인 마케팅 퍼널은 위에서 아래로 한 방향으로만 흐른다. 광고를 보고 가입하고 결제하면 그걸로 끝이다. 그로스 루프는 이 끝을 다시 시작으로 연결한다. 기존 사용자의 행동, 예를 들어 친구 초대나 콘텐츠 공유가 새로운 사용자를 데려오고 그 새로운 사용자가 다시 같은 행동을 반복하면서 스스로 굴러가는 순환을 만든다.

이 순환 덕분에 광고비를 계속 태우지 않아도 성장이 이어질 수 있다.


## 예시
초기 사용자 100명이 있고 한 바퀴 돌 때마다 20%씩 순증가하는 루프라면 $k=1.2$다. 세 바퀴 뒤 규모는 $N_3 = 100 \times 1.2^3 = 100 \times 1.728 = 172.8$, 약 173명이다. 반대로 한 바퀴마다 10%씩 순감소하는 루프라면 $k=0.9$이고 세 바퀴 뒤 규모는 $100 \times 0.9^3 = 100 \times 0.729 = 72.9$, 약 73명으로 줄어든다.
