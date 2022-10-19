FROM node:14

# 커서위치는 아무데나 해도 상관없음
WORKDIR /api-gateway/
COPY ./package.json /api-gateway/
COPY ./yarn.lock /api-gateway/
RUN yarn install

COPY . /api-gateway/

CMD yarn start:dev

# 효율적