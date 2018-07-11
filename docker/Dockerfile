FROM node:8-alpine

ENV WORKDIR /home/app
WORKDIR $WORKDIR
RUN apk update && apk upgrade && apk add nginx git
COPY . .
RUN npm install && npm run build && rm -rf src test

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh
EXPOSE 80
ENTRYPOINT $WORKDIR/entrypoint.sh