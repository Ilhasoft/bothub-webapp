import { shallow } from '@vue/test-utils';
import HighlightedText from '@/components/shared/HighlightedText';


describe('HighlightedText.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(HighlightedText, {
      propsData: {
        text: 'text',
        entities: [
          { start: 0, end: 0, entity: 'entity' },
        ],
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
