import { shallow, createLocalVue } from '@vue/test-utils';
import EntityTextHighlightedInput from '@/components/example/form/EntityTextHighlightedInput';

const localVue = createLocalVue();

describe('EntityTextHighlightedInput.vue', () => {
  describe('simple', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(EntityTextHighlightedInput, {
        localVue,
        propsData: {},
      });
    });

    test('mount', () => {
      expect(wrapper.vm).toBeDefined();
    });
  });

  describe('with valid entities', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(EntityTextHighlightedInput, {
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

    test('mount', () => {
      expect(wrapper.vm).toBeDefined();
    });

    describe('type in input', () => {
      let newValue;
      beforeEach(() => {
        const input = wrapper.find({ ref: 'input' });
        newValue = `${input.element.value} my name is douglas`;
        input.element.value = newValue;
        input.trigger('input');
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
        expect(wrapper.emitted('selected').length).toBe(1);
      });
    });
  });
});
