'use strict'
const packageDict = require('../package.json')

module.exports = {
  NODE_ENV: '"production"',
  API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
  BOTHUB_NLP_BASE_URL: JSON.stringify(process.env.BOTHUB_NLP_BASE_URL || 'https://nlp.bothub.it/'),
  BOTHUB_WEBAPP_BASE_URL: JSON.stringify(process.env.BOTHUB_WEBAPP_BASE_URL || 'https://bothub.it/'),
  SUPPORTED_LANGUAGES: JSON.stringify(process.env.SUPPORTED_LANGUAGES || 'en|pt_br'),
  MAILCHIMP_LOGIN: JSON.stringify(process.env.MAILCHIMP_LOGIN),
  MAILCHIMP_DATACENTER: JSON.stringify(process.env.MAILCHIMP_DATACENTER),
  MAILCHIMP_USER_ID: JSON.stringify(process.env.MAILCHIMP_USER_ID),
  MAILCHIMP_LIST_ID: JSON.stringify(process.env.MAILCHIMP_LIST_ID),
  VERSION: JSON.stringify(packageDict.version),
  VERSION_ENABLED: JSON.stringify(process.env.VERSION_ENABLED || false),
  BOTHUB_WEBAPP_USE_SENTRY: JSON.stringify(process.env.BOTHUB_WEBAPP_USE_SENTRY || true),
  BOTHUB_WEBAPP_SENTRY: JSON.stringify(process.env.BOTHUB_WEBAPP_SENTRY),
  BOTHUB_WEBAPP_USE_HOTJAR: JSON.stringify(process.env.BOTHUB_USE_HOTJAR || true),
  BOTHUB_WEBAPP_HOTJAR_ID: JSON.stringify(process.env.BOTHUB_HOTJAR_ID),
  BOTHUB_WEBAPP_LIGHTHOUSE_KEY: JSON.stringify(process.env.BOTHUB_WEBAPP_LIGHTHOUSE_KEY),
  BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID: JSON.stringify(process.env.BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID),
}
