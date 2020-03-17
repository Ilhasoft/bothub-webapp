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
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('value received a object', () => {
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

    test('data toString be String type', () => {
      expect(typeof wrapper.vm.toString).toBe('string');
    });

    test('data toString renders correctly string format', () => {
      expect(wrapper.vm.toString).toBe('intent:intent_value label:label_value text:text_value entity:entity_value');
    });
  });

  describe('set string to data toString', () => {
    beforeEach(() => {
      // TODO: solved this pls, use setData
      wrapper.vm.toString = 'intent:intent_value label:label_value';
    });

    test('expect computed Data current be Object', () => {
      expect(typeof wrapper.vm.current).toBe('object');
    });

    test('expect computed Data renders correctly object value', () => {
      expect(wrapper.vm.current).toMatchObject({
        intent: 'intent_value',
        label: 'label_value',
        search: '',
      });
    });
  });

  describe('active submit method', () => {
    beforeEach(() => {
      wrapper.vm.onSubmit();
    });

    test('emitted input event', () => {
      expect(wrapper.emitted('input')).toBeDefined();
    });
  });
});
