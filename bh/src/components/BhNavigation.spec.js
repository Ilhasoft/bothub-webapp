import { shallowMount, createLocalVue } from '@vue/test-utils';
import { compileToFunctions } from 'vue-template-compiler';

import BH from 'bh';
import BhNavigation from 'bh/components/BhNavigation';


const localVue = createLocalVue();
localVue.use(BH);

const defaultSlotComponent = compileToFunctions('<div>default</div>');
const aSlotComponent = compileToFunctions('<div>a</div>');

describe('BhNavigation.vue', () => {
  describe('just default slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(BhNavigation, {
        localVue,
        slots: {
          default: defaultSlotComponent,
        },
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('default and a slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(BhNavigation, {
        localVue,
        slots: {
          default: defaultSlotComponent,
          a: aSlotComponent,
        },
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('active a', () => {
      beforeEach(() => {
        wrapper.setProps({ actived: 'a' });
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
