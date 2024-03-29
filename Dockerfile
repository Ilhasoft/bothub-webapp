FROM node:12-alpine as builder

ENV WORKDIR /home/app
WORKDIR $WORKDIR

RUN apk update && apk add git yarn

COPY package.json .
COPY yarn.lock .

RUN yarn install --network-timeout 1000000

COPY . .

ARG VUE_APP_API_BASE_URL
ARG VUE_APP_BOTHUB_NLP_BASE_URL
ARG VUE_APP_BOTHUB_WEBAPP_BASE_URL
ARG VUE_APP_SUPPORTED_LANGUAGES
ARG VUE_APP_MAILCHIMP_LOGIN
ARG VUE_APP_MAILCHIMP_DATACENTER
ARG VUE_APP_MAILCHIMP_USER_ID
ARG VUE_APP_MAILCHIMP_LIST_ID
ARG VUE_APP_VERSION_ENABLED
ARG VUE_APP_BOTHUB_WEBAPP_USE_SENTRY
ARG VUE_APP_BOTHUB_WEBAPP_SENTRY
ARG VUE_APP_BOTHUB_WEBAPP_USE_HOTJAR
ARG VUE_APP_BOTHUB_WEBAPP_HOTJAR_ID
ARG VUE_APP_BOTHUB_WEBAPP_LIGHTHOUSE_KEY
ARG VUE_APP_BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID
ARG VUE_APP_BOTHUB_WEBAPP_PAYMENT_ENABLED
ARG VUE_APP_BOTHUB_WEBAPP_TUTORIAL_ENABLED
ARG VUE_APP_RECAPTCHA_TOKEN
ARG VUE_APP_ALLOW_INTERACTIONS_ID

ENV VUE_APP_API_BASE_URL "${VUE_APP_API_BASE_URL}"
ENV VUE_APP_BOTHUB_NLP_BASE_URL "${VUE_APP_BOTHUB_NLP_BASE_URL}"
ENV VUE_APP_BOTHUB_WEBAPP_BASE_URL "${VUE_APP_BOTHUB_WEBAPP_BASE_URL}"
ENV VUE_APP_SUPPORTED_LANGUAGES "${VUE_APP_SUPPORTED_LANGUAGES}"
ENV VUE_APP_MAILCHIMP_LOGIN "${VUE_APP_MAILCHIMP_LOGIN}"
ENV VUE_APP_MAILCHIMP_DATACENTER "${VUE_APP_MAILCHIMP_DATACENTER}"
ENV VUE_APP_MAILCHIMP_USER_ID "${VUE_APP_MAILCHIMP_USER_ID}"
ENV VUE_APP_MAILCHIMP_LIST_ID "${VUE_APP_MAILCHIMP_LIST_ID}"
ENV VUE_APP_VERSION_ENABLED "${VUE_APP_VERSION_ENABLED}"
ENV VUE_APP_BOTHUB_WEBAPP_USE_SENTRY "${VUE_APP_BOTHUB_WEBAPP_USE_SENTRY}"
ENV VUE_APP_BOTHUB_WEBAPP_SENTRY "${VUE_APP_BOTHUB_WEBAPP_SENTRY}"
ENV VUE_APP_BOTHUB_WEBAPP_USE_HOTJAR "${VUE_APP_BOTHUB_WEBAPP_USE_HOTJAR}"
ENV VUE_APP_BOTHUB_WEBAPP_HOTJAR_ID "${VUE_APP_BOTHUB_WEBAPP_HOTJAR_ID}"
ENV VUE_APP_BOTHUB_WEBAPP_LIGHTHOUSE_KEY "${VUE_APP_BOTHUB_WEBAPP_LIGHTHOUSE_KEY}"
ENV VUE_APP_BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID "${VUE_APP_BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID}"
ENV VUE_APP_BOTHUB_WEBAPP_PAYMENT_ENABLED "${VUE_APP_BOTHUB_WEBAPP_PAYMENT_ENABLED}"
ENV VUE_APP_BOTHUB_WEBAPP_TUTORIAL_ENABLED "${VUE_APP_BOTHUB_WEBAPP_TUTORIAL_ENABLED}"
ENV VUE_APP_RECAPTCHA_TOKEN "${VUE_APP_RECAPTCHA_TOKEN}"
ENV VUE_APP_ALLOW_INTERACTIONS_ID "${VUE_APP_ALLOW_INTERACTIONS_ID}"

RUN yarn build

FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /home/app/dist /usr/share/nginx/html/bothub-webapp

