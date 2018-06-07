import Buefy from 'buefy';

import { shallow, createLocalVue } from '@vue/test-utils';
import SearchBar from '@/components/shared/SearchBar';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('SearchBar.vue', () => {
  let wrapper;
  const debounceTime = 500;
  beforeEach(() => {
    wrapper = shallow(SearchBar, {
      localVue,
      propsData: {
        debounceTime,
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('typing in input', () => {
    let input;
    const value = 'hi';
    beforeEach(async () => {
      input = wrapper.find({ ref: 'input' });
      input.element.value = value;
      input.trigger('input');
    });

    test('element value', () => {
      expect(input.element.value).toBe(value);
    });

    test('input not emitted', () => {
      const inputEmitted = wrapper.emitted('input');
      expect(inputEmitted).not.toBeDefined();
    });

    describe('wait debounce time', () => {
      beforeEach(async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, debounceTime + 200);
        });
      });

      test('input emitted with value', () => {
        const inputEmitted = wrapper.emitted('input');
        expect(inputEmitted).toBeDefined();
        expect(inputEmitted[0][0]).toBe(value);
      });
    });
  });
});
