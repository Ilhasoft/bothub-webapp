import VueHighlightJS from 'vue-highlightjs';

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
import BhNavigation from './components/BhNavigation';
import BhModal from './components/BhModal';
import BhSelect from './components/BhSelect';
import BhHighlightedPre from './components/BhHighlightedPre';
import BhTooltipHover from './components/BhTooltipHover';
import BhTabs from './components/BhTabs';
import BhTabItem from './components/BhTabItem';
import BhStepper from './components/BhStepper';

import utils from './utils';


const components = {
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
  BhNavigation,
  BhModal,
  BhSelect,
  BhHighlightedPre,
  BhTooltipHover,
  BhTabs,
  BhTabItem,
  BhStepper,
};

export default {
  install: (Vue) => {
    Vue.use(VueHighlightJS);

    const $bhModal = new Vue({
      data() {
        return {
          modalList: [],
          initialHtmlOverflow: document.querySelector('html').style.overflow,
        };
      },
      computed: {
        hasModalOpen() {
          return this.modalList.length > 0;
        },
      },
      watch: {
        hasModalOpen(value) {
          document.querySelector('html').style.overflow = value
            ? 'hidden'
            : this.initialHtmlOverflow;
        },
      },
      methods: {
        vueComponentIndexOf(vueComponent) {
          return this.modalList.indexOf(vueComponent);
        },
        add(vueComponent) {
          if (this.vueComponentIndexOf(vueComponent) === -1) {
            this.modalList.push(vueComponent);
          }
        },
        rm(vueComponent) {
          const index = this.vueComponentIndexOf(vueComponent);
          if (index > -1) {
            this.modalList.splice(index, 1);
          }
        },
      },
    });

    /* eslint-disable no-param-reassign */
    Vue.prototype.$bhModal = $bhModal;
    /* eslint-enable */

    Object.keys(components).forEach((componentName) => {
      const component = components[componentName];
      Vue.component(component.name, component);
    });

    Vue.filter('languageVerbose', lang => utils.VERBOSE_LANGUAGES[lang]);
  },
  components,
  utils,
};
