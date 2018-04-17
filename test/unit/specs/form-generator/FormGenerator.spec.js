import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import FormGenerator from '@/components/form-generator/FormGenerator';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('FormGenerator.vue', () => {
  describe('valid schema', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        FormGenerator,
        {
          localVue,
          propsData: {
            schema: {
              name: {
                type: 'string',
                label: 'Name',
              },
              country: {
                type: 'string',
                label: 'Your Country',
              },
              field: {
                type: 'field',
              },
            },
          },
        },
      );
    });

    test('2 fields', () => {
      expect(wrapper.vm.fields.length)
        .toBe(2);
    });

    test('name in fields', () => {
      expect(wrapper.vm.fields.map(({ name }) => name))
        .toContain('name');
    });

    test('country in fields', () => {
      expect(wrapper.vm.fields.map(({ name }) => name))
        .toContain('name');
    });
  });

  describe('invalid schema', () => {
    test('null', () => {
      expect(() => {
        shallow(
          FormGenerator,
          {
            localVue,
            propsData: {
              schema: null,
            },
          });
      }).toThrow();
    });

    test('with null element', () => {
      expect(() => {
        shallow(
          FormGenerator,
          {
            localVue,
            propsData: {
              schema: {
                name: null,
              },
            },
          });
      }).toThrow();
    });
  });
});
