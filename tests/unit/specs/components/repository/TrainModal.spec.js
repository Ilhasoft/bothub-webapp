import { shallowMount, createLocalVue } from '@vue/test-utils';

import TrainModal from '@/components/repository/training/TrainModal';
import applyFilters from '@/utils/filters';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);

applyFilters(localVue);

describe('TrainModal.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TrainModal, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        open: true,
        readyForTrain: true,
        requirementsToTrain: {},
        languageAvailableToTrain: 1,
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

  describe('on click to close train status modal', () => {
    beforeEach(() => {
      wrapper.setProps({ open: false });
    });

    test('when close modal prop open should be false', () => {
      expect(wrapper.vm.open).toBeFalsy();
    });
  });
});
