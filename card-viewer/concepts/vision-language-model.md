---
slug: vision-language-model
theme: LLM
domainLabel: LLM/Agent
subLabel: 비전-언어 모델
title: Vision-Language Model: 이미지를 보고 텍스트로 대답하기
related: CLIP류 정렬 사전학습 · Cross-attention 결합 · 패치 토큰화
---

## 도입
VLM은 크게 세 부분으로 이루어집니다. 이미지를 특징 벡터로 바꾸는 이미지 인코더 그 벡터를 언어모델이 다루는 임베딩 공간으로 옮기는 연결부 그리고 텍스트를 생성하는 언어모델입니다. 이미지 인코더는 흔히 ViT 계열이고 언어모델은 이미 텍스트로 사전학습된 대규모 모델을 그대로 가져다 씁니다. 텍스트만 다루는 모델은 애초에 이미지를 입력으로 받는 통로 자체가 없기 때문에 이 연결부가 없으면 이미지에 대해 아무것도 할 수 없습니다.

연결부의 역할은 이미지 인코더가 만든 특징을 언어모델의 토큰 임베딩과 같은 차원 같은 성격의 벡터로 바꿔주는 것입니다. 단순한 선형투영 한 층일 수도 있고 여러 이미지 토큰을 더 적은 수의 벡터로 압축하는 리샘플러일 수도 있습니다. 이렇게 만들어진 이미지 벡터들은 이후 언어모델의 시퀀스에 이미지 토큰으로 섞여 들어가거나 별도의 어텐션 경로로 주입됩니다. 두 방식의 구체적인 차이는 cross-attention-fusion-vlm 항목에서 다룹니다.

학습은 보통 단계적으로 진행됩니다. 이미지 인코더와 언어모델 각각은 이미 방대한 데이터로 사전학습되어 있으므로 처음부터 다시 학습시키지 않습니다. 대신 연결부를 이미지 캡션 데이터로 먼저 맞추고 이후 이미지와 대화가 섞인 지시문 데이터로 전체를 함께 미세조정합니다. 이미지 인코더 자체는 CLIP류 정렬 사전학습으로 이미 텍스트와 어느 정도 맞춰진 상태에서 시작하는 경우가 많아 이 단계가 훨씬 빨리 수렴합니다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="60" width="90" height="60" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="65" y="95" font-size="13" text-anchor="middle">이미지</text>
<line x1="110" y1="90" x2="145" y2="90" class="dg-line" stroke-width="1.5"/>
<polygon points="145,90 137,85 137,95" class="dg-line"/>
<rect x="150" y="55" width="120" height="70" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="210" y="85" font-size="12" text-anchor="middle">이미지</text>
<text x="210" y="102" font-size="12" text-anchor="middle">인코더</text>
<line x1="270" y1="90" x2="315" y2="90" class="dg-line" stroke-width="1.5"/>
<polygon points="315,90 307,85 307,95" class="dg-line"/>
<text x="292" y="76" font-size="11" class="dg-dim" text-anchor="middle">투영</text>
<rect x="320" y="20" width="170" height="150" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="405" y="42" font-size="13" text-anchor="middle">언어모델</text>
<circle cx="365" cy="90" r="7" class="dg-accent"/>
<circle cx="405" cy="90" r="7" class="dg-accent"/>
<circle cx="445" cy="90" r="7" class="dg-accent"/>
<text x="405" y="122" font-size="11" class="dg-dim" text-anchor="middle">이미지 토큰 + 텍스트 토큰</text>
<rect x="150" y="150" width="130" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="215" y="174" font-size="12" text-anchor="middle">텍스트 프롬프트</text>
<line x1="215" y1="150" x2="365" y2="100" class="dg-line" stroke-width="1.5"/>
<line x1="490" y1="90" x2="535" y2="90" class="dg-line" stroke-width="1.5"/>
<polygon points="535,90 527,85 527,95" class="dg-line"/>
<rect x="540" y="60" width="85" height="60" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="582" y="86" font-size="12" text-anchor="middle">텍스트</text>
<text x="582" y="102" font-size="12" text-anchor="middle">응답</text>
</svg>

_이미지 인코더가 뽑은 특징을 투영해 언어모델의 토큰 자리에 텍스트 프롬프트와 함께 넣는다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
언어모델은 원래 텍스트만 압니다. 문장을 토큰으로 쪼개고 그 토큰들 사이의 관계만 학습했을 뿐 픽셀이 무엇을 뜻하는지는 배운 적이 없습니다. 그런데 사진을 보여주고 무엇이 찍혀 있는지 설명해달라고 하면 모델은 먼저 그 사진을 자신이 이해하는 형태로 바꿔야 합니다.

Vision-Language Model은 이미지를 읽는 부분과 문장을 만드는 부분을 하나로 이어 붙인 구조입니다. 이미지를 보는 눈과 그 내용을 말로 풀어내는 입을 따로 만들어 연결한 셈입니다.


## 예시

