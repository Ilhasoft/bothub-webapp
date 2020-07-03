'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: JSON.stringify(process.env.API_BASE_URL || 'http://localhost:8000/'),
  BOTHUB_NLP_BASE_URL: JSON.stringify(process.env.BOTHUB_NLP_BASE_URL || 'http://localhost:2657/'),
  BOTHUB_WEBAPP_BASE_URL: JSON.stringify(process.env.BOTHUB_WEBAPP_BASE_URL || 'http://localhost:8080/'),
  VERSION_ENABLED: JSON.stringify(process.env.VERSION_ENABLED || true),
  BOTHUB_WEBAPP_USE_SENTRY: JSON.stringify(process.env.BOTHUB_WEBAPP_USE_SENTRY || false),
  BOTHUB_WEBAPP_SENTRY: JSON.stringify(process.env.BOTHUB_WEBAPP_SENTRY),
  BOTHUB_WEBAPP_USE_HOTJAR: JSON.stringify(process.env.BOTHUB_WEBAPP_USE_HOTJAR || false),
  BOTHUB_WEBAPP_HOTJAR_ID: JSON.stringify(process.env.BOTHUB_WEBAPP_HOTJAR_ID),
  BOTHUB_WEBAPP_LIGHTHOUSE_KEY: JSON.stringify(process.env.BOTHUB_WEBAPP_LIGHTHOUSE_KEY),
  BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID: JSON.stringify(process.env.BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID),
  BOTHUB_WEBAPP_PAYMENT_ENABLED: JSON.stringify(process.env.BBOTHUB_PAYMENT_ENABLED || true),
})
