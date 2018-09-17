export const getEntitiesList = (entities, extra = []) => entities
  .map(e => (
    e instanceof Object
      ? e.entity
      : e))
  .concat((extra && getEntitiesList(extra, null)) || [])
  .reduce((result, current) => (result.indexOf(current) === -1
    ? result.concat([current])
    : result), []);

export const LEVEL_NOTHING = 0;
export const LEVEL_READER = 1;
export const LEVEL_CONTRIBUTOR = 2;
export const LEVEL_ADMIN = 3;

export const VERBOSE_LANGUAGES = {
  en: 'English',
  de: 'German',
  es: 'Spanish',
  pt: 'Portuguese',
  fr: 'French',
  it: 'Italian',
  nl: 'Dutch',
  pt_br: 'Brazilian Portuguese',
  id: 'Indonesian',
  mn: 'Mongolian',
};

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

export const ROLES = {
  [ROLE_USER]: 'User',
  [ROLE_CONTRIBUTOR]: 'Contributor',
  [ROLE_ADMIN]: 'Admin',
};

const strTrueIndexOf = (a, b) => (a
  .toString()
  .toLowerCase()
  .indexOf(b.toLowerCase())
);

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
    .replace(/[,./\\;+=!?@#$%¨&*()[\]^"'~{}ç:<>|]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''),
};
