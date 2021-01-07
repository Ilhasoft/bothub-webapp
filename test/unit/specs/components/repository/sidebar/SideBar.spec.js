import { shallowMount, createLocalVue } from '@vue/test-utils';
import Buefy from 'buefy';
import SideBar from '@/components/repository/sidebar/SideBar';
import Vuex from 'vuex';

let store;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);
describe('SideBar.vue', () => {
  store = new Vuex.Store({
    modules: {
      Repository: {
        getters: {
          versionEnabled: jest.fn(() => true),
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
        $router,
      },
      propsData: {
        currentRoute: {
          name: 'repository-summary',
        },
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('click on collapse button', () => {
    beforeEach(() => {
      const collapseButton = wrapper.find({ ref: 'collapseButton' });
      collapseButton.trigger('click');
    });
    test('collapse should be false', () => {
      expect(wrapper.vm.collapse).toBeFalsy();
    });
  });
});
