import { shallowMount, createLocalVue } from '@vue/test-utils';
import RepositoryEvaluate from '@/views/repository/Evaluate';
import BH from 'bh';
import Vuex from 'vuex';


const localVue = createLocalVue();
localVue.use(BH);
localVue.use(Vuex);

describe('TestView.vue', () => {
  let wrapper;
  let state;
  let store;
  let actions;
  let getters;
  beforeEach(() => {
    state = {
      selectedRepository: {
        uuid: 'dbe1539c-88ba-43e0-bed5-54729218cec9',
      },
    };
    actions = {
      getEvaluateExample: jest.fn(),
    };
    getters = {
      authenticated: jest.fn(),
      getUpdateRepositoryState: jest.fn(),
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
    wrapper = shallowMount(RepositoryEvaluate, { localVue, store });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('run new test', () => {
    expect(wrapper.vm.newEvaluate()).toBeTruthy();
  });
});
