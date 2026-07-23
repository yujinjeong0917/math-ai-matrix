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
epoch 1에서 이 픽셀의 Grad-CAM 값은 ==빈칸== 이다.

## 해설
0.7×5+0.2×2를 계산하면 3.9가 나오고, 이 값이 양수라서 ReLU를 그대로 통과해요.

**정답: $3.9$**

## 예시

