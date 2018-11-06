/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhTooltipHover from './BhTooltipHover';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhTooltipHover.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhTooltipHover, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mouse over in trigger elem', () => {
    let trigger;

    beforeEach(() => {
      trigger = wrapper.find({ ref: 'trigger' });
      trigger.trigger('mouseover');
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('open true', () => {
      expect(wrapper.vm.open).toBeTruthy();
    });

    describe('moouse out in trigger elem', () => {
      beforeEach(() => {
        trigger.trigger('mouseout');
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });

      test('open false', () => {
        expect(wrapper.vm.open).toBeFalsy();
      });
    });
  });
});
