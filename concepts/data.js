// 수학 × AI 매트릭스 — 개념별 완전한 증명 + 빈칸 문제 데이터.
// 모든 LaTeX 필드는 String.raw로 작성한다: JS 문자열 이스케이프가 백슬래시를
// 삼켜버려 KaTeX가 깨지는 사고(\sum -> sum)를 원천적으로 막기 위함.
//
// 빈칸 규칙: KaTeX auto-render는 "같은 텍스트 노드 안에서" $...$ 를 짝지어 찾는다.
// 빈칸 span이 중간에 끼면 $...$ 가 두 노드로 쪼개져 못 읽으므로, 빈칸 앞뒤로
// $ 를 각각 닫고 새로 연다. \left...\right, \frac{}{} 처럼 두 짝이 반드시
// 붙어 있어야 하는 명령은 빈칸을 사이에 두고 절대 쪼개지 않는다(둘 다 안쪽에
// 넣거나, 통째로 빈칸의 정답으로 만든다).
window.CONCEPTS = {
  "pca": {
    title: "주성분분석(PCA)의 최적 방향",
    domain: "linalg",
    subLabel: "고유값 · 분해",
    explanation: String.raw`데이터를 한 방향으로 뭉쳐서 보고 싶을 때, 어느 방향을 고르면 원래 정보를 가장 많이 남길 수 있을까요? PCA는 "데이터가 가장 넓게 퍼져 있는(분산이 가장 큰) 방향을 고르면 된다"고 답해요. 그리고 그 방향은 신기하게도 공분산행렬의 고유벡터 중 하나로 정확히 떨어집니다.<br><br><strong>명제.</strong> 중심화된 데이터 행렬 $X\in\mathbb{R}^{n\times d}$의 공분산행렬을 $\Sigma=\frac{1}{n}X^TX$ 라 하자. $\|w\|=1$인 $w$ 중 사영분산 $w^T\Sigma w$를 최대화하는 것은 $\Sigma$의 최대 고유값에 대응하는 고유벡터이다.`,
    sections: [
      { id: "s1", text: String.raw`단위벡터 $w$ ($\|w\|=1$, 즉 길이가 1인 방향벡터) 위로 데이터를 사영했을 때, 그 사영값들이 퍼진 정도(분산)는 $\mathrm{Var}(Xw) = w^T\Sigma w$ 로 계산된다.`, blanks: [] },
      { id: "s2", text: String.raw`이런 "제약이 있는 최댓값 찾기"는 라그랑주 승수법으로 풀어요. 제약을 어기면 벌점을 주는 새 변수 $\lambda$(라그랑주 승수)를 도입해서, 원래 목표(분산 최대화)와 제약($\|w\|=1$)을 하나의 식으로 합칩니다: $L(w,\lambda) = w^T\Sigma w - \lambda($[[blank:가]]$)$.`,
        blanks: [{ id: "가", latex: String.raw`w^Tw - 1`, why: String.raw`괄호 안에는 "제약이 지켜졌는지"를 0이 되는 식으로 적어요. 우리 제약은 $\|w\|=1$인데, 이걸 $w^Tw-1=0$ 형태로 바꿔서 그대로 넣은 거예요. 이렇게 등호(=0)로 정리한 제약식을 등호 제약항이라고 불러요.` }] },
      { id: "s3", text: String.raw`함수가 최댓값을 갖는 지점에서는 기울기가 0이라는, 미적분에서 가장 기본적인 성질을 씁니다. $L$을 $w$에 대해 미분해서 0으로 놓으면 $($[[blank:나]]$) = 0$ 이다.`,
        blanks: [{ id: "나", latex: String.raw`2\Sigma w - 2\lambda w`, why: String.raw`$w^T\Sigma w$를 $w$로 미분하면 $2\Sigma w$가 되고, $\lambda(w^Tw-1)$을 $w$로 미분하면 $2\lambda w$가 돼요(둘 다 이차형식을 미분하는 표준 공식입니다). 두 그래디언트의 차를 0으로 놓은 거예요.` }] },
      { id: "s4", text: String.raw`이 식을 정리하면 $\Sigma w = $[[blank:다]] 를 얻는다. 이 모양이 바로 고유값 방정식이라서, $w$는 $\Sigma$의 고유벡터이고 $\lambda$는 그에 대응하는 고유값이라는 걸 알 수 있다.`,
        blanks: [{ id: "다", latex: String.raw`\lambda w`, why: String.raw`직전 식 $2\Sigma w - 2\lambda w = 0$을 2로 나누고 $-2\lambda w$를 반대편으로 옮기면(이항) 나오는 형태예요.` }] },
      { id: "s5", text: String.raw`이제 이 방향에서의 분산을 다시 계산해 보면 $w^T\Sigma w = w^T(\lambda w) = \lambda w^Tw = $[[blank:라]] 를 얻는다. 즉 분산은 정확히 $\lambda$이므로, 분산을 최대화하려면 가능한 고유값 중 가장 큰 것을 골라야 한다.`,
        blanks: [{ id: "라", latex: String.raw`\lambda`, why: String.raw`처음에 $w$를 길이 1인 단위벡터로 잡았으니 $w^Tw=1$이에요. 그러니 $\lambda\cdot 1$만 남아서 그냥 $\lambda$가 됩니다.` }] },
      { id: "s6", text: String.raw`정리하면, 분산을 최대로 보존하는 방향 $w$는 공분산행렬 $\Sigma$의 가장 큰 고유값에 대응하는 고유벡터다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "eigen-diagonalization": {
    title: "대칭행렬의 직교대각화 (스펙트럴 정리)",
    domain: "linalg",
    subLabel: "고유값 · 분해",
    explanation: String.raw`행렬을 다루기 쉬운 형태로 "풀어헤치는" 방법 중 가장 강력한 것이 대각화예요. 특히 대칭행렬(전치해도 자기 자신인 행렬, 공분산행렬이 대표적이에요)은 항상 깔끔하게 대각화된다는 사실이 스펙트럴 정리입니다. PCA를 비롯해 데이터를 고유벡터 축으로 분해하는 거의 모든 기법이 이 정리 위에 서 있어요.<br><br><strong>명제.</strong> $n\times n$ 실수 대칭행렬 $A$($A=A^T$)는 $A=Q\Lambda Q^T$ ($Q$: 직교행렬, $\Lambda$: 대각행렬) 형태로 대각화된다.`,
    sections: [
      { id: "s1", text: String.raw`$A$가 $n\times n$ 실수 대칭행렬이라 하자. 목표는 이런 성질을 가진 $Q,\Lambda$가 실제로 존재함을 보이는 것이다.`, blanks: [] },
      { id: "s2", text: String.raw`대칭행렬의 고유벡터들은 서로 직각을 이룬다는 성질부터 확인해요. 서로 다른 고유값 $\lambda_i\neq\lambda_j$에 대응하는 고유벡터 $v_i,v_j$는 [[blank:가]] 이다 (즉 서로 직교한다).`,
        blanks: [{ id: "가", latex: String.raw`v_i^Tv_j = 0`, why: String.raw`$Av_i=\lambda_iv_i$, $Av_j=\lambda_jv_j$라는 정의를 이용해서 $v_j^TAv_i$와 $v_i^TAv_j$를 각각 계산해 비교하면 $(\lambda_i-\lambda_j)v_i^Tv_j=0$이 나와요. $\lambda_i\neq\lambda_j$라고 가정했으니, 남은 $v_i^Tv_j$가 0이어야만 이 등식이 성립해요. 그래서 직교합니다.` }] },
      { id: "s2b", text: String.raw`(참고: 고유값이 중복될 때는 방금 논증이 그대로 통하지 않는다. 하지만 대칭행렬은 중복된 고유값에서도 그 중복도만큼 독립인 고유벡터가 항상 나오고, 그 안에서 서로 직교하도록 고를 수 있다는 사실이 알려져 있다 — 여기서는 이 사실을 받아들이고 넘어간다.)`, blanks: [] },
      { id: "s3", text: String.raw`이렇게 얻은 $n$개의 고유벡터를 길이 1로 맞춘 뒤(정규직교화) 열로 나란히 세운 행렬을 $Q=[v_1\ \cdots\ v_n]$이라 하면, $Q$는 [[blank:나]] 를 만족하는 직교행렬이다.`,
        blanks: [{ id: "나", latex: String.raw`Q^TQ = I`, why: String.raw`열벡터들이 서로 정규직교(길이 1이고 서로 수직)이므로, $Q^TQ$의 $(i,j)$ 성분은 $v_i\cdot v_j$인데 이 값은 $i=j$일 때만 1이고 나머지는 0이에요. 그러면 결과가 정확히 항등행렬이 됩니다. 이게 바로 "직교행렬"의 정의예요.` }] },
      { id: "s4", text: String.raw`각 열에 대해 $Av_i=\lambda_iv_i$가 성립하므로 이를 행렬 형태로 한 번에 쓰면 $AQ=Q\Lambda$이고, 양변 오른쪽에 $Q^T$를 곱하면 $A = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`Q\Lambda Q^T`, why: String.raw`$AQ=Q\Lambda$의 양쪽에 오른쪽에서 $Q^T$를 곱해요. 그런데 직교행렬은 $QQ^T=I$라는 성질이 있어서, 왼쪽은 $AQQ^T=A$로 정리되고 오른쪽은 그대로 $Q\Lambda Q^T$가 남아요.` }] },
      { id: "s5", text: String.raw`따라서 $A=Q\Lambda Q^T$처럼 직교행렬과 대각행렬로 깔끔하게 분해된다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "gradient-descent": {
    title: "경사하강법의 하강 보장",
    domain: "calc",
    subLabel: "경사기반 옵티마이저",
    explanation: String.raw`경사하강법은 매 스텝마다 "기울기가 가리키는 반대 방향"으로 조금씩 움직여서 손실을 줄이는, 딥러닝 학습의 가장 기본적인 방법이에요. 그런데 "조금씩"의 그 걸음 폭(학습률)이 너무 크면 오히려 손실이 늘어날 수도 있어요. 여기서는 걸음 폭이 충분히 작으면 손실이 실제로 줄어든다는 걸, 함수를 근사하는 표준 도구인 테일러 근사로 보입니다.<br><br><strong>명제.</strong> $\nabla L$이 립시츠 상수 $K$로 립시츠 연속(그래디언트가 갑자기 확 튀지 않고, $K$ 이상의 속도로는 변하지 않는다는 뜻)이면, $\eta<1/K$일 때 $\theta'=\theta-\eta\nabla L(\theta)$는 $L(\theta')\le L(\theta)$를 만족한다.`,
    sections: [
      { id: "s1", text: String.raw`그래디언트가 립시츠 연속이라는 가정에서는 함수값을 아래처럼 2차식으로 위에서 눌러 잡을 수 있다(2차 상한): $L(\theta')\le L(\theta)+\nabla L(\theta)^T(\theta'-\theta)+\frac{K}{2}\|\theta'-\theta\|^2$.`, blanks: [] },
      { id: "s2", text: String.raw`여기에 경사하강법의 갱신식 $\theta'=\theta-\eta\nabla L(\theta)$을 대입하면 $\theta'-\theta = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`-\eta\nabla L(\theta)`, why: String.raw`갱신식을 그대로 옮겨 적으면 나오는 식이에요. 별도의 계산이 필요 없어요.` }] },
      { id: "s3", text: String.raw`이걸 s1의 상한식에 넣고 정리하면 $L(\theta')\le L(\theta)-\eta(1-$[[blank:나]]$)\|\nabla L(\theta)\|^2$ 를 얻는다.`,
        blanks: [{ id: "나", latex: String.raw`\frac{K\eta}{2}`, why: String.raw`대입하면 $-\eta\|\nabla L\|^2+\frac{K\eta^2}{2}\|\nabla L\|^2$이 나오는데, 공통 인수 $-\eta\|\nabla L\|^2$를 밖으로 빼내면 $-\eta\|\nabla L\|^2\left(1-\frac{K\eta}{2}\right)$ 형태로 정리돼요. 괄호 안 $\frac{K\eta}{2}$ 전체가 빈칸의 답이에요.` }] },
      { id: "s4", text: String.raw`이제 학습률이 $\eta<1/K$라는 가정을 쓸 차례다. 이때 $K\eta<1$이므로 $1-\frac{K\eta}{2} > $[[blank:다]] 이고, 그러니 오른쪽의 감소항은 항상 양수다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`$K\eta<1$이면 그 절반인 $K\eta/2$는 $0.5$보다 작아요. 그러니 $1-K\eta/2$는 최소 $0.5$보다 크고, 당연히 0보다도 큽니다.` }] },
      { id: "s5", text: String.raw`정리하면 $L(\theta')\le L(\theta)-(\text{양수})\le L(\theta)$가 되고, 그래디언트가 0이 아닌 이상($\nabla L(\theta)\neq0$) 부등식은 엄격하게 성립한다. 즉 학습률만 적당히 작으면 매 스텝 손실이 실제로 줄어든다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "backprop": {
    title: "역전파(체인룰)의 정확성",
    domain: "calc",
    subLabel: "미분 · 그래디언트",
    explanation: String.raw`신경망은 여러 층을 겹겹이 쌓은 합성함수예요. 이런 함수를 미분할 때 쓰는 도구가 체인룰(연쇄법칙)이고, 이걸 출력층에서부터 거꾸로 층마다 적용해 나가는 알고리즘이 바로 역전파예요. "거꾸로 곱해가며 전파한다"는 이름 그대로, 실제로 뭘 곱하는지 하나씩 따라가 봅니다.<br><br><strong>명제.</strong> $h=Wx$, $z=g(h)$, $L=f(z)$일 때 $\frac{\partial L}{\partial W}$는 체인룰로 세 항의 곱으로 분해된다.`,
    sections: [
      { id: "s1", text: String.raw`$h=Wx$, $z=g(h)$, $L=f(z)$라 하면, $L$은 결국 $W$에 대한 합성함수다.`, blanks: [] },
      { id: "s2", text: String.raw`합성함수를 미분할 땐 체인룰(바깥 함수를 먼저 미분하고, 안쪽 함수의 미분을 곱해나가는 규칙)을 쓴다: $\frac{\partial L}{\partial W} = \frac{\partial L}{\partial z}\cdot$[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`\frac{\partial z}{\partial W}`, why: String.raw`$L=f(z)$이고 $z$가 $W$에 의존하니까, 체인룰의 첫 단계는 "$L$이 $z$에 대해 변하는 정도" 곱하기 "$z$가 $W$에 대해 변하는 정도", 즉 $\frac{\partial L}{\partial z}\cdot\frac{\partial z}{\partial W}$예요.` }] },
      { id: "s3", text: String.raw`그런데 $z$는 $h$를 거쳐서만 $W$에 의존하니, 같은 방식으로 한 번 더 쪼갤 수 있다: $\frac{\partial z}{\partial W} = \frac{\partial z}{\partial h}\cdot$[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`\frac{\partial h}{\partial W}`, why: String.raw`$z=g(h)$이고 $h=Wx$이니, $\frac{\partial z}{\partial W}$도 똑같은 체인룰로 $\frac{\partial z}{\partial h}\cdot\frac{\partial h}{\partial W}$로 나뉘어요.` }] },
      { id: "s4", text: String.raw`$h=Wx$라는 가장 단순한 선형식만 남았으니 직접 미분할 수 있다: $\frac{\partial h}{\partial W} = $[[blank:다]] 이다 (성분 기준으로는 $\partial h_i/\partial W_{ij}=x_j$).`,
        blanks: [{ id: "다", latex: String.raw`x`, why: String.raw`$h=Wx$를 $W$의 각 성분으로 미분하면, 곱해져 있던 $x$의 해당 성분만 남아요. 선형식의 미분이라 아주 단순해요.` }] },
      { id: "s5", text: String.raw`세 조각을 다시 이어 붙이면 $\frac{\partial L}{\partial W} = \frac{\partial L}{\partial z}\cdot\frac{\partial z}{\partial h}\cdot x$ 를 얻는다 (실제로 $W$가 행렬이라 이 곱은 정확히는 벡터끼리의 외적 형태가 되지만, 흐름은 스칼라일 때와 완전히 같다). 층을 하나씩 거슬러 올라가며 곱해나가는 이 과정이 바로 역전파의 정체다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "lagrange-kkt": {
    title: "라그랑주 승수법과 KKT 조건",
    domain: "calc",
    subLabel: "제약 최적화",
    explanation: String.raw`"이 조건을 지키면서 저걸 최소화하고 싶다" — 이런 부등식 제약이 있는 최적화 문제에서, 최적해가 반드시 만족해야 하는 조건을 정리한 것이 KKT(Karush-Kuhn-Tucker) 조건이에요. SVM의 쌍대문제, PPO/TRPO의 제약 최적화 모두 이 조건 위에 서 있습니다.<br><br><strong>명제.</strong> (제약이 지나치게 뒤틀려 있지 않다는 조건 — constraint qualification이라고 불러요 — 이 성립할 때) $\min f(x)\ \text{s.t.}\ g(x)\le0$의 최적해 $x^*$에서 어떤 $\mu^*\ge0$이 존재해 $\nabla f(x^*)+\mu^*\nabla g(x^*)=0$, $\mu^*g(x^*)=0$이 성립한다.`,
    sections: [
      { id: "s1", text: String.raw`먼저 라그랑주 승수법대로, 제약을 어긴 정도에 벌점 $\mu\ge0$을 곱해 목적함수에 더한 라그랑지안을 만든다: $\mathcal{L}(x,\mu)=f(x)+\mu g(x)$.`, blanks: [] },
      { id: "s2", text: String.raw`(제약이 너무 뒤틀려 있지 않다는 조건, 즉 constraint qualification이 성립한다고 가정하면) 최적해 $x^*$에서는 다른 최적화 문제와 마찬가지로 "$x$ 방향으로 더 나아져도 소용없다"는 1차 조건이 성립한다: $\nabla_x\mathcal{L}(x^*,\mu^*) = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`0`, why: String.raw`라그랑지안이 $x^*$에서 극값(최소)을 가지려면, 미분(그래디언트)이 0이어야 한다는 건 경사하강법에서도 쓰던 바로 그 정류점 조건이에요. 다만 이게 성립하려면 제약이 너무 뒤틀려 있지 않아야 하는데(constraint qualification), 이 증명에서는 그 조건이 만족된다고 가정해요 — 항상 자동으로 성립하는 건 아니에요.` }] },
      { id: "s3", text: String.raw`이 조건을 라그랑지안 정의대로 풀어 쓰면 $\nabla f(x^*) + $[[blank:나]]$ = 0$ 이다.`,
        blanks: [{ id: "나", latex: String.raw`\mu^*\nabla g(x^*)`, why: String.raw`$\mathcal{L}(x,\mu)=f(x)+\mu g(x)$를 그대로 $x$에 대해 미분한 결과예요.` }] },
      { id: "s4", text: String.raw`이제 제약이 느슨한 경우, 즉 $g(x^*)<0$(제약을 여유 있게 만족하는 경우)를 생각해 보자. 이럴 때 최적성이 깨지지 않으려면 $\mu^* = $[[blank:다]] 이어야 한다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`제약을 여유 있게 지키고 있다면, 그 제약은 사실 답에 아무 영향도 주지 않는 셈이에요. 영향이 없는 제약에 벌점(승수)이 붙어 있으면 이상하니까, 그 승수는 0이어야 앞뒤가 맞아요. 이게 상보슬랙성이라는 조건의 직관이에요.` }] },
      { id: "s5", text: String.raw`정리하면 $\mu^*g(x^*)=0$(상보슬랙성)과 $\nabla f(x^*)+\mu^*\nabla g(x^*)=0$, $\mu^*\ge0$이 모두 성립하며, 이 세 조건을 합쳐서 KKT 조건이라고 부른다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "bayes-theorem": {
    title: "베이즈 정리",
    domain: "prob",
    subLabel: "분포 · 추정",
    explanation: String.raw`"평소에 믿던 확률(사전확률)"에 "새로 관찰한 증거"를 더하면, 믿음이 어떻게 업데이트될까요? 베이즈 정리는 이 질문에 정확한 공식으로 답해요. 나이브베이즈 분류기부터 베이지안 딥러닝까지, 확률적 추론이라는 이름이 붙은 거의 모든 방법의 뿌리가 여기예요.<br><br><strong>명제.</strong> 사건 $A,B$($P(B)>0$)에 대해 $P(A|B) = \dfrac{P(B|A)P(A)}{P(B)}$.`,
    sections: [
      { id: "s1", text: String.raw`조건부확률(어떤 사건이 일어났다는 전제 아래 다른 사건이 일어날 확률)의 정의를 그대로 적으면 $P(A|B)=\dfrac{P(A\cap B)}{P(B)}$, $P(B|A)=\dfrac{P(A\cap B)}{P(A)}$ 이다.`, blanks: [] },
      { id: "s2", text: String.raw`두 식은 똑같은 $P(A\cap B)$(두 사건이 동시에 일어날 확률)를 담고 있으니, 두 번째 식을 $P(A\cap B)$에 대해 정리하면 $P(A\cap B) = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`P(B|A)P(A)`, why: String.raw`$P(B|A)=P(A\cap B)/P(A)$의 양쪽에 $P(A)$를 곱하기만 하면 나오는 식이에요.` }] },
      { id: "s3", text: String.raw`이걸 첫 번째 식의 $P(A\cap B)$ 자리에 대신 넣으면 $P(A|B) = $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`\dfrac{P(B|A)P(A)}{P(B)}`, why: String.raw`방금 구한 $P(A\cap B)=P(B|A)P(A)$를, $P(A|B)=P(A\cap B)/P(B)$의 분자 자리에 그대로 바꿔 끼운 거예요.` }] },
      { id: "s4", text: String.raw`(참고로 분모 $P(B)$가 직접 안 주어질 땐, $A$가 서로소인 사건들 $A_1,\dots,A_n$ 중 하나일 경우 전확률법칙으로 $P(B) = $[[blank:다]] 처럼 풀어 쓸 수 있다.)`,
        blanks: [{ id: "다", latex: String.raw`\sum_i P(B|A_i)P(A_i)`, why: String.raw`$B$가 일어날 모든 경우의 수를, $A_i$ 각각이 원인이었을 경우로 나눠서 다 더하는 방법이에요. 이걸 전확률법칙이라고 불러요.` }] },
      { id: "s5", text: String.raw`따라서 $P(A|B) = \dfrac{P(B|A)P(A)}{P(B)}$ 이며, 이것이 바로 베이즈 정리다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "mle": {
    title: "최대우도추정(MLE)과 로그우도",
    domain: "prob",
    subLabel: "분포 · 추정",
    explanation: String.raw`"지금 가진 데이터가 나올 확률이 가장 높아지는 파라미터는 뭘까?" — 이 질문에 답하는 방법이 최대우도추정(MLE)이에요. 그런데 우도는 확률들을 계속 곱한 식이라 계산이 번거로워요. 그래서 실전에서는 로그를 씌워 곱셈을 덧셈으로 바꾼 "로그우도"를 대신 최대화합니다. 이 트릭이 왜 결과에 영향을 주지 않는지 확인해 봐요.<br><br><strong>명제.</strong> i.i.d. 표본 $x_1,\dots,x_n$에 대해 우도 $L(\theta)=\prod_i p(x_i|\theta)$를 최대화하는 $\theta$는 로그우도 $\sum_i\log p(x_i|\theta)$를 최대화하는 $\theta$와 같다.`,
    sections: [
      { id: "s1", text: String.raw`표본들이 서로 독립이고 같은 분포에서 나왔다는 i.i.d. 가정 덕분에, 전체가 동시에 관측될 확률은 각 확률의 곱으로 쓸 수 있다: $L(\theta) = P(x_1,\dots,x_n|\theta) = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`\prod_{i=1}^n p(x_i|\theta)`, why: String.raw`서로 독립인 사건들이 동시에 일어날 확률은 각 확률의 곱이라는, 확률의 가장 기본적인 성질이에요.` }] },
      { id: "s2", text: String.raw`$\log$ 함수는 입력이 커질수록 값도 계속 커지는(강한 증가함수) 성질이 있다. 그래서 $L(\theta)$를 최대화하는 것과 $\log L(\theta)$를 최대화하는 것은 결과가 같다: $\arg\max_\theta L(\theta) = \arg\max_\theta $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`\log L(\theta)`, why: String.raw`어떤 함수에 계속 증가하는 함수(여기선 log)를 씌워도, 원래 함수가 최대였던 지점은 그대로 최대로 남아요. 그래서 argmax의 위치가 안 바뀝니다.` }] },
      { id: "s3", text: String.raw`이제 로그를 실제로 씌워보면, 곱이 합으로 바뀌는 로그의 성질 덕분에 $\log L(\theta) = \sum_{i=1}^n $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`\log p(x_i|\theta)`, why: String.raw`$\log(a\times b)=\log a+\log b$라는, 로그의 가장 기본적인 성질을 곱 전체에 적용한 거예요.` }] },
      { id: "s4", text: String.raw`따라서 $\arg\max_\theta L(\theta) = \arg\max_\theta \sum_i \log p(x_i|\theta)$ 이다. 계산하기 번거로운 곱셈 문제를, 결과는 같으면서 훨씬 다루기 쉬운 덧셈 문제로 바꾼 셈이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "markov-mdp": {
    title: "벨만 기대방정식의 유도",
    domain: "prob",
    subLabel: "마르코프 · 확률과정",
    explanation: String.raw`강화학습에서 "이 상태가 얼마나 좋은가"를 나타내는 가치함수는, 사실 아주 먼 미래까지의 보상을 전부 더한 값이에요. 이걸 매번 끝까지 계산하는 대신, "지금 당장의 보상 + 다음 상태의 가치"라는 재귀식 하나로 표현할 수 있다는 게 벨만 기대방정식이에요. 강화학습 알고리즘 대부분이 이 재귀식에서 출발합니다.<br><br><strong>명제.</strong> $V^\pi(s)=\mathbb{E}_\pi\left[\sum_{k=0}^\infty\gamma^kr_{t+k}\middle|s_t=s\right]$는 $V^\pi(s)=\mathbb{E}_\pi[r_t+\gamma V^\pi(s_{t+1})|s_t=s]$를 만족한다.`,
    sections: [
      { id: "s1", text: String.raw`가치함수의 정의부터 그대로 적어보면 $V^\pi(s) = \mathbb{E}_\pi\left[\sum_{k=0}^\infty \gamma^k r_{t+k}\ \middle|\ s_t=s\right]$ 이다 (지금부터 미래 보상을 전부 할인해서 더한 기댓값).`, blanks: [] },
      { id: "s2", text: String.raw`이 무한합을 재귀식으로 바꾸려면, 합의 $k=$[[blank:가]] 항 — 즉 지금 당장의 보상 — 을 나머지와 분리하는 게 핵심 아이디어다.`,
        blanks: [{ id: "가", latex: String.raw`0`, why: String.raw`$k=0$항이 바로 지금 시점 $t$의 보상 $r_t$예요. 이걸 따로 떼어내야 남은 부분이 "다음 시점부터 시작하는 리턴"이라는 깔끔한 형태로 남습니다.` }] },
      { id: "s3", text: String.raw`실제로 분리하면 $\sum_{k=0}^\infty \gamma^k r_{t+k} = r_t + \gamma\sum_{k=0}^\infty $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`\gamma^k r_{t+1+k}`, why: String.raw`$k=0$항($r_t$)을 떼어내고 나면 $k=1,2,\dots$가 남는데, 이 인덱스를 $k\to k+1$로 다시 맞춰주면 $\gamma$가 하나 밖으로 빠지면서 $\gamma\sum_k\gamma^kr_{t+1+k}$ 모양이 돼요.` }] },
      { id: "s4", text: String.raw`그런데 $\sum_{k=0}^\infty \gamma^k r_{t+1+k}$는 딱 "시점 $t+1$에서 바라본 리턴"의 정의와 같은 모양이다. 그러니 그 기댓값은 [[blank:다]] 와 같다.`,
        blanks: [{ id: "다", latex: String.raw`V^\pi(s_{t+1})`, why: String.raw`s1에서 썼던 가치함수의 정의를, 이번엔 시점 $t+1$·상태 $s_{t+1}$에 그대로 다시 적용한 것뿐이에요. 다만 이게 성립하려면 "미래는 지금 상태만으로 결정되고, 그 이전 경로는 상관없다"는 마르코프 성질이 필요해요 — 그래서 $s_t=s$라는 조건이 $s_{t+1}$로 자연스럽게 이어지는 거예요.` }] },
      { id: "s5", text: String.raw`따라서 $V^\pi(s) = \mathbb{E}_\pi[r_t + \gamma V^\pi(s_{t+1}) | s_t=s]$ 이다. "지금 보상 + 할인된 다음 상태의 가치"라는 이 재귀식이 바로 벨만 기대방정식이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "clt": {
    title: "표본평균의 표준화 (중심극한정리의 발판)",
    domain: "prob",
    subLabel: "확률의 기초",
    explanation: String.raw`동전을 10번 던진 평균과 10000번 던진 평균, 어느 쪽이 더 안정적일까요? 표본이 많아질수록 표본평균은 원래 분포가 무엇이든 상관없이 정규분포에 가까워진다는 게 중심극한정리예요. 그 정리로 가기 위한 첫 걸음으로, 표본평균을 "평균 0, 분산 1"로 깔끔하게 맞추는(표준화) 계산부터 확인해 봐요.<br><br><strong>명제.</strong> $X_1,\dots,X_n$이 i.i.d.이고 $E[X_i]=\mu$, $\mathrm{Var}(X_i)=\sigma^2$이면, $\bar X_n=\frac1n\sum X_i$를 표준화한 $Z_n=\frac{\bar X_n-\mu}{\sigma/\sqrt n}$은 평균 0, 분산 1을 갖는다.`,
    sections: [
      { id: "s1", text: String.raw`기댓값은 항 하나하나에 나눠 씌워도 된다는 선형성 덕분에 $E[\bar X_n] = \frac1n\sum_i E[X_i] = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`\mu`, why: String.raw`모든 $X_i$의 기댓값이 똑같이 $\mu$니까, $\mu$를 $n$번 더해서 $n$으로 나누면 그대로 $\mu$가 남아요.` }] },
      { id: "s2", text: String.raw`$X_i$들이 서로 독립이라 공분산 항들이 사라지므로, 분산은 $\mathrm{Var}(\bar X_n) = \frac{1}{n^2}\sum_i \mathrm{Var}(X_i) = \frac{n\sigma^2}{n^2} = $[[blank:나]] 로 정리된다.`,
        blanks: [{ id: "나", latex: String.raw`\frac{\sigma^2}{n}`, why: String.raw`독립인 변수들을 더한 합의 분산은, 각자의 분산을 그냥 더한 것과 같아요(둘 사이의 "함께 움직이는 정도"인 공분산이 0이라서요). $n\sigma^2/n^2$을 약분하면 $\sigma^2/n$이 남습니다.` }] },
      { id: "s3", text: String.raw`이제 표준화 변수 $Z_n = \dfrac{\bar X_n - \mu}{\sigma/\sqrt n}$의 기댓값을 구해보면 $E[Z_n] = \dfrac{E[\bar X_n]-\mu}{\sigma/\sqrt n} = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`s1에서 $E[\bar X_n]=\mu$라는 걸 구했으니, 분자는 $\mu-\mu=0$이 돼요. 그러면 전체 값도 0입니다.` }] },
      { id: "s4", text: String.raw`분산도 같은 방식으로 구해보면 $\mathrm{Var}(Z_n) = \dfrac{\mathrm{Var}(\bar X_n)}{\sigma^2/n} = \dfrac{\sigma^2/n}{\sigma^2/n} = $[[blank:라]] 이다.`,
        blanks: [{ id: "라", latex: String.raw`1`, why: String.raw`분자와 분모가 똑같이 $\sigma^2/n$이라서, 나누면 그냥 1이 돼요.` }] },
      { id: "s5", text: String.raw`정리하면 $Z_n$은 평균 0, 분산 1로 표준화되어 있다. 여기에 중심극한정리를 더하면, $n\to\infty$일 때 $Z_n$의 분포가 표준정규분포 $N(0,1)$로 수렴한다는 훨씬 강력한 결과까지 이어진다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "entropy-crossentropy": {
    title: "교차엔트로피와 엔트로피·KL발산의 관계",
    domain: "info",
    subLabel: "엔트로피 · 손실",
    explanation: String.raw`분류 모델을 학습시킬 때 거의 항상 쓰는 교차엔트로피 손실, 사실은 "정답분포 자체의 불확실성(엔트로피)"과 "내 예측이 정답과 얼마나 다른가(KL발산)"를 더한 값이에요. 이 관계를 알면, 왜 교차엔트로피를 줄이는 게 곧 예측을 정답에 가깝게 만드는 일인지 납득이 됩니다.<br><br><strong>명제.</strong> 두 분포 $p,q$에 대해 $H(p,q) = H(p) + D_{KL}(p\|q)$.`,
    sections: [
      { id: "s1", text: String.raw`교차엔트로피(진짜 분포 $p$와 예측 분포 $q$를 비교하는 지표)의 정의는 $H(p,q) = -\sum_x p(x)\log q(x)$ 이다.`, blanks: [] },
      { id: "s2", text: String.raw`KL발산(두 분포가 얼마나 다른지 재는 지표)의 정의를 로그의 성질로 풀어보면 $D_{KL}(p\|q) = \sum_x p(x)\log p(x) - \sum_x $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`p(x)\log q(x)`, why: String.raw`$\log(p/q)=\log p-\log q$로 나눈 뒤, 양쪽에 $p(x)$를 곱하고 합을 두 조각으로 갈라놓은 거예요.` }] },
      { id: "s3", text: String.raw`이 중 첫 항 $\sum_x p(x)\log p(x)$ 를 잘 보면, 엔트로피의 정의와 부호만 반대라는 걸 알 수 있다. 즉 이 항은 [[blank:나]] 와 같다.`,
        blanks: [{ id: "나", latex: String.raw`-H(p)`, why: String.raw`엔트로피는 $H(p)=-\sum p(x)\log p(x)$로 정의돼요. 부호를 뒤집으면 $\sum p(x)\log p(x)=-H(p)$가 그대로 나옵니다.` }] },
      { id: "s4", text: String.raw`이를 대입하면 $D_{KL}(p\|q) = -H(p) - \sum_x p(x)\log q(x) = -H(p) + $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`H(p,q)`, why: String.raw`$-\sum p(x)\log q(x)$는 s1에서 이미 봤듯이 교차엔트로피 $H(p,q)$의 정의 그 자체예요.` }] },
      { id: "s5", text: String.raw`정리하면 $D_{KL}(p\|q)=H(p,q)-H(p)$, 즉 $H(p,q)=H(p)+D_{KL}(p\|q)$ 이다. 교차엔트로피는 "정답분포의 원래 불확실성" + "내 예측이 틀린 만큼의 벌점"으로 이루어져 있는 셈이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "kl-divergence": {
    title: "KL발산의 비음성 (Gibbs 부등식)",
    domain: "info",
    subLabel: "발산 · 상호정보",
    explanation: String.raw`"두 분포가 얼마나 다른가"를 재는 KL발산은 절대 음수가 되지 않아요. 이 사실 덕분에 우리는 안심하고 KL발산을 손실함수의 정규화항으로 최소화할 수 있어요(VAE의 ELBO, 지식증류 등에서 계속 등장해요). 그 비음성이 어디서 나오는지, 볼록함수의 대표적인 도구인 옌센 부등식으로 확인해 봅니다.<br><br><strong>명제.</strong> 임의의 확률분포 $p,q$에 대해 $D_{KL}(p\|q)\ge0$, 등호는 $p=q$일 때만 성립.`,
    sections: [
      { id: "s1", text: String.raw`KL발산의 정의를 부호만 뒤집어 다시 써보면 $D_{KL}(p\|q) = \sum_x p(x)\log\dfrac{p(x)}{q(x)} = -\sum_x p(x)\log\dfrac{q(x)}{p(x)}$ 이다.`, blanks: [] },
      { id: "s2", text: String.raw`$\log$는 오목함수(그래프가 위로 볼록한 함수)이므로, "평균 낸 뒤 함수에 넣은 값"이 "함수에 먼저 넣고 평균 낸 값"보다 작거나 같다는 옌센 부등식을 쓸 수 있다: $\sum_x p(x)\log\dfrac{q(x)}{p(x)} \le \log($[[blank:가]]$)$.`,
        blanks: [{ id: "가", latex: String.raw`\sum_x p(x)\cdot\frac{q(x)}{p(x)}`, why: String.raw`옌센 부등식 $E[f(X)]\le f(E[X])$에서 $X=q(x)/p(x)$로, 기댓값은 $p$를 기준으로 잡은 거예요. "log를 먼저 씌우고 더한 값"이 "먼저 더하고 log를 씌운 값"보다 작거나 같다는 뜻이에요.` }] },
      { id: "s3", text: String.raw`괄호 안 합을 정리해보면, $p(x)$끼리 약분되면서 $\sum_x p(x)\cdot\dfrac{q(x)}{p(x)} = \sum_x q(x) = $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`1`, why: String.raw`$q$도 어엿한 확률분포이니, 모든 경우를 다 더한 값(전체 합)은 항상 1이에요. 이건 확률의 가장 기본적인 약속이에요. (엄밀히는 $p(x)>0$인 곳에서 $q(x)$도 0이 아니어야 이 약분이 안전한데, 그렇지 않은 곳에서는 KL발산 자체가 $+\infty$로 정의되어 부등식이 자동으로 성립해요.)` }] },
      { id: "s4", text: String.raw`따라서 $\sum_x p(x)\log\dfrac{q(x)}{p(x)} \le \log 1 = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`$\log 1 = 0$은 로그함수의 기본값이에요($e^0=1$이니까요).` }] },
      { id: "s5", text: String.raw`처음에 뒤집었던 부호를 다시 되돌리면 $D_{KL}(p\|q)\ge0$ 를 얻는다. 그리고 옌센 부등식의 등호조건($q(x)/p(x)$가 모든 $x$에서 똑같은 상수일 때)에 의해, 등호는 정확히 $p=q$일 때만 성립한다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "attention-scaling": {
    title: "어텐션의 스케일링 (√d로 나누는 이유)",
    domain: "linalg",
    subLabel: "고유값 · 분해",
    explanation: String.raw`트랜스포머의 셀프어텐션은 $QK^T$(질의와 키의 내적)를 구한 다음, 바로 소프트맥스를 씌우지 않고 $\sqrt d$로 한 번 나눠줘요. 왜 굳이 이 나눗셈이 필요할까요? 나눠주지 않으면 내적값의 분산이 차원 $d$에 비례해서 커지고, 그러면 소프트맥스 출력이 거의 원-핫(한 곳만 1, 나머지는 0에 가까운)처럼 극단적으로 변해서 그래디언트가 사라져버려요.<br><br><strong>명제.</strong> $q,k\in\mathbb{R}^d$의 각 성분이 평균 0, 분산 1로 독립이면 $(q\cdot k)/\sqrt d$의 분산은 1이다.`,
    sections: [
      { id: "s1", text: String.raw`$q,k\in\mathbb{R}^d$의 각 성분이 서로 독립이고 평균 0, 분산 1이라 하자. 두 벡터의 내적은 $q\cdot k = \sum_{i=1}^d q_ik_i$ 로 계산된다.`, blanks: [] },
      { id: "s2", text: String.raw`서로 독립인 항들을 더했으므로, 분산도 그냥 각 항의 분산을 더하면 된다: $\mathrm{Var}(q\cdot k) = \sum_{i=1}^d \mathrm{Var}(q_ik_i) = d\cdot$[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`\mathrm{Var}(q_1k_1)`, why: String.raw`모든 $q_ik_i$가 같은 분포에서 나오니 분산도 다 똑같아요. 그러니 $d$개를 더한 건 그냥 한 항의 분산에 $d$를 곱한 것과 같아요.` }] },
      { id: "s3", text: String.raw`이제 그 한 항의 분산을 계산해보자. $q_1,k_1$이 독립이고 평균 0이므로 $\mathrm{Var}(q_1k_1) = E[q_1^2]E[k_1^2] = $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`1`, why: String.raw`평균 0, 분산 1인 변수는 $E[q_1^2]=\mathrm{Var}(q_1)=1$을 만족해요(분산의 정의 그 자체예요). $k_1$도 마찬가지라 $E[k_1^2]=1$, 곱하면 1이 됩니다.` }] },
      { id: "s4", text: String.raw`그러니 $\mathrm{Var}(q\cdot k)=d$이고, 이를 $\sqrt d$로 나눈 $\dfrac{q\cdot k}{\sqrt d}$의 분산은 $\dfrac{d}{(\sqrt d)^2} = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`1`, why: String.raw`상수 $c$를 곱하면 분산은 $c^2$배가 된다는 성질을 $c=1/\sqrt d$로 적용해요. 그러면 분산이 $1/d$배가 되고, 원래 분산이 $d$였으니 $d\times(1/d)=1$이 남습니다.` }] },
      { id: "s5", text: String.raw`따라서 $QK^T/\sqrt d$로 나눠주면, 내적의 분산이 차원 $d$가 얼마든 상관없이 항상 1로 유지된다. 이래야 소프트맥스에 너무 크거나 작은 값이 들어가지 않아서 학습이 안정된다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "convex-jensen": {
    title: "볼록함수와 옌센 부등식",
    domain: "calc",
    subLabel: "함수의 성질",
    explanation: String.raw`그래프가 아래로 오목하지 않고 위로 볼록(∪ 모양)한 함수를 볼록함수라고 불러요. 이 볼록함수의 정의를 "두 점"이 아니라 "확률변수 전체"로 확장한 것이 옌센 부등식이에요. ELBO를 유도할 때도, KL발산이 항상 0 이상임을 보일 때도 계속 등장하는, 생성모델 이론의 숨은 주역이에요.<br><br><strong>명제.</strong> $f$가 볼록함수이면 임의의 확률변수 $X$에 대해 $f(E[X])\le E[f(X)]$.`,
    sections: [
      { id: "s1", text: String.raw`$f$가 볼록함수라는 건, 두 점 $x,y$를 아무 비율 $t\in[0,1]$로 섞었을 때 함수값이 각 점의 함수값을 같은 비율로 섞은 것보다 작거나 같다는 뜻이다: $f(tx+(1-t)y)\le tf(x)+(1-t)f(y)$.`, blanks: [] },
      { id: "s2", text: String.raw`이 "두 점" 버전을 여러 점 $x_1,\dots,x_n$과 가중치 $p_i\ge0,\sum_ip_i=1$로 확장하면(가중평균에 대해서도 똑같은 부등식이 성립한다) $f\left(\sum_i p_ix_i\right) \le \sum_i$[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`p_if(x_i)`, why: String.raw`두 점에 대한 볼록성 부등식을 점을 하나씩 늘려가며 반복 적용하면, 결국 여러 점의 가중평균에 대해서도 같은 형태의 부등식이 성립한다는 걸 보일 수 있어요.` }] },
      { id: "s3", text: String.raw`이제 이산 확률변수 $X$가 값 $x_i$를 확률 $p_i$로 갖는다고 생각해보자. 그러면 $\sum_i p_ix_i = $[[blank:나]] 이다 (가중평균이 곧 기댓값의 정의이기 때문이다).`,
        blanks: [{ id: "나", latex: String.raw`E[X]`, why: String.raw`값 $x_i$를 확률 $p_i$만큼 가중해서 더한 것, 그게 바로 기댓값의 정의예요.` }] },
      { id: "s4", text: String.raw`같은 논리로 $\sum_i p_if(x_i) = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`E[f(X)]`, why: String.raw`$f(X)$도 하나의 확률변수라고 보면, 그 값 $f(x_i)$를 확률 $p_i$로 가중평균한 것이니 똑같이 기댓값의 정의예요.` }] },
      { id: "s5", text: String.raw`s2의 부등식에 이 둘을 대입하면 $f(E[X])\le E[f(X)]$ 이다. 이것이 옌센 부등식이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "shortest-path-dp": {
    title: "최단경로의 최적 부분구조와 벨만 방정식",
    domain: "disc",
    subLabel: "알고리즘 기초",
    explanation: String.raw`강화학습의 가치반복(Value Iteration)과, 그래프에서 최단경로를 구하는 동적계획법은 사실 같은 아이디어에서 나왔어요. 바로 "최적 부분구조" — 전체 최적해의 일부분도 그 자체로 최적이어야 한다는 통찰이에요. 최단경로 버전으로 이 통찰을 직접 확인해 봅니다.<br><br><strong>명제.</strong> 노드 $s$에서 $v$까지의 최단거리 $d(v)$는 $v$의 모든 인접 노드 $u$에 대해 $d(v)=\min_u(d(u)+w(u,v))$ 를 만족한다.`,
    sections: [
      { id: "s1", text: String.raw`$s$에서 $v$까지의 어떤 한 최단경로를 $P$라 하고, $P$ 위에서 $v$ 바로 직전에 거치는 노드를 $u$라 하자.`, blanks: [] },
      { id: "s2", text: String.raw`여기서 핵심은, $P$가 최단경로라면 그 일부분(부분경로)도 반드시 최단경로여야 한다는 것이다. 즉 $P$에서 $s$부터 $u$까지의 부분경로 길이는 $\mathrm{length}(P') = $[[blank:가]] 이어야 한다.`,
        blanks: [{ id: "가", latex: String.raw`d(u)`, why: String.raw`만약 이 부분경로 $P'$가 진짜 최단거리 $d(u)$보다 길다면, $P'$ 자리에 $s$에서 $u$까지의 진짜 최단경로를 갈아 끼워서 $P$보다 더 짧은 $s$-$v$ 경로를 만들 수 있어요. 이건 $P$가 최단경로라는 애초의 가정과 모순이니, $P'$의 길이는 $d(u)$일 수밖에 없어요(귀류법이라는 논증 방식이에요).` }] },
      { id: "s3", text: String.raw`이걸 이용하면 $P$ 전체의 길이는 $d(v) = \mathrm{length}(P') + w(u,v) = $[[blank:나]] 로 쓸 수 있다.`,
        blanks: [{ id: "나", latex: String.raw`d(u) + w(u,v)`, why: String.raw`s2에서 구한 $\mathrm{length}(P')=d(u)$를 그대로 대입하기만 하면 돼요.` }] },
      { id: "s4", text: String.raw`그런데 $v$ 바로 직전 노드가 실제로 어떤 $u$인지는 미리 알 수 없다. 그러니 인접한 노드들을 전부 후보로 놓고, 그중 거리가 가장 짧아지는 것을 고르면 된다: $d(v) = \min_u($[[blank:다]]$)$.`,
        blanks: [{ id: "다", latex: String.raw`d(u) + w(u,v)`, why: String.raw`직전 노드 후보가 여럿이니, s3에서 얻은 식을 가능한 모든 $u$에 대해 계산해보고 그중 최소를 골라야 진짜 최단거리가 나와요.` }] },
      { id: "s5", text: String.raw`따라서 $d(v)=\min_u(d(u)+w(u,v))$ 이다. 이 식은 강화학습의 벨만 방정식 $V(s)=\max_a(r+\gamma V(s'))$ 와 구조가 완전히 같다 — 최소를 찾느냐 최대를 찾느냐만 다를 뿐, "부분 최적해를 이어 붙여 전체 최적해를 만든다"는 아이디어는 똑같다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "condition-number": {
    title: "조건수와 선형시스템의 오차 민감도",
    domain: "numeric",
    subLabel: "수치적 안정성",
    explanation: String.raw`컴퓨터로 계산할 땐 아주 작은 반올림 오차가 늘 섞여요. 문제는 이 작은 오차가 계산 과정에서 얼마나 크게 부풀려지느냐인데, 그 부풀림 정도를 미리 알려주는 지표가 조건수예요. 조건수가 크면(ill-conditioned) 선형회귀에서 $(X^TX)^{-1}$을 구하는 것처럼, 이론적으로는 맞는 계산도 수치적으로 불안정해질 수 있어요.<br><br><strong>명제.</strong> $Ax=b$에서 $b$에 오차 $\delta b$가 생기면 $\dfrac{\|\delta x\|}{\|x\|} \le \kappa(A)\dfrac{\|\delta b\|}{\|b\|}$, $\kappa(A)=\|A\|\|A^{-1}\|$.`,
    sections: [
      { id: "s1", text: String.raw`$Ax=b$의 우변에 작은 오차가 섞여 $b+\delta b$가 되었다고 하자. 그에 대응하는 해도 조금 바뀌어서 $A(x+\delta x)=b+\delta b$를 만족한다.`, blanks: [] },
      { id: "s2", text: String.raw`원래 식 $Ax=b$를 빼서 오차끼리의 관계만 남기면 $A\delta x=\delta b$, 즉 $\delta x = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`A^{-1}\delta b`, why: String.raw`$A(x+\delta x)=b+\delta b$에서 $Ax=b$를 빼면 $A\delta x=\delta b$가 남아요. 양쪽에 $A^{-1}$를 곱하면 $\delta x$가 정리돼요.` }] },
      { id: "s3", text: String.raw`행렬을 곱하면 크기가 그 행렬의 노름만큼 이내로만 커진다는 성질($\|Mv\|\le\|M\|\|v\|$)을 적용하면 $\|\delta x\| \le $[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`\|A^{-1}\|\|\delta b\|`, why: String.raw`임의의 행렬 $M$과 벡터 $v$에 대해 성립하는 $\|Mv\|\le\|M\|\|v\|$를, $M=A^{-1}$, $v=\delta b$로 놓고 적용한 거예요.` }] },
      { id: "s4", text: String.raw`한편 $b=Ax$이니 같은 성질을 거꾸로도 쓸 수 있다: $\|b\|\le\|A\|\|x\|$, 이걸 정리하면 $\dfrac{1}{\|x\|} \le $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`\frac{\|A\|}{\|b\|}`, why: String.raw`$\|b\|\le\|A\|\|x\|$의 양쪽을 $\|x\|\|b\|$로 나누면 $1/\|x\|\le\|A\|/\|b\|$가 나와요.` }] },
      { id: "s5", text: String.raw`두 부등식을 곱하면 $\dfrac{\|\delta x\|}{\|x\|} \le \|A\|\|A^{-1}\|\cdot\dfrac{\|\delta b\|}{\|b\|} = \kappa(A)\dfrac{\|\delta b\|}{\|b\|}$ 를 얻는다. 조건수 $\kappa(A)$가 크면, 입력의 작은 오차 비율이 그만큼 크게 증폭돼서 해의 오차 비율로 나타난다는 뜻이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  }
};
