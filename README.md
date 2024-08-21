# 4조 팀프로젝트

이 페이지는 TypeScript로 작성된 React 기반 프론트 내용들을 기록하는 곳입니다. 프로젝트의 구조와 각 폴더 및 파일의 역할을 설명하며, 설정 및 실행 방법을 안내합니다.

## 프로젝트 구조

```
📦src/
├── 📂components/ # 재사용 가능한 UI 컴포넌트 모음
│ ├── 📂Layout/ # 레이아웃 관련 컴포넌트
│ │ ├── Header.tsx # 헤더 컴포넌트
│ │ ├── Footer.tsx # 푸터 컴포넌트
│ │ └── Layout.tsx # 공통 레이아웃 컴포넌트
│ ├── 📂Spot/ # 스팟 관련 컴포넌트
│ │ ├── SpotList.tsx # 스팟 목록 컴포넌트
│ │ ├── SpotDetail.tsx # 스팟 상세 정보 컴포넌트
│ │ └── SpotForm.tsx # 스팟 생성/수정 폼 컴포넌트
│ ├── 📂Course/ # 코스 관련 컴포넌트
│ │ ├── CourseList.tsx # 코스 목록 컴포넌트
│ │ ├── CourseDetail.tsx# 코스 상세 정보 컴포넌트
│ │ └── CourseForm.tsx # 코스 생성/수정 폼 컴포넌트
│ ├── 📂Comment/ # 댓글 관련 컴포넌트
│ │ ├── CommentList.tsx # 댓글 목록 컴포넌트
│ │ └── CommentForm.tsx # 댓글 작성 폼 컴포넌트
│ └── 📂Common/ # 공통 컴포넌트
│ ├── Rating.tsx # 별점 평가 컴포넌트
│ ├── Modal.tsx # 모달 컴포넌트
│ ├── Button.tsx # Ant Design 버튼을 감싸는 컴포넌트
│ ├── Input.tsx # Ant Design 인풋을 감싸는 컴포넌트
│ └── Select.tsx # Ant Design 셀렉트를 감싸는 컴포넌트
│
├── 📂hooks/ # 커스텀 훅 모음
│ ├── useAuth.ts # 사용자 인증 관련 훅
│ ├── useFetch.ts # 데이터 페칭 관련 훅
│ └── useSpot.ts # 스팟 데이터 관련 훅
│
├── 📂pages/ # 페이지 컴포넌트 모음
│ ├── MainPage.tsx # 메인 페이지 컴포넌트
│ ├── OnboardingPage.tsx # 온보딩 페이지 컴포넌트
│ ├── LocationSelectPage.tsx # 위치 선택 페이지 컴포넌트
│ ├── CourseSelectPage.tsx # 코스 선택 페이지 컴포넌트
│ ├── CourseDetailPage.tsx # 코스 상세 정보 페이지 컴포넌트
│ ├── SpotSelectPage.tsx # 스팟 선택 페이지 컴포넌트
│ ├── MyPage.tsx # 마이 페이지 컴포넌트
│ └── NotFoundPage.tsx # 404 페이지 컴포넌트
│
├── 📂routes/ # 라우트 정의
│ ├── AuthRoutes.tsx # 인증 관련 라우트
│ └── AppRoutes.tsx # 전체 애플리케이션 라우트
│
├── 📂services/ # API 호출 및 서비스 로직
│ ├── api.ts # 공통 API 호출 모듈
│ └── auth.ts # 인증 관련 API 호출 모듈
│
├── 📂types/ # 타입 정의 모음
│ ├── auth.ts # 사용자 인증 관련 타입 정의
│ ├── spot.ts # 스팟 관련 타입 정의
│ └── course.ts # 코스 관련 타입 정의
│
└── App.tsx # 메인 App 컴포넌트
```

## 폴더 및 파일 설명

### `components/`
재사용 가능한 UI 컴포넌트를 모아둔 폴더입니다. 각 컴포넌트는 독립적으로 사용될 수 있으며, 다양한 페이지에서 활용됩니다.

- **`Layout/`**: 레이아웃 관련 컴포넌트들이 위치합니다.
  - `Header.tsx`: 사이트의 헤더 컴포넌트.
  - `Footer.tsx`: 사이트의 푸터 컴포넌트.
  - `Layout.tsx`: 공통 레이아웃 컴포넌트.

- **`Spot/`**: 스팟(장소) 관련 컴포넌트들이 위치합니다.
  - `SpotList.tsx`: 스팟 목록을 표시하는 컴포넌트.
  - `SpotDetail.tsx`: 스팟의 상세 정보를 표시하는 컴포넌트.
  - `SpotForm.tsx`: 스팟을 생성하거나 수정하는 폼 컴포넌트.

- **`Course/`**: 코스 관련 컴포넌트들이 위치합니다.
  - `CourseList.tsx`: 코스 목록을 표시하는 컴포넌트.
  - `CourseDetail.tsx`: 코스의 상세 정보를 표시하는 컴포넌트.
  - `CourseForm.tsx`: 코스를 생성하거나 수정하는 폼 컴포넌트.

- **`Comment/`**: 댓글 관련 컴포넌트들이 위치합니다.
  - `CommentList.tsx`: 댓글 목록을 표시하는 컴포넌트.
  - `CommentForm.tsx`: 댓글을 작성하는 폼 컴포넌트.

- **`Common/`**: 공통으로 사용되는 UI 컴포넌트들이 위치합니다.
  - `Rating.tsx`: 별점 평가 컴포넌트.
  - `Modal.tsx`: 모달 컴포넌트.
  - `Button.tsx`: Ant Design 버튼 컴포넌트.
  - `Input.tsx`: Ant Design 인풋 컴포넌트.
  - `Select.tsx`: Ant Design 셀렉트 컴포넌트.

### `hooks/`
React 커스텀 훅을 정의하는 폴더입니다. 복잡한 로직을 재사용할 수 있도록 합니다.

- **`useAuth.ts`**: 사용자 인증 관련 훅.
- **`useFetch.ts`**: 데이터 페칭 관련 훅.
- **`useSpot.ts`**: 스팟 데이터 관련 훅.

### `pages/`
애플리케이션의 각 페이지를 구성하는 컴포넌트들이 위치합니다. 이들은 라우팅을 통해 접근됩니다.

- **`MainPage.tsx`**: 메인 페이지 컴포넌트.
- **`OnboardingPage.tsx`**: 온보딩 페이지 컴포넌트.
- **`LocationSelectPage.tsx`**: 위치 선택 페이지 컴포넌트.
- **`CourseSelectPage.tsx`**: 코스 선택 페이지 컴포넌트.
- **`CourseDetailPage.tsx`**: 코스 상세 정보 페이지 컴포넌트.
- **`SpotSelectPage.tsx`**: 스팟 선택 페이지 컴포넌트.
- **`MyPage.tsx`**: 사용자 개인 페이지 컴포넌트.
- **`NotFoundPage.tsx`**: 404 Not Found 페이지 컴포넌트.

### `routes/`
애플리케이션의 라우트를 정의하는 폴더입니다.

- **`AuthRoutes.tsx`**: 인증이 필요한 페이지들의 라우트를 정의.
- **`AppRoutes.tsx`**: 전체 애플리케이션의 라우트를 관리.

### `services/`
백엔드 API와의 통신을 담당하는 모듈들이 위치합니다.

- **`api.ts`**: 공통 API 호출 로직.
- **`auth.ts`**: 인증 관련 API 호출 로직.

### `types/`
TypeScript 인터페이스와 타입 정의를 위한 폴더입니다.

- **`auth.ts`**: 사용자 인증 관련 타입 정의.
- **`spot.ts`**: 스팟 관련 타입 정의.
- **`course.ts`**: 코스 관련 타입 정의.

### 최상위 파일들
- **`App.tsx`**: 애플리케이션의 루트 컴포넌트입니다. 모든 페이지가 이 컴포넌트를 통해 렌더링됩니다.

## 설치 및 실행

### 1. 패키지 설치
프로젝트 루트 디렉토리에서 다음 명령어를 치세요.
- npx create-react-app . --template typescript
- npm i / npm start

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
