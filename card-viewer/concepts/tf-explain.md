---
slug: tf-explain
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 딥러닝 특화 도구
title: tf-explain: TensorFlow/Keras를 위한 시각화 도구
related: Captum · shap · Alibi Explain
---

## 도입
Grad-CAM, Occlusion Sensitivity, Vanilla Gradients, Gradients*Inputs, SmoothGrad, Integrated Gradients, Activations Visualization 같은 기법들을 지원한다. 사용법은 원하는 기법의 explainer 클래스를 만들고 explain 메서드에 입력 이미지와 모델, 설명할 클래스 인덱스, Grad-CAM이라면 어느 합성곱 층을 기준으로 할지 층 이름을 넘기는 방식이다. 결과로 원본 이미지 위에 히트맵이 겹쳐진 배열이 나온다.

Captum과 달리 Keras 콜백 클래스 형태로도 explainer들을 제공한다는 점이 특징이다. model.fit을 호출할 때 콜백 목록에 넣어두면 별도 코드 없이 학습 로그와 함께 설명 결과가 쌓인다. 다만 지원 범위는 이미지 기반 CNN 위주라 Captum만큼 다양한 모델 구조나 입력 형태를 폭넓게 다루지는 않는다.

## 명제



## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
Keras/TensorFlow로 이미지 분류 모델을 학습하면서 이 모델이 이미지의 어느 부분을 보고 판단하는지 빠르게 확인하고 싶을 때가 많다. tf-explain은 Grad-CAM 같은 시각화 기법을 몇 줄 코드로 바로 뽑아주는 도구다. Captum이 PyTorch 전반을 폭넓게 다루는 것과 달리 주로 CNN 이미지 모델의 시각화에 초점이 맞춰져 있다.

학습 도중에도 쓸 수 있다는 점이 실용적이다. Keras 콜백으로 등록해두면 매 에폭마다 특정 이미지에 대한 설명 결과를 자동으로 저장하거나 TensorBoard에 띄워 학습이 진행되는 동안 모델이 주목하는 영역이 어떻게 바뀌는지 지켜볼 수 있다.


## 예시

