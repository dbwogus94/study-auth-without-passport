# auth-without-passport

## feature
- Nestjs 공식 블로그의 [NestJS Authentication without Passport](https://trilon.io/blog/nestjs-authentication-without-passport#Building-the-Sign-Up) 글을 참고하여 Passport를 사용하지 않는 Auth API 구현

## 주요 라이브러리 
- package-manager: pnpm
- 프레임워크: Nestjs
- 암호화 라이브러리: argon2
- Jwt 라이브러리: @nestjs/jwt

## DB 
- 인메모리 사용

## 구현된 REST API
- POST /auth/signup
- POST /auth/login
- GET /auth/me

## Swagger 
- http://localhost:3000/docs