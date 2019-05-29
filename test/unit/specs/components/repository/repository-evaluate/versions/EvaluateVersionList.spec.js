import { shallowMount, createLocalVue } from '@vue/test-utils';
import EvaluateVersionList from '@/components/repository/repository-evaluate/versions/EvaluateVersionList';
import BH from 'bh';
import sinon from 'sinon';
import Vuex from 'vuex';


const localVue = createLocalVue();
localVue.use(BH);
localVue.use(Vuex);

describe('EvaluateVersionList.vue', () => {
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
      getAllVersions: jest.fn(),
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
    wrapper = shallowMount(EvaluateVersionList, {
      localVue,
      store,
    });
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('updateVersionList is called when mounted', () => {
    const updateVersionListStub = sinon.stub();

    wrapper = shallowMount(EvaluateVersionList, {
      localVue,
      store,
      methods: {
        updateVersionList: updateVersionListStub,
      },
    });

    expect(updateVersionListStub.called).toBeTruthy();
  });
});
