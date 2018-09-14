/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import ExamplesList from '@/components/example/ExamplesList';


const localVue = createLocalVue();

describe('ExamplesList.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });
    wrapper = shallowMount(ExamplesList, {
      localVue,
      propsData: {
        repository: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
      store,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('update list', () => {
    beforeEach(async () => {
      await wrapper.vm.updateExamples();
    });

    test('have items', () => {
      expect(wrapper.vm.examplesList.items.length).toBeGreaterThan(0);
    });
  });
});
