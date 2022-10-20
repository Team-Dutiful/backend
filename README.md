# backend

## 서버 실행 방법

### 1. MySQL 설치

- username, password 기억할 것

### 2. .env 파일 만들기

- 프로젝트 폴더 최상위에 .env 파일 만들기

```jsx
// 2022/10/18일자 폴더 구조
-config
  L config.ts
-migrations
-models
  L index.ts
-seeders
-src
  L index.ts
-gitignore
-package.json
-README.md
-tsconfig.json
-yarn.lock
-.env // 같은 레벨에 .env 파일 생성
```

### 3. .env 파일 작성

```elm
DB_USERNAME=root (mysql username 작성)
DB_PASSWORD=123456789 (mysql password 작성)
DB_DBNAME=dutiful
DB_HOST=127.0.0.1
DB_PORT=8080(사용하고싶은포트번호작성)
```

### 4. db & table 생성

```bash
yarn db
```

### 5. 서버 실행

```bash
yarn dev
```

- 성공 문구

```bash
[server]: Server is running at [HOST 번호]:[PORT 번호]
connection success [DB 이름]
```
