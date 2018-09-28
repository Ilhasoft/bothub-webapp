import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '../index';
import BhAutocomplete from './BhAutocomplete';


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

      describe('select empty (null) item', () => {
        beforeEach((() => {
          wrapper.vm.select(null);
        }));

        test('selected event emit null value', () => {
          const eventValues = wrapper.emitted('selected');
          const eventValue = eventValues[eventValues.length - 1][0];
          expect(eventValue).toBeNull();
        });
      });
    });
  });

  describe('type "z" in input', () => {
    const value = 'z';

    beforeEach(() => {
      const input = wrapper.find({ ref: 'input' });
      input.element.value = value;
      input.trigger('input');
    });

    test(`val equal ${value}`, () => {
      expect(wrapper.vm.val).toBe(value);
    });

    test('autocomplete is closed', () => {
      expect(wrapper.vm.autocompleteOpen).toBeFalsy();
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

        test('selected event emitted with "abcd" value', () => {
          expect(wrapper.emitted('selected')[0][0]).toBe('abcd');
        });
      });
    });

    describe('type "z" in input', () => {
      beforeEach(() => {
        const input = wrapper.find({ ref: 'input' });
        input.element.value = 'z';
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

        test('selected event emitted with "z" value', () => {
          expect(wrapper.emitted('selected')[0][0]).toBe('a');
        });

        describe('blank input finish', () => {
          beforeEach(() => {
            const input = wrapper.find({ ref: 'input' });
            input.element.value = '';
            input.trigger('input');
          });

          describe('blur on input', () => {
            beforeEach(() => {
              const input = wrapper.find({ ref: 'input' });
              input.trigger('blur');
            });

            test('selected event emitted', () => {
              expect(wrapper.emitted('selected')[1][0]).toBeNull();
            });
          });
        });
      });
    });
  });

  describe('using verboseField and indexField', () => {
    beforeEach(() => {
      wrapper.setProps({
        verboseField: 'label',
        indexField: 'id',
        data: [
          { id: 1, label: 'a' },
          { id: 2, label: 'b' },
        ],
      });
    });

    describe('type "b" in input', () => {
      const value = { id: 2, label: 'b' };
      const query = 'b';

      beforeEach(() => {
        const input = wrapper.find({ ref: 'input' });
        input.element.value = query;
        input.trigger('input');
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });

      test(`val equal ${query}`, () => {
        expect(wrapper.vm.val).toBe(query);
      });

      test(`${value} in top of filteredData`, () => {
        expect(value).toMatchObject(wrapper.vm.filteredData[0]);
      });

      describe('select first item', () => {
        beforeEach((() => {
          wrapper.vm.select(wrapper.vm.filteredData[0]);
        }));

        test('selected event emitted', () => {
          expect(wrapper.emitted('selected')).toBeDefined();
        });

        test('selected event emitted value\'s id', () => {
          expect(wrapper.emitted('selected')[0][0]).toBe(2);
        });
      });
    });
  });
});
