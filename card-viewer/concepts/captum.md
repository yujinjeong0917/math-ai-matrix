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
이 값을 모든 특징 $i=1,\ldots,d$에 대해 더하면 $\sum_{i=1}^d IG_i(x) = \sum_{i=1}^d (x_i-x_i')\int_0^1 \frac{\partial F}{\partial x_i}\big(x'+\alpha(x-x')\big)\, d\alpha$이다. 여기서 $g(\alpha) := F(x'+\alpha(x-x'))$라 정의하면 $g$는 $\alpha$에 대한 합성함수이므로, 체인룰에 의해 $g'(\alpha)$는 정확히 ==빈칸== 와 같다.

## 해설
합성함수 g(α)=F(x'+α(x-x'))를 체인룰로 미분하면, 내부함수의 i번째 성분 x_i'+α(x_i-x_i')을 α로 미분한 (x_i-x_i')와 F의 i번째 편미분을 곱해 모든 i에 대해 합한 값이 되기 때문이에요. 이는 바로 앞 식에서 각 항의 적분 기호를 걷어내고 α 지점에서의 순간값으로 바꾼 것과 같아요.

**정답: $\sum_{i=1}^d (x_i - x_i') \frac{\partial F}{\partial x_i}\big(x' + \alpha(x-x')\big)$**

## 예시

