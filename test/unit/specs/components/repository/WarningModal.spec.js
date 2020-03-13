import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import WarningModal from '@/components/repository/WarningModal';
import applyFilters from '@/utils/filters';


const localVue = createLocalVue();
localVue.use(BH);
applyFilters(localVue);

describe('WarningModal.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(WarningModal, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        open: true,
        languagesWarnings: {},
        training: false,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
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
});
