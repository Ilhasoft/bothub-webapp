import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import BeginnerTutorial from '@/components/repository/BeginnerTutorial';

const localVue = createLocalVue();
localVue.use(BH);

describe('BeginnerTutorial.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BeginnerTutorial, {
      localVue,
      propsData: {
        open: true,
      },
      data: {
        steps: 4,
        currentValue: 1,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Current Tab equal 1', () => {
    expect(wrapper.vm.currentValue).toEqual(1);
  });

  test('Steps equal 4', () => {
    expect(wrapper.vm.steps).toEqual(4);
  });

  describe('Call next step function', () => {
    beforeEach(() => {
      wrapper.setData({
        currentValue: 2,
      });
      wrapper.vm.next();
    });

    test('Current tab change', () => {
      expect(wrapper.vm.currentValue).toEqual(3);
    });
  });

  describe('Call previous step function', () => {
    beforeEach(() => {
      wrapper.setData({
        currentValue: 2,
      });
      wrapper.vm.previous();
    });

    test('Current tab change to', () => {
      expect(wrapper.vm.currentValue).toEqual(1);
    });
  });
});
