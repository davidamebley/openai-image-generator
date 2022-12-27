FROM node:13-alpine

ENV MONGO_DB_USERNAME=davidamebley  \
    MONGO_DB_PWD=password

RUN mkdir -p /home/app

COPY ./app /home/app

CMD [ "node", "/home/app/index.js" ]