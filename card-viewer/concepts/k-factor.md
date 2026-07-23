---
slug: k-factor
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 전환 · 참여 지표
title: K-factor: 한 사람이 새 사람을 몇 명이나 데려오는가
related: CAC · LTV:CAC 비율
---

## 도입
$K = i \times r$이다. $i$는 사용자 한 명이 보내는 평균 초대 수이고 $r$은 초대 하나가 실제 가입으로 이어질 확률이다. $K$가 1보다 크면 이론상 사용자 한 명이 자기 자신을 대체하고도 남는 새 사용자를 데려오는 셈이라 외부 마케팅 없이도 사용자 수가 스스로 늘어나는 구조가 된다. $K$가 1보다 작으면 바이럴만으로는 성장이 죽고 다른 유입 채널이 반드시 필요하다.

K-factor는 바이럴 사이클 타임, 즉 한 사용자가 초대해서 그 초대로 들어온 신규 사용자가 다시 활성화되기까지 걸리는 시간과 함께 봐야 진짜 의미가 있다. $K$가 1.2로 1을 넘어도 사이클이 6개월씩 걸린다면 체감되는 성장 속도는 매우 느리다. 반대로 $K$가 1.1로 낮아도 사이클이 며칠이면 짧은 기간에 여러 번 복리로 늘어나 체감 성장은 훨씬 빠를 수 있다.

흔한 함정은 K-factor가 한 번 1을 넘었다고 계속 유지된다고 믿는 것이다. 초대할 수 있는 주변 사람 풀 자체가 점점 소진되면 $i$가 자연히 줄어들어 $K$도 함께 낮아진다. 스팸 방지를 위해 초대 한도를 두면 $i$가 인위적으로 제한되어 실제 잠재력보다 낮은 $K$가 관측될 수도 있다. 또한 유료 광고로 유입된 사용자가 만든 초대까지 그대로 $K$ 계산에 섞으면 순수하게 자발적으로 퍼진 효과를 과대평가하게 된다.

## 명제


## 그림
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
<circle cx="140" cy="130" r="44" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="140" y="126" text-anchor="middle" font-size="12">기존 사용자</text>
<text x="140" y="142" text-anchor="middle" font-size="12">1명</text>
<path d="M 184 110 C 260 60, 340 60, 400 100" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="290" y="55" text-anchor="middle" font-size="12">초대 4건 × 전환율 30%</text>
<circle cx="420" cy="130" r="44" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="420" y="126" text-anchor="middle" font-size="12">신규 사용자</text>
<text x="420" y="142" text-anchor="middle" font-size="12">1.2명</text>
<path d="M 400 160 C 340 210, 260 210, 184 150" fill="none" class="dg-line" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="290" y="230" text-anchor="middle" font-size="12" class="dg-dim">다음 라운드에도 같은 비율로 반복된다</text>
<text x="290" y="20" text-anchor="middle" font-size="13">K = 1.2, 1명당 1명 넘게 데려와 순증가</text>
</svg>

_K가 1을 넘으면 한 바퀴 돌 때마다 사용자 수가 스스로 불어난다._

## 문제
한 사이클이 지나면 전체 사용자 수는 기존 $U$명과 새로 생긴 $U\times K$명을 더한 값이 되는데, 공통인수 $U$로 묶어 정리하면 $U_1=$==빈칸==가 된다.

## 해설
기존 사용자 U와 새로 늘어난 UK를 더한 U+UK에서 U를 공통으로 묶어내면 이렇게 정리돼요.

**정답: $U(1+K)$**

## 예시
사용자 한 명이 평균 4명을 초대하고 초대 하나가 가입으로 이어질 확률이 30%라면 $K=4\times0.3=1.2$다. 1보다 크므로 이론상 사용자 수는 외부 마케팅 없이도 스스로 늘어나는 국면에 있다.
