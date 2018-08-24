import { shallowMount, createLocalVue } from '@vue/test-utils';
import IntentsAndLabelsCard from '@/components/repository/IntentsAndLabelsCard';


const localVue = createLocalVue();

describe('IntentsAndLabelsCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(IntentsAndLabelsCard, {
      localVue,
      propsData: {
        title: 'dog',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('renders correctly with diferents props', () => {
    beforeEach(() => {
      wrapper.setProps({
        labelEntities: ['Dog', 'Cat', 'Buy'],
      });
    });

    test('When labelEntities array props have a array. Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
