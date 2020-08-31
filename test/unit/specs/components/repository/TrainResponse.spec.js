import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TrainResponse from '@/components/repository/TrainResponse';
import applyFilters from '@/utils/filters';


const localVue = createLocalVue();
applyFilters(localVue);
localVue.use(Vuex);

describe('TrainResponse.vue', () => {
  let wrapper;
  let store;
  let getters;
  beforeEach(() => {
    getters = {
      getTrainResponse: () => (true),
    };
    store = new Vuex.Store({
      modules: {
        Repository: {
          getters,
        },
      },
    });
    wrapper = shallowMount(TrainResponse, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('mount response modal', () => {
    expect(wrapper.vm).toBeDefined();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('check initial modal state', () => {
    let trainResponse;
    beforeEach(() => {
      trainResponse = getters.getTrainResponse();
    });

    test('inital state should be true', () => {
      expect(trainResponse).toBeTruthy();
    });
  });

  describe('on click to close modal', () => {
    let trainResponse;
    beforeEach(() => {
      const closeModal = wrapper.find({ ref: 'buttonToClose' });
      closeModal.trigger('click');
    });
    test('should be false when closed', () => {
      expect(trainResponse).toBeFalsy();
    });
  });
});
