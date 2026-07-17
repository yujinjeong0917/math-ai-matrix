---
slug: mcp-protocol
theme: LLM
domainLabel: LLM/Agent
subLabel: 도구 사용 · 함수 호출
title: MCP: 도구와 데이터 소스를 표준 방식으로 모델에 연결하기
related: Function Calling · Tool Use 스키마 설계
---

## 도입
MCP는 클라이언트와 서버로 나뉘는 프로토콜이다. MCP 서버는 자신이 제공하는 기능을 표준화된 형식으로 노출한다. 호출 가능한 도구 파일이나 데이터베이스 행 같은 읽을 수 있는 자원 재사용 가능한 프롬프트 템플릿까지 포함한다. MCP 클라이언트는 모델을 품고 있는 애플리케이션 쪽에 붙어서 서버가 무엇을 제공하는지 확인하고 모델의 도구 호출이나 자원 조회를 이 표준 인터페이스를 거쳐 서버로 전달한다.

이 구조가 필요한 이유는 공통 규격이 없을 때 도구와 모델 애플리케이션을 연결하는 경우의 수가 도구 개수와 애플리케이션 개수를 곱한 만큼 늘어나기 때문이다. 각 조합마다 인증 방식과 인자 형식과 오류 처리 방식이 제각각이라 연동 코드도 따로 짜야 한다. MCP는 양쪽이 하나의 인터페이스에만 맞추게 해서 이 곱셈 문제를 덧셈 문제로 바꾼다. 서버를 만드는 쪽은 한 번만 구현하면 되고 클라이언트를 만드는 쪽도 한 번만 구현하면 모든 서버와 통할 수 있다. USB가 기기와 컴퓨터의 연결 방식을 표준화한 것과 같은 모양의 해법이다.

MCP는 특정 회사에 종속되지 않은 개방형 프로토콜로 공개되어 있고 커뮤니티가 만든 서버 구현이 빠르게 늘고 있다. 새 도구를 붙일 때마다 각 프레임워크용 연동 코드를 새로 짜는 대신 MCP 서버 하나만 만들어두면 이미 MCP를 지원하는 모든 클라이언트에서 바로 쓸 수 있다.

## 명제


## 그림
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="16" text-anchor="middle" font-size="12" class="dg-dim">MCP 이전: 연결마다 따로 구현</text>
<rect x="30" y="26" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="120" y="26" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="210" y="26" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="60" y="46" text-anchor="middle" font-size="12">앱1</text>
<text x="150" y="46" text-anchor="middle" font-size="12">앱2</text>
<text x="240" y="46" text-anchor="middle" font-size="12">앱3</text>
<rect x="30" y="210" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="120" y="210" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="210" y="210" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="60" y="230" text-anchor="middle" font-size="12">도구A</text>
<text x="150" y="230" text-anchor="middle" font-size="12">도구B</text>
<text x="240" y="230" text-anchor="middle" font-size="12">도구C</text>
<line x1="60" y1="56" x2="60" y2="210" class="dg-line" stroke-width="1"/>
<line x1="60" y1="56" x2="150" y2="210" class="dg-line" stroke-width="1"/>
<line x1="60" y1="56" x2="240" y2="210" class="dg-line" stroke-width="1"/>
<line x1="150" y1="56" x2="60" y2="210" class="dg-line" stroke-width="1"/>
<line x1="150" y1="56" x2="150" y2="210" class="dg-line" stroke-width="1"/>
<line x1="150" y1="56" x2="240" y2="210" class="dg-line" stroke-width="1"/>
<line x1="240" y1="56" x2="60" y2="210" class="dg-line" stroke-width="1"/>
<line x1="240" y1="56" x2="150" y2="210" class="dg-line" stroke-width="1"/>
<line x1="240" y1="56" x2="240" y2="210" class="dg-line" stroke-width="1"/>
<line x1="320" y1="20" x2="320" y2="240" class="dg-line" stroke-width="1"/>
<text x="480" y="16" text-anchor="middle" font-size="12" class="dg-dim">MCP 이후: 표준 인터페이스 하나</text>
<rect x="380" y="26" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="460" y="26" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="540" y="26" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="410" y="46" text-anchor="middle" font-size="12">앱1</text>
<text x="490" y="46" text-anchor="middle" font-size="12">앱2</text>
<text x="570" y="46" text-anchor="middle" font-size="12">앱3</text>
<rect x="440" y="110" width="120" height="40" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="500" y="134" text-anchor="middle" font-size="13">MCP</text>
<rect x="380" y="210" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="460" y="210" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="540" y="210" width="60" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="410" y="230" text-anchor="middle" font-size="12">도구A</text>
<text x="490" y="230" text-anchor="middle" font-size="12">도구B</text>
<text x="570" y="230" text-anchor="middle" font-size="12">도구C</text>
<line x1="410" y1="56" x2="470" y2="110" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="490" y1="56" x2="500" y2="110" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="570" y1="56" x2="530" y2="110" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="470" y1="150" x2="410" y2="210" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="500" y1="150" x2="490" y2="210" class="dg-stroke-accent" stroke-width="1.5"/>
<line x1="530" y1="150" x2="570" y2="210" class="dg-stroke-accent" stroke-width="1.5"/>
</svg>

_표준 없이 이어붙이면 연동 수가 도구 곱하기 앱만큼 늘지만 MCP는 하나의 표준 인터페이스로 연결을 단순화한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
캘린더 조회 메일 검색 코드 검색 사내 데이터베이스 조회 같은 도구를 다섯 개 만들었는데 이걸 서로 다른 세 가지 에이전트 프레임워크에서 쓰고 싶다고 하자. 표준이 없으면 도구마다 프레임워크마다 따로 연결 코드를 짜야 한다. 다섯 개 도구와 세 개 프레임워크면 열다섯 벌의 연동 코드가 필요할 수 있다. MCP는 도구를 만드는 쪽과 도구를 쓰는 쪽이 같은 규격을 따르게 해서 이 반복을 없앤다.


## 예시

