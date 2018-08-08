import { shallowMount, createLocalVue } from '@vue/test-utils';
import EntityTextHighlightedInput from '@/components/inputs/EntityTextHighlightedInput';

const localVue = createLocalVue();

describe('EntityTextHighlightedInput.vue', () => {
  describe('simple', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(EntityTextHighlightedInput, {
        localVue,
        propsData: {},
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('with valid entities', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(EntityTextHighlightedInput, {
        localVue,
        propsData: {
          value: 'hi',
          entities: [
            {
              start: 0,
              end: 2,
              entity: 'greet',
            },
          ],
        },
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('type in input', () => {
      let newValue;
      beforeEach(() => {
        const input = wrapper.find({ ref: 'input' });
        newValue = `${input.element.value} my name is douglas`;
        input.element.value = newValue;
        input.trigger('input');
      });

      test('emit input event', () => {
        expect(wrapper.emitted('input')).toBeDefined();
      });

      test('input value is same of component value', () => {
        expect(wrapper.emitted('input')[0][0]).toBe(newValue);
      });
    });

    describe('select text', () => {
      beforeEach(() => {
        const input = wrapper.find({ ref: 'input' });
        input.trigger('select');
      });

      test('emit selected', () => {
        expect(wrapper.emitted('selected')).toBeDefined();
      });
    });
  });
});
