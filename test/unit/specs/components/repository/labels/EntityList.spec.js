import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import EntityList from '@/views/repository/EntityList';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('EntityList.vue', () => {
  let wrapper;
  let state;
  let store;
  let getters;
  let actions;
  beforeEach(() => {
    state = {
      selectedRepository: {
        uuid: 'dbe1539c-88ba-43e0-bed5-54729218cec9',
      },
    };
    actions = {
      authenticated: jest.fn(),
    };
    getters = {
      authenticated: jest.fn(),
      getSelectedVersion: jest.fn(),
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
    const entity = 'health';
    const $route = {
      params: { entity },
    };
    wrapper = mount(EntityList, {
      localVue,
      store,
      propsData: {
        repository: {
          authorization: {
            can_contribute: true,
          },
          other_label: ['health', 'food'],
        },
        authenticated: true,
      },
      mocks: {
        $t: () => 'some specific text',
        $route,
      },
    });
    wrapper.setData({
      examplesList: {
        total: 10,
      },
      entitiesEditable: false,
    });
    wrapper.setprops({
      repository: {
        authorization: {
          can_contribute: true,
        },
        other_label: {
          entities: ['health', 'food'],
        },
      },
      authenticated: true,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
