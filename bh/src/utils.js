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
  ar: 'Arabic',
  bn: 'Bengali',
  hi: 'Hindi',
  ru: 'Russian',
  th: 'Thai',
  vi: 'Vietnamese',
  kh: 'Khmer',
  sw: 'Swahili',
  ca: 'Catalan',
  da: 'Danish',
  el: 'Greek',
  fa: 'Persian',
  fi: 'Finnish',
  ga: 'Irish',
  he: 'Hebrew',
  hr: 'Croatian',
  hu: 'Hungarian',
  ja: 'Japanese',
  nb: 'Norwegian',
  pl: 'Polish',
  ro: 'Romanian',
  si: 'Sinhala',
  sv: 'Swedish',
  te: 'Telugu',
  tr: 'Turkish',
  tt: 'Tatar',
  ur: 'Urdu',
  zh: 'Chinese',
};

export default {
  formatters: {
    trimStart,
    removeBreakLines,
    removeMultipleWhiteSpaces,
  },
  VERBOSE_LANGUAGES,
};
