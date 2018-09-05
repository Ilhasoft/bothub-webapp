import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import ExampleSearchInput from '@/components/example/ExampleSearchInput';


const localVue = createLocalVue();
localVue.use(BH);

describe('ExampleSearchInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ExampleSearchInput, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('ExampleSearchInput.vue', () => {
    beforeEach(() => {
      wrapper.setProps({
        value: {
          intent: 'intent_value',
          label: 'label_here',
          text: 'text_here',
          entity: 'entity_here',
        },
      });
    });

    test('renders correctly', () => {
      expect(wrapper.vm.value).toEqual({
        intent: 'intent_value',
        label: 'label_here',
        text: 'text_here',
        entity: 'entity_here',
      });
    });
  });
});
