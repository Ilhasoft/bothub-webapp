/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import API from '@/utils/plugins/API';
import EvaluateExampleList from '@/components/repository/repository-evaluate/example/EvaluateExampleList';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(API);
localVue.use(Vuex);

describe('ExamplesList.vue', () => {
  let wrapper;
  let state;
  let store;
  let actions;
  let getters;

  beforeEach(() => {
    getters = {
      getCurrentRepository: () => ({}),
      getSelectedVersion: () => ({}),
    };
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
          getters,
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
});
