---
slug: idle-resource-detection
theme: MLOPS
domainLabel: MLOps · 인프라
subLabel: 낭비 제거
title: 유휴 자원 탐지: 쓰이지 않는 인스턴스를 자동으로 찾아내기
related: 스팟 인스턴스 활용 · 오토스케일링과 비용의 트레이드오프
---

## 도입
탐지 방식은 자원 종류별로 다르지만 원리는 비슷합니다. 컴퓨팅 인스턴스는 최근 일정 기간 CPU나 GPU 사용률이 낮은 상태로 지속되었는지를 봅니다. 스토리지는 최근 접근 로그가 없는 볼륨이나 오브젝트를 찾습니다. 연결이 끊긴 네트워크 자원이나 아무 인스턴스도 연결되지 않은 볼륨처럼 애초에 쓰임새가 사라진 자원도 흔한 대상입니다.

탐지된 자원은 곧바로 삭제하기보다 태그를 붙이거나 담당자에게 알려서 확인할 시간을 준 뒤 일정 기간이 지나도 반응이 없으면 자동으로 정리하는 단계적 절차를 두는 경우가 많습니다. 실험용으로 임시로 켜둔 자원과 앞으로 쓸 예정이라 미리 준비해둔 자원을 구분하기 어렵기 때문에 탐지와 삭제 사이에 확인 절차를 두는 것이 안전합니다.

이런 탐지가 없으면 유휴 자원은 눈에 띄지 않게 쌓입니다. 개별 인스턴스 하나의 비용은 크지 않아 보여도 실험이 끝날 때마다 정리를 깜빡한 자원이 수십 개씩 쌓이면 그 합계가 실제 사용 중인 자원의 지출을 넘어서는 경우도 드물지 않습니다. 정기적인 탐지는 이런 누적 낭비를 초기에 잘라내는 가장 손쉬운 비용 절감 수단입니다.

## 명제


## 그림
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<text x="40" y="24" font-size="12">인스턴스 · 볼륨별 최근 사용률</text>
<text x="40" y="55" font-size="11">인스턴스 A</text>
<rect x="150" y="44" width="400" height="16" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="150" y="44" width="320" height="16" class="dg-dim" stroke="none"/>
<text x="40" y="90" font-size="11">인스턴스 B</text>
<rect x="150" y="79" width="400" height="16" fill="none" class="dg-stroke-ink" stroke-width="1"/>
<rect x="150" y="79" width="260" height="16" class="dg-dim" stroke="none"/>
<text x="40" y="125" font-size="11">인스턴스 C</text>
<rect x="150" y="114" width="400" height="16" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<rect x="150" y="114" width="15" height="16" class="dg-accent" stroke="none"/>
<text x="560" y="127" font-size="11" class="dg-accent">회수 대상</text>
<text x="40" y="160" font-size="11">스토리지 볼륨 X</text>
<rect x="150" y="149" width="400" height="16" fill="none" class="dg-stroke-accent" stroke-width="1.5"/>
<rect x="150" y="149" width="8" height="16" class="dg-accent" stroke="none"/>
<text x="560" y="162" font-size="11" class="dg-accent">회수 대상</text>
</svg>

_사용률이 낮은 인스턴스와 접근이 없는 볼륨이 회수 대상으로 표시됩니다._

## 문제
탐지 스캔은 $T_{detect}$일마다 한 번씩 규칙적으로 실행됩니다. 유휴 자원 하나가 이 주기 안에서 정확히 언제 발생할지는 알 수 없으므로, 발생 시점 $s$가 구간 $[0, T_{detect}]$ 안에서 고르게(균등하게) 분포한다고 가정합니다. 발생 시점이 $s$이면 다음 스캔까지 남은 시간은 $T_{detect}-s$이고, 이 값을 $s=0$부터 $s=T_{detect}$까지 평균 내면 다음 스캔까지 걸리는 평균 대기시간이 나옵니다. 이 평균을 구하면 ==빈칸== 가 됩니다.

## 해설
T_{detect}-s를 s=0부터 s=T_{detect}까지 평균 내면 양 끝값의 평균인 (T_{detect}+0)/2, 즉 T_{detect}/2가 나와요. 균등분포에서는 구간 양 끝값의 평균이 곧 전체 평균이기 때문이에요.

**정답: $\frac{T_{detect}}{2}$**

## 예시

