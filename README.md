# Noddy

# 목차

- [🔥 동기](#-동기)
- [📖 프리뷰](#-프리뷰)
- [💻 개발](#-개발)
- [🚀 최적화](#-최적화)
- [👌 사용자 경험](#-사용자-경험)
- [💥 트러블 슈팅](#-트러블-슈팅)
- [⚒️ 리팩토링](#️-리팩토링)
- [🎯 기능](#-기능)
- [📚 기술 스택](#-기술-스택)
- [🗓️ 기간](#️-기간)

# 🔥 동기

해당 팀 프로젝트를 시작한 계기는 아주 단순하면서도 중요한 질문에서 출발했습니다.

**“컴퓨터를 조금 더 편리하게 조작할 수는 없을까?”**

현대인의 삶에서 컴퓨터는 필수적인 도구지만, 여전히 불편함이 남아있습니다.
마우스는 한 손으로 비교적 쉽게 움직일 수 있지만, 키보드를 다루려면 두 손을 모두 사용해야 합니다.
그러다 보니 사용자는 항상 한 손으로만 할 수 있는 조작과, 반드시 두 손이 필요한 조작 사이를 오가며 느끼게 되는 번거로움은 불가피하다고 생각했습니다. 특히 빠르게 무언가를 입력하면서 동시에 화면을 움직이거나 클릭해야 할 때 이 불편함은 더욱 크게 다가옵니다.

저희는 이 문제를 해결하기 위해 몇 가지 가설을 세웠습니다.

1. 두 손만으로 마우스와 키보드를 동시에 조작할 수 있을까?
2. 가능하다면, 둘 중 하나를 다른 것으로 대체할 수는 없을까?
3. 마우스와 키보드가 가진 장점을 유지하면서도, 더 자연스럽게 쓸 수 있는 방법은 없을까?
4. 컴퓨터를 조작하는 데 있어 ‘손’ 이외에 쓸 수 있는 신체 부위가 있을까?

이 질문들을 따라가며, 저희는 한 가지 흥미로운 가능성에 도달했습니다.

**“손이 아니라 머리로 컴퓨터를 조작할 수 있다면 어떨까?”**

머리야말로 사용자가 화면을 바라보는 동안 커서의 위치와 머리의 방향이 자연스럽게 동기화되어 움직이는 부위이며, 손과 달리 키보드나 다른 입력장치와 동시에 쓸 수 있다는 장점이 있다고 생각했습니다.
머리 움직임을 입력 장치로 활용하면, 손을 떼지 않고도 마우스를 대신할 수 있고, 키보드 작업과 병행할 수도 있겠다는 확신이 들었습니다.

그러던 중 저희는 **에어팟의 모션 센서를 활용할 수 있는 API**를 발견하게 되었고,
이를 통해 머리의 움직임 데이터를 실시간으로 받아올 수 있다는 가능성까지 확인했습니다.
이 기술을 접목한다면, 누구나 이미 가지고 있는 에어팟만으로도 머리 움직임을 감지해 마우스를 조작할 수 있겠다는 아이디어로 발전하게 되었습니다.

# 📖 프리뷰

# 💻 개발

## 1. 머리 움직임을 어떻게 컴퓨터 커서 움직임으로 바꿀까?

### 1.1 `CMHeadphoneMotionManager`를 활용한 자이로스코프 데이터 추출

`CMHeadphoneMotionManager`는 에어팟을 착용한 사용자의 머리 움직임을 측정할 수 있는 Swift 언어 내 Core Motion API로 에어팟에 내장된 자이로스코프와 가속도계 센서를 활용한 데이터를 제공합니다.

자이로스코프는 3축(x, y, z) 방향의 회전율(angular velocity) 을 측정할 수 있으며,
이를 통해 사용자가 고개를 어느 방향으로 얼마나 빠르게 움직이고 있는지를 실시간으로 파악할 수 있습니다.

해당 API가 제공하는 주요 데이터로는:

- `roll` : 좌우 기울기
- `pitch` : 상하 기울기
- `yaw`: 머리의 회전 상태를 표현(수평 회전)

위 데이터를 실시간으로 받아올 수 있었으며 저희 프로젝트에서는 머리의 방향에 따라 달라지는 값인 `attitude`의 `pitch`와 `yaw` 값을 중심으로, 사용자의 머리 움직임을 마우스 커서의 XY 좌표와 자연스럽게 매핑하는 로직을 구현하고자 했습니다.

- `pitch` : 머리(고개)를 위아래로 드는 움직임에 대한 데이터로 활용(모니터의 y축). 커서를 위로 올리고 싶다면 조금 더 고개를 드는 식으로 조작.
- `yaw` : 머리를 좌우로 돌리는 움직임을 나타냄(모니터의 x축). 왼쪽으로 커서를 움직이고 싶다면 고개를 왼쪽으로 돌리는 식으로 조작.

### 1.2 사용자의 머리 움직임을 화면 내 커서의 XY 좌표로 어떻게 자연스럽게 매핑할까?

사용자가 에어팟을 착용하고 위 API를 호출하고 움직이지 않고 정면을 바라볼 때 각도값은 0에 수렴합니다.
따라서, 반환되는 데이터 값도 0인 것을 활용하여 커서가 화면의 정중앙에 있을 떄 `pitch`와 `yaw` 값이 0이라고 설정했습니다. 하지만 받아온 `pitch`와 `yaw` 값은 센서 노이즈가 포함된 라디안 단위의 연속적인 실수값이고, 이로 인해 화면 커서 좌표에 매핑하면 민감하고 부자연스럽게 커서가 움직이는 문제점이 있었습니다.

```swift
attitude.pitch   // 0.123456789012345
attitude.yaw     // -1.5707963267948966
attitude.roll    // 0.987654321
```

## 2. 커서의 노이즈 처리를 위한 필터링 작업

위와 같이 필터링되지 않은 `pitch`와 `yaw` 값은 사용자의 의도와 무관한 작은 떨림이나 움직임까지도 데이터로 수집하여 커서가 불안정하게 흔들리거나 튀는 현상을 발생시킵니다. 이는 사용자 입장에서 원하지 않는 상황에서도 커서가 계속해서 움직이고, 정확한 조작이 어렵기 만들기 때문에 서비스와 사용자 간의 인터랙션을 저하시킬 수 있는 요인이었습니다.

저희는 위 문제를 해결하기 위해, 다음과 같은 단계를 거쳐 머리 움직임을 부드럽고 자연스럽게 화면 좌표에 대응하도록 설계했습니다:

### 2.1 센서 값 필터링

```swift
filteredPitch = filteredPitch + filterAlpha * (pitch - filteredPitch)
filteredYaw = filteredYaw + filterAlpha * (yaw - filteredYaw)
```

- 실시간으로 들어오는 `pitch`와 `yaw` 값에 **Low-pass filter**를 적용해,
  갑작스러운 움직임이나 노이즈 완화
- `filterAlpha` 값으로 필터의 민감도를 조절

### 2.2 움직임 임계값(데드존) 설정

```swift
let movementThreshold = 0.0088
let finalPitch = abs(filteredPitch) < movementThreshold ? 0 : filteredPitch
let finalYaw = abs(filteredYaw) < movementThreshold ? 0 : filteredYaw
```

- 작은 움직임을 무시해 커서가 사소하게 흔들리지 않도록 함
- 사용자가 실제로 "머리를 움직였다" 싶은 수준 이상에서만 커서가 움직이도록 설정(QA 테스트를 진행하여 임의의 값 설정)

### 2.3 좌표계 정규화

```swift
let normalizePi: Double = .pi / cursorSensitivity
let normalizedPitch = ((finalPitch) + normalizePi / 2) / normalizePi + pitchOffset
let normalizedYaw = ((finalYaw) + normalizePi) / (2 * normalizePi) + yawOffset
```

- 라디안 범위를 (0,1) 근처의 값으로 변환
- `cursorSensitivity` 값으로 민감도를 조절
- 초기 기준값 보정을 위해 `pitchOffset`, `yawOffset`을 더함
- (사용자가 화면 정중앙을 바라볼 때 커서가 화면 중앙 (0,0)에 위치)

### 2.4 화면 해상도에 맞춰 매핑

```swift
let mappedX = screenWidth * CGFloat(normalizedYaw)
let mappedY = screenHeight * (1 - CGFloat(normalizedPitch))
```

- 정규화된 값을 실제 화면 픽셀 좌표로 변환
- `pitch`는 화면의 Y축, `yaw`는 X축에 대응
- 화면 해상도(`screenWidth`, `screenHeight`)에 따라 자동으로 맞춰짐

### 2.5 결과

이 과정을 통해:

- 사용자가 화면의 정중앙을 바라볼 때 커서가 화면 중앙에 위치
- 머리를 좌우로 돌리면 `yaw`가 변해 커서가 X축으로 이동
- 머리를 위아래로 움직이면 `pitch`가 변해 커서가 Y축으로 이동
- 너무 작은 움직임은 무시, 빠른 움직임은 부드럽게 처리

결과적으로, 머리 움직임만으로도 자연스럽고 직관적으로 커서를 조작할 수 있게 되었습니다.

# 🚀 최적화

# 👌 사용자 경험

## 1. 키보드 단축키를 활용한 마우스 기능 제공

머리의 움직임으로 커서의 위치를 조작하지만 그 외 마우스가 제공하는 기능들을 수행하지 못하면 앞선 것들이 무의미해지게 됩니다. 이를 보완하기 위해 **키보드 단축키**들을 이용하여 다음과 같은 기능들을 제공합니다.

|      기능       | 동작 방식                          | 구현 방식                                                                    |
| :-------------: | :--------------------------------- | :--------------------------------------------------------------------------- |
|   **좌클릭**    | 단축키 한 번 클릭                  | 현재 커서 위치에서 `.leftMouseDown` → `.leftMouseUp` 이벤트 발생             |
|  **더블클릭**   | 빠르게 두 번 클릭                  | `NSEvent.doubleClickInterval` 기준으로 `clickCount` 를 2로 설정              |
|   **우클릭**    | 단축키 한 번 클릭                  | `.rightMouseDown` → `.rightMouseUp` 이벤트 발생                              |
|   **드래그**    | 단축키를 누른 상태로 머리를 움직임 | `simulateDragWhileMouseDown()` 로 주기적으로 `.leftMouseDragged` 이벤트 발생 |
| **커서 초기화** | 단축키 한 번 클릭                  | 화면 중앙으로 커서 위치 이동                                                 |
|  **감도 조절**  | 단축키 한 번 클릭                  | `cursorSensitivity` 값을 조절                                                |

---

### 구현 방식 요약

- Quartz API의 `CGEvent` 로 마우스 클릭/드래그 이벤트 생성
- `clickCount` 와 `NSEvent.doubleClickInterval` 로 더블클릭 감지
- 드래그는 `leftMouseDown` 이후 일정 간격으로 `leftMouseDragged` 이벤트 발생
- Space, Shift, Esc, +, - 등의 전역 단축키로 기능 제어

### 코드

```swift
static func leftMouseDownAtCursor() {
    let currentTime = CFAbsoluteTimeGetCurrent()
    let timeSinceLastClick = currentTime - lastClickTime
    if timeSinceLastClick < NSEvent.doubleClickInterval {
        clickCount = min(clickCount + 1, 2)
    } else {
        clickCount = 1
    }
    lastClickTime = currentTime
    click(mouseType: .leftMouseDown, button: .left, clickCount: clickCount)
    simulateDragWhileMouseDown()
}

static func simulateDragWhileMouseDown(duration: TimeInterval = 1.0, interval: TimeInterval = 0.01) {
    let endTime = Date().addingTimeInterval(duration)
    var lastPos = currentCursorPos
    DispatchQueue.global(qos: .userInteractive).async {
        while Date() < endTime {
            let currentPos = currentCursorPos
            if currentPos != lastPos {
                leftMouseDragAtCursor(to: currentPos)
                lastPos = currentPos
            }
            usleep(useconds_t(interval * 1_000_000))
        }
    }
}
```

## 2. three.js를 활용한 3D 모델 가이드 제공

머리 움직임 기반 커서 조작을 처음 접하는 사용자들이 더 빠르고 직관적으로 이해할 수 있도록,
**three.js 기반의 3D 가이드 모델**을 제공합니다.

---

### 2.1 구현 개요

| 파일명                        | 역할                                                    |
| :---------------------------- | :------------------------------------------------------ |
| **ThreeDimensionalImage.jsx** | - 화면에 3D 모델 가이드를 렌더링하는 메인 컴포넌트      |
| **Model3D.jsx**               | - 실제 3D 객체 로드 및 애니메이션 / 뷰포트 설정 등 처리 |

- `@react-three/fiber`, `@react-three/drei` 등 three.js 생태계 라이브러리 사용
- React 컴포넌트 구조로 손쉽게 상태 관리 및 UI와 연동

---

### 2.2 사용자 경험 측면의 기능

- 사용자가 머리를 어느 방향으로 움직이면 커서가 어떻게 이동하는지
  → 실시간으로 3D 가이드 모델을 통해 시각화
- 초기 설정 시 “머리를 이렇게 움직이면 이렇게 반응한다” 튜토리얼 제공
- 민감도 설정 변경 시 3D 가이드 모델도 즉시 반응 → 사용자가 체감 가능
- 가이드 모델을 회전/확대·축소할 수 있어, 다양한 각도에서 확인 가능

---

### 2.3 사용자 입장에서의 장점

- 머리 움직임과 화면 커서 사이의 매핑을 쉽게 이해
- 민감도·조작 모드를 바꿔가며 즉시 체감 가능
- 초보자도 빠르게 적응 가능, 진입장벽 감소

---

### 2.4 추가 구현 디테일

- GLTF / GLB 형식의 경량 3D 모델 로드
- React 상태 관리 라이브러리와 연동 → 민감도, 모드 변경 시 실시간 렌더
- 다크 모드·라이트 모드 테마와도 연동

---

### 2.5 코드

```jsx
// ThreeDimensionalImage.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import Model3D from "./Model3D";

export default function ThreeDimensionalImage() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <Model3D />
    </Canvas>
  );
}

// Model3D.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";
import { useMotionStore } from "@/stores/useMotionStore"; // pitch, yaw 상태 관리

export default function Model3D() {
  const { scene } = useGLTF("/models/headGuide.glb");
  const pitch = useMotionStore(state => state.pitch);
  const yaw = useMotionStore(state => state.yaw);

  return (
    <primitive
      object={scene}
      scale={1.2}
      rotation={[pitch, yaw, 0]} // 머리 움직임을 모델 회전에 반영
    />
  );
}
```

- 머리 움직임에서 얻은 `pitch`, `yaw` 값을 전역 상태(`useMotionStore`)에 저장
- 3D 모델의 `rotation` props에 적용 → 실시간으로 가이드 모델이 사용자 머리 움직임과 동기화

## 3. 스크롤 모드 구현

### 3.1 문제점: 문서 탐색의 불편함

에어팟 기반의 커서 제어 시스템을 구현하는 과정에서, 단순한 커서 이동 만으로 웹 페이지나 긴 문서를 편리하게 탐색하기 어렵다는 문제를 발견했습니다.

특히 손을 전혀 사용하지 않고 머리 움직임만으로 화면을 제어해야 하는 상황에서는, 웹 페이지를 아래로 스크롤하기 위해 커서를 화면의 우축 스크롤바로 정확히 이동시킨 다음, 단축키로 클릭하고 끌어내리는 과정을 반복해야 했습니다.

이 과정은 머리 움직임만으로 정밀하게 커서를 조작해야 하기 때문에 시간이 오래 걸리고, 원하는 위치에 커서를 정확히 위치시키기 어려우며,
한 번의 스크롤로 충분하지 않을 경우 여러 번 고개를 움직여야 하는 불편함이 따릅니다.

### 3.2 해결 방법: 고개 각도 기반 속도 조절 + 스크롤 모드 분리

<스크롤 전용 모드 분리>
앞서 언급한 문제점을 해결하기 위해 커서 이동과 스크롤 기능을 명확하게 분리하는 구조로 시스템을 재설계하였습니다.
사용자가 서비스를 이용하는 중 특정 단축키를 누르면 "스크롤 모드"로 진입하며, 이 모드에 들어가면 커서를 더 이상 직접 이동하지 않고, 고개 움직임만으로 화면을 위 아래로 스크롤할 수 있게 됩니다.

예를 들어, 사용자가 고개를 아래로 숙이면 페이지가 아래로, 고개를 위로 들면 페이지가 위로 스크롤됩니다.
이로써 사용자는 손을 전혀 쓰지 않고도 웹 페이지를 훨씬 더 자연스럽게 탐색할 수 있게 되었습니다.

<고개 각도에 따른 스크롤 속도 조절>
또한 스크롤 모드 내에서도 단순히 방향만 조절하는 것이 아니라, 사용자의 고개 각도(pitch)에 따라 스크롤 속도도 자동으로 조절되도록 구현하였습니다.

- 고개를 살짝 숙이면 -> 페이지가 천천히 스크롤되고
- 고개를 크게 숙이면 -> 패아자거 뻐루개 스크롤되는 구조입니다.

이 방식은 사용자가 페이지를 빠르게 훓어보고 싶을 때와, 내용을 천천히 읽고 싶을 때를 구분해 정확하게 사용자의 의도를 반영할 수 있도록 도와줍니다.
또한, 속도가 정해진 것이 아니라 실시간으로 사용자 움직임에 반응하므로, 더욱 직관적이고 몰입감 있는 스크롤 경험을 제공할 수 있게 되었습니다.

## 4. 다국어 지원

모든 UI 텍스트가 고정된 한국어로 작성되어 있어, 비한국어권 사용자들이 서비스를 사용하는 데 어려움이 있었습니다. 특히 브라우저 언어 설정이 영어인 사용자들이 처음 페이지를 접했을 때, 자연스럽게 이해하기 어려운 불편함이 있었습니다.

이 문제를 해결하기 위해 브라우저의 navigator.language 객체를 활용하여 사용자의 현재 브라우저 언어를 기준으로 서비스를 제공할 수 있도록 다국어 지원 기능을 도입했습니다. i18next, react-i18next, 그리고 i18next-browser-languagedetector 라이브러리를 사용하여 사용자의 브라우저 언어를 자동으로 감지하고, 해당 언어에 맞는 UI 텍스트를 동적으로 적용하도록 구성했습니다.

그 결과, 사용자는 별도의 설정 없이도 자신의 브라우저 언어에 맞는 UI를 즉시 확인할 수 있게 되었고, 보다 자연스럽고 직관적인 사용자 경험을 제공할 수 있게 되었습니다.

```
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: { translation: { ... } },  // 영어 번역 리소스
  ko: { translation: { ... } },  // 한국어 번역 리소스
};

i18n
  .use(LanguageDetector)         // 브라우저 언어 감지
  .use(initReactI18next)         // React와 연결
  .init({
    resources,
    fallbackLng: "ko",           // 감지 실패 시 한국어로 기본 설정
    detection: {
      order: ["navigator"],      // navigator.language만 사용하여 감지
      caches: [],                // 언어 설정을 브라우저에 캐시하지 않음
    },
    interpolation: {
      escapeValue: false,        // HTML 이스케이프 방지
    },
  });

export default i18n;
```

단순히 navigator.language만 사용하는 경우, 언어 감지는 가능하지만 매끄러운 언어 리소스 관리나 번역 적용 등이 어려웠습니다.
감지된 언어에 따라 UI 텍스트를 바꾸려면, 각 컴포넌트마다 조건문(if, switch)을 직접 써야 했고 사용자의 언어가 바뀌어도 컴포넌트가 자동으로 UI를 갱신해주지 않기 때문에 직접 리렌더링을 트리거하여야 했습니다. 따라서, i18next, react-i18next, i18next-browser-languagedetector 등의 라이브러리를 함께 사용하였으며 다음과 같은 이점을 얻을 수 있었습니다.

- 언어 리소스를 모듈화하여 관리할 수 있어 유지보수가 쉬워졌고,
- React 컴포넌트 내부에서 손쉽게 번역 문자열을 불러오고 적용할 수 있으며,
- 추후 다국어 확장이나 언어 전환 기능 구현 시 일관된 방식으로 손쉽게 확장할 수 있는 기반이 마련되었습니다.

# 💥 트러블 슈팅

# ⚒️ 리팩토링

# 🎯 기능

# 📚 기술 스택

# 🗓️ 기간
