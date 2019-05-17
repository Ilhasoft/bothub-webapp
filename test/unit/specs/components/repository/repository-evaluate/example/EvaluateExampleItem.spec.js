/* eslint-disable import/first */
jest.mock('@/api/request');

import VueMoment from 'vue-moment';
import Buefy from 'buefy';
import BH from 'bh';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EvaluateExampleItem from '@/components/repository/repository-evaluate/example/EvaluateExampleItem';


const localVue = createLocalVue();
localVue.use(VueMoment);
localVue.use(Buefy);
localVue.use(BH);
localVue.use(Vuex);

describe('ExampleItem.vue', () => {
  let wrapper;
  let state;
  let actions;
  let store;

  beforeEach(() => {
    state = {
      selectedRepository: {
        authorization: {
          can_contribute: true,
        },
        entities: [],
      },
    };

    actions = {
      deleteEvaluateExample: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        Repository: {
          state,
          actions,
        },
      },
    });

    wrapper = shallowMount(EvaluateExampleItem, {
      localVue,
      propsData: {
        id: 1,
        entities: [
          { start: 0, end: 0, entity: 'entity' },
        ],
        created_at: '2018-05-11T11:57:40.082934Z',
        language: 'en',
      },
      store,
    });
  });

  test('mounted', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('delete example', () => {
    beforeEach(async () => {
      const deletePromise = wrapper.vm.deleteThisExample();
      await localVue.nextTick();
      wrapper.vm.deleteDialog.confirm();
      await deletePromise;
    });

    test('emit deleted event', () => {
      expect(wrapper.emitted('deleted')).toBeDefined();
    });
  });
});
