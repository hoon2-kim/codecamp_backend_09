FROM node:14

# 커서위치는 아무데나 해도 상관없음
WORKDIR /myfolder/
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install

COPY . /myfolder/

CMD yarn start:dev

# 효율적