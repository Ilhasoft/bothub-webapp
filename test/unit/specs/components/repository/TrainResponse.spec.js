import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import TrainResponse from '@/components/repository/TrainResponse';
import applyFilters from '@/utils/filters';


const localVue = createLocalVue();
localVue.use(BH);
applyFilters(localVue);

describe('TrainResponse.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TrainResponse, {
      localVue,
      propsData: {
        open: true,
        readyForTrain: true,
        requirementsToTrain: {},
        languagesReadyForTrain: {
          en: true,
        },
        languagesWarnings: {},
        training: false,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('add requirements', () => {
    beforeEach(() => {
      wrapper.setProps({
        requirementsToTrain: {
          en: [
            'requirement 1',
          ],
        },
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('add warning', () => {
    beforeEach(() => {
      wrapper.setProps({
        languagesWarnings: {
          en: [
            'warning 1',
          ],
        },
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('close modal via prop', () => {
    beforeEach(() => {
      wrapper.setProps({ open: false });
    });

    test('event update:open was emitted', () => {
      expect(wrapper.emitted('update:open')).toBeDefined();
    });
  });

  describe('close modal openValue changed', () => {
    beforeEach(() => {
      wrapper.setData({ openValue: false });
    });

    test('event update:open was emitted', () => {
      expect(wrapper.emitted('update:open')).toBeDefined();
    });
  });
});
