---
slug: real-time-feature-store
theme: RECSYS
domainLabel: 추천시스템 · 랭킹
subLabel: 대규모 서빙 아키텍처
title: 실시간 피처 스토어: 서빙 순간 최신 피처를 빠르게 조회하기
related: 2단계 구조 · ANN 인덱스 갱신
---

## 도입
피처 스토어는 보통 두 갈래로 나뉜다. 오프라인 스토어는 대량의 과거 데이터를 배치로 처리해 학습용 피처를 만들고 저장한다. 온라인 스토어는 서빙 순간에 밀리초 단위로 응답해야 하는 조회를 담당하며 지연시간이 짧은 키-값 저장소를 쓴다. 사용자 아이디나 아이템 아이디를 키로 두고 최신 피처 값을 값으로 저장해 하나의 조회로 바로 꺼내 쓴다.

피처는 갱신 주기에 따라 성격이 다르다. 사용자의 인구통계 정보처럼 거의 바뀌지 않는 피처는 배치로 하루에 한 번만 갱신해도 되지만 방금 클릭한 아이템이나 최근 5분간 조회수처럼 빠르게 바뀌는 피처는 스트리밍 파이프라인으로 실시간에 가깝게 갱신해야 한다. 실시간 피처 스토어는 이런 스트리밍 갱신을 받아 온라인 스토어에 즉시 반영하는 역할까지 포함하는 경우가 많다.

가장 신경 써야 할 문제는 학습-서빙 왜곡이다. 학습 때는 과거 로그를 배치로 계산한 피처 값을 쓰고 서빙 때는 실시간으로 계산한 값을 쓰는데 두 계산 로직이 미묘하게 다르면 모델이 학습 때 보지 못한 분포의 입력을 서빙 때 받게 되어 성능이 떨어진다. 피처 스토어는 같은 피처 정의를 오프라인과 온라인 양쪽에서 공유하도록 강제해 이 왜곡을 줄이는 것을 핵심 설계 목표로 삼는다.

## 명제


## 그림
<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="30" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="95" y="60" text-anchor="middle" font-size="12">배치 처리</text>
<text x="95" y="45" text-anchor="middle" font-size="11" class="dg-dim">과거 로그</text>
<rect x="20" y="110" width="150" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="95" y="140" text-anchor="middle" font-size="12">스트리밍</text>
<text x="95" y="125" text-anchor="middle" font-size="11" class="dg-dim">실시간 이벤트</text>
<line x1="170" y1="55" x2="270" y2="90" class="dg-line" stroke-width="1.5"/>
<line x1="170" y1="135" x2="270" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="270" y="70" width="150" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="345" y="95" text-anchor="middle" font-size="12">온라인 피처 스토어</text>
<text x="345" y="112" text-anchor="middle" font-size="11" class="dg-dim">키-값 저장소</text>
<line x1="420" y1="100" x2="480" y2="100" class="dg-line" stroke-width="1.5"/>
<rect x="480" y="75" width="140" height="50" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="550" y="105" text-anchor="middle" font-size="12">서빙 요청</text>
<text x="550" y="90" text-anchor="middle" font-size="11" class="dg-dim">밀리초 조회</text>
</svg>

_배치와 스트리밍으로 갱신된 피처를 온라인 스토어에 모아 서빙 순간 빠르게 조회한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
추천 모델은 사용자가 방금 클릭한 아이템, 지금 시간대, 최근 몇 분간의 행동 같은 최신 정보를 반영할수록 더 정확해진다. 하지만 이런 피처를 요청이 들어올 때마다 데이터베이스를 뒤져 처음부터 계산하면 응답이 느려진다. 실시간 피처 스토어는 자주 바뀌는 피처를 미리 계산해 아주 빠르게 조회할 수 있는 저장소에 따로 관리한다.

학습할 때 쓰는 피처와 서빙할 때 쓰는 피처가 같은 정의와 같은 값을 갖도록 맞추는 것도 이 저장소의 중요한 역할이다.


## 예시

