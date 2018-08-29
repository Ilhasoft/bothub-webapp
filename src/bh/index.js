import BhText from './components/BhText';
import BhField from './components/BhField';
import BhIcon from './components/BhIcon';
import BhTooltip from './components/BhTooltip';
import BhButton from './components/BhButton';
import BhTextarea from './components/BhTextarea';
import BhIconButton from './components/BhIconButton';
import BhLoading from './components/BhLoading';
import BhBadge from './components/BhBadge';
import BhDropdown from './components/BhDropdown';
import BhDropdownItem from './components/BhDropdownItem';
import BhLanguageFlag from './components/BhLanguageFlag';
import BhAutocomplete from './components/BhAutocomplete';
import BhInput from './components/BhInput';
import BhAvatar from './components/BhAvatar';
import BhCard from './components/BhCard';


const components = [
  BhText,
  BhField,
  BhIcon,
  BhTooltip,
  BhButton,
  BhTextarea,
  BhIconButton,
  BhLoading,
  BhBadge,
  BhDropdown,
  BhDropdownItem,
  BhLanguageFlag,
  BhAutocomplete,
  BhInput,
  BhAvatar,
  BhCard,
];

export default {
  install: (Vue) => {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
  components,
};
