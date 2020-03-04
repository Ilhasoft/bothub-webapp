'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: JSON.stringify(process.env.API_BASE_URL || 'https://api.ilhasoft.dev/'),
  BOTHUB_NLP_BASE_URL: JSON.stringify(process.env.BOTHUB_NLP_BASE_URL || 'http://localhost:2657/'),
  BOTHUB_WEBAPP_BASE_URL: JSON.stringify(process.env.BOTHUB_WEBAPP_BASE_URL || 'http://localhost:8080/'),
})
