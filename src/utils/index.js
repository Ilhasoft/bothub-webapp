import uuid from 'uuid';
import VERBOSE_LANGUAGES from './verbose_languages';

export function generateTemporaryId() {
  return uuid.v4();
}
export const getWordIndex = (word, phrase) => {
  const regex = new RegExp(`\\b${word.toLowerCase()}\\b`);
  const start = phrase.toLowerCase().search(regex);
  const end = start + word.length;
  return { start, end };
};

export const getEntitiesList = (entities = [], extra = []) => entities
  .concat(extra || [])
  .map(e => (e instanceof Object ? e.entity : e));

export const LEVEL_NOTHING = 0;
export const LEVEL_READER = 1;
export const LEVEL_CONTRIBUTOR = 2;
export const LEVEL_ADMIN = 3;

export const languageListToDict = list => (list.reduce((current, lang) => {
  Object.assign(current, { [lang]: VERBOSE_LANGUAGES[lang] || lang });
  return current;
}, {}));

export const LANGUAGES = languageListToDict(process.env.SUPPORTED_LANGUAGES
  .split('|')
  .map(v => v.split(':')[0]));

export const ROLE_NOT_SETTED = 0;
export const ROLE_USER = 1;
export const ROLE_CONTRIBUTOR = 2;
export const ROLE_ADMIN = 3;
export const ROLE_TRANSLATE = 4;

export const ROLES = {
  [ROLE_USER]: 'User',
  [ROLE_CONTRIBUTOR]: 'Contributor',
  [ROLE_ADMIN]: 'Admin',
  [ROLE_TRANSLATE]: 'Translator',
};

const strTrueIndexOf = (a, b) => (a
  .toString()
  .toLowerCase()
  .indexOf(b.toLowerCase())
);

export const formatDate = (text) => {
  const date = new Date(text);
  return date.toLocaleDateString('pt-BR');
};

export const filterAndOrderListByText = (list, text) => (
  text
    ? list
      .filter(item => strTrueIndexOf(item, text) >= 0)
      .sort((a, b) => strTrueIndexOf(a, text) - strTrueIndexOf(b, text))
    : list
);

export const formatters = {
  bothubItemKey: () => v => v
    .toLowerCase()
    .replace(/[\s]/g, '_')
    .replace(/[,./\\;+=!?@#$%¨&*()[\]^"'~{}ç:<>`´|]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''),

  versionItemKey: () => v => v
    .replace(/[,./\\;+=!?@#$%¨&*()[\]\-_^"'~{}ç:<>`´|]/g, '')
    .replace(/[\s]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''),

  sentenceItemKey: () => v => v
    .trimStart()
    .replace('\n', '')
    .replace(/\s{2,}/g, ' '),
};

const exampleSearchRegex = /((intent|label|entity|language):([a-zA-Z0-9_-]+))/g;

const extractGroupsFromRegex = (regularExpression, value) => {
  let match;
  const regexGroups = [];
  /* eslint-disable no-cond-assign */
  while (match = regularExpression.exec(value)) {
    regexGroups.push(match);
  }
  /* eslint-enable */
  return regexGroups;
};

/* Receive a string and mount a dicty from groups of a regular expression matchs */
export const exampleSearchToDicty = value => extractGroupsFromRegex(exampleSearchRegex, value)
  .reduce(
    (acc, { 2: key, 3: v }) => {
      Object.assign(acc, { [key]: v });
      return acc;
    },
    { search: value.toLowerCase().replace(exampleSearchRegex, '').trim() },
  );

/* Receive a Object and return a String with each Key and value from Object */
export const exampleSearchToString = value => Object.keys(value)
  .map(key => (key === 'search'
    ? value[key]
    : `${key}:${value[key]}`))
  .join(' ');

export const normalize = (min, max, value) => {
  if (min === max) return min === 0 ? 0 : 1;
  return (value - min) / (max - min);
};

export const updateAttrsValues = (drfModel, data) => {
  const attrs = drfModel.defaults();
  Object.keys(attrs).forEach((attrName) => {
    Object.keys(data).forEach((item) => {
      if (attrName === item) {
        attrs[attrName] = data[item];
      }
    });
  });
  return Object.assign(drfModel, attrs);
};
