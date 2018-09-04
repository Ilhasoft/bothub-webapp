import CommentQuestion from 'bh/assets/icons/comment-question.svg';
import PlusCircle from 'bh/assets/icons/plus-circle.svg';
import CloseCircle from 'bh/assets/icons/close-circle.svg';
import Close from 'bh/assets/icons/close.svg';
import DotsHorizontal from 'bh/assets/icons/dots-horizontal.svg';
import MenuDown from 'bh/assets/icons/menu-down.svg';
import Earth from 'bh/assets/icons/earth.svg';
import Equal from 'bh/assets/icons/equal.svg';
import Account from 'bh/assets/icons/account.svg';
import Botinho from 'bh/assets/icons/botinho.svg';
import DotsVertical from 'bh/assets/icons/dots-vertical.svg';
import Magnify from 'bh/assets/icons/magnify.svg';
import Home from 'bh/assets/icons/home.svg';
import FlagBr from 'bh/assets/icons/flag-br.svg';
import FlagDe from 'bh/assets/icons/flag-de.svg';
import FlagEs from 'bh/assets/icons/flag-es.svg';
import FlagFr from 'bh/assets/icons/flag-fr.svg';
import FlagIt from 'bh/assets/icons/flag-it.svg';
import FlagNl from 'bh/assets/icons/flag-nl.svg';
import FlagPt from 'bh/assets/icons/flag-pt.svg';
import FlagUs from 'bh/assets/icons/flag-us.svg';


export const icons = {
  'help-text': CommentQuestion,
  'plus-circle': PlusCircle,
  'close-circle': CloseCircle,
  close: Close,
  'dots-horizontal': DotsHorizontal,
  'menu-down': MenuDown,
  earth: Earth,
  equal: Equal,
  account: Account,
  botinho: Botinho,
  'dots-vertical': DotsVertical,
  magnify: Magnify,
  home: Home,
  'flag-br': FlagBr,
  'flag-de': FlagDe,
  'flag-es': FlagEs,
  'flag-fr': FlagFr,
  'flag-it': FlagIt,
  'flag-nl': FlagNl,
  'flag-pt': FlagPt,
  'flag-us': FlagUs,
};

/* istanbul ignore next */
const trimStart = () => v => (v.trimStart());

/* istanbul ignore next */
const removeBreakLines = () => v => (v.replace('\n', ''));

/* istanbul ignore next */
const removeMultipleWhiteSpaces = () => v => (v.replace(/\s{2,}/g, ' '));

export const formatters = {
  trimStart,
  removeBreakLines,
  removeMultipleWhiteSpaces,
};

/* turns String to Dicty */
export function turnsStringToDicty(value) {
  const regex = /((intent|label|entity):([a-zA-Z0-9_-]+))/g;
  const labelAndIntityAndEntityFilter = value.toLowerCase().match(regex);
  const textFilter = value.toLowerCase().replace(regex, '');
  const dicty = {};

  Object.assign(dicty, { text: `${textFilter.trim()}` });
  if (labelAndIntityAndEntityFilter) {
    labelAndIntityAndEntityFilter.forEach((filter) => {
      const splited = filter.trim().split(':');
      Object.assign(dicty, { [splited[0]]: splited[1] });
    });
  }
  return dicty;
}

/* turns Dicty to String */
export function stringMount(value) {
  let dictyToString = '';

  Object.keys(value).forEach((key) => {
    if (key === 'text') {
      const dictyValue = value[key];
      dictyToString += ` ${dictyValue} `;
    } else {
      const dictyValue = value[key];
      dictyToString += `${key}:${dictyValue} `;
    }
  });
  return dictyToString;
}
