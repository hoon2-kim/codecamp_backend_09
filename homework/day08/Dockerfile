FROM node:14

WORKDIR /myhomework/
COPY ./package.json /myhomework/
COPY ./yarn.lock /myhomework/
RUN yarn install

COPY . /myhomework/

CMD yarn start:dev