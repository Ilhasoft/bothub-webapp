import { shallowMount, createLocalVue } from '@vue/test-utils';
import HighlightedText from '@/components-v1/shared/HighlightedText';


const localVue = createLocalVue();

describe('HighlightedText.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(HighlightedText, {
      localVue,
      propsData: {
        text: 'text',
        entities: [
          { start: 0, end: 0, entity: 'entity' },
        ],
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
