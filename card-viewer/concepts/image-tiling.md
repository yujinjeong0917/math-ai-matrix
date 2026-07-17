---
slug: image-tiling
theme: LLM
domainLabel: LLM/Agent
subLabel: 이미지 토큰화
title: 타일링: 고해상도 이미지를 조각내 나눠 인코딩하기
related: 이미지 토큰 수 · 패치 토큰화
---

## 도입
큰 이미지를 그대로 패치 토큰화하면 토큰 수가 감당하기 힘든 수준으로 불어납니다. 그렇다고 이미지 인코더가 학습된 적 없는 해상도를 그대로 밀어 넣으면 성능이 떨어집니다. 타일링은 큰 이미지를 인코더가 학습된 고정 크기 타일 여러 개로 나누고 각 타일을 이미지 인코더에 독립적으로 통과시켜 이 두 문제를 동시에 피해갑니다.

다만 타일 각각은 이미지의 일부만 보기 때문에 타일들끼리는 서로의 옆에 무엇이 있는지 모릅니다. 그래서 실제 구현에서는 원본 이미지를 작게 축소한 썸네일 하나를 별도로 함께 인코딩해서 전체 구도나 전역 맥락을 보완합니다. 각 타일이 이미지의 어느 위치에서 왔는지는 타일 순서나 위치 임베딩으로 표시해 언어모델이 조각들을 다시 이어 이해할 수 있게 합니다.

결과적으로 언어모델에 들어가는 이미지 토큰은 타일마다 나온 토큰들과 썸네일에서 나온 토큰을 모두 이어붙인 형태가 됩니다. 타일 수를 늘릴수록 더 높은 해상도를 다룰 수 있지만 그만큼 토큰 수도 타일 개수에 비례해 늘어나므로 컨텍스트 예산 문제가 다시 그대로 나타납니다. 타일링은 해상도 한계를 풀어주는 대신 토큰 비용을 타일 단위로 다시 지불하게 만드는 절충입니다.

## 명제


## 그림
<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="30" width="200" height="160" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<line x1="130" y1="30" x2="130" y2="190" class="dg-line" stroke-width="1.5"/>
<line x1="30" y1="110" x2="230" y2="110" class="dg-line" stroke-width="1.5"/>
<text x="80" y="74" font-size="12" text-anchor="middle">타일1</text>
<text x="180" y="74" font-size="12" text-anchor="middle">타일2</text>
<text x="80" y="154" font-size="12" text-anchor="middle">타일3</text>
<text x="180" y="154" font-size="12" text-anchor="middle">타일4</text>
<rect x="270" y="30" width="70" height="56" fill="none" class="dg-stroke-ink" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="305" y="100" font-size="11" text-anchor="middle">축소 썸네일</text>
<text x="305" y="114" font-size="10" class="dg-dim" text-anchor="middle">(전역 맥락)</text>
<line x1="230" y1="110" x2="384" y2="110" class="dg-line" stroke-width="1.5"/>
<polygon points="384,110 376,105 376,115" class="dg-line"/>
<line x1="305" y1="86" x2="418" y2="82" class="dg-line" stroke-width="1.5"/>
<polygon points="418,82 410,79 411,88" class="dg-line"/>
<rect x="390" y="80" width="150" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="465" y="105" font-size="12" text-anchor="middle">이미지 인코더</text>
<text x="465" y="122" font-size="10" class="dg-dim" text-anchor="middle">타일마다 각각 실행</text>
<line x1="465" y1="140" x2="465" y2="184" class="dg-line" stroke-width="1.5"/>
<polygon points="465,184 460,176 470,176" class="dg-line"/>
<rect x="360" y="190" width="32" height="26" class="dg-accent" stroke="none"/>
<rect x="400" y="190" width="32" height="26" class="dg-accent" stroke="none"/>
<rect x="440" y="190" width="32" height="26" class="dg-accent" stroke="none"/>
<rect x="480" y="190" width="32" height="26" class="dg-accent" stroke="none"/>
<rect x="520" y="190" width="32" height="26" class="dg-dim" stroke="none"/>
<text x="456" y="245" font-size="11" class="dg-dim" text-anchor="middle">타일 토큰 + 썸네일 토큰을 순서대로 연결</text>
</svg>

_고해상도 이미지를 고정 크기 타일로 나눠 각각 인코딩하고 전역 맥락을 담은 축소 썸네일과 함께 연결한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
이미지 인코더는 보통 정해진 해상도 예를 들어 $336\times336$ 같은 크기로만 학습되어 있습니다. 스캔한 문서나 큰 스크린샷처럼 실제로는 훨씬 큰 이미지를 그 작은 해상도로 억지로 줄이면 작은 글씨나 세부 정보가 뭉개져 사라집니다.

타일링은 이미지를 억지로 줄이는 대신 인코더가 원래 익숙한 크기의 조각으로 잘라서 그 조각들을 하나씩 따로 인코딩합니다. 큰 지도를 한 장에 다 담는 대신 여러 장의 구역별 지도로 나눠 각각 자세히 그리는 것과 비슷합니다.


## 예시

