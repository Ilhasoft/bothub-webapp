import CommentQuestion from 'bh/assets/icons/comment-question.svg';
import PlusCircle from 'bh/assets/icons/plus-circle.svg';
import CloseCircle from 'bh/assets/icons/close-circle.svg';
import Close from 'bh/assets/icons/close.svg';
import DotsHorizontal from 'bh/assets/icons/dots-horizontal.svg';
import MenuDown from 'bh/assets/icons/menu-down.svg';
import Earth from 'bh/assets/icons/earth.svg';
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
  'flag-br': FlagBr,
  'flag-de': FlagDe,
  'flag-es': FlagEs,
  'flag-fr': FlagFr,
  'flag-it': FlagIt,
  'flag-nl': FlagNl,
  'flag-pt': FlagPt,
  'flag-us': FlagUs,
};

export const formatters = {
  trimStart: () => v => (v.trimStart()),
  removeBreakLines: () => v => (v.replace('\n', '')),
  removeMultipleWhiteSpaces: () => v => (v.replace(/\s{2,}/g, ' ')),
};
