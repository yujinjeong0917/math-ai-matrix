---
slug: captum
theme: XAI
domainLabel: XAI · 해석가능성
subLabel: 딥러닝 특화 도구
title: Captum: PyTorch 공식 설명가능성 라이브러리
related: tf-explain · shap · Alibi Explain
---

## 도입
Integrated Gradients, Saliency, DeepLift, GradientShap, Occlusion처럼 널리 쓰이는 어트리뷰션 기법들을 각각 별도 클래스로 제공한다. 사용 패턴은 대체로 비슷하다. 모델을 넣어 explainer 객체를 만들고 attribute 메서드에 입력 텐서와 설명할 대상 클래스, 필요하면 기준(baseline) 입력을 함께 넣으면 입력과 같은 형태의 텐서로 픽셀별 또는 특징별 기여도가 나온다.

레이어 단위 기법도 따로 갖춰져 있다. LayerConductance나 LayerGradCam처럼 layer 인자에 원하는 중간 층을 지정하면 그 층의 활성화를 기준으로 기여도나 클래스별 활성화맵을 계산해준다. CNN의 특정 합성곱 층에서 Grad-CAM 스타일 시각화를 뽑을 때 이 방식을 쓴다.

Captum Insights라는 대시보드도 함께 제공되어 여러 어트리뷰션 기법의 결과를 나란히 띄워 비교하거나 배치 단위로 훑어볼 수 있다. 표, 이미지, 텍스트 임베딩 등 입력 형태가 텐서로 표현되는 한 대부분의 PyTorch 모델에 적용 가능하다는 점이 강점이다.

## 명제



## 문제
(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)

## 해설
그래디언트 기반 설명 기법들은 모델의 계산 그래프 내부, 즉 중간 층의 활성화값과 그래디언트에 접근해야 한다. PyTorch 모델에서 이걸 직접 구현하려면 훅(hook)을 여기저기 걸어야 해서 번거롭다. Captum은 PyTorch의 autograd와 바로 맞물리는 형태로 이런 기법들을 이미 구현해뒀다. Integrated Gradients 한 줄이면 훅을 직접 짤 필요 없이 결과를 얻는다.

PyTorch를 만든 팀이 공식으로 유지보수하는 라이브러리라서 새로운 PyTorch 버전과의 호환성이나 표준 레이어들과의 연동이 상대적으로 안정적이다.


## 예시

