/* eslint-disable no-self-assign */
/* eslint-disable max-len */
const packageDict = require('./package.json');

process.env.VUE_APP_VERSION = (packageDict.version);
process.env.VUE_APP_API_BASE_URL = (process.env.VUE_APP_API_BASE_URL || 'https://api-ai-development.weni.ai/');
process.env.VUE_APP_BOTHUB_NLP_BASE_URL = (process.env.VUE_APP_BOTHUB_NLP_BASE_URL || 'http://localhost:2657/');
process.env.VUE_APP_BOTHUB_WEBAPP_BASE_URL = (process.env.VUE_APP_BOTHUB_WEBAPP_BASE_URL || 'http://localhost:8080/');
process.env.VUE_APP_VERSION_ENABLED = (process.env.VUE_APP_VERSION_ENABLED || true);
process.env.VUE_APP_BOTHUB_WEBAPP_USE_SENTRY = (process.env.VUE_APP_BOTHUB_WEBAPP_USE_SENTRY || false);
process.env.VUE_APP_SUPPORTED_LANGUAGES = (process.env.VUE_APP_SUPPORTED_LANGUAGES || 'en|pt_br');
process.env.VUE_APP_BOTHUB_WEBAPP_USE_HOTJAR = (process.env.VUE_APP_BOTHUB_WEBAPP_USE_HOTJAR || false);
process.env.VUE_APP_BOTHUB_WEBAPP_LIGHTHOUSE_KEY = (process.env.VUE_APP_BOTHUB_WEBAPP_LIGHTHOUSE_KEY || '');
process.env.VUE_APP_BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID = (process.env.VUE_APP_BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID || '');
process.env.VUE_APP_BOTHUB_WEBAPP_PAYMENT_ENABLED = (process.env.VUE_APP_BOTHUB_WEBAPP_PAYMENT_ENABLED || false);
process.env.VUE_APP_BOTHUB_WEBAPP_TUTORIAL_ENABLED = (process.env.VUE_APP_BOTHUB_WEBAPP_TUTORIAL_ENABLED || false);
process.env.VUE_APP_BOTHUB_WEBAPP_HOTJAR_ID = (process.env.VUE_APP_BOTHUB_WEBAPP_HOTJAR_ID || '');
process.env.VUE_APP_MAILCHIMP_LOGIN = (process.env.VUE_APP_MAILCHIMP_LOGIN || '');
process.env.VUE_APP_BOTHUB_WEBAPP_SENTRY = (process.env.VUE_APP_BOTHUB_WEBAPP_SENTRY || '');
process.env.VUE_APP_MAILCHIMP_DATACENTER = (process.env.VUE_APP_MAILCHIMP_DATACENTER || '');
process.env.VUE_APP_MAILCHIMP_USER_ID = (process.env.VUE_APP_MAILCHIMP_USER_ID || '');
process.env.VUE_APP_MAILCHIMP_LIST_ID = (process.env.VUE_APP_MAILCHIMP_LIST_ID || '');
process.env.VUE_APP_RECAPTCHA_TOKEN = (process.env.VUE_APP_RECAPTCHA_TOKEN || '');
process.env.VUE_APP_HELPHERO_ID = (process.env.VUE_APP_HELPHERO_ID || '');
process.env.VUE_APP_HELPHERO_TOUR = (process.env.VUE_APP_HELPHERO_TOUR || '');
process.env.VUE_APP_QA_FLOW_CHANNEL = (process.env.VUE_APP_QA_FLOW_CHANNEL || '');
