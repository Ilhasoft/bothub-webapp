'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: JSON.stringify(process.env.API_BASE_URL || 'http://localhost:8000/'),
  BOTHUB_NLP_BASE_URL: JSON.stringify(process.env.BOTHUB_NLP_BASE_URL || 'http://localhost:2657/'),
  BOTHUB_WEBAPP_BASE_URL: JSON.stringify(process.env.BOTHUB_WEBAPP_BASE_URL || 'http://localhost:8080/'),
  VERSION_ENABLED: JSON.stringify(process.env.VERSION_ENABLED || false),
})
