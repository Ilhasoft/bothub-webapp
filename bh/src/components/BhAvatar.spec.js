/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhAvatar from './BhAvatar';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhAvatar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhAvatar, {
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

  describe('when props have a image', () => {
    beforeEach(() => {
      wrapper.setProps({
        imageLink: 'https://robohash.org/bothub.png',
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('click on avatar image', () => {
    beforeEach(() => {
      wrapper.setProps({
        imageLink: 'https://robohash.org/bothub.png',
      });
      wrapper.vm.$emit('click');
    });

    test('emitted click event', () => {
      expect(wrapper.emitted('click')).toBeDefined();
    });
  });
});
