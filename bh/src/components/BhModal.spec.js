/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhModal from './BhModal';


describe('BhModal.vue', () => {
  let localVue;
  let wrapper;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(BH);
    wrapper = shallowMount(BhModal, {
      localVue,
      propsData: {
        open: true,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('close modal clicking in closeBtn', () => {
    beforeEach(() => {
      const closeBtn = wrapper.find({ ref: 'closeBtn' });
      closeBtn.trigger('click');
    });

    test('event update:open was emitted', () => {
      expect(wrapper.emitted('update:open')).toBeDefined();
    });

    test('event update:open was emitted with false value', () => {
      const value = wrapper.emitted('update:open')[0][0];
      expect(value).toBeFalsy();
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('close modal clicking in background', () => {
    beforeEach(() => {
      const background = wrapper.find({ ref: 'modal' });
      background.trigger('click');
    });

    test('event update:open was emitted', () => {
      expect(wrapper.emitted('update:open')).toBeDefined();
    });

    test('event update:open was emitted with false value', () => {
      const value = wrapper.emitted('update:open')[0][0];
      expect(value).toBeFalsy();
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('close modal pass false via open prop', () => {
    beforeEach(() => {
      wrapper.setProps({
        open: false,
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('open modal pass true via open prop', () => {
      beforeEach(() => {
        wrapper.setProps({
          open: true,
        });
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
