import BhTextInput from './components/BhTextInput';
import BhField from './components/BhField';
import BhIcon from './components/BhIcon';
import BhTooltip from './components/BhTooltip';
import BhButton from './components/BhButton';


const components = [
  BhTextInput,
  BhField,
  BhIcon,
  BhTooltip,
  BhButton,
];

export default {
  install: (Vue) => {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
  components,
};
