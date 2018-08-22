import { shallowMount, createLocalVue } from '@vue/test-utils';
import IntentAndLabelEntitiesCard from '@/components/repository/IntentAndLabelEntitiesCard';

const localVue = createLocalVue();

describe('IntentAndLabelEntitiesCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(IntentAndLabelEntitiesCard, {
      localVue,
      propsData: {
        title: 'dog',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
