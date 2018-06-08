'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
  MAILCHIMP_LOGIN: JSON.stringify(process.env.MAILCHIMP_LOGIN),
  MAILCHIMP_DATACENTER: JSON.stringify(process.env.MAILCHIMP_DATACENTER),
  MAILCHIMP_USER_ID: JSON.stringify(process.env.MAILCHIMP_USER_ID),
  MAILCHIMP_LIST_ID: JSON.stringify(process.env.MAILCHIMP_LIST_ID),
}
