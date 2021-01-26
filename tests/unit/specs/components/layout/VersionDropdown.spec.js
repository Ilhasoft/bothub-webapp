import { shallowMount, createLocalVue } from '@vue/test-utils';
import Buefy from 'buefy';
import VersionDropdown from '@/layout/dashboard/VersionDropdown';
import Vuex from 'vuex';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

describe('VersionDropdown.vue', () => {
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
      updateVersions: false,
    };
    actions = {
      getFirstFiveVersions: jest.fn(),
      authenticated: jest.fn(),
      setUpdateVersionsState: jest.fn((value) => { state.updateVersions = value; }),
    };
    getters = {
      getCurrentRepository: jest.fn(),
      getUpdateRepositoryState: jest.fn(() => state.updateVersions),
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
    wrapper = shallowMount(VersionDropdown, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('updates correctly', () => {
    const getVersionsStub = sinon.stub();
    beforeEach(() => {
      wrapper = shallowMount(VersionDropdown, {
        localVue,
        store,
        mocks: {
          $t: () => 'some specific text',
        },
        methods: {
          getAllVersions: getVersionsStub,
        },
      });
    });

    test('update is called when mounted', () => {
      expect(getVersionsStub.called).toBeTruthy();
    });

    test('update is called when update', () => {
      wrapper.vm.setUpdateVersionsState(true);
      expect(getVersionsStub.calledImmediatelyAfter).toBeTruthy();
    });
  });
});
