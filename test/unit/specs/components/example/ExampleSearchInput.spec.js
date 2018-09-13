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

  describe('value received a object, expected the object turns to string', () => {
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

    test('expect data toString be String type', () => {
      expect(typeof wrapper.vm.toString).toBe('string');
    });
  });

  describe('check current computed data turns string to Dicty', () => {
    beforeEach(() => {
      wrapper.setData({
        toString: 'intent:intent_value label:label_value',
      });
    });

    test('expect computed Data current be Object', () => {
      expect(typeof wrapper.vm.current).toBe('object');
    });
  });

  describe('check submit method emit value', () => {
    beforeEach(() => {
      wrapper.vm.submit();
    });

    test('emitted to be defined', () => {
      expect(wrapper.emitted('input')).toBeDefined();
    });
  });

  describe('check clearTimeOut method works correctly', () => {
    beforeEach(() => {
      wrapper.vm.setTimeoutId = 1;
      wrapper.vm.clearTimeout();
    });

    test('after clearTimeOut called, SetTimeoutId is null', () => {
      expect(wrapper.vm.setTimeoutId).toBeNull();
    });
  });
});
