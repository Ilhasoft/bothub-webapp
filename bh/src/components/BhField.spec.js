import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhField from 'bh/components/BhField';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhField.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhField, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('pass errors', () => {
    beforeEach(() => {
      wrapper.setProps({
        errors: ['error 1'],
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('toggle help text tooltip', () => {
    beforeEach(() => {
      wrapper.vm.toggleHelpTextTooltip();
    });

    test('helpTextTooltipOpen is true', () => {
      expect(wrapper.vm.helpTextTooltipOpen).toBeTruthy();
    });
  });
});
