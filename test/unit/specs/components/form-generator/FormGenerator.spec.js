import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import FormGenerator from '@/components-v1/form-generator/FormGenerator';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('FormGenerator.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(
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
          },
        },
      },
    );
  });

  test('2 fields', () => {
    expect(wrapper.vm.fields).toHaveLength(2);
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
