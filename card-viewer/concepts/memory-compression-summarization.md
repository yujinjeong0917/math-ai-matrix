---
slug: memory-compression-summarization
theme: LLM
domainLabel: LLM/Agent
subLabel: 메모리 · 상태관리
title: 메모리 압축: 쌓인 대화를 주기적으로 요약해서 줄이기
related: 단기 vs 장기 메모리 · 에이전트 상태 머신
---

## 도입
대화가 어느 정도 길이나 턴 수를 넘어서면 가장 최근 구간을 제외한 나머지 오래된 메시지들을 요약 단계로 보낸다. 흔히 같은 모델에게 그 구간을 핵심 사실과 결정 사항과 아직 해결되지 않은 항목 위주로 압축해달라고 시킨다. 이렇게 만든 요약이 원래의 여러 메시지를 대신해 컨텍스트에 남고 최근 구간은 그대로 이어붙인다. 대화가 다시 길어지면 이 과정을 반복하며 필요하면 요약을 다시 요약하는 식으로 계속 압축한다.

이 방식도 컨텍스트 윈도우의 고정 크기 한계를 다루지만 접근이 다르다. 필요할 때만 꺼내오는 장기 메모리 방식은 검색에서 놓치는 항목이 생길 위험이 있다. 압축은 정보 손실은 있어도 항상 무언가는 컨텍스트 안에 남겨둔다는 점이 다르다. 과거의 어느 부분이 나중에 중요해질지 예측하기 어려운 상황에서는 검색 실패 위험을 감수하기보다 손실이 있더라도 전체를 압축된 형태로나마 계속 곁에 두는 편이 안전할 때가 많다.

두 방식은 서로 대체재가 아니라 보완재에 가깝다. 실전에서는 전체 대화의 압축 요약을 계속 유지하면서 동시에 특정 과거 사실은 벡터 저장소에 따로 보관해 정확히 검색해오는 식으로 두 방식을 함께 쓰는 경우가 많다. 요약 과정 자체가 정보를 걸러내는 손실 압축이므로 계좌번호처럼 정확히 보존해야 하는 값은 요약하기 전에 구조화된 형태로 따로 추출해두는 습관이 손실을 줄여준다.

## 명제


## 그림
<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="18" text-anchor="middle" font-size="12" class="dg-dim">압축 전</text>
<rect x="30" y="30" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="85" y="30" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="140" y="30" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="195" y="30" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="250" y="30" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="52" y="50" text-anchor="middle" font-size="12">1</text>
<text x="107" y="50" text-anchor="middle" font-size="12">2</text>
<text x="162" y="50" text-anchor="middle" font-size="12">3</text>
<text x="217" y="50" text-anchor="middle" font-size="12">4</text>
<text x="272" y="50" text-anchor="middle" font-size="12">5</text>
<rect x="305" y="30" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="360" y="30" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="415" y="30" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="327" y="50" text-anchor="middle" font-size="12">6</text>
<text x="382" y="50" text-anchor="middle" font-size="12">7</text>
<text x="437" y="50" text-anchor="middle" font-size="12">8</text>
<line x1="240" y1="90" x2="150" y2="130" class="dg-line" stroke-width="1.5"/>
<text x="480" y="90" text-anchor="middle" font-size="12" class="dg-dim">압축</text>
<rect x="30" y="140" width="220" height="45" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="140" y="167" text-anchor="middle" font-size="12">요약(1~5의 핵심)</text>
<line x1="437" y1="60" x2="437" y2="130" class="dg-line" stroke-width="1.5"/>
<rect x="380" y="140" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="435" y="140" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<rect x="490" y="140" width="45" height="30" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="402" y="160" text-anchor="middle" font-size="12">6</text>
<text x="457" y="160" text-anchor="middle" font-size="12">7</text>
<text x="512" y="160" text-anchor="middle" font-size="12">8</text>
<text x="330" y="192" text-anchor="middle" font-size="12" class="dg-dim">요약 + 최근 턴만 유지</text>
</svg>

_오래된 턴들은 요약 하나로 합치고 최근 턴만 그대로 남겨 컨텍스트 공간을 확보한다._

## 문제
맨 처음에는 아직 압축된 요약이 없으므로 $S_0=0$이다. 이를 재귀식 $S_{i+1}=\rho(S_i+M)$에 $i=0$을 대입하면 $S_1 = $==빈칸==이다.

## 해설
$S_0=0$을 대입하면 $\rho(0+M)=\rho M$만 남기 때문이에요.

**정답: $\rho M$**

## 예시

