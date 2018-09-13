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
          label: 'label_value',
          text: 'text_value',
          entity: 'entity_value',
        },
      });
    });

    test('Check props value receives correctly values', () => {
      expect(wrapper.vm.value).toEqual({
        intent: 'intent_value',
        label: 'label_value',
        text: 'text_value',
        entity: 'entity_value',
      });
    });
  });

  describe('ExampleSearchInput.vue', () => {
    beforeEach(() => {
      wrapper.vm.submit();
    });

    test('emity event works when button is clicked', () => {
      expect(wrapper.emitted('input')).toBeDefined();
    });
  });

  describe('ExampleSearchInput.vue', () => {
    beforeEach(() => {
      wrapper.vm.setTimeoutId = 1;
      wrapper.vm.clearTimeout();
    });

    test('clear timeout works correctly', () => {
      expect(wrapper.vm.setTimeoutId).toBeNull();
    });
  });
});
