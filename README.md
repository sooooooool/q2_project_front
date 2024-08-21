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

##  GIT 규칙 - commit, branch

### Commit 규칙

- 타입(태그): 커밋의 성격을 간결하게 나타냅니다.
- 주제: 변경 사항을 요약합니다 (50자 이내).
- 본문: 선택 사항으로, 커밋에 대한 추가 설명이나 이유, 세부사항을 포함할 수 있습니다. 본문은 한 줄 비워둔 뒤 작성하며, 각 줄은 72자를 넘지 않도록 합니다.
- 이슈 번호: 관련된 이슈 번호를 명시합니다 (있을 경우).
```
feat: Add user authentication

Implemented JWT-based authentication for the user login system.
This includes token generation, verification, and middleware setup.

Closes #42
```

### 커밋 메시지 타입(태그)

- feat: 새로운 기능 추가 (예: feat: Add payment processing module)
- fix: 버그 수정 (예: fix: Correct user login issue)
- refactor: 코드 리팩토링 (기능 변화 없음) (예: refactor: Optimize API response handling)
- style: 코드 스타일 수정 (포매팅, 세미콜론 추가 등) (예: style: Reformat code according to ESLint rules)
- docs: 문서 수정 (예: docs: Update API documentation for v2.0)
- test: 테스트 코드 추가 또는 수정 (예: test: Add unit tests for user service)
- chore: 빌드 또는 개발 도구 관련 작업 (예: chore: Update dependencies)
- perf: 성능 개선 (예: perf: Improve query performance for large datasets)
- ci: CI 설정 수정 (예: ci: Update GitHub Actions configuration)
- revert: 이전 커밋 되돌리기 (예: revert: Revert "feat: Add payment processing module")

  ### Git-flow 전략에 따른 커밋 예시
  
- Feature 브랜치 작업:
 - feat: Implement user registration form
 - feat: Add password validation logic

-Bugfix 작업:
 - fix: Resolve issue with login redirection
 - fix: Correct API endpoint path

- Release 브랜치에서 버전 준비:
 - chore: Prepare version 1.2.0 release
 - docs: Update CHANGELOG for 1.2.0 release

- Hotfix 작업:
 - fix: Critical bug in production environment
 - revert: Revert faulty migration script

### 커밋 메시지 작성 시 Best Practices
- 작은 커밋: 커밋을 자주, 작은 단위로 나누어 기록합니다. 각 커밋은 독립적으로 이해될 수 있어야 합니다.
- 의미 있는 메시지: 커밋 메시지는 코드 변경 내용만이 아닌, 변경의 이유도 설명해야 합니다.
- 현재 시제 사용: 커밋 메시지는 현재 시제로 작성합니다. 예: "Added" 대신 "Add".
- 관련 이슈 참조: 관련된 이슈 번호를 명시하여 변경 사항과 이슈를 연결합니다.

### 규약 준수
모든 팀원은 이 규칙을 준수하여 일관된 Git 커밋 메시지를 작성해야 하며, 이를 통해 프로젝트 관리와 협업이 원활하게 진행될 수 있도록 노력합니다. 규칙을 준수하지 않을 경우, 코드 리뷰에서 지적되어 수정 요청을 받을 수 있습니다.

### 이 규약은 팀 프로젝트의 성공적인 진행을 위해 만들어졌으며, 모든 팀원은 이를 숙지하고 준수해야 합니다.
