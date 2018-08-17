import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhIconButton from 'bh/components/BhIconButton';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhIconButton.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhIconButton, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('when primary is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        primary: true,
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when size props is not blank', () => {
    beforeEach(() => {
      wrapper.setProps({
        size: 'smal',
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when Size props is not blank and Primary props is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        size: 'smal',
        primary: true,
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
