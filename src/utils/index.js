export const getEntitiesList = (entities, extra = []) => entities
  .map(e => (
    e instanceof String ?
      e :
      e.entity))
  .concat(extra)
  .reduce((result, current) => (result.indexOf(current) === -1 ?
    result.concat([current]) :
    result), []);

export const LEVEL_NOTHING = 0;
export const LEVEL_READER = 1;
export const LEVEL_ADMIN = 2;

export const LANGUAGES = {
  en: 'English',
  de: 'German',
  es: 'Spanish',
  pt: 'Portuguese',
  fr: 'French',
  it: 'Italian',
  nl: 'Dutch',
};
