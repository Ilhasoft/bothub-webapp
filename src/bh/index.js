import BhTextInput from './components/BhTextInput';
import BhField from './components/BhField';
import BhIcon from './components/BhIcon';
import BhTooltip from './components/BhTooltip';
import BhButton from './components/BhButton';
import BhTextareaInput from './components/BhTextareaInput';
import BhIconButton from './components/BhIconButton';


const components = [
  BhTextInput,
  BhField,
  BhIcon,
  BhTooltip,
  BhButton,
  BhTextareaInput,
  BhIconButton,
];

export default {
  install: (Vue) => {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
  components,
};
