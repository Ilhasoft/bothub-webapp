import { shallowMount, createLocalVue } from '@vue/test-utils';
import EvaluateResultExampleItem from '@/components/repository/repository-evaluate/results/EvaluateResultExampleItem';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('EvaluateResultExampleItem.vue', () => {
  let wrapper;
  let state;
  let store;
  let actions;
  let getters;
  beforeEach(() => {
    state = {
      selectedRepository: {
        uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        intents_list: ['affirm', 'cuisine', 'greet'],
      },
    };

    store = new Vuex.Store({
      modules: {
        Repository: {
          state,
          getters,
          actions,
        },
      },
    });
    wrapper = shallowMount(EvaluateResultExampleItem, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
        $tc: () => 'some specific text',
      },
      propsData: {
        text: 'hey',
        intent: 'greet',
        entities: [
          {
            start: 3, end: 7, entity: 'kids', value: 'grassa', confidence: 0.8,
          },
        ],
        success: true,
        intentPrediction: {
          name: 'greet',
          confidence: 1.0,
        },
        intentSuccess: true,
      },
      store,
    });
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('derives the entitiesList computed from entities props', () => {
    expect(wrapper.vm.entitiesList).toEqual([
      { value: 'kids', class: 'entity-sunflower', label: 'unlabeled' },
    ]);
  });
});
