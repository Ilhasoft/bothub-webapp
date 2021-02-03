import { shallowMount, createLocalVue } from '@vue/test-utils';
import TrainResponse from '@/components/repository/training/TrainResponse';
import applyFilters from '@/utils/filters';


const localVue = createLocalVue();
applyFilters(localVue);

describe('TrainResponse.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TrainResponse, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        open: true,
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
    beforeEach(() => {
      wrapper.setProps({ open: true });
    });

    test('inital state should be true', () => {
      expect(wrapper.vm.open).toBeTruthy();
    });
  });
});
