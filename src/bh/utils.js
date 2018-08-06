import CommentQuestion from 'bh/assets/icons/comment-question.svg';
import PlusCircle from 'bh/assets/icons/plus-circle.svg';
import CloseCircle from 'bh/assets/icons/close-circle.svg';
import Close from 'bh/assets/icons/close.svg';
import DotsHorizontal from 'bh/assets/icons/dots-horizontal.svg';
import MenuDown from 'bh/assets/icons/menu-down.svg';


export const icons = {
  'help-text': CommentQuestion,
  'plus-circle': PlusCircle,
  'close-circle': CloseCircle,
  close: Close,
  'dots-horizontal': DotsHorizontal,
  'menu-down': MenuDown,
};

export const formatters = {
  trimStart: () => v => (v.trimStart()),
  removeBreakLines: () => v => (v.replace('\n', '')),
  removeMultipleWhiteSpaces: () => v => (v.replace(/\s{2,}/g, ' ')),
};
