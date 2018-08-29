import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import IntentsAndLabelsItem from '@/components/repository/IntentsAndLabelsItem';


const localVue = createLocalVue();
localVue.use(BH);

describe('IntentsAndLabelsItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(IntentsAndLabelsItem, {
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
