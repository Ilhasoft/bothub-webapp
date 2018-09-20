'use strict'
const packageDict = require('../package.json')

module.exports = {
  NODE_ENV: '"production"',
  API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
  SUPPORTED_LANGUAGES: JSON.stringify(process.env.SUPPORTED_LANGUAGES || 'en|pt'),
  MAILCHIMP_LOGIN: JSON.stringify(process.env.MAILCHIMP_LOGIN),
  MAILCHIMP_DATACENTER: JSON.stringify(process.env.MAILCHIMP_DATACENTER),
  MAILCHIMP_USER_ID: JSON.stringify(process.env.MAILCHIMP_USER_ID),
  MAILCHIMP_LIST_ID: JSON.stringify(process.env.MAILCHIMP_LIST_ID),
  VERSION: JSON.stringify(packageDict.version),
}
