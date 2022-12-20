# PR 정리
---
## feature/1-auth-api
- Nestjs 공식 블로그의 [NestJS Authentication without Passport](https://trilon.io/blog/nestjs-authentication-without-passport#Building-the-Sign-Up) 글을 참고하여 Passport를 사용하지 않는 Auth API 구현

## 사용된 주요 라이브러리 
- package-manager: pnpm
- 암호화 라이브러리: argon2
- Jwt 라이브러리: @nestjs/jwt

### 구현된 REST API
- POST /auth/signup
- POST /auth/login
- GET /auth/me

### DB 
- 인메모리 사용

---
## feature/#2-change-nest-monorepo
- Nestjs에서 제공하는 모노레포로 프로젝트 전환

### nest cli 작업 순서
1. nest g app 1-auth-without-passport
2. nest g lib common
3. nest-cli.json 수정
   - sourceRoot, root, compilerOptions.tsConfigPath 값이 1-auth-without-passport의 경로를 바라보도록 수정
4. tsconfig.json ts 절대경로 설정
5. package.json js 절대경로 설정 및 scripts 설정
6. @app/1-auth-without-passport/common @lib/common으로 이관
