# Velog Clone - Backend

## 📋 프로젝트 개요

### 프로젝트 설명

Velog를 벤치마킹한 개인 블로그 플랫폼의 백엔드 API 서버입니다. 마크다운 기반의 게시글 작성, 태그 시스템, 사용자 인증 등 핵심 블로그 기능을 제공합니다.

### 개발 목적

- **학습**: TypeScript, Supabase, Express.js를 활용한 풀스택 개발 경험
- **협업**: 프론트엔드 개발자와의 API 기반 협업 프로세스 학습
- **실무 경험**: 마이그레이션, RLS, JWT 인증 등 실무 패턴 습득

### 프로젝트 정보

- **개발 기간**: 3주 (순수 개발)
- **개발 인원**: 2명 (Frontend 1명, Backend 1명)
- **개발 방식**: Git Flow 기반 협업 (main, develop, feature/\*)
- **목표**: MVP 수준의 블로그 플랫폼 완성

---

## 🛠️ 기술 스택

### Core

- **Runtime**: Node.js 20 (LTS)
- **Language**: TypeScript 5.x
- **Framework**: Express.js 4.21.2

### Database & Auth

- **BaaS**: Supabase (PostgreSQL + Auth + Storage)
- **Client**: @supabase/supabase-js
- **Local Dev**: Supabase CLI + Docker

### Libraries

- **Validation**: Zod
- **Error Handling**: express-async-errors
- **Environment**: envalid + dotenv
- **API Docs**: Swagger (swagger-ui-express + swagger-jsdoc)

### Dev Tools

- **Package Manager**: pnpm
- **TypeScript Compiler**: tsx
- **File Watcher**: nodemon

---

## 📂 프로젝트 구조

```
backend/
├── supabase/
│   ├── config.toml              # Supabase 로컬 설정
│   ├── seed.sql                 # 시드 데이터 (테스트용 태그)
│   └── migrations/
│       └── XXXXX_initial_schema.sql  # DB 스키마 (users, posts, tags, drafts)
├── src/
│   ├── config/
│   │   ├── env.ts               # 환경변수 검증 (envalid)
│   │   ├── supabase.ts          # Supabase 클라이언트 설정
│   │   └── swagger.ts           # Swagger 설정
│   ├── routes/                  # API 라우트 (개발 예정)
│   ├── controllers/             # 비즈니스 로직 (개발 예정)
│   ├── middlewares/
│   │   ├── error.middleware.ts  # 전역 에러 핸들러
│   │   └── validate.middleware.ts  # Zod 유효성 검증
│   ├── types/
│   │   └── database.types.ts    # Supabase 자동 생성 타입
│   ├── utils/                   # 유틸리티 함수 (개발 예정)
│   └── index.ts                 # Express 서버 엔트리 포인트
├── .env                         # 환경변수 (git 제외)
├── .env.example                 # 환경변수 템플릿
├── .gitignore
├── nodemon.json                 # nodemon 설정 (ts 파일 감시)
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json                # TypeScript 설정
└── README.md
```

---

## 🗄️ 데이터베이스 스키마

### Tables

#### users

- `id` (UUID, PK)
- `username` (VARCHAR(50), UNIQUE)
- `email` (VARCHAR(100), UNIQUE)
- `bio` (TEXT, NULL)
- `created_at`, `updated_at`
- **RLS**: 모든 사용자 조회 가능, 본인만 수정 가능

#### posts

- `id` (UUID, PK)
- `user_id` (UUID, FK → users)
- `title` (VARCHAR(255))
- `content` (TEXT)
- `is_published` (BOOLEAN)
- `created_at`, `updated_at`
- **RLS**: 발행된 게시글만 조회 가능, 작성자만 CUD 가능

#### tags

- `id` (UUID, PK)
- `name` (VARCHAR(50), UNIQUE)
- `created_at`
- **RLS**: 모든 사용자 조회 가능, 인증된 사용자만 생성 가능

#### post_tags (Many-to-Many)

- `post_id` (FK → posts)
- `tag_id` (FK → tags)
- **Primary Key**: (post_id, tag_id)
- **RLS**: 게시글 작성자만 태그 추가/삭제 가능

#### drafts

- `id` (UUID, PK)
- `user_id` (UUID, FK → users)
- `title` (VARCHAR(255), NULL)
- `content` (TEXT, NULL)
- `created_at`, `updated_at`
- **RLS**: 작성자만 CRUD 가능

### 주요 기능

- **Auto-increment**: UUID 자동 생성
- **Timestamps**: created_at, updated_at 자동 관리
- **Indexes**: username, email, user_id, created_at
- **Triggers**: updated_at 자동 업데이트
- **Row Level Security**: 모든 테이블에 적용

---

## ⚙️ 환경 설정

### 사전 요구사항

- Node.js 20 이상
- pnpm (권장)
- Docker (Supabase CLI 로컬 개발용)
- Git

### 설치 및 실행

```bash
# 1. 의존성 설치
pnpm install

# 2. 환경변수 설정
cp .env.example .env
# .env 파일을 열어 실제 값 입력

# 3. Supabase 로컬 시작 (Docker 필요)
pnpm supabase:start
# 첫 실행 시 Docker 이미지 다운로드 (5-10분)
# 완료 후 API URL, Keys 등이 터미널에 표시됨

# 4. 개발 서버 실행
pnpm dev
```

### 환경변수 (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# Supabase (로컬 개발)
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...

# JWT
JWT_SECRET=super-secret-jwt-token-...
```

**⚠️ 주의:**

- `supabase start` 실행 후 표시되는 실제 키 값을 사용하세요
- `.env` 파일은 Git에 커밋하지 마세요

---

## 🔧 유용한 명령어

### 개발

```bash
# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 실행
pnpm start
```

### Supabase

```bash
# 로컬 Supabase 시작
pnpm supabase:start

# 로컬 Supabase 중지
pnpm supabase:stop

# Supabase 상태 확인
pnpm supabase:status

# DB 리셋 (마이그레이션 + 시드 재실행)
pnpm supabase:reset

# TypeScript 타입 재생성
pnpm type-gen

# 새 마이그레이션 생성
pnpm migrate:new migration_name
```

### 일상적인 개발 워크플로우

```bash
# 1. 아침에 개발 시작
pnpm supabase:start
pnpm dev

# 2. DB 스키마 변경 시
pnpm migrate:new add_new_feature
# supabase/migrations/XXXXX_add_new_feature.sql 파일 편집
pnpm supabase:reset
pnpm type-gen

# 3. 퇴근 시
pnpm supabase:stop
```

---

## 📚 API 문서

### 접속 정보

- **Swagger UI**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health
- **Supabase Studio**: http://localhost:54323

### 현재 구현된 엔드포인트

- `GET /health` - 서버 상태 확인

### 개발 예정 엔드포인트

- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/me` - 현재 사용자 정보
- `GET /api/posts` - 게시글 목록
- `GET /api/posts/:id` - 게시글 상세
- `POST /api/posts` - 게시글 작성
- `PUT /api/posts/:id` - 게시글 수정
- `DELETE /api/posts/:id` - 게시글 삭제
- `GET /api/users/:username` - 사용자 프로필
- `PUT /api/users/:username` - 프로필 수정
- `GET /api/tags` - 태그 목록
- (전체 API 명세는 `/docs/API.md` 참고)

---

## 🚀 보일러플레이트 현황

### ✅ 완료된 항목

- [x] Express + TypeScript 기본 설정
- [x] Supabase CLI 로컬 개발 환경 구축
- [x] 데이터베이스 스키마 설계 및 마이그레이션
- [x] Row Level Security (RLS) 정책 설정
- [x] TypeScript 타입 자동 생성
- [x] 환경변수 검증 (envalid)
- [x] Swagger 설정
- [x] 에러 핸들링 미들웨어
- [x] Zod 유효성 검증 미들웨어
- [x] 프로젝트 폴더 구조
- [x] nodemon + tsx 개발 환경
- [x] Git 설정 (.gitignore)

### 🔄 진행 중

- [ ] 인증 API 개발 (Week 1)
- [ ] 게시글 CRUD API (Week 1-2)
- [ ] 태그 시스템 API (Week 2)
- [ ] 사용자 프로필 API (Week 2)
- [ ] 임시저장 API (Week 2-3)

### 📋 개발 예정

- [ ] API 테스트 코드
- [ ] 로깅 시스템 (pino)
- [ ] Rate Limiting
- [ ] 배포 (Railway 또는 Vercel)

---

## 🤖 AI/LLM을 위한 프로젝트 컨텍스트

### 프로젝트 이해를 위한 핵심 정보

**이 프로젝트는:**

1. **Velog 클론** 블로그 플랫폼의 백엔드 API입니다.
2. **Express.js + TypeScript + Supabase**로 구현되었습니다.
3. **Supabase CLI 로컬 개발** 방식을 사용하여 마이그레이션 기반으로 DB를 관리합니다.
4. **3주 토이 프로젝트**로, 2명(프론트엔드 1명, 백엔드 1명)이 협업 중입니다.

**현재 상태:**

- ✅ 보일러플레이트 세팅 완료
- ✅ DB 스키마 설계 완료 (users, posts, tags, post_tags, drafts)
- ✅ RLS 정책 설정 완료
- ⏳ 실제 API 개발 시작 전 (Week 1 인증 API부터 시작 예정)

**기술적 특징:**

- Supabase Auth를 사용하여 JWT 기반 인증 (bcrypt, jsonwebtoken 직접 사용 안 함)
- 프론트엔드는 Supabase와 직접 통신 가능, 복잡한 로직만 Express API 경유
- 마이그레이션 파일로 DB 스키마 버전 관리
- Zod로 요청 유효성 검증
- Swagger로 API 문서 자동화

**개발 시 유의사항:**

1. 환경변수는 `src/config/env.ts`에서 envalid로 검증됨
2. Supabase 클라이언트는 `src/config/supabase.ts`에서 싱글톤으로 관리
3. 모든 async 에러는 express-async-errors로 자동 캐치됨
4. DB 스키마 변경 시 반드시 마이그레이션 파일 생성 후 `pnpm supabase:reset` 실행
5. 타입 변경 시 `pnpm type-gen`으로 TypeScript 타입 재생성 필수

**다음 개발 단계:**

1. `src/routes/auth.routes.ts` 생성
2. `src/controllers/auth.controller.ts` 생성
3. `src/middlewares/auth.middleware.ts` 생성 (JWT 검증)
4. Supabase Auth API 활용하여 회원가입/로그인 구현
5. Swagger JSDoc 주석 추가

**주요 파일 설명:**

- `src/index.ts`: Express 서버 엔트리 포인트
- `src/config/env.ts`: 환경변수 검증 및 타입 안전성 제공
- `src/config/supabase.ts`: Supabase 클라이언트 (service_role 키 사용)
- `src/config/swagger.ts`: Swagger UI 설정
- `src/middlewares/error.middleware.ts`: 전역 에러 핸들러 (Zod, AppError 처리)
- `src/middlewares/validate.middleware.ts`: Zod 스키마 기반 요청 검증
- `src/types/database.types.ts`: Supabase CLI로 자동 생성된 DB 타입
- `supabase/migrations/`: DB 스키마 마이그레이션 파일들
- `supabase/seed.sql`: 개발용 시드 데이터

**코딩 컨벤션:**

- 파일명: kebab-case (auth.controller.ts)
- 함수명: camelCase
- 타입명: PascalCase
- 상수: UPPER_SNAKE_CASE
- Git 커밋: Conventional Commits (feat:, fix:, docs:, etc.)
- 브랜치: feature/기능명, fix/버그명

**필수 라이브러리 버전:**

- express: 4.21.2 (express-async-errors 호환성)
- TypeScript: 5.x
- Node.js: 20 (LTS)

---

## 🔐 보안

### 인증 방식

- Supabase Auth (JWT 기반)
- Row Level Security (RLS)로 데이터 접근 제어

### 환경변수 관리

- `.env` 파일은 절대 커밋하지 않음
- `SUPABASE_SERVICE_KEY`는 백엔드에서만 사용
- `SUPABASE_ANON_KEY`는 프론트엔드와 공유 가능

### RLS 정책

- 모든 테이블에 RLS 활성화
- 사용자는 본인 데이터만 수정/삭제 가능
- 발행된 게시글은 누구나 조회 가능

---

## 📖 참고 문서

- [기능 명세서](../docs/FEATURES.md)
- [API 명세서](../docs/API.md)
- [주차별 작업 계획](../docs/SCHEDULE.md)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Express 공식 문서](https://expressjs.com/)

---

## 👥 팀원

- Backend: [이름]
- Frontend: [이름]

---

## 📝 라이선스

MIT License
