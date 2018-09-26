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
import FlagVariant from 'bh/assets/icons/flag-variant.svg';
import Home from 'bh/assets/icons/home.svg';
import ChevronRight from 'bh/assets/icons/chevron-right.svg';
import FlagBr from 'bh/assets/icons/flag-br.svg';
import FlagDe from 'bh/assets/icons/flag-de.svg';
import FlagEs from 'bh/assets/icons/flag-es.svg';
import FlagFr from 'bh/assets/icons/flag-fr.svg';
import FlagIt from 'bh/assets/icons/flag-it.svg';
import FlagNl from 'bh/assets/icons/flag-nl.svg';
import FlagPt from 'bh/assets/icons/flag-pt.svg';
import FlagUs from 'bh/assets/icons/flag-us.svg';
import FlagId from 'bh/assets/icons/flag-id.svg';
import FlagMn from 'bh/assets/icons/flag-mn.svg';


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
  'flag-variant': FlagVariant,
  home: Home,
  'chevron-right': ChevronRight,
  'flag-br': FlagBr,
  'flag-de': FlagDe,
  'flag-es': FlagEs,
  'flag-fr': FlagFr,
  'flag-it': FlagIt,
  'flag-nl': FlagNl,
  'flag-pt': FlagPt,
  'flag-us': FlagUs,
  'flag-id': FlagId,
  'flag-mn': FlagMn,
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
