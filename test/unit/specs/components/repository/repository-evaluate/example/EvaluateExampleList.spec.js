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
  });
});
