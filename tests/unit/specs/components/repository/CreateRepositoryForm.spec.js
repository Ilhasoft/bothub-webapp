/* eslint-disable import/first */
jest.mock('@/api/request');
import Vuex from 'vuex';
import Buefy from 'buefy';
import VueRouter from 'vue-router'

import { shallowMount, createLocalVue } from '@vue/test-utils';
import CreateRepositoryForm from '@/components/repository/CreateRepository/CreateRepositoryForm';
import unnic from '@weni/unnnic-system';

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(VueRouter);


describe('CreateRepositoryForm', () => {
  let wrapper;
  let getters;
  let state;
  let store;
  beforeEach(() => {
    state = {
      Auth: {},
      Repository: {},
    };
    getters = {
      activeTutorial: jest.fn(() => ''),
    };
    store = new Vuex.Store({
      modules: {
        Tutorial: {
          getters,
          state,
        },
      },
    });

    wrapper = shallowMount(CreateRepositoryForm, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('valid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        name: 'Repository One',
        slug: 'repository1',
        language: 'en',
        description: '',
        is_private: true,
        use_language_model_featurizer: true,
        use_competing_intents: false,
      };
      wrapper.vm.data.categories = [1];
      wrapper.vm.current = 1;
    });

    describe('on submit', () => {
      beforeEach(() => {
        wrapper.vm.onSubmit()
      });

      test('no errors', () => {
        expect(wrapper.vm.errors).toMatchObject({});
      });
    });
  });
});
