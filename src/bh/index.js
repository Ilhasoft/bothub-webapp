import BhTextInput from './components/BhTextInput';
import BhField from './components/BhField';
import BhIcon from './components/BhIcon';
import BhTooltip from './components/BhTooltip';
import BhButton from './components/BhButton';
import BhTextareaInput from './components/BhTextareaInput';
import BhIconButton from './components/BhIconButton';
import BhLoading from './components/BhLoading';
import BhBadge from './components/BhBadge';
import BhDropdown from './components/BhDropdown';
import BhDropdownItem from './components/BhDropdownItem';
import BhLanguageFlag from './components/BhLanguageFlag';


const components = [
  BhTextInput,
  BhField,
  BhIcon,
  BhTooltip,
  BhButton,
  BhTextareaInput,
  BhIconButton,
  BhLoading,
  BhBadge,
  BhDropdown,
  BhDropdownItem,
  BhLanguageFlag,
];

export default {
  install: (Vue) => {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
  components,
};
