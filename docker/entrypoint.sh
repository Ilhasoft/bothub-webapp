#!/bin/sh
# git clone --branch $WEBAPP_BRANCH --depth 1 $WEBAPP_REPO /tmp/bothub-webapp/
# cd /home/webapp/ && npm install && npm run build

cd $WORKDIR

mkdir -p /run/nginx/
nginx -g "daemon off;"
