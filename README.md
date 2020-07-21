<p align="center">
    <img src="https://user-images.githubusercontent.com/5360835/65427083-1af35900-de01-11e9-86ef-59f1eee79a68.png" width="240" height="60" alt="Bothub" />
</p>

<p>
BotHub is an open platform for predicting, training and sharing NLU (Natural Language Understanding) datasets in multiple languages in a cooperative way.

With BotHub, you can not only create NLP datasets, but you can also access, use and evolve datasets that were already built by other users in the community!

These collaboration methods + integration options makes it easier for the user to apply NLU concepts in different platforms and contexts.
</p>

<p align="center">
  <a href="https://travis-ci.org/github/bothub-it/bothub-webapp">
    <img alt="Build Status" src="https://img.shields.io/badge/build%20-passing-green)"></a>
<a href='https://coveralls.io/github/push-flow/bothub-webapp?branch=master'><img src='https://coveralls.io/repos/github/push-flow/bothub-webapp/badge.svg?branch=master' alt='Coverage Status' /></a>
  <a href="https://nodejs.org/en/download/releases/">
    <img alt="Node" src="https://img.shields.io/badge/node-%3E%3D6.9-blue"></a>
  <a href="https://github.com/bothub-it/bothub-webapp/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-AGLP%203.0-yellow"></a>
</p>

# Bothub Webapp


![bothub IMG](https://i.imgur.com/CJU75RB.png)

## What's here

This repo is the Front-end repo for all Bothub-related projects. It hosts the documentation and other misc. resources for Bothub. Code for other projects, like the [Engine](https://github.com/bothub-it/bothub-engine), [NLP Worker](https://github.com/bothub-it/bothub-nlp), [NLP API](https://github.com/bothub-it/bothub-nlp-api) and [NLP On Demand](https://github.com/bothub-it/bothub-nlp-on-demand), are hosted in other repositories.


##  Contents

- [Documentation](#documentation)
- [Get Started](#get-started)
- [Development Workflow](#development-workflow)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Documentation

All documentation available on [docs.bothub.it](https://docs.bothub.it/).

## Get Started

First, clone this repository
 >git clone `git@github.com:bothub-it/bothub-webapp.git`

## Development Workflow

To start running bothub use this commands

> Use ```yarn``` commands to ```install```, ```start```, ```build```, ```lint``` and ```test-watch```.

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
| API_BASE_URL | `string` | In development mode is `http://localhost:8000/api` | [bothub-engine](https://github.com/bothub-it/bothub-engine) HTTP service API URL
| BOTHUB_NLP_BASE_URL | `string` | In development mode is `http://localhost:2657/` | [bothub-nlp](https://github.com/bothub-it/bothub-nlp) Bothub NLP service URL
| BOTHUB_WEBAPP_BASE_URL | `string` | In development mode is `http://localhost:8080/` |[bothub-webapp](https://github.com/bothub-it/bothub-webapp)  Bothub Webapp service URL
| SUPPORTED_LANGUAGES | `string` | `en\|pt` | Check description and formatation in [Supported_Languages environment variable](https://github.com/bothub-it/bothub-engine#environment-variables)
| VERSION_ENABLED | `boolean` | In development mode is `false` | Should Bothub show version belong to each repository*
| MAILCHIMP_LOGIN | `string` | Empty | Check [MailChimp](https://mailchimp.com/) subscribe LOGIN URL*
| MAILCHIMP_DATACENTER | `string` | Empty | Check [MailChimp](https://mailchimp.com/)  subscribe DATACENTER URL*
| MAILCHIMP_USER_ID | `string` | Empty | Check [MailChimp](https://mailchimp.com/)  subscribe USER ID URL*
| MAILCHIMP_LIST_ID | `string` | Empty | Check [MailChimp](https://mailchimp.com/) subscribe LIST ID URL*
| BOTHUB_WEBAPP_USE_SENTRY | `boolean` | In development mode is `false`, in production mode is `true` | Enable [sentri.io](https://sentry.io/welcome/) tracking*
| BOTHUB_WEBAPP_SENTRY | `string` | Empty | Sentry.io DNS*
| BOTHUB_WEBAPP_USE_HOTJAR | `boolean` | In development mode is `false`, in production mode is `true` | Enable [Hotjar](https://www.hotjar.com/) tracking*
| BOTHUB_WEBAPP_HOTJAR_ID | `string` | Empty | [Hotjar](https://www.hotjar.com/) ID*
| BOTHUB_WEBAPP_LIGHTHOUSE_KEY | `string` | Empty | [Helpdocs Lighthouse widget](https://support.helpdocs.io/article/ykv7l5jthy-lighthouse-widget-api) API key*
| BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID | `string` | Empty | Helpdocs algorithm article id *


	MailChimp subscribe URL: `https://[MAILCHIMP_LOGIN].[MAILCHIMP_DATACENTER].list-manage.com/subscribe/post?u=[MAILCHIMP_USER_ID]&id=[MAILCHIMP_LIST_ID]`
	
## Contributing

### Guidelines

If you want to contribute with bothub's projects we made a guideline to help you. see here [contributing guidelines](https://github.com/bothub-it/bothub-webapp/blob/master/CONTRIBUTING.md)) for the appropriate contribution.

## License

- **[AGLP 3.0](https://github.com/bothub-it/bothub-webapp/blob/master/LICENSE)**
- Copyright 2020 ©  **<a href="https://github.com/bothub-iT">Bothub</a>**