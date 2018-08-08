import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhAutocomplete from 'bh/components/BhAutocomplete';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhAutocomplete.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhAutocomplete, {
      localVue,
      propsData: {
        data: [
          'a',
          'ab',
          'abcd',
          'b',
          'c',
        ],
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('focus on input', () => {
    beforeEach(async () => {
      const input = wrapper.find({ ref: 'input' });
      input.trigger('focus');
      await new Promise(resolve => (setTimeout(resolve, 200)));
    });

    test('autocomplete is open', () => {
      expect(wrapper.vm.autocompleteOpen).toBeTruthy();
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('press esc', () => {
      beforeEach(() => {
        const input = wrapper.find({ ref: 'input' });
        input.trigger('keyup.esc');
      });

      test('autocomplete is close', () => {
        expect(wrapper.vm.autocompleteOpen).toBeFalsy();
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('type "b" in input', () => {
    const value = 'b';

    beforeEach(() => {
      const input = wrapper.find({ ref: 'input' });
      input.element.value = value;
      input.trigger('input');
    });

    test(`val equal ${value}`, () => {
      expect(wrapper.vm.val).toBe(value);
    });

    test(`${value} in top of filteredData`, () => {
      expect(value).toBe(wrapper.vm.filteredData[0]);
    });

    describe('select first item', () => {
      beforeEach((() => {
        wrapper.vm.select(wrapper.vm.filteredData[0]);
      }));

      test('selected event emitted', () => {
        expect(wrapper.emitted('selected')).toBeDefined();
      });
    });
  });

  describe('enable forceSelectFirst', () => {
    beforeEach(() => {
      wrapper.setProps({
        forceSelectFirst: true,
      });
    });

    describe('type "abc" in input', () => {
      beforeEach(() => {
        const input = wrapper.find({ ref: 'input' });
        input.element.value = 'abc';
        input.trigger('input');
      });

      describe('blur on input', () => {
        beforeEach(() => {
          const input = wrapper.find({ ref: 'input' });
          input.trigger('blur');
        });

        test('selected event emitted', () => {
          expect(wrapper.emitted('selected')).toBeDefined();
        });

        test('selected event emitted with abcd value', () => {
          expect(wrapper.emitted('selected')[0][0]).toBe('abcd');
        });
      });
    });
  });
});
