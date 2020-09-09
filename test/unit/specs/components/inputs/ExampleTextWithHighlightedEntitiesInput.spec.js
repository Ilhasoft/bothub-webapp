import { shallowMount, createLocalVue } from '@vue/test-utils';
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';


const localVue = createLocalVue();

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
      input.trigger('input', textareaValue);
    });

    describe('with entity', () => {
      beforeEach(() => {
        wrapper.setProps({ entities: [{ start: 3, end: 7, entity: 'kids' }] });
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('select text', () => {
      beforeEach(() => {
        wrapper = shallowMount(ExampleTextWithHighlightedEntitiesInput, {
          localVue,
          mocks: {
            $t: () => 'some specific text',
          },
          stubs: {
            'self-adjust-input': {
              template: "<input @select='$listeners.select'>",
            },
          },
        });
        const input = wrapper.find({ ref: 'input' });
        input.element.setSelectionRange(0, 2);
      });

      test('textSelected event emitted', () => {
        expect(wrapper.emitted('textSelected')).toBeDefined();
      });
    });
  });
});
