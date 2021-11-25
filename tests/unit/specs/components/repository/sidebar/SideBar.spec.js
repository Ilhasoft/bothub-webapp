import { shallowMount, createLocalVue } from '@vue/test-utils';
import SideBar from '@/components/repository/sidebar/SideBar';
import Vuex from 'vuex';
import Buefy from 'buefy';

let store;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

const currentRepository = {
  name: 'bothub',
  owner__nickname: 'weni',
  uuid: '123456'
}

describe('SideBar.vue', () => {
  store = new Vuex.Store({
    modules: {
      Repository: {
        getters: {
          versionEnabled: jest.fn(() => true),
          authenticated: jest.fn(() => true),
          getUpdateVersionsState: jest.fn(() => true),
          getCurrentRepository: jest.fn(() => currentRepository),
          getNameVersion: jest.fn(() => 'bothub'),
        },
      },
    },
  });
  let wrapper;
  const $router = {
    currentRoute: {
      name: 'repository-summary',
    },
  };
  beforeEach(() => {
    wrapper = shallowMount(SideBar, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
        $router
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
