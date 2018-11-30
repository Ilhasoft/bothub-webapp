/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhAvatar from './BhAvatar';


const localVue = createLocalVue();
localVue.use(BH);

const defaultSlotComponent = '<img src="https://robohash.org/bothub">';

describe('BhAvatar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhAvatar, {
      localVue,
      slots: {
        default: defaultSlotComponent,
      },
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

  describe('click on avatar', () => {
    beforeEach(() => {
      wrapper.vm.$emit('click');
    });

    test('emitted click event', () => {
      expect(wrapper.emitted('click')).toBeDefined();
    });
  });
});
