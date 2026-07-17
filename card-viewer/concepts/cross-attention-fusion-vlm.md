---
slug: cross-attention-fusion-vlm
theme: LLM
domainLabel: LLM/Agent
subLabel: 비전-언어 모델
title: Cross-attention 결합: 이미지 특징을 언어모델 어텐션에 주입하기
related: Vision-Language Model · 패치 토큰화
---

## 도입
이미지 토큰을 시퀀스에 그대로 이어붙이는 방식(LLaVA류)은 이미지 인코더의 출력을 언어모델 임베딩 차원으로 투영한 뒤 텍스트 토큰들과 함께 하나의 시퀀스로 만들어 기존 셀프어텐션에 통째로 넣습니다. 언어모델 구조를 거의 그대로 재사용할 수 있다는 장점이 있지만 이미지 토큰 수만큼 시퀀스 길이가 늘어나고 셀프어텐션 비용은 시퀀스 길이의 제곱에 비례하므로 이미지가 커질수록 계산량이 빠르게 불어납니다.

Cross-attention 결합(Flamingo류)은 언어모델의 기존 셀프어텐션과 FFN 층 사이에 새로운 어텐션 층을 추가로 끼워 넣습니다. 이 층에서는 쿼리 $Q$가 텍스트 쪽 은닉상태에서 나오고 키 $K$와 값 $V$는 이미지 토큰에서 나옵니다.
$$\mathrm{CrossAttn}(Q,K,V) = \mathrm{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$
이미지 토큰은 텍스트 시퀀스 안에 섞이지 않고 K V로만 참조되기 때문에 텍스트 시퀀스 길이는 이미지 크기와 무관하게 유지되고 텍스트끼리의 셀프어텐션 비용도 그대로입니다.

두 방식의 실질적인 차이는 여기서 갈립니다. 토큰 연결 방식은 모든 층이 같은 이미지 표현을 셀프어텐션 안에서 동일하게 취급하는 반면 cross-attention 방식은 층마다 독립된 어텐션 파라미터로 이미지를 얼마나 어떻게 참조할지 따로 학습합니다. 또한 원래의 언어모델 파라미터를 얼리고 새로 추가한 cross-attention 층만 학습하는 구성이 가능해서 이미 잘 학습된 언어모델의 능력을 크게 건드리지 않고 시각 능력만 얹을 수 있습니다. 대신 구조가 하나 더 늘어나는 만큼 구현과 학습 파이프라인은 토큰 연결 방식보다 복잡해집니다.

## 명제


## 그림
<svg viewBox="0 0 660 280" xmlns="http://www.w3.org/2000/svg">
<text x="140" y="18" font-size="13" text-anchor="middle">방식 A: 토큰 연결</text>
<rect x="40" y="35" width="26" height="28" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="53" y="53" font-size="10" text-anchor="middle">T</text>
<rect x="74" y="35" width="26" height="28" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="87" y="53" font-size="10" text-anchor="middle">T</text>
<rect x="108" y="35" width="26" height="28" class="dg-accent" stroke="none"/>
<text x="121" y="53" font-size="10" text-anchor="middle">I</text>
<rect x="142" y="35" width="26" height="28" class="dg-accent" stroke="none"/>
<text x="155" y="53" font-size="10" text-anchor="middle">I</text>
<rect x="176" y="35" width="26" height="28" class="dg-accent" stroke="none"/>
<text x="189" y="53" font-size="10" text-anchor="middle">I</text>
<rect x="210" y="35" width="26" height="28" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="223" y="53" font-size="10" text-anchor="middle">T</text>
<line x1="138" y1="63" x2="138" y2="92" class="dg-line" stroke-width="1.5"/>
<polygon points="138,92 133,84 143,84" class="dg-line"/>
<rect x="30" y="95" width="220" height="54" fill="none" class="dg-stroke-ink" stroke-width="2"/>
<text x="140" y="118" font-size="12" text-anchor="middle">self-attention</text>
<text x="140" y="138" font-size="10" class="dg-dim" text-anchor="middle">텍스트+이미지 토큰 함께 처리</text>
<line x1="140" y1="149" x2="140" y2="177" class="dg-line" stroke-width="1.5"/>
<polygon points="140,177 135,169 145,169" class="dg-line"/>
<rect x="30" y="180" width="220" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="140" y="204" font-size="12" text-anchor="middle">다음 레이어로</text>
<text x="500" y="18" font-size="13" text-anchor="middle">방식 B: Cross-attention</text>
<rect x="380" y="35" width="26" height="28" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="393" y="53" font-size="10" text-anchor="middle">T</text>
<rect x="414" y="35" width="26" height="28" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="427" y="53" font-size="10" text-anchor="middle">T</text>
<rect x="448" y="35" width="26" height="28" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="461" y="53" font-size="10" text-anchor="middle">T</text>
<rect x="482" y="35" width="26" height="28" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="495" y="53" font-size="10" text-anchor="middle">T</text>
<line x1="444" y1="63" x2="444" y2="87" class="dg-line" stroke-width="1.5"/>
<polygon points="444,87 439,79 449,79" class="dg-line"/>
<rect x="370" y="90" width="150" height="40" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="445" y="114" font-size="11" text-anchor="middle">텍스트 self-attention</text>
<rect x="545" y="90" width="90" height="46" class="dg-accent" stroke="none"/>
<text x="590" y="110" font-size="11" text-anchor="middle">이미지 토큰</text>
<text x="590" y="124" font-size="10" text-anchor="middle">(K, V)</text>
<line x1="445" y1="130" x2="475" y2="158" class="dg-line" stroke-width="1.5"/>
<polygon points="475,158 465,155 470,148" class="dg-line"/>
<line x1="560" y1="136" x2="520" y2="158" class="dg-line" stroke-width="1.5"/>
<polygon points="520,158 526,150 530,157" class="dg-line"/>
<rect x="370" y="160" width="250" height="50" fill="none" class="dg-stroke-accent" stroke-width="2"/>
<text x="495" y="180" font-size="12" text-anchor="middle">cross-attention</text>
<text x="495" y="198" font-size="10" class="dg-dim" text-anchor="middle">Q=텍스트, K,V=이미지</text>
<line x1="495" y1="210" x2="495" y2="228" class="dg-line" stroke-width="1.5"/>
<polygon points="495,228 490,220 500,220" class="dg-line"/>
<rect x="370" y="230" width="250" height="36" fill="none" class="dg-stroke-ink" stroke-width="1.5"/>
<text x="495" y="253" font-size="12" text-anchor="middle">다음 레이어로</text>
</svg>

_토큰 연결은 이미지 토큰을 시퀀스에 그대로 섞어 넣고 cross-attention은 이미지 토큰을 K V로만 별도 주입한다._

## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
이미지에서 뽑은 특징을 언어모델에 전달하는 가장 단순한 방법은 그 특징들을 텍스트 토큰 옆에 나란히 끼워 넣는 것입니다. 다만 이미지 하나가 수백 개의 토큰으로 변환되면 대화창 하나가 순식간에 이미지 토큰으로 가득 차 버립니다.

Cross-attention 결합은 이미지 토큰을 시퀀스 안에 직접 밀어 넣지 않습니다. 대신 언어모델이 문장을 처리하는 중간중간에 이미지 쪽을 따로 들여다보는 창구를 하나 더 열어둡니다. 텍스트는 텍스트끼리 계속 자기들끼리 어텐션하고 필요할 때만 그 창구로 이미지를 참조합니다.


## 예시

