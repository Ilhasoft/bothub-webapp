/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import API from '@/utils/plugins/API';
import EvaluateExampleList from '@/components/repository/repository-evaluate/example/EvaluateExampleList';


const localVue = createLocalVue();
localVue.use(API);
localVue.use(Vuex);

describe('ExamplesList.vue', () => {
  let wrapper;
  let state;
  let store;
  let actions;

  beforeEach(() => {
    state = {
      selectedRepository: {
        uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
    };

    actions = {
      searchEvaluateExamples: ({
        repositoryUUID, version, query, limit = 20,
      }) => wrapper.vm.$api.evaluateExample.search(repositoryUUID, version, query, limit),
    };

    store = new Vuex.Store({
      modules: {
        Repository: {
          state,
          actions,
        },
      },
    });

    wrapper = shallowMount(EvaluateExampleList, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // describe('update list', () => {
  //   beforeEach(async () => {
  //     await wrapper.vm.updateExamples();
  //     await wrapper.vm.examplesList.updateItems(0);
  //   });

  //   test('have items', () => {
  //     expect(wrapper.vm.examplesList.items.length).toBeGreaterThan(0);
  //   });

  //   test('update list when query changes', () => {
  //     wrapper.setProps({ query: { language: 'pt' } });
  //     expect(wrapper.vm.examplesList.items.length).toBe(0);
  //   });

  //   test('update list when repository changes', () => {
  //     state.selectedRepository = {
  //       id: '8871fd26-a3bc-4f74-9af1-176abca5971d',
  //     };
  //     expect(wrapper.vm.examplesList.items.length).toBe(0);
  //   });
  // });
});
