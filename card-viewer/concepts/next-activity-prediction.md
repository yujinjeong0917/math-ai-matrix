---
slug: next-activity-prediction
theme: PM
domainLabel: Process Mining
subLabel: 예측 기법
title: Next Activity Prediction: 다음에 무슨 일이 일어날까
related: Remaining Time Prediction · 이상 케이스 조기 경고
---

## 도입
예측 대상은 지금까지 관찰된 부분 트레이스(trace prefix) $\langle a_1, \dots, a_k \rangle$이고 출력은 다음에 올 활동 $a_{k+1}$이 무엇일지에 대한 확률분포입니다. 활동 종류가 유한한 집합이므로 이 문제는 다음 활동을 클래스로 보는 다중분류 문제로 프레이밍됩니다. 케이스가 이미 끝났다는 것도 하나의 클래스로 포함시켜 프로세스 종료 시점까지 함께 예측하는 경우가 많습니다.

학습 데이터는 과거에 완료된 트레이스들을 여러 길이의 접두사로 잘라서 만듭니다. 길이가 5인 트레이스가 있으면 길이 1부터 4까지의 접두사 각각에 실제 다음 활동을 정답으로 붙여 학습 샘플로 씁니다. 초기에는 은닉마르코프모델이나 n-그램 방식이 쓰였지만 지금은 활동을 임베딩으로 바꾼 뒤 LSTM이나 트랜스포머 인코더로 시퀀스를 인코딩해 다음 활동을 예측하는 방식이 널리 쓰입니다. 활동명뿐 아니라 자원(누가 처리했는지)이나 케이스 속성을 함께 인코딩하면 예측 정확도가 더 올라가는 경우가 많습니다.

## 명제



## 문제
$q(a\mid x)$ 에 대해 편미분하여 $0$으로 놓으면 $-\dfrac{p(a\mid x)}{q(a\mid x)}+\lambda=0$ 이 되고, 이를 $q(a\mid x)$ 에 대해 풀면 $q(a\mid x)=$ ==빈칸== 입니다.

## 해설
$-p(a\mid x)/q(a\mid x)+\lambda=0$ 을 $q(a\mid x)$ 에 대해 정리하면 $q(a\mid x)=p(a\mid x)/\lambda$ 가 나오기 때문이에요.

**정답: $\dfrac{p(a\mid x)}{\lambda}$**

## 예시

