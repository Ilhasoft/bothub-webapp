import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import FormGenerator from '@/components/form-generator/FormGenerator';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('FormGenerator.vue', () => {
  describe('valid schema', () => {
    let wrapper;
    beforeAll(() => {
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
        });
    });

    it('2 fields', () => {
      expect(wrapper.vm.fields.length)
        .toBe(2);
    });

    it('name in fields', () => {
      expect(wrapper.vm.fields.map(({ name }) => name))
        .toContain('name');
    });

    it('country in fields', () => {
      expect(wrapper.vm.fields.map(({ name }) => name))
        .toContain('name');
    });
  });

  describe('invalid schema', () => {
    it('null', () => {
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

    it('with null element', () => {
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
