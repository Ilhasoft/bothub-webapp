/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import store from '@/store';
import NewExampleForm from '@/components/example/NewExampleForm';


const localVue = createLocalVue();
localVue.use(BH);

describe('NewExampleForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });
    wrapper = shallowMount(NewExampleForm, {
      localVue,
      propsData: {
        repository: {
          uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
          language: 'en',
        },
      },
      store,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('set text and intent, add entity', () => {
    const text = 'my name is douglas';
    const intent = 'greet';
    const entity = {
      start: 11,
      end: 18,
      entity: 'name',
    };
    beforeEach(() => {
      wrapper.vm.text = text;
      wrapper.vm.intent = intent;
      wrapper.vm.addNewEntity(entity);
    });

    test('check data', () => {
      const { data } = wrapper.vm;

      expect(data.text).toBe(text);
      expect(data.intent).toBe(intent);
      expect(data.entities[0]).toMatchObject(entity);
    });
  });
});
