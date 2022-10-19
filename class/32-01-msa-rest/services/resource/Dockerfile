FROM node:14

# 커서위치는 아무데나 해도 상관없음
WORKDIR /resource-service/
COPY ./package.json /resource-service/
COPY ./yarn.lock /resource-service/
RUN yarn install

COPY . /resource-service/

CMD yarn start:dev

# 효율적