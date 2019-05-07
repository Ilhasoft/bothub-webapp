/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhBadge from './BhBadge';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhBadge.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhBadge, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('when size string is not blank', () => {
    beforeEach(() => {
      wrapper.setProps({
        size: 'small',
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('set color', () => {
    beforeEach(async () => {
      wrapper.setProps({
        color: 'primary',
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('is transparent', () => {
      beforeEach(async () => {
        wrapper.setProps({
          transparent: true,
        });
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('click in badge', () => {
    beforeEach(() => {
      wrapper.trigger('click');
    });

    test('emitted click event', () => {
      expect(wrapper.emitted('click')).toBeDefined();
    });
  });
});
