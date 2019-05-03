/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import API from '@/utils/plugins/API';
import EvaluateExampleList from '@/components/repository/repository-evaluate/example/EvaluateExampleList';


const localVue = createLocalVue();
localVue.use(API);

describe('ExamplesList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EvaluateExampleList, {
      localVue,
      propsData: {
        repository: {
          uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        },
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('update list', () => {
    beforeEach(async () => {
      wrapper.vm.updateExamples();
      await wrapper.vm.examplesList.next();
    });

    test('have items', () => {
      expect(wrapper.vm.examplesList.items.length).toBeGreaterThan(0);
    });

    test('update list when query changes', () => {
      wrapper.setProps({ query: { language: 'pt' } });
      expect(wrapper.vm.examplesList.items.length).toBe(0);
    });

    test('update list when repository changes', () => {
      wrapper.setProps({ repository: { uuid: '8871fd26-a3bc-4f74-9af1-176abca5971d' } });
      expect(wrapper.vm.examplesList.items.length).toBe(0);
    });
  });
});
