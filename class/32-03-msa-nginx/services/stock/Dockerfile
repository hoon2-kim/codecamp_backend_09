FROM node:14

# 커서위치는 아무데나 해도 상관없음
WORKDIR /stock-service/
COPY ./package.json /stock-service/
COPY ./yarn.lock /stokc-service/
RUN yarn install

COPY . /stock-service/

CMD yarn start:dev

# 효율적