import { shallowMount, createLocalVue } from '@vue/test-utils';
import IntentsAndLabelsList from '@/components/repository/IntentsAndLabelsList';

const localVue = createLocalVue();

describe('RepositoryCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(IntentsAndLabelsList, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Check if intents button work correctly', () => {
    beforeEach(() => {
      const intentsBtn = wrapper.find({ ref: 'intents' });
      intentsBtn.vm.$emit('click');
    });

    test('Data return true after intents button clicked', () => {
      expect(wrapper.vm.active).toBeTruthy();
    });
  });

  describe('Check if label button change data value correctly', () => {
    beforeEach(() => {
      const labelsBtn = wrapper.find({ ref: 'labels' });
      labelsBtn.vm.$emit('click');
    });

    test('Data return false after intents button clicked', () => {
      expect(wrapper.vm.active).toBeFalsy();
    });
  });
});
