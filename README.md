# Bothub Webapp

[![Build Status](https://travis-ci.org/Ilhasoft/bothub-webapp.svg?branch=master)](https://travis-ci.org/Ilhasoft/bothub-webapp) [![Coverage Status](https://coveralls.io/repos/github/push-flow/bothub-webapp/badge.svg?branch=master)](https://coveralls.io/github/push-flow/bothub-webapp?branch=master) [![node>=6.9](https://img.shields.io/badge/node-%3E%3D6.9-blue.svg)](https://nodejs.org/en/download/releases/) [![License AGPL-3.0](https://img.shields.io/badge/license-%20AGPL--3.0-yellow.svg)](https://github.com/Ilhasoft/bothub-webapp/blob/master/LICENSE)

## Development

Use ```yarn``` commands to ```install```, ```start```, ```build```, ```lint``` and ```test-watch```.

| Command | Description |
|--|--|
| yarn install | Install dependencies
| yarn start | serve with hot reload at localhost:8080
| yarn build | Build for production with minification
| yarn build --report | Build for production and view the bundle analyzer report
| yarn lint | Show lint warnings and errors
| yarn test | Run all tests
| yarn test-watch | Run test in watch mode

### Environment Variables

You can set environment variables in your OS or write on .env file.

| Variable | Type | Default | Description |
|--|--|--|--|
| API_BASE_URL | `string` | In development mode is `http://localhost:8000/api` | [bothub-engine](https://github.com/Ilhasoft/bothub-engine) HTTP service API URL
| BOTHUB_NLP_BASE_URL | `string` | In development mode is `http://localhost:2657/` | Bothub NLP service URL
| BOTHUB_WEBAPP_BASE_URL | `string` | In development mode is `http://localhost:8080/` | Bothub WEBAPP service URL
| SUPPORTED_LANGUAGES | `string` | `en\|pt` | Check description and formatation in [bothub-engine SUPPORTED_LANGUAGES environment variable](https://github.com/Ilhasoft/bothub-engine#environment-variables)
| MAILCHIMP_LOGIN | `string` | Empty | Check MailChimp subscribe URL*
| MAILCHIMP_DATACENTER | `string` | Empty | Check MailChimp subscribe URL*
| MAILCHIMP_USER_ID | `string` | Empty | Check MailChimp subscribe URL*
| MAILCHIMP_LIST_ID | `string` | Empty | Check MailChimp subscribe URL*

\* MailChimp subscribe URL: `https://[MAILCHIMP_LOGIN].[MAILCHIMP_DATACENTER].list-manage.com/subscribe/post?u=[MAILCHIMP_USER_ID]&id=[MAILCHIMP_LIST_ID]`
