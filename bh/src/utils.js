/* istanbul ignore next */
const trimStart = () => v => (v.trimStart());

/* istanbul ignore next */
const removeBreakLines = () => v => (v.replace('\n', ''));

/* istanbul ignore next */
const removeMultipleWhiteSpaces = () => v => (v.replace(/\s{2,}/g, ' '));

const VERBOSE_LANGUAGES = {
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

export default {
  formatters: {
    trimStart,
    removeBreakLines,
    removeMultipleWhiteSpaces,
  },
  VERBOSE_LANGUAGES,
};
