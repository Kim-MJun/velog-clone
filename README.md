# Velog Clone - 토이 프로젝트 test

## 📋 프로젝트 개요

- **설명**: Velog를 벤치마킹한 블로그 플랫폼 토이 프로젝트
- **기간**: 3주 (순수 개발)
- **인원**
  - 김민준 (프론트엔드, 5년차) - Node.js, DB 설계, API 개발
  - 김서우 (프론트엔드, 2년차) - React, Next.js 마크다운 에디터, UI/UX

---

## 🛠️ 기술 스택

### Frontend

- React 18 + Vite + TypeScript
- Zustand (클라이언트 상태) + TanStack Query (서버 상태)
- Tailwind CSS + shadcn
- ...

### Backend

- Node.js + TypeScript
- Express.js
- Supabase (PostgreSQL + Auth + Storage)
- @supabase/supabase-js (Supabase Client)
- ...

---

## 📁 프로젝트 구조

```
velog-clone/
├── frontend/          # React 프론트엔드
├── backend/           # Express 백엔드
├── README.md
```

---

## 🔄 Git 워크플로우 및 Merge 프로세스

### 브랜치 전략

- **`main`**: 배포 버전 관리 (프로덕션)
- **`develop`**: 개발 브랜치 (통합 개발)
- **`feature/*`**: 기능 개발 브랜치 (개인 작업)

### 작업 프로세스

#### 1. 저장소 클론

```bash
git clone https://github.com/your-username/velog-clone.git
cd velog-clone
```

#### 2. develop 브랜치로 이동

```bash
git checkout develop
git pull origin develop
```

#### 3. 작업용 브랜치 생성

```bash
# 브랜치 네이밍 규칙: feature/작업내용
git checkout -b feature/login-page
git checkout -b feature/post-api
```

**브랜치 네이밍 예시:**

- `feature/auth-ui` - 인증 UI 작업
- `feature/post-crud-api` - 게시글 CRUD API 작업
- `feature/markdown-editor` - 마크다운 에디터 통합
- `fix/login-bug` - 로그인 버그 수정

#### 4. 작업 및 커밋

```bash
# 작업 진행
git add .
git commit -m "feat: 로그인 페이지 UI 구현"
```

**커밋 메시지 규칙:**

- `feat:` - 새로운 기능
- `fix:` - 버그 수정
- `docs:` - 문서 수정
- `style:` - 코드 포맷팅
- `refactor:` - 코드 리팩토링
- `test:` - 테스트 코드
- `chore:` - 빌드, 설정 파일 수정

#### 5. 원격 저장소에 Push

```bash
git push origin feature/login-page
```

#### 6. Pull Request 생성

1. GitHub에서 본인 브랜치 → `develop` 브랜치로 PR 생성
2. PR 제목: `[Frontend] 로그인 페이지 UI 구현`
3. PR 설명:
   - 작업 내용
   - 변경 사항
   - 스크린샷 (UI 작업 시)
   - 체크리스트

**PR 템플릿 예시:**

```markdown
## 작업 내용

- 로그인/회원가입 페이지 UI 구현
- AuthForm 컴포넌트 생성

## 변경 사항

- `src/pages/AuthPage.tsx` 추가
- `src/components/AuthForm.tsx` 추가

## 체크리스트

- [ ] 코드 리뷰 완료
- [ ] 로컬 테스트 완료
- [ ] 충돌 해결 완료
```

#### 7. 코드 리뷰 및 병합

1. 코드 관리자가 PR 확인
2. 필요 시 수정 요청
3. 승인 후 `develop` 브랜치에 병합
4. 병합 후 작업 브랜치 삭제

#### 8. develop 최신 상태 유지

```bash
# 작업 전 항상 최신 상태로 업데이트
git checkout develop
git pull origin develop

# 새로운 작업 시작
git checkout -b feature/new-feature
```

### 배포 프로세스

```bash
# develop에서 충분히 테스트 완료 후
# main 브랜치로 병합 (배포)
git checkout main
git merge develop
git push origin main
```

---

## 🚀 개발 서버 실행 (추후 수정 예정)

### Frontend

```bash
cd frontend
pnpm run dev
# http://localhost:5173
```

### Backend

```bash
cd backend
pnpm run dev
# http://localhost:3000
```
