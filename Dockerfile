FROM node:8-alpine

ENV WORKDIR /home/app
WORKDIR $WORKDIR

RUN apk update && apk add git yarn nginx

RUN adduser -D -g 'www' www

COPY package.json .
COPY yarn.lock .
COPY bh bh

RUN yarn install

COPY . .

COPY nginx.conf /etc/nginx/nginx.conf
RUN nginx -t

RUN mkdir -p ./dist/ && chown -R www:www ./dist/

RUN chmod +x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
