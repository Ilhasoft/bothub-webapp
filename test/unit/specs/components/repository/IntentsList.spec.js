import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import IntentsList from '@/components/repository/IntentsList';


const localVue = createLocalVue();
localVue.use(Vuex);

describe('EntitiesList.vue', () => {
  let wrapper;
  let store;
  let getters;
  beforeEach(() => {
    const intent = 'health';
    getters = {
      getCurrentRepository: () => ({}),
    };
    store = new Vuex.Store({
      modules: {
        Repository: {
          getters,
        },
      },
    });
    wrapper = shallowMount(IntentsList, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
        $tc: () => 'some specific text',
        $route: {
          params: { intent },
        },
      },
      propsData: {
        IntentsList: {
          total: 10,
        },
        intentSelected: intent,
        totalSentences: 10,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('click on edit button', () => {
    beforeEach(() => {
      const editIntentEvent = wrapper.find({ ref: 'editIntentEvent' });
      editIntentEvent.trigger('click');
    });

    test('expanded should be truth', () => {
      expect(wrapper.vm.editSentences).toBeTruthy();
    });

    test('List of intents should be de defined', () => {
      expect(wrapper.vm.IntentsList).toBeDefined();
    });

    test('total of sentences should be greater than 0', () => {
      expect(wrapper.vm.IntentsList.total).toBeGreaterThan(0);
    });
  });
});
