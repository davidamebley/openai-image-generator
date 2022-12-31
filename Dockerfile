FROM node:13-alpine

ENV MONGO_DB_USERNAME=davidamebley  \
    MONGO_DB_PWD=password

RUN mkdir -p /home/node-app

COPY ./app /home/node-app

CMD [ "node", "/home/app/index.js" ]