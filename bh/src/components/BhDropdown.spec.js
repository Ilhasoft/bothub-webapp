/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhDropdown from './BhDropdown';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhDropdown.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhDropdown, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Dropdown get focus when open data is true', () => {
    beforeEach(async () => {
      wrapper.setData({
        open: true,
      });
      await localVue.nextTick();
    });

    test('Watch when data: { open: true } get focus in dropdown', () => {
      expect(wrapper.find({ ref: 'dropdown' }).is(':focus')).toBeTruthy();
    });
  });

  describe('Dropdown dont get focus when open data is false', () => {
    beforeEach(async () => {
      wrapper.setData({
        open: false,
      });
      await localVue.nextTick();
    });

    test('Watch when data: { open: false } dont get focus in dropdown', () => {
      expect(wrapper.find({ ref: 'dropdown' }).is(':focus')).toBeFalsy();
    });
  });

  describe('Dropdown on click', () => {
    test('when click in dropdown set data: {open: false}', () => {
      wrapper.find({ ref: 'dropdown' }).trigger('click');
      expect(wrapper.vm.open).toBeFalsy();
    });
  });

  describe('Open dropdown', () => {
    test('when click in openDropdown set data: {open: true}', () => {
      wrapper.find({ ref: 'openDropdown' }).trigger('click');
      expect(wrapper.vm.open).toBeTruthy();
    });
  });

  describe('renders correctly', () => {
    beforeEach(async () => {
      wrapper.setProps({
        title: 'Select Item',
      });
    });

    test('when Dropdown have a title', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
