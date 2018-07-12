export const getEntitiesList = (entities, extra = []) => entities
  .map(e => (
    e instanceof Object ?
      e.entity :
      e))
  .concat((extra && getEntitiesList(extra, null)) || [])
  .reduce((result, current) => (result.indexOf(current) === -1 ?
    result.concat([current]) :
    result), []);

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
};
export const LANGUAGES = process.env.SUPPORTED_LANGUAGES
  .split('|')
  .map(v => v.split(':')[0])
  .reduce((current, lang) => {
    Object.assign(current, { lang: VERBOSE_LANGUAGES[lang] || lang });
    return current;
  }, {});

export const ROLE_NOT_SETTED = 0;
export const ROLE_USER = 1;
export const ROLE_CONTRIBUTOR = 2;
export const ROLE_ADMIN = 3;

export const ROLES = {
  [ROLE_USER]: 'User',
  [ROLE_CONTRIBUTOR]: 'Contributor',
  [ROLE_ADMIN]: 'Admin',
};
