# Bothub Webapp

[![Build Status](https://travis-ci.org/Ilhasoft/bothub-webapp.svg?branch=master)](https://travis-ci.org/Ilhasoft/bothub-webapp) [![Coverage Status](https://coveralls.io/repos/github/push-flow/bothub-webapp/badge.svg?branch=master)](https://coveralls.io/github/push-flow/bothub-webapp?branch=master)

## Environment Variables

You can set environment variables in your OS or write on .env file.

| Variable | Type | Default | Description |
|--|--|--|--|
| API_BASE_URL | ```string``` | In development mode is ```http://localhost:8000/api``` | [bothub-engine](https://github.com/Ilhasoft/bothub-engine) HTTP service API URL
| SUPPORTED_LANGUAGES | ```string``` | ```en\|pt``` | Check description and formatation in [bothub-engine SUPPORTED_LANGUAGES environment variable](https://github.com/Ilhasoft/bothub-engine#environment-variables)
| MAILCHIMP_LOGIN | ```string``` | Empty | Check MailChimp subscribe URL*
| MAILCHIMP_DATACENTER | ```string``` | Empty | Check MailChimp subscribe URL*
| MAILCHIMP_USER_ID | ```string``` | Empty | Check MailChimp subscribe URL*
| MAILCHIMP_LIST_ID | ```string``` | Empty | Check MailChimp subscribe URL*

\* MailChimp subscribe URL: ```https://[MAILCHIMP_LOGIN].[MAILCHIMP_DATACENTER].list-manage.com/subscribe/post?u=[MAILCHIMP_USER_ID]&id=[MAILCHIMP_LIST_ID]```

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn start

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# show lint warnings and errors
yarn run lint

# run all tests
yarn test
```
