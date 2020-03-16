import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';


const localVue = createLocalVue();
localVue.use(BH);

describe('ExampleTextWithHighlightedEntitiesInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ExampleTextWithHighlightedEntitiesInput, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('set text', () => {
    const textareaValue = 'hi kids';
    beforeEach(() => {
      const input = wrapper.find({ ref: 'input' });
      input.element.value = textareaValue;
      input.trigger('input');
    });

    test(`val is ${textareaValue}`, () => {
      expect(wrapper.vm.val).toBe(textareaValue);
    });

    describe('select text', () => {
      beforeEach(() => {
        const input = wrapper.find({ ref: 'input' });
        input.element.setSelectionRange(0, 2);
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });

      test('textSelected event emitted', () => {
        expect(wrapper.emitted('textSelected')).toBeDefined();
      });
    });

    describe('with entity', () => {
      beforeEach(() => {
        wrapper.setProps({ entities: [{ start: 3, end: 7, entity: 'kids' }] });
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
