// 수학 × AI 매트릭스 — 개념별 완전한 증명 + 빈칸 문제 데이터.
// 모든 LaTeX 필드는 String.raw로 작성한다: JS 문자열 이스케이프가 백슬래시를
// 삼켜버려 KaTeX가 깨지는 사고(\sum -> sum)를 원천적으로 막기 위함.
//
// 빈칸 규칙: KaTeX auto-render는 같은 텍스트 노드 안에서 $...$ 를 짝지어 찾는다.
// 빈칸 span이 중간에 끼면 $...$ 가 두 노드로 쪼개져 못 읽으므로, 빈칸 앞뒤로
// $ 를 각각 닫고 새로 연다. \left...\right, \frac{}{} 처럼 두 짝이 반드시
// 붙어 있어야 하는 명령은 빈칸을 사이에 두고 절대 쪼개지 않는다.
window.CONCEPTS = {
  "pca": {
    title: "주성분분석(PCA)의 최적 방향",
    domain: "linalg",
    subLabel: "고유값 · 분해",
    explanation: String.raw`데이터를 한 방향으로 압축해서 보고 싶습니다. 그런데 정보를 가장 많이 남기는 방향은 어떻게 고를까요. PCA의 답은 단순해요. 데이터가 가장 넓게 퍼진 방향을 고르면 돼요. 분산이 가장 큰 방향을 고르는 거예요. 그리고 그 방향은 공분산행렬의 고유벡터 중 하나로 정확히 떨어집니다.<br><br><strong>명제.</strong> 중심화된 데이터 행렬 $X\in\mathbb{R}^{n\times d}$의 공분산행렬을 $\Sigma=\frac{1}{n}X^TX$ 라 하자. $\|w\|=1$인 $w$ 중 사영분산 $w^T\Sigma w$를 최대화하는 것은 $\Sigma$의 최대 고유값에 대응하는 고유벡터이다.`,
    sections: [
      { id: "s1", text: String.raw`지금 목표는 특정 방향으로 데이터를 눌러 보았을 때 그 방향이 원래 정보를 얼마나 잘 남기는지를 수식으로 표현하는 것이다. 단위벡터 $w$ 위로 데이터를 사영하면 사영값들이 얼마나 퍼져 있는지로 그 정보량을 잴 수 있다. $w$는 $\|w\|=1$인 길이 1짜리 방향벡터다. 이 사영값들의 분산은 $\mathrm{Var}(Xw) = w^T\Sigma w$ 로 계산된다.`, blanks: [] },
      { id: "s2", text: String.raw`지금 목표는 $w^T\Sigma w$를 최대화하는 것이다. 다만 아무 $w$나 되는 게 아니라 $\|w\|=1$이라는 제약을 지켜야 한다. 목적함수만 놓고 미분해서는 이 제약을 반영할 수 없다. 그래서 제약이 있는 최댓값 문제를 풀 때 쓰는 표준 도구인 라그랑주 승수법을 쓴다. 제약을 어기면 벌점을 주는 새 변수 $\lambda$를 도입해서 목적함수와 제약을 하나의 식으로 합친다. 이렇게 만든 식을 라그랑지안이라 부르고 $L(w,\lambda) = w^T\Sigma w - \lambda($[[blank:가]]$)$ 로 쓴다.`,
        blanks: [{ id: "가", latex: String.raw`w^Tw - 1`, why: String.raw`괄호 안에는 제약이 지켜졌는지를 0이 되는 식으로 적어요. 우리 제약은 $\|w\|=1$이에요. 이걸 $w^Tw-1=0$ 형태로 바꿔서 그대로 넣은 거예요. 이렇게 등호로 정리한 제약식을 등호 제약항이라고 불러요.` }] },
      { id: "s3", text: String.raw`이제 라그랑지안이 최댓값을 갖는 지점에서 무슨 일이 일어나는지 볼 차례다. 함수가 극값을 갖는 지점에서는 기울기가 0이 된다는 미적분의 가장 기본적인 성질을 쓴다. $L$을 $w$에 대해 미분해서 0으로 놓으면 $($[[blank:나]]$) = 0$ 이다.`,
        blanks: [{ id: "나", latex: String.raw`2\Sigma w - 2\lambda w`, why: String.raw`$w^T\Sigma w$를 $w$로 미분하면 $2\Sigma w$가 돼요. $\lambda(w^Tw-1)$을 $w$로 미분하면 $2\lambda w$가 돼요. 둘 다 이차형식을 미분하는 표준 공식이에요. 두 그래디언트의 차를 0으로 놓은 거예요.` }] },
      { id: "s4", text: String.raw`이 식을 정리하면 $\Sigma w = $[[blank:다]] 를 얻는다. 이 모양을 잘 보면 낯이 익다. 바로 고유값 방정식의 형태다. 그러니 $w$는 $\Sigma$의 고유벡터이고 $\lambda$는 그에 대응하는 고유값이라는 걸 알 수 있다.`,
        blanks: [{ id: "다", latex: String.raw`\lambda w`, why: String.raw`직전 식 $2\Sigma w - 2\lambda w = 0$을 2로 나눈다. 그다음 $-2\lambda w$를 반대편으로 이항하면 나오는 형태예요.` }] },
      { id: "s5", text: String.raw`이제 원래 묻던 질문으로 돌아가 본다. 이 방향에서 분산이 정확히 얼마인지 계산해 보면 $w^T\Sigma w = w^T(\lambda w) = \lambda w^Tw = $[[blank:라]] 를 얻는다. 분산은 정확히 $\lambda$다. 그러니 분산을 최대화하려면 가능한 고유값 중 가장 큰 것을 고르면 된다.`,
        blanks: [{ id: "라", latex: String.raw`\lambda`, why: String.raw`처음에 $w$를 길이 1인 단위벡터로 잡았으니 $w^Tw=1$이에요. 그러니 $\lambda\cdot 1$만 남아서 그냥 $\lambda$가 돼요.` }] },
      { id: "s6", text: String.raw`정리하면 분산을 최대로 보존하는 방향 $w$는 공분산행렬 $\Sigma$의 가장 큰 고유값에 대응하는 고유벡터다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "eigen-diagonalization": {
    title: "대칭행렬의 직교대각화 (스펙트럴 정리)",
    domain: "linalg",
    subLabel: "고유값 · 분해",
    explanation: String.raw`행렬을 다루기 쉬운 형태로 풀어헤치는 방법 중 가장 강력한 것이 대각화예요. 특히 대칭행렬은 항상 깔끔하게 대각화됩니다. 대칭행렬은 전치해도 자기 자신인 행렬이고 공분산행렬이 대표적인 예예요. 이 사실이 바로 스펙트럴 정리입니다. PCA를 비롯해 데이터를 고유벡터 축으로 분해하는 거의 모든 기법이 이 정리 위에 서 있어요.<br><br><strong>명제.</strong> $n\times n$ 실수 대칭행렬 $A$($A=A^T$)는 $A=Q\Lambda Q^T$ ($Q$: 직교행렬, $\Lambda$: 대각행렬) 형태로 대각화된다.`,
    sections: [
      { id: "s1", text: String.raw`$A$가 $n\times n$ 실수 대칭행렬이라 하자. 지금 목표는 $A=Q\Lambda Q^T$를 만족하는 직교행렬 $Q$와 대각행렬 $\Lambda$가 실제로 존재함을 보이는 것이다. 이걸 보이려면 먼저 대칭행렬의 고유벡터들이 어떤 성질을 갖는지부터 확인해야 한다.`, blanks: [] },
      { id: "s2", text: String.raw`직교행렬 $Q$를 만들려면 그 열로 쓸 고유벡터들이 서로 수직이어야 한다. 그래서 먼저 대칭행렬의 고유벡터들이 실제로 서로 직각을 이루는지부터 확인한다. 서로 다른 고유값 $\lambda_i\neq\lambda_j$에 대응하는 고유벡터 $v_i,v_j$는 [[blank:가]] 이다. 이는 곧 두 고유벡터가 서로 직교한다는 뜻이다.`,
        blanks: [{ id: "가", latex: String.raw`v_i^Tv_j = 0`, why: String.raw`$Av_i=\lambda_iv_i$와 $Av_j=\lambda_jv_j$라는 정의를 이용해서 $v_j^TAv_i$와 $v_i^TAv_j$를 각각 계산해 비교하면 $(\lambda_i-\lambda_j)v_i^Tv_j=0$이 나와요. $\lambda_i\neq\lambda_j$라고 가정했으니 남은 $v_i^Tv_j$가 0이어야만 이 등식이 성립해요. 그래서 직교해요.` }] },
      { id: "s2b", text: String.raw`(참고. 고유값이 중복될 때는 방금 논증이 그대로 통하지 않는다. 하지만 대칭행렬은 중복된 고유값에서도 그 중복도만큼 독립인 고유벡터가 항상 나온다. 그리고 그 안에서 서로 직교하도록 고를 수 있다는 사실이 알려져 있다. 여기서는 이 사실을 받아들이고 넘어간다.)`, blanks: [] },
      { id: "s3", text: String.raw`이렇게 서로 직교하는 $n$개의 고유벡터를 확보했다. 이제 이걸 길이 1로 맞춘 뒤 열로 나란히 세워서 행렬 $Q=[v_1\ \cdots\ v_n]$을 만든다. 이렇게 만든 $Q$가 정말 직교행렬인지는 $Q^TQ$를 직접 계산해 보면 확인할 수 있다. $Q$는 [[blank:나]] 를 만족하는 직교행렬이다.`,
        blanks: [{ id: "나", latex: String.raw`Q^TQ = I`, why: String.raw`열벡터들이 서로 정규직교이다. 길이가 1이고 서로 수직이라는 뜻이다. $Q^TQ$의 $(i,j)$ 성분은 $v_i\cdot v_j$인데 이 값은 $i=j$일 때만 1이고 나머지는 0이에요. 그러면 결과가 정확히 항등행렬이 돼요. 이게 바로 직교행렬의 정의예요.` }] },
      { id: "s4", text: String.raw`이제 마지막으로 $A$ 자체를 $Q$와 $\Lambda$로 표현할 차례다. 각 열에 대해 $Av_i=\lambda_iv_i$가 성립하므로 이를 행렬 형태로 한 번에 쓰면 $AQ=Q\Lambda$이다. 이 식의 양변 오른쪽에 $Q^T$를 곱하면 $A = $[[blank:다]] 이다.`,
        blanks: [{ id: "다", latex: String.raw`Q\Lambda Q^T`, why: String.raw`$AQ=Q\Lambda$의 양쪽에 오른쪽에서 $Q^T$를 곱해요. 직교행렬은 $QQ^T=I$라는 성질이 있어요. 그래서 왼쪽은 $AQQ^T=A$로 정리되고 오른쪽은 그대로 $Q\Lambda Q^T$가 남아요.` }] },
      { id: "s5", text: String.raw`따라서 $A$는 $A=Q\Lambda Q^T$처럼 직교행렬과 대각행렬로 깔끔하게 분해된다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "gradient-descent": {
    title: "경사하강법의 하강 보장",
    domain: "calc",
    subLabel: "경사기반 옵티마이저",
    explanation: String.raw`경사하강법은 딥러닝 학습에서 가장 기본적인 방법이에요. 매 스텝마다 기울기가 가리키는 반대 방향으로 조금씩 움직여서 손실을 줄여요. 그런데 그 걸음 폭인 학습률이 너무 크면 오히려 손실이 늘어날 수도 있어요. 여기서는 걸음 폭이 충분히 작으면 손실이 실제로 줄어든다는 걸 확인합니다. 도구는 함수를 근사하는 표준 방법인 테일러 근사예요.<br><br><strong>명제.</strong> $\nabla L$이 립시츠 상수 $K$로 립시츠 연속(그래디언트가 갑자기 확 튀지 않고, $K$ 이상의 속도로는 변하지 않는다는 뜻)이면, $\eta<1/K$일 때 $\theta'=\theta-\eta\nabla L(\theta)$는 $L(\theta')\le L(\theta)$를 만족한다.`,
    sections: [
      { id: "s1", text: String.raw`지금 목표는 한 스텝을 밟았을 때 손실이 실제로 줄어드는지를 확인하는 것이다. 그러려면 새 지점에서의 손실값 $L(\theta')$을 다루기 쉬운 형태로 위에서 눌러 잡아야 한다. 여기서 그래디언트가 립시츠 연속이라는 가정이 쓰인다. 이 가정 덕분에 $L(\theta')$을 2차식으로 위에서 눌러 잡을 수 있다: $L(\theta')\le L(\theta)+\nabla L(\theta)^T(\theta'-\theta)+\frac{K}{2}\|\theta'-\theta\|^2$. 이 부등식을 2차 상한이라 부른다.`, blanks: [] },
      { id: "s2", text: String.raw`이제 이 상한식 안의 $\theta'-\theta$ 자리에, 우리가 실제로 쓰는 경사하강법의 갱신식 $\theta'=\theta-\eta\nabla L(\theta)$을 대입할 차례다. 이항만 하면 $\theta'-\theta = $[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`-\eta\nabla L(\theta)`, why: String.raw`갱신식을 그대로 옮겨 적으면 나오는 식이에요. 별도의 계산이 필요 없어요.` }] },
      { id: "s3", text: String.raw`이 값을 s1의 상한식에 그대로 넣고 정리해 본다. 목표는 우변을 $\|\nabla L(\theta)\|^2$가 공통으로 묶인 형태로 정리해서, 그 앞의 부호가 음수인지 확인하기 쉽게 만드는 것이다. 정리하면 $L(\theta')\le L(\theta)-\eta(1-$[[blank:나]]$)\|\nabla L(\theta)\|^2$ 를 얻는다.`,
        blanks: [{ id: "나", latex: String.raw`\frac{K\eta}{2}`, why: String.raw`대입하면 $-\eta\|\nabla L\|^2+\frac{K\eta^2}{2}\|\nabla L\|^2$이 나와요. 공통 인수 $-\eta\|\nabla L\|^2$를 밖으로 빼내면 $-\eta\|\nabla L\|^2\left(1-\frac{K\eta}{2}\right)$ 형태로 정리돼요. 괄호 안 $\frac{K\eta}{2}$ 전체가 빈칸의 답이에요.` }] },
      { id: "s4", text: String.raw`지금까지는 학습률 $\eta$가 무엇이든 성립하는 부등식을 만들었다. 이제 손실이 실제로 줄어든다는 걸 보이려면, 우변의 감소항 계수 $1-\frac{K\eta}{2}$가 양수라는 걸 확인해야 한다. 여기서 학습률이 $\eta<1/K$라는 가정을 쓴다. 이때 $K\eta<1$이므로 $1-\frac{K\eta}{2} > $[[blank:다]] 이다. 그러니 오른쪽의 감소항은 항상 양수다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`$K\eta<1$이면 그 절반인 $K\eta/2$는 $0.5$보다 작아요. 그러니 $1-K\eta/2$는 최소 $0.5$보다 커요. 당연히 0보다도 커요.` }] },
      { id: "s5", text: String.raw`정리하면 $L(\theta')\le L(\theta)$가 된다. 우변에서 뺀 항이 항상 양수이기 때문이다. $\nabla L(\theta)\neq0$인 이상 이 부등식은 엄격하게 성립한다. 학습률만 적당히 작으면 매 스텝 손실이 실제로 줄어든다는 뜻이다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },

  "backprop": {
    title: "역전파(체인룰)의 정확성",
    domain: "calc",
    subLabel: "미분 · 그래디언트",
    explanation: String.raw`신경망은 여러 층을 겹겹이 쌓은 합성함수예요. 이런 합성함수를 미분할 때 쓰는 도구가 체인룰이에요. 이걸 출력층에서부터 거꾸로 층마다 적용해 나가는 알고리즘이 바로 역전파예요. 거꾸로 곱해가며 전파한다는 이름 그대로예요. 실제로 뭘 곱하는지 하나씩 따라가 봅니다.<br><br><strong>명제.</strong> $h=Wx$, $z=g(h)$, $L=f(z)$일 때 $\frac{\partial L}{\partial W}$는 체인룰로 세 항의 곱으로 분해된다.`,
    sections: [
      { id: "s1", text: String.raw`$h=Wx$, $z=g(h)$, $L=f(z)$라 하자. 지금 목표는 $L$을 $W$로 미분한 $\frac{\partial L}{\partial W}$를 구하는 것이다. $L$은 $z$를 거치고 $z$는 다시 $h$를 거쳐서 $W$에 의존한다. 그러니 $L$은 결국 $W$에 대한 합성함수다.`, blanks: [] },
      { id: "s2", text: String.raw`합성함수를 미분할 땐 체인룰을 쓴다. 바깥 함수를 먼저 미분하고 안쪽 함수의 미분을 곱해나가는 규칙이다. $L$은 $z$를 통해서만 $W$에 의존한다. 그러니 가장 바깥쪽부터 한 겹을 벗겨내면 $\frac{\partial L}{\partial W} = \frac{\partial L}{\partial z}\cdot$[[blank:가]] 이다.`,
        blanks: [{ id: "가", latex: String.raw`\frac{\partial z}{\partial W}`, why: String.raw`$L=f(z)$이고 $z$가 $W$에 의존한다. 체인룰의 첫 단계는 $L$이 $z$에 대해 변하는 정도와 $z$가 $W$에 대해 변하는 정도를 곱하는 것이다. 즉 $\frac{\partial L}{\partial z}\cdot\frac{\partial z}{\partial W}$예요.` }] },
      { id: "s3", text: String.raw`그런데 방금 나온 $\frac{\partial z}{\partial W}$도 아직 직접 계산할 수 있는 형태가 아니다. $z$는 $h$를 거쳐서만 $W$에 의존한다. 그러니 같은 체인룰을 한 번 더 적용해서 쪼갤 수 있다: $\frac{\partial z}{\partial W} = \frac{\partial z}{\partial h}\cdot$[[blank:나]] 이다.`,
        blanks: [{ id: "나", latex: String.raw`\frac{\partial h}{\partial W}`, why: String.raw`$z=g(h)$이고 $h=Wx$이다. $\frac{\partial z}{\partial W}$도 똑같은 체인룰로 $\frac{\partial z}{\partial h}\cdot\frac{\partial h}{\partial W}$로 나뉘어요.` }] },
      { id: "s4", text: String.raw`이제 더 쪼갤 수 없는 가장 안쪽까지 왔다. $h=Wx$라는 단순한 선형식만 남았으니 바로 미분할 수 있다: $\frac{\partial h}{\partial W} = $[[blank:다]] 이다 (성분 기준으로는 $\partial h_i/\partial W_{ij}=x_j$).`,
        blanks: [{ id: "다", latex: String.raw`x`, why: String.raw`$h=Wx$를 $W$의 각 성분으로 미분하면 곱해져 있던 $x$의 해당 성분만 남아요. 선형식의 미분이라 아주 단순해요.` }] },
      { id: "s5", text: String.raw`이제 지금까지 구한 세 조각을 다시 이어 붙이면 $\frac{\partial L}{\partial W} = \frac{\partial L}{\partial z}\cdot\frac{\partial z}{\partial h}\cdot x$ 를 얻는다 (실제로 $W$가 행렬이라 이 곱은 정확히는 벡터끼리의 외적 형태가 된다. 하지만 흐름은 스칼라일 때와 완전히 같다). 출력층에서 시작해서 층을 하나씩 거슬러 올라가며 이렇게 곱해나가는 과정이 바로 역전파의 정체다. 따라서 명제가 성립한다.`, blanks: [] }
    ]
  },
  "lagrange-kkt": {
    title: "라그랑주 승수법과 KKT 조건",
    domain: "calc",
    subLabel: "제약 최적화",
    explanation: String.raw`조건을 지키면서 가장 작은 값을 찾는 문제가 있어요. 이런 부등식 제약이 있는 최적화에서 최적해가 반드시 만족해야 하는 조건을 정리한 것이 KKT 조건이에요. SVM의 쌍대문제도 PPO와 TRPO의 제약 최적화도 모두 이 조건 위에 서 있어요.<br><br><strong>명제.</strong> 제약이 지나치게 특이하지 않다는 조건(constraint qualification)이 성립할 때 $\min f(x)\ \text{s.t.}\ g(x)\le0$ 의 최적해 $x^*$에서는 어떤 $\mu^*\ge0$이 존재해 $\nabla f(x^*)+\mu^*\nabla g(x^*)=0$과 $\mu^*g(x^*)=0$이 성립한다.`,
    sections: [
      { id: "s1", text: String.raw`먼저 풀려는 문제를 다시 봅니다. 목적함수는 $f(x)$를 최소화하는 것이고 제약은 $g(x)\le0$입니다. 제약이 있는 최적화는 목적함수만 보면 다루기 어렵습니다. 그래서 제약까지 하나의 식 안에 같이 담아서 생각합니다. 제약을 어긴 정도인 $g(x)$에 벌점 역할을 하는 계수 $\mu\ge0$을 곱해서 목적함수에 더합니다. 이렇게 만든 식을 라그랑지안이라 부르고 $\mathcal{L}(x,\mu)=f(x)+\mu g(x)$ 로 씁니다.`, blanks: [] },
      { id: "s2", text: String.raw`이제 최적해 $x^*$에서 무슨 일이 일어나는지 봅니다. 최적해에서는 $x$를 아주 조금 움직여도 목적함수가 더 줄어들지 않아야 합니다. 미분 가능한 함수에서는 이 성질이 기울기가 0이라는 조건으로 나타납니다. 여기서는 $f$ 대신 라그랑지안 $\mathcal{L}$을 최적화하고 있으니 $x$에 대한 기울기도 0이어야 합니다. 다만 이 조건이 성립하려면 제약이 지나치게 특이하지 않아야 합니다. 이걸 constraint qualification이라 부르고 여기서는 이 조건이 성립한다고 가정합니다. 정리하면 $\nabla_x\mathcal{L}(x^*,\mu^*) = $[[blank:가]] 입니다.`,
        blanks: [{ id: "가", latex: String.raw`0`, why: String.raw`함수가 극값을 가지는 지점에서는 기울기가 0이 됩니다. 경사하강법에서 쓰던 조건과 같은 논리입니다. 여기서는 그 대상이 $f$가 아니라 라그랑지안 $\mathcal{L}$일 뿐입니다.` }] },
      { id: "s3", text: String.raw`이제 방금 얻은 식을 라그랑지안의 정의 그대로 풀어써 봅니다. $\mathcal{L}(x,\mu)=f(x)+\mu g(x)$ 를 $x$에 대해 미분합니다. $f(x)$를 미분하면 $\nabla f(x)$가 됩니다. $\mu g(x)$를 미분할 때는 $\mu$를 상수처럼 취급하니 $\mu\nabla g(x)$가 됩니다. 두 조각을 더하면 $\nabla f(x^*) + $[[blank:나]]$ = 0$ 입니다.`,
        blanks: [{ id: "나", latex: String.raw`\mu^*\nabla g(x^*)`, why: String.raw`라그랑지안 정의를 그대로 $x$에 대해 미분한 결과입니다. $f(x)$는 $\nabla f(x)$가 되고 $\mu g(x)$는 $\mu\nabla g(x)$가 됩니다.` }] },
      { id: "s4", text: String.raw`이번엔 제약이 느슨한 경우를 생각해 봅니다. $g(x^*)<0$이라면 제약을 여유 있게 만족하고 있는 상태입니다. 최적해가 제약의 경계가 아니라 그보다 안쪽에 있다는 뜻입니다. 이런 상황에서 $\mu^*$가 0이 아니라면 어떻게 될까요. 실제로는 답에 영향을 주지 않는 제약이 계속 벌점을 매기게 됩니다. 앞뒤가 맞지 않습니다. 그러니 이럴 때는 벌점 계수가 사라져야 합니다. $\mu^* = $[[blank:다]] 입니다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`제약을 여유 있게 만족하고 있다면 그 제약은 최적해를 붙잡고 있지 않습니다. 영향이 없는 제약에 벌점이 계속 붙어 있으면 이상합니다. 그래서 그 승수는 0이어야 합니다. 이 성질을 상보슬랙성이라 부릅니다.` }] },
      { id: "s5", text: String.raw`정리하면 가능한 경우는 두 가지뿐입니다. 제약이 경계에서 딱 맞아떨어지거나 제약이 느슨해서 $\mu^*$가 0이거나입니다. 이 두 경우를 하나의 식으로 합치면 $\mu^*g(x^*)=0$ 이 됩니다. 이걸 상보슬랙성이라 부릅니다. 여기에 $\nabla f(x^*)+\mu^*\nabla g(x^*)=0$ 과 $\mu^*\ge0$ 까지 더하면, 이 세 조건을 합쳐서 KKT 조건이라고 부릅니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },
  "bayes-theorem": {
    title: "베이즈 정리",
    domain: "prob",
    subLabel: "분포 · 추정",
    explanation: String.raw`평소에 믿던 확률인 사전확률이 있어요. 여기에 새로 관찰한 증거를 더하면 믿음은 어떻게 업데이트될까요. 베이즈 정리는 이 질문에 정확한 공식으로 답해요. 나이브베이즈 분류기부터 베이지안 딥러닝까지 확률적 추론이라는 이름이 붙은 거의 모든 방법의 뿌리가 여기에 있어요.<br><br><strong>명제.</strong> 사건 $A,B$($P(B)>0$)에 대해 $P(A|B) = \dfrac{P(B|A)P(A)}{P(B)}$.`,
    sections: [
      { id: "s1", text: String.raw`지금 알고 싶은 것은 증거 $B$를 관찰했을 때 원인 $A$가 맞을 확률 $P(A|B)$입니다. 그런데 손에 쥔 정보는 보통 반대 방향입니다. 원인 $A$가 사실일 때 증거 $B$가 나타날 확률 $P(B|A)$ 쪽이 계산하기 쉬운 경우가 많습니다. 이 둘을 잇는 다리가 바로 조건부확률의 정의입니다. 조건부확률은 어떤 사건이 일어났다는 전제 아래 다른 사건이 일어날 확률을 뜻합니다. 이 정의를 두 방향 모두에 그대로 적어봅니다. $P(A|B)=\dfrac{P(A\cap B)}{P(B)}$ 이고 $P(B|A)=\dfrac{P(A\cap B)}{P(A)}$ 입니다.`, blanks: [] },
      { id: "s2", text: String.raw`두 식을 자세히 보면 공통점이 있습니다. 둘 다 $P(A\cap B)$를 담고 있습니다. 이것은 두 사건이 동시에 일어날 확률입니다. 이 공통항을 다리 삼아 두 식을 하나로 잇는 것이 다음 목표입니다. 그러려면 먼저 두 번째 식을 $P(A\cap B)$ 하나만 남도록 정리해야 합니다. $P(B|A)=\dfrac{P(A\cap B)}{P(A)}$ 의 양변에 $P(A)$를 곱하면 $P(A\cap B) = $[[blank:가]] 입니다.`,
        blanks: [{ id: "가", latex: String.raw`P(B|A)P(A)`, why: String.raw`$P(B|A)=P(A\cap B)/P(A)$ 라는 정의식 양변에 $P(A)$를 곱하기만 하면 나오는 식입니다. 새로운 계산이 아니라 식의 모양만 바꾼 것입니다.` }] },
      { id: "s3", text: String.raw`이제 방금 구한 식을 첫 번째 식에 그대로 밀어 넣을 차례입니다. $P(A|B)=\dfrac{P(A\cap B)}{P(B)}$ 의 분자 자리에, 방금 얻은 $P(B|A)P(A)$를 그대로 채워 넣습니다. 그러면 $P(A|B) = $[[blank:나]] 입니다.`,
        blanks: [{ id: "나", latex: String.raw`\dfrac{P(B|A)P(A)}{P(B)}`, why: String.raw`방금 구한 $P(A\cap B)=P(B|A)P(A)$를 $P(A|B)=P(A\cap B)/P(B)$의 분자 자리에 그대로 바꿔 끼운 결과입니다. 계산은 대입 하나뿐입니다.` }] },
      { id: "s4", text: String.raw`한 가지 실용적인 문제가 남아 있습니다. 분모의 $P(B)$ 값을 처음부터 알고 있는 경우는 드뭅니다. 그런데 $A$가 서로 겹치지 않는 여러 원인 $A_1,\dots,A_n$ 중 하나일 때는 이 값을 구할 방법이 있습니다. $B$가 일어나는 모든 경로를 각 원인 $A_i$가 사실이었을 경우로 나눠서 전부 더하면 됩니다. 이 방법을 전확률법칙이라 부릅니다. 이 법칙을 쓰면 $P(B) = $[[blank:다]] 처럼 풀어 쓸 수 있습니다.`,
        blanks: [{ id: "다", latex: String.raw`\sum_i P(B|A_i)P(A_i)`, why: String.raw`$B$가 일어날 수 있는 모든 경우를 원인이 $A_i$였던 경우들로 쪼개고, 각 경우의 확률 $P(B|A_i)P(A_i)$를 전부 더한 것입니다. 원인 후보를 하나도 빠짐없이 더하기 때문에 전체 확률과 정확히 맞아떨어집니다.` }] },
      { id: "s5", text: String.raw`정리하면 $P(A|B) = \dfrac{P(B|A)P(A)}{P(B)}$ 입니다. 계산하기 쉬운 방향의 확률 $P(B|A)$에서 출발해서 정말 알고 싶었던 방향의 확률 $P(A|B)$까지 도달한 셈입니다. 이것이 바로 베이즈 정리입니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },

  "mle": {
    title: "최대우도추정(MLE)과 로그우도",
    domain: "prob",
    subLabel: "분포 · 추정",
    explanation: String.raw`지금 가진 데이터가 나올 확률이 가장 높아지는 파라미터는 무엇일까요. 이 질문에 답하는 방법이 최대우도추정(MLE)이에요. 그런데 우도는 확률들을 계속 곱한 식이라 계산이 번거로워요. 그래서 실전에서는 로그를 씌워 곱셈을 덧셈으로 바꾼 로그우도를 대신 최대화합니다. 이 트릭이 왜 결과에 영향을 주지 않는지 확인해 봐요.<br><br><strong>명제.</strong> i.i.d. 표본 $x_1,\dots,x_n$에 대해 우도 $L(\theta)=\prod_i p(x_i|\theta)$를 최대화하는 $\theta$는 로그우도 $\sum_i\log p(x_i|\theta)$를 최대화하는 $\theta$와 같다.`,
    sections: [
      { id: "s1", text: String.raw`지금 목표는 데이터 전체가 정확히 이 값들로 관측될 확률을 파라미터 $\theta$의 함수로 적는 것입니다. 이 함수를 우도라 부르고 $L(\theta)$로 씁니다. 표본 $x_1,\dots,x_n$이 서로 독립이고 같은 분포에서 나왔다는 i.i.d. 가정을 쓰면, 여러 사건이 동시에 일어날 확률은 각 확률을 곱한 것과 같습니다. 그러니 $L(\theta) = P(x_1,\dots,x_n|\theta) = $[[blank:가]] 입니다.`,
        blanks: [{ id: "가", latex: String.raw`\prod_{i=1}^n p(x_i|\theta)`, why: String.raw`서로 독립인 사건들이 동시에 일어날 확률은 각 사건이 일어날 확률의 곱입니다. 확률에서 가장 기본이 되는 성질이고, 이 곱이 바로 우도함수의 정의가 됩니다.` }] },
      { id: "s2", text: String.raw`우도 $L(\theta)$는 확률을 $n$번 곱한 식이라 이대로 미분해서 최댓값을 찾기가 번거롭습니다. 이 문제를 피할 방법이 필요합니다. 여기서 쓰는 도구가 로그입니다. $\log$ 함수는 입력이 커질수록 값도 계속 커지는 강한 증가함수입니다. 강한 증가함수를 원래 함수에 씌워도 최댓값이 있는 위치는 바뀌지 않습니다. 그러니 $L(\theta)$를 최대화하는 것과 $\log L(\theta)$를 최대화하는 것은 결과가 같습니다. $\arg\max_\theta L(\theta) = \arg\max_\theta $[[blank:나]] 입니다.`,
        blanks: [{ id: "나", latex: String.raw`\log L(\theta)`, why: String.raw`어떤 함수에 계속 증가하는 함수를 씌워도 원래 함수가 최대였던 위치는 그대로 최대로 남습니다. 로그를 씌우는 이유는 값을 바꾸려는 것이 아니라 최댓값의 위치를 그대로 보존하면서 계산만 쉽게 만들려는 것입니다.` }] },
      { id: "s3", text: String.raw`이제 로그를 실제로 씌워서 $\log L(\theta)$가 어떤 모양이 되는지 확인할 차례입니다. $L(\theta)$는 $p(x_i|\theta)$들을 전부 곱한 식이었습니다. 로그는 곱을 합으로 바꾸는 성질이 있습니다. 이 성질을 곱 전체에 적용하면 $\log L(\theta) = \sum_{i=1}^n $[[blank:다]] 입니다.`,
        blanks: [{ id: "다", latex: String.raw`\log p(x_i|\theta)`, why: String.raw`$\log(a\times b)=\log a+\log b$라는 로그의 가장 기본적인 성질을, $n$개의 항을 곱한 식 전체에 반복 적용한 결과입니다. 곱셈이 덧셈으로 바뀌면서 항 하나하나를 따로 다룰 수 있게 됩니다.` }] },
      { id: "s4", text: String.raw`정리하면 $\arg\max_\theta L(\theta) = \arg\max_\theta \sum_i \log p(x_i|\theta)$ 입니다. 계산하기 번거로운 곱셈 문제를 결과는 같으면서 훨씬 다루기 쉬운 덧셈 문제로 바꾼 셈입니다. 실전에서 로그우도를 쓰는 이유가 바로 여기에 있습니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },

  "markov-mdp": {
    title: "벨만 기대방정식의 유도",
    domain: "prob",
    subLabel: "마르코프 · 확률과정",
    explanation: String.raw`강화학습에서 이 상태가 얼마나 좋은지를 나타내는 값을 가치함수라 불러요. 사실 이 값은 아주 먼 미래까지의 보상을 전부 더한 것이에요. 이걸 매번 끝까지 계산하는 대신, 지금 당장의 보상에 다음 상태의 가치를 더하는 재귀식 하나로 표현할 수 있다는 게 벨만 기대방정식이에요. 강화학습 알고리즘 대부분이 이 재귀식에서 출발해요.<br><br><strong>명제.</strong> $V^\pi(s)=\mathbb{E}_\pi\left[\sum_{k=0}^\infty\gamma^kr_{t+k}\middle|s_t=s\right]$는 $V^\pi(s)=\mathbb{E}_\pi[r_t+\gamma V^\pi(s_{t+1})|s_t=s]$를 만족한다.`,
    sections: [
      { id: "s1", text: String.raw`지금 목표는 가치함수 $V^\pi(s)$가 재귀식으로 다시 쓰일 수 있음을 보이는 것입니다. 먼저 가치함수의 정의부터 그대로 적어봅니다. $V^\pi(s)$는 상태 $s$에서 시작해서 정책 $\pi$를 따를 때, 지금부터 미래의 모든 보상을 할인해서 더한 기댓값입니다. 식으로 쓰면 $V^\pi(s) = \mathbb{E}_\pi\left[\sum_{k=0}^\infty \gamma^k r_{t+k}\ \middle|\ s_t=s\right]$ 입니다.`, blanks: [] },
      { id: "s2", text: String.raw`문제는 이 정의가 무한히 많은 항을 더한 식이라서 그대로는 계산도 다루기도 어렵다는 점입니다. 이걸 다루기 쉬운 재귀식으로 바꾸는 것이 다음 목표입니다. 핵심 아이디어는 이 무한합을 통째로 보지 않고, 맨 앞의 한 항만 따로 떼어내는 것입니다. 합의 $k=$[[blank:가]] 항을 나머지와 분리합니다. 이 항이 바로 지금 당장의 보상입니다.`,
        blanks: [{ id: "가", latex: String.raw`0`, why: String.raw`$k=0$항이 지금 시점 $t$의 보상 $r_t$입니다. 이 항을 따로 떼어내야 남은 부분이 다음 시점부터 시작하는 리턴이라는 깔끔한 형태로 정리됩니다.` }] },
      { id: "s3", text: String.raw`이제 실제로 분리해 봅니다. $k=0$항을 앞으로 빼내고 남은 항들의 인덱스를 하나씩 다시 맞추면, 공통인수 $\gamma$ 하나를 밖으로 꺼낼 수 있습니다. $\sum_{k=0}^\infty \gamma^k r_{t+k} = r_t + \gamma\sum_{k=0}^\infty $[[blank:나]] 입니다.`,
        blanks: [{ id: "나", latex: String.raw`\gamma^k r_{t+1+k}`, why: String.raw`$k=0$항인 $r_t$를 떼어내면 $k=1,2,\dots$가 남습니다. 이 인덱스를 $k\to k+1$로 다시 맞추면 $\gamma$가 하나 밖으로 빠지면서 $\gamma\sum_k\gamma^kr_{t+1+k}$ 모양이 됩니다.` }] },
      { id: "s4", text: String.raw`이 남은 합 $\sum_{k=0}^\infty \gamma^k r_{t+1+k}$을 잘 보면 낯이 익습니다. 시점 $t+1$에서 바라본 리턴의 정의와 정확히 같은 모양입니다. 그러니 이 항의 기댓값도 시점 $t+1$의 가치함수와 같아야 합니다. 그 기댓값은 [[blank:다]] 와 같습니다.`,
        blanks: [{ id: "다", latex: String.raw`V^\pi(s_{t+1})`, why: String.raw`s1에서 썼던 가치함수의 정의를 이번엔 시점 $t+1$과 상태 $s_{t+1}$에 그대로 다시 적용한 것입니다. 다만 이 걸음이 성립하려면 한 가지 조건이 필요합니다. 미래는 지금 상태만으로 결정되고 그 이전 경로는 상관없다는 마르코프 성질입니다. 이 성질 덕분에 $s_t=s$라는 조건이 자연스럽게 $s_{t+1}$로 이어질 수 있습니다.` }] },
      { id: "s5", text: String.raw`정리하면 $V^\pi(s) = \mathbb{E}_\pi[r_t + \gamma V^\pi(s_{t+1}) | s_t=s]$ 입니다. 지금 얻는 보상에 할인된 다음 상태의 가치를 더하는 이 재귀식이 바로 벨만 기대방정식입니다. 강화학습 알고리즘 대부분이 이 식을 반복해서 적용하며 가치함수를 학습합니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },

  "clt": {
    title: "표본평균의 표준화 (중심극한정리의 발판)",
    domain: "prob",
    subLabel: "확률의 기초",
    explanation: String.raw`동전을 10번 던진 평균과 10000번 던진 평균 중 어느 쪽이 더 안정적일까요. 표본이 많아질수록 표본평균은 원래 분포가 무엇이든 상관없이 정규분포에 가까워진다는 게 중심극한정리예요. 그 정리로 가기 위한 첫 걸음으로, 표본평균을 평균 0, 분산 1로 깔끔하게 맞추는 표준화 계산부터 확인해 봐요.<br><br><strong>명제.</strong> $X_1,\dots,X_n$이 i.i.d.이고 $E[X_i]=\mu$, $\mathrm{Var}(X_i)=\sigma^2$이면, $\bar X_n=\frac1n\sum X_i$를 표준화한 $Z_n=\frac{\bar X_n-\mu}{\sigma/\sqrt n}$은 평균 0, 분산 1을 갖는다.`,
    sections: [
      { id: "s1", text: String.raw`먼저 표본평균 $\bar X_n=\frac1n\sum X_i$의 평균이 얼마인지부터 확인해야 합니다. 이때 쓰는 도구는 기댓값의 선형성입니다. 기댓값은 합 전체에 한 번에 씌우지 않고 항 하나하나에 나눠 씌워도 결과가 같다는 성질입니다. 이 성질을 적용하면 $E[\bar X_n] = \frac1n\sum_i E[X_i] = $[[blank:가]] 입니다.`,
        blanks: [{ id: "가", latex: String.raw`\mu`, why: String.raw`모든 $X_i$의 기댓값이 똑같이 $\mu$이므로, $\mu$를 $n$번 더한 뒤 $n$으로 나누면 그대로 $\mu$가 남습니다. 표본을 아무리 늘려도 표본평균이 향하는 중심은 원래 분포의 평균과 같다는 뜻입니다.` }] },
      { id: "s2", text: String.raw`다음으로 확인할 것은 표본평균이 평균 주위에서 얼마나 퍼져 있는지입니다. 이것이 분산입니다. 여러 확률변수를 더한 합의 분산은 일반적으로 각 변수의 분산과 서로 간의 공분산까지 모두 더해야 합니다. 그런데 $X_i$들은 서로 독립이라 공분산 항이 전부 0이 되어 사라집니다. 그러니 각자의 분산만 남습니다. $\mathrm{Var}(\bar X_n) = \frac{1}{n^2}\sum_i \mathrm{Var}(X_i) = \frac{n\sigma^2}{n^2} = $[[blank:나]] 로 정리됩니다.`,
        blanks: [{ id: "나", latex: String.raw`\frac{\sigma^2}{n}`, why: String.raw`$n\sigma^2/n^2$을 약분하면 $\sigma^2/n$이 남습니다. 표본을 늘릴수록 분모의 $n$이 커지므로, 표본평균이 흩어진 정도는 표본이 많아질수록 점점 작아진다는 뜻입니다.` }] },
      { id: "s3", text: String.raw`표본평균 $\bar X_n$은 원래 분포에 따라 평균도 분산도 제각각입니다. 이대로는 서로 다른 분포에서 나온 표본평균들을 같은 기준으로 비교하기 어렵습니다. 그래서 평균을 빼고 표준편차로 나누어 평균 0, 분산 1이라는 공통의 기준으로 맞추는 작업을 합니다. 이걸 표준화라 부르고 $Z_n = \dfrac{\bar X_n - \mu}{\sigma/\sqrt n}$ 로 정의합니다. 이제 이 $Z_n$의 기댓값을 구해봅니다. $E[Z_n] = \dfrac{E[\bar X_n]-\mu}{\sigma/\sqrt n} = $[[blank:다]] 입니다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`s1에서 $E[\bar X_n]=\mu$임을 구했으므로 분자는 $\mu-\mu=0$이 됩니다. 분자가 0이면 전체 값도 0입니다.` }] },
      { id: "s4", text: String.raw`같은 방식으로 $Z_n$의 분산도 확인해봅니다. 상수를 곱한 변수의 분산은 그 상수의 제곱만큼 배가 된다는 성질을 쓰면 $\mathrm{Var}(Z_n) = \dfrac{\mathrm{Var}(\bar X_n)}{\sigma^2/n} = \dfrac{\sigma^2/n}{\sigma^2/n} = $[[blank:라]] 입니다.`,
        blanks: [{ id: "라", latex: String.raw`1`, why: String.raw`분자와 분모가 똑같이 $\sigma^2/n$이므로 나누면 그대로 1이 남습니다. 표준화를 거치면 원래 분산이 얼마였든 상관없이 항상 1로 맞춰진다는 뜻입니다.` }] },
      { id: "s5", text: String.raw`정리하면 $Z_n$은 평균 0, 분산 1로 표준화되어 있습니다. 이것만으로도 표본평균을 공통의 기준 위에 올려놓을 수 있습니다. 여기에 중심극한정리를 더하면 한 걸음 더 나아갈 수 있습니다. $n\to\infty$일 때 $Z_n$의 분포 자체가 표준정규분포 $N(0,1)$로 수렴한다는 훨씬 강력한 결과입니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },
  "entropy-crossentropy": {
    title: "교차엔트로피와 엔트로피·KL발산의 관계",
    domain: "info",
    subLabel: "엔트로피 · 손실",
    explanation: String.raw`분류 모델을 학습시킬 때는 거의 항상 교차엔트로피 손실을 씁니다. 그런데 이 손실은 사실 두 조각으로 나뉩니다. 하나는 정답분포 자체가 원래 가진 불확실성인 엔트로피입니다. 다른 하나는 내 예측이 정답과 얼마나 다른지를 재는 KL발산입니다. 이 관계를 알고 나면 교차엔트로피를 줄이는 일이 왜 예측을 정답에 가깝게 만드는지 자연스럽게 이해됩니다.<br><br><strong>명제.</strong> 두 분포 $p,q$에 대해 $H(p,q) = H(p) + D_{KL}(p\|q)$.`,
    sections: [
      { id: "s1", text: String.raw`지금 보이려는 것은 교차엔트로피라는 손실 하나가 사실 엔트로피와 KL발산 두 조각의 합이라는 사실입니다. 이걸 확인하려면 먼저 교차엔트로피가 정확히 어떻게 정의되는지부터 봐야 합니다. 교차엔트로피는 진짜 분포 $p$가 있을 때 예측 분포 $q$를 기준으로 놀람의 정도를 재는 지표입니다. 정의는 $H(p,q) = -\sum_x p(x)\log q(x)$ 입니다.`, blanks: [] },
      { id: "s2", text: String.raw`이제 KL발산 쪽에서 접근해봅니다. KL발산은 두 분포가 얼마나 다른지 재는 지표입니다. 정의는 $D_{KL}(p\|q)=\sum_x p(x)\log\dfrac{p(x)}{q(x)}$ 입니다. 이 식을 교차엔트로피와 이어붙이려면 로그 안의 나눗셈을 뺄셈으로 풀어야 합니다. 그러면 합을 두 조각으로 갈라놓을 수 있습니다. 로그의 성질 $\log(p/q)=\log p-\log q$를 쓰면 $D_{KL}(p\|q) = \sum_x p(x)\log p(x) - \sum_x $[[blank:가]] 입니다.`,
        blanks: [{ id: "가", latex: String.raw`p(x)\log q(x)`, why: String.raw`$\log(p/q)=\log p-\log q$로 나눈 뒤 양쪽에 $p(x)$를 곱합니다. 그러면 합이 두 조각으로 자연스럽게 갈라집니다. 뒤에 남은 조각이 정확히 이 빈칸의 답입니다.` }] },
      { id: "s3", text: String.raw`두 조각으로 나뉜 식에서 왼쪽 항 $\sum_x p(x)\log p(x)$ 를 먼저 봅니다. 이 항은 $p$만 등장하고 $q$는 전혀 등장하지 않습니다. 예측과 무관하게 정답분포 자체만으로 정해지는 값이라는 뜻입니다. 엔트로피의 정의 $H(p)=-\sum_x p(x)\log p(x)$와 비교해보면 부호만 반대입니다. 그러니 이 항은 [[blank:나]] 와 같습니다.`,
        blanks: [{ id: "나", latex: String.raw`-H(p)`, why: String.raw`엔트로피 정의의 양변 부호를 뒤집으면 그대로 나오는 관계입니다. $p$만으로 정해지는 값이라는 특징도 엔트로피가 정답분포 고유의 불확실성이라는 의미와 맞아떨어집니다.` }] },
      { id: "s4", text: String.raw`이제 s3에서 찾은 관계를 원래 식에 대입합니다. $D_{KL}(p\|q) = -H(p) - \sum_x p(x)\log q(x)$ 가 됩니다. 남은 합 $-\sum_x p(x)\log q(x)$를 봅니다. 이건 s1에서 이미 본 교차엔트로피의 정의 그 자체입니다. 그러니 $D_{KL}(p\|q) = -H(p) + $[[blank:다]] 입니다.`,
        blanks: [{ id: "다", latex: String.raw`H(p,q)`, why: String.raw`$-\sum_x p(x)\log q(x)$는 s1에서 정의한 교차엔트로피 $H(p,q)$와 완전히 같은 식입니다. 이름만 다를 뿐 계산은 똑같습니다.` }] },
      { id: "s5", text: String.raw`정리하면 $D_{KL}(p\|q)=H(p,q)-H(p)$ 입니다. 이걸 옮기면 $H(p,q)=H(p)+D_{KL}(p\|q)$ 입니다. 교차엔트로피는 정답분포가 원래부터 가진 불확실성에 내 예측이 틀린 만큼의 벌점을 더한 값입니다. 그래서 교차엔트로피를 줄이는 학습은 곧 예측을 정답에 가깝게 만드는 일과 같습니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },

  "kl-divergence": {
    title: "KL발산의 비음성 (Gibbs 부등식)",
    domain: "info",
    subLabel: "발산 · 상호정보",
    explanation: String.raw`두 분포가 얼마나 다른지 재는 KL발산은 절대 음수가 되지 않습니다. 이 사실 덕분에 우리는 안심하고 KL발산을 손실함수의 정규화항으로 최소화할 수 있습니다. VAE의 ELBO나 지식증류 같은 곳에서 이 성질이 계속 등장합니다. 그 비음성이 어디서 나오는지 볼록함수의 대표적인 도구인 옌센 부등식으로 확인해 봅니다.<br><br><strong>명제.</strong> 임의의 확률분포 $p,q$에 대해 $D_{KL}(p\|q)\ge0$, 등호는 $p=q$일 때만 성립.`,
    sections: [
      { id: "s1", text: String.raw`지금 보이려는 것은 KL발산이 항상 0 이상이라는 사실입니다. 정의를 그대로 보면 부호가 바로 드러나지 않습니다. 그래서 다루기 쉬운 형태로 먼저 바꿔둡니다. 로그 안 분수를 뒤집으면 부호가 반대로 붙는다는 성질을 씁니다. $D_{KL}(p\|q) = \sum_x p(x)\log\dfrac{p(x)}{q(x)} = -\sum_x p(x)\log\dfrac{q(x)}{p(x)}$ 입니다. 이렇게 두면 뒤에 남은 합이 0보다 작거나 같다는 것만 보이면 충분합니다.`, blanks: [] },
      { id: "s2", text: String.raw`이 합 $\sum_x p(x)\log\dfrac{q(x)}{p(x)}$을 봅니다. 이건 확률 $p(x)$로 먼저 평균 낸 값에 log를 씌운 게 아닙니다. log를 먼저 씌우고 그 다음 평균 낸 값입니다. 이런 순서를 다루는 도구가 옌센 부등식입니다. $\log$는 오목함수이므로 함수를 먼저 씌우고 평균 낸 값은 평균을 먼저 내고 함수를 씌운 값보다 작거나 같습니다. 그대로 적용하면 $\sum_x p(x)\log\dfrac{q(x)}{p(x)} \le \log($[[blank:가]]$)$ 를 얻습니다.`,
        blanks: [{ id: "가", latex: String.raw`\sum_x p(x)\cdot\frac{q(x)}{p(x)}`, why: String.raw`옌센 부등식은 $E[f(X)]\le f(E[X])$ 꼴로 오목함수 log와 확률변수 $X=q(x)/p(x)$에 적용됩니다. 평균은 $p$를 가중치로 잡습니다. log를 먼저 씌워 평균 낸 왼쪽 값이 먼저 평균 내고 log를 씌운 오른쪽 값보다 작거나 같다는 뜻입니다.` }] },
      { id: "s3", text: String.raw`괄호 안의 합이 실제로 무슨 값인지 계산해봅니다. $p(x)$가 분자와 분모에서 그대로 약분되므로 $\sum_x p(x)\cdot\dfrac{q(x)}{p(x)} = \sum_x q(x) = $[[blank:나]] 입니다.`,
        blanks: [{ id: "나", latex: String.raw`1`, why: String.raw`$q$도 확률분포이므로 모든 값을 다 더하면 항상 1이 됩니다. 확률의 가장 기본적인 약속입니다. 단 이 약분이 안전하려면 $p(x)>0$인 곳에서 $q(x)$도 0이 아니어야 합니다. 그렇지 않은 곳이 있다면 KL발산 자체가 $+\infty$로 정의되므로 부등식은 그 경우에도 자동으로 성립합니다.` }] },
      { id: "s4", text: String.raw`이제 $\log 1$이 정확히 얼마인지만 확인하면 부등식이 완성됩니다. $\sum_x p(x)\log\dfrac{q(x)}{p(x)} \le \log 1 = $[[blank:다]] 입니다.`,
        blanks: [{ id: "다", latex: String.raw`0`, why: String.raw`$\log 1 = 0$은 로그함수의 기본값입니다. $e^0=1$이기 때문입니다.` }] },
      { id: "s5", text: String.raw`처음에 뒤집어 두었던 부호를 다시 되돌리면 $D_{KL}(p\|q)\ge0$ 을 얻습니다. 이것이 KL발산이 절대 음수가 되지 않는다는 뜻입니다. 등호가 성립하는 경우도 옌센 부등식의 등호조건에서 그대로 따라옵니다. $q(x)/p(x)$가 모든 $x$에서 같은 상수일 때만 등호가 성립합니다. 이는 정확히 $p=q$일 때입니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },

  "attention-scaling": {
    title: "어텐션의 스케일링 (√d로 나누는 이유)",
    domain: "linalg",
    subLabel: "고유값 · 분해",
    explanation: String.raw`트랜스포머의 셀프어텐션은 $QK^T$를 구한 다음 바로 소프트맥스를 씌우지 않습니다. 그 전에 $\sqrt d$로 한 번 나눠줍니다. 왜 굳이 이 나눗셈이 필요할까요. 나눠주지 않으면 내적값의 분산이 차원 $d$에 비례해서 커집니다. 그러면 소프트맥스 출력이 거의 원핫처럼 한 곳만 1이고 나머지는 0에 가깝게 극단적으로 변합니다. 그 결과 그래디언트가 거의 사라져버립니다.<br><br><strong>명제.</strong> $q,k\in\mathbb{R}^d$의 각 성분이 평균 0, 분산 1로 독립이면 $(q\cdot k)/\sqrt d$의 분산은 1이다.`,
    sections: [
      { id: "s1", text: String.raw`지금 보이려는 것은 내적을 $\sqrt d$로 나누면 분산이 차원과 상관없이 항상 1로 유지된다는 사실입니다. 먼저 내적 자체가 어떻게 정의되는지부터 봅니다. $q,k\in\mathbb{R}^d$의 각 성분은 서로 독립이며 평균은 0이고 분산은 1이라 하자. 두 벡터의 내적은 각 성분끼리 곱해서 더한 값이므로 $q\cdot k = \sum_{i=1}^d q_ik_i$ 로 계산된다.`, blanks: [] },
      { id: "s2", text: String.raw`이 내적은 $d$개의 항 $q_ik_i$를 더한 합입니다. 더한 것의 분산을 구하려면 보통 항들 사이의 공분산까지 신경써야 합니다. 하지만 성분들이 서로 독립이라는 가정 덕분에 그럴 필요가 없습니다. 독립인 항들의 합의 분산은 각 항의 분산을 그냥 더한 것과 같습니다. 게다가 모든 항 $q_ik_i$가 같은 분포에서 나오므로 분산도 전부 동일합니다. 그러니 $d$개를 더한 분산은 한 항의 분산에 $d$를 곱한 것과 같습니다. $\mathrm{Var}(q\cdot k) = \sum_{i=1}^d \mathrm{Var}(q_ik_i) = d\cdot$[[blank:가]] 입니다.`,
        blanks: [{ id: "가", latex: String.raw`\mathrm{Var}(q_1k_1)`, why: String.raw`모든 $q_ik_i$가 같은 분포에서 나오니 분산도 다 똑같습니다. 그러니 $d$개를 더한 합의 분산은 한 항의 분산에 $d$를 곱한 것과 같습니다.` }] },
      { id: "s3", text: String.raw`이제 한 항의 분산 $\mathrm{Var}(q_1k_1)$이 정확히 얼마인지 계산할 차례입니다. $q_1,k_1$은 서로 독립이고 평균이 0입니다. 그러면 곱의 분산은 각각의 제곱의 기댓값을 곱한 값으로 정리됩니다. $\mathrm{Var}(q_1k_1) = E[q_1^2]E[k_1^2] = $[[blank:나]] 입니다.`,
        blanks: [{ id: "나", latex: String.raw`1`, why: String.raw`평균이 0이고 분산이 1인 변수는 $E[q_1^2]=\mathrm{Var}(q_1)=1$을 만족합니다. 분산의 정의 그 자체입니다. $k_1$도 마찬가지로 $E[k_1^2]=1$이니 둘을 곱하면 1이 됩니다.` }] },
      { id: "s4", text: String.raw`그러니 $\mathrm{Var}(q\cdot k)=d$입니다. 이 값은 차원 $d$가 커질수록 그대로 커지므로 그냥 두면 내적값이 차원에 따라 널뛰게 됩니다. 그래서 상수를 곱해 분산을 일정하게 눌러줘야 합니다. 상수 $c$를 곱하면 분산은 $c^2$배가 된다는 성질을 이용해 $c=1/\sqrt d$를 고릅니다. 그러면 $\dfrac{q\cdot k}{\sqrt d}$의 분산은 $\dfrac{d}{(\sqrt d)^2} = $[[blank:다]] 입니다.`,
        blanks: [{ id: "다", latex: String.raw`1`, why: String.raw`상수 $1/\sqrt d$를 곱하면 분산은 그 제곱인 $1/d$배가 됩니다. 원래 분산이 $d$였으니 $d\times(1/d)=1$이 남습니다.` }] },
      { id: "s5", text: String.raw`따라서 $QK^T/\sqrt d$로 나눠주면 내적의 분산이 차원 $d$가 얼마든 상관없이 항상 1로 유지됩니다. 분산이 일정하게 유지되어야 소프트맥스에 너무 크거나 작은 값이 들어가지 않습니다. 그래야 학습이 안정됩니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },

  "convex-jensen": {
    title: "볼록함수와 옌센 부등식",
    domain: "calc",
    subLabel: "함수의 성질",
    explanation: String.raw`그래프가 아래로 오목하지 않고 위로 볼록한 함수를 볼록함수라고 부릅니다. 볼록함수의 정의는 원래 두 점 사이의 관계로 주어집니다. 이걸 점 두 개가 아니라 확률변수 전체로 확장한 것이 옌센 부등식입니다. ELBO를 유도할 때도 KL발산이 항상 0 이상임을 보일 때도 계속 등장합니다. 생성모델 이론 곳곳에 숨어 있는 주역입니다.<br><br><strong>명제.</strong> $f$가 볼록함수이면 임의의 확률변수 $X$에 대해 $f(E[X])\le E[f(X)]$.`,
    sections: [
      { id: "s1", text: String.raw`지금 보이려는 것은 볼록함수라면 기댓값을 먼저 낸 뒤 함수에 넣은 값이 함수에 먼저 넣고 기댓값을 낸 값보다 작거나 같다는 사실입니다. 이걸 확인하려면 먼저 볼록함수의 정의부터 다시 봐야 합니다. $f$가 볼록함수라는 건 두 점 $x,y$를 어떤 비율 $t\in[0,1]$로 섞었을 때 함수값이 각 점의 함수값을 같은 비율로 섞은 것보다 작거나 같다는 뜻입니다. 식으로 쓰면 $f(tx+(1-t)y)\le tf(x)+(1-t)f(y)$ 입니다.`, blanks: [] },
      { id: "s2", text: String.raw`이 정의는 딱 두 점에 대한 것이라 아직 확률변수 전체를 다루기엔 부족합니다. 그래서 두 점을 여러 점 $x_1,\dots,x_n$과 가중치 $p_i\ge0,\sum_ip_i=1$로 확장합니다. 두 점 사이의 볼록성 부등식을 점을 하나씩 늘려가며 반복 적용하면 여러 점의 가중평균에 대해서도 같은 모양의 부등식이 성립한다는 걸 보일 수 있습니다. $f\left(\sum_i p_ix_i\right) \le \sum_i$[[blank:가]] 입니다.`,
        blanks: [{ id: "가", latex: String.raw`p_if(x_i)`, why: String.raw`두 점에 대한 볼록성 부등식을 점을 하나씩 늘려가며 반복 적용하면 됩니다. 왼쪽은 가중평균을 먼저 낸 값이고 오른쪽은 각 점의 함숫값을 가중평균한 값입니다.` }] },
      { id: "s3", text: String.raw`이제 이 부등식을 확률변수 언어로 옮겨야 합니다. 이산 확률변수 $X$가 값 $x_i$를 확률 $p_i$로 갖는다고 생각해봅니다. 그러면 왼쪽 괄호 안의 합 $\sum_i p_ix_i$는 무엇을 뜻할까요. 값을 확률로 가중해서 더한 것이니 이건 정확히 기댓값의 정의입니다. $\sum_i p_ix_i = $[[blank:나]] 입니다.`,
        blanks: [{ id: "나", latex: String.raw`E[X]`, why: String.raw`값 $x_i$를 확률 $p_i$로 가중해서 더한 값입니다. 이것이 기댓값의 정의 그 자체입니다.` }] },
      { id: "s4", text: String.raw`같은 논리를 오른쪽 합에도 적용합니다. $f(X)$도 하나의 확률변수라고 볼 수 있습니다. 그 값 $f(x_i)$를 확률 $p_i$로 가중평균한 것이니 이것도 기댓값입니다. $\sum_i p_if(x_i) = $[[blank:다]] 입니다.`,
        blanks: [{ id: "다", latex: String.raw`E[f(X)]`, why: String.raw`$f(X)$를 하나의 확률변수로 보면 그 값 $f(x_i)$를 확률 $p_i$로 가중평균한 것이 됩니다. 이것도 기댓값의 정의와 완전히 같습니다.` }] },
      { id: "s5", text: String.raw`s2의 부등식에 이 두 관계를 대입하면 $f(E[X])\le E[f(X)]$를 얻습니다. 이것이 옌센 부등식입니다. 기댓값을 먼저 내고 함수에 넣은 값이 함수에 먼저 넣고 기댓값을 낸 값보다 결코 클 수 없다는 뜻입니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },
  "shortest-path-dp": {
    title: "최단경로의 최적 부분구조와 벨만 방정식",
    domain: "disc",
    subLabel: "알고리즘 기초",
    explanation: String.raw`강화학습의 가치반복과 그래프에서 최단경로를 구하는 동적계획법은 사실 같은 아이디어에서 나왔어요. 그 아이디어를 최적 부분구조라고 불러요. 전체 최적해의 일부분도 그 자체로 최적이어야 한다는 통찰이에요. 최단경로 버전으로 이 통찰을 직접 확인해 봅니다.<br><br><strong>명제.</strong> 노드 $s$에서 $v$까지의 최단거리 $d(v)$는 $v$의 모든 인접 노드 $u$에 대해 $d(v)=\min_u(d(u)+w(u,v))$ 를 만족한다.`,
    sections: [
      { id: "s1", text: String.raw`최단경로를 구하는 문제를 생각해봅니다. 그래프가 조금만 커져도 가능한 경로의 수는 감당하기 어려울 만큼 늘어납니다. 모든 경로를 일일이 나열해서 비교하는 방법은 쓸 수 없습니다. 그래서 전체 최단거리를 한 번에 구하는 대신 이웃 노드까지의 최단거리로부터 재귀적으로 계산하는 방법을 찾으려 합니다. 그 재귀식을 확인하는 것이 지금 목표입니다. 목표를 수식으로 쓰면 이렇습니다. 노드 $v$까지의 최단거리 $d(v)$를 $v$의 이웃 노드들의 최단거리 $d(u)$로 표현하는 것입니다.`, blanks: [] },
      { id: "s2", text: String.raw`이 재귀식이 정말 성립하는지 확인하려면 실제로 존재하는 최단경로 하나를 붙잡고 그 구조를 직접 들여다보는 게 가장 확실한 방법입니다. $s$에서 $v$까지의 어떤 한 최단경로를 $P$라 하겠습니다. $P$ 위에서 $v$ 바로 직전에 거치는 노드를 $u$라 하겠습니다.`, blanks: [] },
      { id: "s3", text: String.raw`$P$에서 $s$부터 $u$까지 이어지는 구간을 $P'$라 하겠습니다. 여기서 확인하고 싶은 사실은 $P'$ 역시 $s$에서 $u$까지 가는 최단경로여야 한다는 것입니다. 왜 그래야 하는지 짚어봅니다. 만약 $P'$보다 짧게 $s$에서 $u$로 가는 경로가 따로 있다고 가정해봅니다. 그렇다면 $P$에서 $s$부터 $u$까지의 구간을 그 더 짧은 경로로 통째로 바꿔치기할 수 있습니다. 마지막 구간인 $u$에서 $v$로 가는 간선은 그대로 둡니다. 그러면 $s$에서 $v$까지 가는 경로 중 $P$보다 짧은 경로가 새로 만들어집니다. 이는 $P$가 최단경로라는 처음 가정과 모순됩니다. 그러니 그런 경로는 있을 수 없습니다. $P'$는 이미 $s$에서 $u$까지의 최단경로입니다.`, blanks: [] },
      { id: "s4", text: String.raw`방금 확인한 사실을 기호로 정리합니다. $s$에서 $u$까지의 최단거리는 정의상 $d(u)$입니다. $P'$가 바로 그 최단경로이므로 $P'$의 길이도 $d(u)$와 같아야 합니다. 즉 $\mathrm{length}(P') = $[[blank:가]] 입니다.`,
        blanks: [{ id: "가", latex: String.raw`d(u)`, why: String.raw`방금 확인했듯 $P'$보다 짧게 $s$에서 $u$로 가는 경로가 있다면, 그걸 $P$에 갈아 끼워서 $P$보다 짧은 $s$-$v$ 경로를 만들 수 있습니다. 이는 $P$가 최단경로라는 가정과 모순됩니다. 그러니 그런 경로는 존재할 수 없고, $P'$의 길이는 정확히 $s$에서 $u$까지의 최단거리인 $d(u)$일 수밖에 없습니다. 이 논증 방식을 귀류법이라 부릅니다.` }] },
      { id: "s5", text: String.raw`이제 $P$ 전체의 길이를 구할 차례입니다. $P$는 $P'$에 마지막 간선 하나를 이어붙인 경로입니다. 그러니 전체 길이는 부분경로의 길이에 마지막 간선의 가중치를 더하면 됩니다. $d(v) = \mathrm{length}(P') + w(u,v) = $[[blank:나]] 입니다.`,
        blanks: [{ id: "나", latex: String.raw`d(u) + w(u,v)`, why: String.raw`바로 앞에서 구한 $\mathrm{length}(P')=d(u)$를 그대로 대입하면 나오는 식입니다. $P$의 길이는 $u$까지의 최단거리에 마지막 한 걸음의 비용을 더한 값과 같다는 뜻입니다.` }] },
      { id: "s6", text: String.raw`그런데 지금까지의 식은 $v$ 바로 직전 노드가 $u$라는 걸 미리 알고 있다는 전제 위에 서 있습니다. 실제로는 최단경로가 어느 노드를 거쳐 $v$에 도착하는지 미리 알 수 없습니다. 그러니 특정한 $u$ 하나만 고르는 대신 $v$와 인접한 모든 노드를 후보로 놓습니다. 각 후보에 대해 방금 얻은 식을 계산해보고 그중 가장 작은 값을 고르면 됩니다.`, blanks: [] },
      { id: "s7", text: String.raw`$d(v) = \min_u($[[blank:다]]$)$ 입니다.`,
        blanks: [{ id: "다", latex: String.raw`d(u) + w(u,v)`, why: String.raw`인접한 모든 $u$에 대해 바로 앞에서 얻은 식을 계산하고 그중 최솟값을 골라야 실제 최단거리와 일치합니다. 특정 $u$ 하나만 봐서는 그게 진짜 최단경로 위의 노드인지 미리 알 수 없기 때문에, 후보를 다 살펴보고 가장 작은 값을 고르는 것입니다.` }] },
      { id: "s8", text: String.raw`정리하면 $d(v)=\min_u(d(u)+w(u,v))$ 입니다. 전체 최적해의 일부분도 그 자체로 최적이어야 한다는 이 성질을 최적 부분구조라고 부릅니다. 이 재귀식은 강화학습의 벨만 방정식 $V(s)=\max_a(r+\gamma V(s'))$와 구조가 완전히 같습니다. 최소를 찾느냐 최대를 찾느냐만 다를 뿐입니다. 부분 최적해를 이어 붙여 전체 최적해를 만든다는 아이디어는 똑같습니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },

  "condition-number": {
    title: "조건수와 선형시스템의 오차 민감도",
    domain: "numeric",
    subLabel: "수치적 안정성",
    explanation: String.raw`컴퓨터로 계산할 땐 아주 작은 반올림 오차가 늘 섞여요. 진짜 문제는 오차가 섞이는지 여부가 아니에요. 그 작은 오차가 계산 과정에서 얼마나 크게 부풀려지는지가 진짜 문제예요. 그 부풀림 정도를 미리 알려주는 지표가 조건수예요. 수치해석에서는 조건수가 큰 상태를 ill-conditioned라고 불러요. 이런 경우엔 선형회귀에서 $(X^TX)^{-1}$을 구하는 것처럼 이론적으로는 맞는 계산도 수치적으로 불안정해질 수 있어요.<br><br><strong>명제.</strong> $Ax=b$에서 $b$에 오차 $\delta b$가 생기면 $\dfrac{\|\delta x\|}{\|x\|} \le \kappa(A)\dfrac{\|\delta b\|}{\|b\|}$, $\kappa(A)=\|A\|\|A^{-1}\|$.`,
    sections: [
      { id: "s1", text: String.raw`선형시스템 $Ax=b$를 풀 때 컴퓨터에 입력하는 $b$ 값부터 이미 완벽하지 않습니다. 실수를 유한한 자리수로 저장하다 보니 반올림 오차가 아주 작게라도 항상 섞여 들어갑니다. 이 자체는 피할 수 없습니다. 정말 중요한 질문은 따로 있습니다. 이 작은 오차가 답 $x$에는 얼마나 큰 오차로 나타나는지입니다. 입력의 오차가 그대로 작게 남을 수도 있습니다. 아니면 계산 과정에서 몇 배나 몇십 배로 증폭될 수도 있습니다. 지금 목표는 이 증폭 정도를 정확한 부등식으로 잡아내는 것입니다.`, blanks: [] },
      { id: "s2", text: String.raw`이 증폭 정도를 재려면 먼저 오차가 있는 상황을 수식으로 표현해야 합니다. $Ax=b$의 우변에 작은 오차가 섞여 $b+\delta b$가 되었다고 하겠습니다. 그러면 그에 대응하는 해도 조금 바뀌어서 $A(x+\delta x)=b+\delta b$를 만족하게 됩니다. 이제 $\delta b$와 $\delta x$ 사이의 관계를 밝히는 것이 다음 목표입니다.`, blanks: [] },
      { id: "s3", text: String.raw`둘 사이의 관계를 보려면 원래 식을 빼서 순수하게 오차끼리의 관계만 남기는 게 자연스러운 다음 수입니다. $A(x+\delta x)=b+\delta b$에서 원래 식 $Ax=b$를 빼면 $A\delta x=\delta b$가 남습니다. 여기서 양변에 $A^{-1}$을 곱하면 $\delta x = $[[blank:가]] 입니다.`,
        blanks: [{ id: "가", latex: String.raw`A^{-1}\delta b`, why: String.raw`$A\delta x=\delta b$의 양쪽에 $A^{-1}$를 곱하면 왼쪽은 $\delta x$만 남고 오른쪽은 $A^{-1}\delta b$가 됩니다. 이 식은 입력의 오차 $\delta b$가 $A^{-1}$이라는 변환을 통과하면서 그대로 해의 오차 $\delta x$로 바뀐다는 뜻입니다.` }] },
      { id: "s4", text: String.raw`$\delta x = A^{-1}\delta b$라는 식 자체는 정확한 관계이지만 이것만으로는 오차가 얼마나 커지는지 감이 오지 않습니다. 방향까지 담긴 벡터 등식이기 때문입니다. 오차의 크기만 따로 떼어서 비교하려면 양변에 노름을 씌워야 합니다. 행렬을 곱한 결과의 크기는 그 행렬의 노름을 넘어설 수 없다는 성질을 쓰면 크기만으로 이루어진 부등식을 얻을 수 있습니다.`, blanks: [] },
      { id: "s5", text: String.raw`이 성질 $\|Mv\|\le\|M\|\|v\|$을 $M=A^{-1}$, $v=\delta b$에 적용하면 $\|\delta x\| \le $[[blank:나]] 입니다.`,
        blanks: [{ id: "나", latex: String.raw`\|A^{-1}\|\|\delta b\|`, why: String.raw`임의의 행렬 $M$과 벡터 $v$에 대해 성립하는 $\|Mv\|\le\|M\|\|v\|$를 $M=A^{-1}$, $v=\delta b$로 놓고 그대로 적용한 것입니다. 오차 $\delta b$가 $A^{-1}$을 거치면서 커질 수 있는 최대 배율이 바로 $\|A^{-1}\|$이라는 뜻입니다.` }] },
      { id: "s6", text: String.raw`그런데 지금 얻은 부등식은 $\delta x$의 절대적인 크기에 대한 것입니다. 정작 궁금한 것은 이 오차가 $x$ 자체의 크기에 비해 얼마나 큰지, 즉 상대오차입니다. 상대오차를 구하려면 $\|x\|$를 $\|b\|$로 바꿔서 표현할 방법이 필요합니다. $b=Ax$라는 관계에 같은 노름 성질을 거꾸로 적용하면 됩니다.`, blanks: [] },
      { id: "s7", text: String.raw`$b=Ax$이므로 $\|b\|\le\|A\|\|x\|$입니다. 이 부등식의 양쪽을 $\|x\|\|b\|$로 나누면 $\dfrac{1}{\|x\|} \le $[[blank:다]] 입니다.`,
        blanks: [{ id: "다", latex: String.raw`\frac{\|A\|}{\|b\|}`, why: String.raw`$\|b\|\le\|A\|\|x\|$의 양쪽을 $\|x\|\|b\|$로 나누면 왼쪽은 $1/\|x\|$가 되고 오른쪽은 $\|A\|/\|b\|$가 됩니다. $\|x\|$가 작을수록 이 상한은 커진다는 뜻이라, 뒤에서 상대오차를 만들 때 필요한 조각입니다.` }] },
      { id: "s8", text: String.raw`이제 두 부등식을 나란히 곱하면 $\dfrac{\|\delta x\|}{\|x\|} \le \|A\|\|A^{-1}\|\cdot\dfrac{\|\delta b\|}{\|b\|}$을 얻습니다. 여기서 $\|A\|\|A^{-1}\|$을 조건수 $\kappa(A)$라고 부릅니다. 그러면 부등식은 $\dfrac{\|\delta x\|}{\|x\|} \le \kappa(A)\dfrac{\|\delta b\|}{\|b\|}$로 정리됩니다. 조건수 $\kappa(A)$가 크면 입력의 작은 상대오차가 그만큼 크게 증폭되어 해의 상대오차로 나타난다는 뜻입니다. 따라서 명제가 성립합니다.`, blanks: [] }
    ]
  },
};
