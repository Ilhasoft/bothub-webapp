import { shallowMount, createLocalVue } from '@vue/test-utils';
import EvaluateResultExampleList from '@/components/repository/repository-evaluate/results/EvaluateResultExampleList';
import BH from 'bh';
import sinon from 'sinon';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(BH);
localVue.use(Vuex);

describe('EvaluateResultExampleList.vue', () => {
  let wrapper;
  let state;
  let store;
  let actions;
  let getters;
  beforeEach(() => {
    state = {
      selectedRepository: {
        uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
    };

    actions = {
      getAllResultsLog: jest.fn(),
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

    wrapper = shallowMount(EvaluateResultExampleList, {
      localVue,
      propsData: {
        id: 2,
      },
      store,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('updateList is called when mounted', () => {
    const updateListStub = sinon.stub();

    wrapper = shallowMount(EvaluateResultExampleList, {
      localVue,
      propsData: {
        id: 2,
      },
      store,
      methods: {
        updateList: updateListStub,
      },
    });

    expect(updateListStub.called).toBeTruthy();
  });
});
