/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhStepper from './BhStepper';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhStepper.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhStepper, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Set props to more steps', () => {
    beforeEach(() => {
      wrapper.setProps({
        steps: 4,
      });
    });

    test('renders correctly 4 steps', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Set current step', () => {
    beforeEach(() => {
      wrapper.setProps({
        steps: 4,
        currentStep: 2,
      });
    });

    test('Second step render correctlty with active class', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
