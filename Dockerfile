FROM node:16.14.2-alpine as builder

ENV NODE_ENV local

WORKDIR /app
COPY ./package.json /app
COPY ./pnpm-lock.yaml /app

RUN npm i -g pnpm@7.16.1
RUN npm i -g @nestjs/cli
RUN pnpm ci
COPY . .
RUN pnpm run start:1:build

# ### Executable Image
FROM node:16.14.2-alpine

WORKDIR /app
COPY --from=builder /app/dist/apps/#1-auth-without-passport /app/dist/apps/#1-auth-without-passport
COPY --from=builder /app/node_modules /app/node_modules

CMD ["node", "dist/apps/#1-auth-without-passport/main"]