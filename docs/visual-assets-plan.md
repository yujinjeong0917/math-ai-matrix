# 시각 자료 보강 계획

두 종류로 나눴다. (A) 정확도가 중요한 개념 다이어그램은 SVG로 직접 그리는 쪽(사이트에 이미 `diagram-box` 스키마가 있어서 바로 얹을 수 있음), (B) 분위기용 이미지는 외부 이미지 생성 API로 만들 수 있게 프롬프트를 준비했다.

---

## A. SVG 개념 다이어그램 (정밀도 필요, 직접 코딩 권장)

`concepts/data.js`의 각 항목에 `diagram: String.raw\`<svg>...</svg>\`` 필드 하나만 추가하면 렌더링된다 (`concepts/index.html`이 이미 `.diagram-box`로 지원, 라이트/다크 테마 자동 대응 — `dg-dim`/`dg-accent`/`dg-line`/`dg-stroke-accent` 클래스 사용).

### 예비수학 (foundations) — 13개 중 시각 효과 큰 순

| 순위 | slug | 다이어그램 내용 |
|---|---|---|
| 1 | `found-vector-geometric-meaning` | 벡터 $u$, $v$ 화살표 두 개 + 사잇각 $\theta$ 호 표시 + $u$ 위로 내린 $v$의 정사영(점선) |
| 2 | `found-linear-transformation-geometry` | 단위원이 행렬 변환으로 타원이 되는 그림, 고유벡터 방향 두 개를 화살표로 강조 |
| 3 | `found-matrix-operations-intuition` | 단위정사각형 → (행렬 $A$) → 평행사변형, 역행렬 $A^{-1}$로 다시 정사각형으로 돌아오는 화살표 루프 |
| 4 | `found-3d-coordinate-space` | 3축 좌표계 + 평면 하나 + 그 평면에 수직인 법선벡터 |
| 5 | `found-conic-sections` | 타원형 등고선 3~4겹 + 그 위를 지그재그로 내려가는 경사하강법 경로 |
| 6 | `found-multivariable-preview` | $f(x,y)=x^2+y^2$의 동심원 등고선 + 중심에서 바깥으로 뻗는 그래디언트 화살표 다발 |
| 7 | `found-random-variable-intuition` | 주사위 눈 1~6의 확률질량함수 막대그래프, 기댓값(3.5) 위치를 점선으로 표시 |
| 8 | `found-trig-identity-graph` | $\sin(x)$와 $\sin(2x+\pi/4)$ 두 곡선을 겹쳐 그려 주기·위상차를 눈으로 비교 |
| 9 | `found-log-exp-advanced` | $e^x$와 $\ln x$ 그래프를 $y=x$ 대칭선과 함께 (역함수 관계 시각화) |
| 10 | `found-sequence-limit-sigma` | 등비급수 부분합 $S_n$이 계단식으로 극한값에 가까워지는 그래프 |
| 11 | `found-calc2-limits` | $\sin x/x$ 그래프가 $x=0$ 근방에서 $1$로 수렴하는 모습(구멍点 표시) |
| 12 | `found-mathematical-induction` | 도미노가 순서대로 넘어지는 그림 (base case 첫 도미노 → 귀납단계 화살표) |
| 13 | `found-permutation-graph-basics` | 노드 4개짜리 그래프(엣지 3~4개) + 옆에 순열 트리 일부 |

### 매트릭스 읽는 법 (guide) — 11개 중 시각 효과 큰 것

| slug | 다이어그램 내용 |
|---|---|
| (섹션 04 전체, 신규) | 행×열 매트릭스 개념도 — 큰 격자 하나 그리고 교차점 한 칸을 확대해서 "PCA = 선형대수 행 × Classical ML 열" 라벨링 |
| `axis-generative-models` | VAE·GAN·Diffusion·Autoregressive 4갈래를 각각 다른 화살표 흐름(인코더→디코더 / 생성자↔판별자 / 노이즈→디노이즈 단계 / 순차 체인)으로 나란히 비교 |
| `axis-reinforcement-learning` | Agent ⇄ Environment 순환 루프(상태·행동·보상 화살표) |
| `axis-causal-inference` | 아주 간단한 DAG 하나(처치 → 결과, 교란변수 → 둘 다) |
| `axis-discrete-math` | 트리 구조 하나 + 그래프 구조 하나를 나란히 |
| `axis-numerical-analysis` | 반복법이 수렴하는 경우 vs 발산하는 경우를 두 개의 계단식 그래프로 대비 |

**총 SVG 후보: 19개.** 전부 만들 필요는 없고, 우선순위 1~6번(예비수학) + 매트릭스 개념도 1개 정도만 먼저 해도 체감 효과가 클 것 같다.

---

## B. 무드 이미지 (AI 생성, 외부 키로 제작)

### 공통 스타일 가이드 (모든 프롬프트에 붙일 것)

사이트가 이미 가진 무드: **미니멀 기하 추상, 스위스/바우하우스 포스터 감성, 플랫 벡터 일러스트**. 절대 피해야 할 것 — 포토리얼리즘, 광택 나는 3D 렌더, "빛나는 신경망/뇌" 같은 AI 클리셰, 스톡사진 느낌의 사람·노트북·사무실 사진.

공통 프롬프트 접미사(붙여서 사용):
```
minimalist geometric abstract illustration, Swiss/Bauhaus poster style,
flat vector shapes, thin precise line work, muted matte colors,
generous negative space, editorial textbook aesthetic,
no photorealism, no glossy 3D render, no glowing neural network cliché,
no stock-photo people, no text or letters in the image
```

색상 팔레트(사이트 실제 hex, 프롬프트에 그대로 넣기):
- 배경: `#eef0f3` (라이트) / `#12151b` (다크)
- 잉크: `#1a2130` (라이트) / `#e8eaef` (다크)
- 강조색(amber): `#d98c14` (라이트) / `#eab35a` (다크)
- 도메인색: 선형대수 `#33569e`(blue) · 미적분 `#b85c26`(burnt orange) · 확률통계 `#1c7f68`(teal green) · 정보이론 `#7d3d92`(purple) · 이산수학 `#93701f`(mustard) · 수치해석 `#a13b52`(maroon) · 인과추론 `#2f7d6b`(teal)

### 후보 목록 + 프롬프트

**1. 사이트 전체 히어로 / OG 소셜 공유 이미지** (1200×630 권장)
```
A minimalist geometric abstract illustration representing a matrix/grid
that branches into mathematical and AI concepts. Rows of thin colored
lines (#33569e blue, #b85c26 burnt orange, #1c7f68 teal green, #7d3d92
purple) intersecting with columns, like a woven grid. Background
#eef0f3 off-white paper texture. One node glows subtly with amber
#d98c14 accent where a row and column intersect. Swiss/Bauhaus poster
style, flat vector shapes, thin precise line work, generous negative
space, editorial textbook aesthetic. No text, no photorealism, no
glossy 3D render, no glowing neural network cliché.
```

**2. "매트릭스 읽는 법" (guide) 챕터 상단 무드**
```
Minimalist abstract illustration of a compass or map-reading motif
rendered as thin geometric lines, symbolizing "how to read a matrix."
A grid of thin lines in muted teal #2f6a7a with one row and one
column highlighted in amber #d98c14 where they cross, on off-white
#eef0f3 background. Swiss poster style, flat vector, thin line work,
generous whitespace, editorial diagram feel. No text, no photorealism,
no glow effects, no people.
```

**3. "예비수학" (foundations) 챕터 상단 무드**
```
Minimalist abstract illustration of a small seedling or sprouting
line-form growing from simple geometric roots (triangle, circle,
line segment) into more complex shapes, symbolizing foundational
math growing toward advanced concepts. Muted green #2f7a4a accent
on off-white #eef0f3 background. Swiss/Bauhaus poster style, flat
vector shapes, thin precise lines, generous negative space. No text,
no photorealism, no gradients that look glossy, no people.
```

**4~10. 도메인별 커버 이미지 (7개 — 선형대수·미적분·확률통계·정보이론·이산수학·수치해석·인과추론)**

공통 틀:
```
Minimalist abstract geometric illustration representing [DOMAIN
MOTIF], in a single accent color [HEX] on off-white #eef0f3
background (or #12151b dark background variant). Swiss/Bauhaus
poster style, flat vector shapes, thin precise line work, generous
negative space, editorial textbook diagram aesthetic. No text, no
photorealism, no glossy 3D render, no people.
```

도메인별 `[DOMAIN MOTIF]` / `[HEX]`:
- 선형대수: "a square being sheared into a parallelogram by thin directional arrows, eigenvector directions highlighted" / `#33569e`
- 미적분: "a smooth curve with a tangent line touching it at one point, and a small ball rolling down a valley-shaped contour" / `#b85c26`
- 확률통계: "overlapping bell-curve silhouettes and a scatter of small dots settling into a distribution shape" / `#1c7f68`
- 정보이론: "a signal splitting into branching binary paths, entropy visualized as diverging thin lines from one point" / `#7d3d92`
- 이산수학: "a simple graph of nodes and edges, some nodes connected in a tree branching pattern" / `#93701f`
- 수치해석: "a spiral of thin lines converging toward a center point, representing iterative convergence" / `#a13b52`
- 인과추론: "two nodes connected by a directional arrow, with a third node above sending arrows to both (a minimal causal diagram)" / `#2f7d6b`

### 사용 우선순위 제안
지금 당장 체감 효과가 큰 순서: **1(사이트 히어로) → 2, 3(신규 챕터 두 개) → 4~10(도메인 커버, 있으면 각 매트릭스 페이지 상단에 넣기 좋음)**. 전부 안 만들어도 되고, 1~3번만 먼저 만들어봐도 무드는 확실히 붙을 것 같다.
