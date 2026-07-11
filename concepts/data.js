// 수학 × AI 매트릭스 — 개념별 완전한 증명 + 빈칸 문제 데이터.
// 모든 LaTeX 필드는 String.raw로 작성한다: JS 문자열 이스케이프가 백슬래시를
// 삼켜버려 KaTeX가 깨지는 사고(\sum -> sum)를 원천적으로 막기 위함.
window.CONCEPTS = {
  "pca": {
    title: "주성분분석(PCA)의 최적 방향",
    domain: "linalg",
    subLabel: "고유값 · 분해",
    explanation: String.raw`PCA는 데이터의 분산을 최대로 보존하는 저차원 방향을 찾는 기법이다. 그 핵심 결과는 "분산을 최대화하는 방향은 공분산행렬의 최대 고유값에 대응하는 고유벡터"라는 것이다.<br><br><strong>명제.</strong> 중심화된 데이터 행렬 $X\in\mathbb{R}^{n\times d}$의 공분산행렬을 $\Sigma=\frac{1}{n}X^TX$ 라 하자. $\|w\|=1$인 $w$ 중 사영분산 $w^T\Sigma w$를 최대화하는 것은 $\Sigma$의 최대 고유값에 대응하는 고유벡터이다.`,
    sections: [
      { id: "s1", text: String.raw`단위벡터 $w$ ($\|w\|=1$) 방향으로 사영했을 때의 분산은 $\mathrm{Var}(Xw) = w^T\Sigma w$ 이다.`, blanks: [] },
      { id: "s2", text: String.raw`이를 라그랑주 승수법으로 최대화하면 목적함수는 $L(w,\lambda) = w^T\Sigma w - \lambda($[[blank:가]]$)$ 이다.`,
        blanks: [{ id: "가", latex: String.raw`w^Tw - 1`, why: String.raw`제약조건 $\|w\|=1$, 즉 $w^Tw-1=0$을 등호제약항으로 그대로 넣은 것이다.` }] },
      { id: "s3", text: String.raw`$w$에 대해 편미분하여 0으로 놓으면 [[blank:나]]$ = 0$ 이다.`,
        blanks: [{ id: "나", latex: String.raw`2\Sigma w - 2\lambda w`, why: String.raw`$w^T\Sigma w$의 $w$에 대한 그래디언트는 $2\Sigma w$, $\lambda(w^Tw-1)$의 그래디언트는 $2\lambda w$이므로 그 차를 0으로 놓은 것이다.` }] },
      { id: "s4", text: String.raw`정리하면 $\Sigma w = $[[blank:다]], 즉 $w$는 $\Sigma$의 고유벡터이고 $\lambda$는 그 고유값이다.`,
        blanks: [{ id: "다", latex: String.raw`\lambda w`, why: String.raw`직전 식을 2로 나누고 이항하면 나오는 고유값 방정식 형태다.` }] },
      { id: "s5", text: String.raw`이때 분산은 $w^T\Sigma w = w^T(\lambda w) = \lambda w^Tw = $[[blank:라]] 이므로, 분산을 최대화하려면 $\lambda$를 최대 고유값으로 선택해야 한다.`,
        blanks: [{ id: "라", latex: String.raw`\lambda`, why: String.raw`$w^Tw=1$(단위벡터 제약)이므로 $\lambda\cdot 1=\lambda$만 남는다.` }] },
      { id: "s6", text: String.raw`따라서 분산을 최대로 보존하는 방향 $w$는 $\Sigma$의 최대 고유값에 대응하는 고유벡터이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "eigen-diagonalization": {
    title: "대칭행렬의 직교대각화 (스펙트럴 정리)",
    domain: "linalg",
    subLabel: "고유값 · 분해",
    explanation: String.raw`임의의 실수 대칭행렬은 항상 직교행렬로 대각화될 수 있다는 것이 스펙트럴 정리다. PCA, 공분산 분석 등 데이터를 고유벡터 축으로 분해하는 모든 기법의 이론적 기반이다.<br><br><strong>명제.</strong> $n\times n$ 실수 대칭행렬 $A$($A=A^T$)는 $A=Q\Lambda Q^T$ (Q: 직교행렬, Λ: 대각행렬) 형태로 대각화된다.`,
    sections: [
      { id: "s1", text: String.raw`$A$가 $n\times n$ 실수 대칭행렬이라 하자. 목표는 이러한 $Q,\Lambda$가 존재함을 보이는 것이다.`, blanks: [] },
      { id: "s2", text: String.raw`서로 다른 고유값 $\lambda_i\neq\lambda_j$에 대응하는 고유벡터 $v_i,v_j$는 [[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`v_i^Tv_j = 0`, why: String.raw`$Av_i=\lambda_iv_i$, $Av_j=\lambda_jv_j$를 이용해 $v_j^TAv_i$와 $v_i^TAv_j$를 비교하면 $(\lambda_i-\lambda_j)v_i^Tv_j=0$이 나오고, $\lambda_i\neq\lambda_j$이므로 내적이 0이어야 한다(직교).` }] },
      { id: "s3", text: String.raw`정규직교 고유벡터 $v_1,\dots,v_n$을 열로 갖는 $Q=[v_1\ \cdots\ v_n]$은 [[blank:나]] 를 만족하는 직교행렬이다.`,
        blanks: [{ id: "나", latex: String.raw`Q^TQ = I`, why: String.raw`열벡터들이 서로 정규직교이므로 $Q^TQ$의 $(i,j)$ 성분은 $v_i\cdot v_j=\delta_{ij}$, 즉 항등행렬이다.` }] },
      { id: "s4", text: String.raw`각 열에 대해 $Av_i=\lambda_iv_i$이므로 $AQ=Q\Lambda$이고, 오른쪽에서 $Q^T$를 곱하면 $A = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`Q\Lambda Q^T`, why: String.raw`$AQ=Q\Lambda$의 양변 오른쪽에 $Q^T$를 곱하고 직교행렬의 성질 $QQ^T=I$를 쓰면 $A=Q\Lambda Q^T$가 된다.` }] },
      { id: "s5", text: String.raw`따라서 $A=Q\Lambda Q^T$처럼 대각화된다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "gradient-descent": {
    title: "경사하강법의 하강 보장",
    domain: "calc",
    subLabel: "경사기반 옵티마이저",
    explanation: String.raw`경사하강법은 매 스텝 그래디언트 반대 방향으로 파라미터를 갱신한다. 학습률이 충분히 작으면 이 갱신이 손실을 실제로 감소시킨다는 것을 1차 테일러 근사(립시츠 그래디언트 가정)로 보일 수 있다.<br><br><strong>명제.</strong> $\nabla L$이 립시츠 상수 $K$로 립시츠 연속이면, $\eta<1/K$일 때 $\theta'=\theta-\eta\nabla L(\theta)$는 $L(\theta')\le L(\theta)$를 만족한다.`,
    sections: [
      { id: "s1", text: String.raw`립시츠 그래디언트 가정에서 2차 상한 $L(\theta')\le L(\theta)+\nabla L(\theta)^T(\theta'-\theta)+\frac{K}{2}\|\theta'-\theta\|^2$ 이 성립한다.`, blanks: [] },
      { id: "s2", text: String.raw`경사하강법 갱신 $\theta'=\theta-\eta\nabla L(\theta)$을 대입하면 $\theta'-\theta = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`-\eta\nabla L(\theta)`, why: String.raw`갱신식의 정의를 그대로 옮긴 것이다.` }] },
      { id: "s3", text: String.raw`상한식에 대입해 정리하면 $L(\theta')\le L(\theta)-\eta\left(1-\frac{$[[blank:나]]$}{2}\right)\|\nabla L(\theta)\|^2$ 이다.`,
        blanks: [{ id: "나", latex: String.raw`K\eta`, why: String.raw`$-\eta\|\nabla L\|^2+\frac{K\eta^2}{2}\|\nabla L\|^2$을 $-\eta\|\nabla L\|^2\left(1-\frac{K\eta}{2}\right)$ 형태로 묶어낸 것이다.` }] },
      { id: "s4", text: String.raw`$\eta<1/K$이면 $K\eta<1$이므로 $1-\frac{K\eta}{2} > $[[blank:다]] 이고, 우변의 감소항이 항상 양수다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`$K\eta<1$이면 $K\eta/2<0.5$이므로 $1-K\eta/2>0.5>0$이다.` }] },
      { id: "s5", text: String.raw`따라서 $L(\theta')\le L(\theta)-(\text{양수})\le L(\theta)$이며, $\nabla L(\theta)\neq0$이면 엄격한 부등식이 성립한다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "backprop": {
    title: "역전파(체인룰)의 정확성",
    domain: "calc",
    subLabel: "미분 · 그래디언트",
    explanation: String.raw`역전파는 합성함수의 미분을 체인룰로 층별로 거슬러 계산하는 알고리즘이다.<br><br><strong>명제.</strong> $h=Wx$, $z=g(h)$, $L=f(z)$일 때 $\frac{\partial L}{\partial W}$는 체인룰로 세 항의 곱으로 분해된다.`,
    sections: [
      { id: "s1", text: String.raw`$h=Wx$, $z=g(h)$, $L=f(z)$라 하면 $L$은 $W$의 합성함수이다.`, blanks: [] },
      { id: "s2", text: String.raw`체인룰에 의해 $\frac{\partial L}{\partial W} = \frac{\partial L}{\partial z}\cdot$[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`\frac{\partial z}{\partial W}`, why: String.raw`$L=f(z)$이고 $z$가 $W$에 의존하므로 체인룰의 첫 단계는 $\frac{\partial L}{\partial z}\cdot\frac{\partial z}{\partial W}$이다.` }] },
      { id: "s3", text: String.raw`$z$는 $h$를 거쳐 $W$에 의존하므로 $\frac{\partial z}{\partial W} = \frac{\partial z}{\partial h}\cdot$[[blank:나]] 로 한 번 더 분해된다.`,
        blanks: [{ id: "나", latex: String.raw`\frac{\partial h}{\partial W}`, why: String.raw`$z=g(h)$, $h=Wx$이므로 $\frac{\partial z}{\partial W}$도 체인룰로 $\frac{\partial z}{\partial h}\cdot\frac{\partial h}{\partial W}$로 분해된다.` }] },
      { id: "s4", text: String.raw`$h=Wx$이므로 $\frac{\partial h}{\partial W} = $[[blank:다]] 이다 (성분 기준 $\partial h_i/\partial W_{ij}=x_j$).`,
        blanks: [{ id: "다", latex: String.raw`x`, why: String.raw`$h=Wx$를 $W$의 각 성분으로 미분하면 대응하는 $x$의 성분이 남는다.` }] },
      { id: "s5", text: String.raw`세 항을 합치면 $\frac{\partial L}{\partial W} = \frac{\partial L}{\partial z}\cdot\frac{\partial z}{\partial h}\cdot x$ 이며, 이것이 역전파의 핵심이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "lagrange-kkt": {
    title: "라그랑주 승수법과 KKT 조건",
    domain: "calc",
    subLabel: "제약 최적화",
    explanation: String.raw`부등식 제약이 있는 최적화 문제에서 최적해가 만족해야 하는 1차 필요조건이 KKT 조건이다. SVM 쌍대문제, PPO/TRPO의 제약 최적화 모두 이 위에 서 있다.<br><br><strong>명제.</strong> $\min f(x)\ \text{s.t.}\ g(x)\le0$의 최적해 $x^*$에서 어떤 $\mu^*\ge0$이 존재해 $\nabla f(x^*)+\mu^*\nabla g(x^*)=0$, $\mu^*g(x^*)=0$이 성립한다.`,
    sections: [
      { id: "s1", text: String.raw`라그랑지안을 $\mathcal{L}(x,\mu)=f(x)+\mu g(x)$, $\mu\ge0$로 정의한다.`, blanks: [] },
      { id: "s2", text: String.raw`최적해 $x^*$에서 $x$에 대한 1차 필요조건은 $\nabla_x\mathcal{L}(x^*,\mu^*) = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`0`, why: String.raw`라그랑지안이 $x^*$에서 극값을 가지려면 $x$에 대한 그래디언트가 0이어야 한다는 정류점 조건이다.` }] },
      { id: "s3", text: String.raw`이는 $\nabla f(x^*) + $[[blank:나]]$ = 0$ 로 다시 쓸 수 있다.`,
        blanks: [{ id: "나", latex: String.raw`\mu^*\nabla g(x^*)`, why: String.raw`라그랑지안 정의를 그대로 $x$에 대해 미분한 결과다.` }] },
      { id: "s4", text: String.raw`만약 $g(x^*)<0$(제약이 느슨함)이면, 최적성이 유지되려면 $\mu^* = $[[blank:다]] 이어야 한다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`느슨한 제약은 최적해에 영향을 주지 않으므로 그 승수는 0이어야 한다는 것이 상보슬랙성의 직관이다.` }] },
      { id: "s5", text: String.raw`정리하면 $\mu^*g(x^*)=0$(상보슬랙성)과 $\nabla f(x^*)+\mu^*\nabla g(x^*)=0$, $\mu^*\ge0$이 모두 성립하며, 이것이 KKT 조건이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "bayes-theorem": {
    title: "베이즈 정리",
    domain: "prob",
    subLabel: "분포 · 추정",
    explanation: String.raw`베이즈 정리는 사전확률과 우도로부터 사후확률을 구하는 공식으로, 나이브베이즈부터 베이지안 딥러닝까지 확률적 추론의 근간이다.<br><br><strong>명제.</strong> 사건 $A,B$($P(B)>0$)에 대해 $P(A|B) = \dfrac{P(B|A)P(A)}{P(B)}$.`,
    sections: [
      { id: "s1", text: String.raw`조건부확률의 정의에 의해 $P(A|B)=\dfrac{P(A\cap B)}{P(B)}$, $P(B|A)=\dfrac{P(A\cap B)}{P(A)}$ 이다.`, blanks: [] },
      { id: "s2", text: String.raw`두 번째 식을 $P(A\cap B)$에 대해 정리하면 $P(A\cap B) = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`P(B|A)P(A)`, why: String.raw`$P(B|A)=P(A\cap B)/P(A)$의 양변에 $P(A)$를 곱한 것이다.` }] },
      { id: "s3", text: String.raw`이를 첫 번째 식에 대입하면 $P(A|B) = \dfrac{$[[blank:나]]$}{P(B)}$ 이다.`,
        blanks: [{ id: "나", latex: String.raw`P(B|A)P(A)`, why: String.raw`직전 줄에서 구한 $P(A\cap B)$의 표현을 그대로 대입한 것이다.` }] },
      { id: "s4", text: String.raw`만약 $A$가 서로소인 사건 $A_1,\dots,A_n$ 중 하나라면, 전확률법칙에 의해 분모는 $P(B) = $[[blank:다]] 로 전개할 수 있다.`,
        blanks: [{ id: "다", latex: String.raw`\sum_i P(B|A_i)P(A_i)`, why: String.raw`$B$가 일어날 확률을 가능한 모든 $A_i$ 경우로 나누어 합산하는 전확률법칙이다.` }] },
      { id: "s5", text: String.raw`따라서 $P(A|B) = \dfrac{P(B|A)P(A)}{P(B)}$ 이며, 이것이 베이즈 정리다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "mle": {
    title: "최대우도추정(MLE)과 로그우도",
    domain: "prob",
    subLabel: "분포 · 추정",
    explanation: String.raw`MLE는 관측 데이터가 나올 확률(우도)을 가장 크게 만드는 파라미터를 찾는 추정법이다. 곱셈으로 된 우도를 로그로 덧셈으로 바꾸는 것이 표준적인 풀이 테크닉이다.<br><br><strong>명제.</strong> i.i.d. 표본 $x_1,\dots,x_n$에 대해 우도 $L(\theta)=\prod_i p(x_i|\theta)$를 최대화하는 $\theta$는 로그우도 $\sum_i\log p(x_i|\theta)$를 최대화하는 $\theta$와 같다.`,
    sections: [
      { id: "s1", text: String.raw`i.i.d. 가정에 의해 결합확률은 $L(\theta) = P(x_1,\dots,x_n|\theta) = $[[blank:가]] 로 곱으로 분해된다.`,
        blanks: [{ id: "가", latex: String.raw`\prod_{i=1}^n p(x_i|\theta)`, why: String.raw`독립이므로 결합확률은 각 확률의 곱이다.` }] },
      { id: "s2", text: String.raw`$\log$는 강한 증가함수이므로 $\arg\max_\theta L(\theta) = \arg\max_\theta $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`\log L(\theta)`, why: String.raw`단조증가함수를 취해도 argmax의 위치는 바뀌지 않는다.` }] },
      { id: "s3", text: String.raw`로그를 씌우면 곱이 합으로 바뀌어 $\log L(\theta) = \sum_{i=1}^n $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`\log p(x_i|\theta)`, why: String.raw`$\log(\text{곱}) = \sum\log$ 라는 로그의 성질을 적용한 것이다.` }] },
      { id: "s4", text: String.raw`따라서 $\arg\max_\theta L(\theta) = \arg\max_\theta \sum_i \log p(x_i|\theta)$ 이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "markov-mdp": {
    title: "벨만 기대방정식의 유도",
    domain: "prob",
    subLabel: "마르코프 · 확률과정",
    explanation: String.raw`MDP에서 가치함수는 현재 보상과 다음 상태의 가치를 재귀적으로 표현할 수 있다. 이 재귀식이 벨만 기대방정식이며, 강화학습 알고리즘 대부분의 출발점이다.<br><br><strong>명제.</strong> $V^\pi(s)=\mathbb{E}_\pi\left[\sum_{k=0}^\infty\gamma^kr_{t+k}\middle|s_t=s\right]$는 $V^\pi(s)=\mathbb{E}_\pi[r_t+\gamma V^\pi(s_{t+1})|s_t=s]$를 만족한다.`,
    sections: [
      { id: "s1", text: String.raw`정의에 의해 $V^\pi(s) = \mathbb{E}_\pi\left[\sum_{k=0}^\infty \gamma^k r_{t+k}\ \middle|\ s_t=s\right]$ 이다.`, blanks: [] },
      { id: "s2", text: String.raw`재귀식을 얻으려면 합의 $k=$[[blank:가]] 항, 즉 현재 시점의 보상을 나머지와 분리하면 된다.`,
        blanks: [{ id: "가", latex: String.raw`0`, why: String.raw`$k=0$항이 바로 현재 시점 $t$의 보상 $r_t$이며, 이를 분리해야 나머지가 "다음 시점부터의 리턴" 형태로 남는다.` }] },
      { id: "s3", text: String.raw`분리하면 $\sum_{k=0}^\infty \gamma^k r_{t+k} = r_t + \gamma\sum_{k=0}^\infty $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`\gamma^k r_{t+1+k}`, why: String.raw`$k=0$항을 떼어내고 남은 합의 인덱스를 $k\to k+1$로 다시 맞추면 $\gamma\sum\gamma^kr_{t+1+k}$ 형태가 된다.` }] },
      { id: "s4", text: String.raw`$\sum_{k=0}^\infty \gamma^k r_{t+1+k}$는 시점 $t+1$에서 바라본 리턴이므로, 그 기댓값은 정의에 의해 [[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`V^\pi(s_{t+1})`, why: String.raw`동일한 정의를 시점 $t+1$, 상태 $s_{t+1}$에 적용한 것이 가치함수 정의 그 자체다.` }] },
      { id: "s5", text: String.raw`따라서 $V^\pi(s) = \mathbb{E}_\pi[r_t + \gamma V^\pi(s_{t+1}) | s_t=s]$ 이며, 이것이 벨만 기대방정식이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "clt": {
    title: "표본평균의 표준화 (중심극한정리의 발판)",
    domain: "prob",
    subLabel: "확률의 기초",
    explanation: String.raw`중심극한정리는 표본이 커질수록 (모집단 분포와 무관하게) 표본평균의 분포가 정규분포에 가까워진다는 정리다. 그 발판이 되는 표본평균의 평균·분산부터 정확히 짚어본다.<br><br><strong>명제.</strong> $X_1,\dots,X_n$이 i.i.d.이고 $E[X_i]=\mu$, $\mathrm{Var}(X_i)=\sigma^2$이면, $\bar X_n=\frac1n\sum X_i$를 표준화한 $Z_n=\frac{\bar X_n-\mu}{\sigma/\sqrt n}$은 평균 0, 분산 1을 갖는다.`,
    sections: [
      { id: "s1", text: String.raw`기댓값의 선형성에 의해 $E[\bar X_n] = \frac1n\sum_i E[X_i] = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`\mu`, why: String.raw`모든 $X_i$의 기댓값이 $\mu$로 같으므로 $n$개의 합을 $n$으로 나누면 그대로 $\mu$다.` }] },
      { id: "s2", text: String.raw`$X_i$들이 독립이므로 $\mathrm{Var}(\bar X_n) = \frac{1}{n^2}\sum_i \mathrm{Var}(X_i) = \frac{n\sigma^2}{n^2} = $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`\frac{\sigma^2}{n}`, why: String.raw`독립변수 합의 분산은 분산의 합이고(공분산항이 0), $n\sigma^2/n^2$을 약분하면 $\sigma^2/n$이다.` }] },
      { id: "s3", text: String.raw`표준화 변수 $Z_n = \dfrac{\bar X_n - \mu}{\sigma/\sqrt n}$의 기댓값은 $E[Z_n] = \dfrac{E[\bar X_n]-\mu}{\sigma/\sqrt n} = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`s1에서 $E[\bar X_n]=\mu$이므로 분자가 $\mu-\mu=0$이다.` }] },
      { id: "s4", text: String.raw`$Z_n$의 분산은 $\mathrm{Var}(Z_n) = \dfrac{\mathrm{Var}(\bar X_n)}{\sigma^2/n} = \dfrac{\sigma^2/n}{\sigma^2/n} = $[[blank:라]] 이다.`,
        blanks: [{ id: "라", latex: String.raw`1`, why: String.raw`분자·분모가 정확히 같은 $\sigma^2/n$이므로 비율은 1이다.` }] },
      { id: "s5", text: String.raw`따라서 $Z_n$은 평균 0, 분산 1로 표준화되며, 중심극한정리에 의해 $n\to\infty$일 때 $Z_n$의 분포는 $N(0,1)$로 수렴한다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "entropy-crossentropy": {
    title: "교차엔트로피와 엔트로피·KL발산의 관계",
    domain: "info",
    subLabel: "엔트로피 · 손실",
    explanation: String.raw`분류 문제에서 흔히 쓰는 교차엔트로피 손실은 사실 "엔트로피 + KL발산"으로 분해된다. 이 관계를 알면 왜 교차엔트로피를 최소화하는 것이 예측분포를 실제분포에 가깝게 만드는 것과 같은지 알 수 있다.<br><br><strong>명제.</strong> 두 분포 $p,q$에 대해 $H(p,q) = H(p) + D_{KL}(p\|q)$.`,
    sections: [
      { id: "s1", text: String.raw`교차엔트로피의 정의는 $H(p,q) = -\sum_x p(x)\log q(x)$ 이다.`, blanks: [] },
      { id: "s2", text: String.raw`KL발산의 정의는 $D_{KL}(p\|q) = \sum_x p(x)\log p(x) - \sum_x $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`p(x)\log q(x)`, why: String.raw`$\log(p/q)=\log p-\log q$로 분리한 뒤 각각 $p(x)$를 곱해 합을 나눈 것이다.` }] },
      { id: "s3", text: String.raw`첫 항 $\sum_x p(x)\log p(x)$ 는 엔트로피의 정의에 의해 [[blank:나]] 와 같다.`,
        blanks: [{ id: "나", latex: String.raw`-H(p)`, why: String.raw`엔트로피 정의 $H(p)=-\sum p(x)\log p(x)$이므로 부호를 바꾸면 $\sum p(x)\log p(x)=-H(p)$가 된다.` }] },
      { id: "s4", text: String.raw`따라서 $D_{KL}(p\|q) = -H(p) - \sum_x p(x)\log q(x) = -H(p) + $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`H(p,q)`, why: String.raw`$-\sum p(x)\log q(x)$는 정의상 그대로 $H(p,q)$이다.` }] },
      { id: "s5", text: String.raw`정리하면 $D_{KL}(p\|q)=H(p,q)-H(p)$, 즉 $H(p,q)=H(p)+D_{KL}(p\|q)$ 이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "kl-divergence": {
    title: "KL발산의 비음성 (Gibbs 부등식)",
    domain: "info",
    subLabel: "발산 · 상호정보",
    explanation: String.raw`KL발산이 항상 0 이상이라는 사실은 옌센 부등식에서 바로 따라 나온다. 이 비음성 덕분에 KL발산을 손실함수의 정규화항으로 안심하고 최소화할 수 있다(VAE의 ELBO, 지식증류 등).<br><br><strong>명제.</strong> 임의의 확률분포 $p,q$에 대해 $D_{KL}(p\|q)\ge0$, 등호는 $p=q$일 때만 성립.`,
    sections: [
      { id: "s1", text: String.raw`$D_{KL}(p\|q) = \sum_x p(x)\log\dfrac{p(x)}{q(x)} = -\sum_x p(x)\log\dfrac{q(x)}{p(x)}$ 로 부호를 바꿔 쓸 수 있다.`, blanks: [] },
      { id: "s2", text: String.raw`$\log$는 오목함수이므로 옌센 부등식에 의해 $\sum_x p(x)\log\dfrac{q(x)}{p(x)} \le \log\left($[[blank:가]]$\right)$ 이다.`,
        blanks: [{ id: "가", latex: String.raw`\sum_x p(x)\cdot\frac{q(x)}{p(x)}`, why: String.raw`옌센 부등식 $E[f(X)]\le f(E[X])$를 $X=q(x)/p(x)$, 기댓값은 $p$에 대해 취한 것에 적용한 것이다.` }] },
      { id: "s3", text: String.raw`우변의 합을 정리하면 $\sum_x p(x)\cdot\dfrac{q(x)}{p(x)} = \sum_x q(x) = $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`1`, why: String.raw`$q$도 확률분포이므로 전체 합은 1이다(확률의 총합 공리).` }] },
      { id: "s4", text: String.raw`따라서 $\sum_x p(x)\log\dfrac{q(x)}{p(x)} \le \log 1 = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`$\log 1 = 0$ 이다.` }] },
      { id: "s5", text: String.raw`부호를 다시 뒤집으면 $D_{KL}(p\|q)\ge0$이며, 옌센 등호조건($q(x)/p(x)$가 상수)에 의해 등호는 $p=q$일 때만 성립한다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "attention-scaling": {
    title: "어텐션의 스케일링 (√d로 나누는 이유)",
    domain: "linalg",
    subLabel: "고유값 · 분해",
    explanation: String.raw`트랜스포머의 셀프어텐션은 $QK^T$를 $\sqrt d$로 나눈 뒤 소프트맥스를 취한다. 스케일링이 없으면 내적의 분산이 차원 $d$에 비례해 커져 소프트맥스가 거의 원-핫에 가까워지고 그래디언트가 소실된다.<br><br><strong>명제.</strong> $q,k\in\mathbb{R}^d$의 각 성분이 평균 0, 분산 1로 독립이면 $(q\cdot k)/\sqrt d$의 분산은 1이다.`,
    sections: [
      { id: "s1", text: String.raw`$q,k\in\mathbb{R}^d$의 각 성분이 서로 독립이고 평균 0, 분산 1이라 하자. 내적은 $q\cdot k = \sum_{i=1}^d q_ik_i$ 이다.`, blanks: [] },
      { id: "s2", text: String.raw`독립인 항들의 합이므로 $\mathrm{Var}(q\cdot k) = \sum_{i=1}^d \mathrm{Var}(q_ik_i) = d\cdot$[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`\mathrm{Var}(q_1k_1)`, why: String.raw`모든 항이 동일한 분포에서 오므로 각 항의 분산이 같고, 그 합은 $d$배다.` }] },
      { id: "s3", text: String.raw`$q_1,k_1$이 독립이고 평균 0이므로 $\mathrm{Var}(q_1k_1) = E[q_1^2]E[k_1^2] = $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`1`, why: String.raw`평균 0, 분산 1이므로 $E[q_1^2]=\mathrm{Var}(q_1)=1$, 마찬가지로 $E[k_1^2]=1$, 곱하면 1이다.` }] },
      { id: "s4", text: String.raw`따라서 $\mathrm{Var}(q\cdot k)=d$이고, $\dfrac{q\cdot k}{\sqrt d}$의 분산은 $\dfrac{d}{(\sqrt d)^2} = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`1`, why: String.raw`$\mathrm{Var}(cX)=c^2\mathrm{Var}(X)$를 $c=1/\sqrt d$로 적용하면 분산이 $1/d$배가 되고, $d/d=1$이다.` }] },
      { id: "s5", text: String.raw`따라서 $QK^T/\sqrt d$로 스케일링하면 내적의 분산이 차원 $d$와 무관하게 1로 유지된다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "convex-jensen": {
    title: "볼록함수와 옌센 부등식",
    domain: "calc",
    subLabel: "함수의 성질",
    explanation: String.raw`옌센 부등식은 볼록함수의 정의를 확률변수로 확장한 것이다. ELBO 유도, KL발산의 비음성 증명 등 생성모델 이론 전반에서 반복적으로 쓰인다.<br><br><strong>명제.</strong> $f$가 볼록함수이면 임의의 확률변수 $X$에 대해 $f(E[X])\le E[f(X)]$.`,
    sections: [
      { id: "s1", text: String.raw`$f$가 볼록함수라는 것은 임의의 $x,y$와 $t\in[0,1]$에 대해 $f(tx+(1-t)y)\le tf(x)+(1-t)f(y)$ 임을 뜻한다.`, blanks: [] },
      { id: "s2", text: String.raw`이를 유한개의 점 $x_1,\dots,x_n$과 가중치 $p_i\ge0,\sum_ip_i=1$로 일반화하면 $f\left(\sum_i p_ix_i\right) \le \sum_i$[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`p_if(x_i)`, why: String.raw`두 점에 대한 볼록성 부등식을 귀납적으로 확장하면 가중평균에 대해서도 같은 형태의 부등식이 성립한다.` }] },
      { id: "s3", text: String.raw`이산 확률변수 $X$가 값 $x_i$를 확률 $p_i$로 가질 때, $\sum_i p_ix_i = $[[blank:나]] 이다 (기댓값의 정의).`,
        blanks: [{ id: "나", latex: String.raw`E[X]`, why: String.raw`가중평균 $\sum_ip_ix_i$는 정확히 기댓값의 정의다.` }] },
      { id: "s4", text: String.raw`마찬가지로 $\sum_i p_if(x_i) = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`E[f(X)]`, why: String.raw`확률변수 $f(X)$의 기댓값도 같은 방식으로 정의된다.` }] },
      { id: "s5", text: String.raw`s2의 부등식에 이 둘을 대입하면 $f(E[X])\le E[f(X)]$ 이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "shortest-path-dp": {
    title: "최단경로의 최적 부분구조와 벨만 방정식",
    domain: "disc",
    subLabel: "알고리즘 기초",
    explanation: String.raw`가치반복(Value Iteration)은 그래프의 최단경로를 구하는 동적계획법과 같은 원리다. "최적 부분구조"라는 동일한 통찰이 두 문제 모두를 지배한다.<br><br><strong>명제.</strong> 노드 $s$에서 $v$까지의 최단거리 $d(v)$는 $v$의 모든 인접 노드 $u$에 대해 $d(v)=\min_u(d(u)+w(u,v))$ 를 만족한다.`,
    sections: [
      { id: "s1", text: String.raw`$s$에서 $v$까지의 한 최단경로를 $P$라 하고, $P$에서 $v$ 바로 직전 노드를 $u$라 하자.`, blanks: [] },
      { id: "s2", text: String.raw`$P$는 최단경로이므로 $P$에서 $u$까지의 부분경로 길이는 $\mathrm{length}(P') = $[[blank:가]] 이어야 한다.`,
        blanks: [{ id: "가", latex: String.raw`d(u)`, why: String.raw`만약 $P'$가 최단경로 $d(u)$보다 길다면, 진짜 최단경로로 $P'$를 갈아끼워 $P$보다 짧은 $s\text{-}v$ 경로를 만들 수 있어 $P$가 최단경로라는 가정에 모순된다(귀류법).` }] },
      { id: "s3", text: String.raw`따라서 $P$ 전체의 길이는 $d(v) = \mathrm{length}(P') + w(u,v) = $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`d(u) + w(u,v)`, why: String.raw`s2에서 구한 $\mathrm{length}(P')=d(u)$를 대입한 것이다.` }] },
      { id: "s4", text: String.raw`$v$의 직전 노드가 어떤 $u$인지는 미리 알 수 없으므로, 가능한 모든 인접 노드 중 거리가 최소가 되는 것을 골라야 한다: $d(v) = \min_u\left($[[blank:다]]$\right)$.`,
        blanks: [{ id: "다", latex: String.raw`d(u) + w(u,v)`, why: String.raw`직전 노드 후보가 여럿이므로 s3의 식을 모든 $u$에 대해 최소화해야 진짜 최단거리가 된다.` }] },
      { id: "s5", text: String.raw`따라서 $d(v)=\min_u(d(u)+w(u,v))$ 이며, 이는 벨만 방정식 $V(s)=\max_a(r+\gamma V(s'))$ 와 구조적으로 동일하다(최소·최대만 다름). 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "condition-number": {
    title: "조건수와 선형시스템의 오차 민감도",
    domain: "numeric",
    subLabel: "수치적 안정성",
    explanation: String.raw`조건수는 입력의 작은 오차가 출력에서 얼마나 증폭되는지 나타내는 지표다. 조건수가 크면(ill-conditioned) 선형회귀의 $(X^TX)^{-1}$ 계산처럼 수치적으로 불안정해진다.<br><br><strong>명제.</strong> $Ax=b$에서 $b$에 오차 $\delta b$가 생기면 $\dfrac{\|\delta x\|}{\|x\|} \le \kappa(A)\dfrac{\|\delta b\|}{\|b\|}$, $\kappa(A)=\|A\|\|A^{-1}\|$.`,
    sections: [
      { id: "s1", text: String.raw`$Ax=b$이고 오차가 섞인 우변을 $b+\delta b$라 하면, 그에 대응하는 해는 $A(x+\delta x)=b+\delta b$를 만족한다.`, blanks: [] },
      { id: "s2", text: String.raw`$Ax=b$를 빼면 $A\delta x=\delta b$, 즉 $\delta x = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`A^{-1}\delta b`, why: String.raw`$A(x+\delta x)=b+\delta b$에서 $Ax=b$를 빼면 $A\delta x=\delta b$, 양변에 $A^{-1}$를 곱한 것이다.` }] },
      { id: "s3", text: String.raw`행렬 노름의 성질 $\|Mv\|\le\|M\|\|v\|$을 적용하면 $\|\delta x\| \le $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`\|A^{-1}\|\|\delta b\|`, why: String.raw`임의의 $M,v$에 대해 $\|Mv\|\le\|M\|\|v\|$를 $M=A^{-1}, v=\delta b$에 적용한 것이다.` }] },
      { id: "s4", text: String.raw`한편 $b=Ax$이므로 같은 성질로 $\|b\|\le\|A\|\|x\|$, 즉 $\dfrac{1}{\|x\|} \le $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`\frac{\|A\|}{\|b\|}`, why: String.raw`$\|b\|\le\|A\|\|x\|$의 양변을 $\|x\|\|b\|$로 나누면 $1/\|x\|\le\|A\|/\|b\|$가 된다.` }] },
      { id: "s5", text: String.raw`두 부등식을 곱하면 $\dfrac{\|\delta x\|}{\|x\|} \le \|A\|\|A^{-1}\|\cdot\dfrac{\|\delta b\|}{\|b\|} = \kappa(A)\dfrac{\|\delta b\|}{\|b\|}$ 이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  }
};
