---
slug: cohort-triangle
theme: PRODUCT
domainLabel: 서비스 · 프로덕트 분석
subLabel: 코호트 매트릭스
title: 코호트 삼각형: 가입월과 경과월을 교차시켜 세대별 곡선 비교하기
related: 코호트 안정화 지점 · RFM 분석
---

## 도입
행은 가입월, 열은 경과월(M0, M1, M2 등)이다. 칸 (i, j)에는 i월에 가입한 사용자 중 j개월 뒤에도 활성 상태인 비율이 들어간다. 가장 오래된 세대는 모든 경과월 칸을 채울 수 있지만 이번 달에 막 가입한 세대는 M0 칸 하나만 채울 수 있다. 아직 시간이 지나지 않아 관측 자체가 불가능한 칸은 비워둔다.

이 표를 열 방향으로 읽으면 가입 후 같은 개월 수가 지났을 때 세대마다 리텐션이 어떻게 다른지 비교할 수 있다. 최근 세대의 M1 값이 예전 세대보다 꾸준히 높아지고 있다면 온보딩 개선 효과가 실제로 작동하고 있다는 신호다. 대각선 방향으로 읽으면 특정 캘린더 월에 발생한 사건, 예를 들어 서버 장애나 대규모 프로모션이 여러 세대에 동시에 남긴 흔적을 찾을 수 있다.

단일 리텐션 곡선보다 나은 점은 분명하다. 신규 유입이 갑자기 늘거나 줄면 평균 곡선은 그 변화에 휩쓸려 왜곡되지만 코호트 삼각형은 세대를 분리해서 보기 때문에 유입 규모 변화와 리텐션 품질 변화를 구분해서 읽을 수 있다.

## 명제


## 그림
<svg viewBox="0 0 540 230" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="16" font-size="12">가입월 × 경과월 잔존율(%)</text>
<text x="150" y="38" font-size="12" text-anchor="middle">M0</text>
<text x="250" y="38" font-size="12" text-anchor="middle">M1</text>
<text x="350" y="38" font-size="12" text-anchor="middle">M2</text>
<text x="450" y="38" font-size="12" text-anchor="middle">M3</text>
<text x="50" y="69" font-size="12" text-anchor="middle">1월</text>
<text x="50" y="109" font-size="12" text-anchor="middle">2월</text>
<text x="50" y="149" font-size="12" text-anchor="middle">3월</text>
<text x="50" y="189" font-size="12" text-anchor="middle">4월</text>
<rect x="100" y="45" width="100" height="40" class="dg-dim"/><rect x="100" y="45" width="100" height="40" fill="none" class="dg-line" stroke-width="1"/><text x="150" y="69" font-size="12" text-anchor="middle">100</text>
<rect x="200" y="45" width="100" height="40" class="dg-dim"/><rect x="200" y="45" width="100" height="40" fill="none" class="dg-line" stroke-width="1"/><text x="250" y="69" font-size="12" text-anchor="middle">45</text>
<rect x="300" y="45" width="100" height="40" class="dg-dim"/><rect x="300" y="45" width="100" height="40" fill="none" class="dg-line" stroke-width="1"/><text x="350" y="69" font-size="12" text-anchor="middle">30</text>
<rect x="400" y="45" width="100" height="40" class="dg-dim"/><rect x="400" y="45" width="100" height="40" fill="none" class="dg-line" stroke-width="1"/><text x="450" y="69" font-size="12" text-anchor="middle">25</text>
<rect x="100" y="85" width="100" height="40" class="dg-dim"/><rect x="100" y="85" width="100" height="40" fill="none" class="dg-line" stroke-width="1"/><text x="150" y="109" font-size="12" text-anchor="middle">100</text>
<rect x="200" y="85" width="100" height="40" class="dg-dim"/><rect x="200" y="85" width="100" height="40" fill="none" class="dg-line" stroke-width="1"/><text x="250" y="109" font-size="12" text-anchor="middle">50</text>
<rect x="300" y="85" width="100" height="40" class="dg-dim"/><rect x="300" y="85" width="100" height="40" fill="none" class="dg-line" stroke-width="1"/><text x="350" y="109" font-size="12" text-anchor="middle">35</text>
<rect x="400" y="85" width="100" height="40" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<rect x="100" y="125" width="100" height="40" class="dg-dim"/><rect x="100" y="125" width="100" height="40" fill="none" class="dg-line" stroke-width="1"/><text x="150" y="149" font-size="12" text-anchor="middle">100</text>
<rect x="200" y="125" width="100" height="40" class="dg-dim"/><rect x="200" y="125" width="100" height="40" fill="none" class="dg-line" stroke-width="1"/><text x="250" y="149" font-size="12" text-anchor="middle">55</text>
<rect x="300" y="125" width="100" height="40" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<rect x="400" y="125" width="100" height="40" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<rect x="100" y="165" width="100" height="40" class="dg-dim"/><rect x="100" y="165" width="100" height="40" fill="none" class="dg-line" stroke-width="1"/><text x="150" y="189" font-size="12" text-anchor="middle">100</text>
<rect x="200" y="165" width="100" height="40" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<rect x="300" y="165" width="100" height="40" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<rect x="400" y="165" width="100" height="40" fill="none" class="dg-line" stroke-width="1" stroke-dasharray="3,3"/>
<polyline points="500,45 500,85 400,85 400,125 300,125 300,165 200,165 200,205" fill="none" class="dg-stroke-accent" stroke-width="2" stroke-dasharray="5,3"/>
<text x="505" y="215" font-size="11" class="dg-dim" text-anchor="end">관측 경계</text>
</svg>

_가입월이 최근일수록 아직 관측되지 않은 경과월 칸이 늘어나 표가 삼각형 모양이 된다._

## 문제
각 코호트의 가입자 수에 지금 위치한 칸의 리텐션 비율을 곱하면 현재 시점에 활성 상태인 사용자 수가 나온다. 1월 코호트는 $1000\times0.25=$==빈칸==명, 2월 코호트는 $1200\times0.35=$[[blank:나]]명, 3월 코호트는 $900\times0.55=$[[blank:다]]명이 지금도 활성 상태다.

## 해설
가입자 1000명에 M3 리텐션 25%를 곱한 값이기 때문이에요.

**정답: $250$**

## 예시
1월 신규 가입자는 1000명이고 M1 리텐션 45%, M2 30%, M3 25%까지 모두 관측됐다. 2월 신규 가입자는 1200명이고 M1 50%, M2 35%까지만 관측됐다. 3월 신규 가입자 900명은 M1 55%까지만, 이번 달 가입자 1100명은 M0 100%만 관측된 상태다.

M1 값만 세대별로 나열하면 45%, 50%, 55%로 최근 세대일수록 꾸준히 오르고 있다. 아직 M2, M3를 확인할 수 없는 최근 세대라도 이 추세가 이어진다면 장기 리텐션도 개선될 가능성이 높다고 조심스럽게 예상할 수 있다.
