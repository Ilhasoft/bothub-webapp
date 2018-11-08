/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhTabs from './BhTabs';
import BhTabItem from './BhTabItem';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhTab.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhTabs, {
      localVue,
      slots: {
        default: BhTabItem,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Slot comunication works correctly', () => {
    expect(wrapper.vm.tabItems.length).toBe(1);
  });

  describe('BhTab Transition false', () => {
    beforeEach(() => {
      wrapper.setData({
        tabContent: false,
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('BhTab Transition true', () => {
    beforeEach(() => {
      wrapper.setData({
        tabContent: true,
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
