import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhText from 'bh/components/BhText';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhText.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhText, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('with small size', () => {
    beforeEach(() => {
      wrapper.setProps({ size: 'small' });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('type abc', () => {
    beforeEach(() => {
      const input = wrapper.find({ ref: 'input' });
      input.element.value = 'abc';
      input.trigger('input');
    });

    test('val is abc', () => {
      expect(wrapper.vm.val).toBe('abc');
    });
  });

  describe('eat "a" formatter', () => {
    beforeEach(() => {
      wrapper.setProps({
        formatters: [
          value => value.replace('a', ''),
        ],
      });
    });

    describe('type abc', () => {
      beforeEach(() => {
        const input = wrapper.find({ ref: 'input' });
        input.element.value = 'abc';
        input.trigger('input');
      });

      test('val is bc', () => {
        expect(wrapper.vm.val).toBe('bc');
      });
    });
  });
});
