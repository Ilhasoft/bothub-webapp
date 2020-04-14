/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import API from '@/utils/plugins/API';
import ExamplesList from '@/components/example/ExamplesList';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(API);
localVue.use(Vuex);

describe('ExamplesList.vue', () => {
  let wrapper;
  let state;
  let store;
  beforeEach(() => {
    state = {
      selectedRepository: {
        uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
    };

    store = new Vuex.Store({
      modules: {
        Repository: {
          state,
        },
      },
    });

    wrapper = shallowMount(ExamplesList, {
      localVue,
      store,
      actions: {
        searchExamples: ({
          repositoryUuid, version, query, limit = 20,
        }) => this.$api.example.search(repositoryUuid, version, query, limit),
      },
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
  //     wrapper.vm.updateExamples();
  //     await wrapper.vm.examplesList.updateItems(0);
  //   });

  //   test('have items', () => {
  //     expect(wrapper.vm.examplesList.items.length).toBeGreaterThan(0);
  //   });
  // });
});
