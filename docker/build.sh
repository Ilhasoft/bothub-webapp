#!/bin/bash

cd ..
npm install && \
npm run build && \
cd - && \
docker-compose build && \
docker-compose push
