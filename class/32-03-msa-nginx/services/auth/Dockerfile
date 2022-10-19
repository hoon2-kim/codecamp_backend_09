FROM node:14

# 커서위치는 아무데나 해도 상관없음
WORKDIR /auth-service/
COPY ./package.json /auth-service/
COPY ./yarn.lock /auth-service/
RUN yarn install

COPY . /auth-service/

CMD yarn start:dev

# 효율적